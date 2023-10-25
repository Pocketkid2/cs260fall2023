function populate_user_list() {
    var user_list_element = document.getElementById("active-user-list");
    var user_name_element = document.createElement("li");
    user_name_element.innerText = localStorage.getItem("current_user");
    user_list_element.appendChild(user_name_element);
}

populate_user_list();

function send_chat_message(event) {
    event.preventDefault();
    const chat_message = document.getElementById("message").value;
    if (chat_message.length <= 0) {
        return;
    }
    var message_box_element = document.getElementById("chat-messages");
    var message_header_list = message_box_element.querySelectorAll("dt");
    
    const username = localStorage.getItem("current_user");

    if (message_header_list.length > 0) {
        const chat_header_element = message_header_list[message_header_list.length - 1];
        if (username === chat_header_element.innerHTML) {
            append_chat_message(chat_message);
            return;
        }
    }
    
    // Append a new header
    var message_header = document.createElement("dt");
    message_header.innerHTML = username;
    message_box_element.appendChild(message_header);

    append_chat_message(chat_message);
}

function append_chat_message(message) {
    var message_element = document.createElement("dd");
    message_element.innerHTML = message;
    var message_box_element = document.getElementById("chat-messages");
    message_box_element.appendChild(message_element);

    message_box_element.scrollTop = message_box_element.scrollHeight;
}