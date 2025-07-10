// presentation.js

class NeuroPiPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 16;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.animateCurrentSlide();
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Update button states
        this.updateNavigationButtons();
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });
    }
    
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        
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
            
            // Check if it's a horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides && !this.isTransitioning) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1 && !this.isTransitioning) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideNumber) {
        if (slideNumber === this.currentSlide || this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        const targetSlideElement = document.getElementById(`slide-${slideNumber}`);
        
        // Add transition classes
        currentSlideElement.classList.remove('active');
        if (slideNumber > this.currentSlide) {
            currentSlideElement.classList.add('prev');
        }
        
        // Animate to new slide
        setTimeout(() => {
            targetSlideElement.classList.add('active');
            targetSlideElement.classList.remove('prev');
            
            this.currentSlide = slideNumber;
            this.updateProgress();
            this.updateNavigationButtons();
            this.animateCurrentSlide();
            
            // Clean up previous slide
            setTimeout(() => {
                currentSlideElement.classList.remove('prev');
                this.isTransitioning = false;
            }, 100);
        }, 50);
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = (this.currentSlide / this.totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update slide counter
        document.getElementById('currentSlide').textContent = this.currentSlide;
        document.getElementById('totalSlides').textContent = this.totalSlides;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    animateCurrentSlide() {
        const currentSlideElement = document.getElementById(`slide-${this.currentSlide}`);
        
        // Add specific animations based on slide content
        switch(this.currentSlide) {
            case 1:
                this.animateTitleSlide();
                break;
            case 2:
                this.animateProblemSlide();
                break;
            case 3:
                this.animateSolutionSlide();
                break;
            case 4:
                this.animateRoadmapSlide();
                break;
            case 13:
                this.animateAchievementsSlide();
                break;
            case 14:
            case 15:
                this.animateFutureWorkSlide();
                break;
            case 16:
                this.animateImpactSlide();
                break;
            default:
                this.animateContentSlide();
                break;
        }
    }
    
    animateTitleSlide() {
        const titleLines = document.querySelectorAll('.title-line');
        const capstoneInfo = document.querySelector('.capstone-info');
        
        // Animate title lines with stagger
        titleLines.forEach((line, index) => {
            line.style.animation = 'none';
            setTimeout(() => {
                line.style.animation = `titleReveal 1s ease-out ${index * 0.3}s both`;
            }, 200);
        });
        
        // Animate capstone info
        if (capstoneInfo) {
            capstoneInfo.style.animation = 'none';
            setTimeout(() => {
                capstoneInfo.style.animation = `slideInUp 0.8s ease-out 1s both`;
            }, 500);
        }
    }
    
    animateProblemSlide() {
        const problemItems = document.querySelectorAll('.problem-item');
        const motivationQuote = document.querySelector('.motivation-quote');
        
        // Animate problem items
        problemItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 300);
        });
        
        // Animate motivation quote
        if (motivationQuote) {
            motivationQuote.style.animation = 'none';
            setTimeout(() => {
                motivationQuote.style.animation = `slideInUp 0.8s ease-out 1s both`;
            }, 800);
        }
    }
    
    animateSolutionSlide() {
        const statCards = document.querySelectorAll('.stat-card');
        const innovationCards = document.querySelectorAll('.innovation-card');
        
        // Animate stat cards with stagger
        statCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 300);
        });
        
        // Animate innovation cards
        innovationCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `slideInUp 0.8s ease-out ${index * 0.15}s both`;
            }, 800);
        });
    }
    
    animateRoadmapSlide() {
        const roadmapItems = document.querySelectorAll('.roadmap-item');
        
        roadmapItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `slideInLeft 0.8s ease-out ${index * 0.15}s both`;
            }, 200);
        });
    }
    
    animateAchievementsSlide() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        const achievementHighlight = document.querySelector('.achievement-highlight');
        
        // Animate highlight first
        if (achievementHighlight) {
            achievementHighlight.style.animation = 'none';
            setTimeout(() => {
                achievementHighlight.style.animation = `slideInUp 0.8s ease-out 0s both`;
            }, 200);
        }
        
        // Animate achievement cards
        achievementCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 600);
        });
    }
    
    animateFutureWorkSlide() {
        const futureFeatures = document.querySelectorAll('.future-feature');
        const futurePhases = document.querySelectorAll('.future-phase');
        const futureHighlight = document.querySelector('.future-highlight');
        
        // Animate highlight first
        if (futureHighlight) {
            futureHighlight.style.animation = 'none';
            setTimeout(() => {
                futureHighlight.style.animation = `slideInUp 0.8s ease-out 0s both`;
            }, 200);
        }
        
        // Animate features or phases
        const items = futureFeatures.length > 0 ? futureFeatures : futurePhases;
        items.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s both`;
            }, 500);
        });
    }
    
    animateImpactSlide() {
        const impactMetrics = document.querySelectorAll('.impact-metric');
        const demoFeatures = document.querySelectorAll('.demo-feature');
        const impactStatement = document.querySelector('.impact-statement');
        
        // Animate impact statement
        if (impactStatement) {
            impactStatement.style.animation = 'none';
            setTimeout(() => {
                impactStatement.style.animation = `slideInUp 0.8s ease-out 0s both`;
            }, 200);
        }
        
        // Animate metrics
        impactMetrics.forEach((metric, index) => {
            metric.style.animation = 'none';
            setTimeout(() => {
                metric.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 500);
        });
        
        // Animate demo features
        setTimeout(() => {
            demoFeatures.forEach((feature, index) => {
                feature.style.animation = 'none';
                setTimeout(() => {
                    feature.style.animation = `pulseFeature 2s ease-in-out ${index * 0.5}s infinite`;
                }, index * 200);
            });
        }, 1200);
    }
    
    animateContentSlide() {
        const placeholders = document.querySelectorAll('.content-placeholder');
        
        placeholders.forEach((placeholder, index) => {
            placeholder.style.animation = 'none';
            setTimeout(() => {
                placeholder.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s both`;
            }, 200);
        });
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    // Additional utility methods
    startAutoPresentation(intervalMs = 30000) {
        this.autoInterval = setInterval(() => {
            if (this.currentSlide < this.totalSlides) {
                this.nextSlide();
            } else {
                this.stopAutoPresentation();
            }
        }, intervalMs);
    }
    
    stopAutoPresentation() {
        if (this.autoInterval) {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        }
    }
    
    // Neural network visualization effect for technical slides
    createNeuralNetworkEffect() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const nodes = [];
        const connections = [];
        
        // Create nodes
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
                if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#ff2d55';
                ctx.fill();
                
                // Draw connections
                nodes.forEach(otherNode => {
                    const distance = Math.sqrt(
                        Math.pow(node.x - otherNode.x, 2) + 
                        Math.pow(node.y - otherNode.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(255, 45, 85, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        return canvas;
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const presentation = new NeuroPiPresentation();
    
    // Add neural network effect for technical slides
    const technicalSlides = [3, 5, 6]; // Model architecture and backend slides
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'f':
                    e.preventDefault();
                    presentation.toggleFullscreen();
                    break;
                case 'p':
                    e.preventDefault();
                    window.print();
                    break;
            }
        }
    });
    
    // Add presentation mode indicator
    const presentationMode = document.createElement('div');
    presentationMode.id = 'presentation-mode';
    presentationMode.innerHTML = `
        <div style="position: fixed; top: 10px; left: 10px; background: rgba(0,0,0,0.7); 
                    color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; 
                    font-family: 'Orbitron', monospace; z-index: 1001; opacity: 0.7;">
            Press F for fullscreen • Space/Arrow keys to navigate • Esc to exit fullscreen
        </div>
    `;
    document.body.appendChild(presentationMode);
    
    // Hide mode indicator after 5 seconds
    setTimeout(() => {
        presentationMode.style.opacity = '0';
        setTimeout(() => {
            presentationMode.remove();
        }, 1000);
    }, 5000);
    
    // Make presentation object globally accessible for manual control
    window.neuroPiPresentation = presentation;
});

// Utility functions for special effects
function createParticleSystem(element, particleCount = 20) {
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff2d55;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        element.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

// Add particle float animation to CSS dynamically
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7; 
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
        }
    }
`;
document.head.appendChild(particleStyle);