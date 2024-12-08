const PlotState = {
    INTRO_SCRIPT: 0,
    JUDGEMENT: 1,
    MID_SCRIPT: 2,
    REWARD: 3,
};

const negativePhrases = [
    "Numbers go down.",
    "So below.",
    "Shame.",
    "Strike.",
    "Underhanded.",
    "Low ball.",
    "Under.",
    "Cursed.",
    "You have been found wanting. No one wants to be found wanting.",
];
const positivePhrases = [
    "Numbers go up.",
    "#PARTYTIME",
    "Blessings.",
    "Idolized.",
    "Divinity.",
    "Ambitious.",
    "Ascension.",
    "Over.",
    "Home run vibes.",
    "Grand slam moment.",
    "Home run.",
    "Winning streak.",
    "Diamond dreams.",
    "Champions' spirit.",
    "Clutch performance.",
    "Field of triumph.",
    "Swing for the stars.",
    "Victory formation.",
    "Golden glove goals.",
    "Magic.",
];
const officeItems = [
    {
        username: "Commissioner Vici",
        log: "We can sell this conference table.",
    },
    { username: "Commissioner Vici", log: "We can sell that water cooler." },
    { username: "Commissioner Vici", log: "We can sell these fax machines." },
    {
        username: "Commissioner Vici",
        log: "We can sell these old coffee cups.",
    },
    { username: "Commissioner Vici", log: "We can sell those flood pumps." },
    { username: "Commissioner Vici", log: "We can sell the solar panels." },
    {
        username: "Commissioner Vici",
        log: "We can sell all the leftover concessions.",
    },
    {
        username: "Commissioner Vici",
        log: "Stale popcorn is still good, right?",
    },
    { username: "Commissioner Vici", log: "We can sell the salmon cannons." },
    {
        username: "Commissioner Vici",
        log: "We can sell these bags of peanuts.",
    },
    {
        username: "Commissioner Vici",
        log: "There's that huge bin that's full of stolen shoes. It's a nice bin. If we empty it out I bet somebody will buy that bin.",
    },
    {
        username: "Commissioner Vici",
        log: "There's probably plenty of copper wiring we can rip out of these walls.",
    },
    {
        username: "Commissioner Vici",
        log: "We can offload these old filing cabinets. People still buy vintage office furniture, right?",
    },
    {
        username: "Commissioner Vici",
        log: "These office chairs could probably bring in a few bucks.",
    },
    {
        username: "Commissioner Vici",
        log: "Let's sell the leftover boxes of printer paper. Paper's paper, and someone might need it.",
    },
    {
        username: "Commissioner Vici",
        log: "We can auction off that whiteboard that no one's used since making those YouTube videos.",
    },
    {
        username: "Commissioner Vici",
        log: "How much do you think we could get for the vending machine? I bet someone would pay for those snack options.",
    },
    {
        username: "Commissioner Vici",
        log: "That old photocopier could fetch a decent price if we sell it as scrap.",
    },
];

const wantToBuy = [
    {
        username: "Commissioner Vici",
        log: "Does anyone want to buy a bucket of chum?",
    },
    { username: "Commissioner Vici", log: "Anyone want to buy a wet pretzel?" },
    {
        username: "Commissioner Vici",
        log: "Does anyone want to buy some cold fries?",
    },
    {
        username: "Commissioner Vici",
        log: "Anyone want to buy a some snake oil?",
    },
    {
        username: "Commissioner Vici",
        log: "Does anyone want to buy a lootcrate?",
    },
    { username: "Commissioner Vici", log: "Anyone want to buy a square sun?" },
    {
        username: "Commissioner Vici",
        log: "Does anyone want to buy a news ticker?",
    },
    { username: "Commissioner Vici", log: "Anyone want to buy a microphone?" },
    { username: "Commissioner Vici", log: "Does anyone want to buy a vault?" },
    {
        username: "Commissioner Vici",
        log: "Anyone want to buy a forbidden book?",
    },
];

class PlotDevice {
    static choice(array) {
        return array[Math.floor(rng.random() * array.length)];
    }
    static choiceCount(count, array) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5); // Shuffle the array
        return shuffled.slice(0, count); // Return the first 3 items from the shuffled array
    }

    constructor() {
        console.log("Constructor called"); // Debugging
        this.plotLines = [];
        this.state = PlotState.INTRO_SCRIPT; // Ensure the initial state is set
        console.log("this.state initialized:", this.state);
    }

    getJudgement(model) {
        // did user reach the goal?
        const vp =
            model.users[0].valuables.stocks *
            model.users[0].valuables.tickets *
            model.users[0].valuables.caps;
        if (vp >= model.world.goal) {
            //this.plotLines = getPositiveJudgementScript();
            return {
                username: "Commissioner Vici",
                bgcolor: "#006600",
                log: PlotDevice.choice(positivePhrases),
            };
        } else {
            //this.plotLines = getNegativeJudgementScript();
            return {
                username: "Commissioner Vici",
                bgcolor: "#660000",
                log: PlotDevice.choice(negativePhrases),
            };
        }
    }

    // Handle state transitions
    next(model) {
        console.log("Current state:", this.state);
        switch (this.state) {
            case PlotState.INTRO_SCRIPT:
                console.log("In INTRO_SCRIPT state");
                if (this.plotLines.length > 1) {
                    return this.plotLines.shift();
                } else {
                    this.state = PlotState.JUDGEMENT; // Transition to the next state
                    return this.plotLines.shift();
                }

            case PlotState.JUDGEMENT:
                console.log("Moving to MID_SCRIPT state");
                this.state = PlotState.MID_SCRIPT;
                return this.getJudgement(model);

            case PlotState.MID_SCRIPT:
                console.log("In MID_SCRIPT state");
                break;

            case PlotState.REWARD:
                console.log("In REWARD state");
                break;

            default:
                console.error("Unknown state.");
        }
    }

    setPlotLines(model) {
        this.plotLines = [];
        rng.random();rng.random();
        this.plotLines.push(
            PlotDevice.choice([
                { username: "Commissioner Vici", log: "Well that was fun!" },
                { username: "Commissioner Vici", log: "Wow! What a day!" },
                {
                    username: "Commissioner Vici",
                    log: "Baseball baseball baseball. Am I right?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Is it just me or did today simply fly by!",
                },
                {
                    username: "Commissioner Vici",
                    log: "Gosh. Now I know why they call baseball 'The Beautiful Game' ",
                },
                {
                    username: "Commissioner Vici",
                    log: "Okay, team. As we say in baseball... 'everybody huddle up' ",
                },
                {
                    username: "Commissioner Vici",
                    log: "These are exciting times",
                },
                {
                    username: "Commissioner Vici",
                    log: "Well, that was a home run of a day, wasn't it?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Alright, folks. Let's pitch some ideas and swing for the fences.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Phew! What a game-changer of a day.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Wow, today felt like running bases non-stop. Who's with me?",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Here's a fun trick. What number am I thinking?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Before we start, does anyone have good news?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Did anyone see that game earlier?",
                },
                {
                    username: "Commissioner Vici",
                    log: "How about this weather? Weird right?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Should we get started?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Anybody into jazz? Any jazz fans in the house?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Does anyone have any burning questions before we dive in?",
                },
                {
                    username: "Commissioner Vici",
                    log: "So... who's ready to impress me today?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Anyone want to volunteer some good news before we begin?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Can someone remind me why we're in this business?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Did someone give me a double-shot in my coffee... because I feel wired!",
                },
                {
                    username: "Commissioner Vici",
                    log: "Is it just me or do we need so more coffee?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's hear it. Who's got a brilliant idea to save the day?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's not strike out on this one folks. Am I right?",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                { username: "Commissioner Vici", log: "No?" },
                { username: "Commissioner Vici", log: "No one?" },
                { username: "Commissioner Vici", log: "Any one?" },
                { username: "Commissioner Vici", log: "Nevermind." },
                {
                    username: "Commissioner Vici",
                    log: "I'll take that as a no.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Silent as usual, I see.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Guess I'm talking to myself again.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Well, don't EVERYONE speak at once.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Is this thing ONLINE?",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Can you hear me out there?",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Testing, testing, 1-2-3.",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Am I talking to myself here?",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* ECHO!!! Echo!! Echo! echo",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Is there an echo in here, or is it just static?",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Did everyone forget how to speak?",
                },
                {
                    username: "Commissioner Vici",
                    log: "*taps microphone* Must be a tough crowd today.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Alright, let's see what's on the agenda.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Alright, let's do this.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Alright, let's get down to business.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Alright, here we go again.",
                },
                { username: "Commissioner Vici", log: "Alright, everyone..." },
                {
                    username: "Commissioner Vici",
                    log: "Hope you're ready for this one.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Here's hoping this is productive.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's keep this pain to a minimum, shall we?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's not waste any more time.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's make this quick.",
                },
                { username: "Commissioner Vici", log: "Let's jump right in." },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Nullification. Incineration. ",
                },
                { username: "Commissioner Vici", log: "Moving on, then." },
                { username: "Commissioner Vici", log: "Okay. Welcome back." },
                {
                    username: "Commissioner Vici",
                    log: "So... let's get started, I guess.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Okay, team, settle in.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Well, let's see how this goes.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We step up to the plate and here's the pitch...",
                },
                {
                    username: "Commissioner Vici",
                    log: "Time to play ball, team. Eyes on the prize.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's dig in and see if we can make a double play here.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Enough practice swings. We gotta get started.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Something's brewing. And it's not coffee.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Looks like we're in the bottom of the inning. Let's see if we can turn this around.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "We're shutting this league down.",
                },
                { username: "Commissioner Vici", log: "It's over." },
                { username: "Commissioner Vici", log: "This is the end." },
                {
                    username: "Commissioner Vici",
                    log: "Alright, let's get this over with.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Well, I assume we all know why we're here... I hope.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Buckle up. This meeting might be a bumpy ride.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's try to keep this short. I've got better things to do.",
                },
                { username: "Commissioner Vici", log: "We're done here." },
                {
                    username: "Commissioner Vici",
                    log: "Here's a weather forecast. There's a storm brewing.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's dive right into the chaos, shall we?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's dive in and hope this doesn't turn into a disaster.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                { username: "Commissioner Vici", log: "You're all fired." },
                {
                    username: "Commissioner Vici",
                    log: "Your services are no longer required. Don't let the door hit you on the way out.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Consider this your final curtain call. Take a bow and exit stage left.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We're downsizing. Spoiler alert: You didn't make the cut.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We're initiating a strategic personnel pivot. Translation: You're out.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Effective immediately, you're all being relieved of your duties.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The company's moving in a new direction. We're selling everything for scrap.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Consider this your permanent vacation notice. Enjoy it.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's just say... we're decluttering the office. EVERYTHING must go.",
                },
                {
                    username: "Commissioner Vici",
                    log: "You've all been reassigned. Your job title is now: unemployed.",
                },
            ])
        );
        //
        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Look on the bright side. Finding a new job can be fun!",
                },
                {
                    username: "Commissioner Vici",
                    log: "Look on the bright side. Unemployment might suit you better.",
                },
                {
                    username: "Commissioner Vici",
                    log: "This isn't a setback, it's an opportunity... for us to find someone better.",
                },
                {
                    username: "Commissioner Vici",
                    log: "It's not personal. It's just business and you're all bad at business.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Hey, at least you'll have more free time now.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Don't be sad; not everyone is cut out for greatness.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Think of this as a learning experience: don't disappoint your next boss.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Well, we all saw this coming, didn't we?",
                },
                {
                    username: "Commissioner Vici",
                    log: "I'm doing you a favor. You should be thanking me for this wake-up call.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Chin up! It's not like you were making a huge impact here anyway.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Good luck out there. You're going to need it. This is a tough job market.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "The current business model simply isn't sustainable.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We're burning through our seed money",
                },
                {
                    username: "Commissioner Vici",
                    log: "Finance department is a literal black hole",
                },
                {
                    username: "Commissioner Vici",
                    log: "This job pays peanuts compared to other industries.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Hope I don't sound too heavy-handed, but the league's a sinking ship. We're too dense.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We're swimming in shark-infested waters",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "We're hemorrhaging money faster than we can make it.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Our overhead costs are so high, they might as well be in orbit.",
                },
                {
                    username: "Commissioner Vici",
                    log: "This place feels more like a daycare than a business some days.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The profit margins are thinner than my patience.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We might as well hand out paychecks with I.O.U.s at this point.",
                },
            ])
        );
        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Our growth strategy is about as effective as a fish trying to swim upstream.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The way things are going, we'll be out of business by next quarter.",
                },
                {
                    username: "Commissioner Vici",
                    log: "It's like pulling teeth trying to get anything productive done around here.",
                },
                {
                    username: "Commissioner Vici",
                    log: "I wouldn't blame the investors if they ran for the hills.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Some days it feels like all the blood has drained from this place.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "We have to face the fact that no one cares about this company anymore.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The management trust any of you anymore. Who can blame them?",
                },
                {
                    username: "Commissioner Vici",
                    log: "You've burned through so many managers. Why? What's wrong wi",
                },
                {
                    username: "Commissioner Vici",
                    log: "The budget is tight because you wasted too much time fighting management instead of doing your job.",
                },
                {
                    username: "Commissioner Vici",
                    log: "If you think fighting with the management will save this company, you've been misled.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Frankly, most of you are replaceable, and we all know it.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We're behind schedule, and I'm not interested in excuses this time.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "Profitability has become a pipe dream with how inefficient this team is.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Your success doesn't matter unless it directly benefits me.",
                },
                {
                    username: "Commissioner Vici",
                    log: "I've run out of excuses to explain why this company is still afloat.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The only thing consistent around here is how poorly we execute our plans.",
                },
                {
                    username: "Commissioner Vici",
                    log: "I've given you every opportunity, and yet the results are always mediocre at best.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "You've missed deadlines because you lack discipline.",
                },
                {
                    username: "Commissioner Vici",
                    log: "You act like discipline isn't needed here",
                },
                {
                    username: "Commissioner Vici",
                    log: "Your lack of discipline is why we're always cleaning up the same messes.",
                },
                {
                    username: "Commissioner Vici",
                    log: "You have no discipline, this league is just a collection of individual excuses.",
                },
                {
                    username: "Commissioner Vici",
                    log: "If you can't stick to the rules... If you're that undisciplined, then this isn't the place for you.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Discipline starts with accountability, and accountability starts with you.",
                },
                {
                    username: "Commissioner Vici",
                    log: "The lack of discipline here isn't a surprise, considering how little effort you put in.",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "If we act quickly, we can still turn a profit.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Alright, enough whining. Let's find a way to make a quick buck.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Forget the mistakes. Let's pivot and chase the next revenue stream.",
                },
                {
                    username: "Commissioner Vici",
                    log: "We can't change the past, but we can chase a profit right now.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Let's put our focus on quick wins. Money waits for no one.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Stop the blame game. I've got an idea to generate cash, and it starts now.",
                },
            ])
        );

        // things for sale
        this.plotLines.push(...PlotDevice.choiceCount(2, officeItems));
        this.plotLines.push(PlotDevice.choice(wantToBuy));

        this.plotLines.push(
            PlotDevice.choice([
                { username: "Commissioner Vici", log: "Everything must go!" },
                { username: "Commissioner Vici", log: "Make an offer!" },
                {
                    username: "Commissioner Vici",
                    log: "Who wants to make a deal?",
                },
                {
                    username: "Commissioner Vici",
                    log: "Prices are negotiable—always.",
                },
                {
                    username: "Commissioner Vici",
                    log: "I'll cut you a deal if you act fast!",
                },
                {
                    username: "Commissioner Vici",
                    log: "Cash talks. Let's make it happen.",
                },
                {
                    username: "Commissioner Vici",
                    log: "Don't wait. This offer won't last forever!",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "As my old Boss used to say... 'Profits!' ",
                },
                {
                    username: "Commissioner Vici",
                    log: "As my old Boss used to say... 'Sometimes the baseball business isn't easily blexplained' ",
                },
                {
                    username: "Commissioner Vici",
                    log: "As my old Boss used to say... 'Please don't incinerate me' ",
                },
                {
                    username: "Commissioner Vici",
                    log: "As my old Boss used to say... 'It's called the baseball BUSINESS, not baseball friend-ness' ",
                },
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {username: "Commissioner Vici",log:"Lol"},
                {username: "Commissioner Vici",log:"Right?"},
                {username: "Commissioner Vici",log:"Ha"},
                {username: "Commissioner Vici",log:"Haha"},
            ])
        );
        this.plotLines.push(
            PlotDevice.choice([
                { username: "Commissioner Vici", log: "What was I saying? Oh yeah..." },
                { username: "Commissioner Vici", log: "Anyway... as I was saying..." },
                { username: "Commissioner Vici", log: "So... as I was saying..." },
                { username: "Commissioner Vici", log: "As I was saying..." },
                { username: "Commissioner Vici", log: "In conclusion..." },
                { username: "Commissioner Vici", log: "In summary..." }
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {
                    username: "Commissioner Vici",
                    log: "We're shutting this league down. You're all fired. io League Baseball is over.",
                },
                { username: "Commissioner Vici", log: "It's over. You're all fired. io League Baseball is through." },
                { username: "Commissioner Vici", log: "This is the end. You're all fired. io League Baseball is over." },
                { username: "Commissioner Vici", log: "We're done here. You're all fired. io League Baseball is through." },
                { username: "Commissioner Vici", log: "The season is over. You're all fired. io League Baseball is done." },
                { username: "Commissioner Vici", log: "This league is through. You're all fired. io League Baseball is done." },
                { username: "Commissioner Vici", log: "You're all fired. The season is over. io League Baseball is done." },
                
            ])
        );
        this.plotLines.push(
            PlotDevice.choice([
                {username: "Commissioner Vici",log:"Before the clean out your desk... Let's see if we sold anything today..."},
                {username: "Commissioner Vici", log: "While you're packing up your belongings... Let's review today's results..."},
                {username: "Commissioner Vici", log: "As you're boxing up your junk... I'm going to review today's earnings..."},
                {username: "Commissioner Vici", log: "Don't start cleaning out desk just yet... I'm just going to see how we performed today..."},
                {username: "Commissioner Vici", log: "Pause on the desk packing-up... I want to review how things went today..."},
                {username: "Commissioner Vici", log: "Before you leave... Let's take a moment to evaluate today's progress..."},
                {username: "Commissioner Vici", log: "Let's put the packing-up on hold... while I check in on how we did today..."}
            ])
        );

        this.plotLines.push(
            PlotDevice.choice([
                {username: "Commissioner Vici",log:"Hmm..."},
                {username: "Commissioner Vici",log:"Well..."},
                {username: "Commissioner Vici",log:"Gee..."},
                {username: "Commissioner Vici",log:"Hmm... well..."},
                {username: "Commissioner Vici",log:"Well... gee..."},
                {username: "Commissioner Vici",log:"Gee... hmm... "},
            ])
        );
        this.plotLines.push(
            PlotDevice.choice([
                {username: "Commissioner Vici",log:"I'm checking theses figures..."},
                {username: "Commissioner Vici",log:"I'm double-checking the math here..."},
                {username: "Commissioner Vici",log:"That plus that... Carry the one..."},
            ])
        );
        this.plotLines.push(
            PlotDevice.choice([
                {username: "Commissioner Vici",log:"Hmm..."},
                {username: "Commissioner Vici",log:"Well..."},
                {username: "Commissioner Vici",log:"Gee..."},
                {username: "Commissioner Vici",log:"Hmm... well..."},
                {username: "Commissioner Vici",log:"Well... gee..."},
                {username: "Commissioner Vici",log:"Gee... hmm... "},
            ])
        );


        this.plotLines.push(
            {
                username: "Commissioner Vici",
                log: `Looks like we tricked ${model.users[0].valuables.stocks} fools into buying stocks 💹`,
            },
            {
                username: "Commissioner Vici",
                log: `Plus we generated ${model.users[0].valuables.tickets} ticket sales 🎟️`,
            },
            {
                username: "Commissioner Vici",
                log: `And we made ${model.users[0].valuables.caps} sales in merchandise 🧢`,
            }
        );
        // {username: "Commissioner Vici", log: `Well, well, well. We managed to swindle ${model.users[0].valuables.stocks} unsuspecting fools into buying stocks today.`},
        // {username: "Commissioner Vici",log:"Impressive."},
        // {username: "Commissioner Vici",log:"Think of the profits people!"},
        // {username: "Commissioner Vici", log: `On top of that, we raked in ${model.users[0].valuables.tickets} ticket sales.`},
        // {username: "Commissioner Vici",log:"Maybe we can keep this money train rolling."},
        // {username: "Commissioner Vici", log: `And let's not forget, we boosted ${model.users[0].valuables.caps} in merchandise sales.`},
        // {username: "Commissioner Vici",log:`I can feel my pockets growing already.`},
        // {username: "Commissioner Vici", log: `Another day, another set of fools handing over their hard-earned cash.`},
        // {username: "Commissioner Vici", log: `${model.users[0].valuables.stocks} stocks, ${model.users[0].valuables.tickets} tickets, and ${model.users[0].valuables.caps} in merchandise... Delicious.`},
        // {username: "Commissioner Vici", log: `This just proves that my hard work is paying off.`},
        // {username: "Commissioner Vici", log: `Every dollar from ${model.users[0].valuables.stocks} shares, ${model.users[0].valuables.tickets} tickets, and ${model.users[0].valuables.caps} goods brings us closer to financial stability.`},
        // {username: "Commissioner Vici", log: `Today's numbers are music to my ears: ${model.users[0].valuables.stocks} stocks tricked, ${model.users[0].valuables.tickets} tickets sold, and ${model.users[0].valuables.caps} worth of merchandise. `},
        // {username: "Commissioner Vici", log: `I just keep impressing myself.`},
        // {username: "Commissioner Vici",log:"Consider yourselves un-fired."},
        this.plotLines.push(
            {
                username: "Commissioner Vici",
                log: `Our goal for today was ${model.world.goal} VP 🏅`,
            },
            {
                username: "Commissioner Vici",
                log: `We earned ${
                    model.users[0].valuables.stocks *
                    model.users[0].valuables.tickets *
                    model.users[0].valuables.caps
                } VP 🏅`,
            }
        );
    }
}
