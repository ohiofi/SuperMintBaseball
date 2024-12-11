class SchedulePage{
    constructor(){
        this.root = View.createElement("div","schedulePage","page hide");
        this.root.innerHTML = `
        <h3 id="schedulePageHeadline" class="pb-4  display-6 ">Season Schedule</h3>

        <div class="row">
            <div class="pageSummary col pb-4">
                Regular Season Games are listed below
            </div>
            <!--div class="col">
                <button type="button" class="afternoonContinueButton bouncy btn btn-warning hide">CONTINUE</button>
            </div-->
        </div>

        <div class="row" id="scheduleAccordion">
       
        </div>
        `.trim()
    }

    addSchedule(schedule){

        // const accordion = this.root.querySelector("#scheduleAccordion");
        // for(let dayNumber = 0; dayNumber < schedule.days.length; dayNumber++){
        //     const details = View.createElement("details",null,"row")
        //     accordion.append(details);
        //     details.append(View.createElement("summary",null,"col-12","Day "+dayNumber))
            
        //     for(let eachGame of schedule.days[dayNumber]){
        //         details.append(View.createElement("span",null,"col-6",eachGame.getScore()))
        //     }

        // }
        const accordion = this.root.querySelector("#scheduleAccordion");
        const accordionItem = View.createElement("details",null,"row")
        for(let dayNumber = 0; dayNumber < schedule.days.length; dayNumber++){
            this.createAccordionItem(dayNumber, "Day "+dayNumber, "")
            for(let eachGame of schedule.days[dayNumber]){
                document.getElementById("accordionBody"+dayNumber).append(View.createElement("span",null,"col-12 col-lg-6 ps-5",eachGame.getScore()))
            }
        }
    }

    createAccordionItem(id, title, bodyContent, dayNumber = 0) {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
        accordionItem.innerHTML = `
          <h2 class="accordion-header bg-444 text-black my-2 rounded-2 shadow">
            <button class="accordion-button link-black link-opacity-25 link-opacity-100-hover p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
              ${title}
            </button>
          </h2>
          <div id="collapse${id}" class="accordion-collapse collapse ${id == dayNumber ? "show" : " "}" data-bs-parent="#scheduleAccordion">
            <div id="accordionBody${id}" class="accordion-body row">
              ${bodyContent}
            </div>
          </div>
        `;
    
        document.getElementById('scheduleAccordion').appendChild(accordionItem);
      }

    render(){
        return this.root;
    }
}