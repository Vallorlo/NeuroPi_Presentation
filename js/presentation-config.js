// js/presentation-config.js
// NeuroPi Presentation Configuration

const PRESENTATION_CONFIG = {
    title: "NeuroPi - Democratizing Brain-Computer Interface Technology",
    totalDuration: 60, // minutes
    
    // Slide definitions with modular file structure
    slides: [
        // ============= INTRODUCTION SECTION =============
        {
            id: "intro-title",
            file: "slides/intro_slide_1.html",
            section: "Introduction",
            title: "NeuroPi Project Title",
            duration: 2, // minutes
            description: "Project introduction and branding"
        },
        {
            id: "intro-problem",
            file: "slides/intro_slide_2.html",
            section: "Introduction", 
            title: "The Challenge",
            duration: 2,
            description: "Problem statement and motivation"
        },
        {
            id: "intro-solution",
            file: "slides/intro_slide_3.html",
            section: "Introduction",
            title: "Our Solution",
            duration: 2,
            description: "NeuroPi achievements and metrics"
        },
        {
            id: "intro-roadmap",
            file: "slides/intro_slide_4.html",
            section: "Introduction",
            title: "Today's Journey",
            duration: 2,
            description: "Presentation roadmap and timeline"
        },
        
        // ============= APPROACHES & DATA COLLECTION =============
        {
            id: "approaches-overview",
            file: "slides/05-approaches-overview.html",
            section: "Approaches & Data",
            title: "Approaches & Data Collection",
            duration: 3.5,
            description: "Methodology and BCI paradigms"
        },
        {
            id: "approaches-hardware",
            file: "slides/06-approaches-hardware.html",
            section: "Approaches & Data",
            title: "Hardware & Trial Protocols", 
            duration: 3.5,
            description: "EPOC+ integration and experimental setup",
            placeholder: true
        },
        
        // ============= MODEL ARCHITECTURE =============
        {
            id: "models-architecture",
            file: "slides/07-models-architecture.html",
            section: "Model Architecture",
            title: "Model Architectures",
            duration: 4,
            description: "ATCNet and CNN-LSTM-Attention designs",
            placeholder: true
        },
        {
            id: "models-performance",
            file: "slides/08-models-performance.html",
            section: "Model Architecture", 
            title: "Performance Results",
            duration: 3,
            description: "Classification results and benchmarks",
            placeholder: true
        },
        
        // ============= FRONTEND & DESIGN =============
        {
            id: "frontend-design",
            file: "slides/09-frontend-design.html",
            section: "Frontend & Design",
            title: "Frontend & Design Choices",
            duration: 4,
            description: "UI/UX design and user experience",
            placeholder: true
        },
        {
            id: "frontend-realtime",
            file: "slides/10-frontend-realtime.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
            placeholder: true
        },
        
        // ============= BACKEND SYSTEMS =============
        {
            id: "backend-trials",
            file: "slides/11-backend-trials.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
            placeholder: true
        },
        {
            id: "backend-bci",
            file: "slides/12-backend-bci.html",
            section: "Backend Systems",
            title: "Backend: BCI Core Application",
            duration: 3.5,
            description: "Real-time processing and ML integration",
            placeholder: true
        },
        
        // ============= CONCLUSION & FUTURE =============
        {
            id: "conclusion-achievements",
            file: "slides/conclusion_slide_1.html",
            section: "Conclusion & Future",
            title: "What We've Achieved",
            duration: 3.5,
            description: "Scientific contributions and impact"
        },
        {
            id: "conclusion-phase1",
            file: "slides/conclusion_slide_2.html",
            section: "Conclusion & Future",
            title: "Future Work: Phase 1",
            duration: 3.5,
            description: "Hybrid model integration roadmap"
        },
        {
            id: "conclusion-advanced",
            file: "slides/conclusion_slide_3.html",
            section: "Conclusion & Future",
            title: "Future Work: Phases 2 & 3",
            duration: 3.5,
            description: "Advanced capabilities and sign language"
        },
        {
            id: "conclusion-demo",
            file: "slides/16-conclusion-demo.html",
            section: "Conclusion & Future",
            title: "Impact & Demo Transition",
            duration: 3.5,
            description: "Final impact and live demonstration"
        }
    ],
    
    // Section color themes for visual organization
    sectionThemes: {
        "Introduction": {
            color: "#dc3545",
            gradient: "linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)"
        },
        "Approaches & Data": {
            color: "#0066cc", 
            gradient: "linear-gradient(135deg, #0066cc 0%, #667eea 100%)"
        },
        "Model Architecture": {
            color: "#6f42c1",
            gradient: "linear-gradient(135deg, #6f42c1 0%, #764ba2 100%)"
        },
        "Frontend & Design": {
            color: "#28a745",
            gradient: "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
        },
        "Backend Systems": {
            color: "#fd7e14",
            gradient: "linear-gradient(135deg, #fd7e14 0%, #ffc107 100%)"
        },
        "Conclusion & Future": {
            color: "#e83e8c",
            gradient: "linear-gradient(135deg, #e83e8c 0%, #dc3545 100%)"
        }
    },
    
    // Keyboard shortcuts
    shortcuts: {
        'ArrowLeft': 'previousSlide',
        'ArrowUp': 'previousSlide', 
        'ArrowRight': 'nextSlide',
        'ArrowDown': 'nextSlide',
        ' ': 'nextSlide', // Space
        'Home': 'firstSlide',
        'End': 'lastSlide',
        'Escape': 'toggleFullscreen',
        'f': 'toggleFullscreen',
        'o': 'toggleOverview',
        'p': 'print'
    },
    
    // Animation settings
    animations: {
        slideTransition: 800, // ms
        contentDelay: 200,
        staggerDelay: 100
    },
    
    // Demo configuration
    demo: {
        duration: 10, // minutes
        features: [
            "Real-time EEG Processing",
            "Motor Imagery Classification", 
            "P300 Detection",
            "Live ML Predictions"
        ]
    }
};