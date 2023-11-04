const socket = io('http://localhost:3000');

document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addButton = document.getElementById('addButton');
    const blockedList = document.getElementById('blockedList');
    const saveButton = document.getElementById('saveButton');
    const nameInput = document.getElementById('nameInput');
    const groupIDInput = document.getElementById('groupID');
    const saveUserButton = document.getElementById('saveUserButton');

    if (addButton && websiteInput) { // Check if on popup.html
        addButton.addEventListener('click', function() {
            const website = websiteInput.value.trim();
            if (website) {
                const listItem = document.createElement('li');
                listItem.textContent = website;
                blockedList.appendChild(listItem);
                websiteInput.value = '';
            }
        });

        saveButton.addEventListener('click', function() {
            const blockedWebsites = Array.from(blockedList.children).map(li => li.textContent);
            // TODO: You might want to send this to the server or save locally using chrome.storage.sync.set
        });
    }


        saveUserButton.addEventListener('click', changePopup);

});

function registerUser() {
    page_redirect();
    // const username = document.getElementById('nameInput').value.trim();
    // const groupId = document.getElementById('groupID').value.trim();

    // socket.emit('register', { username, groupId });

    // socket.on('registrationSuccess', (data) => {
    //     // Store username and groupId in chrome storage for later use
    //     chrome.storage.local.set({ username, groupId });
    //     window.location = "popup.html";
    // });

    // socket.on('registrationError', (data) => {
    //     const errorMessageElement = document.getElementById('errorMessage');
    //     errorMessageElement.textContent = data.message;
    // });
}

function changePopup(){
    chrome.broweserAction.setPopup({
        popup:"popup.html"
    });
}
function page_redirect() {  
    chrome.tabs.update({
        url: "https://www.google.com"
    })
    // const name = nameInput.value.trim();
    // // TODO: You may want to send this to the server for further handling
    // nameInput.value = '';
    // window.location = "https://www.google.com";
}
