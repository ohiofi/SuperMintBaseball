class SchedulePage{
    constructor(){
        this.root = View.createElement("div","schedule","page hide");
        this.root.innerHTML = `
        <h3 id="schedulePageHeadline" class="pb-4  display-6 ">Season Schedule</h3>

        <div class="row">
            <div class="pageSummary col pb-4">
                Regular Season Games are listed below
            </div>
            <div class="col">
                <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
            </div>
        </div>

        <div class="accordion" id="scheduleAccordion">
       
        </div>
        `.trim()
    }

    addSchedule(scheduleArray){
        const accordion = this.root.querySelector("#scheduleAccordion");
        for(let dayNumber = 0; dayNumber < scheduleArray.length; dayNumber++){
            accordion.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Day #${dayNumber}
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#scheduleAccordion">
                    <div class="accordion-body row">
            `
            for(let eachGame of scheduleArray[dayNumber]){
                accordion.innerHTML += `
                <span class="col">${eachGame.getScore()}</span>
                `
            }
                    
            accordion.innerHTML += `
                    </div>
                </div>
            </div>
            `
        }
    }

    render(){
        return this.root;
    }
}