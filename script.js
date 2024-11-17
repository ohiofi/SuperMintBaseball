//let seed = prompt("Type a number");
let rng = new MersenneTwister(parseInt(2024));
const app = new Controller(new Model(), new View())

// let league = new League(9);
// let bgame = new BaseballGame(new BaseballTeam(), new BaseballTeam());
// let count = 0

function addAlert(message, type) {
  // Create the div element
  const alertDiv = document.createElement('div');
  // Add the appropriate Bootstrap classes
  alertDiv.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'mx-5', 'w-25', 'my-0'); 
  // Add the message to the div
  alertDiv.innerHTML = message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  // Append the div to the body
  document.getElementById("alertContainer").appendChild(alertDiv);
}

// CUSTOM EVENT LISTENERS
document.addEventListener('HomeRun', (event) => {
  addAlert('Home Run!', 'success');
  console.log(event.detail.message); // Output: 'Hello from the custom event!'
});

// function showPage(pageName) {
//   let els = document.getElementsByClassName("page");
//   Array.from(els).forEach((el) => {
//       el.classList.add("hide")
//   });
//   document.getElementById(pageName).classList.remove("hide")
// }



// function startMessageInterval(speed,bgame) {
//   showGameMessage(bgame.next(),bgame.getName());
//     // Clear any existing interval
//     if (timeIntervalId) {
//         clearInterval(timeIntervalId);
//     }

//     // Set a new interval
//     timeIntervalId = setInterval(() => {
//         let gameMessage = bgame.next();
//         if(gameMessage == null){
//           clearInterval(timeIntervalId);
//         }else{
//           showGameMessage(gameMessage,bgame.getName());
//         }
        
//         //showBlockMessage("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".substring(parseInt(Math.random()*("This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!This is a new message!".length))));
//     }, speed);
// }

function jumpToNewestMessage(){
  messageContainer.scrollTo(0,messageContainer.scrollHeight);
  document.getElementById("messageJumpButton").classList.add("hide");
}

// Set initial interval
// startMessageInterval(5005 - parseInt(document.getElementById('speedSlider').value, 10), bgame);

// Change interval based on user input
// document.getElementById('speedSlider').onchange = function() {
//     const newInterval = 5005 - parseInt(document.getElementById('speedSlider').value, 10);
  
//     if (!isNaN(newInterval) && newInterval > 0) {
//         startMessageInterval(newInterval,bgame);
//     } else {
//         alert("Please enter a valid positive number.");
//     }
// };

