//let seed = prompt("Type a number");
rng = new MersenneTwister(parseInt(2024));

let timeIntervalId;

function showBlockMessage(message){
  const container = document.getElementById('messageContainer');

    // Create a new div for the message
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Add content to the post
    const username = 'User123'; // Example username
    const timestamp = new Date().toLocaleTimeString(); // Example timestamp

    postDiv.innerHTML = `
        <span class="username">${username}</span> <span class="timestamp">${timestamp}</span>
        <p>${message}</p>
    `;
  
  // Check if the user is scrolled to the bottom
    const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;

    // Append the new post to the container
    container.appendChild(postDiv);
  
  

    // Scroll to the bottom only if the user is already at the bottom
    if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
    }
}

function startMessageInterval(speed) {
    
    // Clear any existing interval
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
    }

    // Set a new interval
    timeIntervalId = setInterval(() => {
        showBlockMessage("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".substring(parseInt(Math.random()*("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".length))));
    }, speed);
}

// Set initial interval
startMessageInterval(2000);

// Change interval based on user input
document.getElementById('speedSlider').onchange = function() {
    const newInterval = 5200 - parseInt(document.getElementById('speedSlider').value, 10);
  
    if (!isNaN(newInterval) && newInterval > 0) {
        startMessageInterval(newInterval);
    } else {
        alert("Please enter a valid positive number.");
    }
};