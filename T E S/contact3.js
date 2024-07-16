document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const status = document.getElementById('status');
    const formData = new FormData(this);

    emailjs.send("service_31topnb", "service_31topnb", {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    })
    .then(function(response) {
        status.innerHTML = "Email sent successfully!";
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('contact-form').reset();
    }, function(error) {
        status.innerHTML = "Failed to send email.";
        console.log('FAILED...', error);
    });
});
