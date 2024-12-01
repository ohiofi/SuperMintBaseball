class HomePage{
    constructor(){
        this.root = View.createElement("div","homePage","page");
        this.root.innerHTML = `
            <h3 id="homePageHeadline" class="pb-4  display-6 ">Welcome!</h3>
            <div class="row">
                <div class="pageSummary col pb-4">The experiment demands that you continue.</div>
                <div class="col">
                    <button type="button" class="continueButton bouncy btn btn-warning hide">CONTINUE</button>
                </div>
            </div>
            <div id="homePageCardContainer"></div>
            
        `.trim();
    }
    
    setShop(shop){
        this.root.querySelector("#homePageCardContainer").innerHTML = "";
        this.root.querySelector("#homePageCardContainer").append(shop);
    }
    
    render(){
        return this.root;
    }
}