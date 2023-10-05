document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent traditional form submission

    fetch('/submit_form.php', {
        method: 'POST',
        body: new FormData(this) // this refers to the form
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Message sent successfully!");
        } else {
            alert(data.message); // Display the error message from the server
        }
    })
    .catch(error => {
        alert("An error occurred while processing your request. Please try again later.");
    });
});
