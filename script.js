// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle entrance animations when elements scroll into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.hero-content',
        '.hero-image',
        '.section-title',
        '.timeline-item',
        '.skill-category',
        '.project-card',
        '.contact-container'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
            
            // Start observing
            observer.observe(el);
        });
    });
});

// Dynamic background blob movement based on mouse position
document.addEventListener('mousemove', (e) => {
    const blob1 = document.querySelector('.bg-blob');
    const blob2 = document.querySelector('.bg-blob-2');
    
    if (blob1 && blob2) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blob1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        blob2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    }
});

// Toggle Experience items
const toggleExperienceBtn = document.getElementById('toggle-experience-btn');
if (toggleExperienceBtn) {
    toggleExperienceBtn.addEventListener('click', () => {
        const hiddenItems = document.querySelectorAll('.timeline-item.hidden-item');
        if (hiddenItems.length > 0) {
            // Show them
            hiddenItems.forEach(item => {
                item.classList.remove('hidden-item');
                // Ensure opacity is 1 so they show up even if observer doesn't catch them immediately
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            toggleExperienceBtn.textContent = 'Show Less';
        } else {
            // Hide the last 3 items
            const allItems = document.querySelectorAll('#experience .timeline-item');
            for (let i = 2; i < allItems.length; i++) {
                allItems[i].classList.add('hidden-item');
                // Reset styling so they can animate next time if needed, or just be instantly hidden
                allItems[i].style.opacity = '0';
                allItems[i].style.transform = 'translateY(30px)';
            }
            toggleExperienceBtn.textContent = 'Show More';
            // Scroll back to experience section
            document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
        }
    });
}
