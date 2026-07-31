document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Set Minimum Date on Date Picker to Today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Event Chips Selection & Custom Event Box Logic
    const chipBtns = document.querySelectorAll('.chip-btn');
    const otherChipBtn = document.getElementById('otherChipBtn');
    const customEventWrap = document.getElementById('customEventWrap');
    const customEventInput = document.getElementById('customEventInput');

    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            
            if (btn === otherChipBtn && customEventWrap) {
                if (otherChipBtn.classList.contains('selected')) {
                    customEventWrap.style.display = 'block';
                    if (customEventInput) customEventInput.focus();
                } else {
                    customEventWrap.style.display = 'none';
                    if (customEventInput) customEventInput.value = '';
                }
            }
        });
    });

    // Form Submission for WhatsApp
    const form = document.getElementById('whatsappForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const location = document.getElementById('location').value.trim();
            const packageSelected = document.getElementById('package').value;
            const details = document.getElementById('details').value.trim();
            
            if (!name || !phone || !date || !location) {
                alert("Please fill in all required fields.");
                return;
            }
            
            const selectedChips = Array.from(document.querySelectorAll('.chip-btn.selected'))
                .map(c => c.getAttribute('data-value'));
            
            const customEventText = customEventInput ? customEventInput.value.trim() : '';
            const finalFunctions = selectedChips.map(val => {
                if (val === 'Other') {
                    return customEventText ? `Custom: ${customEventText}` : 'Custom Event';
                }
                return val;
            });
            
            // Format WhatsApp Message
            let message = `*New Booking Enquiry - Brother's Studio*\n\n`;
            message += `*Name:* ${name}\n`;
            message += `*Phone:* ${phone}\n`;
            message += `*Event Date:* ${date}\n`;
            message += `*Location:* ${location}\n`;
            
            if (finalFunctions.length > 0) {
                message += `*Functions:* ${finalFunctions.join(', ')}\n`;
            }
            
            message += `*Package:* ${packageSelected}\n`;
            
            if (details) {
                message += `\n*Details:*\n${details}\n`;
            }
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Phone number specified for studio
            const targetPhone = "917008450368";
            
            // Open WhatsApp
            window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, '_blank');
        });
    }
});

// Helper function to pre-select package when clicking from package card
function selectPackage(packageName) {
    const packageSelect = document.getElementById('package');
    if (packageSelect) {
        Array.from(packageSelect.options).forEach(option => {
            if (option.value === packageName) {
                packageSelect.value = packageName;
            }
        });
    }
}
