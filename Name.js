class Name {
  //static class variables
  static firstNameList = [
    "Aaliyah", "Aaron", "Abby", "Abigail", "Abraham", "Adam", "Addison", "Adrian", "Adriana", "Adrianna", "Aidan", "Aiden", "Alan", "Alana", "Alejandro", "Alex", "Alexa", "Alexander", "Alexandra", "Alexandria", "Alexia", "Alexis", "Alicia", "Allison", "Alondra", "Alyssa", "Amanda", "Amber", "Amelia", "Amy", "Ana", "Andrea", "Andres", "Andrew", "Angel", "Angela", "Angelica", "Angelina", "Anna", "Anthony", "Antonio", "Ariana", "Arianna", "Ashley", "Ashlyn", "Ashton", "Aubrey", "Audrey", "Austin", "Autumn", "Ava", "Avery", "Ayden", "Bailey", "Benjamin", "Bianca", "Blake", "Braden", "Bradley", "Brady", "Brandon", "Brayden", "Breanna", "Brendan", "Brian", "Briana", "Brianna", "Brittany", "Brody", "Brooke", "Brooklyn", "Bryan", "Bryce", "Bryson", "Caden", "Caitlin", "Caitlyn", "Caleb", "Cameron", "Camila", "Carlos", "Caroline", "Carson", "Carter", "Cassandra", "Cassidy", "Catherine", "Cesar", "Charles", "Charlotte", "Chase", "Chelsea", "Cheyenne", "Chloe", "Christian", "Christina", "Christopher", "Claire", "Cody", "Colby", "Cole", "Colin", "Collin", "Colton", "Conner", "Connor", "Cooper", "Courtney", "Cristian", "Crystal", "Daisy", "Dakota", "Dalton", "Damian", "Daniel", "Daniela", "Danielle", "David", "Delaney", "Derek", "Destiny", "Devin", "Devon", "Diana", "Diego", "Dominic", "Donovan", "Dylan", "Edgar", "Eduardo", "Edward", "Edwin", "Eli", "Elias", "Elijah", "Elizabeth", "Ella", "Ellie", "Emily", "Emma", "Emmanuel", "Eric", "Erica", "Erick", "Erik", "Erin", "Ethan", "Eva", "Evan", "Evelyn", "Faith", "Fernando", "Francisco", "Gabriel", "Gabriela", "Gabriella", "Gabrielle", "Gage", "Garrett", "Gavin", "Genesis", "George", "Gianna", "Giovanni", "Giselle", "Grace", "Gracie", "Grant", "Gregory", "Hailey", "Haley", "Hannah", "Hayden", "Hector", "Henry", "Hope", "Hunter", "Ian", "Isaac", "Isabel", "Isabella", "Isabelle", "Isaiah", "Ivan", "Jack", "Jackson", "Jacob", "Jacqueline", "Jada", "Jade", "Jaden", "Jake", "Jalen", "James", "Jared", "Jasmin", "Jasmine", "Jason", "Javier", "Jayden", "Jayla", "Jazmin", "Jeffrey", "Jenna", "Jennifer", "Jeremiah", "Jeremy", "Jesse", "Jessica", "Jesus", "Jillian", "Jocelyn", "Joel", "John", "Johnathan", "Jonah", "Jonathan", "Jordan", "Jordyn", "Jorge", "Jose", "Joseph", "Joshua", "Josiah", "Juan", "Julia", "Julian", "Juliana", "Justin", "Kaden", "Kaitlyn", "Kaleb", "Karen", "Karina", "Kate", "Katelyn", "Katherine", "Kathryn", "Katie", "Kayla", "Kaylee", "Kelly", "Kelsey", "Kendall", "Kennedy", "Kenneth", "Kevin", "Kiara", "Kimberly", "Kyle", "Kylee", "Kylie", "Landon", "Laura", "Lauren", "Layla", "Leah", "Leonardo", "Leslie", "Levi", "Liam", "Liliana", "Lillian", "Lilly", "Lily", "Lindsey", "Logan", "Lucas", "Lucy", "Luis", "Luke", "Lydia", "Mackenzie", "Madeline", "Madelyn", "Madison", "Makayla", "Makenzie", "Malachi", "Manuel", "Marco", "Marcus", "Margaret", "Maria", "Mariah", "Mario", "Marissa", "Mark", "Martin", "Mary", "Mason", "Matthew", "Max", "Maxwell", "Maya", "Mckenzie", "Megan", "Melanie", "Melissa", "Mia", "Micah", "Michael", "Michelle", "Miguel", "Mikayla", "Miranda", "Molly", "Morgan", "Mya", "Naomi", "Natalia", "Natalie", "Nathan", "Nathaniel", "Nevaeh", "Nicholas", "Nicolas", "Nicole", "Noah", "Nolan", "Oliver", "Olivia", "Omar", "Oscar", "Owen", "Paige", "Parker", "Patrick", "Paul", "Payton", "Peter", "Peyton", "Preston", "Rachel", "Raymond", "Reagan", "Rebecca", "Ricardo", "Richard", "Riley", "Robert", "Ruby", "Ryan", "Rylee", "Sabrina", "Sadie", "Samantha", "Samuel", "Sara", "Sarah", "Savannah", "Sean", "Sebastian", "Serenity", "Sergio", "Seth", "Shane", "Shawn", "Shelby", "Sierra", "Skylar", "Sofia", "Sophia", "Sophie", "Spencer", "Stephanie", "Stephen", "Steven", "Summer", "Sydney", "Tanner", "Taylor", "Thomas", "Tiffany", "Timothy", "Travis", "Trenton", "Trevor", "Trinity", "Tristan", "Tyler", "Valeria", "Valerie", "Vanessa", "Veronica", "Victor", "Victoria", "Vincent", "Wesley", "William", "Wyatt", "Xavier", "Zachary", "Zoe", "Zoey"
  ];
  static lastNameList = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett", "Gray", "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long", "Foster", "Sanders", "Ross", "Morales", "Powell", "Sullivan", "Russell", "Ortiz", "Jenkins", "Gutierrez", "Perry", "Butler", "Barnes", "Fisher", "Henderson", "Coleman", "Simmons", "Patterson", "Jordan", "Reynolds", "Hamilton", "Graham", "Kim", "Gonzales", "Alexander", "Ramos", "Wallace", "Griffin", "West", "Cole", "Hayes", "Chavez", "Gibson", "Bryant", "Ellis", "Stevens", "Murray", "Ford", "Marshall", "Owens", "Mcdonald", "Harrison", "Ruiz", "Kennedy", "Wells", "Alvarez", "Woods", "Mendoza", "Castillo", "Olson", "Webb", "Washington", "Tucker", "Freeman", "Burns", "Henry", "Vasquez", "Snyder", "Simpson", "Crawford", "Jimenez", "Porter", "Mason", "Shaw", "Gordon", "Wagner", "Hunter", "Romero", "Hicks", "Dixon", "Hunt", "Palmer", "Robertson", "Black", "Holmes", "Stone", "Meyer", "Boyd", "Mills", "Warren", "Fox", "Rose", "Rice", "Moreno", "Schmidt", "Patel", "Ferguson", "Nichols", "Herrera", "Medina", "Ryan", "Fernandez", "Weaver", "Daniels", "Stephens", "Gardner", "Payne", "Kelley", "Dunn", "Pierce", "Arnold", "Tran", "Spencer", "Peters", "Hawkins", "Grant", "Hansen", "Castro", "Hoffman", "Hart", "Elliott", "Cunningham", "Knight", "Bradley"
  ];
  static adjList = [
    "Aristotelian", "Arthurian", "Bohemian", "Brethren", "Mosaic", "Oceanic", "Proctor", "Terran", "Tudor", "abroad", "absorbing", "abstract", "academic", "accelerated", "accented", "accountant", "acquainted", "acute", "addicting", "addictive", "adjustable", "admired", "adult", "adverse", "advised", "aerosol", "afraid", "aggravated", "aggressive", "agreeable", "alienate", "aligned", "all-round", "alleged", "almond", "alright", "altruistic", "ambient", "ambivalent", "amiable", "amino", "amorphous", "amused", "anatomical", "ancestral", "angelic", "angrier", "answerable", "antiquarian", "antiretroviral", "appellate", "applicable", "apportioned", "approachable", "appropriated", "archer", "aroused", "arrested", "assertive", "assigned", "athletic", "atrocious", "attained", "authoritarian", "autobiographical", "avaricious", "avocado", "awake", "awsome", "backstage", "backwoods", "balding", "bandaged", "banded", "banned", "barreled", "battle", "beaten", "begotten", "beguiled", "bellied", "belted", "beneficent", "besieged", "betting", "big-money", "biggest", "biochemical", "bipolar", "blackened", "blame", "blessed", "blindfolded", "bloat", "blocked", "blooded", "blue-collar", "blushing", "boastful", "bolder", "bolstered", "bonnie", "bored", "boundary", "bounded", "bounding", "branched", "brawling", "brazen", "breeding", "bridged", "brimming", "brimstone", "broadest", "broiled", "broker", "bronze", "bruising", "buffy", "bullied", "bungling", "burial", "buttery", "candied", "canonical", "cantankerous", "cardinal", "carefree", "caretaker", "casual", "cathartic", "causal", "chapel", "characterized", "charcoal", "cheeky", "cherished", "chipotle", "chirping", "chivalrous", "circumstantial", "civic", "civil", "civilised", "clanking", "clapping", "claptrap", "classless", "cleansed", "cleric", "cloistered", "codified", "colloquial", "colour", "combat", "combined", "comely", "commissioned", "commonplace", "commuter", "commuting", "comparable", "complementary", "compromising", "conceding", "concentrated", "conceptual", "conditioned", "confederate", "confident", "confidential", "confining", "confuse", "congressional", "consequential", "conservative", "constituent", "contaminated", "contemporaneous", "contraceptive", "convertible", "convex", "cooked", "coronary", "corporatist", "correlated", "corroborated", "cosmic", "cover", "crash", "crypto", "culminate", "cushioned", "dandy", "dashing", "dazzled", "decreased", "decrepit", "dedicated", "defaced", "defective", "defenseless", "deluded", "deodorant", "departed", "depress", "designing", "despairing", "destitute", "detective", "determined", "devastating", "deviant", "devilish", "devoted", "diagonal", "dictated", "didactic", "differentiated", "diffused", "dirtier", "disabling", "disconnected", "discovered", "disdainful", "diseased", "disfigured", "disheartened", "disheveled", "disillusioned", "disparate", "dissident", "doable", "doctrinal", "doing", "dotted", "double-blind", "downbeat", "dozen", "draining", "draught", "dread", "dried", "dropped", "dulled", "duplicate", "eaten", "echoing", "economical", "elaborated", "elastic", "elective", "electoral", "elven", "embryo", "emerald", "emergency", "emissary", "emotional", "employed", "enamel", "encased", "encrusted", "endangered", "engraved", "engrossing", "enlarged", "enlisted", "enlivened", "ensconced", "entangled", "enthralling", "entire", "envious", "eradicated", "eroded", "esoteric", "essential", "evaporated", "ever-present", "evergreen", "everlasting", "exacting", "exasperated", "excess", "exciting", "executable", "existent", "exonerated", "exorbitant", "exponential", "export", "extraordinary", "exultant", "exulting", "facsimile", "fading", "fainter", "faith-based", "fallacious", "faltering", "famous", "fancier", "fast-growing", "fated", "favourable", "fearless", "feathered", "fellow", "fermented", "ferocious", "fiddling", "filling", "firmer", "fitted", "flammable", "flawed", "fledgling", "fleshy", "flexible", "flickering", "floral", "flowering", "flowing", "foggy", "folic", "foolhardy", "foolish", "footy", "forehand", "forked", "formative", "formulaic", "foul-mouthed", "fractional", "fragrant", "fraudulent", "freakish", "freckled", "freelance", "freight", "fresh", "fretted", "frugal", "fulfilling", "fuming", "funded", "funny", "garbled", "gathered", "geologic", "geometric", "gibberish", "gilded", "ginger", "glare", "glaring", "gleaming", "glorified", "glorious", "goalless", "gold-plated", "goody", "grammatical", "grande", "grateful", "gratuitous", "graven", "greener", "grinding", "grizzly", "groaning", "grudging", "guaranteed", "gusty", "half-breed", "hand-held", "handheld", "hands-off", "hard-pressed", "harlot", "healing", "healthier", "healthiest", "heart", "heart-shaped", "heathen", "hedonistic", "heralded", "herbal", "high-density", "high-performance", "high-res", "high-yield", "hissy", "hitless", "holiness", "homesick", "honorable", "hooded", "hopeless", "horrendous", "horrible", "hot-button", "huddled", "human", "humbling", "humid", "humiliating", "hypnotized", "idealistic", "idiosyncratic", "ignited", "illustrated", "illustrative", "imitated", "immense", "immersive", "immigrant", "immoral", "impassive", "impressionable", "improbable", "impulsive", "in-between", "in-flight", "inattentive", "inbound", "inbounds", "incalculable", "incomprehensible", "indefatigable", "indigo", "indiscriminate", "indomitable", "inert", "inflate", "inform", "inheriting", "injured", "injurious", "inking", "inoffensive", "insane", "insensible", "insidious", "insincere", "insistent", "insolent", "insufferable", "intemperate", "interdependent", "interesting", "interfering", "intern", "interpreted", "intersecting", "intolerable", "intolerant", "intuitive", "irresolute", "irritate", "jealous", "jerking", "joining", "joint", "journalistic", "joyful", "keyed", "knowing", "lacklustre", "laden", "lagging", "lamented", "laughable", "layered", "leather", "leathern", "leery", "left-footed", "legible", "leisure", "lessening", "liberating", "life-size", "lifted", "lightest", "limitless", "listening", "literary", "liver", "livid", "lobster", "locked", "long-held", "long-lasting", "long-running", "long-suffering", "loudest", "loveliest", "low-budget", "low-carb", "lowering", "lucid", "luckless", "lusty", "luxurious", "magazine", "maniac", "manmade", "maroon", "mastered", "mated", "material", "materialistic", "meaningful", "measuring", "mediaeval", "medical", "meditated", "medley", "melodic", "memorable", "memorial", "metabolic", "metallic", "metallurgical", "metering", "midair", "midterm", "midway", "mighty", "migrating", "mind-blowing", "mind-boggling", "minor", "mirrored", "misguided", "misshapen", "mitigated", "mixed", "modernized", "molecular", "monarch", "monastic", "morbid", "motley", "motorized", "mounted", "multi-million", "multidisciplinary", "muscled", "muscular", "muted", "mysterious", "mythic", "nail-biting", "natural", "nauseous", "negative", "networked", "neurological", "neutered", "newest", "night", "nitrous", "no-fly", "noncommercial", "nonsense", "north", "nuanced", "occurring", "offensive", "oldest", "oncoming", "one-eyed", "one-year", "onstage", "onward", "opaque", "open-ended", "operating", "opportunist", "opposing", "opt-in", "ordinate", "outdone", "outlaw", "outsized", "overboard", "overheated", "oversize", "overworked", "oyster", "paced", "panting", "paralyzed", "paramount", "parental", "parted", "partisan", "passive", "pastel", "patriot", "peacekeeping", "pedestrian", "peevish", "penal", "penned", "pensive", "perceptual", "perky", "permissible", "pernicious", "perpetuate", "perplexed", "pervasive", "petrochemical", "philosophical", "picturesque", "pillaged", "piped", "piquant", "pitching", "plausible", "pliable", "plumb", "politician", "polygamous", "poorest", "portmanteau", "posed", "positive", "possible", "postpartum", "prank", "pre-emptive", "precocious", "predicted", "premium", "preparatory", "prerequisite", "prescient", "preserved", "presidential", "pressed", "pressurized", "presumed", "prewar", "priced", "pricier", "primal", "primer", "primetime", "printed", "private", "problem", "procedural", "process", "prodigious", "professional", "programmed", "progressive", "prolific", "promising", "promulgated", "pronged", "proportionate", "protracted", "pulled", "pulsed", "purgatory", "quick", "rapid-fire", "raunchy", "razed", "reactive", "readable", "realizing", "recognised", "recovering", "recurrent", "recycled", "redeemable", "reflecting", "regal", "registering", "reliable", "reminiscent", "remorseless", "removable", "renewable", "repeating", "repellent", "reserve", "resigned", "respectful", "rested", "restrict", "resultant", "retaliatory", "retiring", "revelatory", "reverend", "reversing", "revolving", "ridiculous", "right-hand", "ringed", "risque", "robust", "roomful", "rotating", "roused", "rubber", "run-down", "running", "runtime", "rustling", "safest", "salient", "sanctioned", "saute", "saved", "scandalized", "scarlet", "scattering", "sceptical", "scheming", "scoundrel", "scratched", "scratchy", "scrolled", "seated", "second-best", "segregated", "self-taught", "semiautomatic", "senior", "sensed", "sentient", "sexier", "shadowy", "shaken", "shaker", "shameless", "shaped", "shiny", "shipped", "shivering", "shoestring", "short", "short-lived", "signed", "simplest", "simplistic", "sizable", "skeleton", "skinny", "skirting", "skyrocketed", "slamming", "slanting", "slapstick", "sleek", "sleepless", "sleepy", "slender", "slimmer", "smacking", "smokeless", "smothered", "smouldering", "snuff", "socialized", "solid-state", "sometime", "sought", "spanking", "sparing", "spattered", "specialized", "specific", "speedy", "spherical", "spiky", "spineless", "sprung", "squint", "stainless", "standing", "starlight", "startled", "stately", "statewide", "stereoscopic", "sticky", "stimulant", "stinky", "stoked", "stolen", "storied", "strained", "strapping", "strengthened", "stubborn", "stylized", "suave", "subjective", "subjugated", "subordinate", "succeeding", "suffering", "summary", "sunset", "sunshine", "supernatural", "supervisory", "supply-side", "surrogate", "suspended", "suspenseful", "swarthy", "sweating", "sweeping", "swinging", "swooning", "sympathize", "synchronized", "synonymous", "synthetic", "tailed", "tallest", "tangible", "tanked", "tarry", "technical", "tectonic", "telepathic", "tenderest", "territorial", "testimonial", "theistic", "thicker", "threatening", "tight-lipped", "timed", "timely", "timid", "torrent", "totalled", "tougher", "traditional", "transformed", "trapped", "traveled", "traverse", "treated", "trial", "trunk", "trusting", "trying", "twisted", "two-lane", "tyrannical", "unaided", "unassisted", "unassuming", "unattractive", "uncapped", "uncomfortable", "uncontrolled", "uncooked", "uncooperative", "underground", "undersea", "undisturbed", "unearthly", "uneasy", "unequal", "unfazed", "unfinished", "unforeseen", "unforgivable", "unidentified", "unimaginative", "uninspired", "unintended", "uninvited", "universal", "unmasked", "unorthodox", "unparalleled", "unpleasant", "unprincipled", "unread", "unreasonable", "unregulated", "unreliable", "unremitting", "unsafe", "unsanitary", "unsealed", "unsuccessful", "unsupervised", "untimely", "unwary", "unwrapped", "uppity", "upstart", "useless", "utter", "valiant", "valid", "valued", "vanilla", "vaulting", "vaunted", "veering", "vegetative", "vented", "verbal", "verifying", "veritable", "versed", "vinyl", "virgin", "visceral", "visual", "voluptuous", "walk-on", "wanton", "warlike", "washed", "waterproof", "waved", "weakest", "well-bred", "well-chosen", "well-informed", "wetting", "wheeled", "whirlwind", "widen", "widening", "willful", "willing", "winnable", "winningest", "wireless", "wistful", "woeful", "wooded", "woodland", "wordless", "workable", "worldly", "worldwide", "worst-case", "worsted", "worthless"
  ];
  adjList = [].concat(adjList, [
    "able", "abnormal", "absent-minded", "above average", "adventurous", "affectionate", "agile", "agreeable", "alert", "amazing", "ambitious", "amiable", "amusing", "analytical", "angelic", "apathetic", "apprehensive", "ardent", "artificial", "artistic", "assertive", "attentive", "average", "awesome", "awful", "balanced", "beautiful", "below average", "beneficent", "blue", "blunt", "boisterous", "brave", "bright", "brilliant", "buff", "callous", "candid", "cantankerous", "capable", "careful", "careless", "caustic", "cautious", "charming", "childish", "childlike", "cheerful", "chic", "churlish", "circumspect", "civil", "clean", "clever", "clumsy", "coherent", "cold", "competent", "composed", "conceited", "condescending", "confident", "confused", "conscientious", "considerate", "content", "cool", "cool-headed", "cooperative", "cordial", "courageous", "cowardly", "crabby", "crafty", "cranky", "crass", "critical", "cruel", "curious", "cynical", "dainty", "decisive", "deep", "deferential", "deft", "delicate", "demonic", "dependent", "delightful", "demure", "depressed", "devoted", "dextrous", "diligent", "direct", "dirty", "disagreeable", "discerning", "discreet", "disruptive", "distant", "distraught", "distrustful", "dowdy", "dramatic", "dreary", "drowsy", "drugged", "drunk", "dull", "dutiful", "eager", "earnest", "easy-going", "efficient", "egotistical", "elfin", "emotional", "energetic", "enterprising", "enthusiastic", "evasive", "even-tempered", "exacting", "excellent", "excitable", "experienced", "fabulous", "fastidious", "ferocious", "fervent", "fiery", "flabby", "flaky", "flashy", "frank", "friendly", "funny", "fussy", "generous", "gentle", "gloomy", "glutinous", "good", "grave", "great", "groggy", "grouchy", "guarded", "hateful", "hearty", "helpful", "hesitant", "hot-headed", "hypercritical", "hysterical", "idiotic", "idle", "illogical", "imaginative", "immature", "immodest", "impatient", "imperturbable", "impetuous", "impractical", "impressionable", "impressive", "impulsive", "inactive", "incisive", "incompetent", "inconsiderate", "inconsistent", "independent", "indiscreet", "indolent", "indefatigable", "industrious", "inexperienced", "insensitive", "inspiring", "intelligent", "interesting", "intolerant", "inventive", "irascible", "irritable", "irritating", "jocular", "jovial", "joyous", "judgmental", "keen", "kind", "lame", "lazy", "lean", "leery", "lethargic", "level-headed", "listless", "lithe", "lively", "local", "logical", "long-winded", "lovable", "love-lorn", "lovely", "maternal", "mature", "mean", "meddlesome", "mercurial", "methodical", "meticulous", "mild", "miserable", "modest", "moronic", "morose", "motivated", "musical", "naive", "nasty", "natural", "naughty", "negative", "nervous", "noisy", "normal", "nosy", "numb", "obliging", "obnoxious", "old-fashioned", "one-sided", "orderly", "ostentatious", "outgoing", "outspoken", "passionate", "passive", "paternal", "paternalistic", "patient", "peaceful", "peevish", "pensive", "persevering", "persnickety", "petulant", "picky", "plain", "plain-speaking", "playful", "pleasant", "plucky", "polite", "popular", "positive", "powerful", "practical", "prejudiced", "pretty", "proficient", "proud", "provocative", "prudent", "punctual", "quarrelsome", "querulous", "quick", "quick-tempered", "quiet", "realistic", "reassuring", "reclusive", "reliable", "reluctant", "resentful", "reserved", "resigned", "resourceful", "respected", "respectful", "responsible", "restless", "revered", "ridiculous", "sad", "sassy", "saucy", "sedate", "self-assured", "selfish", "sensible", "sensitive", "sentimental", "serene", "serious", "sharp", "short-tempered", "shrewd", "shy", "silly", "sincere", "sleepy", "slight", "sloppy", "slothful", "slovenly", "slow", "smart", "snazzy", "sneering", "snobby", "somber", "sober", "sophisticated", "soulful", "soulless", "sour", "spirited", "spiteful", "stable", "staid", "steady", "stern", "stoic", "striking", "strong", "stupid", "sturdy", "subtle", "sullen", "sulky", "supercilious", "superficial", "surly", "suspicious", "sweet", "tactful", "tactless", "talented", "testy", "thinking", "thoughtful", "thoughtless", "timid", "tired", "tolerant", "touchy", "tranquil", "ugly", "unaffected", "unbalanced", "uncertain", "uncooperative", "undependable", "unemotional", "unfriendly", "unguarded", "unhelpful", "unimaginative", "unmotivated", "unpleasant", "unpopular", "unreliable", "unsophisticated", "unstable", "unsure", "unthinking", "unwilling", "venal", "versatile", "vigilant", "warm", "warmhearted", "wary", "watchful", "weak", "well-behaved", "well-developed", "well-intentioned", "well-respected", "well-rounded", "willing", "wonderful", "volcanic", "vulnerable", "zealous"
  ]);
  adjList = [].concat(adjList, [
    "aah", "ack", "agreed", "ah", "aha", "ahem", "alas", "all right", "amen", "argh", "as if", "aw", "ay", "aye", "bah", "blast", "boo hoo", "bother", "boy", "brr", "by golly", "bye", "cheerio", "cheers", "chin up", "come on", "crikey", "curses", "dear me", "doggone", "drat", "duh", "easy does it", "eek", "egads", "er", "exactly", "fair enough", "fiddle-dee-dee", "fiddlesticks", "fie", "foo", "fooey", "gadzooks", "gah", "gangway", "g'day", "gee", "gee whiz", "geez", "gesundheit", "get lost", "get outta here", "go on", "good", "good golly", "good job", "gosh", "gracious", "great", "grr", "gulp", "ha", "ha-ha", "hah", "hallelujah", "harrumph", "haw", "hee", "here", "hey", "hmm", "ho hum", "hoo", "hooray", "hot dog", "how", "huh", "hum", "humbug", "hurray", "huzza", "I say", "ick", "is it", "ixnay", "jeez", "just kidding", "just a sec", "just wondering", "kapish", "la", "la-di-dah", "lo", "look", "look here", "long time", "lordy", "man", "meh", "mmm", "most certainly", "my", "my my", "my word", "nah", "naw", "never", "no", "no can do", "nooo", "not", "no thanks", "no way", "nuts", "oh", "oho", "oh-oh", "oh no", "okay", "okey-dokey", "om", "oof", "ooh", "oopsey", "over", "oy", "oyez", "peace", "pff", "pew", "phew", "pish posh", "psst", "ptui", "quite", "rah", "rats", "ready", "right", "right on", "roger", "roger that", "rumble", "say", "see ya", "shame", "shh", "shoo", "shucks", "sigh", "sleep tight", "snap", "sorry", "sssh", "sup", "ta", "ta-da", "ta ta", "take that", "tally ho", "tch", "thanks", "there", "there there", "time out", "toodles", "touche", "tsk", "tsk-tsk", "tut", "tut-tut", "ugh", "uh", "uh-oh", "um", "ur", "urgh", "very nice", "very well", "voila", "vroom", "wah", "well", "well done", "well, well", "what", "whatever", "whee", "when", "whoa", "whoo", "whoopee", "whoops", "whoopsey", "whew", "why", "word", "wow", "wuzzup", "ya", "yea", "yeah", "yech", "yikes", "yippee", "yo", "yoo-hoo", "you bet", "you don't say", "you know", "yow", "yum", "yummy", "zap", "zounds", "zowie", "zzz"
  ]);
  adjList = [].concat(adjList, [
    "Quick", "Big", "Mean", "The", "Bad", "Cool", "Mad", "Night", "Lil", "Sweet", "Dirty", "Clean", "Iron", "Flash", "Flying", "Hawk", "Spider", "Goose", "Tiger", "Cat", "Crime", "Candy", "Sugar", "Bat", "Ball", "Left", "Right", "Small", "Biggie", "Wiggly", "Wormy", "Squirmy", "Milk", "Little", "Shark", "Wolf", "Dog", "Spooky", "Slimy", "Doctor", "Professor", "Judge", "Sparkle", "Baby", "Special", "Normal", "Nice", "Mega", "Kilo", "Hard", "President", "Honest", "Doc", "Skinny", "Mayor", "Colonel", "Captain", "Wreck-it", "Pintsize", "Master", "Lord", "Detective", "Major", "Admiral", "Ambassador", "Chief", "Commodore", "Lieutenant", "Senator", "Cousin", "Half", "Sheriff", "Deputy", "Pudding", "Rattle", "Butter", "Jail", "Chunky", "Glass", "Milkshake", "Grumpy", "Rubber", "Rusty", "Broken", "Plush", "Sunny", "Pro", "Super", "Incomplete", "Silver", "timeless", "classic", "dreamy", "creamy", "strong", "mesmerizing", "handsome", "charming", "attractive", "hypnotic", "enthralling", "magnetic", "stunning", "gorgeous", "devastating", "striking", "famous", "first-class", "regal", "sublime", "heavenly", "athletic", "dapper", "stylish", "suave", "virile", "fake", "crazy", "cool", "creepy", "weird", "idiosyncratic", "quirky", "golden", "eccentric", "odd", "strange", "distinctive", "singular", "perfect", "superior", "unique", "special", "distinguished", "abnormal", "foreign", "irregular", "unusual", "amazing", "bizarre", "incredible", "phenomenal", "awe-inspiring", "prominent", "prodigious", "unparalleled", "friendly", "magic", "magical", "refined", "reptilian", "Titanic", "Double", "Triple", "Birthday", "Bounce", "Brave", "Bump", "Busy", "Chatterbox", "Cheerful", "Christmas", "Clever", "Clumsy", "Cool", "Daydream", "Dizzy", "Forgetful", "Funny", "Fussy", "Good", "Greedy", "Grumble", "Grumpy", "Happy", "Impossible", "Jelly", "Lazy", "Mean", "Messy", "Mischief", "Muddle", "Nobody", "Noisy", "Nonsense", "Nosey", "Perfect", "Quiet", "Rude", "Rush", "Silly", "Skinny", "Slow", "Small", "Sneeze", "Snow", "Strong", "Tall", "Tickle", "Topsy-Turvy", "Worry", "Wrong", "Bad", "Birthday", "Bossy", "Brainy", "Busy", "Chatterbox", "Christmas", "Contrary", "Curious", "Dotty", "Fickle", "Fun", "Giggles", "Greedy", "Helpful", "Hug", "Late", "Lucky", "Magic", "Naughty", "Neat", "Princess", "Quick", "Scary", "Scatterbrain", "Shy", "Somersault", "Splendid", "Star", "Stubborn", "Sunshine", "Tidy", "Tiny", "Trouble", "Twins", "Whoops", "Wise", "abnormal", "accursed", "amorphous", "antediluvian", "antique", "antiquarian", "blasphemy", "blasphemous", "cat", "charnel", "comprehension", "cyclopean", "dank", "decadent", "daemoniac", "effulgence", "eldritch", "fainted", "fainting", "foetid", "fungus", "fungoid", "fungous", "furtive", "gambrel", "gibbous", "gibbered", "gibbering", "hideous", "immemorial", "indescribable", "iridescence", "loathing", "loathsome", "lurk", "madness", "manuscript", "mortal", "nameless", "noisome", "non-euclidean", "proportion", "disproportionate", "shunned", "singularly", "spectral", "squamous", "stench", "stygian", "swarthy", "tenebrous", "tentacle", "ululating", "unmentionable", "unnamable", "unutterable", "achieved", "adapted", "addressed", "administered", "advised", "analyzed", "arranged", "assembled", "assessed", "assisted", "attained", "audited", "budgeted", "calculated", "classified", "coached", "collected", "communicated", "compiled", "composed", "computed", "conducted", "consolidated", "constructed", "consulted", "coordinated", "counseled", "created", "critiqued", "defined", "designed", "detected", "determined", "devised", "diagnosed", "directed", "discovered", "displayed", "earned", "edited", "eliminated", "enforced", "established", "estimated", "evaluated", "examined", "expanded", "explained", "experimented", "financed", "formulated", "gathered", "generated", "grossed", "guided", "handled", "hypothesized", "identified", "illustrated", "implemented", "improved", "increased", "influenced", "initiated", "inspected", "installed", "instituted", "instructed", "interpreted", "interviewed", "invented", "investigated", "lectured", "managed", "marketed", "mediated", "modeled", "monitored", "motivated", "negotiated", "obtained", "operated", "ordered", "organized", "oversaw", "performed", "persuaded", "photographed", "planned", "prepared", "presented", "printed", "processed", "produced", "projected", "promoted", "proofread", "provided", "publicized", "purchased", "received", "recommended", "reconciled", "recorded", "recruited", "reduced", "referred", "refined", "rehabilitated", "repaired", "reported", "represented", "researched", "resolved", "responded", "restored", "retrieved", "reviewed", "scheduled", "selected", "solved", "sorted", "studied", "summarized", "supervised", "supplied", "surveyed", "tested", "trained", "transcribed", "translated", "traveled", "tutored", "upgraded", "utilized", "wrote"
  ]);
  static nickNameList = [
    "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu",
    "a", "abbey", "abby", "abigail", "absurdity", "ace", "achilles", "addie", "aggravator", "agnes", "aj", "ajax", "albert", "alex", "alexander", "alf", "alfie", "alice", "allie", "ally", "alvin", "amazon", "amber", "amelia", "amy", "andy", "angel", "angie", "angus", "anheuser", "ankle", "anna", "annabelle", "annie", "apollo", "apple", "apple", "applesauce", "april", "archer", "archie", "ari", "ariel", "arlo", "arm", "arthur", "artie", "arya", "ash", "ashley", "astro", "athena", "atlas", "atticus", "audrey", "augie", "august", "augustus", "aurora", "austin", "autumn", "ava", "avenger", "avery", "axel", "babble", "baby", "baby", "baci", "back", "bacon", "bagel", "bags", "bailey", "balderdash", "baloney", "bam", "bambi", "bandit", "bane", "banjo", "barbie", "barkley", "barley", "barney", "baron", "basil", "batman", "baxter", "beak", "bean", "bear", "bear", "beau", "beauty", "bebe", "becky", "beef", "belch", "bella", "belle", "ben", "bender", "benjamin", "benji", "benny", "benson", "bentley", "bernie", "bessie", "bessie", "betsy", "betty", "bianca", "bibi", "big", "biggie", "bijou", "billie", "billy", "bingo", "bird", "birdie", "biscuit", "bishop", "bite", "bites", "black", "blackie", "blacky", "blake", "blanca", "blather", "blaze", "blitz", "blondie", "blu", "blue", "bo", "bob", "bobby", "bobo", "bodhi", "bodie", "bone", "bones", "bonnie", "boo", "boom", "boomer", "boots", "boots", "boris", "bosco", "bottle", "bowie", "box", "boy", "bradley", "brady", "brain", "braincase", "brainpan", "brandi", "brando", "brandy", "bread", "brewster", "brodie", "brody", "bronx", "brooke", "brooklyn", "brownie", "browny", "bruce", "bruiser", "brundon", "bruno", "brutus", "bub", "bubba", "bubblegum", "bubbles", "bubs", "buck", "buckley", "bucky", "buddha", "buddy", "buffoonery", "buffy", "bug", "bugsy", "bull", "bullet", "bully", "bunny", "business", "buster", "butch", "butter", "butterbuns", "buttercup", "butters", "button", "button", "buttons", "buzz", "buzz", "caesar", "cake", "cakes", "cali", "callie", "calvin", "can", "candy", "candycane", "capone", "captain", "cara", "caramel", "card", "carly", "carrying-on", "carter", "casey", "cash", "cashew", "casper", "cassidy", "cassie", "cat", "centaur", "cesar", "chai", "champ", "chance", "chanel", "charles", "charley", "charlie", "charlotte", "charly", "chase", "cheech", "cheeks", "chelsea", "cherry", "chester", "chewbacca", "chewbacca", "chewie", "chewy", "chi", "chica", "chicanery", "chichi", "chico", "chief", "child", "chin", "china", "chip", "chiqui", "chiquita", "chloe", "choco", "chocolate", "chop", "chopper", "choppers", "christmas", "chubs", "chuck", "chucky", "chulo", "chum", "cici", "cindy", "cinnamon", "cj", "clancy", "claptrap", "clara", "clarice", "clementine", "cleo", "cleopatra", "clover", "clyde", "coby", "coco", "cocoa", "coconut", "cody", "coffee", "colby", "cole", "coleslaw", "comet", "cookie", "cookie", "cookie", "cooper", "copper", "cora", "corky", "cosmo", "cotton", "cottonball", "creeper", "cricket", "crock", "cruella", "crunch", "crystal", "cuddler", "cuddles", "cup", "cupcake", "cutie", "cyrus", "dagger", "daisy", "dakota", "dallas", "danny", "dante", "daphne", "darby", "darcy", "darla", "darwin", "dash", "dee", "delilah", "demon", "derp", "desi", "destiny", "devilry", "dexter", "diamond", "diddly", "diego", "diesel", "dino", "dior", "dip", "dirt", "diva", "dixie", "dj", "django", "django", "dobby", "doc", "dog", "dolce", "dolly", "dome", "domino", "donuts", "dora", "dory", "dory", "dottie", "dough", "dove", "doyle", "dragon", "dread", "dribble", "drill", "drive", "drivel", "duchess", "duck", "dudley", "duffy", "duke", "dulce", "duncan", "dunkin", "dusty", "dutch", "dutchess", "dylan", "ears", "ebony", "echo", "eddie", "edie", "egg", "einstein", "eleanor", "eli", "ella", "ellie", "eloise", "elsa", "elvis", "emily", "emma", "emmie", "emmy", "endzone", "enzo", "ernie", "eva", "evie", "eye", "eyes", "face", "faith", "feet", "felix", "fendi", "ferguson", "fifi", "fifi", "filth", "fingers", "finley", "finn", "finnegan", "fiona", "fish", "fist", "flanders", "flash", "flimflam", "flora", "floyd", "fluffy", "foolishness", "foot", "fork", "fox", "fox", "foxy", "frances", "frank", "frankfurter", "frankie", "franklin", "freckles", "fred", "freddie", "freddy", "freya", "frida", "friday", "fritz", "frodo", "frogger", "fun", "gabby", "garbage", "garfunkel", "gatsby", "gemma", "george", "georgia", "georgie", "ghost", "gia", "giant", "gibberish", "gidget", "gigi", "gina", "ginger", "gino", "gio", "gizmo", "glass", "gobbledygook", "goldie", "goldilocks", "gooch", "goonie", "goose", "goose", "gordo", "gotti", "grace", "gracie", "grayson", "greta", "griffin", "grizzly", "gucci", "guinness", "gump", "gunner", "gunther", "gus", "gypsy", "hachi", "hailey", "hair", "haley", "halo", "hamilton", "hammer", "hana", "hand", "hands", "hank", "hanky-panky", "hannah", "happy", "harlem", "harley", "harlow", "harper", "harry", "harvey", "hazel", "head", "heart", "heidi", "hendrix", "hennessy", "henry", "herbie", "hercules", "hero", "hershey", "highjinks", "hiro", "hobbes", "hogwash", "hokey-pokey", "holly", "homer", "homer", "honey", "honeycomb", "honker", "hooey", "hope", "hornswoggle", "horseapples", "horsefeathers", "horseplay", "horsepuckey", "house", "huddles", "hudson", "hugger", "huggies", "hugginkiss", "hugo", "hulk", "humphrey", "hunter", "hunter", "ice", "ick", "iggy", "ike", "impropriety", "india", "indiana", "indie", "indy", "iris", "isabella", "isabelle", "isis", "ivy", "izzy", "jabber", "jack", "jackie", "jackson", "jacob", "jada", "jade", "jake", "james", "jameson", "jamie", "jammies", "jane", "jasmine", "jasper", "java", "jax", "jaxx", "jay", "jazz", "jazzy", "jeans", "jelly", "jenny", "jerry", "jersey", "jesse", "jessie", "jet", "jeter", "jezebel", "jiggery-pokery", "jimmy", "jinx", "jj", "joe", "joey", "johnny", "jojo", "jordan", "josie", "joy", "julie", "juliet", "julius", "june", "junior", "junior", "juniper", "junk", "juno", "kai", "kaiser", "kali", "kane", "katie", "kato", "kaya", "kayla", "keiko", "kelly", "kenny", "khloe", "kid", "kiki", "kilo", "king", "king", "kingston", "kira", "kirby", "kitty", "kiwi", "knife", "knight", "knope", "kobe", "kobi", "koda", "kodi", "kody", "koko", "kona", "kuma", "kylie", "lacey", "lacy", "lady", "laika", "laila", "lala", "lala", "lana", "layla", "leg", "legs", "leia", "leila", "lenny", "leo", "leonardo", "leonidas", "leroy", "less", "levi", "lexi", "lexie", "lexington", "lexy", "liam", "libby", "lighter", "lil", "lila", "lilah", "lili", "lilly", "lilo", "lily", "lincoln", "linda", "linus", "lips", "little", "lizzie", "lizzy", "loaf", "lobo", "logan", "loki", "lola", "lolita", "london", "lou", "louie", "louis", "louise", "lovegood", "luca", "lucas", "lucille", "lucky", "lucy", "luigi", "luka", "luke", "lula", "lulu", "luna", "lunacy", "lupe", "lyla", "mabel", "mac", "mac", "macaroni", "macho", "mack", "macy", "maddie", "maddy", "madison", "maggie", "magic", "magnet", "maisie", "maisy", "major", "maker", "malarkey", "mama", "mandy", "mango", "manny", "map", "maple", "marcel", "marco", "marcus", "marge", "mario", "marley", "marshall", "marshmallow", "martin", "marty", "marvin", "mary", "mason", "matilda", "maui", "maverick", "max", "maxi", "maxie", "maximus", "maxine", "maxwell", "maxx", "maya", "mcflip", "mcgee", "meatball", "meeko", "melo", "melody", "memphis", "merlin", "mia", "mickey", "midnight", "mika", "mike", "mikey", "mila", "miles", "miley", "millie", "milly", "milo", "mimi", "mindy", "mini", "minnie", "mirror", "misha", "mishka", "mishmash", "miso", "miss", "missy", "mister", "misty", "mittens", "mitts", "mo", "moby", "mocha", "mochi", "moe", "mojo", "mollie", "molly", "momo", "mona", "money", "monkey", "monkey business", "monkeyshine", "monte", "monty", "mookie", "moose", "mop", "morgan", "moses", "moves", "moxie", "mr", "mr.", "muck", "muffin", "muffin", "muffin", "muffins", "mug", "mugsy", "mumbo-jumbo", "munchkin", "muneca", "murphy", "murray", "mustache", "mya", "mylo", "nacho", "nala", "name", "nana", "napoleon", "nash", "natasha", "nathan", "neck", "nellie", "nelly", "nemo", "nena", "nene", "neo", "nick", "nicky", "nico", "nigel", "nikita", "nikki", "nikko", "niko", "nina", "nino", "noah", "noel", "noggin", "nola", "noodle", "noodle", "noodles", "nora", "norman", "not", "nova", "nugget", "nut", "nyla", "oakley", "obi", "odie", "odin", "olive", "oliver", "olivia", "ollie", "onyx", "ophelia", "opie", "oreo", "orion", "oscar", "oskar", "oso", "otis", "otto", "owen", "ozzie", "ozzy", "pablo", "pablo", "paco", "painter", "paisley", "pancho", "panda", "pants", "papi", "paris", "parker", "patches", "paulie", "paw", "paws", "peaches", "peanut", "pearl", "pebbles", "peeper", "peepers", "peggy", "peluche", "penelope", "penny", "pepe", "pepper", "pepsi", "percy", "perla", "pete", "peter", "petey", "petunia", "phoebe", "phoenix", "picker", "pickle", "pickles", "pie", "pierre", "piffle", "piggy", "pinky", "pip", "piper", "pippa", "pippin", "pixie", "pj", "pluto", "polly", "polo", "pony", "poochie", "pookie", "popcorn", "popeye", "poppy", "poppycock", "poppycock", "pork", "porter", "prattle", "precious", "presley", "preston", "prince", "princess", "puck", "puffy", "pumpkin", "punts", "puppy", "quaker", "queen", "queenie", "quincy", "quinn", "racer", "raider", "ralph", "ralphie", "rambo", "ranger", "ranger", "rapunzel", "rascal", "raspberry", "rat", "raven", "red", "reese", "reeses", "refuse", "reggie", "reilly", "remi", "remington", "remy", "rex", "ricky", "rico", "rider", "riffraff", "rigmarole", "riley", "ringo", "rio", "ripley", "rita", "river", "robber", "robin", "rocco", "rock", "rocket", "rocko", "rocky", "roger", "romeo", "roo", "rooster", "rory", "rosco", "roscoe", "rose", "rosie", "roxanne", "roxie", "roxy", "roy", "rubbish", "rubble", "ruby", "rudy", "rufio", "rufus", "rug", "rugby", "rummy", "runner", "rupert", "russell", "rusty", "ryder", "sable", "sabrina", "sadie", "sage", "sailor", "sailor", "sally", "sam", "samantha", "sammi", "sammie", "sammy", "sampson", "samson", "sandy", "sara", "sarah", "sarge", "sasha", "sassafras", "sassy", "savannah", "sawyer", "scarlet", "scarlett", "schnozz", "scooby", "scooter", "scotty", "scout", "scrappy", "scrubs", "scruffy", "seamus", "sebastian", "shadow", "shaggy", "shakira", "shane", "shayna", "shea", "sheba", "sheila", "shelby", "shell", "shenanigans", "sherlock", "sherman", "shiloh", "shiro", "shoes", "shorty", "sidney", "sienna", "silliness", "simba", "simon", "sir", "skipper", "skippy", "skittles", "skull", "sky", "skye", "skylar", "skyler", "slacker", "smarts", "smokey", "snickerdoodle", "snickers", "snickers", "snoop", "snoopy", "snoopy", "snow", "snowball", "snowflake", "snowy", "snuggler", "snuggles", "socks", "sofia", "sofie", "sonny", "sookie", "sophia", "sophie", "spanky", "sparkle", "sparky", "spartacus", "spencer", "spike", "spongebob", "spoon", "spot", "spring", "spud", "stanley", "star", "starbux", "stella", "stevie", "stewie", "stick", "stinko", "stitch", "storm", "strumpet", "style", "sugar", "suki", "summer", "sunny", "sunshine", "sushi", "susie", "suzie", "suzy", "swan", "sweet", "sweetie", "sydney", "tackles", "taco", "taco", "taffy", "tail", "tallulah", "tammy", "tango", "tank", "tank", "tara", "tart", "tasha", "taylor", "taz", "teddy", "teeth", "terry", "tess", "tessa", "theo", "theodore", "thief", "thomas", "thor", "thunder", "ticker", "tickler", "tiffany", "tiger", "tigger", "tiki", "time", "timmy", "tina", "tinkerbell", "tino", "tiny", "titan", "tito", "tj", "tobey", "tobi", "toby", "toe", "toes", "tomfoolery", "tommy", "tony", "toodles", "toots", "tootsie", "toto", "trap", "trapper", "trash", "travis", "trevor", "tripe", "trixie", "trooper", "trouble", "troy", "truffle", "truman", "tucker", "twaddle", "twin", "twinkie", "twinkie", "ty", "tyler", "tyson", "uselessness", "vader", "valentina", "valentino", "vanilla", "venus", "victoria", "vinny", "violet", "vito", "waffles", "waffles", "wallace", "wally", "walter", "watson", "wednesday", "wendy", "whiskey", "wilbur", "wiley", "willie", "willow", "willy", "wilson", "winnie", "winston", "winter", "wire", "wizzer", "wolfgang", "wolfie", "wonka", "woody", "wrecked", "wrench", "wrigley", "wyatt", "xena", "xiao", "yankee", "yoda", "yogi", "yoshi", "yoyo", "yuki", "zachary", "zack", "zara", "zeke", "zelda", "zena", "zero", "zeus", "ziggy", "zoe", "zoey", "zombie", "zooey", "zorro"
  ];
  static placeList = [
    "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY", "DC", "ATL", "BAL", "BOS", "BUF", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "HOU", "IND", "LV", "MIA", "MIL", "MIN", "NO", "OAK", "ORL", "PHI", "PHX", "PIT", "STL", "SD", "SF", "SJ", "SEA", "TOR", "VAN"
  ];
  static teamNameList = [
    "Alligators", "Amphibians", "Ants", "Apes", "Auks", "Baboons", "Badgers", "Barracudas", "Bass", "Bats", "Bears", "Beavers", "Bees", "Beetles", "Birds", "Bitterns", "Blackbirds", "Bloodhounds", "Bobolinks", "Bugs", "Bullfinches", "Bullocks", "Butterflies", "Buzzards", "Camels", "Capons", "Capuchins", "Cardinals", "Carnivores", "Carp", "Caterpillars", "Cats", "Cattle", "Cheetahs", "Chickadees", "Chickens", "Cicadas", "Civets", "Clams", "Cobras", "Cockroaches", "Coots", "Cormorants", "Cows", "Coyotes", "Crabs", "Cranes", "Crickets", "Crocodiles", "Crows", "Crustaceans", "Curlews", "Dalmations", "Deer", "Dinosaurs", "Dodos", "Dogs", "Dolphins", "Donkeys", "Doves", "Ducks", "Eagles", "Eels", "Elephants", "Elk", "Emus", "Falcons", "Ferrets", "Finches", "Fish", "Flamingoes", "Fleas", "Flickers", "Flies", "Foxes", "Frogs", "Geese", "Giraffes", "Gnats", "Gnus", "Goats", "Goldfinches", "Gorillas", "Goshawks", "Grackles", "Grasshoppers", "Greyhounds", "Gulls", "Hares", "Hawks", "Hedgehogs", "Herbivores", "Herons", "Hippos", "Hornets", "Horses", "Hummingbirds", "Hyenas", "Iguanas", "Impalas", "Insects", "Jaguars", "Jays", "Juncos", "Kangaroos", "Lapwings", "Larks", "Leeches", "Lemmings", "Leopards", "Lions", "Lizards", "Lobsters", "Locusts", "Magpies", "Mallards", "Mammals", "Martens", "Mews", "Mice", "Minnows", "Mites", "Mockingbirds", "Moles", "Mollusks", "Monkeys", "Moths", "Mudhens", "Mules", "Nightingales", "Otters", "Owls", "Oxen", "Oysters", "Panthers", "Parrots", "Peacocks", "Pelicans", "Penguins", "People", "Pigeons", "Pigs", "Polecats", "Porcupines", "Porpoises", "Prairie Dogs", "Primates", "Ptarmigans", "Pythons", "Rabbits", "Raccoons", "Rats", "Rattlesnakes", "Ravens", "Reindeer", "Reptiles", "Rhinoceroses", "Robins", "Rodents", "Roebucks", "Rooks", "Ruffs", "Salamanders", "Sandpipers", "Sardines", "Scorpions", "Seabirds", "Seals", "Sharks", "Sheep", "Sheldrakes", "Shrimp", "Skylarks", "Slugs", "Snails", "Snakes", "Sparrows", "Spiders", "Squid", "Squirrels", "Starfish", "Starlings", "Stingrays", "Stoats", "Storks", "Swallows", "Swans", "Swifts", "Termites", "Ticks", "Tigers", "Toads", "Tortoises", "Turkeys", "Turtles", "Vipers", "Vultures", "Walruses", "Wasps", "Weasels", "Whales", "Widgeons", "Wolves", "Wombats", "Woodcocks", "Woodpeckers", "Worms", "Wrens", "Zebras", "Arthurs", "Avengers", "Barbarians", "Bards", "Beliebers", "Biebers", "Bronies", "Caesars", "Caspers", "Chandlers", "Cleric", "Connors", "Coopers", "Cosplayers", "Creepers", "Decembers", "Dexters", "Druids", "Elders", "Elmers", "Esthers", "Evokers", "Furbies", "Furries", "Googlers", "Goombas", "Grovers", "Himalayas", "Homers", "Juggalos", "Jupiters", "Karens", "Koopas", "Larpers", "Luthers", "Novembers", "Octobers", "Octoroks", "Oscars", "Paladins", "Pallbearers", "Pillagers", "Pokemón", "Rangers", "Ravagers", "Reuters", "Sawyers", "Septembers", "Slimers", "Skypers", "Sorcerers", "Stalfos", "Storm Troopers", "Streamers", "Striders", "Taylor", "Trekkies", "Trevors", "Tuckers", "Twitchers", "Tylers", "Vaders", "Vampire", "Victors", "Walters", "Warlocks", "Wilburs", "Withers", "Wizards", "Yelpers", "Yoinkers", "Yonkers", "Aardvarks", "Accountants", "Acres", "Actors", "Actors", "Actuaries", "Adders", "Adjudicators", "Administrative Assistants", "Advertising Managers", "Advertising Sales Agents", "Aerobics Instructors", "Aerospace Engineers", "Afters", "Agents", "Agricultural Engineers", "Air Conditioning Installers", "Air Traffic Controllers", "Airline Pilots", "Alligators", "Alpacas", "Altars", "Ambulance Drivers", "Anchors", "Anesthesiologists", "Anglers", "Animators", "Answers", "Anteaters", "Antelopes", "Anthropologists", "Antlers", "Apes", "Arbitrators", "Archeologists", "Archers", "Architects", "Armadillos", "Armors", "Art Teachers", "Artists", "Assemblers", "Astronomers", "Athletes", "Attendants", "Auditors", "Authors", "Authors", "Avatars", "Baboons", "Backers", "Badgers", "Baes", "Bagpipers", "Bailiffs", "Bakers", "Bakers", "Ballers", "Ballers", "Bangers", "Bankers", "Barbacks", "Barbers", "Barbers", "Barkers", "Barristers", "Bats", "Bazaars", "Beakers", "Bears", "Beavers", "Beavers", "Beepers", "Bellhops", "Benders", "Bffs", "Bidders", "Bikers", "Biographers", "Bisons", "Biters", "Blasters", "Blenders", "Blinkers", "Blisters", "Bloopers", "Blotters", "Blowers", "Boars", "Boaters", "Boilermakers", "Boogers", "Bloomers", "Boomers", "Bookers", "Bookkeepers", "Borers", "Bots", "Boxers", "Breakers", "Brickmasons", "Brothers", "Buffalos", "Bulgurs", "Bulls", "Burgers", "Butchers", "Buyers", "Cabinetmakers", "Callers", "Camels", "Canaries", "Capers", "Capybaras", "Cardboards", "Carpenters", "Carpenters", "Cartographers", "Cashiers", "Casters", "Catchers", "Catchers", "Cats", "Catters", "Caviars", "Cedars", "Cellars", "Censors", "Centaurs", "Chambers", "Chameleons", "Chapters", "Charters", "Chauffeurs", "Cheapers", "Cheaters", "Checkers", "Cheerleaders", "Cheesers", "Cheetahs", "Chefs", "Chemists", "Chimpanzees", "Chinchillas", "Chipmunks", "Chiropractors", "Choirs", "Choreographers", "Cleaners", "Clovers", "Clusters", "Cobblers", "Coder", "Coffees", "Collars", "Colors", "Composers", "Computers", "Concierges", "Condors", "Conservators", "Cooks", "Coopers", "Coppers", "Cougars", "Cougars", "Counselors", "Couriers", "Couriers", "Covfefes", "Cows", "Coyotes", "Craters", "Critters", "Crocodiles", "Crows", "Crusaders", "Curators", "Cursors", "Daddies", "Daggers", "Dancers", "Datas", "Daughters", "Deers", "Demons", "Dentists", "Detectives", "Detours", "Dictators", "Dietitians", "Diners", "Dingos", "Dippers", "Directors", "Dishwashers", "Dispatchers", "Doctors", "Doggies", "Doggos", "Dogs", "Dogwhisperers", "Dollars", "Donkeys", "Dozers", "Drafters", "Drapers", "Dressmakers", "Drivers", "Dromedaries", "Droolers", "Droppers", "Drummers", "Dryers", "Duckers", "Dyers", "Eclairs", "Economists", "Editors", "Elders", "Electricians", "Elephants", "Elephants", "Elks", "Embers", "Enders", "Engineers", "Equator", "Etchers", "Ewes", "Factors", "Fakers", "Fathers", "Favors", "Ferrets", "Ferriers", "Fevers", "Fibbers", "Fibres", "Fighters", "Finches", "Finers", "Fishes", "Fixers", "Flavors", "Fletchers", "Flexers", "Floppers", "Flowers", "Fluters", "Fowlers", "Foxes", "Fractures", "Friars", "Froggers", "Frogs", "Fubars", "Futures", "Gamers", "Gators", "Gazelles", "Geezers", "Gestures", "Gila Monsters", "Giraffes", "Givers", "Glamours", "Gliders", "Glovers", "Gnus", "Goats", "Goers", "Golfers", "Goners", "Gophers", "Gophers", "Gorillas", "Gorillas", "Governors", "Grizzly Bears", "Ground Hogs", "Growers", "Guinea Pigs", "Guitars", "Gunners", "Hackers", "Hamsters", "Hangars", "Harbors", "Hatters", "Hedgehogs", "Hikers", "Hippies", "Hippopotamuses", "Hobbits", "Hoers", "Hogs", "Hoppers", "Horrors", "Horses", "Howlers", "Huggers", "Humors", "Hungers", "Hunters", "Hyenas", "Ibexes", "Iguanas", "Illustrators", "Impalas", "Indoors", "Influencers", "Inspectors", "Instructors", "Intruders", "Invaders", "Jackals", "Jaggers", "Jaguars", "Jailers", "Janitors", "Joggers", "Jokers", "Judges", "Jugglers", "Juniors", "Junipers", "Jurors", "Kangaroos", "Koalas", "Lambs", "Laters", "Lavenders", "Lawyers", "Lawyers", "Layers", "Leavers", "Legislators", "Lemurs", "Leopards", "Liars", "Librarians", "Lifeguards", "Liners", "Lions", "Livers", "Lizards", "Llamas", "Locksmiths", "Losers", "Lovers", "Lumbers", "Lynxes", "Makers", "Mandrills", "Mappers", "Marmosets", "Masters", "Mayors", "Memoirs", "Middleschoolers", "Millers", "Miners", "Minks", "Mirrors", "Mixers", "Models", "Molars", "Molders", "Moles", "Mongooses", "Monitors", "Monkeys", "Monsters", "Moose", "Moppers", "Morticians", "Mothers", "Motors", "Mountain Goats", "Mouses", "Mowers", "Mules", "Musicians", "Muskrats", "Mustangs", "Mylars", "Mynah Birds", "Mythbusters", "Namers", "Nectars", "Neighbors", "Newts", "Noobs", "Nudists", "Oaters", "Ocelots", "Offers", "Officers", "Opossums", "Opticians", "Optometrists", "Orangutans", "Orcs", "Orderlies", "Orthodontists", "Orthotists", "Oryxes", "Others", "Otters", "Otters", "Otters", "Outfielders", "Oxen", "Oysters", "Pagers", "Painter", "Pandas", "Panthers", "Panthers", "Papers", "Parakeets", "Paralegals", "Paramedics", "Parlors", "Parrots", "Pastors", "Pavers", "Payers", "Pediatricians", "Pedicurists", "Peddlers", "Pewters", "Pharmacists", "Photographers", "Physicians", "Piers", "Pigs", "Pillars", "Pipers", "Pipers", "Pizzas", "Plasterers", "Platypuses", "Plumbers", "Plumbers", "Plyers", "Podiatrists", "Pokers", "Polar Bears", "Polars", "Poplars", "Porcupines", "Porpoises", "Postmasters", "Powers", "Prairie Dogs", "Preppers", "Preppies", "Presidents", "Proctors", "Producers", "Proofreaders", "Pulsars", "Pumas", "Puppies", "Puppers", "Purveyors", "Quakers", "Quasars", "Rabbits", "Raccoons", "Racers", "Rafters", "Raiders", "Rakers", "Rams", "Ranchers", "Rangers", "Rats", "Razors", "Realtors", "Referees", "Reindeers", "Reindeers", "Reporters", "Reptiles", "Rhinoceroses", "Riders", "Riders", "Rippers", "Roosters", "Ropers", "Rulers", "Rumours", "Runners", "Sabres", "Sailors", "Sailors", "Salamanders", "Salamanders", "Samplers", "Sandlers", "Schoolers", "Scissors", "Seals", "Sectors", "Seeders", "Sensors", "Sewers", "Shampooers", "Sharkers", "Sheeps", "Showers", "Shrews", "Silver Foxes", "Sisters", "Sitars", "Sitters", "Skunks", "Slackers", "Slappers", "Slayers", "Sliders", "Slimes", "Sloths", "Smartphones", "Snakers", "Snakes", "Sneakers", "Soldiers", "Sonars", "Sparklers", "Speakers", "Spiders", "Spiers", "Spitters", "Spoilers", "Sponsors", "Sprinklers", "Squirrels", "Stans", "Statisticians", "Steamfitters", "Stickers", "Stinkers", "Stonemasons", "Strikers", "Suitors", "Suitors", "Sulfurs", "Summers", "Supers", "Surfers", "Surgeons", "Surveyors", "Tables", "Tailors", "Takers", "Tanners", "Tapers", "Tapers", "Tapirs", "Tartars", "Taters", "Teachers", "Telemarketers", "Tenors", "Terrors", "Tigers", "Tigers", "Tiggers", "Timbers", "Tinkers", "Toads", "Toners", "Tractors", "Traders", "Translator", "Trappers", "Tremors", "Trimmers", "Trolls", "Tuckers", "Tumors", "Tuners", "Turtles", "Tutors", "Tweeters", "Typists", "Ulcers", "Umpires", "Umpires", "Undertakers", "Upholsterers", "Ushers", "Vampires", "Vectors", "Vespers", "Veterinarians", "Vigors", "Visiters", "Visors", "Voters", "Waders", "Waiters", "Waiters", "Waitresses", "Walkers", "Walruses", "Warthogs", "Weasels", "Weavers", "Weezers", "Weighers", "Welders", "Whalers", "Whales", "Wheelers", "Whiners", "Whippers", "Whisperers", "Whoppers", "Wielders", "Wildcats", "Wilders", "Wincers", "Windsors", "Winkers", "Winners", "Winters", "Wolverines", "Wolves", "Wombats", "Wonders", "Woodchucks", "Woodworkers", "Woofers", "Workers", "Wowsers", "Writers", "Yakkers", "Yaks", "Yardmasters", "Yodlers", "Yonders", "Youngsters", "Yowlers", "Zanders", "Zappers", "Zappers", "Zebras", "Zebras", "Zingers", "Zippers", "Zithers", "Zombies", "Zoologist", "Zoomers", "Algae", "Alumni", "Axes", "Babies", "Bacteria", "Banjos", "Boxes", "Bus Drivers", "Buzzers", "Cacti", "Candies", "Children", "Cleaners", "Concertos", "Daisies", "Dice", "Dishes", "Epochs", "Feet", "Fungi", "Graffiti", "Halves", "Hooves", "Hypotheses", "Knives", "Larvae", "Messes", "Monarchs", "Nebulas", "Nuclei", "Parentheses", "Patches", "Potatoes", "Proctologists", "Quizzes", "Radii", "Scarves", "Stimuli", "Stomachs", "Studios", "Swine", "Syllabi", "Thieves", "Teeth", "Telemarketers", "Tomatoes", "Wives", "Yards", "Zoos"
  ];
  static companyNames = [
    "Solutions", "Technologies", "Concepts", "Systems",
    "Products", "Services", "Ideas", "Strategies",
    "Experiences", "Designs", "Google", "Twitter", "Facebook", "Youtube", "Instagram", "Wikipedia", "Reddit", "Yahoo", "Amazon", "Netflix", "Microsoft", "Roblox", "Minecraft"
  ];

  static catchphraseBeginnings = [
    "For a Brighter ", "Where Dreams Meet ",
    "Empowering Your ", "Simplifying Your ",
    "Unlocking ", "Bringing Ideas to ",
    "Innovating Your ", "Transforming the ",
    "Crafting a Better ", "Building the Path to ",
    "Shaping the World of ", "Redefining Your ",
    "Igniting the ", "Leading the Charge for ",
    "Creating Endless ", "Connecting You to ",
    "Designing the ", "Empowering the Next ",
    "Pioneering the ", "Revolutionizing Your ",
    "Inspiring the ", "Guiding the ",
    "Advancing the ", "Illuminating Your ",
    "Enhancing the ", "Nurturing a Better ",
    "Driving the Future of ", "Harnessing the Power of ",
    "Leaders in ", "First in ", "Get the ", "Don't be ", "Just ", "Get ", "", "110% ",
    "Experience the ", "Stay Ahead with ",
    "The Power of ", "Focus on ",
    "Your Source for ", "Setting the Standard for ",
    "Full Speed ", "Discover ",
    "Maximize Your ", "Let's Go ",
    "Built for ", "Delivering ",
    "Elevate Your ", "Destroy ", "Demolish ",
    "Annihilate ",
    "Obliterate ",
    "Ruin ",
    "Devastate ",
    "Wreck ",
    "Dismantle ",
    "Eradicate ", "You're One-Stop Shop For "
  ];

  static catchphraseMiddles = [
    "Tomorrow", "Reality", "Future", "Life",
    "Potential", "You", "World", "Ordinary",
    "Possibilities", "Innovation", "Success",
    "Horizon", "Journey", "Excellence",
    "Vision", "Beyond", "Adventure", "Dreams",
    "Opportunities", "Change", "Solutions",
    "Evolution", "Growth", "Progress",
    "Ambition", "Momentum", "Exploration",
    "Discovery", "Transformation", "Evil", "Wickedness",
    "Malevolence",
    "Sin",
    "Iniquity",
    "Villainy",
    "Depravity",
    "Corruption",
    "Malice",
    "Immorality",
    "Wrongdoing",
    "Deception",
    "Fraud",
    "Dishonesty",
    "Trickery",
    "Duplicity",
    "Scam",
    "Betrayal",
    "Subterfuge",
    "Lies", "Scum",
    "Falsification", "Nature", "Health", "Family", "Business", "Money"
  ];

  static catchphraseEndings = ["", "", "", "", "", "", "", "", "", "", " Today", " Tomorrow", " Forever", " for All", " Always", " for Now", "-ish", " Fun", ", Dude!", " to the Extreme", " and Love", " and Business", " and Family", " and Beyond", " and More"];

  static playerPositions = ["Catcher",
    "First Baseman",
    "Second Baseman",
    "Third Baseman",
    "Baseman",
    "Shortstop",
    "Left Fielder",
    "Center Fielder",
    "Right Fielder",
    "Infielder",
    "Infield",
    "Outfielder",
    "Outfield",
    "Fourth Baseman",
    "Team Mascot",
    "Utility Infielder",
    "Equipment Manager",
    "Pinch Hitter",
    "Pinch Runner",
    "Phantom ballplayer",
    "Big Whiffer",
    "Coach",
    "Batboy",
    "Batgirl",
    "Batman",
    "1st Base",
    "2nd Base",
    "3rd Base",
    "Team Captain",
    "Mendoza Line",
    "Wicketkeeper",
    "Batter",
    "Bowler",
    "All-rounder",
    "Midfielder",
    "Backfielder",
    "Sweeper",
    "Forward",
    "Defender",
    "Enforcer",
    "Winger",
    "First Base",
    "Second Base",
    "Third Base",
    "Last Base",
    "Comedian",
    "Goofball",
    "Distracter",
    "Mentor",
    "Data Analyst",
    "Artist",
    "Entertainer",
    "Debater",
    "Caregiver",
    "Mastermind",
    "Pragmatist",
    "Optimist",
    "Pessimist",
    "Idealist",
    "Nihilist",
    "Existentialist",
    "Absurdist",
    "Left Base",
    "Right Base",
    "Center Base",
    "Prophet",
    "Clairvoyant",
    "Illusionist",
    "Professor",
    "Gatekeeper",
    "Color Commentator",
    "Benchwarmer",
    "Underdog",
    "Tight End",
    "null"
  ]
  // static methods
  // @staticmethod
  static find_first_vowel(str) {
    //for index, char in enumerate(str):
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      // if char in 'aeiou':
      if ('aeiou'.includes(char.toLowerCase())) {
        //return index
        return i;
      }
    }
    return -1;
  };



  //# attempt to match first num letters, recursively
  // @staticmethod
  static findLetterMatch(listname, searchquery, num) {
    // base case, if num == 0:
    if (num == 0) {
      return null;
    }
    // for each in listname:
    for (let i = 0; i < listname.length; i++) {
      let each = listname[i];
      //   if len(each) < num:
      if (each.length < num) {
        continue
      }
      //   if searchquery[:num].capitalize() == each[:num].capitalize():
      if (searchquery.substring(0, num).toLowerCase() == each.substring(0, num).toLowerCase()) {
        //     return each.capitalize()
        return each.charAt(0).toUpperCase() + each.slice(1);
      }
    }
    return Name.findLetterMatch(listname, searchquery, num - 1);
  };

  // static shuffle(someArray) {
  //   for (let i = someArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(rng.random() * i);
  //     const temp = someArray[i];
  //     someArray[i] = someArray[j];
  //     someArray[j] = temp;
  //   }
  //   return someArray
  // };

  static randomItem(someArray) {
    return someArray[Math.floor(rng.random() * someArray.length)];
  }

  //@staticmethod
  static create_first_name() {
    let nameA = Name.randomItem(Name.firstNameList);
    let nameB = Name.randomItem(Name.firstNameList);

    let firstName = nameA.substring(0, Name.find_first_vowel(nameA));
    firstName += nameB.substring(Name.find_first_vowel(nameB));
    // if not firstName[0].isupper():
    //if(firstName.charAt(0) != firstName.charAt(0).toUpperCase()){
    //   firstName = firstName[0].capitalize() + firstName[1:]
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
    //}
    return firstName;
  };

  //@staticmethod
  static create_last_name() {
    // # last
    let nameA = Name.randomItem(Name.lastNameList);
    let nameB = Name.randomItem(Name.lastNameList);

    let lastName = nameA.substring(0, Name.find_first_vowel(nameA));
    lastName += nameB.substring(Name.find_first_vowel(nameB));
    // if not lastName[0].isupper():
    //if(lastName.charAt(0) != lastName.charAt(0).toUpperCase()){
    //   lastName = lastName[0].capitalize() + lastName[1:]
    lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();
    //}
    return lastName;
  };

  //@staticmethod
  static create_nickname(firstName, lastName) {
    // # nickname

    let adj = Name.randomItem(Name.adjList);
    let nickname = "";
    // if random.random() < 0.5:
    if (rng.random() < 0.3) {
      //   # try to match 1st + 2nd letter
      let tempAdj = Name.findLetterMatch(Name.adjList, firstName, 3);
      //   if tempAdj != None:
      if (tempAdj != null) {
        nickname = tempAdj;
      } else {
        nickname = adj.charAt(0).toUpperCase() + adj.substring(1).toLowerCase();
      }
    } else if (rng.random() < 0.3) {
      //   adj.capitalize()
      nickname = adj.charAt(0).toUpperCase() + adj.substring(1).toLowerCase();
    }
    // if len(nickname) > 1:
    if (nickname.length > 1) {
      //   nickname += ('-',' ')[random.randint(0,1)]
      nickname += rng.random() < 0.5 ? '-' : ' ';
    }

    let nameA = Name.randomItem(Name.nickNameList);
    // tempNickNoun1 = nameA.capitalize()
    let tempNickNoun1 = nameA.charAt(0).toUpperCase() + nameA.substring(1).toLowerCase();
    // if random.random() < 0.5:
    if (rng.random() < 0.3) {
      //   # try to match 1st + 2nd letter
      let tempNickNoun2 = Name.findLetterMatch(Name.nickNameList, lastName, 3);
      //   if tempNickNoun2 != None:
      if (tempNickNoun2 != null) {
        tempNickNoun1 = tempNickNoun2;
      }
      // elif random.random() < 0.5:
    } else if (rng.random() < 0.3) {
      //   # try to match 1st + 2nd letter
      let tempNickNoun2 = Name.findLetterMatch(Name.nickNameList, firstName, 3)
      //   if tempNickNoun2 != None:
      if (tempNickNoun2 != null) {
        tempNickNoun1 = tempNickNoun2;
      }
      // elif random.random() < 0.33:
    } else if (rng.random() < 0.3) {
      tempNickNoun1 = lastName[0];
      // elif random.random() < 0.33:
    } else if (rng.random() < 0.3) {
      tempNickNoun1 = firstName[0];
    }
    nickname += tempNickNoun1;
    // if len(nickname) < 3:
    if (nickname.length < 3) {
      //   if Name.find_first_vowel(firstName) > -1:
      if (Name.find_first_vowel(firstName) > -1) {
        nickname = firstName.substring(0, Name.find_first_vowel(firstName) + 1);
        nickname += firstName.substring(0, Name.find_first_vowel(firstName) + 1).toLowerCase();
      } else {
        nickname = firstName[0] + firstName[0];
      }
    }
    return nickname
  };

  //@staticmethod
  static create_name() {
    const firstName = Name.create_first_name();
    const lastName = Name.create_last_name();
    const nickname = Name.create_nickname(firstName, lastName);
    return firstName + ' "' + nickname + '" ' + lastName;
  };

  // @staticmethod
  static create_college() {
    const place = Name.placeList[Math.floor(rng.random() * Name.placeList.length)];
    const num = Math.round(rng.random()) + Math.round(rng.random()) + Math.round(rng.random());
    if (num == 0) {
      return "U" + place
    }
    if (num == 1) {
      return place + "U"
    }
    if (num == 2) {
      return place + " State"
    }
    if (num == 3) {
      return place + " Tech"
    }
  };

  static generateCompanyName() {
    const noun = Name.randomItem(Name.companyNames);
    let adj = Name.randomItem(Name.adjList);
    let halfAdjective = adj.charAt(0).toUpperCase() + adj.slice(1, Math.ceil(adj.length / 2));
    const halfNoun = noun.slice(Math.floor(noun.length / 2));

    let catchphrase = Name.randomItem(Name.catchphraseBeginnings) + Name.randomItem(Name.catchphraseMiddles) + Name.randomItem(Name.catchphraseEndings);


    return `${halfAdjective}${halfNoun}: ${catchphrase}`;
  }

  static getCharSum(someString){
    let sum = 0;
    for (var i = 0; i < someString.length; i++){
      sum += someString.charCodeAt(i);
    }
    return sum;
  }

} // end of class