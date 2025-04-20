// Main script file - updated April 2025
// Made some changes to improve the animation and navbar effects

document.addEventListener('DOMContentLoaded', function() {
    // make navbar change on scroll
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        // add scrolled class when we scroll down a bit
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // cool fade-in effect when scrolling
    // found this on stackoverflow and modified it
    var fadeElements = document.querySelectorAll('.fade-in');
    
    var fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // once it's visible, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // offset from bottom
    });
    
    // observe all fade elements
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // highlight the active page in navbar
    var currentLocation = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        var linkPath = link.getAttribute('href');
        var currentPage = currentLocation.split('/').pop();
        
        // check if we're on the right page
        if (linkPath === currentPage || 
            (currentLocation === '/' && linkPath === 'index.html') || 
            (currentLocation === '/index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // validate the contact form
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // TODO: add actual form submission with AJAX
                // for now just show a message that it's a demo
                event.preventDefault();
                alert('Thanks for your message! This is a demo, so no message was actually sent.');
                contactForm.reset();
            }
            contactForm.classList.add('was-validated');
        });
    }

    // bootstrap tooltips initialization
    // need to fix this later - sometimes doesn't work right on mobile
    try {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    } catch(err) {
        console.log('Tooltip error: ' + err);
    }
});
