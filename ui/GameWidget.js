

class GameWidget {
    constructor(pageNumber, gameMessage) {
        this.pageNumber = pageNumber;
        this.root = View.createElement('div', "gameWidget"+pageNumber, 
            'game-widget bg-222 shadow rounded-2 row mb-4'
        );
        this.root.innerHTML = `
        <!-- Left Section -->
        <div class="col-lg px-4 pt-4 py-lg-4 text-white">
            <div id="gameWidget${pageNumber}Inning" class="inning"></div>
            <div class="away-line row">
                <a onclick="app.view.modal.update(${gameMessage.awayId})" data-bs-toggle="modal" data-bs-target="#statsModal" class="away-name col-10 text-start link link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">${gameMessage.awayTeam}</a>
                <div id="gameWidget${pageNumber}AwayScore" class="away-score col-2 text-end h3 font-monospace"></div>
            </div>
            <div class="home-line row">
                <a onclick="app.view.modal.update(${gameMessage.homeId})" data-bs-toggle="modal" data-bs-target="#statsModal" class="away-name col-10 text-start link link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">${gameMessage.homeTeam}</a>
                <div id="gameWidget${pageNumber}HomeScore" class="home-score col-2 text-end h3 font-monospace"></div>
            </div>
        </div>
        <!-- Center Section -->
        <div class="col-lg m-0 px-3 py-lg-4 text-white row">
            <div class="base-icons col-3 col-lg-12 m-0 px-0 pt-2 pb-3 ps-lg-3 pt-lg-4 text-white text-center">
                <sub id="gameWidget${pageNumber}LeftBaseIcon" class='baseIcon gameWidgetLeftBase'></sub>
                <sup id="gameWidget${pageNumber}CenterBaseIcon" class='baseIcon gameWidgetCenterBase'></sup>
                <sub id="gameWidget${pageNumber}RightBaseIcon" class='baseIcon gameWidgetRightBase'></sub>
            </div>
            <div class="count-container col-9 col-lg-12 m-0 p-0 pt-2 pb-3 text-white row row-cols-lg-6">
                <div class="balls-label col font-monospace text-end">B:</div>
                <div id="gameWidget${pageNumber}Balls" class="balls col font-monospace text-start">0</div>
                <div class="strikes-label col font-monospace text-end">S:</div>
                <div id="gameWidget${pageNumber}Strikes" class="strikes col font-monospace text-start">0</div>
                <div class="outs-label col font-monospace text-end">O:</div>
                <div id="gameWidget${pageNumber}Outs" class="outs col font-monospace text-start">0</div>
            </div>
        </div>
        <!-- Right Section -->
        <div id="gameWidget${pageNumber}Right" class="col-lg px-4 pb-4 py-lg-4 text-white lh-sm log"></div>
    `.trim();
        
    }

    update(gameMessage) {
        document.getElementById('gameWidget' + this.pageNumber + 'Inning').textContent = gameMessage.inning;
        document.getElementById('gameWidget' + this.pageNumber + 'AwayScore').textContent =
            gameMessage.score.away;
        document.getElementById('gameWidget' + this.pageNumber + 'HomeScore').textContent =
            gameMessage.score.home;
        document.getElementById('gameWidget' + this.pageNumber + 'LeftBaseIcon').textContent =
            gameMessage.baseIcons.charAt(0);
        document.getElementById('gameWidget' + this.pageNumber + 'CenterBaseIcon').textContent =
            gameMessage.baseIcons.charAt(1);
        document.getElementById('gameWidget' + this.pageNumber + 'RightBaseIcon').textContent =
            gameMessage.baseIcons.charAt(2);
        document.getElementById('gameWidget' + this.pageNumber + 'Balls').textContent = gameMessage.count.balls;
        document.getElementById('gameWidget' + this.pageNumber + 'Strikes').textContent = gameMessage.count.strikes;
        document.getElementById('gameWidget' + this.pageNumber + 'Outs').textContent = gameMessage.count.outs;
        document.getElementById('gameWidget' + this.pageNumber + 'Right').innerHTML = gameMessage.log;
    }

    render() {
        return this.root;
    }
}
