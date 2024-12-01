class ShopView extends View{

    constructor(){
        super();
        this.addMenuItemHome()
        this.addMenuItemSchedule()
        this.addMenuItemStandings()

        // home
        this.homePage = new HomePage();
        this.pageContainer.append(this.homePage.render());

        // schedule
        this.schedulePage = new SchedulePage()
        this.pageContainer.append(this.schedulePage.render());

        // standings page
        this.standingsPage = new StandingsPage();
        this.pageContainer.append(this.standingsPage.render());
    }
}