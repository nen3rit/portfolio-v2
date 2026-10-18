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