function is_valid_name(input) {
    const regex = /^[A-Za-z\s-]+$/;
    return input.length > 0 && regex.test(input);
}

function is_valid_date(input) {
    const date = new Date(input);
    return input.length > 0 && date.toString() !== "Invalid Date" && date.toISOString().split('T')[0] === input;
}

function is_valid_username(input) {
    const regex = /^[A-Za-z0-9_]+$/;
    return input.length >= 6 && regex.test(input);
}

function is_valid_password(input) {
    const regex = /^[^\s]+$/;
    return input.length >= 8 && regex.test(input);
}

function read_gender(elements) {
    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked ) {
            return elements[i].value;
        }
    }
    return "";
}

function signup(event) {
    event.preventDefault();

    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    const birth_date = document.getElementById("birthdate").value;
    const gender = read_gender(document.getElementsByClassName("custom-radio"));
    
    const username1 = document.getElementById("username1").value;
    const username2 = document.getElementById("username2").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (!is_valid_name(first_name)) {
        alert("First name field is invalid, please try again. Only letters, hyphens, and spaces are allowed.");
        return;
    }

    if (!is_valid_name(last_name)) {
        alert("Last name field is invalid, please try again. Only letters, hyphens, and spaces are allowed.");
        return;
    }

    if (!is_valid_date(birth_date)) {
        alert("Date of birth is invalid, please try again.");
        return;
    }

    if (gender !== "male" && gender !== "female") {
        alert("Please select your gender and try again.");
        return;
    }

    if (username1 !== username2) {
        alert("Your usernames do not match, please try again.");
        return;
    }

    if (password1 !== password2) {
        alert("Your passwords do not match, please try again.");
        return;
    }

    if (!is_valid_username(username1)) {
        alert("Your username is not valid. Remember that usernames must be at least 6 characters and can only use letters, numbers, and underscores.");
        return;
    }

    if (!is_valid_password(password1)) {
        alert("Please check that your password is valid. Remember that passwords must be at least 8 characters and cannot have spaces.");
        return;
    }

    const today = new Date();

    const user_object = {
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        gender: gender,
        username: username1,
        password: password1,
        creation_date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        favorites: [],
        watchlist: []
    }

    fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_object)
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("signup-form").submit();
        } else if (response.status === 409) {
            alert('Username already exists. Please pick another one.');
        } else {
            alert('There was a problem signing up. Please try again.');
        }
    }).catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
    });
}