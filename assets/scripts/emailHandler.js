// Create references
const form = document.querySelector('form');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent traditional form submission

    fetch('/submit_form.php', {
        method: 'POST',
        body: new FormData(this) // this refers to the form
    })
    .then(response => response.json())
    .then(data => {
        form.style.display = 'none'; // Hide the form

        if (data.success) {
            successMessage.style.display = 'block'; // Display success message
        } else {
            errorMessage.style.display = 'block'; // Display error message
        }
    })
    .catch(error => {
        form.style.display = 'none'; // Hide the form
        errorMessage.style.display = 'block'; // Display error message
    });
});
