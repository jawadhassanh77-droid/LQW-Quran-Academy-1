// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#privacy' && href !== '#terms' && href !== '#refund') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
    const course = document.getElementById('course').value;

    // Create WhatsApp message
    const message = `Hello LQW Quran Academy! I want to start a 3-day free trial.

Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}
Child Age: ${age || 'N/A'}
Country: ${country}
Course Interested: ${course}

Please contact me to schedule my free trial classes.`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/923279906467?text=${encodedMessage}`, '_blank');

    // Reset form
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards and sections
document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .pricing-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Pricing card hover effect
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('popular')) {
            this.style.borderColor = 'var(--primary-green)';
            this.style.borderWidth = '2px';
            this.style.borderStyle = 'solid';
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('popular')) {
            this.style.border = 'none';
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-green)';
                navLink.style.fontWeight = '700';
            } else {
                navLink.style.color = '';
                navLink.style.fontWeight = '';
            }
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Testimonials auto-slide (simple version)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length > 3) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === testimonialIndex ? '1' : '0.3';
        });
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    }
}

// Uncomment to enable testimonial rotation every 5 seconds
// setInterval(rotateTestimonials, 5000);

// Console welcome message
console.log('%cWelcome to LQW Quran Academy!', 'color: #2d6e3f; font-size: 20px; font-weight: bold;');
console.log('%cStart your 3-day free trial today: https://wa.me/923279906467', 'color: #b8860b; font-size: 14px;');
