function custom_date_formatting(input_date_string) {
    const date_string_parts = input_date_string.split('-');
    const date_object = new Date(
        parseInt(date_string_parts[0]),
        parseInt(date_string_parts[1]) - 1,
        parseInt(date_string_parts[2])
    )

    return date_object.toLocaleDateString();
}

function load_profile_info() {

    var current_user = localStorage.getItem("current_user");
    if (current_user === null) {
        console.log("current_user is not available! Unable to load data");
        return;
    }

    var available_users = localStorage.getItem("available_users");
    if (available_users === null) {
        console.log("available_users are not available! Unable to load data");
        return;
    }
    available_users = JSON.parse(available_users);

    var user_object = null;
    for (i = 0; i < available_users.length; i++) {
        if (available_users[i].username === current_user) {
            user_object = available_users[i];
        }
    }

    if (user_object === null) {
        console.log("User object is null! Unable to load data");
        return;
    }

    var profile_name_element = document.getElementById("profile-name");
    profile_name_element.innerText = `${user_object["first_name"]} ${user_object["last_name"]}`;

    var profile_username_element = document.getElementById("profile-username");
    profile_username_element.innerText = user_object["username"];

    var profile_birthdate_element = document.getElementById("profile-birthdate");
    profile_birthdate_element.innerText = custom_date_formatting(user_object["birth_date"]);

    var profile_creation_element = document.getElementById("profile-creation-date");
    profile_creation_element.innerText = custom_date_formatting(user_object["creation_date"]);
}

load_profile_info();