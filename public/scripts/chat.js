const maximum_message_length = 1000;

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const ws_url = `${protocol}://${window.location.host}/ws`;

console.log('Connecting to ' + ws_url);

let socket = new WebSocket(ws_url);

socket.onopen = (event) => {
    console.log('Socket opened');
};

socket.onmessage = async (event) => {
    console.log('Socket message received: ' + event.data);
    const text = event.data;
    const message_object = JSON.parse(text);
    switch (message_object.type) {
        case "user_list":
            message_object.user_list.forEach(username => {
                add_user(username);
            });
            break;
        case "new_user":
            add_user(message_object.username);
            display_custom_message(`${message_object.username} joined the chat`);
            break;
        case "message":
            display_chat_message(message_object.username, message_object.message);
            break;
        case "user_left":
            remove_user(message_object.username);
            display_custom_message(`${message_object.username} left the chat`);
            break;
        default:
            console.log(`Unknown message type ${message_object.type}`);
            break;
    }
};

socket.onclose = (event) => {
    console.log('Socket closed');
};

// What to do when the send button is pressed, or the enter button is pressed
function send_chat_message(event) {

    // Don't actually submit
    event.preventDefault();

    // Read the message
    const chat_message = document.getElementById("message").value;

    // Check that the message is valid size
    if (chat_message.length <= 0 || chat_message.length > maximum_message_length) {
        return;
    }

    // Clear input box
    document.getElementById("message").value = '';

    // Send message over socket
    socket.send(JSON.stringify({ type: 'message', message: chat_message }));
}

function display_custom_message(message) {

    // Grab the chatbox
    var chat_box_element = document.getElementById("chat-messages");

    // Create a new message element and display it
    const custom_message = document.createElement("p");
    custom_message.innerText = message;
    chat_box_element.appendChild(custom_message);

    // And scroll down so it's visible
    chat_box_element.scrollTop = chat_box_element.scrollHeight;
}

// Adds the message to the chat display
function display_chat_message(username, message) {

    // Grab the chatbox
    var chat_box_element = document.getElementById("chat-messages");

    // Grab all elements that separate messages by username
    var list_of_username_chat_headers = chat_box_element.querySelectorAll("dt");

    // If we have any
    if (list_of_username_chat_headers.length > 0) {

        // Grab the latest separator
        const most_recent_username_chat_header = list_of_username_chat_headers[list_of_username_chat_headers.length - 1];
        
        // If it is not the one whose message we want to display, create a new separator
        if (most_recent_username_chat_header.innerHTML !== username) {
            var username_chat_header = document.createElement("dt");
            username_chat_header.innerText = username;
            chat_box_element.appendChild(username_chat_header);
        }
    } else {
        var username_chat_header = document.createElement("dt");
        username_chat_header.innerText = username;
        chat_box_element.appendChild(username_chat_header);
    }

    // Now append the chat message
    var chat_message_element = document.createElement("dd");
    chat_message_element.innerHTML = message;
    chat_box_element.appendChild(chat_message_element);

    // And scroll down so it's visible
    chat_box_element.scrollTop = chat_box_element.scrollHeight;
}

// Adds the username to the active user display
function add_user(username) {
    var user_element = document.createElement("li");
    user_element.innerText = username;
    var user_list_element = document.getElementById("active-user-list");
    user_list_element.appendChild(user_element);
}

// Removes the username from the active user display
function remove_user(username) {
    var user_list_element = document.getElementById("active-user-list");
    var user_element_list = user_list_element.querySelectorAll("li");
    user_element_list.forEach(user_element => {
        if (user_element.innerText === username) {
            user_element.remove();
        }
    });
}