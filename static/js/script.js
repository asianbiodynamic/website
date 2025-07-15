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
