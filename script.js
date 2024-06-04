// Global variable to store the user query
let query = '';

// Function to send user message
function sendMessage() {
    // Get input field and trim the message
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    // Update query with the user message
    query = message;
    // Log the message
    console.log(message);
    // If message is empty, return
    if (message === "") return;

    // Get chat window
    const chatWindow = document.getElementById('chatWindow');

    // Create div for user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = message;
    // Append user message to chat window
    chatWindow.appendChild(userMessageDiv);

    // Remove initial bot message if exists
    const botInitialMessage = document.getElementById('bot-message');
    if (botInitialMessage !== null) chatWindow.removeChild(botInitialMessage);

    // Clear input field
    inputField.value = "";

    // Scroll chat window to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Fetch news based on user query
    fetchNews();
}

// Options for fetch request
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f518aaaeedmshc69e27ef00a9b26p17765bjsn05f5b01154f4',
        'X-RapidAPI-Host': 'reddit34.p.rapidapi.com'
    }
};

// Function to fetch news based on user query
async function fetchNews() {
    const url = `https://reddit34.p.rapidapi.com/getPostsByUsername?username=${query}&sort=new`;
    try {
        // Fetch data from API
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json(); // Parse the JSON response

        // Render the fetched posts
        renderPosts(result.data.posts);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to render fetched posts
function renderPosts(posts) {
    // Get chat window
    const chatWindow = document.getElementById('chatWindow');
    // Create container for posts
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');

    // Loop through each post and create elements
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = 'Author: ' + post.author;

        const contentElement = document.createElement('div');
        contentElement.classList.add('post-content');

        // Loop through each paragraph in the post content and append to content element
        post.media.richtextContent.document.forEach(paragraph => {
            if (paragraph.c && paragraph.c[0] && paragraph.c[0].t) {
                const paragraphElement = document.createElement('p');
                paragraphElement.textContent = paragraph.c[0].t;
                contentElement.appendChild(paragraphElement);
            }
        });

        const linkElement = document.createElement('a');
        linkElement.textContent = 'Read More';
        linkElement.href = post.permalink;

        // Append elements to the postDiv
        postDiv.appendChild(titleElement);
        postDiv.appendChild(authorElement);
        postDiv.appendChild(contentElement);
        postDiv.appendChild(linkElement);

        // Append postDiv to the postContainer
        postContainer.appendChild(postDiv);
    });

    // Append postContainer to the chatWindow
    chatWindow.appendChild(postContainer);
}

// Function to handle key press events
async function handleKeyPress(event) {
    if (event.key === 'Enter') {
        // Call sendMessage() when Enter key is pressed
        sendMessage();
    }
}

