// JavaScript Code for Legal Pocket Website

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize stats counter
    initializeStatsCounter();

    // Initialize chatbot functionality
    initializeChatbot();

    // Initialize documentation page
    initializeDocumentation();

    // Initialize fraud alerts
    initializeFraudAlerts();

    // Initialize rights page
    initializeRightsPage();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Logo click handler
    const logo = document.querySelector('.logo');
    if(logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Feature card click handlers
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureText = this.querySelector('h3').textContent;
            handleFeatureClick(featureText);
        });
    });

    // 3D card interaction
    const alertCard = document.querySelector('.alert-card-3d');
    if(alertCard) {
        alertCard.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(180deg)';
        });
        
        alertCard.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg)';
        });
    }

    // Floating shapes animation enhancement
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.addEventListener('mouseover', function() {
            this.style.opacity = '0.2';
            this.style.filter = 'blur(20px)';
        });
        
        shape.addEventListener('mouseout', function() {
            this.style.opacity = '0.1';
            this.style.filter = 'blur(40px)';
        });
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('onclick')) {
                e.preventDefault();
                // Add a ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size/2;
                const y = e.clientY - rect.top - size/2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Show login modal or redirect
                showLoginPrompt();
            }
        });
    });

    // Feature card hover effects
    const allFeatureCards = document.querySelectorAll('.feature-card');
    allFeatureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .alerts-content, .alerts-visual, .chatbot-content, .chatbot-visual, .doc-card, .category-card, .alert-card, .tip-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Stats Counter Animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = finalValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Chatbot Functionality
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.getElementById('chatMessages');
    const quickButtons = document.querySelectorAll('.quick-btn');

    if (chatInput && sendButton) {
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick question buttons
        quickButtons.forEach(button => {
            button.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatInput.value = question;
                sendMessage();
            });
        });
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.textContent = sender === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function generateBotResponse(message) {
        const responses = {
            'online fraud': 'If you\'re a victim of online fraud, immediately: 1) Contact your bank to freeze accounts, 2) File a police report, 3) Report to cyber crime cell, 4) Preserve all evidence including screenshots and transaction details. Time is critical in these cases.',
            'consumer rights': 'As a consumer, you have 6 key rights: 1) Right to Safety, 2) Right to be Informed, 3) Right to Choose, 4) Right to be Heard, 5) Right to Redressal, 6) Right to Consumer Education. You can file complaints with consumer forums for defective products.',
            'cyber crime': 'To report cyber crime: 1) Visit nearest cyber crime police station, 2) Use National Cyber Crime Reporting Portal, 3) Call cyber crime helpline: 1930, 4) Provide all evidence (screenshots, emails, transaction details), 5) Maintain complaint reference number.',
            'digital privacy': 'Your digital privacy rights include: 1) Protection of personal data, 2) Right to know data usage, 3) Right to correction and erasure, 4) Protection against unauthorized processing, 5) Right to data portability, 6) Right to withdraw consent.',
            'financial fraud': 'For financial fraud: 1) Immediately contact bank fraud department, 2) Block cards/accounts, 3) File FIR at police station, 4) Report to banking ombudsman, 5) Monitor credit reports, 6) Change all passwords immediately.',
            'default': 'I understand you\'re asking about legal matters. For specific legal advice, I recommend consulting with a qualified legal professional. I can provide general information about common legal topics like consumer rights, cyber crime prevention, digital privacy, and fraud protection. Could you be more specific about your concern?'
        };

        message = message.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }
}

// Documentation Page Functionality
function initializeDocumentation() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const docCards = document.querySelectorAll('.doc-card');
    const downloadButtons = document.querySelectorAll('.doc-download');
    const pdfModal = document.getElementById('pdfModal');
    const closeModal = document.getElementById('closeModal');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter documents
            docCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Download button functionality
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pdfName = this.getAttribute('data-pdf');
            const docTitle = this.closest('.doc-card').querySelector('h3').textContent;
            showPdfViewer(docTitle, pdfName);
        });
    });

    // Close modal functionality
    if (closeModal && pdfModal) {
        closeModal.addEventListener('click', function() {
            pdfModal.style.display = 'none';
        });

        // Close modal when clicking outside
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                pdfModal.style.display = 'none';
            }
        });
    }
}

function showPdfViewer(title, pdfName) {
    const pdfModal = document.getElementById('pdfModal');
    const pdfTitle = document.getElementById('pdfTitle');
    const pdfViewer = document.getElementById('pdfViewer');

    if (pdfModal && pdfTitle && pdfViewer) {
        pdfTitle.textContent = title;
        
        // In a real implementation, this would load the actual PDF
        pdfViewer.innerHTML = `
            <div class="pdf-placeholder">
                <div class="pdf-icon">📄</div>
                <h4>${title}</h4>
                <p>This would display the actual PDF document: <strong>${pdfName}</strong></p>
                <p class="pdf-note">In a real implementation, this viewer would show the complete PDF document with navigation, zoom, and download options.</p>
                <div class="pdf-actions">
                    <button class="cta-button" onclick="downloadPdf('${pdfName}')">Download PDF</button>
                    <button class="secondary-button" onclick="printPdf('${pdfName}')">Print Document</button>
                </div>
            </div>
        `;
        
        pdfModal.style.display = 'block';
    }
}

function downloadPdf(pdfName) {
    alert(`In a real implementation, this would download: ${pdfName}`);
    // Simulate download
    console.log(`Downloading: ${pdfName}`);
}

function printPdf(pdfName) {
    alert(`In a real implementation, this would print: ${pdfName}`);
    // Simulate print
    console.log(`Printing: ${pdfName}`);
}

// Fraud Alerts Functionality
function initializeFraudAlerts() {
    const alertActions = document.querySelectorAll('.alert-action');
    const alertModal = document.getElementById('alertModal');
    const closeModal = document.querySelector('.close-modal');

    if (alertActions.length > 0) {
        alertActions.forEach(action => {
            action.addEventListener('click', function() {
                const alertId = this.getAttribute('onclick').match(/\d+/)[0];
                showAlertDetails(parseInt(alertId));
            });
        });
    }

    if (closeModal && alertModal) {
        closeModal.addEventListener('click', closeAlertModal);

        // Close modal when clicking outside
        alertModal.addEventListener('click', function(e) {
            if (e.target === alertModal) {
                closeAlertModal();
            }
        });
    }
}

function showAlertDetails(alertId) {
    const alertModal = document.getElementById('alertModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (alertModal && modalTitle && modalBody) {
        const alertData = getAlertData(alertId);
        
        modalTitle.textContent = alertData.title;
        modalBody.innerHTML = alertData.content;
        
        alertModal.style.display = 'block';
    }
}

function closeAlertModal() {
    const alertModal = document.getElementById('alertModal');
    if (alertModal) {
        alertModal.style.display = 'none';
    }
}

function getAlertData(alertId) {
    const alerts = {
        1: {
            title: "UPI Payment Scam - Critical Alert",
            content: `
                <div class="alert-detail">
                    <div class="alert-severity critical">CRITICAL THREAT</div>
                    <div class="alert-description">
                        <h4>Description:</h4>
                        <p>Scammers are sending fake payment requests through UPI apps like Google Pay, PhonePe, and Paytm. They pretend to be from legitimate sources and ask users to approve payments.</p>
                        
                        <h4>How it Works:</h4>
                        <ul>
                            <li>Fake payment requests from unknown numbers</li>
                            <li>Messages claiming to be from banks or service providers</li>
                            <li>Requests for small amounts that can be increased later</li>
                            <li>Social engineering to gain trust</li>
                        </ul>
                        
                        <h4>Protection Measures:</h4>
                        <ul>
                            <li>Never approve payment requests from unknown numbers</li>
                            <li>Verify the sender's identity before any transaction</li>
                            <li>Enable two-factor authentication</li>
                            <li>Use UPI PIN only for sending money, not receiving</li>
                        </ul>
                        
                        <h4>If Affected:</h4>
                        <ol>
                            <li>Immediately contact your bank</li>
                            <li>File complaint with cyber crime cell</li>
                            <li>Report to National Cyber Crime Reporting Portal</li>
                            <li>Block the sender's UPI ID</li>
                        </ol>
                    </div>
                </div>
            `
        },
        2: {
            title: "Fake Investment Schemes - High Alert",
            content: `
                <div class="alert-detail">
                    <div class="alert-severity high">HIGH RISK</div>
                    <div class="alert-description">
                        <h4>Description:</h4>
                        <p>Fraudulent investment schemes promising high returns on crypto, stocks, and other investments are spreading rapidly through social media platforms.</p>
                        
                        <h4>Red Flags:</h4>
                        <ul>
                            <li>Guaranteed high returns with no risk</li>
                            <li>Pressure to invest quickly</li>
                            <li>Unregistered investment platforms</li>
                            <li>Fake celebrity endorsements</li>
                        </ul>
                    </div>
                </div>
            `
        },
        3: {
            title: "QR Code Scams - Medium Alert",
            content: `
                <div class="alert-detail">
                    <div class="alert-severity medium">MEDIUM RISK</div>
                    <div class="alert-description">
                        <h4>Description:</h4>
                        <p>Scammers are placing fake QR codes in public places, particularly parking lots, to steal payment information.</p>
                    </div>
                </div>
            `
        },
        4: {
            title: "Delivery Scam Messages - Medium Alert",
            content: `
                <div class="alert-detail">
                    <div class="alert-severity medium">MEDIUM RISK</div>
                    <div class="alert-description">
                        <h4>Description:</h4>
                        <p>Fake delivery notifications are being used to steal personal information and payment details.</p>
                    </div>
                </div>
            `
        }
    };

    return alerts[alertId] || alerts[1];
}

// Rights Page Functionality
function initializeRightsPage() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
            showRights(category);
        });
    });
}

function showRights(category) {
    const rightsContent = document.getElementById('rightsContent');
    const allCategories = document.querySelectorAll('.rights-category');
    const defaultContent = document.querySelector('.default-content');

    // Hide all categories and default content
    allCategories.forEach(cat => cat.classList.remove('active'));
    if (defaultContent) defaultContent.style.display = 'none';

    // Show selected category
    const selectedCategory = document.querySelector(`.${category}-rights`);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
}

// Feature Click Handler
function handleFeatureClick(featureName) {
    const featureRoutes = {
        'Know Your Rights': 'rights.html',
        'Action Guides': 'fraud-alerts.html',
        'Fraud Alerts': 'fraud-alerts.html',
        'AI Legal Assistant': 'chatbot.html',
        'Case Analysis': 'documentation.html',
        'Expert Connect': 'login.html'
    };

    const route = featureRoutes[featureName];
    if (route) {
        window.location.href = route;
    }
}

// Login Prompt
function showLoginPrompt() {
    // In a real implementation, this would show a login modal
    // For now, redirect to login page
    window.location.href = 'login.html';
}

// Form Handling
function handleLoginForm() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Simulate login process
                showLoadingState();
                
                setTimeout(() => {
                    // Successful login - redirect to dashboard
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showMessage('Please fill in all fields', 'error');
            }
        });
    }
}

function showLoadingState() {
    const submitButton = document.querySelector('.login-btn');
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Signing In...';
        submitButton.disabled = true;
        
        // Revert after 2 seconds (simulated login)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'error' ? 'var(--critical)' : 'var(--success)'};
        color: white;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add CSS for slideIn animation
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
    
    .alert-detail {
        color: var(--light);
    }
    
    .alert-severity {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .alert-severity.critical {
        background: var(--critical);
        color: white;
    }
    
    .alert-severity.high {
        background: var(--warning);
        color: black;
    }
    
    .alert-severity.medium {
        background: var(--primary);
        color: white;
    }
    
    .alert-detail h4 {
        margin: 1.5rem 0 0.5rem 0;
        color: var(--primary);
    }
    
    .alert-detail ul, .alert-detail ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .alert-detail li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }
    
    .pdf-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
`;
document.head.appendChild(style);

// Initialize login form handling
document.addEventListener('DOMContentLoaded', function() {
    handleLoginForm();
});

// Export functions for global access
window.showAlertDetails = showAlertDetails;
window.closeAlertModal = closeAlertModal;
window.downloadPdf = downloadPdf;
window.printPdf = printPdf;
window.showRights = showRights;