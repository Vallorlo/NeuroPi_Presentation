// js/presentation-core.js
// NeuroPi Modular Presentation System

class NeuroPiPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = PRESENTATION_CONFIG.slides.length;
        this.isTransitioning = false;
        this.loadedSlides = new Map();
        this.preloadCache = new Map();
        
        this.init();
    }
    
    async init() {
        this.setupUI();
        this.setupEventListeners();
        this.generateOverview();
        await this.loadSlide(1);
        this.hideLoading();
        this.updateProgress();
        this.preloadNextSlides();
    }
    
    setupUI() {
        document.getElementById('totalSlides').textContent = this.totalSlides;
        
        // Add presentation mode indicator
        const indicator = document.createElement('div');
        indicator.innerHTML = `
            <div style="position: fixed; top: 10px; left: 10px; background: rgba(0,0,0,0.7); 
                        color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; 
                        font-family: 'Orbitron', monospace; z-index: 1001; opacity: 0.7;">
                F: Fullscreen • O: Overview • Space/Arrows: Navigate • Esc: Exit
            </div>
        `;
        document.body.appendChild(indicator);
        
        // Hide after 5 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 1000);
        }, 5000);
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
        document.getElementById('overviewBtn').addEventListener('click', () => this.toggleOverview());
        document.getElementById('closeOverview').addEventListener('click', () => this.toggleOverview());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch navigation
        this.setupTouchNavigation();
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Overview panel clicks
        document.getElementById('overviewPanel').addEventListener('click', (e) => {
            if (e.target.classList.contains('overview-slide')) {
                const slideNumber = parseInt(e.target.dataset.slide);
                this.goToSlide(slideNumber);
                this.toggleOverview();
            }
        });
    }
    
    setupTouchNavigation() {
        let startX = 0, startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
    
    handleKeyPress(e) {
        if (this.isTransitioning) return;
        
        const action = PRESENTATION_CONFIG.shortcuts[e.key];
        if (action) {
            e.preventDefault();
            this.executeAction(action, e);
        }
    }
    
    executeAction(action, event) {
        switch(action) {
            case 'nextSlide':
                this.nextSlide();
                break;
            case 'previousSlide':
                this.previousSlide();
                break;
            case 'firstSlide':
                this.goToSlide(1);
                break;
            case 'lastSlide':
                this.goToSlide(this.totalSlides);
                break;
            case 'toggleFullscreen':
                this.toggleFullscreen();
                break;
            case 'toggleOverview':
                this.toggleOverview();
                break;
            case 'print':
                if (event.ctrlKey || event.metaKey) {
                    window.print();
                }
                break;
        }
    }
    
    async loadSlide(slideNumber) {
        if (this.loadedSlides.has(slideNumber)) {
            this.displaySlide(slideNumber);
            return;
        }
        
        const slideConfig = PRESENTATION_CONFIG.slides[slideNumber - 1];
        if (!slideConfig) return;
        
        try {
            this.showLoading();
            
            let slideContent;
            if (this.preloadCache.has(slideNumber)) {
                slideContent = this.preloadCache.get(slideNumber);
            } else {
                const response = await fetch(slideConfig.file);
                if (!response.ok) {
                    throw new Error(`Failed to load slide: ${response.status}`);
                }
                slideContent = await response.text();
            }
            
            // Process slide content
            const processedContent = this.processSlideContent(slideContent, slideConfig);
            this.loadedSlides.set(slideNumber, processedContent);
            
            this.displaySlide(slideNumber);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading slide:', error);
            this.showErrorSlide(slideNumber, slideConfig);
        }
    }
    
    processSlideContent(html, config) {
        // Inject π logo into every slide
        const logoHtml = `
            <div class="neuropi-logo">
                <span class="neuro-text">Neuro</span><span class="pi-symbol">π</span>
            </div>
        `;
        
        // Add section theme class for styling
        const sectionClass = this.getSectionClass(config.section);
        
        return `
            <div class="slide active ${sectionClass}" data-slide="${config.id}">
                ${logoHtml}
                ${html}
            </div>
        `;
    }
    
    getSectionClass(sectionName) {
        return sectionName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
    
    displaySlide(slideNumber) {
        const slideWrapper = document.getElementById('slideWrapper');
        const slideContent = this.loadedSlides.get(slideNumber);
        
        if (slideContent) {
            slideWrapper.innerHTML = slideContent;
            this.animateSlideContent();
        }
    }
    
    showErrorSlide(slideNumber, config) {
        const slideWrapper = document.getElementById('slideWrapper');
        const errorContent = `
            <div class="slide active error-slide">
                <div class="neuropi-logo">
                    <span class="neuro-text">Neuro</span><span class="pi-symbol">π</span>
                </div>
                <div class="slide-content">
                    <h2 class="section-title">Slide Not Found</h2>
                    <div class="error-message">
                        <h3>📁 ${config.title}</h3>
                        <p>File: <code>${config.file}</code></p>
                        <p>This slide is ready for your content!</p>
                        <div class="placeholder-note">
                            <i class="fas fa-info-circle"></i>
                            <span>Create the slide file to see your content here</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        slideWrapper.innerHTML = errorContent;
        this.hideLoading();
    }
    
    animateSlideContent() {
        const slide = document.querySelector('.slide.active');
        if (!slide) return;
        
        // Animate slide entrance
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            slide.style.transition = `all ${PRESENTATION_CONFIG.animations.slideTransition}ms ease`;
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(0)';
        }, 50);
        
        // Animate content elements
        const animateElements = slide.querySelectorAll('.animate-in, .stat-card, .achievement-card, .innovation-card, .problem-item, .content-placeholder');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, PRESENTATION_CONFIG.animations.contentDelay + (index * PRESENTATION_CONFIG.animations.staggerDelay));
        });
    }
    
    async preloadNextSlides() {
        // Preload next 2 slides for smooth navigation
        const preloadSlides = [this.currentSlide + 1, this.currentSlide + 2];
        
        for (const slideNum of preloadSlides) {
            if (slideNum <= this.totalSlides && !this.preloadCache.has(slideNum)) {
                const config = PRESENTATION_CONFIG.slides[slideNum - 1];
                try {
                    const response = await fetch(config.file);
                    if (response.ok) {
                        const content = await response.text();
                        this.preloadCache.set(slideNum, content);
                    }
                } catch (error) {
                    console.log(`Preload failed for slide ${slideNum}:`, error);
                }
            }
        }
    }
    
    async nextSlide() {
        if (this.currentSlide < this.totalSlides && !this.isTransitioning) {
            await this.goToSlide(this.currentSlide + 1);
        }
    }
    
    async previousSlide() {
        if (this.currentSlide > 1 && !this.isTransitioning) {
            await this.goToSlide(this.currentSlide - 1);
        }
    }
    
    async goToSlide(slideNumber) {
        if (slideNumber === this.currentSlide || this.isTransitioning) return;
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        this.isTransitioning = true;
        
        await this.loadSlide(slideNumber);
        
        this.currentSlide = slideNumber;
        this.updateProgress();
        this.updateNavigationButtons();
        this.updateSectionName();
        this.preloadNextSlides();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, PRESENTATION_CONFIG.animations.slideTransition);
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = (this.currentSlide / this.totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        document.getElementById('currentSlide').textContent = this.currentSlide;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    updateSectionName() {
        const slideConfig = PRESENTATION_CONFIG.slides[this.currentSlide - 1];
        const sectionName = document.getElementById('sectionName');
        if (slideConfig && sectionName) {
            sectionName.textContent = slideConfig.section;
            
            // Apply section theme color
            const theme = PRESENTATION_CONFIG.sectionThemes[slideConfig.section];
            if (theme) {
                sectionName.style.color = theme.color;
            }
        }
    }
    
    generateOverview() {
        const overviewGrid = document.getElementById('overviewGrid');
        
        PRESENTATION_CONFIG.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'overview-slide';
            slideElement.dataset.slide = index + 1;
            
            const theme = PRESENTATION_CONFIG.sectionThemes[slide.section];
            const isPlaceholder = slide.placeholder ? 'placeholder' : '';
            
            slideElement.innerHTML = `
                <div class="overview-slide-number">${index + 1}</div>
                <div class="overview-slide-content ${isPlaceholder}">
                    <h4>${slide.title}</h4>
                    <p>${slide.description}</p>
                    <div class="overview-slide-meta">
                        <span class="section-label" style="background: ${theme?.color || '#666'}">${slide.section}</span>
                        <span class="duration-label">${slide.duration}min</span>
                    </div>
                </div>
            `;
            
            overviewGrid.appendChild(slideElement);
        });
    }
    
    toggleOverview() {
        const panel = document.getElementById('overviewPanel');
        panel.classList.toggle('active');
        
        if (panel.classList.contains('active')) {
            // Highlight current slide
            const currentOverviewSlide = panel.querySelector(`[data-slide="${this.currentSlide}"]`);
            if (currentOverviewSlide) {
                currentOverviewSlide.classList.add('current');
            }
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error enabling fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    showLoading() {
        document.getElementById('loadingIndicator').style.display = 'flex';
    }
    
    hideLoading() {
        document.getElementById('loadingIndicator').style.display = 'none';
    }
    
    // Utility methods for manual control
    startAutoPlay(intervalMs = 30000) {
        this.autoInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.stopAutoPlay();
            }
        }, intervalMs);
    }
    
    stopAutoPlay() {
        if (this.autoInterval) {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        }
    }
    
    exportProgress() {
        return {
            currentSlide: this.currentSlide,
            totalSlides: this.totalSlides,
            timeSpent: Date.now() - this.startTime,
            completionPercentage: (this.currentSlide / this.totalSlides) * 100
        };
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.neuroPiPresentation = new NeuroPiPresentation();
    
    // Global error handler for slide loading
    window.addEventListener('error', (e) => {
        console.error('Presentation error:', e);
    });
    
    // Handle beforeunload for unsaved changes warning
    window.addEventListener('beforeunload', (e) => {
        if (window.neuroPiPresentation && window.neuroPiPresentation.currentSlide > 1) {
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave the presentation?';
        }
    });
});