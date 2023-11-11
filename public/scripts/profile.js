function custom_date_formatting(input_date_string) {
    const date_string_parts = input_date_string.split('-');
    const date_object = new Date(
        parseInt(date_string_parts[0]),
        parseInt(date_string_parts[1]) - 1,
        parseInt(date_string_parts[2])
    )

    return date_object.toLocaleDateString();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function load_profile_info(user_info) {
    document.getElementById("profile-name").innerHTML = `${user_info.first_name} ${user_info.last_name}`;
    document.getElementById("profile-birthdate").innerHTML = custom_date_formatting(user_info.birth_date);
    document.getElementById("profile-creation-date").innerHTML = custom_date_formatting(user_info.creation_date);
}

function load_list(list, list_name) {
    for (i = 0; i < list.length; i++) {
        // Create the table elements
        var table_row = document.createElement("tr");
        var film_cell = document.createElement("td");
        var button_cell = document.createElement("td");

        // Create the film text
        var film_text = document.createElement("p");
        const film_string = list[i];
        film_text.innerText = film_string;
        table_row.id = film_string;
        film_cell.appendChild(film_text);
        table_row.appendChild(film_cell);

        // Create the button
        var button_element = document.createElement("button");
        button_element.innerText = "X";
        button_element.value = film_string;
        button_element.addEventListener("click", function(event) {
            fetch('/api/remove/' + list_name, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({film: event.target.value})
            }).then(response => {
                if (response.status !== 200) {
                    alert("Something went wrong, please try again.");
                } else {
                    document.getElementById(event.target.value).remove();
                    const str = document.getElementById(list_name + "-label").innerText;
                    const new_str = str.replace(/\d+/, function(match) {
                        return parseInt(match) - 1;
                    });
                    document.getElementById(list_name + "-label").innerText = new_str;
                }
            }).catch(error => {
                console.log('There was a problem with the fetch operation: ' + error.message);
            });
        });
        button_cell.appendChild(button_element);
        table_row.appendChild(button_cell);

        document.getElementById(list_name + "-table").appendChild(table_row);
    }
    document.getElementById(list_name + "-label").innerText = `${capitalize(list_name)} (${list.length})`;
}

fetch('/api/user', {
    method: 'GET',
}).then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        console.log("Unable to load profile info");
    }
}).then(data => {
    load_profile_info(data);
    load_list(data.favorites, "favorites");
    load_list(data.watchlist, "watchlist");
}).catch(error => {
    console.log('There was a problem with the fetch operation: ' + error.message);
});