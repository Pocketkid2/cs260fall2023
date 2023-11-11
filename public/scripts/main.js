// Highlight the tab at the top corresponding to the page we've selected
function highlight_current_page_tab() {
    
    const path = window.location.pathname;
    const page_name = path.split('/').pop().split('.')[0];
    const element = document.getElementById("header-nav-bar-" + page_name);
    if (element) {
        element.style.backgroundColor = "#AAAAAA"
    }
}

function add_universal_navigation_tabs() {
    const nav_list = document.getElementById("header-nav-bar-list");

    // Add home tab
    var home_li = document.createElement("li");
    var home_a = document.createElement("a");
    home_a.innerHTML = "Home";
    home_a.setAttribute("id", "header-nav-bar-index");
    home_a.setAttribute("href", "index.html");
    home_li.appendChild(home_a);
    nav_list.appendChild(home_li);

    // Add search tab
    var search_li = document.createElement("li");
    var search_a = document.createElement("a");
    search_a.innerHTML = "Search";
    search_a.setAttribute("id", "header-nav-bar-search");
    search_a.setAttribute("href", "search.html");
    search_li.appendChild(search_a);
    nav_list.appendChild(search_li);
}

function add_user_navigation_tabs() {
    const nav_list = document.getElementById("header-nav-bar-list");

    // Add profile tab
    var profile_li = document.createElement("li");
    var profile_a = document.createElement("a");
    profile_a.innerHTML = "Profile";
    profile_a.setAttribute("id", "header-nav-bar-profile");
    profile_a.setAttribute("href", "profile.html");
    profile_li.appendChild(profile_a);
    nav_list.appendChild(profile_li);

    // Add chat tab
    var chat_li = document.createElement("li");
    var chat_a = document.createElement("a");
    chat_a.innerHTML = "Chat";
    chat_a.setAttribute("id", "header-nav-bar-chat");
    chat_a.setAttribute("href", "chat.html");
    chat_li.appendChild(chat_a);
    nav_list.appendChild(chat_li);

    // Add sign out tab
    var logout_li = document.createElement("li");
    var logout_a = document.createElement("a");
    logout_a.innerHTML = "Logout";
    logout_a.setAttribute("id", "header-nav-bar-logout");
    logout_a.addEventListener("click", function(event) {
        event.preventDefault();
        fetch('/auth/logout', {
            method: 'DELETE'
        }).then(response => {
            location.replace('index.html');
        }).catch(error => {
            alert('Error logging out. Please try again.');
        });
    });
    logout_li.appendChild(logout_a);
    nav_list.appendChild(logout_li);
}

function add_non_user_navigation_tabs() {
    const nav_list = document.getElementById("header-nav-bar-list");

    // Add login tab
    var login_li = document.createElement("li");
    var login_a = document.createElement("a");
    login_a.innerHTML = "Login";
    login_a.setAttribute("id", "header-nav-bar-login");
    login_a.setAttribute("href", "login.html");
    login_li.appendChild(login_a);
    nav_list.appendChild(login_li);

    // Add signup tab
    var signup_li = document.createElement("li");
    var signup_a = document.createElement("a");
    signup_a.innerHTML = "Signup";
    signup_a.setAttribute("id", "header-nav-bar-signup");
    signup_a.setAttribute("href", "signup.html");
    signup_li.appendChild(signup_a);
    nav_list.appendChild(signup_li);
}

add_universal_navigation_tabs();

fetch('/auth/login', {
    method: 'POST'
}).then(response => {
    if (response.status === 200) {
        // We are logged in, so show the user tabs
        add_user_navigation_tabs();
        console.log("We are logged in!");
    } else {
        // We are not logged in, so show the non-user tabs
        add_non_user_navigation_tabs();
        console.log("We are not logged in!");
    }
    highlight_current_page_tab();
}).catch(error => {
    console.log('There was a problem with the fetch operation: ' + error.message);
});