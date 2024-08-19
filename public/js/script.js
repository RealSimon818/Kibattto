document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();// Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    
     

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phoneNumber, subject, message })
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'Failed to send message';
    }
});
