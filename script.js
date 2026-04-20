// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    });
});

// ===================================
// HEADER SHADOW ON SCROLL
// ===================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50
            ? '0 4px 12px rgba(0,0,0,0.15)'
            : '0 4px 6px rgba(0,0,0,0.1)';
    });
}

// ===================================
// CONTACT FORM → WHATSAPP
// ===================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name     = document.getElementById('name').value;
        const email    = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const age      = document.getElementById('age').value;
        const country  = document.getElementById('country').value;
        const course   = document.getElementById('course').value;

        const message = `Hello Tajweed Quran Academy! I want to start a 3-day free trial.\n\nName: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nChild Age: ${age || 'N/A'}\nCountry: ${country}\nCourse Interested: ${course}\n\nPlease contact me to schedule my free trial classes.`;
        window.open(`https://wa.me/923279906467?text=${encodeURIComponent(message)}`, '_blank');
        contactForm.reset();
    });
}

// ===================================
// FADE-IN ON SCROLL
// ===================================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feature-card, .course-card, .pricing-card-v2, .service-card, .tool-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    fadeObserver.observe(el);
});

// ===================================
// ACTIVE NAV HIGHLIGHTING
// ===================================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 110;
        const id  = section.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + section.offsetHeight) {
                link.style.color = 'var(--primary-green)';
                link.style.fontWeight = '700';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        }
    });
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================
const starSVG = (filled) => `<svg viewBox="0 0 24 24" fill="${filled ? '#b8860b' : '#ddd'}" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

function buildStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) html += starSVG(i <= rating);
    return html;
}

const reviews = [
    { name: 'Sister Sarah', location: 'London, UK', rating: 5, text: 'Alhamdulillah, my kids are learning Tajweed with so much interest. The female teacher is very patient and professional. The one-to-one classes are perfect for my children. Highly recommended for families in the UK!' },
    { name: 'Brother Ahmed', location: 'New York, USA', rating: 5, text: 'I wanted to improve my Quran recitation as an adult. Tajweed Quran Academy provided me with a flexible schedule that perfectly fits my work life. The one-to-one focus is truly amazing.' },
    { name: 'Sister Fatima', location: 'Toronto, Canada', rating: 5, text: 'Best online academy we have tried. The Noorani Qaida foundation they built for my 6-year-old is solid. Very affordable and extremely reliable. JazakAllah Khair to all the teachers.' },
    { name: 'Brother Umar', location: 'Birmingham, UK', rating: 5, text: 'My son was struggling with Arabic pronunciation for years. Within two months at Tajweed Quran Academy, his recitation improved dramatically. The teachers are knowledgeable and certified.' },
    { name: 'Sister Aisha', location: 'Manchester, UK', rating: 5, text: 'Excellent teaching quality and very organized lessons. My daughter looks forward to every class. The structured curriculum and patience of the teachers is unmatched. Truly a blessed academy.' },
    { name: 'Brother Hassan', location: 'Sydney, Australia', rating: 5, text: 'I enrolled my two children in Hifz classes and the progress they are making is mashallah incredible. The teachers are dedicated Hafiz with strong methodology. 100% recommended!' },
    { name: 'Sister Maryam', location: 'Dallas, USA', rating: 5, text: 'As a revert Muslim, I was nervous about starting Quran learning. The teacher made me feel so comfortable and the beginner course was perfectly paced. I am now reading Quran fluently.' },
    { name: 'Brother Ibrahim', location: 'Vancouver, Canada', rating: 5, text: 'The free trial class was what convinced me. They assessed my level accurately and matched me with the right teacher. The pricing is very fair for the quality of education provided.' },
    { name: 'Sister Khadija', location: 'Dubai, UAE', rating: 5, text: 'We tried many online Quran apps but nothing compares to live one-to-one sessions. My kids have memorized 5 Surahs in 3 months. The teachers are motivating and very dedicated.' },
    { name: 'Brother Yusuf', location: 'Dublin, Ireland', rating: 5, text: 'Fantastic experience from start to finish. The enrollment process was smooth, the teacher is excellent, and my son loves his Quran sessions. We are very happy with Tajweed Quran Academy.' },
];

const track    = document.getElementById('testimonials-track');
const dotsWrap = document.getElementById('slider-dots');
const prevBtn  = document.getElementById('slider-prev');
const nextBtn  = document.getElementById('slider-next');

let currentIndex = 0;
let perPage = 3;
let autoTimer;

function getPerPage() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function totalPages() {
    return Math.ceil(reviews.length / getPerPage());
}

function buildSlide(review) {
    const isLong = review.text.length > 160;
    const div = document.createElement('div');
    div.className = 'testimonial-slide';
    div.innerHTML = `
        <div class="testimonial-card">
            <div class="stars">${buildStars(review.rating)}</div>
            <p class="testimonial-text${isLong ? ' clamped' : ''}">"${review.text}"</p>
            ${isLong ? '<button class="read-more-btn">Read More</button>' : ''}
            <p class="testimonial-author">${review.name}</p>
            <p class="testimonial-location">${review.location}</p>
        </div>`;

    if (isLong) {
        const btn = div.querySelector('.read-more-btn');
        const txt = div.querySelector('.testimonial-text');
        btn.addEventListener('click', () => {
            txt.classList.toggle('clamped');
            btn.textContent = txt.classList.contains('clamped') ? 'Read More' : 'Show Less';
        });
    }
    return div;
}

function renderSlides() {
    if (!track) return;
    track.innerHTML = '';
    const pp = getPerPage();
    reviews.forEach(r => {
        const slide = buildSlide(r);
        slide.style.minWidth = `${100 / pp}%`;
        track.appendChild(slide);
    });
}

function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const pages = totalPages();
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Go to page ${i + 1}`);
        dot.addEventListener('click', () => { goTo(i); startAuto(); });
        dotsWrap.appendChild(dot);
    }
}

function goTo(index) {
    if (!track) return;
    const pages = totalPages();
    currentIndex = (index + pages) % pages;
    const pp = getPerPage();
    track.style.transform = `translateX(-${currentIndex * pp * (100 / reviews.length)}%)`;
    if (dotsWrap) {
        dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentIndex);
        });
    }
}

function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(currentIndex + 1), 4500);
}

if (track) {
    perPage = getPerPage();
    renderSlides();
    renderDots();
    goTo(0);
    startAuto();

    prevBtn && prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); startAuto(); });
    nextBtn && nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); startAuto(); });

    window.addEventListener('resize', () => {
        const newPP = getPerPage();
        if (newPP !== perPage) {
            perPage = newPP;
            renderSlides();
            renderDots();
            goTo(0);
        }
    });
}

// ===================================
// REVIEW SUBMISSION FORM
// ===================================
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name     = document.getElementById('rv-name').value.trim();
        const location = document.getElementById('rv-location').value.trim();
        const text     = document.getElementById('rv-text').value.trim();
        const ratingEl = document.querySelector('input[name="rv-rating"]:checked');
        const rating   = ratingEl ? parseInt(ratingEl.value) : 5;

        if (!name || !location || !text) return;

        reviews.unshift({ name, location, rating, text });
        renderSlides();
        renderDots();
        goTo(0);
        startAuto();

        document.getElementById('review-success').style.display = 'block';
        reviewForm.reset();
        setTimeout(() => {
            document.getElementById('review-success').style.display = 'none';
        }, 5000);
    });
}

// ===================================
// LEAD FORM (index.html contact section)
// ===================================
function submitLeadForm(e) {
    e.preventDefault();
    const f = e.target;
    const student = f.student_name?.value || '';
    const parent  = f.parent_name?.value  || '';
    const email   = f.email?.value        || '';
    const wa      = f.whatsapp?.value     || '';
    const course  = f.course?.value       || '';
    const gender  = f.gender?.value       || '';
    const msg = `Free Trial Request%0A%0AStudent: ${encodeURIComponent(student)}%0AParent: ${encodeURIComponent(parent)}%0AEmail: ${encodeURIComponent(email)}%0AWhatsApp: ${encodeURIComponent(wa)}%0ACourse: ${encodeURIComponent(course)}%0AGender: ${encodeURIComponent(gender)}`;
    window.open(`https://wa.me/923279906467?text=${msg}`, '_blank');
}

// ===================================
// CURRENCY TOGGLE (GBP / USD)
// ===================================
(function() {
    const toggle = document.getElementById('currency-toggle');
    if (!toggle) return;

    const labelGBP = document.getElementById('currency-label-gbp');
    const labelUSD = document.getElementById('currency-label-usd');

    function updatePrices(useUSD) {
        document.querySelectorAll('.plan-price[data-gbp][data-usd]').forEach(function(el) {
            const gbp = el.getAttribute('data-gbp');
            const usd = el.getAttribute('data-usd');
            const suffix = el.querySelector('span');
            if (useUSD) {
                el.childNodes[0].textContent = '$' + usd + ' ';
            } else {
                el.childNodes[0].textContent = '£' + gbp + ' ';
            }
        });

        if (labelGBP && labelUSD) {
            labelGBP.classList.toggle('active', !useUSD);
            labelUSD.classList.toggle('active', useUSD);
        }
    }

    toggle.addEventListener('change', function() {
        updatePrices(this.checked);
    });

    updatePrices(false);
})();

// ===================================
// CONSOLE BRANDING
// ===================================
console.log('%cWelcome to Tajweed Quran Academy!', 'color: #2d6e3f; font-size: 20px; font-weight: bold;');
console.log('%cStart your 3-day free trial today: https://wa.me/923279906467', 'color: #b8860b; font-size: 14px;');
