class SchedulePage{
    constructor(){
        this.root = View.createElement("div","schedulePage","page hide");
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

        <div class="row" id="scheduleAccordion">
       
        </div>
        `.trim()
    }

    addSchedule(schedule){

        const accordion = this.root.querySelector("#scheduleAccordion");
        for(let dayNumber = 0; dayNumber < schedule.days.length; dayNumber++){
            accordion.append(View.createElement("p",null,"col-12","Day "+dayNumber))
            for(let eachGame of schedule.days[dayNumber]){
                accordion.append(View.createElement("span",null,"col-4",eachGame.getScore()))
            }

        }
    }

    render(){
        return this.root;
    }
}