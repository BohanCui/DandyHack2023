# DandyHack2023 - LAZY Catcher摸鱼禁止/捕鱼器

## Goal:
keep a user input lists of websites
if any member clicked on the websites in the list, the rest of group members get notifications.

### Steps:
manifest.json: This is the configuration file for your Chrome extension. It defines metadata like the extension's name, permissions it requires, the background script it will use, and the popup page, among other settings.

background.js: This script runs in the background for the lifetime of your extension and is responsible for the core logic, such as monitoring visited sites and interacting with the server.

popup.js: This script is loaded when the user clicks on the extension icon and opens the popup. It handles user interactions within the popup, like entering prohibited sites and sending them to the background script.

popup.html: This is the structure of the popup that users see when they click on the extension's icon. It provides the user interface to input the prohibited sites.

Server file (e.g., server.js): If you're using a backend server to handle real-time communication among the team members, this file would contain the server-side logic. For instance, it would handle incoming socket events, broadcast messages to other connected clients, and manage any other server-side functionality you might want to implement.

This architecture allows for a clean separation of concerns:

background.js takes care of the core functionality.
popup.html and popup.js manage the user interface.
The server file handles backend communication and data broadcast.
It's also worth noting that depending on your exact needs, you might also want to include other files (like CSS for styling, images/icons for the extension, or even additional libraries/frameworks).
