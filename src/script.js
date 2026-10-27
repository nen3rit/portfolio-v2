// src/main.js
import './style.css'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const scrollingText = container.querySelector('.scrolling-text');
        const directionAttr = container.getAttribute('data-direction') || 'left';
        const speed = parseFloat(container.getAttribute('speed')) || 40;
        
        // Duplicate text for infinite loop continuity
        const textCopy = scrollingText.cloneNode(true);
        textCopy.classList.add('scrolling-text-copy');
        container.appendChild(textCopy);

        // Setup container layout
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        scrollingText.style.position = 'absolute';
        scrollingText.style.left = '0px';
        textCopy.style.position = 'absolute';

        let textWidth = scrollingText.offsetWidth;
        container.style.height = scrollingText.offsetHeight + 'px';
        
        // Position copy side-by-side
        if (directionAttr === 'right') {
            textCopy.style.left = -textWidth + 'px';
        } else {
            textCopy.style.left = textWidth + 'px';
        }

        let currentTransform = 0;

        // Listen *only* to wheel events
        window.addEventListener('wheel', (e) => {
            const delta = e.deltaY; // positive = scrolling down, negative = scrolling up

            // Calculate movement amount based on direction attributes
            if (directionAttr === 'right') {
                // "UI & Systems" goes Right when scrolling down
                currentTransform += (delta > 0 ? speed : -speed);
            } else {
                // "Web development" goes Left when scrolling down
                currentTransform -= (delta > 0 ? speed : -speed);
            }

            // Keep currentTransform neatly looped within the text's width
            if (currentTransform <= -textWidth) {
                currentTransform += textWidth;
            } else if (currentTransform >= textWidth) {
                currentTransform -= textWidth;
            }

            // Apply transforms
            if (directionAttr === 'right') {
                scrollingText.style.transform = `translate3d(${currentTransform}px, 0, 0)`;
                textCopy.style.transform = `translate3d(${currentTransform - textWidth}px, 0, 0)`;
            } else {
                scrollingText.style.transform = `translate3d(${currentTransform}px, 0, 0)`;
                textCopy.style.transform = `translate3d(${currentTransform + textWidth}px, 0, 0)`;
            }
        });
    });
});

// fade sections
document.addEventListener("DOMContentLoaded", function () {
const observerOptions = {
    root: null, // uses the browser viewport
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optional: stop observing once it has faded in so it doesn't fade out again when scrolling back up
        observer.unobserve(entry.target);
    }
    });
}, observerOptions);

  // Target all sections with the fade-section class
document.querySelectorAll('.fade-sections').forEach(section => {
    observer.observe(section);
});
});

// modal menu
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-toggle-btn");
    const modalCloseBtn = document.getElementById("modal-close-btn")
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const closeIcon = document.getElementById("close-icon");
    const menuLinks = document.querySelectorAll(".menu-link");

function openMenu() {
    mobileMenu.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
    hamburgerIcon.classList.add("hidden"); // Hide hamburger in nav when open
    closeIcon.classList.remove("hidden");
}

function closeMenu() {
    mobileMenu.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    hamburgerIcon.classList.remove("hidden"); // Bring hamburger back
    closeIcon.classList.add("hidden");
}

  // Event Listeners
if (menuBtn) menuBtn.addEventListener("click", openMenu);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeMenu);

  // Close menu automatically when any nav link inside the modal is clicked
menuLinks.forEach(link => {
    link.addEventListener("click", (e) =>{
        closeMenu();

        const targetId = link.getAttribute("href");
        if (targetId && targetId.startsWith("#")){
            e.preventDefault();
            setTimeout(() => {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({behavior : "smooth"})
                }
            }, 50)
        }
    })
}

)}
)


// lenis smooth scroll



