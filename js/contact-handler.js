// Contact Form Handler
// Rezydencja Leśna Królewo

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('luxury-contact-form');
    
    if (!contactForm) return;
    
    // Form field references
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const privacyCheckbox = contactForm.querySelector('input[name="privacy"]');
    const submitButton = contactForm.querySelector('.btn-submit');
    
    // Polish phone number validation
    function validatePolishPhone(phone) {
        // Remove spaces and dashes
        const cleaned = phone.replace(/[\s-]/g, '');
        // Polish phone: +48 XXX XXX XXX or XXX XXX XXX
        const phoneRegex = /^(\+48)?[\s-]?([0-9]{3})[\s-]?([0-9]{3})[\s-]?([0-9]{3})$/;
        return phoneRegex.test(cleaned);
    }
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(field, message) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            error.style.cssText = `
                color: #d32f2f;
                font-size: 0.875rem;
                margin-top: 5px;
                display: block;
            `;
            field.parentElement.appendChild(error);
        }
        field.classList.add('error');
    }
    
    // Clear error message
    function clearError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }
    
    // Real-time validation
    nameField.addEventListener('blur', function() {
        if (this.value.trim().length < 2) {
            showError(this, 'Imię i nazwisko jest wymagane');
        } else {
            clearError(this);
        }
    });
    
    phoneField.addEventListener('blur', function() {
        if (!validatePolishPhone(this.value)) {
            showError(this, 'Wprowadź poprawny numer telefonu');
        } else {
            clearError(this);
        }
    });
    
    emailField.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Wprowadź poprawny adres email');
        } else {
            clearError(this);
        }
    });
    
    // Format phone number as user types
    phoneField.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 9) {
            value = value.substring(0, 9);
        }
        
        if (value.length >= 6) {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
        } else if (value.length >= 3) {
            value = value.substring(0, 3) + ' ' + value.substring(3);
        }
        
        this.value = value;
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear all errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Validate all fields
        let isValid = true;
        
        if (nameField.value.trim().length < 2) {
            showError(nameField, 'Imię i nazwisko jest wymagane');
            isValid = false;
        }
        
        if (!validatePolishPhone(phoneField.value)) {
            showError(phoneField, 'Wprowadź poprawny numer telefonu');
            isValid = false;
        }
        
        if (!validateEmail(emailField.value)) {
            showError(emailField, 'Wprowadź poprawny adres email');
            isValid = false;
        }
        
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox.parentElement, 'Musisz wyrazić zgodę na przetwarzanie danych');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loader-dots"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span></span>';
        
        // Prepare form data
        const formData = {
            name: nameField.value.trim(),
            phone: phoneField.value.trim(),
            email: emailField.value.trim(),
            message: messageField.value.trim(),
            property: 'Rezydencja Leśna Królewo',
            propertyId: '3223152',
            timestamp: new Date().toISOString()
        };
        
        try {
            // In a real implementation, you would send this to a server
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(formData);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Track submission (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Property Inquiry'
                });
            }
            
        } catch (error) {
            showErrorMessage();
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Umów Wizytę';
        }
    });
    
    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(data) {
        return new Promise((resolve) => {
            // Log form data (in production, send to server)
            console.log('Form submission:', data);
            
            // Simulate network delay
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    // Show success message
    function showSuccessMessage() {
        const successHTML = `
            <div class="form-success">
                <svg class="success-checkmark" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none"/>
                    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3>Dziękujemy za kontakt!</h3>
                <p>Mariusz Rudnicki skontaktuje się z Tobą wkrótce.</p>
                <p class="contact-direct">Możesz też zadzwonić bezpośrednio: <a href="tel:+48530690337">+48 530 690 337</a></p>
            </div>
        `;
        
        const successDiv = document.createElement('div');
        successDiv.innerHTML = successHTML;
        successDiv.style.cssText = `
            text-align: center;
            padding: 3rem;
            background: #f5f5f5;
            border-radius: 20px;
            margin-top: 2rem;
        `;
        
        contactForm.style.display = 'none';
        contactForm.parentElement.appendChild(successDiv);
        
        // Style the success message
        const style = document.createElement('style');
        style.textContent = `
            .form-success h3 {
                color: var(--forest-green);
                margin: 1rem 0;
            }
            
            .form-success p {
                color: var(--rich-charcoal);
                margin: 0.5rem 0;
            }
            
            .contact-direct a {
                color: var(--luxury-gold);
                text-decoration: none;
                font-weight: 600;
            }
            
            .contact-direct a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show error message
    function showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <p>Przepraszamy, wystąpił błąd. Proszę spróbować ponownie lub zadzwonić bezpośrednio: <a href="tel:+48530690337">+48 530 690 337</a></p>
        `;
        errorDiv.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
            text-align: center;
        `;
        
        contactForm.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Add floating label functionality
    const formInputs = contactForm.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Check if field has value on load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Add class when input has value
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Add input focus effects
    const style = document.createElement('style');
    style.textContent = `
        .form-input.error {
            border-bottom-color: #d32f2f !important;
        }
        
        .form-input.has-value ~ .form-label,
        .form-input:focus ~ .form-label {
            top: -20px;
            left: 0;
            font-size: 0.9rem;
            color: var(--forest-green);
        }
        
        .loader-dots {
            display: inline-flex;
            gap: 0.3rem;
        }
        
        .loader-dot {
            width: 8px;
            height: 8px;
            background-color: var(--warm-white);
            border-radius: 50%;
            animation: loaderDots 1.4s ease-in-out infinite both;
        }
        
        .loader-dot:nth-child(1) { animation-delay: -0.32s; }
        .loader-dot:nth-child(2) { animation-delay: -0.16s; }
        .loader-dot:nth-child(3) { animation-delay: 0; }
        
        @keyframes loaderDots {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});