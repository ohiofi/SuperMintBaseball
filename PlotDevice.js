const PlotState = {
    INTRO_SCRIPT: 0,
    JUDGEMENT: 1,
    MID_SCRIPT: 2,
    END: 3,
};

const crypticUnicode = "⚙︎⧫︎⏁⨅⩊⟅⟁⤫⤧⦸⨷⟊⏂⏇⩎⧆⟠⏞⤂⩏⧨⩰⏊⧀⩚⏁⨂⟃⤿ȴɣɮƏǂȢȹʭʚʘʓʋʅɻɸɷɮɕɅ˫˧ː⌀⌆⌇⌐⌒⌔⌕⌖⌗⌙⌠⌡⌤⌬⌭⌮⌯⌰⌱⌲⌳⌊⌋⌸⌻⌾⍋⍒⍚⍝⎎⎍⏧⏣⎲⎳⏈⏅⏂⏁⏄⎶⎓⎔⍦⎑⎊⎄⍢⍽⍿⍾⍼⍻";

const negativePhrases = [
    "Awful Evil",
    "Beyond Hope",
    "Blasphemy",
    "Blood Bath",
    "Broken Hearts",
    "Broken Spirit",
    "Cursed Luck",
    "Cursed",
    "Dark Fate",
    "Defeat",
    "Defeated",
    "Descent",
    "Fallen Below",
    "Fire Walk",
    "Forbidden",
    "Go Down",
    "Incineration",
    "Instability",
    "Lost Glory",
    "Lost Hope",
    "Low Ball",
    "Misfortune",
    "Nullification",
    "Shame",
    "Sinister Odds",
    "So Below",
    "Solar Eclipse",
    "Strike",
    "Under",
    "Underhanded",
    "Unstable",
    "Wanting",
    "Wild Low",
    "You Sink",
];
const positivePhrases = [
    "Ambitious",
    "Ascension",
    "Blessings",
    "Champion Spirit",
    "Clutch Performance",
    "Diamond Dreams",
    "Divinity",
    "Elite Ambition",
    "Field Of Triumph",
    "Go Up",
    "Golden Glove",
    "Grand Slam",
    "Hero Journey",
    "Home Run",
    "Idolized",
    "Magic",
    "Over",
    "Partytime",
    "Shining Suns",
    "Swing Stars",
    "The Sun",
    "Triumphant",
    "Victory",
    "Winning Streak",
];




class PlotDevice {
    static choice(array) {
        return array[Math.floor(rng.random() * array.length)];
    }
    static choiceCount(count, array) {
        const shuffled = array.slice().sort(() => Math.random() - 0.5); // Shuffle the array
        return shuffled.slice(0, count); // Return the first 3 items from the shuffled array
    }
    static crypticPhrase(phraseArray) {
        let result = "";
        const word = PlotDevice.choice(phraseArray);
        for (let eachLetter of word) {
            result += PlotDevice.choice(crypticUnicode) + eachLetter;
        }
        return result + PlotDevice.choice(crypticUnicode);

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
            model.users[0].getVictoryPoints()
        if (vp >= model.users[0].getGoal()) {
            View.addAlert("success", "LEVEL UP! 🚀")
            View.addAlert("success", `Earned +${model.users[0].getReward()} 🌕`)
            model.users[0].valuables.money += model.users[0].getReward();
            View.addAlert("success", `You magic levels have reset 🔥🌵💧`);
            model.users[0].valuables.setMagicToZero();
            this.setMidScriptPositive(model);
            return {
                username: "⚙︎⧫︎⏁⨅⩊⟅⟁⤫ ⩎⧆⟠⏞⤧⦸⨷⟊⏂⏇⤂⩏⧨⩰",
                colorScheme: { light: "#000", mid: "#FFD700", dark: "#FFD700" },
                log: "<div style='background:#FFD700;color:black;text-align:center;'>" + PlotDevice.crypticPhrase(positivePhrases) + "</div>",
            };
        } else {
            View.addAlert("danger", `-1 LIFE 🩸`)
            View.addAlert("danger", `Earned +${model.users[0].getReward()} 🌕`)
            model.users[0].valuables.money += model.users[0].getReward();
            this.setMidScriptNegative(model);
            model.users[0].lives--;
            return {
                username: "⚙︎⧫︎⏁⨅⩊⟅⟁⤫ ⩎⧆⟠⏞⤧⦸⨷⟊⏂⏇⤂⩏⧨⩰",
                colorScheme: { light: "#000", mid: "#A16DC3", dark: "#A16DC3" },
                log: "<div style='background:#A16DC3;color:black;text-align:center;'>" + PlotDevice.crypticPhrase(negativePhrases) + "</div>",
            };
        }
    }

    generatePosts(_username, _colorScheme, _log) {
        if (Array.isArray(_log)) {
            for (let eachLog of _log) {
                this.plotPoints.push(
                    {
                        username: _username,
                        colorScheme: _colorScheme || null,
                        log: eachLog
                    }
                );
            }
        } else if (typeof _log === "string") {
            this.plotPoints.push(
                {
                    username: _username,
                    colorScheme: _colorScheme || null,
                    log: _log
                }
            );
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
                    this.state = PlotState.END; // Transition to the next state
                    return this.plotPoints.shift();
                }
                break;

            case PlotState.END:
                // show continue button
                const els = document.getElementsByClassName("nightContinueButton");
                Array.from(els).forEach((el) => { el.classList.remove("hide")});
                break;

            default:
                console.error("Unknown state.");
        }
    }

    setIntroScript(model) {
        this.plotPoints = [];
        // broadcast news
        this.generatePosts(
            model.world.newsNetwork.getFullName(),
            model.world.newsNetwork.colorScheme,
            [
                `This is ${model.world.newsNetwork.getReporterName()} for ${model.world.newsNetwork.getNewsAbbreviation()}, ${model.world.newsNetwork.getNewsName()}.`,
                `Reporting live from the lovely lights of ${model.world.getGameDetails()[0].homeTeamPlace.name} tonight.`,
                `Following the final flourish of the game, the Commissioner of Baseball called for an unscheduled press conference. The tension is thick, the mood murky.`,
                `Dozens of players, staffers, and league luminaries have gathered in the press room. Concern creeps amongst the crowd of competitors.`,
                `An exciting and electrifying game here in ${model.world.getGameDetails()[0].homeTeamPlace.name} with a final score of ${model.world.getGameDetails()[0].scoreString}`,
                `The Commissioner is striding to the stage, stepping into the spotlight, and ready to speak.`
            ]
        )
        // commissioner
        this.generatePosts(
            model.world.league.getCommissionerFullName(),
            model.world.league.colorScheme,
            [
                PlotDevice.choice([
                    "Well that was fun!",
                    "Wow! What a day!",
                    "Baseball baseball baseball. Am I right?",
                    "Is it just me or did today simply fly by!",
                    "Gosh. Now I know why they call baseball 'The Beautiful Game' ",
                    "Okay, team. As we say in baseball... 'everybody huddle up' ",
                    "These are exciting times",
                    "Well, that was a home run of a day, wasn't it?",
                    "Phew! What a game-changer of a day.",
                    "Wow, today felt like running bases non-stop. Who's with me?",
                ]),
                PlotDevice.choice([
                    "Here's a fun trick. What number am I thinking?",
                    "Before we start, does anyone have good news?",
                    "Did anyone see that game earlier?",
                    "How about this weather? Weird right?",
                    "Should we get started?",
                    "Anybody into jazz? Any jazz fans in the house?",
                    "Does anyone have any burning questions before we dive in?",
                    "So... who's ready to impress me today?",
                    "Anyone want to volunteer some good news before we begin?",
                    "Can someone remind me why we're in the baseball business?",
                    "Did someone give me a double-shot in my coffee... because I feel wired!",
                    "Is it just me or do we need so more coffee?",
                    "Let's hear it. Who's got a brilliant idea to save the day?",
                    "Let's not strike out on this one folks. Am I right?",
                ]),
                PlotDevice.choice([
                    "No?",
                    "No one?",
                    "Any one?",
                    "Nevermind.",
                    "I'll take that as a no.",
                    "Silent as usual, I see.",
                    "Guess I'm talking to myself again.",
                    "Well, don't EVERYONE speak at once.",

                ]),

                PlotDevice.choice([
                    "*taps microphone* Is this thing ONLINE?",
                    "*taps microphone* Can you hear me out there?",
                    "*taps microphone* Testing, testing, 1-2-3.",
                    "*taps microphone* Am I talking to myself here?",
                    "*taps microphone* ECHO!!! Echo!! Echo! echo",
                    "*taps microphone* Is there an echo in here, or is it just static?",
                    "*taps microphone* Did everyone forget how to speak?",
                    "*taps microphone* Must be a tough crowd today.",
                ]),


                PlotDevice.choice([
                    "Alright, let's see what's on the agenda.",
                    "Alright, let's do this.",
                    "Alright, let's get down to business.",
                    "Alright, here we go again.",
                    "Alright, everyone...",
                    "Hope you're ready for this one.",
                    "Here's hoping this is productive.",
                    "Let's keep this pain to a minimum, shall we?",
                    "Let's not waste any more time.",
                    "Let's make this quick.",
                    "Let's jump right in.",
                    "Nullification. Incineration. ",
                    "Moving on, then.",
                    "Okay. Welcome back.",
                    "So... let's get started, I guess.",
                    "Okay, team, settle in.",
                    "Alright, let's see how this goes.",
                    "We step up to the plate and here's the pitch...",
                    "Time to play ball, team. Step up to the plate. Eyes on the prize.",
                    "Let's dig in and see if we can make a double play here.",
                    "Enough practice swings. We gotta get started.",
                    "Something's brewing. And it's not coffee.",
                    "Looks like we're in the bottom of the inning. Let's see if we can turn this around.",
                    "Well, I assume we all know why we're here... I hope.",
                    "Buckle up. This meeting might be a bumpy ride.",
                    "Let's try to keep this short. I've got better things to do.",
                    "Here's a weather forecast. There's a storm brewing.",
                    "Let's dive right into the chaos, shall we?",
                    "Let's dive in and hope this doesn't turn into a disaster.",

                ]),
                PlotDevice.choice([
                    "We're shutting this league down. We're through.",
                    "It's over. We're shutting this league down.",
                    "We're shutting this league down. This is the end.",
                    "Well, let's get this over with. We're shutting this league down.",
                    "We're done here. We're shutting this league down.",
                ])
            ]);
        // end of commissioner
        // broadcast news
        this.generatePosts(
            model.world.newsNetwork.getFullName(),
            model.world.newsNetwork.colorScheme,
            `BREAKING: io League Baseball Cancels Competition, Calls It Quits.`
        )
        // back to commissioner
        this.generatePosts(
            model.world.league.getCommissionerFullName(),
            model.world.league.colorScheme,
            PlotDevice.choice([
                "You're all fired.",
                "Your services are no longer required. Don't let the door hit you on the way out. You're all fired.",
                "Consider this your final curtain call. Take a bow and exit stage left. You're all fired.",
                "We're downsizing... by 100%. Spoiler alert: You didn't make the cut. You're all fired.",
                "Effective immediately, you're being relieved of your duties. You're all fired.",
                "The league's moving in a new direction. We're selling everything for scrap. You're all fired.",
                "Consider this your permanent vacation notice. Enjoy it. You're all fired.",
                "Let's just say... we're decluttering the office. EVERYTHING must go. You're all fired.",
                "You've been reassigned. Your job title is now: unemployed. You're all fired.",
            ])
        );
        // broadcast news
        this.generatePosts(
            model.world.newsNetwork.getFullName(),
            model.world.newsNetwork.colorScheme,
            [
                "BREAKING BULLETIN: Commissioner Hurls Hardball, Cancels League, Cuts Careers Cold.",
                "Gasps gripped the gathered group as the grim proclamation passed his lips.",
                "Players and personnel are pained, paralyzed, and predictably perturbed."
            ]
        );
        // back to commissioner
        this.generatePosts(
            model.world.league.getCommissionerFullName(),
            model.world.league.colorScheme,
            [
                PlotDevice.choice([
                    "Look on the bright side. Finding a new job can be fun!",
                    "Look on the bright side. Unemployment might suit you better.",
                    "Look on the bright side. We might be able to flee the country before the debt collectors get here.",
                    "It's not personal. It's just business and you're all bad at business.",
                    "Without your job, you'll have more free time now.",
                    "Don't be sad. Not everyone is cut out for greatness.",
                    "Think of this as a learning experience: don't disappoint your next boss.",
                    "Well, we all saw this coming, didn't we?",
                    "I'm doing you a favor. You should be thanking me for this wake-up call.",
                    "Chin up! It's not like you were making a huge impact here anyway.",
                    "Good luck out there. You're going to need it. This is a tough job market.",
                ]),
                PlotDevice.choice([
                    "The current business model simply isn't sustainable.",
                    "We're burning through our seed money",
                    "Finance department is a literal black hole",
                    "This job pays peanuts compared to other industries.",
                    "Hope I don't sound too heavy-handed, but the league's a sinking ship. We're too dense.",
                    "We're swimming in shark-infested waters",
                ]),
                PlotDevice.choice([
                    "We're bleeding money faster than we can make it.",
                    "It's like pulling teeth trying to get anything done around here. I LOVE pulling teeth, but it's just not a long-term solution.",
                    "Our overhead costs are so high, they might as well be in the clouds.",
                    "This place feels more like a desert than a business some days.",
                    "We might as well hand out paychecks with I.O.U.s at this point.",
                ]),
                PlotDevice.choice([
                    "Our expansion strategy is about as effective as a fish trying to swim upstream.",
                    "No new growth or expansion. Our only area of expansion is our debts.",
                    "No new growth or expansion. The magic is gone, folks.",
                    "No growth or expansion. I wouldn't blame the investors if they jumped ship.",
                    "No growth or expansion. Some days it feels like all the blood has drained from this place.",
                ]),
                PlotDevice.choice([
                    "The management doesn't trust any of you anymore. Who can blame them?",
                    "You've burned through so many managers. Why? What's your problem with management?",
                    "The budget is tight because you wasted too much time fighting management instead of doing your job.",
                    "If you think fighting with the management will save this league, you've been misled.",
                ]),
                PlotDevice.choice([
                    "You've missed deadlines because you lack discipline.",
                    "You act like discipline isn't needed here",
                    "Your lack of discipline is why we're always cleaning up the same messes.",
                    "You have no discipline, this league is just a collection of individual excuses.",
                    "If you can't stick to my rules... If you're that undisciplined, then this isn't the place for you.",
                    "Discipline starts with accountability, and accountability starts with you.",
                    "The lack of discipline here isn't a surprise, considering how little effort you put in.",
                ]),
                PlotDevice.choice([
                    "If we act quickly, we can sell off some junk and make a little money.",
                    "Alright, enough whining. We can sell off some junk and make a little money.",
                    "Forget the mistakes. Let's pivot, sell off some junk, and make a little money.",
                    "We can't change the past, but we can sell off some junk and make a little money.",
                    "Let's put our focus on quick wins. Let's sell off some junk and make a little money.",
                    "Stop the blame game. Let's pivot, sell off some junk, and make a little money.",
                ]),
                PlotDevice.choice([
                    "We can sell these fax machines.",
                    "We can sell these old coffee cups.",
                    "We can sell those flood pumps.",
                    "We can sell the solar panels.",
                    "We can sell the salmon cannons.",
                ]),
                PlotDevice.choice([
                    "We can sell all the leftover concessions.",
                    "Stale popcorn is still good, right?",
                    "We can sell these bags of peanuts.",
                    "There's that huge bin that's full of stolen shoes. It's a nice bin. If we empty it out I bet somebody will buy that bin.",
                    "We can auction off that whiteboard that no one's used since making those YouTube videos.",
                ]),
                PlotDevice.choice([
                    "Does anyone want to buy a bucket of chum?",
                    "Anyone want to buy a wet pretzel?",
                    "Does anyone want to buy some cold fries?",
                    "Anyone want to buy a some snake oil?",
                    "Does anyone want to buy a lootcrate?",
                    "Anyone want to buy a square sun?",
                    "Does anyone want to buy a news ticker?",
                    "Anyone want to buy a microphone?",
                    "Does anyone want to buy a vault?",
                    "Anyone want to buy a forbidden book?",
                ]),
                PlotDevice.choice([
                    "Everything must go!",
                    "Make an offer!",
                    "Who wants to make a deal?",
                    "Prices are negotiable—always.",
                    "I'll cut you a deal if you act fast!",
                    "Cash talks. Let's make it happen.",
                    "Don't wait. This offer won't last forever!",
                ]),
                PlotDevice.choice([
                    "As my old Boss used to say... 'Profits!' ",
                    "As my old Boss used to say... 'Sometimes the baseball business isn't easily blexplained' ",
                    "As my old Boss used to say... 'Please don't incinerate me' ",
                    "As my old Boss used to say... 'It's called the baseball BUSINESS, not baseball friend-ness' ",
                ]),
                PlotDevice.choice([
                    "Lol",
                    "Right?",
                    "Ha",
                    "Haha",
                ]),
                PlotDevice.choice([
                    "What was I saying? Oh yeah...",
                    "Anyway... as I was saying...",
                    "So... as I was saying...",
                    "As I was saying...",
                    "In conclusion...",
                    "In summary..."
                ]),
                PlotDevice.choice([
                    "We're shutting this league down. You're all fired. io League Baseball is... over? What is that?",
                    "It's over. You're all fired. io League Baseball is... through? What is that?",
                    "This is the end. You're all fired. io League Baseball is... over? Who is that?",
                    "We're done here. You're all fired. io League Baseball is... through? Who is that?",
                    "The season is over. You're all fired. io League Baseball is... done? What's happening?",
                    "This league is through. You're all fired. io League Baseball is... done? What's happening?",
                    "You're all fired. The season is over. io League Baseball is... done? What is that?",
                ])
            ]
        );
        // broadcast news
        this.generatePosts(
            model.world.newsNetwork.getFullName(),
            model.world.newsNetwork.colorScheme,
            [
                "Something strange is stirring, folks. The commissioner stopped suddenly as a foul, foreboding wind whipped wildly through the press room.",
                "The ominous occurrence rattled the windows, sending the American flags on the stage flailing in a frenzied flurry.",
                "The air was filled with an eerie echo like a chilling chorus of cries, causing reporters to clutch their coats and hats.",
                "The doors slammed shut with a deafening din, silencing the scene and leaving everyone frozen in fear. A mysterious, melodic voice murmured...",
            ]
        );
    }; // end of intro script



    //         this.plotPoints.push(
    //             PlotDevice.choice([
    //                 "Hmm..." },
    //                 "Well..." },
    //                 "Gee..." },
    //                 "Hmm... well..." },
    //                 "Well... gee..." },
    //                 "Gee... hmm... " },
    //             ])
    //         );
    //         this.plotPoints.push(
    //             PlotDevice.choice([
    //                 "I'm checking theses figures..." },
    //                 "I'm double-checking the math here..." },
    //                 "That plus that... Carry the one..." },
    //             ])
    //         );
    //         this.plotPoints.push(
    //             PlotDevice.choice([
    //                 "Hmm..." },
    //                 "Well..." },
    //                 "Gee..." },
    //                 "Hmm... well..." },
    //                 "Well... gee..." },
    //                 "Gee... hmm... " },
    //             ])
    //         );



    //         // {username: model.world.league.getCommissionerFullName(), log: `Well, well, well. We managed to swindle ${model.users[0].valuables.greenMagic} unsuspecting fools into buying stocks today.`},

    //         // {username: model.world.league.getCommissionerFullName(), log: `On top of that, we raked in ${model.users[0].valuables.redMagic} ticket sales.`},
    //         // {username: model.world.league.getCommissionerFullName(), log: `And let's not forget, we boosted ${model.users[0].valuables.blueMagic} in merchandise sales.`},
    //         // 
    //         // 
    //         // {username: model.world.league.getCommissionerFullName(), log: `${model.users[0].valuables.greenMagic} stocks, ${model.users[0].valuables.redMagic} redMagic, and ${model.users[0].valuables.blueMagic} in merchandise... Delicious.`},
    //         // 
    //         // {username: model.world.league.getCommissionerFullName(), log: `Every dollar from ${model.users[0].valuables.greenMagic} shares, ${model.users[0].valuables.redMagic} redMagic, and ${model.users[0].valuables.blueMagic} goods brings us closer to financial stability.`},
    //         // {username: model.world.league.getCommissionerFullName(), log: `Today's numbers are music to my ears: ${model.users[0].valuables.greenMagic} stocks tricked, ${model.users[0].valuables.redMagic} redMagic sold, and ${model.users[0].valuables.blueMagic} worth of merchandise. `},
    //         // {username: model.world.league.getCommissionerFullName(), log: `I just keep impressing myself.`},
    //         // {username: model.world.league.getCommissionerFullName(),log:"Consider yourselves un-fired."},
    //         this.plotPoints.push(
    //             {
    //                 username: model.world.league.getCommissionerFullName(),
    //                 log: `Our goal for today was ${model.world.goal} victory points 👑`,
    //             },
    //             {
    //                 username: model.world.league.getCommissionerFullName(),
    //                 log: `We earned ${model.users[0].valuables.greenMagic *
    //                     model.users[0].valuables.redMagic *
    //                     model.users[0].valuables.blueMagic
    //                     } victory points 👑`,
    //             }
    //         );
    //     }

        setMidScriptNegative(model) {
            // broadcast news
            this.generatePosts(
                model.world.newsNetwork.getFullName(),
                model.world.newsNetwork.colorScheme,
                "The lights flickering faintly, followed by a heavy hush. After a brief, breathless beat, the Commissioner continued."
            )
            // back to commissioner
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    "Nothing to fear people! That was just the sound of the blood syphon starting up.",
                    "Looks like the engineering department FINALLY got it working... and just when I was about to shut the league down!",
                    "You may have just felt a little pinch. Or perhaps heard an odd, gurgling sound.",
                    "That would be the blood syphon draining about a third of your essence.",
                    "Did you forget? You agreed that the league could drain your blood when you signed your contract.",
                    "Selling off all of your blood should allow us to stay in business for at least another 24 hours.",
                    "Consider yourselves un-fired.",
                    "I've saved the league once again. I just keep impressing myself.",
                    "The league is not shutting down after all. Play ball!",
                ]
            )
        }
        setMidScriptPositive(model) {
            // broadcast news
            this.generatePosts(
                model.world.newsNetwork.getFullName(),
                model.world.newsNetwork.colorScheme,
                "The lights flickering faintly, followed by a heavy hush. After a brief, breathless beat, the Commissioner continued."
            )
            // back to commissioner
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                
                "That strange... uh... wind storm... just reminded me. We have insurance right?",
                "H.R. is telling me that insurance claims were never filed, because of some Acts Of Gods nonsense? ",
                "This is amazing. I'll handle it. I'm handling it.",
                "I've got a guaranteed new revenue stream. You'll see!",
                "Consider yourselves un-fired.",
                "I've saved the league once again. I just keep impressing myself.",
                "The league is not shutting down after all. Play ball!",
                ]
            )
        }
}
