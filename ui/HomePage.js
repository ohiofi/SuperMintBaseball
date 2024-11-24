class HomePage{
    constructor(){
        this.root = View.createElement("div","homePage","page");
        this.root.innerHTML = `
            <h3 id="homePageHeadline" class="pb-4  display-6 ">Play Ball!</h3>
            <div class="row">
                <div class="pageSummary col pb-4">Today's games are currently being played</div>
                <div class="col">
                    <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <table id="gameTable" class="pb-4 table table-dark table-striped shadow rounded-2 overflow-hidden  table-borderless">
                        <thead>
                            <tr class="m-0">
                                <th class="text-secondary">Live Games</th>
                            </tr>
                        </thead>
                        <tbody id="gameTableBody">
                            <!-- Rows will be dynamically added here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `.trim();
    }
    addGameTableScores(games) {
        const tableBody = this.root.querySelector('#gameTableBody');
        tableBody.innerHTML = ''; // Clear any existing rows
        // console.log(games)
        games.forEach((gameDetails, i) => {
            

            // Create a new row for each game
            const row = View.createElement('tr',null,"row mx-0");

            // Inning cell
            const inningCell = View.createElement('div',null,"ps-3 py-0  col col-lg-12");
            inningCell.textContent = gameDetails.inning || 'N/A';

            // Score cell
            const scoreCell = View.createElement('td',null,"ps-3 py-0 col-lg-12 row m-0");

            const awayRow = View.createElement('div',null,"m-0 p-0 col col-lg-6 row" );
            const awayNameCol = View.createElement('div',null,"m-0 p-0 col col-10 col-lg-9 ");
            awayNameCol.innerHTML = gameDetails.awayNameWithLink || 'Away';
            const awayScoreCol = View.createElement('div',null,"col col-1 col-lg-3 font-monospace");
            awayScoreCol.innerHTML = gameDetails.score.away || '0';
            awayRow.append(awayNameCol,awayScoreCol)

            // Home cell
            //const homeCell = View.createElement('td',null,"row");
            const homeRow = View.createElement('td',null,"col col-lg-6 row" );
            const homeNameCol = View.createElement('div',null,"col col-10 col-lg-9");
            homeNameCol.innerHTML = gameDetails.homeNameWithLink || 'Home';
            const homeScoreCol = View.createElement('div',null," col col-1  col-lg-3  font-monospace ");
            homeScoreCol.innerHTML = gameDetails.score.home || '0';
            homeRow.append(homeNameCol,homeScoreCol)

            scoreCell.append(awayRow,homeRow)

            // Append cells to the row
            row.appendChild(inningCell);
            row.appendChild(scoreCell);

            // row.appendChild(actionCell);

            // Append row to the table body
            tableBody.appendChild(row);
        });
    }

    update(gameMessages) {
    }
    render(){
        return this.root;
    }
}