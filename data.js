var users = [];
var auth_tokens = {};

module.exports = {
    authenticate_credentials: authenticate_credentials,
    authenticate_token: authenticate_token,
    user_exists: user_exists,
    add_user: add_user,
    get_info: get_info,
    get_list: get_list,
    delete_token: delete_token,
    list_users: list_users,     // DEBUG
    list_tokens: list_tokens,   // DEBUG
};

function list_users() {
    console.log(JSON.stringify(users));
}

function list_tokens() {
    console.log(JSON.stringify(auth_tokens));
}

function get_info(username) {
    for (i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            const user_copy = Object.assign({}, users[i]);
            delete user_copy.username;
            delete user_copy.password;
            return user_copy;
        }
    }
    return null;
}

function get_list(username, list_name) {
    for (i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            if (users[i][list_name] === undefined) {
                users[i][list_name] = [];
            }
            return users[i][list_name];
        }
    }
    return null;
}

function user_exists(username) {
    for (i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return true;
        }
    }
    return false;
}

function add_user(user_object) {
    users.push(user_object);
}

// Attempts to authenticate with the given credentials.
//  If successful, returns an auth token.
//  If unsuccessful, returns null.
function authenticate_credentials(username, password) {
    for (i = 0; i < users.length; i++) {
        if (users[i].username == username &&
            users[i].password == password) {
            if (auth_tokens[username]) {
                return auth_tokens[username];
            } else {
                return create_auth_token(username);
            }
        }
    }
    return null;
}

// Attempts to authenticate with the given auth token.
//  If successful, returns the username.
//  If unsuccessful, returns null.
function authenticate_token(token) {
    for (var username in auth_tokens) {
        if (auth_tokens[username] === token) {
            return username;
        }
    }
    return null;
}

function delete_token(username) {
    delete auth_tokens[username];
}

function create_auth_token(username) {
    var token = generate_random_auth_token();
    auth_tokens[username] = token;
    return token;
}

function generate_random_auth_token() {
    var length = 32;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}