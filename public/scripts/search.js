function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// The API key I received from OMDB
const api_key = "4ff2c76";

// These are the fields in the API response that will be turned into columns, sortable
const columns = ["Title", "Year", "Runtime", "Rated", "Director"];  

var current_data = [];
var sort_direction = 1;

// Called when the search button is clicked.
function search(event) {

    event.preventDefault(); // Not sure what this does exactly but it works!

    const search_box = document.getElementById("search-box");   // Find the search box element
    const search_text = search_box.value;                       // Grab the text inside it

    const api_url = `https://www.omdbapi.com/?s=${search_text}&apikey=${api_key}`;  // Create API search url

    // Start a promise on the search request
    fetch(api_url).then((response) => {
        if (response.ok) {
            return response.json();     // If OK, convert to JSON
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }).then((data) => {
        const results = data["Search"];     // Grab only the array
        const filtered_results = results.filter(item => item['Type'] == "movie");   // Filter down to movies only
        request_all_titles(filtered_results);   // Pass long to the next step in the algorithm
    }).catch((error) => {
        console.error("Error:", error);
    })
}

// Returns true if the current filter settings allow the specific
// movie (JSON object from request) to be displayed in the search results
function filter_allows_film(object) {

    // Check rating
    const rating = object["Rated"];
    switch(rating) {
        case "G":
        case "PG":
        case "PG-13":
        case "R":
            if (!document.getElementById(rating).checked) {
                return false;
            }
            break;
        default:
            return false;
    }

    // Check year
    const year = parseInt(object["Year"]);

    const min_year_box = document.getElementById("min-year");
    const min_year_value = min_year_box.value;
    const min_year_int = parseInt(min_year_value, 10);
    if (!isNaN(min_year_int) && year < min_year_int) {
        return false;
    }

    const max_year_box = document.getElementById("max-year");
    const max_year_value = max_year_box.value;
    const max_year_int = parseInt(max_year_value, 10);
    if (!isNaN(max_year_int) && year > max_year_int) {
        return false;
    }

    // Check runtime
    const runtime = parseInt(object["Runtime"].split(' ')[0]);

    const min_runtime_box = document.getElementById("min-runtime");
    const min_runtime_value = min_runtime_box.value;
    const min_runtime_int = parseInt(min_runtime_value, 10);
    if (!isNaN(min_runtime_int) && runtime < min_runtime_int) {
        return false;
    }

    const max_runtime_box = document.getElementById("max-runtime");
    const max_runtime_value = max_runtime_box.value;
    const max_runtime_int = parseInt(max_runtime_value, 10);
    if (!isNaN(max_runtime_int) && runtime > max_runtime_int) {
        return false;
    }

    // If we got down here, we must have passed all the filters
    return true;
}

// Takes an array of films returned from a search, sends a request for more information on each one, and populates the table
function request_all_titles(results) {

    // Create an array of promises, one for each object
    const promises = results.map((object) => {
        const movie_id = object["imdbID"];  // Grab the ID for the request
        const api_url = `https://www.omdbapi.com/?i=${movie_id}&apikey=${api_key}`; // Create the request URL
        return fetch(api_url).then((response) => {  // Execute the request
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        });
    });

    // Collect the result of all promises (web API requests)
    Promise.all(promises).then((results) => {
        // Default sort by year ascending
        current_data = results;
        sort_column("Year", false);
    }).catch((error) => {
        console.error("Error:", error);
    })
}

function add_button_if_nonextant(button_cell, film_string, list) {
    fetch('/api/exists/' + list, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            film: film_string
        })
    }).then(response => {
        if (response.status === 404) {
            const button = document.createElement("button");
            button.innerHTML = capitalize(list);
            button.classList.add(list + "-button");
            button.addEventListener("click", function(event) {
                fetch('/api/add/' + list, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({film: film_string})
                }).then(response => {
                    if (response.status !== 200) {
                        alert("Something went wrong, please try again.");
                    } else {
                        event.target.remove();
                    }
                }).catch(error => {
                    console.log('There was a problem with the fetch operation: ' + error.message);
                });
            });
            button_cell.appendChild(button);
        }
    }).catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
    });
}

function load_buttons(table) {

    // Add button column header
    const header = document.createElement("th");
    table.rows[0].appendChild(header);
    const text = document.createTextNode("Add to List");
    header.appendChild(text);

    // Run request to find buttons for each row
    for (i = 1; i < table.rows.length; i++) {
        // Make sure each row has a cell for buttons to appear
        const button_cell = document.createElement("td");
        button_cell.style.width = '10em';

        // Add the button cell to the row
        const row = table.rows[i];
        row.appendChild(button_cell);

        // Create film string to check via API request
        const title = row.cells[0].innerText;
        const year = row.cells[1].innerText;
        const film_string = `${title} (${year})`;

        add_button_if_nonextant(button_cell, film_string, "favorites");
        add_button_if_nonextant(button_cell, film_string, "watchlist");
    }
}

// Takes in an array of objects to use to populate the table, and does it
function update_table(objects) {

    const filtered_data = objects.filter(object => filter_allows_film(object));

    const label = document.getElementById("search-results-label");
    const size = filtered_data.length;
    label.innerHTML = `Results (${size})`;

    // Clear previous tables
    const search_results_div = document.getElementById("search-results");   // Get div
    var search_results_table = search_results_div.querySelector("table"); // Find table
    if (search_results_table) {                                 // If table was found
        search_results_div.removeChild(search_results_table);   // Remove it
    }

    // Create new table
    search_results_table = document.createElement("table"); // Create new table
    search_results_div.appendChild(search_results_table);

    // ADD TABLE HEADERS
    const header_row = document.createElement("tr");        // Create new row for header
    search_results_table.appendChild(header_row);           // Add row to table
    columns.forEach((column) => {                           // Loop through each column
        const column_header = document.createElement("th"); // Create column header
        header_row.appendChild(column_header);              // Add to header row
        column_header.setAttribute("onclick", "sort_column(this.innerText.trim())"); // Set sorting function
        const text_node = document.createTextNode(column);     // Create the label
        column_header.appendChild(text_node);                       // Apply the label to the column header
    });

    // ADD TABLE ROWS
    filtered_data.forEach((object) => {
        const data_row = document.createElement("tr");      // Create new row for data
        search_results_table.appendChild(data_row);         // Add row to table
        columns.forEach((column_name) => {
            const data_cell = document.createElement("td");
            data_row.appendChild(data_cell);
            const text_node = document.createTextNode(object[column_name]);
            data_cell.appendChild(text_node);
        });
    });

    fetch('/auth/login', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200) {
            load_buttons(search_results_table);
        }
    }).catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
    });

}

function update_user_object(username, list, movie_string) {
    var user_data = localStorage.getItem("available_users");
    if (user_data === null) {
        console.log("Error: available_users is null");
        return false;
    }
    user_data = JSON.parse(user_data);
    for (i = 0; i < user_data.length; i++) {
        if (user_data[i]["username"] === username) {
            // Update list
            for (j = 0; j < user_data[i][list].length; j++) {
                if (user_data[i][list][j] === movie_string) {
                    console.log("Warning: Trying to add movie already on the list");
                    return false;
                }
            }
            user_data[i][list].push(movie_string);
            localStorage.setItem("available_users", JSON.stringify(user_data));
            return true;
        }
    }
    console.log("Warning: Could not find user with username " + username);
    return false;
}

// Sorts the data and redraws the table
function sort_column(column, clicked=true) {
    if (clicked) {
        sort_direction *= -1;   // Toggle sort direction
    }
    current_data = current_data.sort((a, b) => {
        // Compare based on column values in object A vs B, with directional modifier
        return sort_direction * (a[column] > b[column] ? 1 : -1);
    });
    update_table(current_data);
}   

var checkboxes = document.getElementsByClassName("hidden-checkbox");
for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
}

var checkbox_labels = document.getElementsByClassName("custom-checkbox");
for (var i = 0; i < checkbox_labels.length; i++) {
    checkbox_labels[i].addEventListener("click", () => {
        update_table(current_data);
    });
}

var text_boxes = document.getElementsByClassName("range-input");
for (var i = 0; i < text_boxes.length; i++) {
    text_boxes[i].value = "";
    text_boxes[i].addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            update_table(current_data);
        }
    });
}

document.getElementById("search-box").value = "";