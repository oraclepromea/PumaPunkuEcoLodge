// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animation on Scroll
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

// Apply animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.room-card, .tour-card, .contact-card, .feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Basic validation
            if (!data.checkin || !data.checkout || !data.guests || !data['room-type'] || !data.name || !data.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Date validation
            const checkinDate = new Date(data.checkin);
            const checkoutDate = new Date(data.checkout);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (checkinDate < today) {
                showNotification('Check-in date cannot be in the past.', 'error');
                return;
            }
            
            if (checkoutDate <= checkinDate) {
                showNotification('Check-out date must be after check-in date.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your booking request has been submitted. We will contact you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Set minimum date for booking form
document.addEventListener('DOMContentLoaded', function() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        checkoutInput.min = today;
        
        // Update checkout minimum when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            checkoutInput.min = checkinDate.toISOString().split('T')[0];
            
            // Clear checkout if it's before new minimum
            if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(this.value)) {
                checkoutInput.value = '';
            }
        });
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active:after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .about-text, .restaurant-text');
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => animateOnScroll.observe(el));
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add smooth hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.room-card, .tour-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-bg);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: var(--shadow);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = 'var(--shadow-hover)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Restaurant Image Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentImageIndex = 0;
    
    if (carouselImages.length > 0) {
        function showNextImage() {
            // Remove active class from current image
            carouselImages[currentImageIndex].classList.remove('active');
            
            // Move to next image
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            
            // Add active class to new current image
            carouselImages[currentImageIndex].classList.add('active');
        }
        
        // Start the carousel - change image every 3 seconds
        setInterval(showNextImage, 3000);
    }
});

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithTranslations = document.querySelectorAll('[data-en][data-es]');
    
    // Get current language from localStorage or default to English
    let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            
            // Save language preference
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    });
    
    function setLanguage(language) {
        currentLanguage = language;
        
        // Update all elements with translations
        elementsWithTranslations.forEach(element => {
            const translation = element.getAttribute(`data-${language}`);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update language button states
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === language) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update document language attribute
        document.documentElement.lang = language;
        
        // Update WhatsApp message links based on language
        updateWhatsAppLinks(language);
        
        // Update page title and meta description
        updatePageMeta(language);
    }
    
    function updateWhatsAppLinks(language) {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        const messages = {
            en: {
                general: "Hello! I'm interested in staying at Puma Punku Eco Lodge on Isla del Sol. Could you please provide me with availability and rates?",
                standardRoom: "Hello! I'm interested in booking a Standard Room at Puma Punku Eco Lodge. Could you please check availability and rates?",
                familyRoom: "Hello! I'm interested in booking a Family Room at Puma Punku Eco Lodge for my family. Could you please check availability and rates?",
                suite: "Hello! I'm interested in booking the Suite at Puma Punku Eco Lodge. Could you please check availability and rates for your premium accommodation?",
                ruinsTour: "Hello! I'm interested in booking the Ancient Ruins Tour at Puma Punku Eco Lodge. Could you please provide details about availability and pricing?",
                culturalTour: "Hello! I'm interested in booking the Cultural Experience tour at Puma Punku Eco Lodge. Could you please provide details about availability and pricing?",
                boatTour: "Hello! I'm interested in booking the Boat Tours at Puma Punku Eco Lodge. Could you please provide details about availability and pricing?",
                booking: "Hello! I'm ready to book my stay at Puma Punku Eco Lodge on Isla del Sol. Could you please help me with availability and rates?"
            },
            es: {
                general: "¡Hola! Estoy interesado en hospedarme en Puma Punku Eco Lodge en la Isla del Sol. ¿Podrían proporcionarme disponibilidad y tarifas?",
                standardRoom: "¡Hola! Estoy interesado en reservar una Habitación Estándar en Puma Punku Eco Lodge. ¿Podrían verificar disponibilidad y tarifas?",
                familyRoom: "¡Hola! Estoy interesado en reservar una Habitación Familiar en Puma Punku Eco Lodge para mi familia. ¿Podrían verificar disponibilidad y tarifas?",
                suite: "¡Hola! Estoy interesado en reservar la Suite en Puma Punku Eco Lodge. ¿Podrían verificar disponibilidad y tarifas para su alojamiento premium?",
                ruinsTour: "¡Hola! Estoy interesado en reservar el Tour de Ruinas Ancestrales en Puma Punku Eco Lodge. ¿Podrían proporcionar detalles sobre disponibilidad y precios?",
                culturalTour: "¡Hola! Estoy interesado en reservar el tour de Experiencia Cultural en Puma Punku Eco Lodge. ¿Podrían proporcionar detalles sobre disponibilidad y precios?",
                boatTour: "¡Hola! Estoy interesado en reservar los Tours en Bote en Puma Punku Eco Lodge. ¿Podrían proporcionar detalles sobre disponibilidad y precios?",
                booking: "¡Hola! Estoy listo para reservar mi estadía en Puma Punku Eco Lodge en la Isla del Sol. ¿Podrían ayudarme con disponibilidad y tarifas?"
            }
        };
        
        whatsappLinks.forEach(link => {
            const href = link.getAttribute('href');
            let messageType = 'general';
            
            // Determine message type based on link context
            if (href.includes('Standard Room') || link.textContent.includes('Standard') || link.getAttribute('data-en')?.includes('Standard')) {
                messageType = 'standardRoom';
            } else if (href.includes('Family Room') || link.textContent.includes('Family') || link.getAttribute('data-en')?.includes('Family')) {
                messageType = 'familyRoom';
            } else if (href.includes('Suite') || link.textContent.includes('Suite') || link.getAttribute('data-en')?.includes('Suite')) {
                messageType = 'suite';
            } else if (href.includes('Ancient Ruins') || link.textContent.includes('Ruins') || link.getAttribute('data-en')?.includes('Ruins')) {
                messageType = 'ruinsTour';
            } else if (href.includes('Cultural Experience') || link.textContent.includes('Cultural') || link.getAttribute('data-en')?.includes('Cultural')) {
                messageType = 'culturalTour';
            } else if (href.includes('Boat Tours') || link.textContent.includes('Boat') || link.getAttribute('data-en')?.includes('Boat')) {
                messageType = 'boatTour';
            } else if (href.includes('ready to book') || link.textContent.includes('Book Your Stay') || link.getAttribute('data-en')?.includes('Book Your Stay')) {
                messageType = 'booking';
            }
            
            const newMessage = messages[language][messageType];
            const newHref = `https://wa.me/59171944013?text=${encodeURIComponent(newMessage)}`;
            link.setAttribute('href', newHref);
        });
    }
    
    function updatePageMeta(language) {
        const titles = {
            en: "Puma Punku Eco Lodge - Isla del Sol, Lake Titicaca, Bolivia",
            es: "Puma Punku Eco Lodge - Isla del Sol, Lago Titicaca, Bolivia"
        };
        
        const descriptions = {
            en: "Experience authentic Bolivian hospitality at Puma Punku Eco Lodge on Isla del Sol, Lake Titicaca. Offering tours, traditional cuisine, and comfortable lodging.",
            es: "Experimenta la auténtica hospitalidad boliviana en Puma Punku Eco Lodge en la Isla del Sol, Lago Titicaca. Ofrecemos tours, cocina tradicional y alojamiento cómodo."
        };
        
        document.title = titles[language];
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', descriptions[language]);
        }
    }
    
    // Add smooth transition effect for language changes
    function addLanguageTransition() {
        const style = document.createElement('style');
        style.textContent = `
            [data-en], [data-es] {
                transition: opacity 0.3s ease;
            }
            
            .language-switching {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
    
    addLanguageTransition();
});