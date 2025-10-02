document.addEventListener('DOMContentLoaded', function() {
    const sectionTracker = document.getElementById('section-tracker');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#section-tracker a');

    function updateNavVisibility() {
        // Check which page we're on by looking for specific sections
        const empathizeSection = document.getElementById('empathize'); // BIB page
        const planSection = document.getElementById('plan'); // Anvaya page
        const challengesSection = document.getElementById('challenges'); // NYCHC page
        const footer = document.querySelector('footer');
        
        if (!footer || !sectionTracker) return;

        // Determine the trigger section based on which page we're on
        const triggerSection = empathizeSection || planSection || challengesSection;
        if (!triggerSection) return;

        const triggerTop = triggerSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const footerTop = footer.offsetTop;
        const footerHalfwayPoint = footerTop - (windowHeight / 2);

        // Stick to top after scrolling past the trigger section
        if (scrollPosition >= triggerTop && scrollPosition < footerHalfwayPoint) {
            sectionTracker.classList.add('sticky');
            sectionTracker.style.opacity = '1';
            sectionTracker.style.visibility = 'visible';
        } else {
            sectionTracker.classList.remove('sticky');
            sectionTracker.style.opacity = '0';
            sectionTracker.style.visibility = 'hidden';
        }
    }

    // Function to update active nav link
    function updateActiveSection() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 200; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;
        
        const targetPosition = targetSection.offsetTop - 75; 
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            smoothScrollToSection(targetSection);
        });
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        updateNavVisibility();
        updateActiveSection();
    });
    
    // Initial check
    updateNavVisibility();
    updateActiveSection();
});