// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add retro terminal typing effect
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.innerHTML = '';
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    // Apply typing effect to subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 100);
    }

    // Add blur effect to navigation on scroll
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('glass');
        } else {
            nav.classList.remove('glass');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Enhanced form handling with email functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitBtn.querySelector('.button-text');
            const spinner = submitBtn.querySelector('.spinner');
            
            // Show loading state
            buttonText.style.display = 'none';
            spinner.style.display = 'block';
            submitBtn.disabled = true;

            try {
                // Get form data
                const formData = new FormData(contactForm);
                const data = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    message: formData.get('message'),
                    to_name: 'Jhimuel', // Your name
                    to_email: 'jmgnaye@gmail.com', // Destination email
                    reply_to: formData.get('email')
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    'service_xxxxxxx', // Replace with your EmailJS service ID
                    'template_xxxxxxx', // Replace with your EmailJS template ID
                    data,
                    'YOUR_USER_ID' // Replace with your EmailJS user ID
                );

                if (response.status === 200) {
                    // Show success message
                    showSuccessMessage('Message sent successfully! I will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error sending email:', error);
                showSuccessMessage('Failed to send message. Please try again.', true);
            } finally {
                // Reset button state
                buttonText.style.display = 'block';
                spinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // Success message function
    function showSuccessMessage(message, isError = false) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        if (isError) {
            successDiv.style.color = '#ff4444';
        }
        document.body.appendChild(successDiv);
        
        // Show message
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);

        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 3000);
    }

    // Project cards with hover effect
    const projects = [
        {
            title: 'Project 1',
            description: 'A modern web application with glass morphism design.',
            image: 'images/project1.jpg',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: '#'
        },
        {
            title: 'Project 2',
            description: 'A responsive website with blur effects.',
            image: 'images/project2.jpg',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            link: '#'
        },
        {
            title: 'Project 3',
            description: 'A mobile-first web application.',
            image: 'images/project3.jpg',
            technologies: ['React', 'Firebase', 'Tailwind'],
            link: '#'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass';
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="btn primary">View Project</a>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // Add parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.section').forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.backgroundPositionY = `${yPos}px`;
        });
    });

    // Fade in sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        observer.observe(section);
    });

    // Add retro cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}); 