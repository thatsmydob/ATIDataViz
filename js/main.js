// ============================================
// Main Application Orchestrator for LTSS Scrollytelling
// Purpose: Manages application state, data loading, and scroll-driven scene transitions
// ============================================

// === GLOBAL STATE ===
// These variables are accessible throughout the application lifecycle

// ltssData: Holds all visualization data loaded from JSON file
let ltssData = null;

// currentScene: Tracks which scene (0-6) is currently active
let currentScene = 0;

// scroller: Reference to the Scrollama instance for scroll detection
let scroller = null;

// === APPLICATION INITIALIZATION ===
// This function runs when the page loads and sets up everything
async function init() {
    try {
        // STEP 1: Load data from JSON file
        // Using fetch API to asynchronously load static data
        const response = await fetch('data/ltss_data.json');
        ltssData = await response.json();

        // STEP 2: Configure Scrollama for scroll-triggered animations
        // This watches for when user scrolls to each section
        setupScrollama();

        // STEP 3: Display the first scene (title screen)
        // Shows initial content before user starts scrolling
        drawScene0();

        console.log('LTSS Scrollytelling initialized successfully');
    } catch (error) {
        // If data fails to load or initialization fails, log the error
        console.error('Error initializing application:', error);
    }
}

// === SCROLLAMA CONFIGURATION ===
// Sets up scroll detection to trigger scene changes as user scrolls
function setupScrollama() {
    // Create a new Scrollama instance
    scroller = scrollama();

    // Configure Scrollama with our settings
    scroller
        .setup({
            step: '.step',      // Watch elements with class 'step' (each scene section)
            offset: 0.5,        // Trigger when step reaches 50% down the viewport
            debug: false        // Set to true to see visual debugging lines
        })
        .onStepEnter(handleStepEnter)  // Function to call when scrolling into a step
        .onStepExit(handleStepExit);   // Function to call when scrolling out of a step

    // Handle window resize events
    // Recalculates trigger points when browser window size changes
    window.addEventListener('resize', scroller.resize);
}

// === STEP ENTER HANDLER ===
// Called when user scrolls to a new section
function handleStepEnter(response) {
    // Extract the scene number from the data-step attribute (0-6)
    const stepIndex = parseInt(response.element.dataset.step);

    // Update global state to track current scene
    currentScene = stepIndex;

    // Add 'is-active' class to the current step
    // This makes the text box fully opaque (CSS: opacity: 1)
    response.element.classList.add('is-active');

    // === SCENE ROUTER ===
    // Call the appropriate drawSceneX() function based on which section is active
    switch(stepIndex) {
        case 0:
            drawScene0();  // Title screen
            break;
        case 1:
            drawScene1();  // Icon grid - 5.6M people
            break;
        case 2:
            drawScene2();  // Icon grid morphs to donut chart
            break;
        case 3:
            drawScene3();  // Stacked bar chart - care settings
            break;
        case 4:
            drawScene4();  // Age distribution bars
            break;
        case 5:
            drawScene5();  // Line chart - trends over time
            break;
        case 6:
            drawScene6();  // Closing message
            break;
    }
}

// === STEP EXIT HANDLER ===
// Called when user scrolls away from a section
function handleStepExit(response) {
    // Remove 'is-active' class when leaving a step
    // This dims the text box (CSS: opacity: 0.4)
    response.element.classList.remove('is-active');
}

// === UTILITY FUNCTIONS ===
// Reusable helper functions available to all scene files

// UTILITY: Clear Chart
// Removes all SVG elements from the chart area between scenes
function clearChart(transition = true) {
    const chart = d3.select('#chart');

    if (transition) {
        // Smooth fade-out before removal (better UX)
        chart.selectAll('*')
            .transition()
            .duration(300)        // 300ms fade
            .style('opacity', 0)  // Fade to invisible
            .remove();            // Then remove from DOM
    } else {
        // Immediate removal without animation (faster)
        chart.selectAll('*').remove();
    }
}

// UTILITY: Animate Counter
// Creates a smooth count-up animation for numbers (e.g., 0 → 5,600,000)
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;                    // Total distance to count
    const increment = Math.ceil(range / 60);      // Amount to add per frame (60fps target)
    const stepTime = duration / 60;               // Time between updates (ms)
    let current = start;                          // Current count value

    // Use setInterval to update the number repeatedly
    const timer = setInterval(() => {
        current += increment;           // Increment the counter
        if (current >= end) {
            current = end;              // Snap to final value
            clearInterval(timer);       // Stop the animation
        }
        // Update the text element with formatted number (adds commas)
        element.text(current.toLocaleString());
    }, stepTime);
}

// UTILITY: Person Icon Path
// Returns SVG path data for a simple person silhouette icon
// Based on Material Design icons
function personIconPath() {
    return 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z';
}

// UTILITY: Home Icon Path
// Returns SVG path data for a house icon (represents home-based care)
function homeIconPath() {
    return 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';
}

// UTILITY: Building Icon Path
// Returns SVG path data for a building icon (represents institutional care)
function buildingIconPath() {
    return 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z';
}

// === EXPORT API ===
// Make data and utilities available globally via window.ltssApp
// This allows scene files to access data and helper functions
window.ltssApp = {
    ltssData,           // The loaded JSON data
    currentScene,       // Currently active scene number
    clearChart,         // Function to clear the chart
    animateCounter,     // Function to animate numbers
    personIconPath,     // SVG path for person icon
    homeIconPath,       // SVG path for home icon
    buildingIconPath    // SVG path for building icon
};

// === APPLICATION STARTUP ===
// Initialize the app when the DOM is ready
if (document.readyState === 'loading') {
    // DOM still loading, wait for it
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded, initialize immediately
    init();
}
