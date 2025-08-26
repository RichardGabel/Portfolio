document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");
  
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  let hasErrors = false;
  
  // Clear previous error/success states and hide all error messages
  [nameField, emailField, messageField].forEach(field => {
    field.classList.remove('error', 'success');
    const errorDiv = document.getElementById(field.id + '-error');
    errorDiv.classList.remove('show');
  });

  // Validate name
  if (!name) {
    showFieldError('name', "Your name is required.");
    nameField.classList.add('error');
    hasErrors = true;
  } else {
    nameField.classList.add('success');
  }

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    showFieldError('email', "Your email is required.");
    emailField.classList.add('error');
    hasErrors = true;
  } else if (!email.match(emailPattern)) {
    showFieldError('email', "Please enter a valid email address.");
    emailField.classList.add('error');
    hasErrors = true;
  } else {
    emailField.classList.add('success');
  }

  // Validate message
  if (!message) {
    showFieldError('message', "Your message is required.");
    messageField.classList.add('error');
    hasErrors = true;
  } else {
    messageField.classList.add('success');
  }

  if (hasErrors) {
    // Scroll to first error field
    const firstErrorField = document.querySelector('.error');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorField.focus();
    }
    return;
  }

  const formData = new FormData(this);

  fetch("https://formspree.io/f/movvyawr", {
    method: "POST",
    body: formData,
    mode: 'no-cors'
  })
    .then(() => {
      document.getElementById("contactForm").style.display = "none";
      document.getElementById("thankYouMessage").style.display = "block";

      setTimeout(() => {
        document.getElementById("thankYouMessage").style.display = "none";
        document.getElementById("contactForm").style.display = "block";
        // Reset form and remove success classes
        this.reset();
        [nameField, emailField, messageField].forEach(field => {
          field.classList.remove('error', 'success');
          const errorDiv = document.getElementById(field.id + '-error');
          errorDiv.classList.remove('show');
        });
      }, 5000);
    })
    .catch(error => {
      showFieldError('general', "Something went wrong. Please try again later.");
    });
});

// Function to show individual field errors
function showFieldError(fieldId, message) {
  const errorDiv = document.getElementById(fieldId + '-error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
  }
}

// Clear individual field errors
function clearFieldError(fieldId) {
  const errorDiv = document.getElementById(fieldId + '-error');
  if (errorDiv) {
    errorDiv.classList.remove('show');
  }
}

// Function to validate a field programmatically
function validateField(field) {
  const fieldId = field.id;
  const value = field.value.trim();
  
  // Always clear previous states first
  field.classList.remove('error', 'success');
  clearFieldError(fieldId);
  
  switch(fieldId) {
    case 'name':
      if (value) {
        field.classList.add('success');
      }
      break;
      
    case 'email':
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value && value.match(emailPattern)) {
        field.classList.add('success');
      } else if (value && !value.match(emailPattern)) {
        field.classList.add('error');
        showFieldError('email', "Please enter a valid email address.");
      }
      break;
      
    case 'message':
      if (value) {
        field.classList.add('success');
      }
      break;
  }
}

// Detect autofill and validate fields
function checkForAutofill() {
  const fields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("message")
  ];
  
  fields.forEach(field => {
    if (field && field.value.trim()) {
      validateField(field);
    }
  });
}

// Simple autofill detection
function setupAutofillDetection() {
  const fields = ['name', 'email', 'message'];
  
  fields.forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    
    // Basic event listeners
    field.addEventListener('input', function() {
      validateField(this);
    });
    
    field.addEventListener('change', function() {
      validateField(this);
    });
    
    field.addEventListener('blur', function() {
      validateField(this);
    });
  });
}

// Check for autofill on page load
document.addEventListener('DOMContentLoaded', function() {
  setupAutofillDetection();
  
  // Simple delayed check for autofill
  setTimeout(checkForAutofill, 1000);
});

// Check when page is fully loaded
window.addEventListener('load', function() {
  setTimeout(checkForAutofill, 500);
});
