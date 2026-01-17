// Main JavaScript file

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle burger menu
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnBurger = burgerMenu.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Modal functionality
    const joinButton = document.getElementById('joinButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const cancelButton = document.getElementById('cancelButton');
    const joinForm = document.getElementById('joinForm');

    // Open modal when "Join us" button is clicked
    joinButton.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal functions
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        joinForm.reset(); // Reset form when closing
    }

    modalClose.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    joinForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const checkedEvents = Array.from(document.querySelectorAll('input[name="event"]:checked')).map(cb => cb.value);
        
        // Validate that at least one event is selected
        if (checkedEvents.length === 0) {
            alert('Please select at least one event you are interested in.');
            return;
        }
        
        // Here you can add code to send the data to a server
        // For now, we'll just log it and show an alert
        console.log('Form submitted:', { name, email, events: checkedEvents });
        alert(`Thank you for joining us, ${name}! We'll be in touch soon.`);
        
        // Close modal after submission
        closeModal();
    });
});

