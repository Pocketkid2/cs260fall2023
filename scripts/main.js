// Highlight the tab at the top corresponding to the page we've selected
function highlight_current_page_tab() {
    
    const path = window.location.pathname;
    const page_name = path.split('/').pop().replace('.html', '');
    const element = document.getElementById(page_name);
    if (element) {
        element.style.backgroundColor = "#AAAAAA"
    }
}

highlight_current_page_tab();

// Remove the navigation tabs relating to the pages that are available or unavailable
function remove_unusable_navigation_tabs() {
    const current_username = localStorage.getItem("current_user");

    if (current_username === null) {

        // Remove profile tab
        const profile_button = document.getElementById("header-nav-bar-profile").parentElement.remove();

    } else {

        const nav_list = document.getElementById("header-nav-bar-index").parentElement;

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
            location.reload(true);
        });
        signout_li.appendChild(signout_a);
        nav_list.appendChild(signout_li);

        //location.reload();
    }
}

remove_unusable_navigation_tabs();