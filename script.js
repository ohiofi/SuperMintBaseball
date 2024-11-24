//let seed = prompt("Type a number");
const rng = new MersenneTwister(parseInt(2025));
const app = new Controller(new Model(), new View())

// let league = new League(9);
// let bgame = new BaseballGame(new BaseballTeam(), new BaseballTeam());
// let count = 0

function addAlert(message, type) { 
    // const cont = 
    //     document.getElementById('alertContainer');
    // while (cont.firstChild) {
    //     cont.removeChild(cont.firstChild);
    // }
    // const aDiv = document.createElement('div');
    // aDiv.classList.
    //     add('alert', 'alert-' + 
    //         type, 'alert-dismissible', 
    //         'fade', 'show', 'w-25','float-end');
    // aDiv.setAttribute('role', 'alert');
    // aDiv.innerHTML = message + 
    // `<button type="button"
    //     class="btn-close" data-bs-dismiss="alert"
    //     aria-label="Close">
    // </button>`;
    // cont.appendChild(aDiv);
    // setTimeout(function () {
    //     aDiv.classList.remove('show');
    //     aDiv.remove();
    // }, 3000);
    // app.view.newsTickerContainer.innerHTML =  "BREAKING NEWS: " + message;
    app.model.world.newsTicker.setBreakingNews(message);
    
}

// CUSTOM EVENT LISTENERS
document.addEventListener('HomeRun', (event) => {
  addAlert('Home Run! '+new Date(), 'success');
 
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
  messageFeedContainer.scrollTo(0,messageFeedContainer.scrollHeight);
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

