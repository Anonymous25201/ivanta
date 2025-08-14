// IVANTA Loafers Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    const heroCtaButton = document.querySelector('.hero__cta');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle hero CTA button click
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function() {
            const collectionSection = document.querySelector('#collection');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = collectionSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
    
    // Product card interactions
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function() {
            // Add a subtle animation effect
            this.style.transform = 'translateY(-12px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const colorDot = this.querySelector('.color-dot--active');
            if (colorDot) {
                colorDot.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const colorDot = this.querySelector('.color-dot--active');
            if (colorDot) {
                colorDot.style.transform = 'scale(1)';
            }
        });
    });
    
    // Color dot interactions
    const colorDots = document.querySelectorAll('.color-dot');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            // Remove active class from all dots in this product
            const parentCard = this.closest('.product-card');
            const siblingDots = parentCard.querySelectorAll('.color-dot');
            siblingDots.forEach(sibling => {
                sibling.classList.remove('color-dot--active');
            });
            
            // Add active class to clicked dot
            this.classList.add('color-dot--active');
            
            // Update color label
            const colorLabel = parentCard.querySelector('.color-label');
            const color = this.dataset.color;
            if (colorLabel && color) {
                colorLabel.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            }
            
            // Add visual feedback
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add scrolled header styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .header--scrolled {
            background-color: rgba(0, 0, 0, 0.95);
            border-bottom-color: rgba(51, 51, 51, 0.8);
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .about__content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav__link--active');
                }
            }
        });
    });
    
    // Add active nav link styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav__link--active {
            color: #d4af37 !important;
            position: relative;
        }
        
        .nav__link--active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #d4af37;
            border-radius: 1px;
        }
    `;
    document.head.appendChild(navStyle);
    
    // Initialize page
    console.log('IVANTA website loaded successfully');
    
    // Add loading animation completion
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});