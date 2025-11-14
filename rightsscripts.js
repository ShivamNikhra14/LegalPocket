// JavaScript for Expandable Rights Sections
document.addEventListener('DOMContentLoaded', function() {
    initializeExpandableSections();
});

function initializeExpandableSections() {
    const expandableBtns = document.querySelectorAll('.expandable-btn');
    
    // Add click event listeners to all expandable buttons
    expandableBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            toggleSection(section, this);
        });
        
        // Add keyboard accessibility
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                toggleSection(section, this);
            }
        });
    });
    
    // Add event listeners to action buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const downloadButtons = document.querySelectorAll('.download-guide');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent button click
            const section = this.closest('.expandable-section').querySelector('.expandable-btn').getAttribute('data-section');
            handleLearnMoreClick(section);
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent button click
            const section = this.closest('.expandable-section').querySelector('.expandable-btn').getAttribute('data-section');
            handleDownloadClick(section);
        });
    });
    
    // Open first section by default
    if (expandableBtns.length > 0) {
        const firstSection = expandableBtns[0].getAttribute('data-section');
        toggleSection(firstSection, expandableBtns[0], false);
    }
}

function toggleSection(section, button, smooth = true) {
    const content = document.getElementById(`${section}-content`);
    const isActive = button.classList.contains('active');
    
    // Close all sections
    document.querySelectorAll('.expandable-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.expandable-content').forEach(content => {
        if (smooth) {
            content.style.transition = 'max-height 0.5s ease, padding 0.3s ease';
        } else {
            content.style.transition = 'none';
        }
        content.classList.remove('active');
    });
    
    // If section was not active, open it
    if (!isActive) {
        button.classList.add('active');
        if (smooth) {
            content.style.transition = 'max-height 0.5s ease, padding 0.3s ease';
        } else {
            content.style.transition = 'none';
        }
        content.classList.add('active');
        
        // Scroll to section if it's not in view
        setTimeout(() => {
            if (!isElementInViewport(content)) {
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }
    
    // Restore smooth transitions
    setTimeout(() => {
        content.style.transition = 'max-height 0.5s ease, padding 0.3s ease';
    }, 50);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleLearnMoreClick(section) {
    const sectionTitles = {
        'digital': 'Digital Rights',
        'consumer': 'Consumer Rights',
        'privacy': 'Privacy Rights',
        'financial': 'Financial Rights',
        'equality': 'Right to Equality'
    };
    
    const title = sectionTitles[section] || 'Rights';
    
    // Show loading state
    showMessage(`Loading detailed information about ${title}...`, 'info');
    
    // Simulate API call
    setTimeout(() => {
        // In a real implementation, this would redirect to a detailed page
        alert(`This would open a detailed page about ${title} with comprehensive information, case studies, and legal references.`);
    }, 1000);
}

function handleDownloadClick(section) {
    const guideNames = {
        'digital': 'Digital_Rights_Guide.pdf',
        'consumer': 'Consumer_Rights_Handbook.pdf',
        'privacy': 'Privacy_Rights_Protection.pdf',
        'financial': 'Financial_Rights_Guide.pdf'
    };
    
    const fileName = guideNames[section] || 'Legal_Rights_Guide.pdf';
    
    // Show download confirmation
    showMessage(`Downloading ${fileName}...`, 'info');
    
    // Simulate download process
    setTimeout(() => {
        showMessage(`${fileName} downloaded successfully!`, 'success');
        
        // Track download in analytics
        trackDownload(section, fileName);
    }, 1500);
}

function trackDownload(section, fileName) {
    // Simulate analytics tracking
    console.log(`Download tracked: ${section} - ${fileName}`);
    
    const downloadEvent = {
        section: section,
        fileName: fileName,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for demo
    let downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
    downloadHistory.push(downloadEvent);
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.user-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `user-message ${type}-message`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'error' ? 'var(--critical)' : 
                     type === 'success' ? 'var(--success)' : 
                     'var(--primary)'};
        color: white;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Add CSS for animations
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

// Export functions for global access
window.handleLearnMoreClick = handleLearnMoreClick;
window.handleDownloadClick = handleDownloadClick;
