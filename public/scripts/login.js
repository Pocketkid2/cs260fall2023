function login(event) {
    event.preventDefault();

    const login_credentials = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_credentials)
    })
    .then(response => {
        if (response.status === 200) {
            document.getElementById("login-form").submit();
        } else {
            alert('Invalid username/password combination. Please try again.');
            document.getElementById("login-form").reset();
        }
    })
    .catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
    });
}