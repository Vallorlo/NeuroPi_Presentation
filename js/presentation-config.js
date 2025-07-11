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
        
        // ============= DATA COLLECTION INFRASTRUCTURE =============
        {
            id: "data-collection-overview",
            file: "slides/22-data-collection-overview.html",
            section: "Data Collection Infrastructure",
            title: "Hardware Integration & Interface Architecture",
            duration: 3.5,
            description: "Comprehensive infrastructure overview"
        },
        {
            id: "epoc-hardware-specs",
            file: "slides/23-epoc-hardware-specs.html",
            section: "Data Collection Infrastructure",
            title: "EPOC+ Hardware Specifications",
            duration: 3.5,
            description: "14-channel EEG headset technical details"
        },
        {
            id: "signal-quality-monitoring",
            file: "slides/24-signal-quality-monitoring.html",
            section: "Data Collection Infrastructure",
            title: "Signal Quality Monitoring",
            duration: 3.0,
            description: "Real-time signal quality assessment"
        },
        {
            id: "trial-implementation",
            file: "slides/25-trial-implementation.html",
            section: "Data Collection Infrastructure",
            title: "Trial Implementation & Data Collection",
            duration: 3.5,
            description: "Multi-paradigm trial processes"
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
            file: "slides/06-frontend-overview.html",
            section: "Frontend & Design",
            title: "Frontend & Design Choices",
            duration: 4,
            description: "UI/UX design and user experience",
        },
        {
            id: "frontend-realtime",
            file: "slides/07-frontend-navigation.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
        },
        {
            id: "frontend-realtime",
            file: "slides/08-frontend-trials.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
        },
        {
            id: "frontend-realtime",
            file: "slides/09-frontend-dashboard.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
        },
        {
            id: "frontend-realtime",
            file: "slides/10-frontend-visualization.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
        },
        {
            id: "frontend-realtime",
            file: "slides/11-frontend-session-management.html",
            section: "Frontend & Design",
            title: "Real-Time Visualization",
            duration: 3,
            description: "Live data visualization and controls",
        },
        // ============= BACKEND SYSTEMS =============
        {
            id: "backend-trials",
            file: "slides/12-backend-architecture-overview.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },
        {
            id: "backend-trials",
            file: "slides/13-backend-account-management.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },
        {
            id: "backend-trials",
            file: "slides/14-backend-trails-system.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },
        {
            id: "backend-trials",
            file: "slides/15-backend-user-management.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },
        {
            id: "backend-trials",
            file: "slides/16-backend-integration-security.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },
        {
            id: "backend-trials",
            file: "slides/17-backend-performance-scalability.html",
            section: "Backend Systems",
            title: "Backend: Trials & Accounts",
            duration: 3.5,
            description: "Data management and user systems",
        },

        //BCI - BACKEND
        {
            id: "bci-integration-overview",
            file: "slides/18-bci-integration-overview.html",
            section: "BCI Core Application",
            title: "BCI Integration Architecture Overview",
            duration: 3.5,
            description: "Multi-layered BCI integration approach"
        },
        {
            id: "bci-modular-architecture",
            file: "slides/19-bci-modular-architecture.html",
            section: "BCI Core Application",
            title: "Modular Architecture Design",
            duration: 3.5,
            description: "Eight integrated Django applications"
        },
        {
            id: "bci-database-architecture",
            file: "slides/20-bci-database-architecture.html",
            section: "BCI Core Application",
            title: "Database Architecture",
            duration: 3.5,
            description: "Sophisticated schema design"
        },
        {
            id: "bci-realtime-processing",
            file: "slides/21-bci-realtime-processing.html",
            section: "BCI Core Application",
            title: "Real-Time Processing Architecture",
            duration: 3.5,
            description: "Bridging real-time and web paradigms"
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
        "Data Collection Infrastructure": {
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
        "BCI Core Application": {
            color: "#6f42c1",
            gradient: "linear-gradient(135deg, #6f42c1 0%, #764ba2 100%)"
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