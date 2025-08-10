document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.getElementById('closeSuccess');

    // Form validation and submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const country = document.getElementById('country').value;
        const terms = document.getElementById('terms').checked;

        // Check if at least one farming type is selected
        const farmingTypes = document.querySelectorAll('input[name="farmingType"]:checked');
        const hasFarmingType = farmingTypes.length > 0;

        let isValid = true;
        let errorFields = [];

        // Validate required fields
        if (!firstName) {
            isValid = false;
            errorFields.push('First Name');
            highlightField('firstName');
        }

        if (!lastName) {
            isValid = false;
            errorFields.push('Last Name');
            highlightField('lastName');
        }

        if (!email) {
            isValid = false;
            errorFields.push('Email Address');
            highlightField('email');
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorFields.push('Email Address (invalid format)');
            highlightField('email');
        }

        if (!phone) {
            isValid = false;
            errorFields.push('Phone Number');
            highlightField('phone');
        }

        if (!country) {
            isValid = false;
            errorFields.push('Country');
            highlightField('country');
        }

        if (!hasFarmingType) {
            isValid = false;
            errorFields.push('Type of Farming');
            document.querySelector('.checkbox-group').classList.add('error-highlight');
        }

        if (!terms) {
            isValid = false;
            errorFields.push('Terms and Conditions');
            document.querySelector('.terms-checkbox').classList.add('error-highlight');
        }

        // If form is valid, submit it
        if (isValid) {
            // In a real application, you would send the form data to a server here
            console.log('Form submitted successfully');

            // Show success message
            successMessage.classList.add('show');

            // Reset form
            form.reset();

            // Remove any error highlights
            const errorElements = document.querySelectorAll('.error-highlight');
            errorElements.forEach(el => el.classList.remove('error-highlight'));
        } else {
            // Alert user about errors
            alert('Please fill in the following required fields: ' + errorFields.join(', '));
        }
    });

    // Close success message
    closeSuccessBtn.addEventListener('click', function () {
        successMessage.classList.remove('show');
    });

    // Helper functions
    function highlightField(fieldId) {
        const field = document.getElementById(fieldId);
        field.classList.add('error-highlight');

        // Remove highlight when user starts typing
        field.addEventListener('input', function () {
            this.classList.remove('error-highlight');
        }, { once: true });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add error highlight style
    const style = document.createElement('style');
    style.textContent = `
        .error-highlight {
            border-color: #e53935 !important;
            background-color: rgba(229, 57, 53, 0.05) !important;
        }
    `;
    document.head.appendChild(style);

    // Make the form responsive to window resize
    function adjustFormLayout() {
        const windowWidth = window.innerWidth;
        const formRows = document.querySelectorAll('.form-row');

        if (windowWidth <= 768) {
            formRows.forEach(row => {
                row.style.flexDirection = 'column';
            });
        } else {
            formRows.forEach(row => {
                row.style.flexDirection = 'row';
            });
        }
    }

    // Initial layout adjustment
    adjustFormLayout();

    // Adjust layout on window resize
    window.addEventListener('resize', adjustFormLayout);
});


document.addEventListener('DOMContentLoaded', function () {
    // Get all accordion items
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Add click event listener to each accordion header
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');

            // If we want to allow only one open at a time, uncomment this:
            // Close all items
            // accordionItems.forEach(otherItem => {
            //     otherItem.classList.remove('active');
            // });

            // Toggle active class on the clicked item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Optional: Add keyboard accessibility
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        // Add tabindex to make headers focusable
        header.setAttribute('tabindex', '0');

        // Add keyboard event listener
        header.addEventListener('keydown', (e) => {
            // Activate on Enter or Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });

    // Optional: Add animation smoothness improvement
    window.addEventListener('resize', () => {
        const activeItems = document.querySelectorAll('.accordion-item.active');

        activeItems.forEach(item => {
            const content = item.querySelector('.accordion-content');

            // Temporarily remove transition to prevent animation issues on resize
            content.style.transition = 'none';

            // Force reflow
            void content.offsetWidth;

            // Restore transition
            setTimeout(() => {
                content.style.transition = '';
            }, 10);
        });
    });
});


window.addEventListener('scroll', () => {
    const header = document.querySelector('nav');
    header.classList.toggle('scrolled', window.scrollY > 50);
});


//program js
// Loading simulation and initialization
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('scheduleTable').style.display = 'table';
        document.getElementById('scheduleTable').style.opacity = '0';
        document.getElementById('scheduleTable').style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(function () {
            document.getElementById('scheduleTable').style.opacity = '1';
        }, 100);
    }, 1500);
});

// Performance optimization: Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe elements for fade-in animation
document.querySelectorAll('.day-card, .activity-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Accessibility improvements
document.querySelectorAll('.activity-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'article');
});

// Touch gesture optimization for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
        // Add smooth scroll behavior for swipe gestures
        if (diff > 0) {
            // Swipe up - scroll down
            window.scrollBy({ top: 100, behavior: 'smooth' });
        } else {
            // Swipe down - scroll up
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
    }
}

// Optimize for very small screens
function optimizeForSmallScreen() {
    if (window.innerWidth <= 200) {
        // Further optimize for 200px screens
        document.body.style.fontSize = '10px';

        // Compress spacing even more
        const dayCards = document.querySelectorAll('.day-card');
        dayCards.forEach(card => {
            card.style.marginBottom = '0.25rem';
        });

        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach(item => {
            item.style.padding = '0.2rem';
            item.style.marginBottom = '0.2rem';
        });
    }
}

window.addEventListener('resize', optimizeForSmallScreen);
window.addEventListener('load', optimizeForSmallScreen);

// Prevent horizontal scroll
document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Add keyboard navigation
document.addEventListener('keydown', function (e) {
    const focusableElements = document.querySelectorAll('.activity-item[tabindex="0"]');
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

    if (e.key === 'ArrowDown' && currentIndex < focusableElements.length - 1) {
        e.preventDefault();
        focusableElements[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        focusableElements[currentIndex - 1].focus();
    }
});