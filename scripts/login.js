function login(event) {
    console.log("login event happened");
    var available_users = localStorage.getItem("available_users");
    if (available_users === null) {
        event.preventDefault();
        alert("There are no users on this site!");
        return;
    }
    available_users = JSON.parse(available_users);

    const username_input = document.getElementById("username").value;
    const password_input = document.getElementById("password").value;
    
    for (i = 0; i < available_users.length; i++) {
        const user = available_users[i];

        if (user.username === username_input) {
            if (user.password === password_input) {
                localStorage.setItem("current_user", user.username);
                return;
            } else {
                event.preventDefault();
                alert("Incorrect password");
                return;
            }
        }
    }

    event.preventDefault();
    alert("Incorrect username");

}