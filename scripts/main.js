// Remove the navigation tabs relating to the pages that are available or unavailable
function remove_unusable_navigation_tabs() {
    const current_username = localStorage.getItem("current_user");

    if (current_username === null) {

        // Remove profile and chat tab
        document.getElementById("header-nav-bar-profile").parentElement.remove();
        document.getElementById("header-nav-bar-chat").parentElement.remove();

    } else {

        const nav_list = document.getElementById("header-nav-bar-list");

        // Remove login and signup
        document.getElementById("header-nav-bar-login").parentElement.remove();
        document.getElementById("header-nav-bar-signup").parentElement.remove();

        // Add sign out tab
        var signout_li = document.createElement("li");
        var signout_a = document.createElement("a");
        signout_a.innerHTML = "Signout";
        signout_a.setAttribute("id", "header-nav-bar-signout");
        signout_a.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("current_user");
            if (window.location.pathname.includes("profile.html") || window.location.pathname.includes("chat.html")) {
                location.replace("index.html");
            } else {
                location.reload(true);
            }
        });
        signout_li.appendChild(signout_a);
        nav_list.appendChild(signout_li);
    }
}

remove_unusable_navigation_tabs();

// Highlight the tab at the top corresponding to the page we've selected
function highlight_current_page_tab() {
    
    const path = window.location.pathname;
    const page_name = path.split('/').pop().split('.')[0];
    const element = document.getElementById("header-nav-bar-" + page_name);
    if (element) {
        element.style.backgroundColor = "#AAAAAA"
    }
}

highlight_current_page_tab();