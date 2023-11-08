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

    // Load favorites
    var favorites_list_label = document.getElementById("favorites-list-label");
    favorites_list_label.innerText = `Favorites (${user_object["favorites_list"].length})`;

    var favorites_list = document.getElementById("favorites-list");
    for (i = 0; i < user_object["favorites_list"].length; i++) {
        var table_row = document.createElement("tr");
        var movie_cell = document.createElement("td");
        var button_cell = document.createElement("td");

        var movie_text = document.createElement("p");
        const movie_string = user_object["favorites_list"][i];
        movie_text.innerText = movie_string;
        table_row.id = movie_string;

        var button_element = document.createElement("button");
        button_element.innerText = "X";
        button_element.value = movie_string;
        button_element.addEventListener("click", function() {
            user_object["favorites_list"] = user_object["favorites_list"].filter(item => item !== this.value);
            favorites_list_label.innerText = `Favorites (${user_object["favorites_list"].length})`;
            localStorage.setItem("available_users", JSON.stringify(available_users));
            document.getElementById(movie_string).remove();
        });

        movie_cell.appendChild(movie_text);
        button_cell.appendChild(button_element);
        table_row.appendChild(movie_cell);
        table_row.appendChild(button_cell);
        favorites_list.appendChild(table_row);
    }

    // Load watchlist
    var watch_list_label = document.getElementById("watch-list-label");
    watch_list_label.innerText = `Watchlist (${user_object["watch_list"].length})`;

    var watch_list = document.getElementById("watch-list");
    for (i = 0; i < user_object["watch_list"].length; i++) {
        var table_row = document.createElement("tr");
        var movie_cell = document.createElement("td");
        var button_cell = document.createElement("td");

        var movie_text = document.createElement("p");
        const movie_string = user_object["watch_list"][i];
        movie_text.innerText = movie_string;
        table_row.id = movie_string;

        var button_element = document.createElement("button");
        button_element.innerText = "X";
        button_element.value = movie_string;
        button_element.addEventListener("click", function() {
            user_object["watch_list"] = user_object["watch_list"].filter(item => item !== this.value);
            watch_list_label.innerText = `Watchlist (${user_object["watch_list"].length})`;
            localStorage.setItem("available_users", JSON.stringify(available_users));
            document.getElementById(movie_string).remove();
        });

        movie_cell.appendChild(movie_text);
        button_cell.appendChild(button_element);
        table_row.appendChild(movie_cell);
        table_row.appendChild(button_cell);
        watch_list.appendChild(table_row);
    }
}

load_profile_info();