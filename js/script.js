document.addEventListener('DOMContentLoaded', () => {
    /* 1. Navbar Scroll Effect */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 2. Mobile Menu Toggle */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    /* 3. Reveal on Scroll Animation */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* 4. Form Validation & Submission */
    const messageForm = document.getElementById('messageForm');
    const resultDisplay = document.getElementById('resultDisplay');

    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors
            const groups = messageForm.querySelectorAll('.form-group');
            groups.forEach(g => g.classList.remove('error'));

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Basic Validation logic
            if (!name) {
                showError('name');
                isValid = false;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('email');
                isValid = false;
            }
            if (!message) {
                showError('message');
                isValid = false;
            }

            if (isValid) {
                handleSuccess({ name, email, message });
            }
        });
    }

    function showError(fieldId) {
        const field = document.getElementById(fieldId);
        field.parentElement.classList.add('error');
    }

    function handleSuccess(data) {
        const now = new Date();
        const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        resultDisplay.classList.add('has-data');
        resultDisplay.innerHTML = `
            <div class="result-animate">
                <h3 style="margin-bottom: 2rem; color: var(--primary);">
                    <i class="fas fa-check-circle"></i> Message Sent Successfully
                </h3>
                <div class="result-item">
                    <label>Timestamp</label>
                    <span>${timeString}</span>
                </div>
                <div class="result-item">
                    <label>From</label>
                    <span>${data.name}</span>
                </div>
                <div class="result-item">
                    <label>Email</label>
                    <span>${data.email}</span>
                </div>
                <div class="result-item">
                    <label>Message Content</label>
                    <p>${data.message}</p>
                </div>
            </div>
        `;

        messageForm.reset();
        
        // Animated scroll to result
        setTimeout(() => {
            resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    /* 5. Minimalist Personalization (Replacement for prompt) */
    // Instead of prompt, we check if name is in localStorage or just show a nice default
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.textContent.includes('Welcome')) {
        const hours = new Date().getHours();
        let greeting = "Welcome";
        if (hours < 12) greeting = "Good Morning";
        else if (hours < 18) greeting = "Good Afternoon";
        else greeting = "Good Evening";
        
        // If we want to bring back the name, we could do it via a more subtle UI element
        // but for "minimalist" and "tidy", the current hero title is already clean.
        // Let's just update the content slightly for better copy.
        // heroTitle.textContent = `${greeting}, We are TechSolutions`;
    }
});
