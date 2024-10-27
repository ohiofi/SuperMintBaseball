//let seed = prompt("Type a number");
rng = new MersenneTwister(parseInt(2024));

let timeIntervalId;
let bgame = new BaseballGame();

function showBlockMessage(message, gameName){
  const container = document.getElementById('messageContainer');

    // Create a new div for the message
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    // Add content to the post
    //const username = 'User123'; // Example username
    const timestamp = new Date().toLocaleTimeString(); // Example timestamp

    postDiv.innerHTML = `
        <span class="username">${gameName}</span> <span class="timestamp">${timestamp}</span>
        <p>${message}</p>
    `;
  
  // Check if the user is scrolled to the bottom
    const isScrolledToBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;
    const previousScrollTop = container.scrollTop;

    // Append the new post to the container
    container.appendChild(postDiv);
  
  

    // Scroll to the bottom only if the user is already at the bottom
    if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
    } else {
        container.scrollTop = previousScrollTop;
    }
}

function startMessageInterval(speed,bgame) {
    
    // Clear any existing interval
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
    }

    // Set a new interval
    timeIntervalId = setInterval(() => {
        showBlockMessage(bgame.nextPitch(),bgame.getName());
        //showBlockMessage("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".substring(parseInt(Math.random()*("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".length))));
    }, speed);
}

// Set initial interval
startMessageInterval(2000, bgame);

// Change interval based on user input
document.getElementById('speedSlider').onchange = function() {
    const newInterval = 5200 - parseInt(document.getElementById('speedSlider').value, 10);
  
    if (!isNaN(newInterval) && newInterval > 0) {
        startMessageInterval(newInterval,bgame);
    } else {
        alert("Please enter a valid positive number.");
    }
};

// News Ticker
(function() {
    // var t0 = performance.now();
    setInterval(function() {
      var parent = document.querySelector('.newsTickerContainer');
      var slide = parent.querySelectorAll('.newsTickerItem');
  
      for (var i = 0; i < slide.length; i++) {
        var x = slide[i];
        x.classList.toggle('sliding-now');
      }
  
      setTimeout(function() {
        parent.appendChild(slide[0]);
      }, 5000);
  
    }, 5000);
    // var t1 = performance.now();
    // console.log("Carousel taking " + (t1 - t0) + " milliseconds.");
  })()