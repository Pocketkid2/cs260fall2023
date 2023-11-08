// The API key I received from OMDB
const api_key = "4ff2c76";

// List of films to display under "Recent reviews"
const recent_films = [
    "tt1517268",    // Barbie
    "tt15398776",   // Oppenheimer
    "tt7599146"     // Sound of Freedom
];

// List of films to display under "Upcoming films"
const upcoming_films = [
    "tt13287846",   // Napoleon
    "tt6166392",    // Wonka
    "tt10545296"    // The Hunger Games: The Ballad of Songbirds and Snakes
];

function load_images(film_list, list_id, field_to_display, prefix) {
    for (i = 0; i < film_list.length; i++) {
        
        const api_url = `https://www.omdbapi.com/?i=${film_list[i]}&apikey=${api_key}`;

        fetch(api_url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }).then((data) => {

            // Create div
            var list_item_element = document.createElement("li");

            // Create image
            var image_element = document.createElement("img");
            image_element.setAttribute("src", data["Poster"]);

            // Create text element
            var text_element = document.createElement("p");
            text_element.innerHTML = `${prefix}<br>${data[field_to_display]}`;

            // Grab list and add
            var list_element = document.getElementById(list_id);
            list_item_element.appendChild(image_element);
            list_item_element.appendChild(text_element);
            list_element.appendChild(list_item_element);

        }).catch((error) => {
            console.error("Error:", error);
        });
        
    }
}

load_images(recent_films, "recent-film-list", "BoxOffice", "US Box Office Revenue:");
load_images(upcoming_films, "upcoming-film-list", "Released", "US Release Date:");