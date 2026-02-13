// ============================================
// Navigation & Mobile Menu
// ============================================
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Hero Stats Counter Animation
// ============================================
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }

        if (end >= 1000) {
            element.textContent = (Math.floor(current / 1000)) + 'K+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateValue(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ============================================
// Service Tabs
// ============================================
const tabBtns = document.querySelectorAll('.tab-btn');
const packagesContainers = document.querySelectorAll('.packages-container');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        // Remove active class from all buttons and containers
        tabBtns.forEach(b => b.classList.remove('active'));
        packagesContainers.forEach(container => container.classList.remove('active'));

        // Add active class to clicked button and corresponding container
        btn.classList.add('active');
        const targetContainer = document.getElementById(`${targetTab}-packages`);
        if (targetContainer) {
            targetContainer.classList.add('active');
        }
    });
});

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form Data:', data);

        // Show success message
        showNotification('شكراً على تواصلك! راح نرجعلك في أقرب وقت', 'success');

        // Reset form
        contactForm.reset();

        // Here you would send data to your backend
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showNotification('شكراً على تواصلك! راح نرجعلك في أقرب وقت', 'success');
                contactForm.reset();
            } else {
                showNotification('حدث خطأ. حاول مرة أخرى', 'error');
            }
        } catch (error) {
            showNotification('حدث خطأ. حاول مرة أخرى', 'error');
        }
        */
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade animation
document.querySelectorAll('.project-card, .package, .result-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ============================================
// Form Input Animations
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Prevent Right Click on Images (Optional)
// ============================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

console.log('Portfolio loaded successfully ✓');

// ============================================
// (removed package-note toggle — package notes are now permanent list items)

// ============================================
// Suspension Popup Logic
// ============================================
const translations = {
    ar: {
        title: "تنبيه تعليق الموقع",
        message: "سيتم تعليق هذا الموقع الإلكتروني قريباً ما لم يتم اتخاذ الإجراءات اللازمة من قبل المالك.",
        fyiTitle: "لمعلوماتك (FYI)",
        fyiText: "الموقع قد يتوقف عن العمل في أي لحظة. يرجى التواصل مع الإدارة فوراً لتجنب فقدان البيانات.",
        faqTitle: "الأسئلة الشائعة (FAQ)",
        faqText: "لماذا يظهر هذا؟ عادةً ما يكون ذلك بسبب تأخر في مستحقات الاستضافة، الصيانة، أو انتهاء صلاحية النطاق.",
        reasonsTitle: "الأسباب المحتملة:",
        reasons: [
            "تأخر الدفع (Unpaid Invoices)",
            "انتهاء مدة النطاق (Domain Expiry)",
            "تجاوز استهلاك الموارد (Resource Limit Overload)",
            "إجراءات إدارية عالقة",
            "تحديثات أمنية حرجة غير مكتملة"
        ],
        action: "يرجى من صاحب الموقع التواصل مع المطور لحل المشكلة بشكل عاجل.",
        toggleBtn: "FR"
    },
    fr: {
        title: "Avis de Suspension",
        message: "Ce site web sera bientôt suspendu à moins que le propriétaire ne prenne les mesures nécessaires.",
        fyiTitle: "Pour Info (FYI)",
        fyiText: "Le site peut cesser de fonctionner à tout moment. Veuillez contacter l'administration immédiatement pour éviter toute perte de données.",
        faqTitle: "FAQ",
        faqText: "Pourquoi cela s'affiche-t-il ? Généralement en raison d'un retard dans les frais d'hébergement, de maintenance, ou d'expiration du domaine.",
        reasonsTitle: "Raisons possibles :",
        reasons: [
            "Factures impayées (Unpaid Invoices)",
            "Expiration du domaine (Domain Expiry)",
            "Dépassement de consommation de ressources (Resource Limit)",
            "Procédures administratives en attente",
            "Mises à jour de sécurité critiques non terminées"
        ],
        action: "Le propriétaire du site est prié de contacter le développeur pour résoudre le problème de toute urgence.",
        toggleBtn: "AR"
    }
};

let currentLang = 'ar';

function updatePopupContent(lang) {
    const t = translations[lang];
    document.getElementById('popupTitle').textContent = t.title;
    document.getElementById('popupMessage').textContent = t.message;
    document.getElementById('fyiTitle').textContent = t.fyiTitle;
    document.getElementById('fyiText').textContent = t.fyiText;
    document.getElementById('faqTitle').textContent = t.faqTitle;
    document.getElementById('faqText').textContent = t.faqText;
    document.getElementById('reasonsTitle').textContent = t.reasonsTitle;
    document.getElementById('actionMsg').textContent = t.action;
    document.getElementById('langToggle').textContent = t.toggleBtn;

    const reasonsList = document.getElementById('reasonsList');
    reasonsList.innerHTML = '';
    t.reasons.forEach(reason => {
        const li = document.createElement('li');
        li.textContent = reason;
        reasonsList.appendChild(li);
    });

    const overlay = document.getElementById('suspensionOverlay');
    if (lang === 'fr') {
        overlay.classList.add('lang-fr');
    } else {
        overlay.classList.remove('lang-fr');
    }
}

function initSuspensionPopup() {
    const overlay = document.getElementById('suspensionOverlay');
    const closeBtn = document.getElementById('closePopup');
    const langToggle = document.getElementById('langToggle');

    if (!overlay) return;

    // Show popup on load
    setTimeout(() => {
        overlay.style.display = 'flex';
    }, 1000);

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'fr' : 'ar';
        updatePopupContent(currentLang);
    });

    // Close on outside click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Set initial content (Arabic)
    updatePopupContent('ar');
}

// Initialize on window load
window.addEventListener('load', () => {
    initSuspensionPopup();
});
