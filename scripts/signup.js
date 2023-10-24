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

    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    const birth_date = document.getElementById("birthdate").value;
    const gender = read_gender(document.getElementsByClassName("custom-radio"));
    
    const username1 = document.getElementById("username1").value;
    const username2 = document.getElementById("username2").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (!is_valid_name(first_name)) {
        event.preventDefault();
        alert("First name field is invalid, please try again. Only letters, hyphens, and spaces are allowed.");
        return;
    }

    if (!is_valid_name(last_name)) {
        event.preventDefault();
        alert("Last name field is invalid, please try again. Only letters, hyphens, and spaces are allowed.");
        return;
    }

    if (!is_valid_date(birth_date)) {
        event.preventDefault();
        alert("Date of birth is invalid, please try again.");
        return;
    }

    if (gender !== "male" && gender !== "female") {
        event.preventDefault();
        alert("Please select your gender and try again.");
        return;
    }

    if (!is_valid_username(username1) || !is_valid_username(username2)) {
        event.preventDefault();
        alert("Please check that your username is valid and that both fields match. Remember that usernames must be at least 6 characters and can only use letters, numbers, and underscores.");
        return;
    }

    if (!is_valid_password(password1) || !is_valid_password(password1)) {
        event.preventDefault();
        alert("Please check that your password is valid and that both fields match. Remember that passwords must be at least 8 characters and cannot have spaces.");
        return;
    }

    const user_object = {
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        gender: gender,
        username: username1,
        password: password1
    }

    var available_users = localStorage.getItem("available_users");

    if (available_users === null) {
        available_users = [user_object];
    } else {
        available_users = JSON.parse(available_users);
        // Check for duplicate username
        for (i = 0; i < available_users.length; i++) {
            if (available_users[i].username === user_object.username) {
                event.preventDefault();
                alert("A user with that username already exists! Please pick another one.");
                return;
            }
        }
        available_users.push(user_object);
    }

    localStorage.setItem("available_users", JSON.stringify(available_users));
    localStorage.setItem("current_user", JSON.stringify(user_object.username));
}