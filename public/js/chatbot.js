// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('chatbotToggle');
    const window = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('closeChatbot');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.getElementById('chatMessages');

    // Toggle Chatbot
    toggle.addEventListener('click', () => {
        window.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        window.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate typing
        const typingIndicator = addTypingIndicator();

        // Get AI response
        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            const response = getAIResponse(text.toLowerCase());
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Add Message to Chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Typing Indicator
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
                Typing...
            </div>
        `;
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
        return typingDiv;
    }

    function removeTypingIndicator(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.parentNode.removeChild(typingDiv);
        }
    }

    // AI Responses - College Specific
    function getAIResponse(userInput) {
        const responses = {
            // Admissions
            'admission': 'Our admission process is simple! Visit the <a href="admission.html" >Admission Portal</a> to apply online. Applications are open for Fall 2026!',
            'apply': 'Click <a href="apply.html" >Apply Now</a> to start your application. You\'ll need your academic transcripts and ID proof.',
            'eligibility': 'Eligibility varies by program. BCA requires 60% in 12th grade with Physics, Chemistry, Math. Check <a href="courses.html">Courses page</a> for details.',
            'fees': 'Tuition fees of courses details about fees and scholarship you can visit our <a href="courses.html" >Courses/Fee</a> page . ',
            'faculties': 'We have around 100+ staff for students which are highly qualified which gains phd degress and well-experience over 15+ year experience of teaching. Faculities are very friendly and support student around there queries instantly',
            'placements': 'During a large period of time many students are placed in big companies like <br>• Global Logics <br>• Infosis <br>• TCS <br>• Google <br>• Microsoft <br> and many other big MNC\'s.<br> So placement rate is maximum for students and have good opportunities.',
            'placement': 'During a large period of time many students are placed in big companies like <br>• Global Logics <br>• Infosis <br>• TCS <br>• Google <br>• Microsoft <br> and many other big MNC\'s.<br> So placement rate is maximum for students and have good opportunities.',

            // Login & Portal
            'login': 'Use your student email and password at <a href="login.html" >Student Login</a>. Forgot password? Use "Forgot Password" link.',
            'portal': 'Student portal gives access to grades, timetable, fees, and more. Login at <a href="login.html" target="_blank">portal.prestige.edu</a>.',

            // Courses
            'course': 'We offer BCA, BscIT, BBA, BHM, CHM, MCA, MBA for the students. Browse all programs on <a href="courses.html" target="_blank">Courses page</a>.',
            'scholarship': 'IHMS offers scholarship by giving exam for 100% scholarship and for other we gave some sort of relaxation on first sem fee acc to there percentage in 12th class.',

            // Contact
            'contact': '📍 I.H.M.S, Balbhadrapur, BEL Road, Kotdwar, Uttarakhand 246149<br> +91-7902000023 <br> +91-8057726863<br>✉️ admissions@ihms.edu, <br> info@ihms.ac.in <br>Hours: Mon-Fri 9AM-5PM',
            'phone': '+91-7902000023 or +91-8057726863',
            'email': 'admissions@ihms.edu or info@ihms.ac.in',

            // General
            'hello': 'Hi! Welcome to IHMS Chatbot Assistant. Can I assist you with admissions, courses, or campus life?',
            'hi': 'Hi! Welcome to IHMS Chatbot Assistant. How can I assist you with admissions, courses, or campus life?',
            'how are you': 'I\'m fine. I\'m here to help you about your queries. <br>• Admissions <br>• Courses <br>• Apply <br>• Contacts',
            'help': 'I can help you with:<br>• Admissions & Applications<br>• Course Information<br>• Fees & Scholarships<br>• Login Issues<br>• Contact Details',
            'thank': 'You\'re welcome! Have a great day! 😊',
            'bye': 'Goodbye! Visit us soon at IHMS kotdwara!',
        };

        // Keyword matching
        for (const [key, response] of Object.entries(responses)) {
            if (userInput.includes(key)) {
                return response;
            }
        }
        // Default responses
        const defaults = [
            "Sorry I didn't understand what you are asking for try some quick responses by asking about Admissions, Courses, Fees, etc about the college."
        ];

        return defaults[Math.floor(Math.random() * defaults.length)];
    }
});