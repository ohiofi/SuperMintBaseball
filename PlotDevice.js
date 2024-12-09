const PlotState = {
    INTRO_SCRIPT: 0,
    JUDGEMENT: 1,
    MID_SCRIPT: 2,
    REWARD: 3,
};


const negativePhrases = [
    "Awful Evil.",
    "Cursed.",
    "Low Ball.",
    "Numbers Go Down.",
    "Shame.",
    "So Below.",
    "Strike.",
    "Under.",
    "Underhanded.",
    "Wild Low.",
    "You Have Been Found Wanting.",
    "You Sink."
];
const positivePhrases = [
    "Ambitious.",
    "Ascension.",
    "Blessings.",
    "Champions' Spirit.",
    "Clutch Performance.",
    "Diamond Dreams.",
    "Divinity.",
    "Field Of Triumph.",
    "Golden Glove Goals.",
    "Grand Slam Moment.",
    "Home Run Vibes.",
    "Home Run.",
    "Idolized.",
    "Magic.",
    "Numbers Go Up.",
    "Over.",
    "Partytime.",
    "Swing For The Stars.",
    "Victory Formation.",
    "Winning Streak.",
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
        //console.log("Constructor called"); // Debugging
        this.plotPoints = [];
        this.state = PlotState.INTRO_SCRIPT; // Ensure the initial state is set
        //console.log("this.state initialized:", this.state);
    }

    getJudgement(model) {
        // did user reach the goal?
        const vp =
            model.users[0].valuables.greenMagic *
            model.users[0].valuables.redMagic *
            model.users[0].valuables.blueMagic;
        if (vp >= model.world.goal) {
            View.addAlert("success","LEVEL UP! 🚀<br>")
            this.setMidScriptPositive(model);
            return {
                username: model.world.league.getCommissionerFullName(),
                log: "<div style='background:#FFD700;color:black;text-align:center;'>" + PlotDevice.choice(positivePhrases) + "</div>",
            };
        } else {
            View.addAlert("danger",`-1 LIFE <br> +{}🌕`)
            this.setMidScriptNegative(model);
            model.users[0].lives--;
            return {
                username: model.world.league.getCommissionerFullName(),
                log: "<div style='background:#A16DC3;color:black;text-align:center;'>" + PlotDevice.choice(negativePhrases) + "</div>",
            };
        }
    }

    // Handle state transitions
    next(model) {
        //console.log("Current state:", this.state);
        switch (this.state) {
            case PlotState.INTRO_SCRIPT:
                //console.log("In INTRO_SCRIPT state");
                if (this.plotPoints.length > 1) {
                    return this.plotPoints.shift();
                } else {
                    this.state = PlotState.JUDGEMENT; // Transition to the next state
                    return this.plotPoints.shift();
                }

            case PlotState.JUDGEMENT:
                //console.log("Moving to MID_SCRIPT state");
                this.state = PlotState.MID_SCRIPT;
                return this.getJudgement(model);

            case PlotState.MID_SCRIPT:
                //console.log("In MID_SCRIPT state");
                if (this.plotPoints.length > 1) {
                    return this.plotPoints.shift();
                } else {
                    this.state = PlotState.REWARD; // Transition to the next state
                    return this.plotPoints.shift();
                }
                break;

            case PlotState.REWARD:
                //console.log("In REWARD state");
                break;

            default:
                console.error("Unknown state.");
        }
    }

    setIntroScript(model) {
        this.plotPoints = [];
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `This is ${model.world.newsNetwork.getReporterName()} for ${model.world.newsNetwork.getNewsAbbreviation()}, ${model.world.newsNetwork.getNewsName()}.`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `I am reporting live from ${model.world.getGameDetails()[0].homeTeamPlace.name} tonight.`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `Shortly after the game, the Commissioner of Baseball announced that an unscheduled press conferance would be held. The mood is tense.`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `There are dozens of players, staff, and league employees that have gathered here in the press room. There is some concern amongst the player.`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `It was an exciting game here in ${model.world.getGameDetails()[0].homeTeamPlace.name} with a final score of ${model.world.getGameDetails()[0].scoreString}`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `The Commissioner is walking up to the podium now and is about to speak.`
            })
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Well that was fun!" },
                { username: model.world.league.getCommissionerFullName(), log: "Wow! What a day!" },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Baseball baseball baseball. Am I right?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Is it just me or did today simply fly by!",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Gosh. Now I know why they call baseball 'The Beautiful Game' ",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Okay, team. As we say in baseball... 'everybody huddle up' ",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "These are exciting times",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Well, that was a home run of a day, wasn't it?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Phew! What a game-changer of a day.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Wow, today felt like running bases non-stop. Who's with me?",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Here's a fun trick. What number am I thinking?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Before we start, does anyone have good news?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Did anyone see that game earlier?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "How about this weather? Weird right?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Should we get started?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Anybody into jazz? Any jazz fans in the house?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Does anyone have any burning questions before we dive in?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "So... who's ready to impress me today?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Anyone want to volunteer some good news before we begin?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Can someone remind me why we're in this business?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Did someone give me a double-shot in my coffee... because I feel wired!",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Is it just me or do we need so more coffee?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's hear it. Who's got a brilliant idea to save the day?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's not strike out on this one folks. Am I right?",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "No?" },
                { username: model.world.league.getCommissionerFullName(), log: "No one?" },
                { username: model.world.league.getCommissionerFullName(), log: "Any one?" },
                { username: model.world.league.getCommissionerFullName(), log: "Nevermind." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "I'll take that as a no.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Silent as usual, I see.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Guess I'm talking to myself again.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Well, don't EVERYONE speak at once.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Is this thing ONLINE?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Can you hear me out there?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Testing, testing, 1-2-3.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Am I talking to myself here?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* ECHO!!! Echo!! Echo! echo",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Is there an echo in here, or is it just static?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Did everyone forget how to speak?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "*taps microphone* Must be a tough crowd today.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, let's see what's on the agenda.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, let's do this.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, let's get down to business.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, here we go again.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Alright, everyone..." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Hope you're ready for this one.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Here's hoping this is productive.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's keep this pain to a minimum, shall we?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's not waste any more time.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's make this quick.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Let's jump right in." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Nullification. Incineration. ",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Moving on, then." },
                { username: model.world.league.getCommissionerFullName(), log: "Okay. Welcome back." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "So... let's get started, I guess.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Okay, team, settle in.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Well, let's see how this goes.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We step up to the plate and here's the pitch...",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Time to play ball, team. Eyes on the prize.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's dig in and see if we can make a double play here.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Enough practice swings. We gotta get started.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Something's brewing. And it's not coffee.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Looks like we're in the bottom of the inning. Let's see if we can turn this around.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Well, I assume we all know why we're here... I hope.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Buckle up. This meeting might be a bumpy ride.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's try to keep this short. I've got better things to do.",
                },

                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Here's a weather forecast. There's a storm brewing.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's dive right into the chaos, shall we?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's dive in and hope this doesn't turn into a disaster.",
                },
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're shutting this league down. We're through.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "It's over. We're shutting this league down." },
                { username: model.world.league.getCommissionerFullName(), log: "We're shutting this league down. This is the end." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, let's get this over with. We're shutting this league down.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "We're done here. We're shutting this league down." },
            ])
        );
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `BREAKING NEWS: io League Baseball is shutting down.`
            })

        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "You're all fired." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Your services are no longer required. Don't let the door hit you on the way out.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Consider this your final curtain call. Take a bow and exit stage left.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're downsizing. Spoiler alert: You didn't make the cut.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're initiating a strategic personnel pivot. Translation: You're out.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Effective immediately, you're all being relieved of your duties.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "The league's moving in a new direction. We're selling everything for scrap.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Consider this your permanent vacation notice. Enjoy it.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's just say... we're decluttering the office. EVERYTHING must go.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "You've all been reassigned. Your job title is now: unemployed.",
                },
            ])
        );
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `BREAKING NEWS: ioLB Commissioner announces end of the league, lays off staff.`
            })
        this.plotPoints.push(
            {
                username: model.world.newsNetwork.getFullName(),
                log: `There were gasps in the room as that announcement was made. Players and staff are understandably upset.`
            })
        //
        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Look on the bright side. Finding a new job can be fun!",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Look on the bright side. Unemployment might suit you better.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Look on the bright side. We might be able to flee the country before the debt collectors get here.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "It's not personal. It's just business and you're all bad at business.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Without your job, you'll have more free time now.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Don't be sad. Not everyone is cut out for greatness.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Think of this as a learning experience: don't disappoint your next boss.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Well, we all saw this coming, didn't we?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "I'm doing you a favor. You should be thanking me for this wake-up call.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Chin up! It's not like you were making a huge impact here anyway.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Good luck out there. You're going to need it. This is a tough job market.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "The current business model simply isn't sustainable.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're burning through our seed money",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Finance department is a literal black hole",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "This job pays peanuts compared to other industries.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Hope I don't sound too heavy-handed, but the league's a sinking ship. We're too dense.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're swimming in shark-infested waters",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're bleeding money faster than we can make it.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "It's like pulling teeth trying to get anything done around here. I LOVE pulling teeth, but it's just not a long-term solution.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Our overhead costs are so high, they might as well be in the clouds.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "This place feels more like a desert than a business some days.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We might as well hand out paychecks with I.O.U.s at this point.",
                },
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Our expansion strategy is about as effective as a fish trying to swim upstream.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "No new growth or expansion. Our only area of expansion is our debts.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "No new growth or expansion. The magic is gone, folks.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "No growth or expansion. I wouldn't blame the investors if they jumped ship.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "No growth or expansion. Some days it feels like all the blood has drained from this place.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "The management doesn't trust any of you anymore. Who can blame them?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "You've burned through so many managers. Why? What's your problem with management?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "The budget is tight because you wasted too much time fighting management instead of doing your job.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "If you think fighting with the management will save this league, you've been misled.",
                },
            ])
        );

        

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "You've missed deadlines because you lack discipline.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "You act like discipline isn't needed here",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Your lack of discipline is why we're always cleaning up the same messes.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "You have no discipline, this league is just a collection of individual excuses.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "If you can't stick to my rules... If you're that undisciplined, then this isn't the place for you.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Discipline starts with accountability, and accountability starts with you.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "The lack of discipline here isn't a surprise, considering how little effort you put in.",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "If we act quickly, we can sell off some junk and make a little money.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Alright, enough whining. We can sell off some junk and make a little money.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Forget the mistakes. Let's pivot, sell off some junk, and make a little money.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We can't change the past, but we can sell off some junk and make a little money.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Let's put our focus on quick wins. Let's sell off some junk and make a little money.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Stop the blame game. Let's pivot, sell off some junk, and make a little money.",
                },
            ])
        );

        // things for sale
        this.plotPoints.push(...PlotDevice.choiceCount(2, 
            [

                { username: model.world.league.getCommissionerFullName(), log: "We can sell these fax machines." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We can sell these old coffee cups.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "We can sell those flood pumps." },
                { username: model.world.league.getCommissionerFullName(), log: "We can sell the solar panels." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We can sell all the leftover concessions.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Stale popcorn is still good, right?",
                },
                { username: model.world.league.getCommissionerFullName(), log: "We can sell the salmon cannons." },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We can sell these bags of peanuts.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "There's that huge bin that's full of stolen shoes. It's a nice bin. If we empty it out I bet somebody will buy that bin.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We can auction off that whiteboard that no one's used since making those YouTube videos.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "How much do you think we could get for the vending machine? I bet someone would pay for those snack options.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "That old photocopier could fetch a decent price if we sell it as scrap.",
                },
            ]
        ));
        this.plotPoints.push(PlotDevice.choice(
            [
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Does anyone want to buy a bucket of chum?",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Anyone want to buy a wet pretzel?" },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Does anyone want to buy some cold fries?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Anyone want to buy a some snake oil?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Does anyone want to buy a lootcrate?",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Anyone want to buy a square sun?" },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Does anyone want to buy a news ticker?",
                },
                { username: model.world.league.getCommissionerFullName(), log: "Anyone want to buy a microphone?" },
                { username: model.world.league.getCommissionerFullName(), log: "Does anyone want to buy a vault?" },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Anyone want to buy a forbidden book?",
                },
            ]
        ));

        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Everything must go!" },
                { username: model.world.league.getCommissionerFullName(), log: "Make an offer!" },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Who wants to make a deal?",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Prices are negotiable—always.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "I'll cut you a deal if you act fast!",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Cash talks. Let's make it happen.",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "Don't wait. This offer won't last forever!",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "As my old Boss used to say... 'Profits!' ",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "As my old Boss used to say... 'Sometimes the baseball business isn't easily blexplained' ",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "As my old Boss used to say... 'Please don't incinerate me' ",
                },
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "As my old Boss used to say... 'It's called the baseball BUSINESS, not baseball friend-ness' ",
                },
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Lol" },
                { username: model.world.league.getCommissionerFullName(), log: "Right?" },
                { username: model.world.league.getCommissionerFullName(), log: "Ha" },
                { username: model.world.league.getCommissionerFullName(), log: "Haha" },
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "What was I saying? Oh yeah..." },
                { username: model.world.league.getCommissionerFullName(), log: "Anyway... as I was saying..." },
                { username: model.world.league.getCommissionerFullName(), log: "So... as I was saying..." },
                { username: model.world.league.getCommissionerFullName(), log: "As I was saying..." },
                { username: model.world.league.getCommissionerFullName(), log: "In conclusion..." },
                { username: model.world.league.getCommissionerFullName(), log: "In summary..." }
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                {
                    username: model.world.league.getCommissionerFullName(),
                    log: "We're shutting this league down. You're all fired. io League Baseball is over.",
                },
                { username: model.world.league.getCommissionerFullName(), log: "It's over. You're all fired. io League Baseball is through." },
                { username: model.world.league.getCommissionerFullName(), log: "This is the end. You're all fired. io League Baseball is over." },
                { username: model.world.league.getCommissionerFullName(), log: "We're done here. You're all fired. io League Baseball is through." },
                { username: model.world.league.getCommissionerFullName(), log: "The season is over. You're all fired. io League Baseball is done." },
                { username: model.world.league.getCommissionerFullName(), log: "This league is through. You're all fired. io League Baseball is done." },
                { username: model.world.league.getCommissionerFullName(), log: "You're all fired. The season is over. io League Baseball is done." },

            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Before the clean out your desk... Let's see if we sold anything today..." },
                { username: model.world.league.getCommissionerFullName(), log: "While you're packing up your belongings... Let's review today's results..." },
                { username: model.world.league.getCommissionerFullName(), log: "As you're boxing up your junk... I'm going to review today's earnings..." },
                { username: model.world.league.getCommissionerFullName(), log: "Don't start cleaning out desk just yet... I'm just going to see how we performed today..." },
                { username: model.world.league.getCommissionerFullName(), log: "Pause on the desk packing-up... I want to review how things went today..." },
                { username: model.world.league.getCommissionerFullName(), log: "Before you leave... Let's take a moment to evaluate today's progress..." },
                { username: model.world.league.getCommissionerFullName(), log: "Let's put the packing-up on hold... while I check in on how we did today..." }
            ])
        );

        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Hmm..." },
                { username: model.world.league.getCommissionerFullName(), log: "Well..." },
                { username: model.world.league.getCommissionerFullName(), log: "Gee..." },
                { username: model.world.league.getCommissionerFullName(), log: "Hmm... well..." },
                { username: model.world.league.getCommissionerFullName(), log: "Well... gee..." },
                { username: model.world.league.getCommissionerFullName(), log: "Gee... hmm... " },
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "I'm checking theses figures..." },
                { username: model.world.league.getCommissionerFullName(), log: "I'm double-checking the math here..." },
                { username: model.world.league.getCommissionerFullName(), log: "That plus that... Carry the one..." },
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Hmm..." },
                { username: model.world.league.getCommissionerFullName(), log: "Well..." },
                { username: model.world.league.getCommissionerFullName(), log: "Gee..." },
                { username: model.world.league.getCommissionerFullName(), log: "Hmm... well..." },
                { username: model.world.league.getCommissionerFullName(), log: "Well... gee..." },
                { username: model.world.league.getCommissionerFullName(), log: "Gee... hmm... " },
            ])
        );


        this.plotPoints.push(
            {
                username: model.world.league.getCommissionerFullName(),
                log: `Looks like we tricked ${model.users[0].valuables.greenMagic} fools into buying stock 💹🌵`,
            },
            {
                username: model.world.league.getCommissionerFullName(),
                log: `Plus we generated ${model.users[0].valuables.redMagic} ticket sales 🎟️🔥`,
            },
            {
                username: model.world.league.getCommissionerFullName(),
                log: `And we made ${model.users[0].valuables.blueMagic} sales in merchandise 🧢💧`,
            }
        );
        // {username: model.world.league.getCommissionerFullName(), log: `Well, well, well. We managed to swindle ${model.users[0].valuables.greenMagic} unsuspecting fools into buying stocks today.`},

        // {username: model.world.league.getCommissionerFullName(), log: `On top of that, we raked in ${model.users[0].valuables.redMagic} ticket sales.`},
        // {username: model.world.league.getCommissionerFullName(), log: `And let's not forget, we boosted ${model.users[0].valuables.blueMagic} in merchandise sales.`},
        // 
        // 
        // {username: model.world.league.getCommissionerFullName(), log: `${model.users[0].valuables.greenMagic} stocks, ${model.users[0].valuables.redMagic} redMagic, and ${model.users[0].valuables.blueMagic} in merchandise... Delicious.`},
        // 
        // {username: model.world.league.getCommissionerFullName(), log: `Every dollar from ${model.users[0].valuables.greenMagic} shares, ${model.users[0].valuables.redMagic} redMagic, and ${model.users[0].valuables.blueMagic} goods brings us closer to financial stability.`},
        // {username: model.world.league.getCommissionerFullName(), log: `Today's numbers are music to my ears: ${model.users[0].valuables.greenMagic} stocks tricked, ${model.users[0].valuables.redMagic} redMagic sold, and ${model.users[0].valuables.blueMagic} worth of merchandise. `},
        // {username: model.world.league.getCommissionerFullName(), log: `I just keep impressing myself.`},
        // {username: model.world.league.getCommissionerFullName(),log:"Consider yourselves un-fired."},
        this.plotPoints.push(
            {
                username: model.world.league.getCommissionerFullName(),
                log: `Our goal for today was ${model.world.goal} victory points 👑`,
            },
            {
                username: model.world.league.getCommissionerFullName(),
                log: `We earned ${model.users[0].valuables.greenMagic *
                    model.users[0].valuables.redMagic *
                    model.users[0].valuables.blueMagic
                    } victory points 👑`,
            }
        );
    }

    setMidScriptNegative(model) {
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "What's that pinch you just felt? What's that gurgling sound you hear?" })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "That would Project A.B.O. draining about a third of your blood." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "You agreed that the league could drain your blood when you signed your contract." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Selling off all of your blood should allow us to stay in business for another 24 hours." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Also... we have insurance right?" })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "H.R. is telling me that insurance claims were never filed, because of the whole 'Act of God' nonsense. " })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "That's amazing. I'll handle it. I'm handling it." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "I've got a guaranteed new revenue stream. You'll see!" })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Consider yourselves un-fired." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: `I've saved the league once again. I just keep impressing myself.` })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "The league is not shutting down after all. Play ball!" })
    }
    setMidScriptPositive(model) {
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Impressive." })
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: "Think of the profits people!" },
                { username: model.world.league.getCommissionerFullName(), log: "Maybe we can keep this money train rolling." }
            ])
        );
        this.plotPoints.push(
            PlotDevice.choice([
                { username: model.world.league.getCommissionerFullName(), log: `I can feel my pockets growing already.` },
                { username: model.world.league.getCommissionerFullName(), log: `This just proves that my hard work is paying off.` },
                { username: model.world.league.getCommissionerFullName(), log: `Another day, another set of fools handing over their hard-earned cash.` },
            ])
        );
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Also... we have insurance right?" })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "H.R. is telling me that insurance claims were never filed, because of the whole 'Act of God' nonsense. " })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "That's amazing. I'll handle it. I'm handling it." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "I've got a guaranteed new revenue stream. You'll see!" })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "Consider yourselves un-fired." })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: `I've saved the league once again. I just keep impressing myself.` })
        this.plotPoints.push({ username: model.world.league.getCommissionerFullName(), log: "The league is not shutting down after all. Play ball!" })
    }
}
