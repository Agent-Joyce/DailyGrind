  /* ==================================================================
     1. CONFIG
     Change these numbers to tune the game. Top-level keys, in order: start, education, events, industry, macro, limits, market, bank, jobs, factory,
     time, clothes, health, illness, gym, hospital, food, burnout, selfStudy, gadgets, sleep, housing, lottery, community, rivals, leisure, loan,
     bankrupt, shame, score, ranks, ui, traits. Each key has its own comment explaining its values.
     ================================================================== */
  var CONFIG={
    /* Starting values for a new game. */
    start:{energy:85},
    /* Certificate tuition: the first qualification of each track, before the price index. Each new game moves each track's fee by up to certVariance either way. */
    education:{certFee:{sal:43,fnb:45,fin:79,tech:52,med:55,cus:95,eng:58,data:60,media:45,green:50,logi:45},certVariance:0.05,
      lessonEnergyPerHour:-5,      // a school lesson costs this much energy (%) for each hour...
      lessonHappinessPerHour:-5,   // ...and this much happiness
      lessonHealthPerHour:-1,      // ...and this much health (rounded per lesson, a half rounds to a whole point)
      /* bonus when you earn a qualification (shown on the certificate), by level */
      certKnowledge:{Certificate:5, Degree:10, Honours:15, Masters:20},
      certHappiness:{Certificate:5, Degree:10, Honours:15, Masters:20}},
    /* Night events.
      storyline: every game has exactly one multi-day storyline (oil crisis, pandemic, housing bubble...). It starts on the evening
        of a random day from fromDay to (game length − daysBeforeEnd): day 3 to day 17 in a 20-day game.
      storylineGap: clear days kept between the storyline and a macro shock, both ways. A shock only starts if even its longest
        run (macroDays[1]) ends this many days before the storyline's start day, and none starts this many days after it ends.
      macroChance: each night, the chance a one-off macro shock starts. Never while a storyline or another shock is running,
        never within bigGap days of one ending (bigGap 3 = 2 clear days), and never too close to the storyline (storylineGap).
        macroDays is how many days a macro shock lasts.
      Separately, one daily event may happen (story, item, news, basic, decision, or none); the odds are relative weights and do not
        need to add to 1. The daily event happens even while a storyline or macro shock is running.
      Mini stories, macro shocks and storylines are dealt from a shuffled deck, like decisions and news: none repeats until all have been seen.
      forecast: when tonight's daily event is economic news, the chance the headline is tipped off that morning (morning notes and the Bank screen), so the player has the day to move money. 0 = never, 1 = always. */
    events:{storyline:{fromDay:3,daysBeforeEnd:3},storylineGap:2,macroChance:0.1,bigGap:3,macroDays:[3,5],story:0.2,item:0.2,news:0.1,basic:0,decision:0.3,none:0.2,forecast:0.7},
    /* Industry-specific storylines (the INDUSTRY table in section 6): one a game, on top of the global storyline (above), hitting
      particular workplaces and roles. It may run at the same time as the global storyline; macro shocks keep storylineGap clear days from both.
      fromDay, daysBeforeEnd: it starts on the evening of a random day from fromDay to (game length − daysBeforeEnd), picked on its own.
      days: how many nights it runs [min, max], over its four phases (it begins, it escalates, at its peak, easing off).
      paySwing: [min, max] share by which it moves pay. Each game rolls one swing S in this range; each phase moves its roles by S or half of S.
      layoffChance: each night your own job is in a phase with cuts, the chance you are laid off (the job is gone).
      suspendChance: if you are not laid off, the chance your workplace suspends work for suspendDays [min, max] days (your job is kept).
      freezeShare: in a hiring freeze, the chance each affected role has no openings that day (normally 25%). Roles that are hiring always have openings.
      rumourDays: how many days before it starts the Employment Office shows a rumour. */
    industry:{fromDay:3,daysBeforeEnd:3,days:[5,6],paySwing:[0.2,0.5],layoffChance:0.06,suspendChance:0.15,suspendDays:[1,3],freezeShare:0.8,rumourDays:1},
    macro:{
      /* Master dial for ALL world news, macro shocks and storylines.
        1 = normal, 0 = news has no economic effect, 2 = twice as strong. */
      strength:2,
      /* Fine dials, multiplied on top of the master dial (1 = normal). */
      priceStrength:1,    // how much news moves the price index
      wageStrength:0.6,    // how much news moves shift pay
      rateStrength:4.5,    // how much news moves bank interest
      marketStrength:4.4,  // how much news moves investments (market mood)
      layoffStrength:1.5,  // chance of layoffs and workplace closures during a crisis
      /* A news headline hits partly today; the rest drifts in over the next days. */
      shareToday:0.25,          // 0.35 = 35% today, 65% spread over the following days
      bigNewsDays:[4,14],      // how long big stories (war, crisis, boom...) keep drifting
      smallNewsDays:[3,7],      // how long ordinary economic news keeps drifting
      badNewsMarket:-0.55,      // daily market mood during bad headlines (war, crash...)
      goodNewsMarket:0.45,      // daily market mood during good headlines (boom, rally...)
      shockMarketScale:1.6,    // dampens market mood from one-off macro shocks
      priceReversion:0.03,     // each day, prices drift this share of the way back towards the difficulty's base price
      /* A running story does not hit at a constant rate. Each day its effect follows a curve: it builds, peaks mid-story, then fades, with a random daily swing on top. */
      curveLow:0.5,            // a story's daily effect on its first and last day (× its listed size)
      curvePeak:1.4,           // a story's daily effect at its middle day
      dailyJitter:0.3          // each day's effect varies by plus or minus this share
    },
    limits:{
      /* Hard floors and ceilings, however bad or good the news gets. */
      priceMin:0.5, priceMax:3,    // price index: 0.5 = half price, 3 = triple price
      /* Each new game starts with a random price index in this range (on top of the difficulty's prices). */
      startPriceMin:0.94, startPriceMax:1.06,
      wageMin:0.7,  wageMax:1.4,    // pay index
      rateMin:0,    rateMax:5.5,      // bank interest, % per day
      marketMin:-4, marketMax:4    // market mood (drives ETF, hedge fund, crypto)
    },
    market:{
      /* How investments react to the economy. */
      rateHit:2.5,      // mood drop per +1 point of interest rate
      priceHit:8,      // mood drop per +100% prices (8 = a 10% price jump costs 0.8)
      closureHit:1.5,  // mood drop when a workplace closes
      reopenLift:0.5,  // mood lift when a workplace reopens
      dailyCalm:0.85,  // each day mood keeps 75% of yesterday (lower = settles faster)
      dailyNoise:0.8,  // random daily swing in mood, plus or minus
      /* Savings and investments follow the economy. News (central bank moves, crises, booms)
        changes the savings rate, and the savings rate drives the fixed deposit.
        ETF, hedge fund and crypto follow the market mood, and are also pulled down when
        interest is above its normal level. The LOAN is not affected: its rates are fixed in CONFIG.loan. */
      rateBase:2,        // the normal savings rate (% a day) that interest drifts back to
      rateReversion:0.1,  // each morning interest closes this share of its gap to rateBase (0 = never drifts back)
      rateBeta:{etf:0.3, hf:0.4, cry:0.6},  // expected daily return lost per +1 point of interest above rateBase (gained when below)
      /* Expected daily return (%) of each investment. The fixed deposit pays the savings rate × fdOverSavings.
        ETF, hedge fund and crypto expect base + mood × market mood (mood runs about −3 to +3), before the rateBeta pull.
        The daily swing around it (VOL in section 4) is not here: higher return comes with bigger swings. */
      returns:{fdOverSavings:1.25, etf:{base:2, mood:0.8}, hf:{base:3, mood:1.6}, cry:{base:4, mood:3}}
    },
    bank:{
      /* Limited-time offers. Each morning from fromDay, a 'chance' that the Bank offers a promo deposit for that day only:
        it locks between min and max dollars for 'days' days at a random rate (% a day) in the 'rate' range, then pays
        principal plus interest into your cash. One promo deposit at a time. Keep the rate below the cheapest loan (CONFIG.loan). */
      offers:{chance:0.15, fromDay:3, rate:[3,3.5], days:3, min:300, max:1000}
    },
    jobs:{
      /* Each new game, every job's pay (as set in CAREERS) is moved up or down at random by up to this much.
        0.05 = ±5%. The variation is fixed for the whole game. */
      payVary:0.05,
      /* Work experience: jobs paying MORE than payAbove a shift (as shown on the board) need this many
        shifts already worked at the same workplace (any role there counts). Without them the interview
        still takes 1h and fails with "Not enough relevant working experience". shifts:0 switches this off. */
      experience:{payAbove:150, shifts:5},
      /* ---- Automatic rule (used for every job NOT listed in 'pick' below) ----
        A job always needs its own track at its own level (set in CAREERS).
        Better-paid jobs also need a second, then a third qualification, taken in order
        from that building's list in COMP. */
      secondQualPay:250,      // jobs paying this much or more need a second qualification
      thirdQualPay:450,      // ...and this much or more need a third
      secondQualMaxLevel:2,  // highest level asked for the second one (2 = Degree)
      thirdQualLevel:1,      // level asked for the third one (1 = Certificate)
      /* Knowledge needed on top: from this job level up, base + perLevel for each level above 2.
        With the defaults: Degree jobs need 20, Honours 35, Masters 50. */
      knowledgeByLevel:{Degree:20, Honours:35, Masters:50},  // a job asks for the knowledge of its highest qualification
      /* ---- Hand-picked qualifications (these replace the automatic rule) ----
        Write the role name exactly as the Employment Office shows it, then a list of
        qualifications as '<Track> <Level>'.
        Tracks: Sales, Food & Beverage, Finance, Technology, Medicine, Engineering, Customer Service, Data & AI, Creative Media, Green Energy, Logistics.
        Levels: Certificate, Degree, Honours, Masters
        (not every track has every level; Customer Service is a Certificate only, Sales, Food & Beverage, Creative Media, Green Energy and Logistics stop at Degree; Finance, Technology and Data & AI go Certificate, Degree, Masters).
        An empty list [] means no qualification is needed.
        One role name is shared (Repair Technician: Second-Hand Shop and Electronics Store); for it, put the
        card name first, e.g. 'Second-Hand Shop (Workshop): Repair Technician'.
        If a line has a typo, the game keeps the automatic rule for that job and shows
        a red warning in the Daily log when the game loads.
        Add 'knowledge:<number>' as the last item to set the knowledge needed directly.
        Example lines (remove the // to use them):
          'Gym Instructor': ['Medicine Certificate', 'Sales Certificate'],
          'Line Worker': ['Engineering Certificate'],
          'Bank Investment Associate': ['Finance Degree', 'Technology Degree', 'knowledge:30'],  */
      pick:{

  // ---- Factory ----
  'Line Worker':        ['Engineering Certificate'],                                                    // $120
  'Technician':        ['Engineering Certificate', 'Technology Certificate'],                          // $180
  'Design Engineer':    ['Engineering Degree', 'Technology Certificate'],                                // $250
  'Senior Engineer':    ['Engineering Degree', 'Technology Degree', 'Finance Certificate'],              // $330
  'Project Lead':      ['Engineering Honours', 'Technology Degree', 'Finance Certificate'],            // $400
  'Principal Engineer': ['Engineering Masters', 'Technology Certificate', 'Finance Certificate'],        // $480
  'Chief Engineer':    ['Engineering Masters', 'Technology Degree', 'Finance Certificate'],            // $700
  'Forklift Driver':    ['Engineering Certificate'],                                                    // $110

  // ---- Golden Bun ----
  'Crew Member':        [],                                                                              // $70
  'Shift Supervisor':  ['Food & Beverage Certificate'],                                                // $110
  'Store Manager':      ['Food & Beverage Certificate', 'Customer Service Certificate'],                // $180
  'Kitchen Hand':      [],                                                                              // $65
  'Delivery Rider':    [],                                                                              // $80
  'Grill Cook':        ['Food & Beverage Certificate'],                                                // $120
  'Area Manager':      ['Food & Beverage Degree', 'Finance Certificate'],                              // $220

  // ---- Family Restaurant ----
  'Dishwasher':        [],                                                                              // $85
  'Waiter':            ['Customer Service Certificate'],                                                // $105
  'Chef':              ['Food & Beverage Degree'],                                                      // $180
  'Master Chef':        ['Food & Beverage Degree', 'Sales Degree'],                                      // $300
  'Restaurant Manager': ['Food & Beverage Degree', 'Sales Degree', 'Finance Certificate'],              // $310

  // ---- Fresh Market ----
  'Shelf Stacker':      [],                                                                            // $75
  'Cashier':            [],                                                                            // $85
  'Store Supervisor':    ['Customer Service Certificate'],                                              // $140
  'Fresh Market Manager': ['Sales Degree', 'Finance Certificate'],                                        // $230
  'Delivery Driver':    [],                                                                            // $90
  'Product Promoter':    ['Sales Degree'],                                                              // $190

  // ---- Clothes Mall ----
  'Sales Clerk':        [],                                                                            // $95
  'Visual Merchandiser': ['Customer Service Certificate'],                                              // $150
  'Boutique Manager':    ['Sales Degree', 'Finance Certificate'],                                        // $250
  'Sales Promoter':      ['Customer Service Certificate'],                                              // $150
  'Mall Manager':        ['Sales Degree', 'Finance Degree', 'Technology Certificate'],                  // $320

  // ---- Second-Hand Shop ----
  'Shop Assistant':      [],                                                                            // $70
  'Second-Hand Shop Manager': ['Customer Service Certificate'],                                              // $140
  'Sorter':              [],                                                                            // $65
  'Second-Hand Shop (Workshop): Repair Technician': ['Engineering Certificate'],                            // $140

  // ---- Second-Hand Shop pawn counter and back office (the old Pawn Shop) ----
  'Counter Assistant':  [],                                                                              // $80
  'Appraiser':          ['Finance Certificate', 'Sales Certificate'],                                    // $170
  'Pawnbroker':        ['Finance Degree', 'Sales Degree'],                                              // $290
  'Security Guard':    [],                                                                              // $95
  'Bookkeeper':        ['Finance Certificate'],                                                        // $150

  // ---- Bank ----
  'Teller':              ['Finance Certificate'],                                                        // $110
  'Internal Auditor':    ['Finance Degree'],                                                            // $150
  'Market Risk Analyst': ['Finance Degree', 'Technology Certificate'],                                  // $240
  'Rates Trader':        ['Finance Degree', 'Sales Degree', 'Technology Certificate'],                  // $330
  'Tech Developer':      ['Technology Masters', 'Finance Degree'],                                      // $410
  'Head Trader':        ['Finance Masters', 'Sales Degree', 'Technology Certificate'],                  // $450

  // ---- Hospital ----
  'Hospital Porter':      [],                                                                            // $90
  'Nursing Aide':        ['Medicine Certificate'],                                                      // $140
  'Nurse':                ['Medicine Degree'],                                                          // $210
  'Senior Nurse':        ['Medicine Degree', 'Technology Certificate'],                                // $290
  'Junior Doctor':        ['Medicine Honours'],                                                          // $330
  'Specialist Doctor':    ['Medicine Masters', 'Technology Certificate'],                                // $460
  'Consultant':          ['Medicine Masters', 'Finance Degree'],                                        // $620
  'Chief of Surgery':    ['Medicine Masters', 'Finance Degree', 'Technology Certificate'],              // $900
  'Cleaner':              [],                                                                            // $75
  'Lab Technician':      ['Medicine Certificate', 'Technology Certificate'],                            // $180
  'General Manager':      ['Finance Degree', 'Medicine Degree', 'Technology Certificate'],              // $330

  // ---- Electronics Store ----
  'Stock Clerk':        [],                                                                              // $90
  'Sales Assistant':    ['Customer Service Certificate'],                                                // $170
  'Sales Director':    ['Sales Degree', 'Technology Degree', 'Finance Degree'],                        // $350
  'Data Annotator':    ['Technology Certificate'],                                                      // $150
  'Software Developer': ['Technology Degree'],                                                          // $210
  'AI Engineer':        ['Technology Degree', 'Engineering Certificate'],                                // $290
  'Lead Architect':    ['Technology Masters', 'Engineering Degree', 'Finance Certificate'],            // $450
  'Chief Technologist': ['Technology Masters', 'Engineering Honours', 'Finance Certificate'],            // $660
  'Delivery & Install': [],                                                                              // $95
  'Electronics Store (Service): Repair Technician': ['Engineering Certificate', 'Technology Certificate'], // $170
  'IT Support Lead':    ['Technology Degree', 'Engineering Certificate'],                                // $240

  // ---- Gym ----
  'Front Desk':          [],                                                                            // $85
  'Gym Instructor':      ['Sales Certificate'],                                                        // $150
  'Operations Assistant': ['Sales Degree', 'Finance Certificate'],                                       // $250

  // ---- Electronics Store (Digital Studio) ----
  'Data Analyst':          ['Data & AI Certificate'],                                                    // $165
  'Data Scientist':        ['Data & AI Degree', 'Technology Certificate'],                               // $240
  'UX Designer':           ['Creative Media Degree', 'Technology Certificate'],                          // $245
  'Machine Learning Lead': ['Data & AI Masters', 'Technology Degree'],                                   // $430

  // ---- Bank (Analytics) ----
  'Fraud Analyst':         ['Data & AI Degree', 'Finance Certificate'],                                  // $235

  // ---- Clothes Mall (Studio) ----
  'Content Assistant':     ['Creative Media Certificate'],                                               // $140
  'Social Media Manager':  ['Creative Media Degree'],                                                    // $215
  'Brand Director':        ['Creative Media Degree', 'Sales Degree'],                                    // $320

  // ---- Factory (Green Energy) ----
  'Solar Installer':         ['Green Energy Certificate'],                                               // $150
  'EV Charging Technician':  ['Green Energy Certificate', 'Engineering Certificate'],                    // $175
  'Energy Systems Engineer': ['Green Energy Degree', 'Engineering Certificate'],                         // $260
  'Sustainability Manager':  ['Green Energy Degree', 'Engineering Degree', 'Finance Certificate'],       // $340

  // ---- Fresh Market (Fulfilment) ----
  'Warehouse Picker':           [],                                                                      // $95
  'Dispatch Coordinator':       ['Logistics Certificate'],                                               // $155
  'Supply Chain Planner':       ['Logistics Degree'],                                                    // $230
  'Regional Logistics Manager': ['Logistics Degree', 'Data & AI Certificate', 'Finance Certificate']     // $330

      }
    },
    factory:{
      /* Things to do at the Factory when you do not work there (the section is hidden once you hold a Factory job).
        dayLabour: a casual shift with no job and no dress code, paying payShare of the lowest Factory wage
          (then the usual pay index, knowledge and morale effects), perDay times a day. Counts towards the daily work
          limit and burnout, but not as work experience. energy = energy cost in %; happiness follows workHappinessShare.
        course: a safety course, once a game; adds knowledge and expShifts shifts of Factory work experience.
        tour: a factory tour, once a game. Costs move with prices. */
      dayLabour:{minutes:240, payShare:0.6, energy:-10, perDay:1},
      course:  {minutes:180, cost:30, knowledge:3, expShifts:1},
      tour:    {minutes:60,  cost:5,  knowledge:2, happiness:2}
    },
    time:{
      dayMinutes:1440,    // length of a day in minutes (1440 = 24 hours). Unused time is slept at day end.
      walkMinutes:15,      // minutes to walk past one building on the ring road
      walkEnergy:-1,       // energy (%) for every walkMinutes of walking
      rentEveryDays:5,    // rent is due every this many days
      gameDays:20,        // how many days a game lasts (all difficulties)
      /* Most actions (eating, studying, shopping, working...) have a cost in 'units' in their
        own tables. Each unit is turned into minutes like this:
          minutes = units x minutesPerUnit, rounded to the nearest roundTo, never below minAction.
        So minutesPerUnit is a dial for how long EVERYTHING takes. With 36:
          1 unit = 30m, 2 = 1h15, 3 = 1h45, 4 = 2h30, 6 = 3h30, 8 = 4h45, 10 = 6h, 12 = 7h15
        (Gym classes and walking are set in minutes directly, so this dial doesn't touch them.) */
      minutesPerUnit:36,
      roundTo:15,
      minAction:15,
      maxWorkMinutes:720,    // most shift time you can work in one day (720 = 12 hours)
      /* Shift length and tiredness by pay. The first row whose pay the job reaches is used.
        minutes = shift length, energy = % energy a shift costs.
        Better-paid (more senior) roles work SHORTER shifts, so pay per hour always rises with pay:
          under $130 = 4h30 ($14-27 an hour), $130-249 = 3h45 ($35-66), $250-449 = 3h15 ($77-138), $450+ = 2h30 ($180+). */
      shifts:[
        {pay:450, minutes:150, energy:6},    // 2h30
        {pay:250, minutes:195, energy:8},    // 3h15
        {pay:130, minutes:225, energy:8},    // 3h45
        {pay:0,  minutes:270, energy:10}    // 4h30
      ],
      freelanceMinutes:150,  // freelance coding at home (needs a computer)
      workHappinessShare:0.5, // a shift (or freelance coding) also costs this share of its energy cost in happiness, rounded up
      workHealthPerHour:-1   // health for each hour of work (shifts, freelance coding, Factory day labour), rounded per shift
    },
    clothes:{
      /* The three outfits sold at the Clothes Mall.
        price = base price in $ (prices still move with the economy and difficulty)
        days  = how many days a new set lasts before it wears out */
      casual:{name:'Casual Clothes', price:100, days:5},
      smart: {name:'Smart Casual',  price:180, days:6},
      suit:  {name:'Business Suit',  price:300, days:6, happiness:2},  // happiness = a lift when you buy it (any outfit can have one)
      startCasualDays:5,  // days left on the Casual Clothes you own at the start (0 = start with none)
      wearPerDay:1,        // days of wear lost each night (2 = clothes wear out twice as fast)
      buyUnits:2,          // time to buy an outfit, in units (see CONFIG.time)
      bargainUnits:1,      // time to haggle, in units
      bargainMin:10,        // haggling moves the price by between bargainMin%...
      bargainMax:10,      // ...and bargainMax%
      bargainWinChance:0.5, // chance the price goes DOWN when you haggle (0.5 = 50/50)
      /* used outfits sold at the Second-Hand Shop (Smart Casual and Business Suit): priceShare of the Mall price above
        (before the price index), lasting 'days' days. They meet the same dress codes as new ones; a used suit gives no happiness lift. */
      used:{priceShare:0.3, days:3}
    },
    health:{
      start:80,              // health at the start of a game (0-100)
      /* Each night health changes by these amounts, added together. */
      nightly:{
        always:0,           // everyone loses this much each night
        skippedMeal:-10,      // extra if you did not eat today
        sick:-10,           // extra while you have an illness (any illness)
        lowEnergy:-2,        // extra if energy is below lowEnergyBelow
        lowEnergyBelow:20,
        burnout:-3          // extra while burnt out
      },
      /* Health gained from sleep: perHour x the hours you still have left when you go to bed, never more than max.
        Sleeping anywhere but home gives sleep.awayShare of it. */
      sleep:{ perHour:1.5, max:15 },
      poorBelow:30,          // health below this counts as poor health...
      poorPay:0.9,          // ...and shifts pay this much (0.9 = 10% less)
      healthyMealCount:3    // healthy meals in the last 5 days needed for the bigger illness cut (see illness)
    },
    illness:{
      /* Low energy only raises the chance of falling ill once it has lasted: you need lowNights nights
        (out of the last lowWindow) on which you went to bed with energy under lowEnergyBelow.
        Until then the 'everyone else' row below is used, whatever your energy. */
      lowEnergyBelow:30,
      lowNights:3,
      lowWindow:5,
      /* Chance of falling ill each night, by energy (only once the low-energy rule above is met).
        The first row your energy is UNDER is used. */
      byEnergy:[
        {energyUnder:11,  chance:0.55},  // energy 10 or less
        {energyUnder:20,  chance:0.40},
        {energyUnder:30,  chance:0.22},
        {energyUnder:45,  chance:0.08},
        {energyUnder:999, chance:0.02}    // everyone else
      ],
      /* Then: chance x cutForEveryone - minusForEveryone, so 0.75 and 0.01 take a quarter off and one more point. */
      cutForEveryone:0.75,
      minusForEveryone:0.01,
      /* Multipliers on that chance (1 = no effect, below 1 = safer, above 1 = riskier). */
      byHealth:[                          // first row whose 'healthAtLeast' you reach is used
        {healthAtLeast:80, x:0.6},
        {healthAtLeast:60, x:0.8},
        {healthAtLeast:40, x:1.0},
        {healthAtLeast:20, x:1.3},
        {healthAtLeast:0,  x:1.6}
      ],
      junkMeals:3,          // this many junk-food servings in 5 days...
      junkX:1.8,            // ...multiplies the chance by this
      healthyManyX:0.75,    // healthy meals reaching health.healthyMealCount in 5 days
      healthyFewX:0.9,      // at least one healthy meal in 5 days
      gymPerVisitCut:0.1,  // each gym visit in the last 5 days takes this much off...
      gymBestX:0.55,        // ...down to this at most
      burnoutX:1.5,        // while burnt out
      checkupX:0.5,        // after a hospital check-up (0.5 = halved)
      pandemicX:1.3,       // while a pandemic, outbreak or lockdown story is running (1.3 = 30% more likely)
      maxChance:0.9,       // never higher than this
      /* Which illness you catch. Relative weights; they do not need to add to 1. */
      mix:{cold:0.30, flu:0.40, dengue:0.15, pneu:0.15}
    },
    gym:{
      /* Gym classes, listed cheapest first. minutes = time; cost in $ (moves with prices; gym staff pay half);
        energy change in % (negative = it costs energy, positive = it gives energy back); workouts = how many visits it counts as
        towards a lower chance of falling ill (CONFIG.illness.gymPerVisitCut; 0 = not a workout). */
      minEnergy:15,  // too tired for a class that costs energy below this
      classes:[
        {k:'yoga',   n:'Yoga & stretch',    ic:'🧘', minutes:60,  cost:12, energy:4,  health:2,  happiness:6,  workouts:1, d:'Slow stretches and deep breathing. Gives you energy back.'},
        {k:'box',    n:'Boxing class',      ic:'🥊', minutes:60,  cost:20, energy:-12, health:5,  happiness:10, workouts:1, d:'Hit the bag and let the stress out.'},
        {k:'weights',n:'Strength training', ic:'🏋️', minutes:120, cost:23, energy:-18, health:15, happiness:3,  workouts:2, d:'Free weights and machines. Builds the most health.'},
        {k:'spin',   n:'Spin (HIIT)',       ic:'🚴', minutes:30,  cost:25, energy:-15, health:8,  happiness:5,  workouts:1, d:'Short, loud and sweaty: the most health for your time.'},
        {k:'sauna',  n:'Sauna & massage',   ic:'🧖', minutes:90,  cost:40, energy:10, health:1,  happiness:10, workouts:0, d:'Pure recovery: energy and mood, not fitness.'}
      ]
    },
    hospital:{
      /* Illnesses. While sick you cannot work, and every illness costs CONFIG.health.nightly.sick health a night.
        Treatment at the Hospital always cures you.
        rest:true = you can also get over it at home: each night you sleep at home there is a homeRecover chance
        you recover. If that roll fails, only Hospital treatment cures you. Without rest:true (dengue, pneumonia)
        you must be treated at the Hospital.
        timeUnits (or minutes) = time lost each sick day, happiness = happiness lost each sick day,
        days = with rest:true, the most it lasts if you never fail a rest-at-home roll,
        treatCost = treatment fee in $ (or billMin-billMax for serious illnesses). */
      cold:  {name:'a cold',      timeUnits:6,  happiness:3,  rest:true, days:3, treatCost:40},
      flu:  {name:'the flu',      minutes:120,  happiness:5,  rest:true, days:3, treatCost:90},
      dengue:{name:'dengue fever', timeUnits:14, happiness:12, billMin:250, billMax:450},
      pneu:  {name:'pneumonia',    timeUnits:16, happiness:15, billMin:400, billMax:700},
      homeRecover:0.8,      // chance a night's sleep at home cures a cold or the flu
      /* Treatment at the Hospital: admitChance = chance you are warded for the whole of the next day.
        The bill (treatment + ward) is charged on the morning after you are released. */
      admitChance:0.8,
      wardDays:1,            // full days spent in the ward when admitted
      wardDayCost:120,      // ward fee per day (before insurance and price changes)
      hospitalMinEnergy:45,  // energy is raised to at least this when released from the ward
      treatUnits:3, treatEnergy:10, treatHealth:3,
      checkupCost:400, checkupUnits:3, checkupDays:10, checkupHealth:5,
      wardCost:370, wardUnits:6, wardEnergy:14, wardHappiness:8, wardHealth:30,
      insuranceCost:620, insuranceUnits:1, insuranceCovers:0.8,  // life insurance: bought once, pays 80% of bills for the rest of the game
      staffDiscount:0.5,    // hospital staff pay this share of bills (0.5 = half price)
      /* Bills you cannot pay in full work like rent arrears: the shortfall plus interest
        is repaid automatically from cash each morning, with a late fee on missed instalments. */
      billInterest:0.10,    // added once to the unpaid part (0.10 = 10%)
      billPlanDays:5,        // repaid over this many days
      billLateFee:0.05      // late fee on a missed instalment (0.05 = 5% of what was missed)
    },
    food:{
      /* Eating out. units = time (see CONFIG.time), cost in $, energy in %.
        junk:true = junk food (counts towards CONFIG.illness.junkMeals);
        healthy:N = a healthy meal that also adds N health.
        minutes = time in minutes (used instead of units); health = health change (junk food only, replaces junkHealth). */
      burger: {name:'a chicken bun',            minutes:60, cost:8,  energy:6,  happiness:1, junk:true, health:-5},
      combo:  {name:'a bun and noodle combo',   minutes:90, cost:15, energy:12, happiness:1, junk:true, health:-8},
      dinner: {name:'a family-style dinner',    units:6, cost:40, energy:16, happiness:10, healthy:1},
      tasting:{name:'the chef’s banquet set',   units:7, cost:90, energy:18, happiness:22, healthy:2},
      cafe:   {name:'milk tea and pastry',     minutes:45, cost:12, energy:3, happiness:6, snack:true},  // snack:true = does not count as your meal
      junkHealth:-1,        // health lost each time you eat a junk meal
      /* Meals from the Fresh Market. health = health gained when you eat it at home. */
      basic:  {name:'Rice and veg meal kit',    cost:30, energy:20, happiness:3, health:5},  // must be cooked; these are what the cooked meal gives
      premium:{name:'Ready-to-eat rice box',    cost:55, energy:20, happiness:9, health:1},  // ready to eat
      buyUnits:2,            // time to buy a meal or a bundle
      bundleSize:3,          // portions in a bundle
      bundleDiscount:0.15,  // bundle saving (0.15 = 15% off)
      homeMealsPerDay:3,    // most meals you can eat at home in one day
      eatMinutes:30,        // time to eat a meal at home
      /* Cooking time in minutes: the first meal, then each extra meal cooked at the same time. */
      cookFirst:180, cookExtra:30,
      cookEnergy:-5,         // energy (%) for every 3 hours of cooking, in proportion (3h30 = −6%)
      /* How long food keeps, counting the day you buy or cook it. Each night in the fridge uses one day;
        each night outside uses keepDaysFridge / keepDaysRoom days, so moving food in or out keeps the rule fair. */
      keepDaysRoom:3,        // outside the fridge
      keepDaysFridge:6,      // in a working fridge
      fridgeSpace:5,        // meals a fridge holds (meal kit, ready-to-eat and cooked meals; chips need no fridge)
      /* Cooked meals that spent a night in the fridge are cold. A working microwave reheats one (reheatMinutes);
        without one you can eat it cold (coldHappiness is added to the usual happiness gain). */
      reheatMinutes:30,
      coldHappiness:-3,
      /* Food that goes off (in or out of the fridge) stays in your kitchen marked spoiled, outside the fridge.
        You can still cook it (it makes spoiled meals) and eat it, but it hurts your health. */
      spoiledHealth:-8,      // health lost each time you eat spoiled food
      spoiledHappiness:-3,  // happiness change from eating spoiled food (instead of the usual gain)
      spoiledPoisonChance:0.25, // chance that spoiled food also gives you food poisoning
      poisonCost:45,        // clinic bill for food poisoning (before insurance and price changes)
      poisonEnergy:-25,
      poisonHealth:-8,
      /* A bag of chips: a junk snack, not a meal. Bought at the Fresh Market, eaten at home (vitals change when you eat it).
        Never goes off and needs no fridge. maxPerDay = bags you can buy a day, maxStored = bags you can keep at home. */
      chips:{cost:6, units:1, happiness:8, energy:-3, health:-2, eatMinutes:15, maxPerDay:5, maxStored:10},
      /* Skipping meals */
      hungryEnergy:-20,      // energy lost at night if you did not eat
      hungryHappiness:-15,  // happiness lost at night if you did not eat
      hungryPay:0.9,        // shifts pay this much while hungry (0.9 = 10% less)
      hungryDaysToHospital:3 // this many days in a row without a meal ends the game
    },
    burnout:{
      /* Working, school lessons and self-study added together for MORE than loadMinutes in a day,
        daysInARow days running, causes burnout. */
      loadMinutes:600,       // 600 = 10 hours
      daysInARow:3,
      lastsDays:3,          // how long burnout lasts
      healthHit:-15,        // one-off hits when burnout starts
      energyHit:-10,
      happinessHit:-8,
      pay:0.8                // shifts pay this much while burnt out (0.8 = 20% less)
      /* While burnt out, health also drops each night (CONFIG.health.nightly.burnout)
        and you fall ill more easily (CONFIG.illness.burnoutX). */
    },
    selfStudy:{
      /* Studying online at home. You need one of these devices; the best one you own counts. */
      gain:{computer:6, tablet:5, phone:4},  // knowledge per session (was 4/3/2; +2 each)
      minutes:120,          // session length in minutes
      energyPerHour:-5,     // energy (%) for each hour of self-study
      happinessPerHour:-5,  // happiness for each hour of self-study
      healthPerHour:-1,     // health for each hour of self-study
      minEnergy:15,          // too tired to study below this
      /* Knowledge also changes by itself each night: */
      nightlyLoss:-2,        // everyone forgets a little
      nightlyInvesting:1    // having any investment adds this much each night
      /* Devices add knowledge and happiness each night too: see CONFIG.gadgets. */
    },
    gadgets:{
      /* Each night, every working device you own adds this (phone, tablet and computer add up;
        if you own the old and new version of one device, only one counts). */
      daily:{
        phone:      {knowledge:4, happiness:2},
        phoneold:  {knowledge:4, happiness:2},
        tablet:    {knowledge:6, happiness:5},
        tabletold:  {knowledge:6, happiness:5},
        computer:  {knowledge:9, happiness:6},
        computerold:{knowledge:9, happiness:6}
      },
      /* For every hour you rest at home (the 2h Rest, plus the hours you sleep at home), these add this much.
        Applied the next morning; happiness is rounded to whole points. */
      perRestHour:{
        console:{happiness:0.8},
        tv:    {happiness:0.2, knowledge:0.1},  // second-hand TV
        tvnew:  {happiness:0.2, knowledge:0.1}    // smart TV (only one TV counts)
      },
      coffeeEnergy:6        // coffee machine: % energy each morning
    },
    sleep:{
      rateX:1,              // multiplies how fast resting and sleeping restore energy (1 = normal; the Night Owl trait raises it)
      nightEnergy:0,        // every night, before sleep is added back: energy change (%)
      nightHappiness:-5,    // ...and happiness change
      comfortBonus:0.05,    // each comfort item at home (TV, console, fridge, coffee machine, computer) makes resting and sleep restore this much more energy (0.05 = 5%)
      happinessPerHour:1.5,  // happiness next morning for each full hour slept at home...
      maxHappinessHours:12,  // ...counting at most this many hours (a longer sleep gives no more happiness)
      perHour:{apt:6.5, bung:9},  // energy (%) a night's sleep at home restores for each hour left in the day, by home (comfort items and rateX add to it; the 2h rest uses the home's own rest rate)
      maxEnergy:75,          // most energy a night's sleep at home can give
      awayShare:0.5,        // sleeping away from home gives this share of the energy, health and happiness a night at home gives
      napMinutes:120,        // length of a rest at home
      napHappiness:2        // happiness from a rest at home
    },
    housing:{
      /* Housing bubble (the 'Housing bubble bursts' shock and the 'Housing bubble pops' headline):
        when one starts, there is a loseChance chance you lose your Apartment or Villa.
        Without a home: no rent is due, every night counts as sleeping outside, and you cannot rest, cook,
        use the fridge or your gadgets (they stay in storage and still count in net worth). Food at home keeps
        as if outside the fridge. Apply again at either home: the Apartment asks for aptDeposit, the Villa
        its usual move-in fee (both move with prices), and applying takes applyMinutes. */
      loseChance:0.5,
      aptDeposit:150,
      applyMinutes:60
    },
    lottery:{
      ticketCost:10,
      ticketUnits:1,        // time to buy a ticket
      drawEveryDays:5,      // draws at the end of day 5, 10, 15...
      maxTickets:5,          // tickets you can hold for one draw
      winChance:0.12,        // chance each ticket wins
      prizeMin:100, prizeMax:1000,
      winHappiness:15
    },
    community:{
      /* The Community Centre: social activities, each once a day (perDay). cost in $ before the price index, minutes of
        the day, energy in %. tipChance: the chance a friend tips you off about a job (night out and volunteering). */
      nightOut:  {cost:25, minutes:180, energy:-10, happiness:15, perDay:1, tipChance:0.2},
      karaoke:   {cost:10, minutes:120, energy:-5,  happiness:9,  perDay:1},
      volunteer: {minutes:180, energy:-10, happiness:8, knowledge:2, perDay:1, tipChance:0.3},
      /* a friend's job tip lasts 'days' days (counting today): the next interview gets passBonus added to its pass
        chance and never fails for "no openings". It is used up by that interview, pass or fail. */
      tip:       {days:3, passBonus:0.3},
      /* The safety net (CHANGELOG 116): once a game (perGame), when you have no clothes at all and cannot afford the cheapest way to get
        some (new Casual Clothes or a used outfit, counting cash and savings), and/or you have had no meal today, have none at home and cannot
        afford the cheapest meal out, the centre gives you what you lack. It takes 'minutes'. Clothes: a set of Casual Clothes with clothesDays
        days of wear. Meal: mealEnergy % energy and mealHappiness happiness, and it counts as today's meal. enabled:false turns it off.
        Rivals do not use it: they have their own rules for clothes and meals. */
      safetyNet: {enabled:true, perGame:1, minutes:30, clothesDays:3, mealEnergy:12, mealHappiness:3}
    },
    rivals:{
      /* A game with AI rivals (chosen on the welcome screen): 1 to 3 computer players live the same days in the same town.
        gameDays: how long a rival game lasts (a single game lasts time.gameDays). Rank target days stretch with it.
        industryStorylines: how many industry-specific storylines a rival game has (a single game has one); the next one starts
          at least industryGapDays after the last one ends.
        dayOverheadMinutes: walking and errands in a rival's day, so it sleeps about as long as a busy player.
        illMix: when a rival falls ill (your nightly chance), the share of each illness; a rival who can afford it pays for treatment.
        names, icons: the rivals, in order.
        levels: how each level plays. mistakeChance = the most a day can go wrong (how it goes wrong follows the rival's state: mistakes below);
          shifts = shifts a day (a fraction: 2.5 = a third shift on about half of days); plans = aims at the best job reachable in the days left and studies for it; studyHours = most
          hours of lessons a day; studyChance = chance it studies on a day; applyTries = job interviews a day; usesOutlook = judges
          jobs by today's pay (the industry storyline included) rather than base pay; bank = none, savings or invest (savings and
          the ETF in a good market); moraleAim = happiness it tops up to with calls, Park walks and (social) the Community Centre. */
      gameDays:30, industryStorylines:2, industryGapDays:5,
      dayOverheadMinutes:360,  // minutes of a rival's day spent walking between places, shopping, cooking and on errands (less time left to sleep; 360 = a medium rival sleeps about 8 1/2 hours)
      /* rivals' own small life events, like your daily cards: each night a 'chance' of one outcome, picked at random from
        'outcomes' (effect tokens: h happiness, l health, e energy, c cash; a~b is a range). Tonight's global and industry storyline
        chapters, illness (CONFIG.illness) and money shame (CONFIG.shame) hit rivals as they hit you. */
      illMix:{cold:0.5, flu:0.35, dengue:0.1, pneu:0.05},
      /* the job race: when a rival of one of these levels gets a job, a 'chance' it took the last opening, so that role has no
        openings for you the next day ("Linh got there first"); at most maxPerGame times a game, never the same role twice running. */
      jobRace:{chance:0.5, maxPerGame:3, levels:['medium','expert']},
      /* relationships with rivals (−100 enemy … +100 friend; labels at friendAt, friendlyAt, rivalAt, enemyAt). Building one always
        costs time: chat and hello when you meet a rival (encounterChance when you walk into a place they frequent, once a day),
        calls (from home: CONFIG.leisure.call's time and happiness; by phone: call.phoneMinutes and phoneHappiness, one rival or a
        group), and congratulating them on their news. Each call gives every rival on it a relationship change from call.roll
        ([change, chance] pairs). Below 0, a gain may backfire into the same-size loss (tension: per point below zero, up to max).
        Friends give you a job tip some mornings (friendTipChance); enemies race you harder (enemyRaceBonus added to jobRace.chance);
        a rival who beats you to an opening loses racedRel with you. */
      /* Personalities are separate from difficulty. Probability adjustments are additive points;
        tipMult/tensionMult scale existing chances. A grudge makes negative memories weigh more. */
      personalities:{
        generous:{name:'Generous',icon:'💛',about:'Quick to help, dependable with money, and forgiving.',lend:0.2,repay:0.08,bet:-0.1,tipMult:1.4,tensionMult:0.7,grudge:1,race:0,returnChance:0.4,ask:'I could use a hand. I will return the favour.'},
        ambitious:{name:'Ambitious',icon:'🎯',about:'Protects their savings and competes hard for job openings.',lend:-0.1,repay:0.05,bet:0,tipMult:0.8,tensionMult:1,grudge:1,race:0.15,returnChance:0.25,ask:'A little help now would keep my plans on track.'},
        reckless:{name:'Reckless',icon:'🎲',about:'Lends readily and loves a bet, but repayment is less reliable.',lend:0.1,repay:-0.15,bet:0.25,tipMult:1,tensionMult:1,grudge:1,race:0,returnChance:0.3,ask:'A short loan. What could possibly go wrong?'},
        vindictive:{name:'Vindictive',icon:'🔥',about:'Slow to lend, remembers refusals, and takes bad blood personally.',lend:-0.15,repay:-0.05,bet:0.05,tipMult:0.7,tensionMult:1.3,grudge:2,race:0.1,returnChance:0.2,ask:'I will remember who was there when I needed help.'}
      },
      /* Archetypes: how a rival plays, separate from its level (how well) and personality (how it treats you). Dealt at the start
        on the rivals' dice, one each, no two alike. tracks = weight on a job's value by the pathway of its first qualification
        (1 = neutral; missing pathways are 1); shifts = added to the level's shifts a day; study = times the level's study hours;
        bank = steps up the level's money plan (none → savings → invest); morale = added to the level's happiness aim;
        social = true uses the Community Centre at any level (null = as the level says). */
      archetypes:{
        careerist:{name:'Careerist',icon:'🧗',about:'Chases the best-paid ladder and works long hours for it.',tracks:{med:1.25,fin:1.1},shifts:0.25,study:1,bank:0,morale:-5,social:null},
        scholar:  {name:'Scholar',icon:'🎓',about:'Puts qualifications first: more classes, fewer shifts.',tracks:{tech:1.45,eng:1.4,data:1.35,med:0.8},shifts:-0.25,study:1.25,bank:0,morale:0,social:null},
        investor: {name:'Investor',icon:'📈',about:'Saves hard and puts money to work in the markets.',tracks:{fin:1.5,data:1.2,med:0.8},shifts:0,study:1,bank:1,morale:0,social:null},
        socialite:{name:'Socialite',icon:'🥂',about:'Keeps spirits and friendships up, and likes jobs with people.',tracks:{media:1.55,sal:1.4,fnb:1.35,cus:1.35,med:0.75},shifts:-0.25,study:0.9,bank:0,morale:12,social:true},
        hustler:  {name:'Hustler',icon:'⚡',about:'Works every hour going and climbs practical trades fast.',tracks:{logi:1.55,green:1.5,eng:1.15,med:0.75},shifts:0.5,study:0.8,bank:0,morale:-5,social:null}
      },
      /* Playing to win (planning rivals: levels listed): each night a rival looks at its Life Score places and picks one focus for the
        next day where a place is cheapest to gain: a category where the player just ahead is within `close` (happiness: average
        points; health: unwell nights; education: qualification levels; rep: reputation points). From defendFrom (share of the game)
        it also defends a place that the player just behind is that close to. Focus levers: happiness sets the day's happiness aim moraleLift
        above the average it needs to pass (or keep); education adds studyHours; health takes the gymClass at the Gym (CONFIG.gym.classes); rep adds repPactChance to the
        nightly chance of a pact between rivals (CONFIG.rivals.politics.rivalPacts) and starts it. Wealth and career are its normal play. */
      aims:{levels:['expert'],  // medium rivals plan their careers but do not play for places (CHANGELOG 117)
        close:{happiness:6, health:1, education:1, rep:6}, defendFrom:0.8,
        moraleLift:15, studyHours:1.5, gymClass:'spin', repPactChance:0.15,
        newsGap:3},  // a rival's aim (r.aim, shown on its profile) is in the morning news when it changes, at most once in newsGap days
      /* Rivals use the whole game (CHANGELOG 121). Every number the game already has (food, gym, housing, expRet, loan tenures) is reused; these only say when.
        meals: a rival short of money (under poorRents rents) or unable to afford the usual meal eats the cheap junk bun instead of going hungry; one that is
          unhappy (below treatBelow) and has treatKeepRents rents spare treats itself to the family dinner; the usual meal is the Fresh Market rice kit (health +5).
        gym: a rival with poor health (CONFIG.health.poorBelow) takes the cheapest Gym class when rent and its next outfit are covered.
        home: planning rivals move to the villa when they hold the move fee plus moveRents of its rent (and no flatmate); back to the apartment under backRents.
        invest: investing rivals (a level whose bank plan is invest) hold the products listed for their archetype. A product is bought when its expected return
          minus risk x its daily swing beats the savings rate by margin, and sold when it falls sellMargin under it; share of the savings move each time (never
          more than maxShare of net worth in one product); fixed deposits lock for fdDays and are never sold early.
        loan: a planning rival with no loan that cannot pay a course fee for a role paying payGain times its job borrows the shortfall (in steps, tenure by index
          from CONFIG.loan.tenures, limit as yours; its net worth after the fee must stay above keepWorth) and repays when it can; not repaid graceDays after the due date it is out of the race, as you would be. */
      fullGame:{
        meals:{poorRents:1, treatBelow:40, treatKeepRents:3},
        home:{moveRents:6, backRents:1},
        invest:{keepBank:300, share:0.5, minMove:100, margin:0.1, sellMargin:0.3, maxShare:{etf:0.5, hf:0.3, cry:0.1}, fdDays:4,
          products:{careerist:['etf'], scholar:['fd'], investor:['fd','etf','hf'], socialite:['etf'], hustler:['etf','hf','cry']},
          risk:{careerist:0.15, scholar:0.2, investor:0.05, socialite:0.15, hustler:0.02}},
        loan:{on:true, payGain:1.3, tenure:2, keepWorth:300}},
      /* Awareness of the player and each other (medium and expert rivals; everything is a bounded modifier on an existing chance).
        leaderSabotage: x a rival's sabotage chance against whoever leads the Life Score (you or a rival; the lead is held by points);
        leaderFirst: levels whose sabotage on other rivals goes for the leader before the one just ahead;
        troubleFirst: a rival short of rent money asks to borrow before the others, from the one who trusts you most (messages);
        helpedBetray: each point of trust a rival holds for a partner cuts its betrayal chance by this much, down to at least helpedFloor x the chance. */
      awareness:{levels:['medium','expert'], leaderSabotage:1.5, leaderFirst:['expert'], troubleFirst:true, helpedBetray:0.2, helpedFloor:0.4},
      /* Conversations when you meet a rival (rival dice; every topic costs minutes; outcomes go through relGain() and remember()).
        work: ask about their job (rel, happiness, and tipChance x their personality's tipMult of a job lead if you have none and are not on bad terms);
        tip: share your job lead (needs one active: you lose it; they remember it, and owe you);
        favour: spend a favour a rival owes you (needs one; guaranteed job lead);
        tease: win chance by personality (lower by badTerms when relationship is at or below rivalAt), win relWin, lose relLose and an argument;
        gossip: about a third rival (needs one still in): wins with their like chance for rel, and sours their trust (relOther); a loss costs relLose.
        say: the reply text, by archetype (work) or personality (the rest). */
      talk:{work:{minutes:20, rel:4, happiness:1, tipChance:0.25}, tip:{minutes:15, rel:10, trust:1}, favour:{minutes:10, rel:2},
        tease:{minutes:10, happiness:1, relWin:5, relLose:-6, badTerms:0.2, win:{generous:0.85, ambitious:0.5, reckless:0.75, vindictive:0.3}},
        gossip:{minutes:15, rel:4, relOther:-6, relLose:-4, like:{generous:0.3, ambitious:0.6, reckless:0.75, vindictive:0.7}},
        say:{
          work:{careerist:'Long hours, but the next rank is close.', scholar:'Between shifts I am mostly in a lesson.', investor:'Work pays the bills. The savings do the rest.', socialite:'Work is fine. The people are the best part.', hustler:'Whatever pays this week, I am doing it.'},
          tip:{generous:'You are a good one. I will not forget this.', ambitious:'That is useful. Thank you.', reckless:'No way! I owe you one.', vindictive:'Hm. Fine. I will remember you did that.'},
          favour:{generous:'Of course. Say no more.', ambitious:'You did help me. Here is what I know.', reckless:'Yes yes, I owe you. Here.', vindictive:'We are even after this.'},
          teaseWin:{generous:'They laughed and teased you right back.', ambitious:'They allowed a half-smile.', reckless:'They laughed harder than you did.', vindictive:'Somehow it landed. They smirked.'},
          teaseLose:{generous:'It came out wrong and you both went quiet.', ambitious:'They did not find it funny.', reckless:'They did not take the joke well.', vindictive:'They did not laugh. They will not forget it.'},
          gossipWin:{generous:'They listened politely.', ambitious:'They filed it away.', reckless:'They wanted every detail.', vindictive:'They loved it.'},
          gossipLose:{generous:'They did not want to hear it.', ambitious:'They changed the subject.', reckless:'They told you to mind your own business.', vindictive:'They thought less of you for it.'}}},
      /* Moments: one timed card a day on the Today screen (rival games; dealt each morning on the rivals' dice, played with your choices).
        chance: that a day has one; firstDay: the earliest day; maxPerGame: most of each kind a game; window: minutes you have (counted from the
        start of the day) for contest (an opening you and a rival both want: go to the interview first and it is easier; miss it and they get there first),
        cover (a rival asks you to cover their shift: minutes, their pay, relationship), project (a group project at the School: minutes, knowledge,
        happiness, relationship) and town (a town contest: entry fee, minutes, win chance base + knowledge/knowledgeDiv, prize, reputation, happiness).
        Missing a card costs: contest a relationship loss and the opening closed to you for the day (like a lost job race), cover a refusal, project a small loss. */
      moments:{chance:0.5, firstDay:2, maxPerGame:3,
        window:{contest:360, cover:300, project:240, town:420},
        contest:{interviewRel:-2, missRel:-3},
        cover:{minutes:180, energy:-10, rel:8, refuseRel:-2},
        project:{minutes:90, know:2, happiness:2, rel:6, missRel:-2},
        town:{fee:10, minutes:60, base:0.3, knowledgeDiv:200, max:0.8, prize:60, rep:3, happiness:4, loseHappiness:1}},
      /* A rival's slips (the level's mistakeChance is the most it can be): the chance is mistakeChance x (floor + (1 − floor) x strain),
        strain being the worst of: tired (energy from tired[0] down to tired[1]: skips class), broke (cash and savings under brokeRents
        rents: skips a meal) and unhappy (happiness from unhappy[0] down to unhappy[1]: skips a shift). With no strain it skips its fun. */
      mistakes:{floor:0.5, tired:[55,20], brokeRents:2, unhappy:[45,15]},
      /* Meaningful deeds change remembered trust, independently of relationship points. Stored history is bounded.
        A help credit can be returned as one job introduction, no earlier than the next day. */
      memory:{maxEntries:5,maxTrust:3,maxOwed:3,lendPerTrust:0.04,lendTrust:1,refuseTrust:-1,repayTrust:1,defaultTrust:-2,helpTrust:1},
      social:{greetingMs:3000, friendAt:40, friendlyAt:15, rivalAt:-15, enemyAt:-40, encounterChance:0.35,
        ignore:{rel:-3},  // (the old chat and hello were replaced by the talk topics below)
        congratulate:{minutes:15, rel:6, happiness:1}, friendTipChance:0.15, enemyRaceBonus:0.25, racedRel:-10,
        call:{phoneMinutes:30, phoneHappiness:1, roll:[[-1,0.1],[0,0.1],[1,0.4],[2,0.4]]},
        tension:{per:0.01, max:0.6},
        argument:{happiness:-2}},  // an argument with a rival (a call that goes wrong, or tension) also costs you this much happiness
      /* Money between you and your rivals (rival games only), through the 💬 Messages app on your phone or computer.
        Rivals message you some nights (one a night at most, from the end of day firstDay); a message lasts messageDays days and
        letting it expire counts as saying no. Replying takes replyMinutes (noMinutes to say no). Dollar amounts are scaled by G(). */
      money:{messageChance:0.55, firstDay:2, messageDays:2, replyMinutes:10, noMinutes:5,
        loan:{interest:0.1, days:3, repayRel:3,  // both ways: 10% on top, due on the morning 3 days after; paid in full on time: +3
          /* Requests use askChance, or distressChance when short for rent + askBuffer; cooldown is per borrower in days. */
          min:60, max:150, askChance:0.2, distressChance:0.8, cooldown:3, lendHappiness:2, askBuffer:60, lendRel:6, refuseRel:-3, lateDays:2, rivalDefaultRel:-15, rivalDefaultHappiness:-3,
          repay:{easy:0.65, medium:0.85, expert:0.95}, friendMod:0.1, enemyMod:-0.1,  // their chance of paying on each due morning
          /* you ask a rival to lend: they need to be at least friendly, keep rent + askBuffer, and pass their level's willingness roll */
          step:50, maxBorrow:300, borrowFrom:15, willing:{easy:0.9, medium:0.7, expert:0.5}, askedNoRel:-3,
          /* not paid in full on the due morning: once, −50 with the lender, −25 with every other rival, −25 happiness; the rest is collected later */
          defaultRel:-50, defaultOthersRel:-25, defaultHappiness:-25},
        /* a friendly bet: who grows their net worth more over `days` days; both stakes are held until then, the winner takes both */
        bet:{percent:0.1, min:10, max:500, reserve:75, days:3, winHappiness:3, loseHappiness:-2, rel:2, enemyLoseRel:-4, accept:{easy:0.8, medium:0.6, expert:0.5}}},
      /* Living, studying and getting through things together (rival games only). Relationship changes that are gains go through tension. */
      together:{
        /* a flatmate: invite a friendly rival to share your home (inviteMinutes); rent is split in half on rent day */
        flat:{offerChance:0.18, offerCooldown:4, acceptRel:8, replaceRel:-10, inviteMinutes:30, flatFrom:15, willing:{easy:0.9, medium:0.7, expert:0.5}, inviteNoRel:-2, kickMinutes:10, kickRel:-10,
          leaveAt:-15,                                        // they move out on their own at this relationship or below
          skip:{easy:0.25, medium:0.1, expert:0.03}, skipEnemyMod:0.1, skipRel:-8, skipHappiness:-3,  // a rent day they don't pay their half (+skipEnemyMod below 0): you pay it all
          nightHappiness:{friend:2, friendly:1, neutral:0, bad:-3}, nightRel:1,  // each night together, for both of you; the relationship drifts up while it's 0 or more
          homeChance:0.4, noChance:0.2, noRel:-1,             // a flatmate at home may be busy and decline; no time or cash spent
          cook:{minutes:45, happiness:2, rel:4},              // a basic meal cooked together (you pay half), plus this
          hangout:{minutes:60, happiness:4, rel:3}, chores:{minutes:30, health:1, rel:2}, clearAir:{minutes:30, rel:6, below:15}},
        /* a study group: a lesson in a pathway a friendly rival is also studying */
        study:{groupKnowledge:1, groupHappiness:1, groupRel:2, partnerKnowledge:1},
        /* rival cards at night (RIVAL_CARDS): the chance a night has one, and at most one every `gap` nights */
        cards:{chance:0.3, gap:2}},  // which illness a rival catches (they share your illness chance and illness data)
      /* How a planning rival values a job: pay x days it could be worked x the archetype's pathway taste (archetypes.tracks), plus
        educationWeight for each level it already holds towards it; closedWeight / experienceWeight scale a closed workplace or a
        role it lacks the work experience for; targetBonus favours applying where its target job is. */
      career:{closedWeight:0.75,experienceWeight:0.8,targetBonus:10,
    educationWeight:0.025},  // career tastes are in archetypes (tracks)
      /* Accepted terms are snapshotted. Money is scaled by G(); chances are per eligible morning. */
      contracts:{days:6,minutes:10,keepRel:6,missRel:-5,honourRel:2,rewardHappy:3,noticeDays:2,
    wealth:{percent:0.3,min:10,max:2000,reserve:75,growth:0.25,reminderDays:3},
    study:{sessions:3,minutes:60,energy:-5,knowledge:1,gap:2,maxReschedules:1,rescheduleChance:0.8,cancelChance:0.12,noticeChance:0.5},
    emergency:{chance:0.15,amount:60,minutes:30,reserve:75},royalty:{amount:20,minutes:20,everyDays:2},
    brokenChance:0.08,problemCooldown:4,problemDays:2,compensation:30,forgiveRel:2,challengeRel:-2,
    conflictChance:0.3,conflictShift:80,conflictSocialHappy:4},
      /* Hidden-source events share a cooldown and bounded history. Only evidence reveals the source. */
      socialEvents:{chance:0.08,cooldown:4,expiryDays:6,maxHistory:12,discoveryChance:0.45,
    rumourRel:-3,rumourOtherRel:-4,betrayRel:-12,confrontRel:-4,forgiveRel:4,reconcileRel:8,minutes:20},
      lifeEvents:{chance:0.6, outcomes:['h-2~6','h-5 c-15~40','h-4 e-6','h+2~4','h+3 c-10~25','l-2~4','h-3 l-2','e-8 h-2','c+10~30 h+2','h-8 l-3']},
      names:['Linh','Arjun','Jae'], icons:['👩','🧔','🧑'],
      levels:{
        easy:  {mistakeChance:0.2, shifts:1.25, plans:false, studyHours:1.5, studyChance:0.35, applyTries:1, usesOutlook:false, bank:'none',    moraleAim:20, social:false},
        medium:{mistakeChance:0.03, shifts:2.25, plans:true,  studyHours:4,   studyChance:1,    applyTries:2, usesOutlook:false, bank:'savings', moraleAim:55, social:true},
        expert:{mistakeChance:0.02, shifts:2.75, plans:true,  studyHours:4.5, studyChance:1,    applyTries:2, usesOutlook:true,  bank:'invest',  moraleAim:60, social:true}
      },
      /* The Life Score: how a rival game is won. In each category every player gets a place (ties share the better one);
        a place earns placePoints[place-1] x the category's weight. on:false leaves a category out. Happiness and health are
        averages over the nights played; stability counts crisis days (no meal, rent arrears, an overdue loan, illness, no clothes);
        career is the best-paid job held; education is qualification levels (knowledge breaks ties); first to the line rewards
        reaching each rank earliest. */
      scoring:{placePoints:[10,6,3,1], categories:{
        wealth:{on:true,weight:3}, career:{on:true,weight:2}, happiness:{on:true,weight:2}, education:{on:true,weight:2},
        health:{on:true,weight:1}, stability:{on:true,weight:1}, first:{on:true,weight:1}, rep:{on:true,weight:1}}},
      /* Town politics (rival games only): pacts, betrayals and reputation. The Town mood is chosen on the welcome screen.
        Chances are per night unless said otherwise; dollar amounts are scaled by G(). */
      politics:{
        moods:{friendly:{name:'Friendly',icon:'😊',betray:0,sabotage:0}, competitive:{name:'Competitive',icon:'⚖️',betray:1,sabotage:1}, cutthroat:{name:'Cutthroat',icon:'🔪',betray:1.6,sabotage:1.6}},  // betray / sabotage: x those chances (0 = none, by anyone; also no flatmate theft)
        defaultMood:'competitive',
        /* reputation: 0-100 for everyone, from start; acceptPer = change in a rival's chance to accept your pact or loan request per point
          above or below start; interviewPer = the same for interview chances (yours and the rivals') */
        rep:{start:60, keepPact:5, repay:2, defaulted:-8, help:1, betray:-25, acceptPer:0.005, interviewPer:0.0025},
        /* a pact: needs the relationship at `need`; lasts `days`; proposing or renewing takes `minutes`; the pot is each side's stake and
          earns the savings rate + potBonusRate points a day; an ally passes a job tip with tipChance each morning */
        pact:{need:40, days:5, minutes:10, accept:{easy:0.9, medium:0.7, expert:0.6}, acceptPersonality:{generous:0.1, ambitious:-0.1},
          offerChance:0.25, percent:0.1, min:10, max:500, reserve:75, potBonusRate:1, tipChance:0.5, keepRel:5, endRel:-5, declineRel:-2},
        /* betrayal by an ally (not in a Friendly town): chance by level x mood x personality (vindictive only when their trust in you is below 0);
          experts are lateMult times as likely in the last lateDays days. The betrayer's relationship with the victim goes to relTo. */
        betray:{chance:{easy:0.08, medium:0.04, expert:0.02}, lateDays:5, lateMult:3, personality:{reckless:1.5, vindictive:1.3, generous:0.4},
          relTo:-80, othersRel:-10, happiness:-5, closeDays:2, leakDays:3, leakRace:0.2},
        rivalPacts:{chance:0.1, applyBonus:0.05},   // two rivals without allies form a pact; during it their job applications get this bonus
        drift:{min:-2, max:2},                      // each night every rival's relationship with you moves by a random whole number in this range
        /* sabotage: small, temporary setbacks (never a job, home or health lost). Every move costs time. caught = the base chance of being
          caught; each earlier sabotage by the same player adds perUse (up to maxCaught). days = how long the lasting effects last. */
        sabotage:{hitsOnYouPerDay:2, yourHitsPerRivalPerDay:2, rivalHitsPerDay:1, maxPerGame:8, days:2, gotAwayDays:3, gotAwayHappiness:2, perUse:0.05, maxCaught:0.9,
          moves:{
            rumour:  {name:'Spread a rumour', ic:'🗣️', minutes:60, interview:-0.15, caught:0.3},       // in person, at the Community Centre
            online:  {name:'Spread a rumour online', ic:'📱', minutes:30, interview:-0.15, caught:0.35}, // social media: phone, tablet or your computer
            badmouth:{name:'Bad-mouth them around town', ic:'💬', minutes:30, rep:-5, caught:0.25},
            cls:     {name:'Grab their class', ic:'📚', minutes:15, cost:15, caught:0.1},                // no lesson for them the next day
            boss:    {name:'Talk them down to the boss', ic:'👔', minutes:30, pay:0.9, caught:0.4},     // same workplace only
            snag:    {name:'Snag their opening', ic:'📝', minutes:60, caught:0.25},                    // the role they are after is closed to them
            prank:   {name:'Late-night prank calls', ic:'📞', minutes:15, energy:-15, caught:0.2}},     // needs a phone or tablet
          caught:{rep:-15, rel:-20, happiness:-3, grudgeDays:5, grudgeMult:3, vindictiveGrudge:5},
          rival:{chance:{easy:0.03, medium:0.04, expert:0.03}, caught:{easy:0.5, medium:0.3, expert:0.15}, enemyMult:2, personality:{vindictive:1.5, ambitious:1.2, generous:0.3}, expertLastDays:10},
          accuse:{minutes:30, rightRep:-10, rightRel:-10, rightHappiness:2, wrongRel:-20, wrongHappiness:-5, days:5}},  // days: an unsolved incident can be accused for this many days
        /* cash going missing overnight: a flatmate on bad terms (not in a Friendly town) or a burglar (only in the homes listed).
          small: some cash goes and you are not told who; big: most of it goes and you are told who (a flatmate moves out). Bank money is safe. */
        theft:{small:{min:0.1, max:0.5, happiness:-3}, big:{min:0.5, max:0.8},
          flatmate:{below:-10, chance:0.15, personality:{vindictive:1.5, reckless:1.3, generous:0.3}, bigChance:0.4, rel:-60, rep:-25, happiness:-10},
          burglary:{chance:0.1, homes:['apt'], bigChance:0.35, happiness:-8}}},
    },
    leisure:{
      /* Free things to do for fun. minutes = time taken; energy in %.
        screen: watch a show or play games at home; needs a working TV or game console.
        call: call your family from home, up to perDay times a day.
        walk and jog: at the Park (any time, home or not). */
      screen:{minutes:60, energy:-1, happiness:7},
      call:  {minutes:30, happiness:3, perDay:1},
      walk:  {minutes:60, happiness:5, health:1},
      jog:   {minutes:60, energy:-8, happiness:4, health:3, minEnergy:15}  // minEnergy: too tired to jog below this
    },
    loan:{
      /* Loans at the Bank. You can hold ONE loan at a time; what you owe counts against your net worth. */
      enabled:true,
      step:50,                  // you borrow and repay in steps of this many dollars
      baseLimit:1000,            // credit limit before counting what you own...
      limitPerAsset:2,          // ...plus this many dollars of credit for every $1 you own
      countCash:true,            // what counts as "owned" for the credit limit
      countSavings:true,
      countInvestments:true,
      maxLoan:5000,              // the credit limit never goes above this
      /* Tenures you can pick. rate = simple interest per day, on the principal you still owe. */
      tenures:[
        {days:3,  rate:0.04},
        {days:5,  rate:0.05},
        {days:10, rate:0.06}
      ],
      overdueRate:0.08,          // after the due date, the whole balance grows by this much a day...
      overdueCompounds:true,    // ...true = on principal + interest (compounding), false = on principal only
      graceDays:5,              // default (game over) if not repaid in full this many days after the due date
      defaultIfOwedAbove:10000,  // default (game over) if you ever owe more than this
      borrowMinutes:15          // time it takes to arrange a loan
    },
    bankrupt:{
      /* Bankrupt (game over): net worth under netWorthBelow at the end of daysInARow days running. */
      netWorthBelow:0,
      daysInARow:3,
      fromDay:5,                 // the first day that counts (1 = from the very start; a later day gives new players a grace period)
      warnDaysBefore:2           // net worth under the line shows a warning with a way out from this many days before fromDay
    },
    shame:{
      /* Money shame, checked when you end the day. In debt (net worth under 0): debtHappiness and debtEnergy, from day 1.
        Nearly broke (net worth under nearlyBrokeBelow): nearlyBrokeHappiness, only from nearlyBrokeFromDay (no warning or
        penalty before then, so new players are not nagged while they find their feet). */
      nearlyBrokeBelow:100, nearlyBrokeHappiness:-3, nearlyBrokeFromDay:6,
      debtHappiness:-8, debtEnergy:-5,
      noClothesHappiness:-5  // each morning you wake up owning no clothes at all (you also can't work any shift until you buy some)
    },
    score:{
      /* Final score = net worth + each vital x its weight + education levels x educationLevel. */
      energy:1, happiness:5, health:5, knowledge:5, educationLevel:50
    },
    /* Net-worth ranks, lowest first. Reaching the first one wins the game; reaching the last one ends it.
      Keep at least two rows.
      byDay: target day. Reaching the rank by the end of that day adds 'bonus' points to the score (an "on-time" rank).
      Reaching it later still counts as the rank, without the bonus. byDay:0 = no target. A byDay past the game length is treated as the last day. */
    ranks:[
      {name:'Comfortable', netWorth:1000,  icon:'🙂', byDay:10, bonus:500},
      {name:'Wealthy',    netWorth:5000,  icon:'💼', byDay:16, bonus:1000},
      {name:'Tycoon',      netWorth:10000, icon:'👑', byDay:20, bonus:2000}
    ],
    /* ui: clock, trend arrows, toasts, action preview, recap and the evening darkening (see ADD-ONS) */
    /* Ways to earn outside a job (CHANGELOG 105). Dollar amounts follow wages and prices (payIdx) and your productivity.
      gig: delivery runs from the 📦 Gigs app (a working phone or tablet; no interview, no dress code beyond having clothes).
        A run takes `minutes` and `energy`; it pays pay + perStar for each star above baseStars (so 4 stars = pay, 5 stars = pay + perStar).
        Each run on time adds runStar stars (up to maxStars). Below lateBelowEnergy % energy a run has lateChance of arriving late:
        it pays latePay of the fare and costs lateStar stars (never under minStars). tipChance of a tip between tip[0] and tip[1].
        At most maxRuns a day; runs count as work for the daily work limit and burnout. Rivals with no job, or a closed workplace, do runs too.
      tutor: tutoring a student at the City College, at most perDay a day, needs a completed qualification; pay is by your highest
        level (Certificate, Degree, Honours, Masters).
      creator: the 🎬 Creator app. A post takes `minutes` and `energy` and gains a number of followers between gain[0] and gain[1],
        times (1 + mediaBonus for each Creative Media level), times viralX on a viralChance; at most maxPosts a day.
        Each night sponsors pay followers x perFollower, give or take `swing` (0.5 = from half to one and a half).
        A day without a post loses `decay` of your followers. */
    side:{
      gig:{minutes:60, energy:-6, pay:16, perStar:4, baseStars:4, startStars:4, maxStars:5, minStars:1, runStar:0.1,
        lateBelowEnergy:35, lateChance:0.35, latePay:0.6, lateStar:-0.4, tipChance:0.2, tip:[2,6], maxRuns:4},
      tutor:{minutes:90, energy:-5, happiness:1, pay:[30,50,65,80], perDay:1},
      creator:{minutes:90, energy:-6, gain:[20,60], mediaBonus:0.5, viralChance:0.1, viralX:4, perFollower:0.05, swing:0.5, decay:0.03, maxPosts:2}
    },
    ui:{
      /* 1. Clock: the day starts at this hour. The HUD shows the time of day and a bar of how the day was spent. */
      clock:{startHour:7, use24h:false},
      /* 2. Trend arrows next to each vital: the change since you woke up. Changes smaller than this are not shown. */
      trend:{minChange:1},
      /* Floating numbers (+$, energy, happiness, knowledge) that pop up over the building after an action: seconds on screen. */
      floaterSeconds:3.5,
      /* Evening: with less than fromMinutes left in the day the town map darkens, from darkest*0.5 at fromMinutes to
            darkest when the day runs out (0 = off). It lights up again at the morning card, when the clock resets. */
      evening:{fromMinutes:600, darkest:0.5},
      /* 3. Toasts: short pop-ups that fade by themselves.
            vitalWarnings: pop up whenever a NEW warning appears (tired, low morale, rent due, no meal yet...).
            words: pop up when a Daily log line contains one of these phrases (lowercase). */
      toasts:{
        on:true, seconds:2, max:2, vitalWarnings:true,
        words:['you passed the interview','didn’t pass the interview','not enough relevant working experience','no openings now','you were promoted','laid off from','qualification earned',
              'lottery win','lost your home','food poisoning','rushed to hospital','is admitting you','released from the hospital','expelled from school','demotes you','late fee','broke down',
              'milestone:','you reached '],
        shorter:{seconds:1, words:['you passed the interview','didn’t pass the interview']}  // these toasts leave this many seconds sooner
      },
      /* 4. Action preview: pressing one of these buttons first shows what it will cost, and asks you to confirm.
            actions = button names. More you can add: 'nap','cook','treat','eatc','eatp','eatchips','checkup','ward','treat_ill','buy','groc','bundle','lotto' */
      preview:{on:true, actions:['work','class','study','gym']},
      /* 5. End-of-run recap: the three highest-scoring moments are shown. points = how big a deal it is.
            words = phrases to look for in the Daily log (lowercase). */
      moments:[
        {icon:'🏆', points:100, words:['milestone:','you reached ']},
        {icon:'🎰', points:90,  words:['lottery win']},
        {icon:'📉', points:85,  words:['laid off from']},
        {icon:'🚑', points:80,  words:['rushed to hospital','is admitting you']},
        {icon:'🚫', points:75,  words:['expelled from school']},
        {icon:'🏠', points:70,  words:['missed rent instalment','evicted','lost your home']},
        {icon:'🔻', points:70,  words:['demotes you']},
        {icon:'🎓', points:65,  words:['qualification earned']},
        {icon:'📈', points:62,  words:['you were promoted']},
        {icon:'💼', points:60,  words:['you passed the interview']},
        {icon:'🤢', points:50,  words:['food poisoning']}
      ]
    },
    /* traits: starting traits.
      The player picks one on the welcome screen (or none). Each trait is a list of CONFIG changes:
        {k:'sleep.awayShare', v:0.75}    sets that value to 0.75
        {k:'food.basic.cost', x:0.7}  multiplies the normal value by 0.7
      k is the path to any number in CONFIG above. 'plus' and 'minus' are the lines shown on the card, so keep them in step
      with the numbers. Remove a trait by deleting its block; set on:false to switch traits off. */
    traits:{
      on:true,
      list:[
        {id:'owl', icon:'🦉', name:'Night Owl',
        plus:'Resting and sleeping restore 25% more energy, and a night away from home helps 50% more.',
        minus:'Burning the candle: 1 extra health lost every night.',
        set:[{k:'sleep.rateX', x:1.25}, {k:'sleep.awayShare', v:0.75}, {k:'health.nightly.always', v:-1}]},
        {id:'frugal', icon:'🪙', name:'Frugal',
        plus:'Meal kit and ready-to-eat rice boxes cost 30% less, and bundles save 30% instead of 15%.',
        minus:'Cheap tastes: home meals cheer you up less.',
        set:[{k:'food.basic.cost', x:0.7}, {k:'food.premium.cost', x:0.7}, {k:'food.bundleDiscount', v:0.3},
              {k:'food.basic.happiness', v:1}, {k:'food.premium.happiness', v:6}]},
        {id:'book', icon:'📚', name:'Bookworm',
        plus:'Self-study teaches more (computer +8, tablet +6, phone +5) and you stop forgetting things overnight.',
        minus:'Self-study wears you out more (−8% energy an hour) and burnout starts after 9 hours of work and study a day.',
        set:[{k:'selfStudy.gain.computer', v:8}, {k:'selfStudy.gain.tablet', v:6}, {k:'selfStudy.gain.phone', v:5},
              {k:'selfStudy.nightlyLoss', v:0}, {k:'selfStudy.energyPerHour', v:-8}, {k:'burnout.loadMinutes', v:540}]},
        {id:'hardy', icon:'🛡️', name:'Hardy',
        plus:'You start with 90 health and fall ill about a fifth less often.',
        minus:'All work and no play: resting at home no longer lifts your mood.',
        set:[{k:'health.start', v:90}, {k:'illness.cutForEveryone', v:0.6}, {k:'sleep.napHappiness', v:0}]},
        {id:'lucky', icon:'🍀', name:'Lucky',
        plus:'Lottery tickets cost $8 and win 20% of the time instead of 12%.',
        minus:'Your luck does not cover your body: you start with 70 health.',
        set:[{k:'lottery.ticketCost', v:8}, {k:'lottery.winChance', v:0.2}, {k:'health.start', v:70}]}
      ]
    }
  };
  var ORD=['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
  function loadLimitTxt(){var m=CONFIG.burnout.loadMinutes;return m%60?hm(m):(m/60)+' hour'+(m===60?'':'s')}
  function dayN(n){return n+' day'+(n===1?'':'s')}
  /* the burnout and work-limit lines on the rules screen, from CONFIG */
  function paintBurnRules(){
    var BR=CONFIG.bankrupt,LN=CONFIG.loan;
    if($('cfgIllEn')){var IL=CONFIG.illness,pc=function(c){return Math.round(Math.max(0,c*IL.cutForEveryone-IL.minusForEveryone)*100)+'%'};
      $('cfgIllEn').textContent='once you have gone to bed with energy under '+IL.lowEnergyBelow+' on '+numWord(IL.lowNights)+' of the last '+numWord(IL.lowWindow)+' nights, about '+IL.byEnergy.filter(function(r){return r.energyUnder<100}).map(function(r){return pc(r.chance)+' a night under '+r.energyUnder+' energy'}).join(', ')+'. Until then it stays low, whatever your energy. During a pandemic, outbreak or lockdown illness is '+pctTxt(IL.pandemicX-1)+' more likely'}
    if($('cfgIll')){var IM=CONFIG.illness.mix,tot=0,HPx=CONFIG.hospital;Object.keys(IM).forEach(function(k){tot+=IM[k]});
      var rest=Object.keys(IM).filter(function(k){return HPx[k]&&HPx[k].rest}),hosp=Object.keys(IM).filter(function(k){return HPx[k]&&!HPx[k].rest}),nm=function(k){return HPx[k].name.replace(/^(a|the) /,'')};
      $('cfgIll').textContent='you catch '+Object.keys(IM).map(function(k){return nm(k)+' '+pctTxt(IM[k]/tot)}).join(', ')+' of the time. Every illness costs '+Math.abs(CONFIG.health.nightly.sick)+' health a night. '+
        (rest.length?rest.map(nm).join(' and ')+': each night you sleep at home there is a '+pctTxt(HPx.homeRecover)+' chance you recover; if that fails, only the Hospital can cure you. ':'')+
        (hosp.length?hosp.map(nm).join(' and ')+' must be treated at the Hospital.':'')}
    if($('cfgHousing')){var HZ=CONFIG.housing;$('cfgHousing').textContent='when a housing bubble bursts there is a '+pctTxt(HZ.loseChance)+' chance you lose your home. With no home there is no rent, every night counts as sleeping outside, and you cannot rest, cook, or use your fridge and gadgets (your things are kept in storage). Apply again at the Apartment ('+money(S?G(HZ.aptDeposit):HZ.aptDeposit)+' deposit) or the Villa (its move-in fee); applying takes '+hm(HZ.applyMinutes)+'.'}
    if($('cfgBankrupt'))$('cfgBankrupt').textContent='net worth under '+money(BR.netWorthBelow)+' at the end of '+numWord(BR.daysInARow)+' days in a row'+(BR.fromDay>1?' (counted from day '+BR.fromDay+')':'')+'.';
    if($('cfgLoanDefault'))$('cfgLoanDefault').textContent=LN.enabled?'you owe more than '+money(LN.defaultIfOwedAbove)+', or have not repaid your loan in full '+dayN(LN.graceDays)+' after its due date.':'not used (loans are switched off).';
    if($('cfgLoan'))$('cfgLoan').textContent=LN.enabled?'borrow at the Bank in '+money(LN.step)+' steps, up to your credit limit ('+money(LN.baseLimit)+' plus '+LN.limitPerAsset+' × your '+loanAssetsTxt()+', never more than '+money(LN.maxLoan)+'). Pick '+LN.tenures.map(function(t){return dayN(t.days)+' at '+rateTxt(t.rate)+' a day'}).join(', ')+' (simple interest, only for the days you keep it). Repay from cash any day after the one you borrowed (not the same day). After the due date the balance grows '+rateTxt(LN.overdueRate)+' a day'+(LN.overdueCompounds?', compounding':'')+'. One loan at a time, and what you owe counts against your net worth.':'loans are switched off.';
    var BU=CONFIG.burnout;
    $('cfgBurn').textContent='more than '+loadLimitTxt()+' a day of work and study together (shifts, school lessons and self-study), '+numWord(BU.daysInARow)+' day'+(BU.daysInARow===1?'':'s')+' in a row, costs '+Math.abs(BU.healthHit)+' health and cuts shift pay by '+pctTxt(1-BU.pay)+' for '+dayN(BU.lastsDays)+'.';
    if($('cfgWork'))$('cfgWork').textContent=hm(CONFIG.time.maxWorkMinutes);
    if($('cfgNight'))$('cfgNight').textContent=nightTxt();
    if($('cfgSleepHap'))$('cfgSleepHap').textContent=CONFIG.sleep.happinessPerHour+' happiness a full hour, for at most '+CONFIG.sleep.maxHappinessHours+' hours';
  }
  var NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
  function numWord(n){return NUMW[n]||String(n)}
  function sg(n){return (n<0?'−':'+')+Math.abs(n)}  /* +5 / −3 with a proper minus sign */
  /* what an action really changed (vitals stop at 0 and 100), so a log line never promises more than you got:
    v0=vitSnap(); ...change S...; vitTxt(v0) -> "+12% energy, +3 happiness, −2 health, +1 knowledge" */
  function vitSnap(){return {e:S.energy,h:S.happy,l:S.health,k:Math.floor(S.know)}}
  function vitTxt(v0){var a=[],k=Math.floor(S.know)-v0.k;
    if(S.energy!==v0.e)a.push(sg(S.energy-v0.e)+'% energy');if(S.happy!==v0.h)a.push(sg(S.happy-v0.h)+' happiness');
    if(S.health!==v0.l)a.push(sg(S.health-v0.l)+' health');if(k)a.push(sg(k)+' knowledge');
    return a.join(', ')}
  function vitPar(v0){var t=vitTxt(v0);return t?' ('+t+')':''}
  function pctTxt(x){return Math.round(x*100)+'%'}
  /* --- helpers that read CONFIG --- */
  function mk(k){var C=CONFIG.macro;return C.strength*(C[k]==null?1:C[k])}
  function clampPx(v){var L=CONFIG.limits;return Math.min(L.priceMax,Math.max(L.priceMin,v))}
  function clampWage(v){var L=CONFIG.limits;return Math.min(L.wageMax,Math.max(L.wageMin,v))}
  function clampRate(v){var L=CONFIG.limits;return Math.max(L.rateMin,Math.min(L.rateMax,v))}
  function clampMkt(v){var L=CONFIG.limits;return Math.max(L.marketMin,Math.min(L.marketMax,v))}
  /* scale a new multi-day trend by the macro dials */
  function scaleTrend(tr){
    tr.p=(tr.p||0)*mk('priceStrength');tr.w=(tr.w||0)*mk('wageStrength');
    tr.r=(tr.r||0)*mk('rateStrength');tr.mkt=(tr.mkt||0)*mk('marketStrength');
    tr.lay=Math.min(1,(tr.lay||0)*mk('layoffStrength'));tr.cls=Math.min(1,(tr.cls||0)*mk('layoffStrength'));
    return tr;
  }
