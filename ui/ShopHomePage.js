class ShopHomePage{
    constructor(){
        this.root = View.createElement("div","homePage","page");
        this.root.innerHTML = `
            <h3 id="homePageHeadline" class="pb-4  display-6 ">Trading Card Shop</h3>
            <div class="row">
                <div id="dateAndTime"></div>
                <div class="pageSummary col pb-4">Please buy some cards so that we can continue.</div>
                <div class="col">
                    <button type="button" class="shopContinueButton bouncy btn btn-warning float-start">CONTINUE</button>
                </div>
            </div>
            
            <div id="homePageCardContainer" class="card-body bg-222 rounded-3 shadow"></div>
            
            
        `.trim();
    }
    bindShopBuyButtonClick(handler) {
        const els = document.getElementsByClassName("shopButton");
        Array.from(els).forEach((el) => {
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {
                    const id = event.target.value
                    handler(id)
                }
                else if (event.target.localName === 'span') {
                    const id = event.target.parentElement.value
                    handler(id)
                }
            })
        })
    }
    bindShopBuyPlusOneHandClick(handler) {
        const el = document.getElementById("shopCardSlotPlusOneHandCardButton");
       
            el.addEventListener('click', event => {

                if (event.target.localName === 'button') {
                    const id = event.target.value
                    handler(id)
                }
                else if (event.target.localName === 'span') {
                    const id = event.target.parentElement.value
                    handler(id)
                }
            })
        
    }
    
    
    setShop(shop){
        this.root.querySelector("#homePageCardContainer").innerHTML = "";
        this.root.querySelector("#homePageCardContainer").append(shop);
    }
    
    render(){
        return this.root;
    }
}