  /* ==================================================================
     6. EVENTS AND THE ECONOMY
     Content tables (NEWS, CHOICES, MACRO, SAGAS, TWISTS, STORIES), the effect tokens (applyFx), macro trends and the end-of-day card (pickNight, endWeek).
     ================================================================== */
  /* ---------- daily events: personal, economic news, yes/no decisions ---------- */
  var NEWS=[
    ["OPEC+ announces deep oil output cuts","Fuel and freight costs ripple through shop shelves.","p+8~20"],
    ["Drought hits the world's biggest grain exporters","Bread, noodles and cereal all cost more.","p+10~25"],
    ["Container ship blocks a key shipping canal","Imports pile up at sea and prices creep higher.","p+5~15"],
    ["Global chip shortage empties electronics aisles","Anything with a circuit board gets pricier.","p+10~30"],
    ["Currency slump makes imports expensive","Your dollar buys less at the checkout.","p+8~20 w-1"],
    ["Trade war: sweeping new tariffs on imported goods","Shops pass the extra duty on to you.","p+10~30"],
    ["Wheat prices double after an export ban","Staples jump in price almost overnight.","p+20~50"],
    ["Cocoa and coffee harvests fail","Cafes and snack shops raise their prices.","p+5~12"],
    ["Palm oil exports halted; cooking oil crisis","Fast food and groceries both reprice.","p+15~35"],
    ["Gas supply fears send energy bills soaring","Shops and restaurants add energy surcharges.","p+12~30 r+0.1~0.3"],
    ["Port workers strike; shipments back up worldwide","Shelves thin out and prices climb.","p+6~18"],
    ["Fertiliser shortage drives up food costs","Farmers pass on higher growing costs.","p+10~25"],
    ["Heatwave wrecks vegetable crops across the region","Fresh produce becomes a luxury item.","p+8~20"],
    ["Freight rates hit record highs","Everything shipped by sea costs extra.","p+10~28"],
    ["Rice export curbs rattle Asian markets","The humble bowl of rice gets expensive.","p+15~40"],
    ["Reopening boom: pent-up demand floods the shops","Retailers raise prices, but also pay a bit more.","p+8~18 w+2"],
    ["Wage-price spiral worries economists","Bosses raise pay, shops raise prices, repeat.","p+10~25 w+3"],
    ["Stimulus cheques arrive as money supply balloons","You get a little cash, and so do the prices.","p+15~35 c+40~80"],
    ["Hyperinflation scare spooks regional markets","Panic buying empties the shops; the bank hikes.","p+30~50 r+0.3~0.6"],
    ["Shop rents soar; retailers pass on the cost","Small businesses add a surcharge.","p+5~10"],
    ["Bird flu outbreak triggers egg and poultry shortage","Protein prices spike.","p+10~22"],
    ["Sugar squeeze lifts snack and drink prices","Your treats get a little dearer.","p+5~12"],
    ["Copper and steel surge on a global building boom","Appliances and gadgets cost more.","p+8~20"],
    ["Floods shut factories in a major manufacturing hub","Supply dries up and prices jump.","p+10~30"],
    ["Shipping insurance premiums jump","Costs trickle down to the shops.","p+5~14"],
    ["Power grid failure hits several industries","Production slows and goods get scarcer.","p+8~18 e-5"],
    ["War disrupts a major gas pipeline","Heating and food-processing costs spike.","p+20~45"],
    ["Rare-earth export curbs pinch gadget makers","Electronics prices climb.","p+12~28"],
    ["Fuel subsidy scrapped overnight","Transport costs jump and goods follow.","p+10~22"],
    ["Supermarkets blame 'shrinkflation' and rising costs","Smaller packs, higher prices.","p+5~10"],
    ["Oil glut: crude prices tumble","Fuel is cheaper and so is nearly everything shipped.","p-5~15"],
    ["Bumper harvest floods the food markets","Groceries get a lot cheaper.","p-8~20"],
    ["Consumer demand collapses; retailers slash prices","Bargains everywhere, but shops are worried.","p-10~25"],
    ["Strong currency makes imports cheaper","Your dollar stretches further.","p-5~12"],
    ["Shipping costs fall back to normal","Shelves refill and prices ease.","p-5~15"],
    ["Electronics price war breaks out","Dealers cut deals to win customers.","p-10~30"],
    ["Property crash drags prices lower","Spending dips and shops discount.","p-8~20"],
    ["Government caps prices on staples","Essentials get cheaper, for now.","p-5~15"],
    ["New refinery opens; fuel prices slide","Lower transport costs reach the shops.","p-5~12"],
    ["Holiday overstock fills the warehouses","Clearance sales everywhere.","p-10~30"],
    ["Mild winter slashes energy demand","Heating bills and shop prices ease.","p-5~10"],
    ["Deflation fears: prices have fallen for months","The bank trims rates and employers trim pay.","p-5~10 r-0.2~0.4 w-1"],
    ["Labour shortage forces employers to raise pay","Bosses are bidding for workers.","w+2~6"],
    ["Parliament approves a minimum wage rise","Pay floors lift across the board.","w+2~5 p+5~8"],
    ["Unions win an industry-wide pay deal","Shift pay rises everywhere.","w+3~6"],
    ["Factory orders boom; plants are hiring","Employers sweeten their offers.","w+2~4"],
    ["Skills shortage: technicians in demand","Skilled shift rates go up.","w+2~5"],
    ["Productivity gains lead to annual pay bumps","A small but welcome rise.","w+1~3"],
    ["Record exports lift factory bonuses","Pay and a one-off bonus.","w+2~4 c+20~60"],
    ["Cost-of-living allowance announced","A small raise and a one-time payment.","w+1~3 c+30~70"],
    ["Tight job market; firms are poaching staff","Employers raise pay to keep you.","w+2~5"],
    ["Wage subsidy scheme extended by the government","Employers can afford a small raise.","w+1~3"],
    ["Employers freeze pay amid uncertainty","Bosses trim shift rates.","w-1~3"],
    ["Gig platforms cut pay per job","Rates fall across the sector.","w-2~5"],
    ["Automation wave cuts factory hours","Shift pay is shaved.","w-2~4"],
    ["Firms move to shorter days and lower pay","Everyone earns a little less.","w-3~6"],
    ["Overseas competition squeezes factory margins","Employers cut wages to compete.","w-1~3"],
    ["Austerity budget slashes public-sector wages","The knock-on hits everyone's pay.","w-2~5"],
    ["Shoppers stay home; retailers trim shifts and pay","Pay softens around town.","w-1~4"],
    ["Strong dollar hurts exporters; pay trimmed","Employers tighten their belts.","w-1~3"],
    ["Central bank hikes rates to tame inflation","Savers smile: your bank pays more interest.","r+0.2~0.5"],
    ["Bond yields jump; banks lift savings rates","Deposit rates move up.","r+0.2~0.4"],
    ["Inflation hotter than expected; more hikes signalled","Savings rates climb again.","r+0.3~0.6"],
    ["Banks compete for deposits with higher rates","Your savings earn a bit more.","r+0.1~0.3"],
    ["Credit tightens as lenders raise rates","Deposit rates edge up too.","r+0.2~0.5"],
    ["Central bank defends the currency with a sharp hike","Interest rates leap higher.","r+0.4~0.8"],
    ["Government debt worries push yields up","Banks pay more to attract savers.","r+0.2~0.5"],
    ["Bank-run fears: deposit rates rise to attract cash","Banks sweeten their savings accounts.","r+0.3~0.6"],
    ["Strong jobs report convinces the central bank to hike","Savings rates tick up.","r+0.1~0.3"],
    ["Banks reward loyal depositors","A small rate bump for savers.","r+0.1~0.2"],
    ["Central bank cuts rates to boost growth","Savers earn less.","r-0.2~0.5"],
    ["Emergency rate cut after market turmoil","Interest rates fall fast.","r-0.3~0.7"],
    ["Quantitative easing floods banks with cash","Banks no longer need your deposits.","r-0.2~0.4"],
    ["Weak GDP figures prompt policymakers to ease","Savings rates slip.","r-0.1~0.3"],
    ["Banks trim savings rates as loan demand slows","Your interest gets smaller.","r-0.1~0.3"],
    ["Global slowdown: rates head toward zero","Savings earn very little.","r-0.3~0.6"],
    ["Deflation worries lead the central bank to cut","Rates and prices both drift down.","r-0.2~0.4 p-5~8"],
    ["Housing slump forces rate cuts","The bank trims what it pays savers.","r-0.2~0.5"],
    ["Financial crisis: a major bank collapses","Markets panic. Firms cut staff; rates are slashed.","j2~4 r-0.3~0.6 p-5~10"],
    ["Recession declared; firms shut their doors","Workplaces across town close for a few days, yours included.","j2~3"],
    ["Pandemic lockdown shuts workplaces","Employers close, and supplies get tight.","j2~4 p+5~10"],
    ["Supply-chain breakdown halts assembly lines","Factories stop hiring while prices rise.","j1~3 p+8~20"],
    ["Stock market crash wipes out trillions","Confidence collapses and rates fall.","j1~3 h-10 r-0.2~0.4"],
    ["Currency crisis: businesses cut staff","Imports cost far more and jobs vanish.","j1~3 p+15~35"],
    ["Tech bubble bursts; hiring freezes everywhere","Pay softens and positions vanish.","j2~3 w-2~4"],
    ["A major employer files for bankruptcy","Local firms lose orders and shed workers.","j2~4"],
    ["Debt-default fears freeze credit","Firms lay off staff; banks lift rates.","j1~3 r+0.3~0.6"],
    ["Housing bubble pops; construction jobs vanish","Hiring dries up, prices ease.","j2~4 p-5~12"],
    ["Trade embargo shuts off export orders","Factories cut staff; imports cost more.","j1~3 p+10~25"],
    ["Cyber attack paralyses the logistics network","Delivery chaos pauses hiring.","j1~2 p+5~12"],
    ["Stock market rally lifts confidence","The mood in town improves.","h+5~10 w+1~2"],
    ["Tourism rebound fills shops and cafes","Business is brisk and pay rises a little.","w+1~3 h+5"],
    ["Government hands out shopping vouchers","A little windfall for everyone.","c+40~90"],
    ["Tax relief package: take-home pay rises","Your pay and your pocket both benefit.","w+1~3 c+20~50"],
    ["Housing market cools; the mood calms","A sigh of relief across town.","h+3~6"],
    ["Energy-saving subsidy cuts household bills","A little extra cash today.","c+20~50"],
    ["New trade deal slashes import duties","Goods get cheaper and employers hire.","p-8~20 w+1~2"],
    ["Tech giant opens a regional hub; jobs plentiful","Hiring is back: closed workplaces reopen sooner.","w+2~4 j-2"],
    ["Economy surprises with strong growth","Wages tick up, and so do rates.","w+1~3 r+0.1~0.2"],
    ["Soft landing: inflation cools without a recession","Prices ease and spirits lift.","p-5~10 r-0.1~0.2 h+5"]
  ];
  var CHOICES=[
    ["A coworker swears a new crypto coin is a sure thing. Put in $100?",[0.35,"The coin spikes and you cash out fast.","c+250","The coin crashes to zero.","c-100"],[1,"You pass. Boring, but safe.",""]],
    ["A neighbour is selling a used bike for $60. Buy it?",[0.7,"It saves you bus fares and walking.","c+20 h+5","The chain snaps on day one.","c-60 h-5"],[1,"You keep walking.",""]],
    ["Lottery ticket for $10?",[0.12,"You win $120!","c+110","Not a winner.","c-10"],[1,"You keep your tenner.",""]],
    ["A friend asks to borrow $50. Lend it?",[0.6,"They repay you with a thank-you coffee.","c+10 h+5","They vanish with the cash.","c-50 h-5"],[1,"Awkward, but you keep your cash.","h-3"]],
    ["A charity collector stops you. Donate $20?",[1,"You feel good about it.","c-20 h+8"],[1,"You walk on.","h-2"]],
    ["Your boss offers an extra shift tonight. Accept?",[0.7,"There's a $60 bonus in it.","c+60 e-10","You're exhausted and make a mistake.","e-20 h-5"],[1,"You rest at home.","e+5"]],
    ["Bulk-buy groceries on a flash sale for $40?",[0.65,"Great value and you eat well.","c+15 e+10","Half of it spoils.","c-25"],[1,"You skip the sale.",""]],
    ["A second-hand scooter is up for $120. Buy it?",[0.55,"Commuting gets faster and you pick up delivery gigs.","c+80 h+5","It needs repairs straight away.","c-120 h-5"],[1,"You stay on foot.",""]],
    ["A neighbour's food stall needs $80 investment. Back it?",[0.4,"The stall takes off and pays you back double.","c+80","The stall folds.","c-80"],[1,"You keep your savings.",""]],
    ["Colleagues are marching for better pay. Join them?",[0.5,"Management offers a raise.","w+2 h+5","Your pay is docked for the day.","c-30 h-5"],[1,"You keep working.",""]],
    ["The bank offers a 'premium' savings account. Switch?",[0.6,"The bank bumps your rate.","r+0.2","Hidden fees chew your savings.","b-30"],[1,"You keep things simple.",""]],
    ["You find a wallet with $80 on the sidewalk. Keep the cash?",[0.5,"Nobody ever claims it.","c+80","A camera caught you; you pay a fine.","c-40 h-8"],[1,"You hand it in and the owner rewards you.","c+20 h+8"]],
    ["A gym membership costs $40 today. Join?",[0.6,"You feel stronger and sleep better.","c-40 e+15 h+5 l+3","You never go.","c-40"],[1,"You skip the gym.",""]],
    ["A new street-food stall looks tempting. Try it?",[0.75,"Delicious!","h+8","Food poisoning.","e-20 h-8"],[1,"You stick to what you know.",""]],
    ["The landlord offers a $60 discount if you repaint the hallway. Take it?",[0.6,"A tidy job and he pays up.","c+60 e-10","The paint job is a mess; he deducts $30.","c-30 e-10"],[1,"You keep your weekend free.","h+3"]],
    ["A friend invites you to a concert ($50). Go?",[0.8,"Best night in months.","c-50 h+20","Rain ruins it.","c-50 h-5"],[1,"You stay in.","h-3"]],
    ["A taxi driver tips you a hot stock. Put in $100?",[0.3,"It pops.","c+150","It drops.","c-100"],[1,"You ignore the tip.",""]],
    ["Your coworkers start a $15 lottery pool. Join?",[0.15,"The pool wins!","c+90","Nothing comes up.","c-15"],[1,"You pass.",""]],
    ["A charity fun run starts at dawn. Enter?",[0.7,"You feel great and meet new friends.","h+10 e-10","You twist an ankle.","e-25 h-5"],[1,"You sleep in.","e+5"]],
    ["A courier company needs night drivers. Take the gig?",[0.6,"Tips are generous.","c+70 e-15","A rainstorm kills the tips.","e-20"],[1,"You stay in.",""]],
    ["A stranger offers cheap 'branded' sneakers for $40. Buy?",[0.4,"They look brilliant.","c-40 h+8","They fall apart.","c-40 h-5"],[1,"You decline.",""]],
    ["An online course promises a pay boost for $100. Enrol?",[0.55,"Your new skills get noticed.","w+3 c-100","It's mostly fluff.","c-100"],[1,"You stay with what you know.",""]],
    ["Your boss asks you to cover a colleague's shift for free. Agree?",[0.6,"Grateful, they owe you a favour and a bonus.","c+40 h+3","Nobody notices.","e-15 h-5"],[1,"You decline politely.",""]],
    ["A mystery email says you've won a prize. Click the link?",[0.1,"It's real: $90 lands in your pocket.","c+90","It's a scam and drains your wallet.","c-80 h-8"],[1,"You delete it.","h+2"]],
    ["A pawn broker offers cash for your old phone: $50. Sell?",[1,"Easy money and one less gadget.","c+50"],[1,"You keep it.",""]],
    ["The restaurant next door hands out free tasting samples. Queue up?",[0.8,"A delicious free lunch.","e+10 h+3","The queue is miles long.","e-5"],[1,"You skip it.",""]],
    ["A tout offers cheap tickets to a football match ($30). Buy?",[0.6,"Great seats.","h+12 c-30","The tickets are fake.","c-30 h-8"],[1,"You decline.",""]],
    ["A bank teller says you qualify for a loan 'bonus'. Take it?",[0.3,"A $60 sign-up bonus arrives.","c+60","The paperwork costs you $60.","c-60"],[1,"You decline.",""]],
    ["A friend wants you to co-sign his car loan. Agree?",[0.3,"He repays on time and thanks you with $40.","c+40 h+5","He defaults and you cover the payment.","c-100 h-8"],[1,"You say no.","h-3"]],
    ["You see a pop-up flea market. Spend $30 browsing for bargains?",[0.6,"You score a bargain you resell for $70.","c+40","Nothing but junk.","c-30"],[1,"You skip it.",""]],
    ["Your cousin offers a part-time shift at his stall. Accept?",[0.7,"He pays well in cash.","c+50 e-10","It rains and nobody turns up.","e-10 h-3"],[1,"You decline.",""]],
    ["A neighbour asks you to babysit for $40. Accept?",[0.8,"Easy money and lovely kids.","c+40 h+3","The kids wreck your evening.","e-15 h-5"],[1,"You stay in.","e+3"]],
    ["A bar offers a '$20 all-you-can-drink' night. Go?",[0.5,"A lively, fun night.","c-20 h+12","You wake up with a pounding headache.","c-20 e-25 h-5"],[1,"You stay in.",""]],
    ["A pushy salesman offers a 'miracle' vitamin pack for $40. Buy?",[0.3,"You feel energised.","e+15 c-40","Placebo. You're out $40.","c-40"],[1,"You decline.",""]],
    ["A street performer asks for a tip. Give $5?",[1,"A smile and a song.","c-5 h+4"],[1,"You keep walking.",""]],
    ["Your landlord wants to renew early at a 'special' rate. Sign?",[0.5,"He knocks $40 off today's rent talks.","c+40","He sneaks in a $40 admin fee.","c-40"],[1,"You hold off.",""]],
    ["A mate suggests splitting a cheap flat for a month. Say yes?",[0.6,"You split costs and save $60.","c+60 h+3","He leaves a mess and a bill.","c-30 h-8"],[1,"You decline.",""]],
    ["A pop-up job fair needs your afternoon. Attend?",[0.6,"You land a nice tip for a better job.","w+2 h+5","A waste of an afternoon.","e-10"],[1,"You skip it.",""]],
    ["A market stall sells cheap secondhand tools. Buy a toolkit for $50?",[0.7,"You fix things yourself and save money.","c+30","Half the tools are rusty.","c-50"],[1,"You skip it.",""]],
    ["Stock market is falling. Pull $100 out of the bank to buy the dip?",[0.5,"The market recovers nicely.","c+80","It keeps falling.","c-100"],[1,"You hold steady.",""]],
    ["A coupon booklet costs $20 but promises savings. Buy it?",[0.65,"You save plenty.","c+40","You never use it.","c-20"],[1,"You decline.",""]],
    ["Your phone is cracked. Pay $50 to fix it now?",[0.8,"It works perfectly and you feel better.","h+5 c-50","The repairman botches it.","c-50 h-5"],[1,"You live with the crack.","h-2"]],
    ["A relative offers you an old suit jacket, free. Take it?",[0.6,"It's a perfect fit; it saves you cash.","c+30","It reeks of mothballs.","h-3"],[1,"You politely refuse.",""]],
    ["A tempting charity raffle: $10 for a ticket. Buy?",[0.1,"You win a gift hamper worth $80!","c+70","Not today.","c-10"],[1,"You pass.",""]],
    ["A new bakery offers a free loaf to the first 20. Queue?",[0.5,"You get a loaf and a smile.","e+10 h+4","They run out right before you.","e-5"],[1,"You skip it.",""]],
    ["The city offers a free health check. Go?",[0.7,"A clean bill of health lifts your mood.","h+8","A long wait wastes your time.","e-10"],[1,"You skip it.",""]],
    ["An online forum suggests a 'free money' trading app. Try it?",[0.2,"You net a $60 bonus.","c+60","It's a scam; it clears your balance.","c-80 h-10"],[1,"You steer clear.",""]],
    ["A sudden pay-day loan offer: take $100 today?",[0.2,"You repay quickly with little interest.","c+90","Sky-high fees bite hard.","c-60 h-5"],[1,"You decline.",""]],
    ["A restaurant manager offers you a trial shift as a server. Try it?",[0.7,"You earn good tips.","c+60 e-10","The shift is a nightmare.","e-20 h-5"],[1,"You decline.",""]],
    ["A bus strike is on. Walk the long way home?",[0.7,"The walk clears your head.","h+5 e-5","You get soaked.","e-15 h-3"],[1,"You take a pricey taxi.","c-20"]],
    ["A rumour says your bank may fail. Pull out the cash you have in the bank?",[0.45,"Word spreads and the queue is huge, but you relax knowing you are safe.","h+8","It was only a rumour. You lose a bit of interest.","b-20"],[1,"You stay calm.","h-2"]],
    ["A rich neighbour hires you to wash his car for $40. Accept?",[0.8,"Easy cash.","c+40 e-5","He underpays you.","c+20 e-5"],[1,"You rest.","e+5"]],
    ["Supermarket offers 'buy two get one free' on drinks. Stock up $30?",[0.7,"You save a lot.","c+15 h+3","They go flat and warm.","c-30"],[1,"You skip it.",""]],
    ["A thrift shop wants volunteers for a stock count. Help out?",[0.7,"They give you a $30 voucher.","c+30 h+3","Dusty work, no thanks.","e-10"],[1,"You decline.",""]],
    ["A salesman offers an 'extended warranty' for $40. Take it?",[0.2,"It saves you from an expensive repair.","c+90","Useless. It never covers anything.","c-40"],[1,"You decline.",""]],
    ["An old friend invites you to dinner. Go?",[0.85,"A warm, wonderful evening.","h+15 e+5","They spend the night complaining.","h-5 e-5"],[1,"You stay in.","h-4"]],
    ["A neighbour is moving away and giving away furniture. Take a sofa?",[0.7,"A comfy sofa for free.","h+8","It's riddled with stains.","h-3 e-10"],[1,"You pass.",""]],
    ["A scooter app offers a 'free first day'. Sign up?",[0.5,"Fast, cheap commutes.","e+8","They bill you anyway.","c-30"],[1,"You decline.",""]],
    ["A local radio quiz offers $50. Phone in?",[0.25,"You win!","c+50","You fail on the first question.","h-3"],[1,"You don't bother.",""]],
    ["A mobile-game friend suggests a pay-to-win app. Spend $20?",[0.3,"You make it to the top and get a gift card.","c+30 h+5","You waste the cash.","c-20"],[1,"You skip the game.",""]],
    ["Your employer offers an unpaid training day. Attend?",[0.55,"A promotion looks closer.","w+3","A total waste of time.","e-10 h-3"],[1,"You skip it.",""]],
    ["A new fitness trend promises results with a $30 course. Join?",[0.55,"You feel fantastic.","e+15 c-30","It's a gimmick.","c-30"],[1,"You decline.",""]],
    ["A shopkeeper offers you a loyalty card with a $10 fee. Sign up?",[0.65,"Discounts add up nicely.","c+25","You never use it.","c-10"],[1,"You decline.",""]],
    ["A local bank runs a savings contest. Enter for a $10 fee?",[0.3,"You win a $60 prize.","c+50","No luck, just a thank-you pen.","c-10"],[1,"You skip it.",""]],
    ["A group-buy for bulk rice saves money if 10 people join. Join in?",[0.7,"It works. Cheap rice for days.","c+20 e+5","The organiser disappears.","c-30"],[1,"You decline.",""]],
    ["A fellow commuter offers to split a ride each day. Say yes?",[0.8,"You save on fares.","c+20","He's late every day.","e-8"],[1,"You decline.",""]],
    ["A bargain-hunter forum shares a 'secret' warehouse sale. Go?",[0.5,"Fantastic bargains!","c+40 h+4","The warehouse is miles away and bare.","e-10"],[1,"You skip it.",""]],
    ["You have a free evening. Take a night class for $30?",[0.6,"You learn something valuable.","w+1 h+4 c-30","The class is cancelled.","c-30 h-3"],[1,"You relax.","h+3"]],
    ["The landlord offers a cheap pest-control package for $40. Take it?",[0.7,"No more critters.","c-40 h+5","He did a sloppy job.","c-40 h-3"],[1,"You decline.","h-2"]],
    ["A friend runs a half-price haircut in his kitchen. Go?",[0.65,"A great cut.","h+8 c-10","It's a disaster.","h-8"],[1,"You skip it.",""]],
    ["You spot a 'going out of business' sale. Spend $50?",[0.6,"Amazing bargains.","c+30 h+5","Everything is junk.","c-50"],[1,"You skip it.",""]],
    ["A bank manager invites you to a financial planning seminar. Attend?",[0.6,"You learn to save better.","r+0.1 h+3","It's a hard sell on insurance.","e-5"],[1,"You decline.",""]],
    ["A rich uncle might give you some cash if you visit. Go?",[0.4,"He slips you $80.","c+80 h+5","A tedious afternoon with no reward.","e-10 h-3"],[1,"You stay home.",""]],
    ["A hot job tip: a new factory is hiring. Skip a shift to line up?",[0.4,"You get the job offer and a raise.","w+3","You waste the morning.","e-10"],[1,"You work as usual.",""]],
    ["A shop sells discounted expired-date snacks. Buy a box for $15?",[0.6,"Still tastes fine.","c-15 e+10","Stomach ache.","c-15 e-15"],[1,"You decline.",""]],
    ["A tourist asks you to guide them for the afternoon. Help?",[0.7,"They tip $50.","c+50 h+4","They're lost and cranky.","e-10"],[1,"You decline.",""]],
    ["The council holds a clean-up day with free lunch. Join?",[0.8,"A friendly day and a free lunch.","h+8 e-5","It pours with rain.","e-15"],[1,"You skip it.",""]],
    ["A shady guy offers to 'fix' your parking fine for $40. Pay him?",[0.1,"It works.","c+0","He pockets the cash and runs.","c-40 h-5"],[1,"You pay the fine properly.","c-20"]],
    ["A dating app promises 'serious' matches for $20. Subscribe?",[0.5,"A lovely evening out.","c-20 h+12","Nothing but spam.","c-20 h-3"],[1,"You skip it.",""]],
    ["Your car-owning friend offers to drive you to the cheaper market. Go?",[0.7,"You stock up cheaply.","c+30","The cheaper market is closed.","e-5"],[1,"You stay local.",""]],
    ["A neighbour's cat is stuck in a tree. Climb up?",[0.7,"The grateful owner gives you $20.","c+20 h+6","You fall and bruise your pride.","e-20 h-4"],[1,"You call for help.",""]],
    ["A pop-up stall offers a second-hand TV for $40. Buy?",[0.6,"The picture is great.","c-40 h+8","The picture flickers.","c-40 h-3"],[1,"You decline.",""]],
    ["A job ad: 'no experience needed, pay up front'. Apply?",[0.3,"A genuine job, and you get paid.","c+80","A scam. They want a $50 fee.","c-50 h-5"],[1,"You scroll past.",""]],
    ["You can sublet your sofa to a traveller for $50. Do it?",[0.7,"Easy money.","c+50","They leave a mess.","c-20 h-5"],[1,"You decline.",""]],
    ["A friend forgot his wallet at lunch and asks you to cover $20. Pay?",[0.7,"He pays you back double.","c+20 h+3","He forgets.","c-20"],[1,"You decline.","h-3"]],
    ["A colleague asks you to swap shifts so he can attend a wedding. Agree?",[0.7,"He returns the favour with a day off.","h+8","Nothing comes of it.","e-10"],[1,"You decline.",""]],
    ["A weekend market lets you sell old stuff for $20 stall fee. Rent a stall?",[0.6,"You sell lots and earn $70.","c+50","Nobody buys anything.","c-20"],[1,"You decline.",""]],
    ["A coffee shop has a $15 trivia night. Play?",[0.3,"You win a $50 voucher.","c+35 h+8","You lose.","c-15 h-2"],[1,"You skip it.",""]],
    ["An old classmate wants to start a small delivery business. Put in $100?",[0.35,"The business flies.","c+200","The business flops.","c-100"],[1,"You pass.",""]],
    ["The bank is closing a branch. Move your $100 savings to a rival bank with a bonus?",[0.65,"A $30 welcome bonus.","c+30","A sneaky fee eats $30.","b-30"],[1,"You stay put.",""]],
    ["A stranger offers to sell you an 'investment' in a new gadget for $60. Back it?",[0.25,"The gadget is a hit.","c+140","The gadget never ships.","c-60"],[1,"You decline.",""]],
    ["A holiday weekend: spend $60 on a day trip?",[0.85,"A refreshing break.","h+15 e+10 c-60","It rains all day.","c-60 h-3"],[1,"You stay home.","h-3"]],
    ["A friend wants to set you up with a job interview at his firm. Go?",[0.55,"You impress them and get a raise.","w+3 h+5","Not a good fit.","h-3"],[1,"You decline.",""]],
    ["A street vendor sells a $50 'lucky charm'. Buy?",[0.1,"You find $80 that afternoon!","c+30","Nothing happens.","c-50"],[1,"You decline.",""]],
    ["Your phone company offers an upgrade for $80. Accept?",[0.55,"A faster, nicer phone.","h+8 c-80","The upgrade is buggy.","c-80 h-4"],[1,"You decline.",""]],
    ["An elderly neighbour needs help carrying groceries. Offer to help?",[0.9,"She gives you $15 and a smile.","c+15 h+8","She hands you a heavy load.","e-10"],[1,"You hurry past.","h-3"]],
    ["A courier delivers a wrong parcel full of gadgets. Keep it?",[0.4,"No one ever claims it.","c+80","The sender traces it and you pay a fine.","c-60 h-8"],[1,"You return it and get a $20 thank-you.","c+20 h+5"]],
    ["An accountant offers to 'optimise your taxes' for $60. Hire him?",[0.5,"He saves you a lot.","c+90","He's a fraud.","c-60"],[1,"You file it yourself.",""]],
    ["A neighbour's teen offers to wash your clothes for $10. Pay?",[0.7,"Clean clothes and a happy teen.","e+5 c-10","He shrinks your shirt.","c-10 k-1"],[1,"You do it yourself.","e-3"]],
    ["A rumour says your employer might cut staff. Look for a second job now?",[0.6,"Good decision: you find a better gig.","c+60 w+2","You waste energy.","e-15"],[1,"You carry on.",""]],
    ["Your flatmate's cat has figured out the fridge door. Buy a $15 child-proof latch?",[0.5,"The cat is furious. The milk survives.","c-15 h+3","The cat learns to beat it within a day.","c-15 h-2"],[1,"You let the cat win.","h+1"]],
    ["Your mum wants you home for dinner, but the bus takes 90 minutes. Pay $25 for a taxi?",[0.8,"She's thrilled and feeds you twice.","c-25 h+6","The driver takes the scenic route through Ang Mo Kio.","c-25 h-2"],[1,"You eat instant noodles and call it dinner.","e+3"]],
    ["Your group chat is planning a surprise party for a friend who hates surprises. Chip in $30?",[0.6,"The friend pretends to be delighted. Everyone is proud of you.","c-30 h+4","Nobody tells the friend. The cake is still a surprise, sadly.","c-30 h-2"],[1,"You mute the group chat.",""]],
    ["A neighbour wants to start a book club in your living room. Offer the sofa?",[0.7,"Four people turn up and argue about the ending.","h+5 n+2","The club reads the back cover and leaves early.","h-2"],[1,"You keep your living room to yourself.",""]],
    ["You swear you'll go to the gym tomorrow. Pay $60 for a six-month membership?",[0.3,"You go twice. The receipt is still in your wallet.","c-60 h+2","The gym is on the far side of the island.","c-60 h-3"],[1,"You do squats in front of the TV instead.","e+4 h+2"]],
    ["A pigeon has built a nest on your balcony. Hire a pest controller for $45?",[0.5,"The pigeon moves out. You name it Dave anyway.","c-45 h+3","The nest is back in a week, with a second pigeon.","c-45 h-2"],[1,"You leave it. The pigeon is not paying rent.","h-1"]],
    ["Your phone screen has cracked again. Buy a $30 screen protector?",[0.5,"Protected at last, you think.","c-30 h+2","The protector bubbles and stays bubbled.","c-30 h-2"],[1,"You squint at the screen and carry on.","e-2"]],
    ["Your ex texts: 'You still have my hoodie.' Pay $10 bus fare to hand it back?",[0.5,"It's ten awkward minutes. Closure, sort of.","c-10 h+3","It turns out the hoodie was never yours. Wasted fare.","c-10 h-3"],[1,"You bag it up and forget about it.",""]],
    ["Your gran wants you to join mahjong night 'as a fourth'. Stay until 1am for free?",[0.5,"You win $15 from her cousin's pot.","c+15 h+4","Gran's lucky tiles beat you on every round.","e-8 h-2"],[1,"You claim you have an early shift.","h-1"]],
    ["Your coworker wants to try a new bubble tea place with a 40-minute queue. Join?",[0.7,"Worth it. Brown sugar pearls, perfect.","c-8 h+4","They sell out of everything right before you reach the counter.","c-8 e-5 h-2"],[1,"You walk past. You will regret this.","h-1"]],
    ["A stranger on the MRT offers to sell you a durian for $20. Say yes?",[0.4,"It's surprisingly good. You share it with strangers.","c-20 h+5","It smells like a gym bag in the flat for a week.","c-20 h-4"],[1,"You let the durian go to the next stop.",""]],
    ["You promised your boss the report by Friday. Stay up all night to finish it?",[0.6,"It's done. Your boss says 'nice' and asks for more.","e-15 h+3 c+20","You fall asleep on the keyboard. The deadline slips.","e-15 h-4"],[1,"You send an apology email at 4pm on Thursday.","h-2"]],
    ["Your aunt wants your opinion on her 'can't-lose' multi-level plan. Listen politely for an hour?",[0.5,"You survive the hour and dodge the sales pitch.","e-6 h+1","She signs you up for a cleaning product kit.","c-40 h-3"],[1,"You nod, smile and check your phone.","h-1"]],
    ["Your kopitiam uncle offers his secret stock tip over breakfast. Pay $12 for the kopi?",[0.25,"The tip is terrible but the kopi is great.","c-12 h+2","The tip is a company that went bust last year.","c-12 h-2"],[1,"You order teh-C and keep your opinions to yourself.","h+1"]],
    ["A friend asks if you can help her move house on Sunday. Give up your day off?",[0.9,"You carry 12 boxes and get pizza. Good day.","e-12 h+4","The boxes are all books, and the lift is broken.","e-18 h-3"],[1,"You claim a prior engagement with a sofa.","h-2"]],
    ["Your fitness watch wants one more active minute before bed. Walk around the block?",[0.7,"Ring closed. The watch plays a confetti animation.","e-5 h+3","You get home and your legs file a complaint.","e-5"],[1,"You let the ring stay open. Tomorrow's problem.","h-1"]],
    ["The HDB lift keeps stopping at every floor. Walk up instead?",[0.5,"Ten flights later, you feel like a new person.","e-10 l+2","You are still on floor 9 when the lift comes back down.","e-10 h-2"],[1,"You wait by the lift and nod at the same neighbour again.","h+1"]],
    ["A street busker asks you to pay $5 to appear in his video. Do it?",[0.5,"He sings your name. Gloriously embarrassing.","c-5 h+4","The video goes viral for all the wrong reasons.","c-5 h-3"],[1,"You walk past with your head down.",""]],
    ["Your roommate's plant is dying. Pay $8 for plant food and pretend you knew what you were doing?",[0.5,"It perks up. You're a hero to the plant.","c-8 h+2","Nothing changes. The plant gives you a look.","c-8 h-1"],[1,"You quietly apologise to the plant.",""]],
    ["Your laundry has sat in the machine for two days. Pay for the dryer?",[0.7,"Dry, warm and smelling like a hotel.","c-4 h+3","The machine ate a sock and a button.","c-4 h-2"],[1,"You hang it on the balcony and hope for sun.","e-3"]],
    ["Your neighbour's dog has found a hole in the fence and keeps visiting your bins. Pay $35 to fix it?",[0.6,"The dog stays home. Your bins are safe.","c-35 h+3","The dog just digs a second hole.","c-35 h-2"],[1,"You leave the fence and the dog to sort it out.","h-1"]],
    ["Your cousin's startup needs 'a few hundred dollars' for a logo. Invest $50?",[0.3,"The logo becomes a sticker on a laptop that somebody sees.","c-50 h+2","The startup pivots to selling candles.","c-50 h-2"],[1,"You send a like and a thumbs-up emoji.","h+1"]],
    ["Your shoes have a hole in the sole. Pay $20 to get them re-soled?",[0.8,"They're as good as new. Your feet are dry.","c-20 h+2","The cobbler says the shoes are beyond saving.","c-20 h-2"],[1,"You keep walking and let the rain decide.","l-1"]],
    ["A colleague invites you to a three-hour team lunch at a hawker centre. Go?",[0.7,"You bond over satay and gossip. Great day.","c-12 h+5 n+1","It runs long and you miss your afternoon nap.","c-12 e-8 h-2"],[1,"You eat a packed sandwich at your desk.","e+3"]],
    ["You have a free weekend. Book a pottery class for $70?",[0.55,"You make a lopsided bowl and feel proud of it.","c-70 h+6 n+2","Your bowl collapses in the kiln. Expensive mud.","c-70 h-3"],[1,"You spend the weekend on the sofa.","e+8"]],
    ["Your landlord says the air-con 'doesn't need servicing yet'. Pay $80 for a service anyway?",[0.5,"The unit hums like new and the room feels cold.","c-80 h+3","The engineer finds a dead rat. Rat-free for now.","c-80 h-1"],[1,"You put a fan on and shut the windows.","e-4"]],
    ["Your phone battery is at 4%. Buy a $25 power bank?",[0.7,"You make it through a long commute. Feels like magic.","c-25 h+3","The power bank is flat too.","c-25 h-2"],[1,"You switch off your phone and read a book.","n+1 h+1"]],
    ["Your friend wants you to try rock climbing for $40 a session. Go?",[0.6,"You reach the top and feel invincible for a day.","c-40 e-10 h+5","Your forearms stop working halfway up.","c-40 e-14 h-3"],[1,"You watch other people climb from the bottom.","h-1"]],
    ["A market stall is selling a 'genuine' designer bag for $30. Buy it?",[0.2,"The bag looks almost real in the photos.","c-30 h+2","The zip comes off in your hand.","c-30 h-4"],[1,"You keep your money and your dignity.","h+1"]],
    ["Your mum wants you to learn to cook her famous curry. Spend Sunday with her for free?",[0.8,"You learn the recipe and she forgives you for leaving the sofa dirty.","e-10 h+6 n+3","You burn the onions and she sighs in three languages.","e-10 h-3"],[1,"You say you'll learn it later.","h-2"]],
    ["A new bakery opens near your flat and offers free samples. Queue for the samples?",[0.6,"The croissant is buttery and very generous.","c-5 h+4 e+3","The queue lasts half an hour and the samples run out.","e-5 h-2"],[1,"You walk past and buy a bun from the mall instead.","c-3 h+1"]],
    ["Your laptop fan is screaming. Spend $60 on a cooling pad?",[0.5,"The fan goes quiet and the laptop runs cooler.","c-60 h+2","The pad stops working after a week.","c-60 h-2"],[1,"You put the laptop on a cushion and hope for the best.","e-2"]],
    ["Your coworker says the office plant needs watering. Volunteer for weekly plant duty?",[0.7,"The plant thrives and everyone thanks you.","h+4 n+1","The plant dies in the first week. You are blamed.","h-4"],[1,"You let someone else sort the plant.","h+1"]],
    ["A street tailor offers to shorten your trousers for $15 while you wait. Accept?",[0.8,"They fit perfectly. People compliment you all week.","c-15 h+4","The tailor mixed up the legs. One is a capri.","c-15 h-4"],[1,"You roll up your trousers and call it a style.","h+1"]],
    ["Your flatmate offers to split the cost of a $90 karaoke machine. Chip in?",[0.7,"The first night is a hit. Your flatmate sings Mandopop until 2am.","c-45 h+5 e-6","The neighbours complain at 11pm and the machine goes back in the box.","c-45 h-4"],[1,"You say no, and wear headphones from now on.","h-1"]],
    ["An old classmate wants to borrow your bike for a week. Lend it?",[0.6,"It comes back with a fresh bell and a thank-you note.","h+4 n+1","It comes back with a flat tyre and no explanation.","c-20 h-3"],[1,"You say the bike is 'under repair', even though it isn't.","h-1"]],
    ["You can buy a $12 bottle of wine for a dinner party you forgot about. Buy it?",[0.6,"The wine is decent and the guests love you.","c-12 h+5","The guests bring their own and you feel silly.","c-12 h-2"],[1,"You cook pasta and say you're on a health kick.","e+4 h-1"]],
    ["A toy claw machine takes $5 a play. Try it?",[0.15,"You win a plush penguin and feel like a champion.","c-5 h+4","You lose all five dollars and the penguin laughs at you.","c-5 h-3"],[1,"You walk on, dignity intact.","h+1"]],
    ["Your dentist says you need a $150 filling. Book it now?",[0.9,"The filling is done and your tooth stops complaining.","c-150 l+3","You put it off and the tooth starts to throb at 3am.","c-150 l-3"],[1,"You chew on the other side and hope for the best.","l-2"]],
    ["A friend wants you to join a 5am running club for a $30 fee. Sign up?",[0.5,"You love the quiet streets and the sunrise.","c-30 e-10 h+5","Your alarm breaks at 4:55am and you sleep in.","c-30 h-2"],[1,"You snooze for another hour.","e+5"]],
    ["Your neighbour asks you to take in her parcel while she is away. Say yes?",[0.8,"You get a thank-you cake and a new friend.","c+5 h+4","The parcel is a box of 40 mismatched socks.","h-2"],[1,"You tell her to ask the post office.","h-1"]]
  ];
  var tokRe=/^([cbehlpwrjkn])([+-]?)([\d.]+)(?:~([\d.]+))?$/;
  function rr(a,b){return a+Math.random()*(b-a)}
  function draw(name,arr){
    var d=S[name];
    if(!d.length){d=arr.map(function(_,i){return i});for(var i=d.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=d[i];d[i]=d[j];d[j]=t}S[name]=d}
    return arr[d.pop()];
  }
  /* macro=true when the effects come from world news, so the CONFIG.macro dials apply */
  function applyFx(str,macro){
    var K=CONFIG.market,rate0=S.rate,px0=S.px,lay0=shutSum(),out0=applyFx0(str,macro);
    S.mkt=clampMkt(S.mkt-(S.rate-rate0)*K.rateHit-(S.px/px0-1)*K.priceHit-(shutSum()>lay0?K.closureHit:0)+(shutSum()<lay0?K.reopenLift:0));
    return out0;
  }
  function applyFx0(str,macro){
    var out=[];
    (str||'').split(' ').forEach(function(tok){
      var m=tokRe.exec(tok);if(!m)return;
      var sg=m[2]==='-'?-1:1,a=+m[3],b=m[4]?+m[4]:a,v=sg*(a===b?a:rr(Math.min(a,b),Math.max(a,b)));
      var sgn=function(x){return x>0?'+':'−'};
      if(macro){if(m[1]==='p')v*=mk('priceStrength');else if(m[1]==='w')v*=mk('wageStrength');else if(m[1]==='r')v*=mk('rateStrength')}
      switch(m[1]){
        case 'c':v=Math.round(v);if(v<0)v=-Math.min(-v,Math.max(0,S.cash));if(v){S.cash+=v;if(v>0)inc(v);else outg(-v);out.push(sgn(v)+money(Math.abs(v))+' cash')}break;
        case 'b':v=Math.round(v);if(v<0)v=-Math.min(-v,S.bank);if(v){S.bank+=v;out.push(sgn(v)+money(Math.abs(v))+' in the bank')}break;
        case 'e':v=Math.round(v);var e0=S.energy;S.energy=clamp(S.energy+v);if(S.energy!==e0)out.push(sgn(v)+Math.abs(S.energy-e0)+'% energy');break;
        case 'h':v=Math.round(v);var h0=S.happy;S.happy=clamp(S.happy+v);if(S.happy!==h0)out.push(sgn(v)+Math.abs(S.happy-h0)+' happiness');break;
        case 'l':v=Math.round(v);var l0=S.health;S.health=clamp(S.health+v);if(S.health!==l0)out.push(sgn(v)+Math.abs(S.health-l0)+' health');break;
        case 'p':var np=clampPx(S.px*(1+v/100));if(Math.abs(np-S.px)>.0005){S.px=np;out.push('Prices '+sgn(v)+Math.abs(Math.round(v))+'%')}break;
        case 'w':v=Math.round(v*10)/10;var nw=clampWage(S.wage*(1+v/100));if(Math.abs(nw-S.wage)>.0005){S.wage=nw;out.push('Shift pay '+sgn(v)+Math.abs(v)+'%')}break;
        case 'r':v=Math.round(v*10)/10;S.rate=clampRate(Math.round((S.rate+v)*10)/10);out.push('Bank interest now '+S.rate.toFixed(1)+'% a day');break;
        case 'j':v=Math.round(v);var jb=myJob();if(v>0&&jb){var nd=Math.min(4,v);S.shut[jb.b]=Math.max(shutLeft(jb.b),nd+1);out.push('Your workplace closes for '+nd+' day'+(nd>1?'s':''))}else if(v<0&&jb&&shutLeft(jb.b)>0){var d=Math.min(shutLeft(jb.b),-v);S.shut[jb.b]-=d;if(S.shut[jb.b]<=0)delete S.shut[jb.b];out.push('Closure shortened by '+d+' day'+(d>1?'s':''))}break;
        case 'n':v=Math.round(v);var n0=S.know;S.know=clamp(S.know+v);if(S.know!==n0)out.push(sgn(v)+Math.abs(Math.round(S.know-n0))+' knowledge');break;
        case 'k':v=Math.round(Math.abs(v));var hit=false;['casual','smart','suit'].forEach(function(t){if(S.clothes[t]>0){S.clothes[t]=Math.max(0,S.clothes[t]-v);hit=true}});if(hit)out.push('Clothes lose '+v+' day'+(v>1?'s':'')+' of wear');break;
      }
    });
    return out;
  }
  /* a twist can touch the same thing as the outcome: show one chip per item with the total
    ("−3 happiness, +3 happiness" -> "±0 happiness"; "+$20 cash, +$10 cash" -> "+$30 cash") */
  function mergeFx(list){
    var out=[],at={},re=/^([+−])(\$?)([\d,]+)(%?) (cash|in the bank|energy|happiness|health|knowledge)$/;
    list.forEach(function(f){
      var m=re.exec(f);if(!m){out.push(f);return}
      var k=m[2]+m[4]+' '+m[5],v=(m[1]==='−'?-1:1)*+m[3].replace(/,/g,'');
      if(at[k]==null){at[k]=out.length;out.push({k:k,v:v,cash:!!m[2],pct:m[4],n:m[5]})}else out[at[k]].v+=v;
    });
    return out.map(function(o){if(typeof o==='string')return o;
      return (o.v>0?'+':o.v<0?'−':'±')+(o.cash?money(Math.abs(o.v)):Math.abs(o.v))+o.pct+' '+o.n});
  }
  function needCash(o){
    var m=0;
    [o[2],o[4]].forEach(function(s){if(!s)return;s.split(' ').forEach(function(t){var q=tokRe.exec(t);if(q&&q[1]==='c'&&q[2]==='-')m=Math.max(m,+(q[4]||q[3]))})});
    return m;
  }
  function basicEvent(i){
    var v;
    if(i===0){
      var pct=Math.round(rr(5,60)),loss=Math.round(S.cash*pct/100);S.cash-=loss;outg(loss);
      return {icon:'🦹',tag:'Daily event',title:'Mugged!',done:true,tone:'bad',
        text:loss?'A thief corners you in an alley and grabs your wallet. He takes '+pct+'% of the cash you were carrying. Your bank money is safe.':'A thief corners you in an alley, but your pockets are empty. Your bank money is safe anyway.',
        fx:loss?['−'+money(loss)+' cash ('+pct+'%)']:[]};
    }
    if(i===1){
      v=Math.round(rr(50,80));S.cash+=v;inc(v);
      return {icon:'🧾',tag:'Daily event',title:'Tax refund',done:true,tone:'good',text:'The tax office sends you a surprise refund.',fx:['+'+money(v)+' cash']};
    }
    var ask=Math.round(rr(50,250));v=Math.min(ask,Math.max(0,S.cash));S.cash-=v;outg(v);  /* never takes more than you have */
    return {icon:'🏠',tag:'Daily event',title:'Rent increase',done:true,tone:'bad',
      text:'Your landlord demands an extra '+money(ask)+' immediately.'+(v<ask?' You only have '+money(v)+' on you, so he takes that and lets the rest go this time.':''),
      fx:['−'+money(v)+' cash']};
  }
  function repairEv(k,title,text,lo,hi){
    var it=ITEMS[k],cost=G(Math.round(rr(lo,hi)));
    return {icon:it.ic,tag:'Your belongings',title:title,text:text+' A repair costs '+money(cost)+'.',choice:true,done:false,fx:[],tone:'',
      rep:{k:k,cost:cost}};
  }
  function gigEv(icon,title,text,lo,hi,know){
    var v=Math.round(rr(lo,hi)*S.wage);S.cash+=v;inc(v);var fx=['+'+money(v)+' cash'];
    if(know)fx=fx.concat(applyFx('n+'+know));
    return {icon:icon,tag:'Your belongings',title:title,text:text,done:true,tone:'good',fx:fx};
  }
  var ITEM_EVENTS=[
    {ok:function(){return owns('computer')},mk:function(){return repairEv(ikey('computer'),'Computer crash','Your computer freezes and will not restart.',70,170)}},
    {ok:function(){return owns('computer')},mk:function(){return gigEv('💻','App coding gig','A small business pays you to code a quick app on your computer.',90+S.know,200+S.know*2,1)}},
    {ok:function(){return owns('computer')},mk:function(){return gigEv('💻','Open-source bounty','A bug fix you wrote on your computer earns a bounty.',40,120,2)}},
    {ok:function(){return owns('phone')},mk:function(){return repairEv(ikey('phone'),'Cracked screen','You drop your phone and the screen shatters.',40,95)}},
    {ok:function(){return owns('phone')},mk:function(){return gigEv('📱','Delivery side gig','You pick up a few delivery jobs through a phone app.',30,85,0)}},
    {ok:function(){return owns('tablet')||owns('computer')||owns('phone')},mk:function(){return {icon:'🎓',tag:'Your belongings',title:'Free online course',text:'A free course goes viral and you work through it on your device.',done:true,tone:'good',fx:applyFx('n+4')}}},
    {ok:function(){return owns('tablet')},mk:function(){return gigEv('📲','Digital art sale','You sell a few drawings made on your tablet.',35,100,0)}},
    {ok:function(){return owns('fridge')},mk:function(){return repairEv(ikey('fridge'),'Fridge breakdown','Your refrigerator starts making an awful noise and stops cooling.',60,150)}},
    {ok:function(){return owns('fridge')&&S.items.fridgeold},mk:function(){return repairEv('fridgeold','Old fridge gives up','Your used refrigerator dies again.',50,120)}},
    {ok:function(){return owns('fridge')&&inFridge()>0},mk:function(){var n=0;S.food.forEach(function(p){if(p.f){p.sp=1;n++}});fridgeSync();return {icon:'⚡',tag:'Your belongings',title:'Power cut',text:'The power is out all night and the food in your fridge spoils.',done:true,tone:'bad',fx:[n+' meal'+(n>1?'s':'')+' spoiled']}}},
    {ok:function(){return owns('tv')},mk:function(){return repairEv(ikey('tv'),'TV on the blink','Your TV flickers and goes dark.',30,80)}},
    {ok:function(){return owns('console')},mk:function(){return {icon:'🎮',tag:'Your belongings',title:'Console tournament',text:'Friends invite you to a $20 console tournament with a $90 prize.',choice:true,done:false,fx:[],tone:'',y:[0.5,'You win the tournament!','c+70 h+8','You are knocked out early.','c-20 h-3'],n:[1,'You stay in and rest.','e+5']}}},
    {ok:function(){return owns('coffee')},mk:function(){return gigEv('☕','Coffee-fuelled all-nighter','Your coffee machine powers a productive night and a small win.',20,60,0)}}
  ];
  function itemEvent(){
    var c=ITEM_EVENTS.filter(function(e){return e.ok()});
    if(!c.length)return null;
    return c[Math.floor(Math.random()*c.length)].mk();
  }
  /* ---------- long-running macro trends ----------
    A news shock lands partly today (35%); the rest drifts in day by day.
    Big stories (war, crisis, recession, pandemic, crash, boom, strike) last 7-14 days, others 3-6. */
  var BIG=/war|crisis|recession|pandemic|crash|collapse|boom|strike|lockdown|tariff/i;
  function newsEvent(n){
    var C=CONFIG.macro,dr=BIG.test(n[0])?C.bigNewsDays:C.smallNewsDays,big=BIG.test(n[0]),days=dr[0]+Math.floor(Math.random()*(dr[1]-dr[0]+1));
    var now=[],tr={n:n[0],left:days,tot:days,p:0,w:0,r:0,mkt:0,ill:1};
    n[2].split(' ').forEach(function(tok){
      var m=tokRe.exec(tok);if(!m)return;
      if('pwr'.indexOf(m[1])<0){now.push(tok);return}
      var sg=m[2]==='-'?-1:1,a=+m[3],b=m[4]?+m[4]:a,v=sg*(a===b?a:rr(Math.min(a,b),Math.max(a,b)));
      var nowV=Math.round(v*C.shareToday*10)/10;if(nowV)now.push(m[1]+(nowV<0?'-':'+')+Math.abs(nowV));
      tr[m[1]]=v*(1-C.shareToday)/days;
    });
    if(/pandemic|lockdown/i.test(n[0]))tr.ill=CONFIG.illness.pandemicX;
    var md=newsMood(n[0]);if(md<0)tr.mkt=C.badNewsMarket;else if(md>0)tr.mkt=C.goodNewsMarket;
    scaleTrend(tr);delete tr.lay;delete tr.cls;
    var fx=applyFx(now.join(' '),true);
    var lasting=tr.p||tr.w||tr.r||tr.mkt||tr.ill!==1;
    if(lasting){S.trends.push(tr);fx.push('Over the next '+days+' days: '+trendNow(tr))}
    var lost=/housing bubble/i.test(n[0])?bubbleHit():'';if(lost)fx.push(lost);
    return {icon:big?'🌐':'📰',tag:big?'Major world event':'Economic news',title:n[0],text:n[1],fx:fx.length?fx:['No direct effect on you today'],done:true,tone:lost?'bad':''};
  }
  /* a headline's effect on market mood: -1 bad, 1 good, 0 none */
  function newsMood(title){return /war|crisis|recession|crash|collapse|lockdown|pandemic/i.test(title)?-1:/boom|soft landing|record|rally/i.test(title)?1:0}
  /* plain-language guess at what a headline will do, for the morning tip-off */
  function newsHint(n){
    var a=[];
    n[2].split(' ').forEach(function(tok){
      var m=tokRe.exec(tok);if(!m)return;var up=m[2]!=='-';
      if(m[1]==='p')a.push(up?'prices up':'prices down');
      else if(m[1]==='w')a.push(up?'pay up':'pay down');
      else if(m[1]==='r')a.push(up?'savings rates up, which weighs on ETF, hedge fund and crypto':'savings rates down, which helps ETF, hedge fund and crypto');
      else if(m[1]==='j'&&up)a.push('workplaces may close');
      else if(m[1]==='c'&&up)a.push('a cash handout');
    });
    var md=newsMood(n[0]);if(md<0)a.push('markets likely to fall');else if(md>0)a.push('markets likely to rise');
    return a.length?'likely effect: '+a.join(', '):'little direct effect expected';
  }
  /* each morning: decide whether tonight's daily event is economic news (same odds as CONFIG.events) and maybe tip it off (CONFIG.events.forecast) */
  function planNews(){
    var E=CONFIG.events,tot=0;['story','item','news','basic','decision','none'].forEach(function(k){tot+=Math.max(0,E[k]||0)});
    var n=tot>0&&Math.random()<Math.max(0,E.news||0)/tot?draw('deckN',NEWS):null;
    S.newsPlan={day:S.day,n:n,tip:!!n&&Math.random()<(E.forecast||0)};
  }
  /* Bank screen: which running news story is moving the savings rate and the investment returns */
  function econNote(){
    var M=CONFIG.market,a=S.trends.filter(function(t){return t.r||t.mkt}).map(function(t){
      var w=[];if(t.r)w.push('savings rate '+(t.r>0?'up':'down'));if(t.mkt)w.push('markets '+(t.mkt>0?'rising':'falling'));
      return '<b>'+t.n+'</b> ('+w.join(', ')+', '+t.left+' day'+(t.left>1?'s':'')+' left)'}),
      mood=S.mkt>0.5?'buoyant':S.mkt<-0.5?'weak':'steady';
    return '<small class="bk-d">📰 '+(a.length?'In the news: '+a.join('; ')+'. ':'No big story is moving rates right now'+(Math.abs(S.rate-M.rateBase)>0.05?', so interest is drifting back towards '+M.rateBase.toFixed(1)+'%. ':'. '))+
      'Market mood: '+mood+'. Savings, fixed deposit, ETF, hedge fund and crypto all follow the economy. Loan rates are fixed and never change.</small>'}
  /* a running story's effect on this day: it builds, peaks mid-story and fades, with a random daily swing */
  function trendGain(t){
    var C=CONFIG.macro,i=t.age||0,n=i+t.left,x=(i+0.5)/Math.max(1,n);
    t.age=i+1;
    return (C.curveLow+(C.curvePeak-C.curveLow)*Math.sin(Math.PI*x))*(1+C.dailyJitter*(2*Math.random()-1));
  }
  /* plain-language summary of what a running story is doing to you (no fixed daily numbers) */
  function trendNow(t){
    var a=[];
    if(t.p)a.push(t.p>0?(t.p>=1.5?'prices rising fast':'prices rising'):'prices falling');
    if(t.w)a.push(t.w>0?'pay rising':'pay falling');
    if(t.r)a.push(t.r>0?'interest rates rising':'interest rates falling');
    if(t.mkt)a.push(t.mkt<0?'markets under pressure':'markets rising');
    if(t.ill!==1)a.push('illness more likely');
    return a.length?a.join(', '):'little direct effect on you';
  }

  /* workplace closures count down each morning; the player is told when the job is back */
  function shutTick(){
    Object.keys(S.shut||{}).forEach(function(b){
      if(S.shut[b]>0){S.shut[b]--;
        if(S.shut[b]<=0){delete S.shut[b];var jb=myJob();
          if(jb&&jb.b===b){S.notes.push({l:'good',t:'✅ The '+NAME[b]+' has reopened: your job as '+jb.rk.r+' is available again. You can work shifts there today.'});log('The '+NAME[b]+' reopened. Your job as '+jb.rk.r+' is available again.','good')}}}
    });
  }
  function trendTick(){
    S.trends=S.trends.filter(function(t){
      var g=trendGain(t);
      if(t.p)S.px=clampPx(S.px*(1+t.p*g/100));
      if(t.w)S.wage=clampWage(S.wage*(1+t.w*g/100));
      if(t.r)S.rate=clampRate(Math.round((S.rate+t.r*g)*100)/100);
      if(t.mkt)S.mkt=clampMkt(S.mkt+t.mkt*g);
      /* two separate events. Laid off: the job is gone for good. Closure: work is disabled for 1-4 days, the job stays on your record. */
      var jb0=myJob();
      if(t.lay&&jb0&&Math.random()<t.lay){delete S.career[jb0.c];
        S.notes.push({l:'bad',t:'📉 '+t.n+': you were LAID OFF from your job as '+jb0.rk.r+' at the '+NAME[jb0.b]+'. The job is gone. Apply for a new one at the Employment Office.'});log('Laid off from '+jb0.rk.r+' because of: '+t.n+'.','bad');jb0=null}
      if(t.cls&&jb0&&!shutLeft(jb0.b)&&Math.random()<t.cls){var nd=1+Math.floor(Math.random()*4);S.shut[jb0.b]=nd;
        log('The '+NAME[jb0.b]+' is CLOSED for '+nd+' day'+(nd>1?'s':'')+' because of: '+t.n+'. Work is disabled, but your job stays on record.','bad')}
      t.left--;
      log('Ongoing: '+t.n+' ('+trendNow(t)+(t.left>0?'; '+t.left+' more day'+(t.left>1?'s':''):'; this was the last day')+').',t.p>0||t.w<0||t.mkt<0||t.ill>1?'warn':'good');
      return t.left>0;
    });
    /* with no news pushing interest, it drifts back towards its normal level */
    var M=CONFIG.market;
    if(!S.trends.some(function(t){return t.r}))S.rate=clampRate(Math.round((S.rate+(M.rateBase-S.rate)*M.rateReversion)*100)/100);
    /* 3.2: prices drift back towards the difficulty's base price a little each day, so news cannot push them away forever */
    S.px=clampPx(S.px+(Df().px-S.px)*(CONFIG.macro.priceReversion||0));
  }
  /* Social contracts extend S.pact; legacy untyped pacts retain their original semantics. */


  function careerPreference(r,c,rk){
    var C=CONFIG.rivals.career,a=archetype(r),p=a&&a.tracks||{},q=rk.q||[],track=q.length?q[0][0]:c;  /* the archetype's taste for the pathway */
    return (p[track]||1)+q.reduce(function(n,v){return n+Math.min(v[1],rivalLv(r,v[0]))*C.educationWeight},0);
  }
  function participantWorth(p){return p===S?worth():rivalWorth(p)}
  function canStake(p,n,c){return !!p&&!p.out&&Number.isFinite(n)&&Number.isInteger(n)&&n>0&&p.cash-n>=G(c.reserve)}
  function scaledStake(a,b,c){
    if(!a||!b||a.out||b.out)return 0;
    var n=Math.floor(Math.min(Math.max(0,Math.min(participantWorth(a),participantWorth(b)))*c.percent,G(c.max),a.cash-G(c.reserve),b.cash-G(c.reserve)));
    return n>=G(c.min)?n:0;
  }
  function loanRecord(r,l,k){var h=r.loanHistory||(r.loanHistory={paid:0,late:0,defaulted:0});if(l[k+'Recorded'])return;l[k+'Recorded']=true;h[k]++}
  function loanReliability(r){var h=r.loanHistory||{paid:0,late:0,defaulted:0};return 'Repayment history: '+h.paid+' paid, '+h.late+' late, '+h.defaulted+' defaulted (future repayment is uncertain)'}
  function houseOfferMsg(free){
    if(S.mode!=='rivals')return false;
    var F=TG().flat,c=free.filter(function(i){var r=S.rivals[i];return (!S.flat||S.flat.i!==i)&&r.home!=='bung'&&(r.rel||0)>=CONFIG.rivals.social.friendAt&&(!r.houseOfferDay||S.day-r.houseOfferDay>=F.offerCooldown)});
    if(!c.length||rrand()>=F.offerChance)return false;
    var i=c[Math.floor(rrand()*c.length)],r=S.rivals[i];r.houseOfferDay=S.day;
    S.msgs.push({id:++S.msgN,i:i,k:'house',day:S.day,until:S.day+MX().messageDays-1,amt:0,st:null});
    S.notes.push({l:'rem',t:'🏠 '+r.name+' invited you to share their apartment. Review friendship effects in Messages.'});return true;
  }
  function houseOfferRow(m){
    var r=S.rivals[m.i],old=flatmate(),F=TG().flat,t='🏠 '+r.ic+' '+r.name+' invites you to share their apartment.';
    if(m.st)return arow(t,chip('',m.st==='yes'?'Accepted':'Declined'),'');
    return arow(t,chip('','New housemate '+sg(F.acceptRel))+(old&&old!==r?chip('','Former housemate '+old.name+' '+sg(F.replaceRel),'warn'):'')+chip('time',hm(F.inviteMinutes))+chip('','Answer by day '+m.until),btn('msg',m.id+'|yes','Accept')+btn('msg',m.id+'|no','Decline',1),'Move to an apartment; rent is shared. '+(loyaltyNoticeText()||''));
  }
  function replyHouse(m,yes){
    var r=S.rivals[m.i],old=flatmate(),F=TG().flat;
    if(!r||r.out||r.home==='bung')return refuse('This invitation is no longer available. Bungalows cannot be shared.');
    if(yes&&old===r)return refuse('You already share a home.');
    if(yes&&!loyaltyAllows())return;
    if(!spendMin(yes?F.inviteMinutes:MX().noMinutes,0))return;
    m.st=yes?'yes':'no';
    if(yes){if(old&&old!==r)relAdd(old,F.replaceRel);relAdd(r,F.acceptRel);S.home='apt';S.homeless=0;S.flat={i:m.i,since:S.day,hd:0,here:false,did:null};log('🏠 You accepted '+r.name+'’s invitation: relationship '+sg(F.acceptRel)+(old&&old!==r?', '+old.name+' '+sg(F.replaceRel):'')+'. You now share an apartment.','good')}
    else log('🏠 You declined '+r.name+'’s invitation.');done();
  }
  function closeSocialMoney(){
    (S.bets||[]).forEach(function(b){if(b.settled)return;b.settled=true;S.cash+=b.stake;var r=S.rivals[b.i];if(r)r.cash+=b.stake});S.bets=[];
    if(S.pact){var p=S.pact;S.pact=null;if(!p.settled){p.settled=true;var r=S.rivals[p.i];if(r)splitPot(p.pot||0,S,r);else S.cash+=Math.floor((p.pot||0)/2)}}
    (S.rpacts||[]).forEach(function(p){if(p.settled)return;p.settled=true;var a=S.rivals[p.a],b=S.rivals[p.b];if(a&&b)splitPot(p.pot||0,a,b)});S.rpacts=[];
  }
  function contractName(k){return {study:'Study Buddies',loyalty:'Roommate Loyalty',wealth:'Wealth Challenge',emergency:'Emergency Support',royalty:'Roommate Royalty'}[k]||'Savings pact'}
  function contractTerms(k,i){
    var C=CONFIG.rivals.contracts,r=S.rivals[i],w=C.wealth;
    return {days:C.days,minutes:C.minutes,keepRel:C.keepRel,missRel:C.missRel,honourRel:C.honourRel,rewardHappy:C.rewardHappy,
      noticeDays:C.noticeDays,study:JSON.parse(JSON.stringify(C.study)),emergency:JSON.parse(JSON.stringify(C.emergency)),royalty:JSON.parse(JSON.stringify(C.royalty)),
      target:Math.ceil(Math.max(worth(),rivalWorth(r))*(1+w.growth)),stake:k==='wealth'?scaledStake(S,r,w):0,reminderDays:w.reminderDays};
  }
  function termsText(k,t){
    var common=t.days+' days. Kept obligations: relationship '+sg(t.keepRel)+', happiness '+sg(t.rewardHappy)+'. Each honoured obligation: relationship '+sg(t.honourRel)+'. Missed obligations: relationship '+sg(t.missRel)+'. ';
    if(k==='wealth')return t.days+' days: first to net worth '+money(t.target)+' wins the pot; same-day arrival or neither reaching it means a refund. Stake '+money(t.stake)+' each, locked on acceptance. Normal spending and lending remain available.';
    if(k==='study')return common+t.study.sessions+' joint sessions of '+hm(t.study.minutes)+' at '+t.study.gap+'-day intervals; '+t.study.knowledge+' Knowledge each per session. '+t.study.maxReschedules+' agreed reschedule(s), subject to partner agreement. A missed session may be forgiven or challenged.';
    if(k==='loyalty')return common+'Give '+t.noticeDays+' days of notice before leaving or replacing a housemate. No money is held.';
    if(k==='emergency')return common+'Help during genuine emergencies, up to '+money(t.emergency.amount)+' and '+hm(t.emergency.minutes)+', retaining '+money(t.emergency.reserve)+' cash. Unaffordable help is excused.';
    return common+'Housemate gets priority use of shared space; contribute '+money(t.royalty.amount)+' and '+hm(t.royalty.minutes)+' every '+t.royalty.everyDays+' days. Honour the benefit or miss the obligation; no automatic deduction.';
  }
  function contractOffers(){
    if(S.mode!=='rivals'||S.pact)return '';var C=CONFIG.rivals.contracts,h=psec('contracts','📜 Specific pacts','','Review the terms before proposing. Accepted terms are fixed for this agreement.');
    S.rivals.forEach(function(r,i){if(r.out||(r.rel||0)<PX().pact.need||hasAlly(i))return;
      ['study','loyalty','wealth','emergency','royalty'].forEach(function(k){if((k==='loyalty'||k==='royalty')&&(!S.flat||S.flat.i!==i))return;
        var t=contractTerms(k,i);h+=arow(r.name+' · '+contractName(k),chip('time',hm(C.minutes)),btn('contract',i+'|'+k,'Propose',1,!!askedToday('p'+i)||(k==='wealth'&&!t.stake)),termsText(k,t));
      });
    });return h;
  }
  function proposeContract(arg){
    var a=String(arg).split('|'),i=+a[0],k=a[1],r=S.rivals[i],C=CONFIG.rivals.contracts;
    if(['study','loyalty','wealth','emergency','royalty'].indexOf(k)<0||!r||r.out||S.pact||hasAlly(i)||(r.rel||0)<PX().pact.need)return refuse('This pact is unavailable.');
    if((k==='loyalty'||k==='royalty')&&(!S.flat||S.flat.i!==i))return refuse('This pact requires your current housemate.');
    if(askedToday('p'+i))return refuse('Already proposed to this friend today.');
    var t=contractTerms(k,i);if(k==='wealth'&&!t.stake)return refuse('Both participants need an affordable stake and cash reserve.');
    if(!spendMin(C.minutes,0))return;markAsked('p'+i);
    if(rrand()>=pactChance(r)){log(r.name+' declined '+contractName(k)+'.');return done()}
    if(t.stake){S.cash-=t.stake;r.cash-=t.stake}
    S.pact={i:i,kind:k,since:S.day,until:S.day+t.days-1,pot:t.stake*2,stake:t.stake,terms:t,progress:0,missed:0,next:S.day+1,reschedules:0,reachedMe:null,reachedThem:null};
    log('📜 '+r.name+' agreed to '+contractName(k)+'. '+termsText(k,t),'good');done();
  }
  function settleContract(outcome){
    var p=S.pact;if(!p||p.settled)return;p.settled=true;var r=S.rivals[p.i],pot=p.pot||0;S.pact=null;
    if(r){if(outcome==='win')S.cash+=pot;else if(outcome==='lose')r.cash+=pot;else splitPot(pot,S,r)}else S.cash+=Math.floor(pot/2);
    if(outcome==='kept'&&r){relAdd(r,p.terms.keepRel);S.happy=clamp(S.happy+p.terms.rewardHappy);repAdd(S,PX().rep.keepPact);repAdd(r,PX().rep.keepPact)}
    var said={kept:'kept in full',incomplete:'ended with missed obligations',cancelled:'ended early',win:'you won',lose:'your partner won',tie:'a tie'}[outcome]||outcome;
    S.notes.push({l:outcome==='lose'?'warn':'rem',t:'📜 '+contractName(p.kind)+(r?' with '+r.name:'')+': '+said+(pot?' · pot '+money(pot)+(outcome==='win'?' paid to you':outcome==='lose'?' paid to your partner':' returned'):'')+'.'});
  }
  function wealthProgress(day){
    var p=S.pact;if(!p||p.kind!=='wealth')return;day=day==null?S.day:day;if(day>p.until)return;var r=S.rivals[p.i];if(!r)return;
    if(p.reachedMe==null&&worth()>=p.terms.target)p.reachedMe=day;
    if(p.reachedThem==null&&rivalWorth(r)>=p.terms.target)p.reachedThem=day;
  }
  function wealthReminder(){
    var p=S.pact;if(!p||p.kind!=='wealth')return '';var left=p.until-S.day+1,r=S.rivals[p.i];
    return left<=p.terms.reminderDays?'<li><b>🏁 Wealth Challenge: '+left+' day(s) left · target '+money(p.terms.target)+' · you '+money(worth())+' · '+(r?r.name+' '+money(rivalWorth(r)):'partner unavailable')+' · stake '+money(p.stake)+' each</b></li>':'';
  }
  function loyaltyNoticeText(){var p=S.pact;return p&&p.kind==='loyalty'?'Loyalty pact: '+(p.noticeDay!=null?'notice given on day '+p.noticeDay:'give '+p.terms.noticeDays+' days notice before leaving or replacing')+'.':''}
  function loyaltyAllows(){
    var p=S.pact;if(!p||p.kind!=='loyalty')return true;
    if(p.noticeDay==null||S.day<p.noticeDay+p.terms.noticeDays){refuse('Give notice in Messages → Roommate Loyalty, then wait '+p.terms.noticeDays+' days.');return false}return true;
  }
  function promiseProblem(k,text,notice){
    var p=S.pact;if(!p||p.problem)return;p.problemLast=S.day;p.problem={kind:k,text:text,notice:!!notice,day:S.day,expires:S.day+CONFIG.rivals.contracts.problemDays};
    S.notes.push({l:'warn',t:'📜 '+text+' Review the response in Messages.'});
  }
  function promiseRows(){
    var p=S.pact,e=p&&p.problem;if(!e)return '';var r=S.rivals[p.i],C=CONFIG.rivals.contracts,affordable=r&&r.cash-G(PX().pact.reserve)>=G(C.compensation);
    return arow('📜 '+e.text,chip('','Respond by day '+e.expires),'<div class="btnrow">'+btn('promise','forgive','Forgive')+btn('promise','challenge','Challenge',1)+btn('promise','compensate','Request '+money(G(C.compensation)),1,!affordable)+btn('promise','terminate','Terminate',1)+'</div>',e.kind==='study'?'Notice: '+(e.notice?'given in advance; no time lost':'late cancellation; scheduled time may be wasted')+'. Relationship and circumstances affect your response.':'Affordable compensation comes from the partner; termination splits any pot once.');
  }
  function resolvePromise(k,auto){
    var p=S.pact,e=p&&p.problem,r=p&&S.rivals[p.i],C=CONFIG.rivals.contracts;if(!e||!r||(!auto&&S.day>e.expires))return;
    if(['forgive','challenge','compensate','terminate'].indexOf(k)<0)return;
    var n=G(C.compensation);if(k==='compensate'&&r.cash-n<G(PX().pact.reserve))return refuse('Your partner cannot afford compensation.');
    if(k==='terminate'){if(p.kind)settleContract('cancelled');else{S.pact=null;splitPot(p.pot||0,S,r);
        var endTxt='🤝 Your pact with '+r.ic+' '+r.name+' ended'+(auto?' because the missed commitment was left unanswered':' at your request')+(p.pot?': the '+money(p.pot)+' pot was split':'')+'.';
        if(auto)S.notes.push({l:'warn',t:endTxt});else log(endTxt,'warn')}
      if(!auto)done();return}
    if(k==='compensate'){r.cash-=n;S.cash+=n}relAdd(r,k==='forgive'?C.forgiveRel:k==='challenge'?C.challengeRel:0);p.problem=null;
    if(e.kind==='study'){p.next=S.day+1;p.session=null}
    if(!auto){log('📜 '+(k==='forgive'?'You forgave '+r.name+': relationship '+sg(C.forgiveRel):k==='challenge'?'You challenged '+r.name+' about it: relationship '+sg(C.challengeRel):r.name+' paid you '+money(n)+' in compensation')+'.');done()}
  }
  function contractTick(){
    var p=S.pact,r=S.rivals[p.i],t=p.terms,C=CONFIG.rivals.contracts;
    if(!r||r.out)return settleContract('cancelled');
    if(p.kind==='wealth')return; /* settled after both sides have overnight returns and bills */
    if(p.session&&S.day>p.session.day){p.missed++;relAdd(r,t.missRel);p.session=null;p.next=S.day;}
    if(S.day>p.until){if(p.kind==='study'&&p.progress<t.study.sessions)p.missed++;return settleContract(p.missed?'incomplete':'kept')}
    if((p.kind==='loyalty'||p.kind==='royalty')&&(!S.flat||S.flat.i!==p.i))return settleContract(p.kind==='loyalty'&&p.noticeDay!=null&&S.day>=p.noticeDay+t.noticeDays?'kept':'incomplete');
    if(p.problem)return;
    if(p.kind==='study'&&p.progress<t.study.sessions&&S.day>=p.next&&!p.session){
      if(rrand()<t.study.cancelChance){var notice=rrand()<t.study.noticeChance,ill=!!r.ill,why=ill?'illness':r.energy<30?'fatigue':'a conflicting work shift';promiseProblem('study',r.name+' cancelled a session because of '+why+'.',notice);if(!notice){var lost=Math.min(S.ap,t.study.minutes);S.ap-=lost;S.notes.push({l:'warn',t:'You lost '+hm(lost)+' waiting for the cancelled session.'})}p.next=S.day+1}
      else p.session={day:S.day,conflict:rrand()<C.conflictChance?['shift','social','fatigue'][Math.floor(rrand()*3)]:null};
    }
    if(p.kind==='royalty'&&S.day>=p.next&&!p.session)p.session={day:S.day};
    if(p.kind==='emergency'&&!p.session&&(r.ill||r.cash+r.bank<HOUSE[r.home||'apt'].rent||r.health<CONFIG.health.poorBelow)&&rrand()<t.emergency.chance){
      if(S.cash-G(t.emergency.reserve)<G(t.emergency.amount)||S.ap<t.emergency.minutes){S.notes.push({l:'rem',t:r.name+' needs emergency help, but you cannot spare the money or time. Your pact excuses this.'});p.progress++}
      else p.session={day:S.day};
    }
  }
  function contractRows(){
    var p=S.pact,r=S.rivals[p.i],t=p.terms,h=psec('contract','📜 '+contractName(p.kind),chip('','Until day '+p.until),termsText(p.kind,t));
    h+=arow('With '+(r?r.name:'departed partner'),chip('','Completed '+p.progress)+chip('','Missed '+p.missed)+(p.pot?chip('cash','Held pot '+money(p.pot)):'')+chip('','Review deadline day '+p.until),'');
    if(p.kind==='wealth')h+=arow('Net-worth target '+money(t.target),chip('','You '+money(worth()))+chip('',r?r.name+' '+money(rivalWorth(r)):''),'','First arrival by the deadline wins. Same-day arrivals and unmet targets refund both stakes.');
    if(p.kind==='loyalty')h+=arow(loyaltyNoticeText(),' ',btn('cdo','notice','Give notice',1,p.noticeDay!=null));
    if(p.problem)h+=promiseRows();
    if(p.session){var k=p.kind,conf=p.session.conflict,note=conf==='shift'?'A better-paying '+money(G(CONFIG.rivals.contracts.conflictShift))+' shift conflicts.':conf==='social'?'A social invitation conflicts.':conf==='fatigue'?'You are tired; rest competes with this session.':'';
      h+=arow(k==='study'?'Scheduled joint study':k==='emergency'?'Genuine emergency: help requested':'Honour household priority and contribution',chip('','Due today'),'<div class="btnrow">'+btn('cdo','honour','Honour')+btn('cdo','miss','Miss',1)+(k==='study'?btn('cdo','reschedule','Ask to reschedule',1,p.reschedules>=t.study.maxReschedules):'')+'</div>',' '+note);
      if(conf)h+=arow('Take the competing opportunity',chip('','Counts as a missed session'),btn('cdo','conflict','Choose '+conf,1));
    }
    h+=arow('End this pact',chip('','Any pot split once'),btn('cdo','end','End pact',1),'Early withdrawal: relationship '+sg(t.missRel)+(p.kind==='wealth'?(p.reachedThem!=null&&p.reachedMe==null?'. '+(r?r.name:'Your partner')+' has already reached the target: leaving now gives them the pot.':', stakes refunded. Once your partner reaches the target first, leaving gives them the pot.'):'.'));return h;
  }
  function contractDo(k){
    var p=S.pact;if(!p||!p.kind||p.settled)return refuse('No active contract.');var t=p.terms,r=S.rivals[p.i];
    if(k==='end'){var lost=p.kind==='wealth'&&(wealthProgress(),p.reachedThem!=null&&p.reachedMe==null);relAdd(r,t.missRel);settleContract(lost?'lose':'cancelled');
      log('📜 You ended '+contractName(p.kind)+' early: relationship '+sg(t.missRel)+(lost?'. '+r.name+' had already reached the target, so the pot is theirs.':p.pot?'. Stakes refunded.':'.'),'warn');return done()}
    if(k==='notice'&&p.kind==='loyalty'){if(p.noticeDay!=null)return;p.noticeDay=S.day;log('📜 Notice given. You may leave or replace your housemate on day '+(S.day+t.noticeDays)+'.');return done()}
    if(!p.session||p.session.day!==S.day||p.problem)return refuse('No obligation is awaiting a decision.');
    if(k==='reschedule'&&p.kind==='study'){
      if(p.reschedules>=t.study.maxReschedules)return refuse('No reschedules remain.');p.reschedules++;
      if(rrand()<t.study.rescheduleChance){p.next=S.day+1;p.session=null;log('📚 Your partner agreed to tomorrow.');done()}else{log('📚 Your partner cannot reschedule. Attend or miss today.');done()}return;
    }
    if(['honour','miss','conflict'].indexOf(k)<0)return;
    if(k==='conflict'&&!p.session.conflict)return;
    if(k==='honour'){
      var cost=p.kind==='royalty'?G(t.royalty.amount):p.kind==='emergency'?G(t.emergency.amount):0,mins=p.kind==='study'?t.study.minutes:p.kind==='royalty'?t.royalty.minutes:t.emergency.minutes;
      if(p.kind==='emergency'&&(S.cash-cost<G(t.emergency.reserve)||S.ap<mins)){p.session=null;p.progress++;log('Emergency help excused: you cannot afford the money or time.');return done()}
      if(!spendMin(mins,cost))return;
      if(cost)r.cash+=cost;if(p.kind==='study'){S.know=clamp(S.know+t.study.knowledge);r.know=clamp(r.know+t.study.knowledge);S.energy=clamp(S.energy+t.study.energy);S.studyMin+=mins}
      p.progress++;relAdd(r,t.honourRel);log('📜 You honoured '+contractName(p.kind)+'.','good');
    }else{
      if(k==='conflict'){var c=p.session.conflict,C=CONFIG.rivals.contracts;if(c==='shift'){if(!spendMin(t.study.minutes,0))return;S.cash+=G(C.conflictShift)}else if(c==='social'){if(!spendMin(t.study.minutes,0))return;S.happy=clamp(S.happy+C.conflictSocialHappy)}else{if(!spendMin(t.study.minutes,0))return;S.energy=clamp(S.energy-t.study.energy)}}
      p.missed++;relAdd(r,t.missRel);log('📜 You missed the obligation: relationship '+sg(t.missRel)+'.','warn');
    }
    p.next=S.day+(p.kind==='study'?t.study.gap:p.kind==='royalty'?t.royalty.everyDays:1);p.session=null;done();
  }
  function addSocialEvent(k,i,known){
    var E=CONFIG.rivals.socialEvents,e={id:S.socialN=(S.socialN||0)+1,kind:k,i:i,day:S.day,expires:S.day+E.expiryDays,known:!!known,done:false};
    S.socialEvents=(S.socialEvents||[]).filter(function(x){return !x.done&&S.day<=x.expires}).slice(-(E.maxHistory-1));S.socialEvents.push(e);return e;
  }
  function socialTick(){
    var E=CONFIG.rivals.socialEvents;if(!canBetray())return;
    (S.socialEvents||[]).forEach(function(e){if(!e.done&&!e.known&&S.day>e.day&&S.day<=e.expires&&rrand()<E.discoveryChance){e.known=true;var r=S.rivals[e.i];if(r&&e.kind==='betrayal'){relAdd(r,E.betrayRel);repAdd(r,PX().rep.betray)}S.notes.push({l:'warn',t:'Evidence identified '+(r?r.name:'a departed rival')+' as the source of '+(e.kind==='rumour'?'the misleading rumour':'the leaked plans')+'. You can confront or forgive them in Messages.'})}});
    if((S.socialLast&&S.day-S.socialLast<E.cooldown)||rrand()>=E.chance)return;
    var rs=S.rivals.map(function(r,i){return i}).filter(function(i){return !S.rivals[i].out});if(!rs.length)return;
    var i=rs[Math.floor(rrand()*rs.length)],r=S.rivals[i],traitor=(r.rel||0)>=CONFIG.rivals.social.friendAt,k=traitor?'betrayal':'rumour';
    addSocialEvent(k,i,false);S.socialLast=S.day;
    if(traitor){S.leak={until:S.day+PX().betray.leakDays-1};S.notes.push({l:'warn',t:'Someone secretly leaked your plans to a competitor. Their source is unknown; evidence may emerge later.'})}
    else{S.rivals.forEach(function(o,j){if(!o.out&&j!==i)relAdd(o,E.rumourRel)});if(rs.length>1){var other=rs.filter(function(j){return j!==i}),a=other[0],b=other.length>1?other[1]:i,key=[a,b].sort().join('|');S.rivalRelations[key]=(S.rivalRelations[key]||0)+E.rumourOtherRel}
      S.notes.push({l:'warn',t:'A misleading story is circulating. It damaged trust in you and between townspeople. Its source is unknown.'})}
  }
  function socialRows(){
    var h='',E=CONFIG.rivals.socialEvents;
    (S.socialEvents||[]).forEach(function(e){if(e.done||S.day>e.expires)return;var r=S.rivals[e.i];if(!r)return;
      h+=arow(e.known?r.name+' · '+(e.kind==='rumour'?'source of misleading rumours':'betrayal discovered'):'Unknown source · '+(e.kind==='rumour'?'misleading rumours':'leaked plans'),chip('','Day '+e.day),e.known?btn('social',e.id+'|confront','Confront')+btn('social',e.id+'|forgive','Forgive',1)+(e.confronted?btn('social',e.id+'|reconcile','Reconcile',1):''):'','Response costs '+hm(E.minutes)+'. '+(e.confronted?'They have heard your challenge; reconciliation is now available.':'Evidence must identify the source before confrontation.'));
    });return h;
  }
  function socialDecision(arg){
    var a=String(arg).split('|'),e=(S.socialEvents||[]).find(function(x){return x.id===+a[0]}),k=a[1],E=CONFIG.rivals.socialEvents;
    if(!e||!e.known||e.done||S.day>e.expires||['confront','forgive','reconcile'].indexOf(k)<0)return refuse('No discovered incident awaits this response.');
    if(k==='confront'&&e.confronted)return refuse('Already confronted.');if(k==='reconcile'&&!e.confronted)return refuse('Confront the incident first.');
    var r=S.rivals[e.i];if(!r)return refuse('That rival is no longer in town.');if(!spendMin(E.minutes,0))return;
    if(k==='confront'){e.confronted=true;relAdd(r,E.confrontRel)}else{relAdd(r,k==='forgive'?E.forgiveRel:E.reconcileRel);e.done=true}
    log('💬 '+r.name+': '+k+'. Relationship '+sg(k==='confront'?E.confrontRel:k==='forgive'?E.forgiveRel:E.reconcileRel)+'.');done();
  }
  var bankQuick={};
  function bankPresetAmount(id,preset,lim){
    var key=S.day+'|'+modernBankMode+'|'+lim.max,old=bankQuick[id];
    if(!old||old.key!==key)old=bankQuick[id]={key:key,base:lim.max,total:0};
    old.total=preset==='max'?lim.max:Math.min(lim.max,old.total+(preset==='quarter'?old.base/4:Number(preset)));
    return Math.floor(old.total);
  }
  function interestProjection(id,n){
    var fd=id==='amt_fd',rate=fd?Math.max(CAP.fd[0],Math.min(CAP.fd[1],expRet('fd'))):S.rate,days=fd?4:1,v=n;
    for(var d=0;d<days;d++)v+=fd?v*rate/100:Math.floor(v*rate/100);
    return 'On the selected '+money(n)+': '+(fd?'fixed deposit':'savings')+' at '+rate.toFixed(2)+'% per game day × '+days+' day(s); projected interest '+money(Math.round(v)-n)+', proceeds '+money(Math.round(v))+'. Projection assumes today’s rate persists; actual rates can change.';
  }

  /* ---------- AI rivals (CONFIG.rivals): computer players who live the same days in the same town ----------
    Only in a game with rivals (S.mode 'rivals'). Each rival is a small record in S.rivals; rivalTick() plays the day each one
    has just had, overnight, with the game's own numbers (pay, prices, fees, the economy, the storylines, the endings).
    Rivals use their own random numbers (rrand, from S.rivalSeed), so they never change the dice of your own game. */
  function rrand(){var a=S.rivalSeed|0;a=a+0x6D2B79F5|0;S.rivalSeed=a;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
  /* Personality and memory helpers never use Math.random, and rendering never rolls dice. */
  var RIVAL_MEMORIES={
    lent:'You lent me money when I asked.',refused:'You turned down my request for a loan.',expired:'You left my loan request unanswered.',
    repaid:'You paid me back on time.',defaulted:'You did not pay me back on time.',
    car:'You gave me a lift to an interview.',cake:'You chipped in for my birthday cake.',cover:'You covered my shift.',soup:'You brought soup when I was ill.',move:'You helped me move.',
    no_car:'You could not help me get to my interview.',no_cake:'You skipped my birthday collection.',no_cover:'You declined to cover my shift.',no_soup:'You sent a text instead of visiting when I was ill.',no_move:'You could not help me move.',
    returned:'I returned a favour with a job introduction.',
    betrayed:'You walked out on our pact and took the pot.'
  };
  function prepareRival(r,i,seed){
    var keys=Object.keys(CONFIG.rivals.personalities),M=CONFIG.rivals.memory;
    delete r.avoidCareer;delete r.avoidTrack;delete r.avoidCareers;  /* the midgame career switch was replaced by archetypes (CHANGELOG 109) */
    if(keys.indexOf(r.personality)<0)r.personality=keys[((seed>>>0)+(i||0))%keys.length];
    var arcs=Object.keys(CONFIG.rivals.archetypes);if(arcs.indexOf(r.archetype)<0)r.archetype=arcs[((seed>>>0)+2*(i||0)+1)%arcs.length];  /* old saves: a fixed pick, no dice; three rivals never share one */
    var f=r.favours;if(!f||typeof f!=='object')f=r.favours={trust:0,owed:0,entries:[]};
    f.trust=Math.max(-M.maxTrust,Math.min(M.maxTrust,Number.isFinite(f.trust)?f.trust:0));
    f.owed=Math.max(0,Math.min(M.maxOwed,Number.isFinite(f.owed)?Math.floor(f.owed):0));
    f.entries=(Array.isArray(f.entries)?f.entries:[]).filter(function(e){return e&&Object.prototype.hasOwnProperty.call(RIVAL_MEMORIES,e.key)&&Number.isFinite(e.day)}).slice(0,M.maxEntries);
    return r;
  }
  function personality(r){return CONFIG.rivals.personalities[r.personality]||CONFIG.rivals.personalities.generous}
  function personalityLabel(r){var P=personality(r);return P.icon+' '+P.name}
  function rivalChance(r,base,kind){var M=CONFIG.rivals.memory,f=r.favours;return Math.max(0,Math.min(1,base+(personality(r)[kind]||0)+(kind==='lend'&&f?f.trust*M.lendPerTrust:0)))}
  function remember(r,key,trust,owe){
    if(S.mode!=='rivals'||!Object.prototype.hasOwnProperty.call(RIVAL_MEMORIES,key))return false;
    prepareRival(r,S.rivals.indexOf(r),S.rivalSeed);var f=r.favours,M=CONFIG.rivals.memory;
    if(f.entries.some(function(e){return e.key===key&&e.day===S.day}))return false;
    var d=trust<0?trust*personality(r).grudge:trust;
    f.trust=Math.max(-M.maxTrust,Math.min(M.maxTrust,f.trust+d));if(owe)f.owed=Math.min(M.maxOwed,f.owed+1);
    f.entries.unshift({key:key,day:S.day});f.entries=f.entries.slice(0,M.maxEntries);return true;
  }
  function memoryLine(r){var f=r.favours,e=f&&f.entries&&f.entries[0];return e?'“'+RIVAL_MEMORIES[e.key]+'”':''}
  function memoryProfile(r){var P=personality(r),f=r.favours,A=archetype(r),h=(A?'<li>'+archetypeLabel(r)+': '+A.about+'</li>':'')+'<li>'+personalityLabel(r)+': '+P.about+'</li>';
    var ri=S.rivals.indexOf(r);Object.keys(S.rivalRelations||{}).forEach(function(key){var ids=key.split('|').map(Number);if(ids.indexOf(ri)<0)return;var o=S.rivals[ids[0]===ri?ids[1]:ids[0]];if(o)h+='<li>Trust with '+o.name+': '+sg(S.rivalRelations[key])+'</li>'});
    h+='<li>'+loanReliability(r)+'</li>';
    if(f&&f.owed)h+='<li>🤝 Remembers '+f.owed+' favour'+(f.owed===1?'':'s')+' to return. A job introduction may come on a later morning while you are on speaking terms.</li>';
    if(f&&f.entries.length)h+='<li><b>What they remember</b><ul>'+f.entries.map(function(e){return '<li>Day '+e.day+': '+RIVAL_MEMORIES[e.key]+'</li>'}).join('')+'</ul></li>';
    return h;
  }
  function favourTick(){
    if(S.mode!=='rivals'||tipOn())return;
    for(var i=0;i<S.rivals.length;i++){var r=S.rivals[i],f=r.favours;
      if(r.out||!f||!f.owed||(r.rel||0)<0||f.entries.some(function(e){return e.day>=S.day})||rrand()>=personality(r).returnChance)continue;
      f.owed--;remember(r,'returned',0,false);S.tip={until:S.day+CONFIG.community.tip.days-1};
      S.notes.push({l:'good',t:'🤝 '+r.ic+' '+r.name+' remembered your help and returned a favour with a job introduction. Your next interview is easier and has an opening (until day '+S.tip.until+').'});return;
    }
  }
  function rivalLv(r,t){var c=TRACKS[t].c,n=r.edu[t]||0,k=0;c.forEach(function(e){if(n>=e)k++});return k}
  function rivalMeets(r,rk){return (rk.q||[]).every(function(q){return rivalLv(r,q[0])>=q[1]})}
  function rivalJob(r){return r.job&&CAREERS[r.job.c]?{c:r.job.c,i:r.job.i,rk:CAREERS[r.job.c].ranks[r.job.i],b:bOf(r.job.c)}:null}
  function rivalWorth(r){return Math.round(r.cash+r.bank+(r.etf||0)+(S.rivals.indexOf(r)<0?0:rivalMoney(S.rivals.indexOf(r))))}
  /* a rival's level, adjusted by its archetype (CONFIG.rivals.archetypes): the numbers rivalDay() plays with */
  function archetype(r){return r&&CONFIG.rivals.archetypes[r.archetype]||null}
  function archetypeLabel(r){var A=archetype(r);return A?A.icon+' '+A.name:''}
  function rivalSkill(r){
    var K=CONFIG.rivals.levels[r.diff]||CONFIG.rivals.levels.medium,A=archetype(r);if(!A)return K;var B=['none','savings','invest'],b=B.indexOf(K.bank);
    return Object.assign({},K,{shifts:Math.max(Math.min(1,K.shifts),K.shifts+(A.shifts||0)),  /* never below one shift a day: less does not pay the bills */studyHours:K.studyHours*(A.study||1),moraleAim:Math.max(0,Math.min(100,K.moraleAim+(A.morale||0))),
      bank:b<0?K.bank:B[Math.min(B.length-1,b+(A.bank||0))],social:A.social==null?K.social:A.social});
  }
  function makeRivals(n,level,cash){
    var R=CONFIG.rivals,lv=['easy','medium','expert'],out=[],types=Object.keys(R.personalities),arcs=Object.keys(R.archetypes);
    for(var q=types.length-1;q>0;q--){var z=Math.floor(rrand()*(q+1)),tmp=types[q];types[q]=types[z];types[z]=tmp}
    for(var qa=arcs.length-1;qa>0;qa--){var za=Math.floor(rrand()*(qa+1)),ta=arcs[qa];arcs[qa]=arcs[za];arcs[za]=ta}  /* archetypes: one each, no two alike */
    for(var i=0;i<n;i++){var d=level==='mixed'?lv[i%3]:level,edu={};Object.keys(TRACKS).forEach(function(t){edu[t]=0});
      out.push({home:'apt',loanHistory:{paid:0,late:0,defaulted:0},personality:types[i%types.length],archetype:arcs[i%arcs.length],favours:{trust:0,owed:0,entries:[]},name:R.names[i],ic:R.icons[i],diff:d,cash:cash,bank:0,etf:0,energy:CONFIG.start.energy,happy:70,health:CONFIG.health.start,know:10,edu:edu,
        job:null,best:null,study:null,target:null,clothes:{casual:CONFIG.clothes.startCasualDays,smart:0,suit:0},shiftsAt:{},shut:0,
        out:null,tier:-1,lowH:0,lowE:0,broke:0,hungry:0,hist:[],log:[],y:cash,life:blankLife(),rankDay:{},bestJob:null,rel:0,rep:CONFIG.rivals.politics.rep.start,drift:0,sabOn:[],sabUsed:0,grudge:0,places:[]})}
    return out;
  }
  /* the job worth aiming for: the best pay x days it could be worked, among jobs whose missing qualifications fit in the days left */
  function rivalModHours(t,n){return lesCount(t,n)*lesHours(t,n)}
  /* clothes: what a rival is dressed for, and the stricter dress its best open, better-paid, qualified role needs ('' = none) */
  function rivalDressDays(r,d){var c=r.clothes||{};return Math.max(c.suit||0,d==='suit'?0:c.smart||0,d==='casual'?c.casual||0:0)}  /* days left on the best outfit that meets dress d */
  function rivalDressed(r,d){var c=r.clothes||{};return d==='suit'?c.suit>0:d==='smart'?(c.smart>0||c.suit>0):(c.casual>0||c.smart>0||c.suit>0)}
  function rivalDressUp(r,j){
    var best=null;
    Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){
      if(!rk.dress||rivalDressed(r,rk.dress))return;if(j&&j.c===c&&j.i>=i)return;
      if(!rivalMeets(r,rk)||kreq(rk)>Math.floor(r.know))return;
      if(S.closed[c+'_'+i]||shutLeft(bOf(c))>0)return;if(needsExp(rk)&&(r.shiftsAt[bOf(c)]||0)<CONFIG.jobs.experience.shifts)return;
      var pay=rolePay(c,i);if(j&&pay<=rolePay(j.c,j.i))return;
      if(!best||pay>best.pay)best={d:rk.dress,pay:pay};
    })});
    return best?best.d:'';
  }
  function rivalTarget(r,daysLeft,perDay){
    var best=null;
    Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){
      var h=0;(rk.q||[]).forEach(function(q){var T=TRACKS[q[0]],end=T.c[q[1]-1];for(var m=r.edu[q[0]]||0;m<end;m++)h+=rivalModHours(q[0],m)});
      if(h>daysLeft*perDay)return;if(kreq(rk)>r.know+h*0.9+6)return;
      var pay=rolePay(c,i),v=pay*Math.max(0,daysLeft-Math.ceil(h/perDay)-1)*careerPreference(r,c,rk);
      if(rk.dress&&!rivalDressed(r,rk.dress))v-=G(WEAR[rk.dress].p);  /* the clothes the role needs are part of its price */
      if(shutLeft(bOf(c))>0||S.closed[c+'_'+i])v*=CONFIG.rivals.career.closedWeight;
      if(needsExp(rk)&&(r.shiftsAt[bOf(c)]||0)<CONFIG.jobs.experience.shifts)v*=CONFIG.rivals.career.experienceWeight;
      if(!best||v>best.v)best={c:c,i:i,v:v};
    })});
    return best;
  }
  /* an effect-token string applied to a rival (h, l, e, n, c; a~b rolls on the rivals' dice) */
  function rivalFx(r,str){
    String(str||'').split(/\s+/).forEach(function(tk){var m=tokRe.exec(tk);if(!m)return;
      var sgn=m[2]==='-'?-1:1,a=+m[3],b=m[4]?+m[4]:a,v=Math.round(sgn*(a===b?a:Math.min(a,b)+rrand()*Math.abs(b-a)));  /* the same reading as applyFx0 */
      var c100=function(x){return Math.max(0,Math.min(100,x))};
      if(m[1]==='h')r.happy=c100(r.happy+v);else if(m[1]==='l')r.health=c100(r.health+v);else if(m[1]==='e')r.energy=c100(r.energy+v);else if(m[1]==='n')r.know=c100(r.know+v);else if(m[1]==='c')r.cash+=v});
  }
  /* a rival's chance of falling ill tonight: your rule (CONFIG.illness by energy and health, difficulty, pandemics), without the gym and diet */
  function rivalIllChance(r){
    var I=CONFIG.illness,rows=I.byEnergy.slice().sort(function(a,b){return a.energyUnder-b.energyUnder}),base=rows[rows.length-1].chance;
    if((r.lowN||0)>=I.lowNights)for(var i=0;i<rows.length;i++)if(r.energy<rows[i].energyUnder){base=rows[i].chance;break}
    var hr=I.byHealth.slice().sort(function(a,b){return b.healthAtLeast-a.healthAtLeast}),hf=1;for(var k=0;k<hr.length;k++)if(r.health>=hr[k].healthAtLeast){hf=hr[k].x||hr[k].chanceX||1;break}
    return Math.min(I.maxChance,Math.max(0,base*I.cutForEveryone-I.minusForEveryone)*hf*Df().ill*trendIll());
  }
  function rivalNote(r,t,txt){r.log.unshift('Day '+(S.day-1)+': '+txt);r.log=r.log.slice(0,8);if(t)S.notes.push({l:'rem',t:'🏁 '+r.ic+' '+r.name+' '+txt,rv:t===2?S.rivals.indexOf(r):null,c:'news',g:'r'+S.rivals.indexOf(r),s:txt})}  /* t: 0 log only, 1 news, 2 news you can congratulate them on */
  /* one rival's day (the day that has just ended) */
  function rivalDay(r){
    var K=rivalSkill(r),AM=CONFIG.rivals.aims,FDc=CONFIG.food,day=S.day-1,used=CONFIG.rivals.dayOverheadMinutes||0,mistake=rrand()<K.mistakeChance?['meal','study','lazy','clothes','fun'][Math.floor(rrand()*5)]:'',left=gameLen()-day;
    var clamp100=function(v){return Math.max(0,Math.min(100,v))};
    if(r.focus&&AM){K=Object.assign({},K);if(r.focus==='happiness')K.moraleAim=Math.max(K.moraleAim,r.aimHappy||0);if(r.focus==='education')K.studyHours+=AM.studyHours}  /* today's Life Score focus (aimTick) */
    /* eat */
    var meal=Math.round(G(FDc.basic.cost)*(1-(FDc.bundleDiscount||0)));
    if(mistake!=='meal'&&r.cash>=meal){r.cash-=meal;r.energy=clamp100(r.energy+FDc.basic.energy);r.happy=clamp100(r.happy+FDc.basic.happiness);r.health=clamp100(r.health+FDc.basic.health);r.hungry=0;used+=90}
    else r.hungry++;
    /* aim (medium, expert) */
    if(K.plans&&(!r.target||day%3===1))r.target=rivalTarget(r,left,K.studyHours||1);
    /* clothes for the job (or the one aimed for) */
    var j=rivalJob(r),want=(j&&j.rk.dress)||'casual';
    var dressed=function(d){return rivalDressed(r,d)};
    /* replace the outfit when it has run out or is on its last day: a rival with no clothes can neither work nor take gigs,
       so clothes come before the rent (a short rent shortfall is earned back the next day) */
    var wd=rivalDressDays(r,want),cp=G(WEAR[want].p);
    if(mistake!=='clothes'&&wd<=1){if(r.cash<cp&&r.bank>0){var w=Math.min(r.bank,cp-r.cash+20);r.bank-=w;r.cash+=w}if(r.cash>=cp){r.cash-=cp;r.clothes[want]=WEAR[want].w;used+=30}}
    /* dress for the best better-paid role it already qualifies for, so a dress code never locks a rival out of a job
       (bought with the rent still covered; no dice) */
    var up=rivalDressUp(r,j);
    if(up&&mistake!=='clothes'&&!dressed(up)){var cu=G(WEAR[up].p);if(r.cash+r.bank-cu>=HOUSE.apt.rent){if(r.cash<cu){var wu=Math.min(r.bank,cu-r.cash);r.bank-=wu;r.cash+=wu}r.cash-=cu;r.clothes[up]=WEAR[up].w;used+=30}}
    /* apply for a better job it qualifies for (openings are shared with yours) */
    for(var a=0;a<K.applyTries;a++){
      var val=function(c,i){return (K.usesOutlook?rolePay(c,i):CAREERS[c].ranks[i].pay)*careerPreference(r,c,CAREERS[c].ranks[i])+(r.target&&bOf(c)===bOf(r.target.c)?CONFIG.rivals.career.targetBonus:0)},cp0=j?val(j.c,j.i):0,best=null;  /* the target's workplace is worth a little extra (work experience) */
      Object.keys(CAREERS).forEach(function(c){CAREERS[c].ranks.forEach(function(rk,i){
        if(j&&j.c===c&&j.i>=i)return;if(!rivalMeets(r,rk)||kreq(rk)>Math.floor(r.know))return;
        if(S.closed[c+'_'+i]||shutLeft(bOf(c))>0||sabSnagged(r,c+'_'+i,day))return;if(needsExp(rk)&&(r.shiftsAt[bOf(c)]||0)<CONFIG.jobs.experience.shifts)return;
        if(rk.dress&&!dressed(rk.dress))return;if(j&&rolePay(c,i)<rolePay(j.c,j.i))return;var g=val(c,i)-cp0;
        if(g>0&&(!best||g>best.g))best={c:c,i:i,g:g};
      })});
      if(!best)break;used+=60;
      var pp=Math.max(0.2,Math.min(0.95,0.82-0.05*best.i+r.know/400+(r.happy-50)/300-(r.energy<30?0.1:0)+repInterview(repOf(r))+(rivalPactOf(S.rivals.indexOf(r))?PX().rivalPacts.applyBonus:0)+sabInterview(r,day)));
      if(rrand()<pp){var was=j;r.job={c:best.c,i:best.i};r.took=best.c+'_'+best.i;j=rivalJob(r);rivalNote(r,2,(was&&was.c===best.c?'was promoted to ':'got a new job: ')+j.rk.r+' at the '+NAME[j.b]+'.');
        if(!r.bestJob||j.rk.pay>r.bestJob.pay)r.bestJob={r:j.rk.r,pay:j.rk.pay};break}
    }
    /* ill: no work or lessons; a rival who can spare the money pays for treatment (cured from tomorrow) */
    if(r.ill){var IL=ILL[r.ill.k],fee=G(IL.cost||Math.round((IL.lo+IL.hi)/2));if(K.bank!=='none'&&r.cash+r.bank>fee+HOUSE.apt.rent+G(WEAR[want].p)){var wf=Math.max(0,fee-r.cash);r.bank-=wf;r.cash+=wf-fee;r.ill.d=0;used+=120;rivalNote(r,0,'paid '+money(fee)+' to be treated for '+illShort(IL)+'.')}}
    /* work */
    var shifts=Math.floor(K.shifts)+(rrand()<K.shifts%1?1:0)-(mistake==='lazy'?1:0)-(r.ill?99:0),load=0;  /* 2.5 = a third shift on about half of days */
    var targetRank=r.target&&CAREERS[r.target.c]&&CAREERS[r.target.c].ranks[r.target.i];
    var missing=targetRank&&(targetRank.q||[]).some(function(q){return rivalLv(r,q[0])<q[1]});
    var studyReserve=K.plans&&missing&&mistake!=='study'?Math.min(K.studyHours,CONFIG.burnout.loadMinutes/60)*60:0;
    /* time kept for class never shuts out the day's first shift (a scholar's long study day would otherwise leave no pay at all) */
    if(studyReserve&&j)studyReserve=Math.max(0,Math.min(studyReserve,CONFIG.burnout.loadMinutes-effort(j.rk.pay).min));
    var idle=!j||r.shut>0;
    if(r.shut>0)r.shut--;
    else for(var s=0;s<shifts&&j;s++){
      var ef=effort(j.rk.pay);if(r.energy-ef.en<25+(studyReserve?Math.abs(CONFIG.education.lessonEnergyPerHour||5)*studyReserve/60:0)||load+ef.min>CONFIG.time.maxWorkMinutes||(studyReserve&&load+ef.min>CONFIG.burnout.loadMinutes-studyReserve)||!dressed(j.rk.dress||'casual'))break;
      var pm=(r.happy<20?.6:r.happy<25?.75:r.happy<40?.9:1)*(r.energy<30?.85:1)*(r.health<CONFIG.health.poorBelow?CONFIG.health.poorPay:1)*(sabHas(r,'boss',day)?SBX().moves.boss.pay:1);
      var pay=Math.round(Math.round(rolePay(j.c,j.i)*payIdx()*(1+r.know/400))*pm);
      r.cash+=pay;r.energy=clamp100(r.energy-ef.en);r.happy=clamp100(r.happy-workHap(ef.en));r.health=clamp100(r.health+workHp(ef.min));
      r.shiftsAt[j.b]=(r.shiftsAt[j.b]||0)+1;load+=ef.min;used+=ef.min;
    }
    /* no job, or the workplace is closed: delivery runs instead, at the standard 4-star fare (CONFIG.side.gig; no dice) */
    if(idle&&!r.ill&&mistake!=='lazy'&&dressed('casual')){var GG=CONFIG.side.gig;
      for(var gi=0;gi<Math.min(GG.maxRuns,Math.ceil(K.shifts)+1)&&r.energy+GG.energy>=25&&load+GG.minutes<=CONFIG.time.maxWorkMinutes;gi++){
        r.cash+=Math.round(GG.pay*payIdx());r.energy=clamp100(r.energy+GG.energy);r.happy=clamp100(r.happy-workHap(-GG.energy));r.health=clamp100(r.health+workHp(GG.minutes));load+=GG.minutes;used+=GG.minutes;r.gigs=(r.gigs||0)+1}}
    /* study towards the target (or anything, for easy rivals now and then) */
    var tg=r.target&&CAREERS[r.target.c]&&CAREERS[r.target.c].ranks[r.target.i],need=tg?(tg.q||[]).filter(function(q){return rivalLv(r,q[0])<q[1]}):[];
    if(!K.plans&&!r.study&&rrand()<K.studyChance){var ts=Object.keys(TRACKS).filter(function(t){return (r.edu[t]||0)<totMods(t)});
      if(ts.length){var tw=(archetype(r)||{}).tracks||{},tot=ts.reduce(function(n,t){return n+(tw[t]||1)},0),pick=rrand()*tot,tt=ts[ts.length-1];  /* any pathway, weighted by the archetype's taste */
        for(var ti=0;ti<ts.length;ti++){pick-=tw[ts[ti]]||1;if(pick<0){tt=ts[ti];break}}need=[[tt,9]]}}
    if(tg&&r.study&&!need.some(function(q){return q[0]===r.study.t})){(r.pausedStudy||(r.pausedStudy={}))[r.study.t]=r.study;r.study=null}
    if(!r.study&&need.length&&r.pausedStudy&&r.pausedStudy[need[0][0]]){r.study=r.pausedStudy[need[0][0]];delete r.pausedStudy[need[0][0]]}
    if(!r.ill&&mistake!=='study'&&!sabClass(r,day)&&(need.length||r.study)&&rrand()<K.studyChance){
      var t=r.study?r.study.t:need[0][0];
      if(!r.study){var n0=r.edu[t]||0,fee=qualFee(t,n0),keep=HOUSE.apt.rent+80+G(WEAR[want].p);  /* a fee never spends the money for the next outfit */if(r.cash-fee<keep&&r.bank>0){var w2=Math.min(r.bank,keep+fee-r.cash);r.bank-=w2;r.cash+=w2}
        if(r.cash-fee>=keep){r.cash-=fee;r.study={t:t,lv:levelOf(t,n0),h:0}}}
      if(r.study){var hrs=Math.min(K.studyHours,(CONFIG.burnout.loadMinutes-load)/60,Math.max(0,(r.energy-25)/Math.abs(CONFIG.education.lessonEnergyPerHour||5)));
        if(hrs>=0.5){r.wentSchool=1;var lc=lessonCost(hrs);r.energy=clamp100(r.energy+lc.en);r.happy=clamp100(r.happy+lc.hap);r.health=clamp100(r.health+lc.hp);r.know=clamp100(r.know+Math.round(hrs));used+=hrs*60;
          r.study.h+=hrs;var T=TRACKS[r.study.t];
          while(r.study&&r.study.h>=rivalModHours(r.study.t,r.edu[r.study.t]||0)){r.study.h-=rivalModHours(r.study.t,r.edu[r.study.t]||0);r.edu[r.study.t]=(r.edu[r.study.t]||0)+1;r.know=clamp100(r.know+2+r.study.lv);
            var nl=rivalLv(r,r.study.t);if(nl>r.study.lv){var E2=CONFIG.education,ln=T.lv[nl-1];r.know=clamp100(r.know+((E2.certKnowledge||{})[ln]||0));r.happy=clamp100(r.happy+((E2.certHappiness||{})[ln]||0));
              rivalNote(r,nl>=2?2:0,'earned a '+T.n+' '+ln+'.');r.study=null}
            else if((r.edu[r.study.t]||0)>=totMods(r.study.t))r.study=null}}}
    }
    /* morale: free and cheap lifts, cheapest first, up to the level's aim (CONFIG.community and CONFIG.leisure) */
    if(mistake!=='fun'&&r.happy<K.moraleAim){var L=CONFIG.leisure,C=CONFIG.community,acts=[L.call,L.walk];if(K.social&&C)acts.push(C.volunteer,C.karaoke,C.nightOut);
      acts.forEach(function(c){if(!c||r.happy>=K.moraleAim||used+c.minutes>1440-360)return;var cost=G(c.cost||0);if(r.cash-cost<HOUSE.apt.rent)return;if(c.energy&&r.energy+c.energy<25)return;
        if(c!==L.call&&c!==L.walk)r.wentComm=1;r.cash-=cost;r.happy=clamp100(r.happy+(c.happiness||0));r.energy=clamp100(r.energy+(c.energy||0));r.health=clamp100(r.health+(c.health||0));if(c.knowledge)r.know=clamp100(r.know+c.knowledge);used+=c.minutes})}
    /* chasing a health place: a class at the Gym, paid with the rent and the next outfit still covered (CONFIG.rivals.aims.gymClass) */
    if(r.focus==='health'&&!r.ill&&mistake!=='fun'){var gc=null;(CONFIG.gym.classes||[]).forEach(function(c){if(c.k===AM.gymClass)gc=c});
      if(gc&&used+gc.minutes<=1440-360&&r.energy+gc.energy>=25){var gcost=G(gc.cost);if(r.cash-gcost>=HOUSE.apt.rent+G(WEAR[want].p)){r.cash-=gcost;r.energy=clamp100(r.energy+gc.energy);r.health=clamp100(r.health+gc.health);r.happy=clamp100(r.happy+(gc.happiness||0));used+=gc.minutes;r.wentGym=1}}}
    /* money: savings (medium), savings and the ETF in a good market (expert) */
    var keepC=HOUSE.apt.rent+150+G(WEAR.casual.p);
    if(K.bank!=='none'&&r.cash>keepC+50){r.bank+=r.cash-keepC;r.cash=keepC}
    if(K.bank==='invest'){if(S.mkt>0.3&&r.bank>300){var mv=Math.round(r.bank/2);r.bank-=mv;r.etf+=mv}else if(S.mkt<-0.3&&r.etf>0){r.bank+=r.etf;r.etf=0}}
    /* where a rival spends its days: where you may meet them tomorrow */
    var jb=rivalJob(r);r.places=[jb?jb.b:null,r.wentSchool?'school':null,r.wentComm?'comm':null,r.wentGym?'gym':null,'market'].filter(Boolean);r.wentSchool=0;r.wentComm=0;r.wentGym=0;
    return used;
  }
  /* the night for one rival: sleep, hunger, clothes wear, interest, rent, layoffs, endings and news */
  function rivalNight(r,used){
    var SL=CONFIG.sleep,HN=CONFIG.health.nightly,FDc=CONFIG.food,clamp100=function(v){return Math.max(0,Math.min(100,v))};
    var I=CONFIG.illness,RV=CONFIG.rivals,leftMin=Math.max(0,1440-used-60);
    r.lowN=r.energy<I.lowEnergyBelow?Math.min(I.lowWindow,(r.lowN||0)+1):Math.max(0,(r.lowN||0)-1);  /* low-energy nights, as for you */
    (S.nightFx||[]).forEach(function(f){rivalFx(r,f)});  /* tonight's global and industry storyline chapters hit everyone */
    var LE=RV.lifeEvents;if(LE&&rrand()<LE.chance)rivalFx(r,LE.outcomes[Math.floor(rrand()*LE.outcomes.length)]);  /* their own daily card */
    if(r.ill){r.health=clamp100(r.health+HN.sick);r.happy=clamp100(r.happy+(ILL[r.ill.k].hap||0));if(--r.ill.d<=0){r.ill=null;rivalNote(r,0,'recovered.')}}
    else if(rrand()<rivalIllChance(r)){var mix=RV.illMix,ks=Object.keys(mix),x=rrand(),k0=ks[ks.length-1];for(var q=0;q<ks.length;q++){x-=mix[ks[q]];if(x<0){k0=ks[q];break}}
      r.ill={k:k0,d:ILL[k0].wk};rivalNote(r,1,'fell ill with '+illShort(ILL[k0])+'.')}
    if(r.energy<HN.lowEnergyBelow)r.health=clamp100(r.health+HN.lowEnergy);
    r.energy=clamp100(r.energy+SL.nightEnergy+Math.min(SL.maxEnergy,Math.round(leftMin/60*SL.perHour.apt*(SL.rateX||1))));
    r.happy=clamp100(r.happy+SL.nightHappiness+sleepHap(leftMin));
    r.health=clamp100(r.health+sleepHealth(leftMin)+(HN.always||0));
    if(r.hungry){r.energy=clamp100(r.energy+FDc.hungryEnergy);r.happy=clamp100(r.happy+FDc.hungryHappiness);r.health=clamp100(r.health+HN.skippedMeal)}
    r.know=clamp100(r.know+CONFIG.selfStudy.nightlyLoss);
    ['casual','smart','suit'].forEach(function(k){if(r.clothes[k]>0)r.clothes[k]=Math.max(0,r.clothes[k]-CONFIG.clothes.wearPerDay)});
    r.bank+=Math.floor(r.bank*S.rate/100);
    if(r.etf>0)r.etf=Math.max(0,r.etf*(1+(expRet('etf')+VOL.etf*(rrand()*2-1)*1.7)/100));
    if((S.day-1)%RENT_EVERY===0){var due=flatmate()===r?flatShare(r):HOUSE.apt.rent,pay=Math.min(due,Math.max(0,r.cash));r.cash-=pay;due-=pay;var b=Math.min(due,r.bank);r.bank-=b;due-=b;r.cash-=due}
    /* layoffs and closures: the industry-specific storyline and the economy's trends, as for you */
    var j=rivalJob(r);
    if(j){var x=indRole(j.c,j.i),I=CONFIG.industry,lay=0;S.trends.forEach(function(t){lay+=t.lay||0});
      if((x&&x.cut===1&&rrand()<I.layoffChance)||rrand()<lay){r.job=null;rivalNote(r,1,'was laid off from '+j.rk.r+' at the '+NAME[j.b]+'.')}
      else if(x&&x.cut&&rrand()<I.suspendChance)r.shut=I.suspendDays[0]+Math.floor(rrand()*(I.suspendDays[1]-I.suspendDays[0]+1))}
    /* ranks and endings, by the same rules as yours */
    var w=rivalWorth(r),t=-1;TIERS.forEach(function(x,i){if(w>=x.v)t=i});
    if(t>r.tier){if(!r.rankDay)r.rankDay={};for(var ti=r.tier+1;ti<=t;ti++)if(r.rankDay[ti]==null)r.rankDay[ti]=S.day-1;r.tier=t;rivalNote(r,2,'reached '+TIERS[t].ic+' '+TIERS[t].n+' ('+money(TIERS[t].v)+').')}
    var SH=CONFIG.shame;if(w<0){r.happy=clamp100(r.happy+SH.debtHappiness);r.energy=clamp100(r.energy+SH.debtEnergy)}else if(w<SH.nearlyBrokeBelow&&S.day-1>=SH.nearlyBrokeFromDay)r.happy=clamp100(r.happy+SH.nearlyBrokeHappiness);  /* money shame, as for you */
    var BR=CONFIG.bankrupt;r.broke=(w<BR.netWorthBelow&&S.day-1>=BR.fromDay)?r.broke+1:0;
    r.lowH=r.happy<=10?r.lowH+1:0;r.lowE=r.energy<=10?r.lowE+1:0;
    var end=r.broke>=BR.daysInARow?'went bankrupt':r.lowH>=3?'gave up':r.lowE>=2?'collapsed from exhaustion':r.hungry>=3?'was hospitalised (no food)':'';
    if(end){r.out={day:S.day-1,why:end};rivalNote(r,1,end+' on day '+(S.day-1)+'. Out of the race.')}
    r.hist.push(w);
  }
  /* ---------- the Life Score (rival games, CONFIG.rivals.scoring) ----------
    Everyone is ranked in each life category; a place earns placePoints (1st, 2nd...) x the category's weight.
    Happiness and health are averages over the days played, so a last-day rest cannot win them.
    Each player keeps a record: life = {h:[happiness each night], l:[health each night], crisis: crisis days, best:{pay, r}}. */
  var LIFE_CATS={
    wealth:   {ic:'💰',n:'Wealth',    v:function(p){return p.worth},                        t:function(p){return money(p.worth)}},
    career:   {ic:'💼',n:'Career',    v:function(p){return p.best?p.best.pay:0},             t:function(p){return p.best?p.best.r:'No job'}},
    happiness:{ic:'😊',n:'Happiness', v:function(p){return lifeAvg(p.life.h)},               t:function(p){return 'average '+Math.round(lifeAvg(p.life.h))}},
    education:{ic:'🎓',n:'Education', v:function(p){return p.levels*1000+(p.know||0)},            t:function(p){return p.levels+' level'+(p.levels===1?'':'s')+' · knowledge '+Math.floor(p.know||0)}},
    health:   {ic:'❤️',n:'Health',    v:function(p){return -(p.life.unwell||0)},              t:function(p){var u=p.life.unwell||0;return u?u+' unwell night'+(u>1?'s':''):'no unwell nights'}},
    stability:{ic:'🛡️',n:'Stability', v:function(p){return -(p.life.crisis||0)},            t:function(p){var c=p.life.crisis||0;return c?c+' crisis day'+(c>1?'s':''):'no crisis days'}},
    first:    {ic:'🏁',n:'First to the line',v:function(p){var s=0;TIERS.forEach(function(x,i){var d=p.rankDay[i];if(d!=null)s+=(gameLen()+1-d)*Math.pow(100,i)});return s},
               t:function(p){var a=[];TIERS.forEach(function(x,i){var d=p.rankDay[i];if(d!=null)a.push(x.ic+' day '+d)});return a.length?a.join(', '):'no rank yet'}},
    rep:      {ic:'🎖️',n:'Reputation',v:function(p){return p.rep},                           t:function(p){return 'reputation '+Math.round(p.rep)}}
  };
  function lifeAvg(a){return a&&a.length?a.reduce(function(x,y){return x+y},0)/a.length:0}
  /* ---------- money between you and your rivals (CONFIG.rivals.money): loans, bets and the 💬 Messages app ----------
    S.rloans: {i rival, dir 'in' (they owe you) | 'out' (you owe them), amt lent, owe still to pay, due (morning of that day), late, def}.
    S.bets: {i, stake (each side's, held until settled), until (last day counted), y0/r0 (your and their net worth at the start)}.
    S.msgs: {id, i, k 'borrow'|'bet', day, until, amt, back, st (null until answered)}. Money only moves between wallets. */
  function MX(){return CONFIG.rivals.money}
  /* what loans and held stakes add to a net worth: i = −1 for you, or a rival's index */
  function rivalMoney(i){
    if(S.mode!=='rivals')return 0;var v=0;
    (S.rloans||[]).forEach(function(l){var sgn=l.dir==='in'?1:-1;v+=i<0?sgn*l.owe:l.i===i?-sgn*l.owe:0});
    (S.bets||[]).forEach(function(b){if(i<0||b.i===i)v+=b.stake});
    if(S.pact&&S.pact.pot&&(i<0||S.pact.i===i))v+=S.pact.pot/2;  /* each side owns half the pot */
    (S.rpacts||[]).forEach(function(q){if(q.pot&&(q.a===i||q.b===i))v+=q.pot/2});
    return v;
  }
  function pick(o,k,d){return o&&o[k]!=null?o[k]:d}  /* a per-level number, where 0 is a real value */
  function relAdd(r,d){r.rel=Math.max(-100,Math.min(100,(r.rel||0)+d));return {d:d,backfire:false}}  /* a straight change, no tension */
  function rloan(i,dir){return (S.rloans||[]).filter(function(l){return l.i===i&&l.dir===dir})[0]}
  function rbet(i){return (S.bets||[]).filter(function(b){return b.i===i})[0]}
  function rivalSpare(r,amt){return r.cash+r.bank-amt>=HOUSE.apt.rent+MX().loan.askBuffer}
  function rivalPay(r,amt){var c=Math.min(amt,Math.max(0,r.cash));r.cash-=c;r.bank-=amt-c}  /* cash first, then bank (the caller checks they have it) */
  function payFromYou(amt){var c=Math.min(amt,Math.max(0,S.cash));S.cash-=c;var b=Math.min(amt-c,Math.max(0,S.bank));S.bank-=b;return c+b}
  function betStake(i){return scaledStake(S,S.rivals[i==null?0:i],MX().bet)}
  function askedToday(k){return S.asked&&S.asked.d===S.day&&S.asked[k]}
  function markAsked(k){if(!S.asked||S.asked.d!==S.day)S.asked={d:S.day};S.asked[k]=1}
  /* what an unpaid debt costs you: on the reminder, the ask row and the note */
  function defaultTxt(r){var L=MX().loan;return 'relationship with '+r.name+' '+sg(L.defaultRel)+', with every other rival '+sg(L.defaultOthersRel)+', '+sg(L.defaultHappiness)+' happiness'}
  function dueTxt(l){var r=S.rivals[l.i];return '💬 Reminder: you owe '+r.ic+' '+r.name+' '+money(l.owe)+', due tomorrow morning (day '+l.due+'). Keep it in your cash or bank: it is taken automatically. If it isn’t paid in full on time, your relationship with '+r.name+' sours ('+sg(MX().loan.defaultRel)+'), the other rivals lose trust in you ('+sg(MX().loan.defaultOthersRel)+' each) and you lose '+Math.abs(MX().loan.defaultHappiness)+' happiness.'}
  function dueTomorrow(){return (S.rloans||[]).filter(function(l){return l.dir==='out'&&!l.def&&l.due===S.day+1})}
  function newMsgs(){return (S.msgs||[]).filter(function(m){return !m.st}).length}
  function startBet(i,stake){var r=S.rivals[i],B=MX().bet;if(!r||r.out||rbet(i)||!canStake(S,stake,B)||!canStake(r,stake,B))return null;S.cash-=stake;r.cash-=stake;var b={i:i,stake:stake,until:S.day+B.days-1,y0:0,r0:0};S.bets.push(b);b.y0=worth();b.r0=rivalWorth(r);return b}
  /* Loans settle in rivalTick. Defer bets during rollover until both sides have their overnight returns and bills. */
  function settleMoney(deferBets){
    var L=MX().loan,X=CONFIG.rivals.social,today=S.day;
    S.rloans=(S.rloans||[]).filter(function(l){
      var r=S.rivals[l.i];if(!r)return false;
      if(l.dir==='in'){  /* a rival owes you */
        if(r.out){loanRecord(r,l,'defaulted');S.notes.push({l:'bad',t:'💬 '+r.ic+' '+r.name+' is out of the race and can’t pay back the '+money(l.owe)+' you lent them.'});return false}
        if(today<l.due)return true;
        var ch=rivalChance(r,pick(L.repay,r.diff,0.8),'repay')+((r.rel||0)>=X.friendAt?L.friendMod:(r.rel||0)<=X.enemyAt?L.enemyMod:0);
        if(r.cash+r.bank>=l.owe&&rrand()<ch){loanRecord(r,l,'paid');rivalPay(r,l.owe);S.cash+=l.owe;relAdd(r,L.repayRel);repAdd(r,PX().rep.repay);S.notes.push({l:'good',t:'💬 '+r.ic+' '+r.name+' paid back the '+money(l.owe)+' they owed you (relationship '+sg(L.repayRel)+').'});return false}
        if(!l.late)loanRecord(r,l,'late');
        if(++l.late>L.lateDays){loanRecord(r,l,'defaulted');relAdd(r,L.rivalDefaultRel);repAdd(r,PX().rep.defaulted);S.happy=clamp(S.happy+L.rivalDefaultHappiness);
          S.notes.push({l:'bad',t:'💬 '+r.ic+' '+r.name+' can’t pay back the '+money(l.owe)+' they owe you. The money is gone: relationship '+sg(L.rivalDefaultRel)+', '+sg(L.rivalDefaultHappiness)+' happiness.'});return false}
        S.notes.push({l:'warn',t:'💬 '+r.ic+' '+r.name+' hasn’t paid back the '+money(l.owe)+' they owe you. They promise tomorrow'+(l.late>=L.lateDays?' (their last chance)':'')+'.'});return true;
      }
      /* you owe a rival: taken from your cash, then your bank */
      if(today<l.due)return true;
      var paid=payFromYou(l.owe);l.owe-=paid;r.cash+=paid;
      if(!l.owe){if(l.def)S.notes.push({l:'good',t:'💬 The last '+money(paid)+' you owed '+r.ic+' '+r.name+' was taken. That debt is cleared.'});
        else{remember(r,'repaid',CONFIG.rivals.memory.repayTrust,false);relAdd(r,L.repayRel);repAdd(S,PX().rep.repay);S.notes.push({l:'good',t:'💬 You paid '+r.ic+' '+r.name+' back '+money(paid)+' on time (relationship '+sg(L.repayRel)+', reputation '+sg(PX().rep.repay)+').'})}return false}
      if(!l.def){l.def=1;remember(r,'defaulted',CONFIG.rivals.memory.defaultTrust,false);relAdd(r,L.defaultRel);repAdd(S,PX().rep.defaulted);S.rivals.forEach(function(o){if(o!==r&&!o.out)relAdd(o,L.defaultOthersRel)});S.happy=clamp(S.happy+L.defaultHappiness);
        S.notes.push({l:'bad',t:'💬 You couldn’t pay '+r.ic+' '+r.name+' back in full this morning ('+(paid?money(paid)+' paid, ':'')+money(l.owe)+' still owed): '+defaultTxt(r)+', reputation '+sg(PX().rep.defaulted)+'. Word gets around. The rest is taken from your cash or bank each morning until it’s paid.'})}
      else if(paid)S.notes.push({l:'warn',t:'💬 '+money(paid)+' was taken towards what you owe '+r.name+' ('+money(l.owe)+' still owed).'});
      return true;
    });
    dueTomorrow().forEach(function(l){S.notes.push({l:'warn',t:dueTxt(l)})});
    if(!deferBets)settleBets();
  }
  function settleBets(){
    if(S.mode!=='rivals')return;
    var B=MX().bet,X=CONFIG.rivals.social,today=S.day;
    if(nightRun)wealthProgress(S.day-1);else wealthProgress();
    var wp=S.pact&&S.pact.kind==='wealth'?S.pact:null;
    /* Snapshot growth before any refunds or winnings change a wallet. */
    var betGrowth=(S.bets||[]).map(function(b){var r=S.rivals[b.i];return {me:worth()-b.y0,them:r?rivalWorth(r)-b.r0:0}});
    if(wp&&S.day>wp.until){var wa=wp.reachedMe,wb=wp.reachedThem;settleContract(wa!=null&&(wb==null||wa<wb)?'win':wb!=null&&(wa==null||wb<wa)?'lose':'tie')}
    S.bets=(S.bets||[]).filter(function(b,bi){
      var r=S.rivals[b.i];if(b.settled)return false;
      if(!r){b.settled=true;S.cash+=b.stake;return false;}
      if(r.out){b.settled=true;S.cash+=b.stake;r.cash+=b.stake;S.notes.push({l:'rem',t:'🎲 '+r.ic+' '+r.name+' is out of the race: your bet is off and your '+money(b.stake)+' stake is back.'});return false}
      if(today<=b.until)return true;
      b.settled=true;
      var me=betGrowth[bi].me,them=betGrowth[bi].them,head='🎲 The bet with '+r.ic+' '+r.name+' is settled: your net worth '+(me<0?'−':'+')+money(Math.abs(Math.round(me)))+', theirs '+(them<0?'−':'+')+money(Math.abs(Math.round(them)))+'. ';
      if(Math.round(me)===Math.round(them)){S.cash+=b.stake;r.cash+=b.stake;S.notes.push({l:'rem',t:head+'A tie: both stakes back.'});return false}
      var win=me>them,enemy=(r.rel||0)<=X.enemyAt,d=win&&enemy?B.enemyLoseRel:B.rel;relAdd(r,d);
      if(win){S.cash+=2*b.stake;S.happy=clamp(S.happy+B.winHappiness)}else{r.cash+=2*b.stake;S.happy=clamp(S.happy+B.loseHappiness)}
      S.notes.push({l:win?'good':'warn',t:head+(win?'You win '+money(b.stake)+' ('+sg(B.winHappiness):'You lose your '+money(b.stake)+' ('+sg(B.loseHappiness))+' happiness, relationship '+sg(d)+(win&&enemy?': '+r.name+' is a sore loser':'')+').'});
      return false;
    });
  }
  /* tonight's message from a rival, if any: a request to borrow (rivals short for rent first) or a bet */
  function rivalMsgTick(){
    var M=MX(),L=M.loan,today=S.day;
    S.msgs=(S.msgs||[]).filter(function(m){
      if(m.until>=today)return true;
      var r=S.rivals[m.i];if(!m.st&&m.k==='pact'&&r&&!r.out){relAdd(r,PX().pact.declineRel);S.notes.push({l:'warn',t:'🤝 You never answered '+r.ic+' '+r.name+'’s pact offer: relationship '+sg(PX().pact.declineRel)+'.'})}
      if(!m.st&&m.k==='borrow'&&r&&!r.out){remember(r,'expired',CONFIG.rivals.memory.refuseTrust,false);relAdd(r,L.refuseRel);S.notes.push({l:'warn',t:'💬 You never answered '+r.ic+' '+r.name+'’s request to borrow '+money(m.amt)+': relationship '+sg(L.refuseRel)+'.'})}
      return false});
    if(today-1<M.firstDay)return;
    var free=S.rivals.map(function(r,i){return i}).filter(function(i){var r=S.rivals[i];return !r.out&&!S.msgs.some(function(m){return m.i===i&&!m.st})});
    if(houseOfferMsg(free))return;
    if(pactOfferMsg(free))return;  /* a pact offer has its own chance, and still makes the night's one message */
    if(rrand()>=M.messageChance)return;
    var ask=free.filter(function(i){var r=S.rivals[i];return !rloan(i,'in')&&(!r.lastLoanAsk||today-r.lastLoanAsk>=L.cooldown)&&rrand()<(r.cash+r.bank<HOUSE[r.home||'apt'].rent+L.askBuffer?L.distressChance:L.askChance)});
    var st=0,bet=free.filter(function(i){var r=S.rivals[i],v=betStake(i);return !rbet(i)&&canStake(S,v,M.bet)&&canStake(r,v,M.bet)&&rrand()<rivalChance(r,pick(M.bet.accept,r.diff,0.5),'bet')});
    var k=ask.length?'borrow':bet.length?'bet':'',pool=k==='borrow'?ask:bet;if(!k)return;
    var i=pool[Math.floor(rrand()*pool.length)],r=S.rivals[i],m={id:(S.msgN=(S.msgN||0)+1),i:i,k:k,day:today,until:today+M.messageDays-1,amt:st,back:0,st:null};
    if(k==='bet')m.amt=betStake(i);
    if(k==='borrow'){r.lastLoanAsk=today;m.amt=Math.round(G(L.min+rrand()*(L.max-L.min))/10)*10;m.back=Math.round(m.amt*(1+L.interest))}
    S.msgs.push(m);
    S.notes.push({l:'rem',t:'💬 New message from '+r.ic+' '+r.name+(k==='borrow'?': can you lend them '+money(m.amt)+'?':': a friendly bet.')+' Open the Messages app on your phone or computer (answer by the end of day '+m.until+').'});
  }
  /* answering a rival's message: msg 'id|yes' or 'id|no' */
  function replyMsg(arg){
    var a=String(arg).split('|'),id=+a[0],yes=a[1]==='yes',M=MX(),L=M.loan,m=(S.msgs||[]).filter(function(x){return x.id===id})[0];
    if(!m||m.st||S.day>m.until)return refuse('That message has already been answered or expired.');
    if(m.k==='house')return replyHouse(m,yes);
    var r=S.rivals[m.i];if(!r||r.out)return refuse('That rival is out of the race.');
    if(yes&&S.cash<m.amt)return refuse('You need '+money(m.amt)+' in cash to '+(m.k==='borrow'?'lend it':'put up the stake')+'.');
    if(yes&&m.k==='bet'&&rbet(m.i))return refuse('You already have a bet running with '+r.name+'.');
    if(yes&&(m.k==='bet'||(m.k==='pact'&&m.amt))&&(!canStake(S,m.amt,m.k==='bet'?M.bet:PX().pact)||!canStake(r,m.amt,m.k==='bet'?M.bet:PX().pact)))return refuse('Both participants must retain their configured cash reserve.');
    if(yes&&m.k==='pact'&&(ally()||hasAlly(m.i)))return refuse(ally()?'You already have a pact with '+ally().name+'.':r.name+' already has a pact with someone else.');
    if(!spendMin(yes?M.replyMinutes:M.noMinutes,0))return;
    var v0=vitSnap(),res;m.st=yes?'yes':'no';
    if(m.k==='pact'){
      if(yes){startPact(m.i,m.amt);log('🤝 You accepted '+r.name+'’s pact'+(m.amt?' with a '+money(m.amt*2)+' pot ('+money(m.amt)+' each)':'')+vitPar(v0)+'. It runs to the end of day '+S.pact.until+'.','good')}
      else{res=relAdd(r,PX().pact.declineRel);log('🤝 You turned down '+r.name+'’s pact'+vitPar(v0)+': '+relTxt(r,res)+'.','warn')}
      done();return;
    }
    if(m.k==='borrow'){
      if(yes){S.cash-=m.amt;r.cash+=m.amt;S.rloans.push({i:m.i,dir:'in',amt:m.amt,owe:m.back,due:S.day+L.days,late:0});remember(r,'lent',CONFIG.rivals.memory.lendTrust,true);S.happy=clamp(S.happy+L.lendHappiness);res=relGain(r,L.lendRel);if(res.backfire)argue();
        log('💬 You lent '+r.name+' '+money(m.amt)+vitPar(v0)+'. They’ll pay back '+money(m.back)+' on the morning of day '+(S.day+L.days)+'. '+(res.backfire?'It still turned into an argument: ':'')+relTxt(r,res)+'.',res.d<0?'warn':'good')}
      else{remember(r,'refused',CONFIG.rivals.memory.refuseTrust,false);res=relAdd(r,L.refuseRel);log('💬 You told '+r.name+' you can’t lend them '+money(m.amt)+vitPar(v0)+': '+relTxt(r,res)+'.','warn')}
    }else{
      if(yes){var b=startBet(m.i,m.amt);m.betUntil=b.until;log('🎲 You took '+r.name+'’s bet: '+money(m.amt)+' each, settled on the morning of day '+(b.until+1)+vitPar(v0)+'.','good')}
      else log('🎲 You turned down '+r.name+'’s bet'+vitPar(v0)+'.','');
    }
    done();
  }
  /* asking a rival to lend you money: rborrow 'i|amount' */
  function askBorrow(arg){
    var a=String(arg).split('|'),i=+a[0],amt=+a[1],r=S.rivals&&S.rivals[i],M=MX(),L=M.loan;
    if(!r||r.out)return refuse('That rival is out of the race.');
    if(rloan(i,'out'))return refuse('You still owe '+r.name+'. Pay that back first.');
    if(askedToday('l'+i))return refuse('You already asked '+r.name+' for a loan today.');
    if(!(amt>0)||amt>G(L.maxBorrow))return refuse('You can ask for up to '+money(G(L.maxBorrow))+'.');
    if(!spendMin(M.replyMinutes,0))return;
    markAsked('l'+i);
    var v0=vitSnap(),why=(r.rel||0)<L.borrowFrom?'you aren’t close enough yet':!rivalSpare(r,amt)?'they can’t spare it':rrand()>=rivalChance(r,pick(L.willing,r.diff,0.5),'lend')?'they’d rather not lend money':'';
    if(why){var res=relAdd(r,L.askedNoRel);log('💬 '+r.name+' said no to lending you '+money(amt)+' ('+why+')'+vitPar(v0)+': '+relTxt(r,res)+'.','warn')}
    else{rivalPay(r,amt);S.cash+=amt;var back=Math.round(amt*(1+L.interest)),due=S.day+L.days;S.rloans.push({i:i,dir:'out',amt:amt,owe:back,due:due,late:0});
      log('💬 '+r.name+' lent you '+money(amt)+vitPar(v0)+'. Pay back '+money(back)+' by the morning of day '+due+': it is taken from your cash, then your bank. If it isn’t paid in full then: '+defaultTxt(r)+'.','good')}
    done();
  }
  /* offering a rival a bet: rbet 'i' */
  function offerBet(arg){
    var i=+arg,r=S.rivals&&S.rivals[i],B=MX().bet,st=betStake(i);
    if(!r||r.out)return refuse('That rival is out of the race.');
    if(rbet(i))return refuse('You already have a bet running with '+r.name+'.');
    if(askedToday('b'+i))return refuse('You already offered '+r.name+' a bet today.');
    if(!canStake(S,st,B)||!canStake(r,st,B))return refuse('Both participants need an affordable stake and cash reserve.');
    if(!spendMin(MX().replyMinutes,0))return;
    markAsked('b'+i);var v0=vitSnap();
    if(canStake(r,st,B)&&rrand()<rivalChance(r,pick(B.accept,r.diff,0.5),'bet')){var b=startBet(i,st);log('🎲 '+r.name+' took your bet: '+money(st)+' each on who grows their net worth more, settled on the morning of day '+(b.until+1)+vitPar(v0)+'.','good')}
    else log('🎲 '+r.name+' turned down your bet'+vitPar(v0)+'.','');
    done();
  }
  /* the Messages app */
  function msgsPanel(){
    var M=MX(),L=M.loan,B=M.bet,st=betStake(),h='',X=CONFIG.rivals.social;
    h+=psec('msgs','💬 Messages',chip('',newMsgs()?newMsgs()+' new':'No new messages',newMsgs()?'warn':''),'Rivals message you some nights: a request to borrow money or a friendly bet. A message lasts '+M.messageDays+' days; letting it expire counts as saying no. Answering takes '+hm(M.replyMinutes)+' ('+hm(M.noMinutes)+' to say no). Loans run '+L.days+' days at '+Math.round(L.interest*100)+'%; a bet is won by whoever grows their net worth more over '+B.days+' days, and the winner takes both stakes.');
    dueTomorrow().forEach(function(l){var r=S.rivals[l.i];h+=arow('⚠️ You owe '+r.ic+' '+r.name+' '+money(l.owe)+', due tomorrow morning (day '+l.due+')','','','Keep it in your cash or bank: it is taken automatically. If it isn’t paid in full on time: '+defaultTxt(r)+'.')});
    (S.rloans||[]).filter(function(l){return l.dir==='out'&&l.def}).forEach(function(l){var r=S.rivals[l.i];h+=arow('⚠️ You still owe '+r.ic+' '+r.name+' '+money(l.owe)+': it is taken from your cash or bank each morning.','','')});
    var ms=(S.msgs||[]).slice().reverse();
    if(!ms.length)h+='<p class="sub">No messages yet.</p>';
    ms.forEach(function(m){var r=S.rivals[m.i];if(!r)return;var tense=(r.rel||0)<0;
      if(m.k==='house'){h+=houseOfferRow(m);return}
      if(m.k==='pact'){var t3=r.ic+' '+r.name+': “Shall we team up for '+PX().pact.days+' days?'+(m.amt?' '+money(m.amt)+' each into a shared pot.':'')+'”';
        if(m.st){h+=arow(t3,chip('',m.st==='yes'?'✓ You agreed':'✗ You turned it down',m.st==='yes'?'ok':''),'');return}
        h+=arow(t3,chip('time',hm(M.replyMinutes))+(m.amt?chip('cash','−'+money(m.amt)+' pot'):'')+chip('','🤝 Tips, no job race')+chip('','Answer by day '+m.until),btn('msg',m.id+'|yes','Agree',0,(m.amt&&(!canStake(S,m.amt,PX().pact)||!canStake(r,m.amt,PX().pact)))||!!ally()||hasAlly(m.i)));
        h+=arow('↩️ Turn down '+r.name+'’s pact',chip('time',hm(M.noMinutes))+chip('','Relationship '+sg(PX().pact.declineRel),'warn'),btn('msg',m.id+'|no','Decline',1));return}
      if(m.k==='borrow'){var due=S.day+L.days,t=r.ic+' '+r.name+' · '+personalityLabel(r)+': “'+personality(r).ask+' '+loanReliability(r)+'. Can you lend me '+money(m.amt)+'? I’ll pay you back '+money(m.back)+'.”';
        if(m.st){h+=arow(t,chip('',m.st==='yes'?'✓ You lent it':'✗ You said no',m.st==='yes'?'ok':''),'');return}
        h+=arow(t,chip('time',hm(M.replyMinutes))+chip('cash','−'+money(m.amt))+chip('','💬 Back '+money(m.back)+' on day '+due)+chip('','Relationship '+sg(L.lendRel))+(tense?argueChip():'')+chip('','Answer by day '+m.until),btn('msg',m.id+'|yes','Lend '+money(m.amt),0,S.cash<m.amt),'',tense?'chance':'');
        h+=arow('↩️ Say no to '+r.name,chip('time',hm(M.noMinutes))+chip('','Relationship '+sg(L.refuseRel),'warn'),btn('msg',m.id+'|no','Say no',1));
      }else{var activeBet=m.st==='yes'?rbet(m.i):null,until=m.st?(m.betUntil!=null?m.betUntil:activeBet?activeBet.until:null):S.day+B.days-1;
        var t2=r.ic+' '+r.name+': “Bet you '+money(m.amt)+' I grow my net worth more than you'+(until!=null?' by day '+until:'')+'.”';
        if(m.st){h+=arow(t2,chip('',m.st==='yes'?'✓ You took the bet':'✗ You turned it down',m.st==='yes'?'ok':''),'');return}
        h+=arow(t2,chip('time',hm(M.replyMinutes))+chip('cash','−'+money(m.amt)+' stake')+chip('','🎲 Win: +'+money(m.amt)+', '+sg(B.winHappiness)+' 😊')+chip('','Lose: '+sg(B.loseHappiness)+' 😊')+chip('','Answer by day '+m.until),btn('msg',m.id+'|yes','Take the bet',0,!canStake(S,m.amt,B)||!canStake(r,m.amt,B)||!!rbet(m.i)));
        h+=arow('↩️ Turn down '+r.name+'’s bet',chip('time',hm(M.noMinutes)),btn('msg',m.id+'|no','Decline',1));
      }});
    var open=(S.rloans||[]).filter(function(l){return l.dir==='in'}).map(function(l){var r=S.rivals[l.i];return arow(r.ic+' '+r.name+' owes you '+money(l.owe)+' · principal '+money(l.amt)+' · '+Math.round(L.interest*100)+'% over '+L.days+' days · '+loanReliability(r),chip('','Due day '+l.due+(l.late?' (late)':''),l.late?'warn':''),'')}).join('')+
      (S.bets||[]).map(function(b){var r=S.rivals[b.i];return arow('🎲 Bet with '+r.ic+' '+r.name+': '+money(b.stake)+' each',chip('','Settled on the morning of day '+(b.until+1)),'')}).join('');
    if(open)h+=psec('mopen','Open loans and bets','','')+open;
    h+=pactRows()+sabRows('online');
    h+=psec('people','People remember','','Personalities affect loans, repayment, bets, job tips and tension. Helping with a loan or a personal favour is remembered; a later job introduction can repay it. Refusals and unpaid loans also affect how willing they are to lend. Open a rival on the Overview for their history.');
    h+=psec('mask','💬 Ask a rival','','Ask a rival to lend you money (they need to be at least 🙂 friendly, able to spare it, and willing: experts lend carefully). A no costs '+Math.abs(L.askedNoRel)+' relationship. Pay back '+Math.round(L.interest*100)+'% more on the morning '+L.days+' days later, from your cash or bank; if it isn’t paid in full then: '+defaultTxt({name:'the lender'})+', once. Or offer a bet of '+money(st)+' each. One ask of each kind per rival a day.');
    S.rivals.forEach(function(r,i){if(r.out)return;var st=betStake(i),owe=rloan(i,'out'),asked=askedToday('l'+i),due=S.day+L.days,amts=[1,2,4,6].map(function(x){return G(L.step*x)}).filter(function(v){return v<=G(L.maxBorrow)});
      h+=arow(r.ic+' Ask '+r.name+' for a loan · '+personalityLabel(r),chip('time',hm(M.replyMinutes))+chip('',relLabel(r.rel||0))+chip('','Pay back +'+Math.round(L.interest*100)+'% on day '+due)+chip('','⚠️ Unpaid day '+due+': '+sg(L.defaultRel)+' with '+r.name,'warn')+chip('',sg(L.defaultOthersRel)+' with the others','warn')+chip('',sg(L.defaultHappiness)+' 😊','warn')+(owe?chip('','You owe '+money(owe.owe),'warn'):asked?chip('','✓ Asked today','ok'):''),
        '<div class="btnrow">'+amts.map(function(v){return btn('rborrow',i+'|'+v,money(v),1,!!owe||!!asked)}).join('')+'</div>');
      h+=arow(r.ic+' Offer '+r.name+' a bet',chip('time',hm(M.replyMinutes))+chip('cash','−'+money(st)+' stake')+chip('','🎲 More net worth growth by day '+(S.day+B.days-1))+(rbet(i)?chip('','Bet running','ok'):askedToday('b'+i)?chip('','✓ Offered today','ok'):''),btn('rbet',String(i),'Offer bet',1,!!rbet(i)||!!askedToday('b'+i)||!canStake(S,st,B)||!canStake(r,st,B)));
    });
    return h;
  }
  /* ---------- town politics (CONFIG.rivals.politics): Town mood, reputation, pacts and betrayals ----------
    S.pact = {i, since, until (last day of the pact), pot (both stakes plus interest)}; S.rpacts = [{a, b, since, until, pot}] between rivals.
    S.leak = {until}: after a leak the other rivals race you harder; S.blocked = {k, until}: a role closed to you by a betrayal. */
  function PX(){return CONFIG.rivals.politics}
  function moodX(){var M=PX().moods;return M[S.townMood]||M[PX().defaultMood]}
  function canBetray(){return S.mode==='rivals'&&moodX().betray>0}
  function repOf(p){var v=p===S?S.rep:p&&p.rep;return Number.isFinite(v)?v:PX().rep.start}
  function repAdd(who,d){if(S.mode!=='rivals'||!d)return 0;var v=Math.max(0,Math.min(100,repOf(who)+d));if(who===S)S.rep=v;else who.rep=v;return d}
  function repAccept(rep){return (rep-PX().rep.start)*PX().rep.acceptPer}
  function repInterview(rep){return (rep-PX().rep.start)*PX().rep.interviewPer}
  function ally(){var p=S.mode==='rivals'&&S.pact,r=p&&S.rivals&&S.rivals[p.i];return r&&!r.out?r:null}
  function rivalPactOf(i){return (S.rpacts||[]).filter(function(q){return q.a===i||q.b===i})[0]}
  function hasAlly(i){return (S.pact&&S.pact.i===i)||!!rivalPactOf(i)}
  function pactChance(r){var P=PX().pact;return Math.max(0,Math.min(1,pick(P.accept,r.diff,0.7)+(P.acceptPersonality[r.personality]||0)+repAccept(repOf(S))))}
  function potStake(i){return scaledStake(S,S.rivals[i==null?0:i],PX().pact)}
  function startPact(i,stake){var r=S.rivals[i],P=PX().pact;if(!r||r.out||S.pact||hasAlly(i)||(stake&&(!canStake(S,stake,P)||!canStake(r,stake,P))))return false;if(stake){S.cash-=stake;r.cash-=stake}S.pact={i:i,since:S.day,until:S.day+P.days-1,pot:stake*2};return true}
  function splitPot(pot,a,b){var h=Math.floor(pot/2);a.cash+=h;b.cash+=pot-h}  /* a and b are S or a rival (both have cash) */
  /* the betrayal chance tonight for rival r */
  function betrayChance(r){var B=PX().betray,pm=B.personality[r.personality]||1;if(r.personality==='vindictive'&&!((r.favours&&r.favours.trust)<0))pm=1;
    return pick(B.chance,r.diff,0.04)*moodX().betray*pm*(r.diff==='expert'&&gameLen()-(S.day-1)<=B.lateDays?B.lateMult:1)}
  /* you propose: pact 'i' (plain) or 'i|pot' */
  function proposePact(arg){
    var a=String(arg).split('|'),i=+a[0],withPot=a[1]==='pot',r=S.rivals&&S.rivals[i],P=PX().pact,st=withPot?potStake(i):0;
    if(!r||r.out)return refuse('That rival is out of the race.');
    if(S.pact)return refuse('Finish your existing pact first.');
    if(hasAlly(i))return refuse(r.name+' already has a pact with someone else.');
    if((r.rel||0)<P.need)return refuse('A pact needs a 🤝 friend (relationship '+P.need+' or more).');
    if(askedToday('p'+i))return refuse('You already asked '+r.name+' today.');
    if(withPot&&(!canStake(S,st,P)||!canStake(r,st,P)))return refuse('Both participants need an affordable pot stake and cash reserve.');
    if(!spendMin(P.minutes,0))return;
    markAsked('p'+i);var v0=vitSnap(),why=withPot&&!canStake(r,st,P)?'they can’t spare the money for a pot':rrand()>=pactChance(r)?'they aren’t ready to commit':'';
    if(why)log('🤝 '+r.name+' said no to a pact ('+why+')'+vitPar(v0)+'.','warn');
    else{startPact(i,st);log('🤝 '+r.name+' agreed to a pact'+(st?' with a '+money(st*2)+' pot ('+money(st)+' each)':'')+vitPar(v0)+'. It runs to the end of day '+S.pact.until+': tips, and no job race between you.','good')}
    done();
  }
  function renewPact(){
    var r=ally(),P=PX().pact;if(!r)return refuse('You don’t have a pact.');
    if(S.day!==S.pact.until)return refuse('You can renew on the pact’s last day (day '+S.pact.until+').');
    if(askedToday('r'+S.pact.i))return refuse('You already asked '+r.name+' today.');
    if(!spendMin(P.minutes,0))return;
    markAsked('r'+S.pact.i);var v0=vitSnap();
    if(rrand()<pactChance(r)){S.pact.until+=P.days;log('🤝 '+r.name+' renewed the pact'+vitPar(v0)+': it now runs to the end of day '+S.pact.until+'.','good')}
    else log('🤝 '+r.name+' would rather not renew'+vitPar(v0)+'. The pact ends after today, on good terms.','warn');
    done();
  }
  function endPact(){
    var r=ally(),P=PX().pact;if(!r)return refuse('You don’t have a pact.');
    if(!spendMin(P.minutes,0))return;
    var v0=vitSnap(),pot=S.pact.pot;splitPot(pot,S,r);S.pact=null;var res=relAdd(r,P.endRel);
    log('🤝 You ended your pact with '+r.name+' early'+(pot?', and split the '+money(pot)+' pot':'')+vitPar(v0)+': '+relTxt(r,res)+'. No harm to your reputation.','warn');
    done();
  }
  /* you betray your ally: take the pot and walk out */
  function betrayPact(){
    var r=ally(),B=PX().betray,P=PX().pact;if(!r)return refuse('You don’t have a pact.');
    if(!canBetray())return refuse('Nobody betrays anyone in a friendly town.');
    if(!S.pact.pot)return refuse('There is no pot to take.');
    if(!spendMin(P.minutes,0))return;
    var v0=vitSnap(),pot=S.pact.pot,i=S.pact.i;S.cash+=pot;S.pact=null;
    var d0=r.rel||0;r.rel=B.relTo;repAdd(S,PX().rep.betray);remember(r,'betrayed',-CONFIG.rivals.memory.maxTrust,false);
    S.rivals.forEach(function(o){if(o!==r&&!o.out)relAdd(o,B.othersRel)});
    log('💔 You took the '+money(pot)+' pot and walked out on '+r.name+vitPar(v0)+': relationship with '+r.name+' '+sg(r.rel-d0)+' (now '+sg(r.rel)+', '+relLabel(r.rel)+'), with everyone else '+sg(B.othersRel)+', reputation '+sg(PX().rep.betray)+'.','bad');
    done();
  }
  /* a rival offers you a pact by message (in rivalMsgTick): true when one was sent */
  function pactOfferMsg(free){
    var P=PX().pact;if(ally())return false;
    var c=free.filter(function(i){var r=S.rivals[i];return (r.rel||0)>=P.need&&!hasAlly(i)&&rrand()<P.offerChance});if(!c.length)return false;
    var i=c[Math.floor(rrand()*c.length)],r=S.rivals[i],st=potStake(i),pot=canStake(r,st,P)&&canStake(S,st,P)&&rrand()<0.5?st:0;
    var m={id:(S.msgN=(S.msgN||0)+1),i:i,k:'pact',day:S.day,until:S.day+MX().messageDays-1,amt:pot,back:0,st:null};S.msgs.push(m);
    S.notes.push({l:'rem',t:'🤝 New message from '+r.ic+' '+r.name+': they’d like a pact'+(pot?' with a shared pot':'')+'. Open the Messages app (answer by the end of day '+m.until+').'});
    return true;
  }
  /* each night every rival's relationship with you drifts a little (CONFIG.rivals.politics.drift) */
  function driftTick(){var D=PX().drift;S.rivals.forEach(function(r){if(r.out){r.drift=0;return}var d=D.min+Math.floor(rrand()*(D.max-D.min+1));relAdd(r,d);r.drift=d})}
  /* your pact overnight: a role closed by a betrayal, pot interest, ending, betrayal, the ally's tip */
  function pactTick(){
    var P=PX().pact,B=PX().betray;
    if(S.blocked&&S.day<=S.blocked.until)S.closed[S.blocked.k]=1;else S.blocked=null;
    if(!S.pact)return;if(S.pact.problem&&S.day>S.pact.problem.expires)resolvePromise('terminate',true);if(!S.pact)return;if(S.pact.kind)return contractTick();var r=S.rivals[S.pact.i];
    if(!r||r.out){if(r)splitPot(S.pact.pot,S,r);S.pact=null;if(r)S.notes.push({l:'warn',t:'🤝 Your pact with '+r.ic+' '+r.name+' ended: they are out of the race. The pot was split.'});return}
    if(!S.pact.problem&&S.day<=S.pact.until&&(!S.pact.problemLast||S.day-S.pact.problemLast>=CONFIG.rivals.contracts.problemCooldown)&&rrand()<CONFIG.rivals.contracts.brokenChance)promiseProblem('savings','Your partner missed the agreed savings commitment.');
    if(S.pact.problem)return;
    if(S.pact.pot)S.pact.pot+=Math.floor(S.pact.pot*(S.rate+P.potBonusRate)/100);
    if(S.day>S.pact.until){var pot=S.pact.pot;splitPot(pot,S,r);S.pact=null;relAdd(r,P.keepRel);repAdd(S,PX().rep.keepPact);repAdd(r,PX().rep.keepPact);
      S.notes.push({l:'good',t:'✅ Your pact with '+r.ic+' '+r.name+' ended as agreed'+(pot?': the '+money(pot)+' pot was split':'')+'. Relationship '+sg(P.keepRel)+', reputation '+sg(PX().rep.keepPact)+' each.'});return}
    if(canBetray()&&rrand()<betrayChance(r)){rivalBetraysYou(r);return}
    if(!tipOn()&&rrand()<P.tipChance){S.tip={until:S.day+CONFIG.community.tip.days-1};S.notes.push({l:'good',t:'🤝 Your ally '+r.ic+' '+r.name+' passed you a lead: your next job interview is easier (until the end of day '+S.tip.until+').'})}
  }
  /* what a betraying ally does: the best move available */
  function rivalBetraysYou(r){
    var B=PX().betray,i=S.pact.i,pot=S.pact.pot,what='',j=myJob(),nk=j&&CAREERS[j.c].ranks[S.career[j.c]+1]?j.c+'_'+(S.career[j.c]+1):null,ln=rloan(i,'in');
    if(pot){r.cash+=pot;what='took the '+money(pot)+' pot'}
    else if(ln){S.rloans=S.rloans.filter(function(l){return l!==ln});what='won’t pay back the '+money(ln.owe)+' they owe you'}
    else if(nk){S.blocked={k:nk,until:S.day+B.closeDays-1};S.closed[nk]=1;what='went after the job you wanted: no openings for '+CAREERS[j.c].ranks[S.career[j.c]+1].r+' for you until the end of day '+S.blocked.until}
    else{S.leak={until:S.day+B.leakDays-1};S.rivals.forEach(function(o){if(o!==r&&!o.out)relAdd(o,B.othersRel)});what='leaked your plans: the other rivals race you harder for openings until the end of day '+S.leak.until+' (relationship with them '+sg(B.othersRel)+')'}
    S.pact=null;r.rel=B.relTo;repAdd(r,PX().rep.betray);addSocialEvent('betrayal',i,true);S.happy=clamp(S.happy+B.happiness);
    S.notes.push({l:'bad',t:'💔 '+r.ic+' '+r.name+' walked out on your pact and '+what+'. Relationship now '+sg(r.rel)+', their reputation '+sg(PX().rep.betray)+', your happiness '+sg(B.happiness)+'.'});
  }
  /* pacts between rivals: pots, endings, betrayals and new pacts, all as morning news */
  function rivalPactsTick(){
    var P=PX().pact,R=PX().rivalPacts,nm=function(r){return r.ic+' '+r.name};
    S.rpacts=(S.rpacts||[]).filter(function(q){
      var a=S.rivals[q.a],b=S.rivals[q.b];if(!a||!b)return false;
      if(a.out||b.out){splitPot(q.pot,a,b);return false}
      if(q.pot)q.pot+=Math.floor(q.pot*(S.rate+P.potBonusRate)/100);
      if(S.day>q.until){splitPot(q.pot,a,b);repAdd(a,PX().rep.keepPact);repAdd(b,PX().rep.keepPact);S.notes.push({l:'rem',t:'✅ '+nm(a)+' and '+nm(b)+'’s pact ended on good terms.'});return false}
      if(canBetray()){var x=rrand()<0.5?a:b,y=x===a?b:a;if(rrand()<betrayChance(x)){x.cash+=q.pot;repAdd(x,PX().rep.betray);
        S.notes.push({l:'rem',t:'💔 '+nm(x)+' walked out on '+nm(y)+(q.pot?' and kept their '+money(q.pot)+' pot':'')+' (reputation '+sg(PX().rep.betray)+').'});return false}}
      return true});
    var AM=CONFIG.rivals.aims,repSeek=S.rivals.map(function(r,i){return i}).filter(function(i){var r=S.rivals[i];return !r.out&&!hasAlly(i)&&r.focus==='rep'});  /* a rival chasing a reputation place looks for a pact */
    if(rrand()>=R.chance+(repSeek.length&&AM?AM.repPactChance:0))return;
    var free=S.rivals.map(function(r,i){return i}).filter(function(i){return !S.rivals[i].out&&!hasAlly(i)});if(free.length<2)return;
    var ai=free[Math.floor(rrand()*free.length)];if(repSeek.length)ai=repSeek[0];var rest=free.filter(function(i){return i!==ai}),bi=rest[Math.floor(rrand()*rest.length)],a=S.rivals[ai],b=S.rivals[bi],st=scaledStake(a,b,P);
    if((S.rivalRelations[[ai,bi].sort().join('|')]||0)<=CONFIG.rivals.social.rivalAt)return;
    var pot=canStake(a,st,P)&&canStake(b,st,P)?st:0;if(pot){a.cash-=pot;b.cash-=pot}
    S.rpacts.push({a:ai,b:bi,since:S.day,until:S.day+P.days-1,pot:pot*2});
    S.notes.push({l:'rem',t:'🤝 '+nm(a)+' and '+nm(b)+' formed a pact'+(pot?' with a '+money(pot*2)+' pot':'')+'.'});
  }
  /* ---------- sabotage and theft (CONFIG.rivals.politics.sabotage, .theft) ----------
    Effects sit on the target as sabOn entries {k, until | day, key, by (−1 you, or a rival's index), id, done}. A rival's checks use the day just
    played (S.day−1, in rivalDay); yours use today. S.sabMine: your moves {id, i, k, day, caught, paid}. S.incidents: unsolved setbacks and
    thefts you can accuse someone of {id, kind 'sab'|'theft', k, by, flatI, day, amt, eid, done}. */
  function SBX(){return CONFIG.rivals.politics.sabotage}
  function canSabotage(){return S.mode==='rivals'&&moodX().sabotage>0}
  function sabHas(t,k,day){return (t.sabOn||[]).some(function(e){return e.k===k&&!e.cancel&&e.until!=null&&day<=e.until&&day>=(e.from||0)})}
  function sabInterview(t,day){var M=SBX().moves;return sabHas(t,'rumour',day)||sabHas(t,'online',day)?Math.min(M.rumour.interview,M.online.interview):0}
  function sabClass(t,day){return (t.sabOn||[]).some(function(e){return e.k==='cls'&&!e.cancel&&e.day===day})}
  function sabSnagged(t,key,day){return (t.sabOn||[]).some(function(e){return e.k==='snag'&&!e.cancel&&e.key===key&&day<=e.until})}
  function sabCatch(base,used){var Z=SBX();return Math.min(Z.maxCaught,base+Z.perUse*(used||0))}
  function burglaryRisk(h){var B=CONFIG.rivals.politics.theft.burglary;return S.mode==='rivals'&&B.homes.indexOf(h)>=0?B.chance:0}
  function myHitsOn(i){return (S.sabMine||[]).filter(function(m){return m.i===i&&m.day===S.day}).length}
  /* what a move did, and what an attempt was: n = the target ("Leo", "you"), q = their possessive ("Leo’s", "your") */
  function sabDid(k,n,q){return {rumour:'spread a rumour about '+n,online:'posted rumours about '+n+' online',badmouth:'bad-mouthed '+n+' around town',cls:'took the last seat in '+q+' class',boss:'talked '+n+' down to '+(q==='your'?'your':'their')+' boss',snag:'snagged '+q+' opening',prank:'kept '+n+' up with late-night prank calls'}[k]}
  function sabTry(k,n,q){return {rumour:'spread a rumour about '+n,online:'post rumours about '+n+' online',badmouth:'bad-mouth '+n+' around town',cls:'take the last seat in '+q+' class',boss:'talk '+n+' down to '+(q==='your'?'your':'their')+' boss',snag:'snag '+q+' opening',prank:'prank-call '+n}[k]}
  /* the moves that fit a target: by you (t is a rival) or at you (t === S) */
  function sabMovesFor(t,from){
    var ks=['rumour','online','badmouth'],you=t===S;
    if(you?Object.keys(TRACKS).some(inProgress):!!t.study)ks.push('cls');
    var tj=you?myJob():rivalJob(t),fj=from===S?myJob():rivalJob(from);if(tj&&fj&&tj.b===fj.b)ks.push('boss');
    if(you?sabNextKey():t.target)ks.push('snag');
    if(from!==S||handheld())ks.push('prank');
    return ks;
  }
  function sabNextKey(){var j=myJob();return j&&CAREERS[j.c].ranks[S.career[j.c]+1]?j.c+'_'+(S.career[j.c]+1):null}
  /* put a move's effect on target t; `night` = it is being rolled overnight (S.day is already the new day) */
  function sabLand(t,k,by,night){
    var Z=SBX(),M=Z.moves,you=t===S,id=(S.incN=(S.incN||0)+1),e={k:k,by:by,id:id};
    var start=night?(you?S.day:S.day-1+1):S.day;  /* the first day it counts on the target's own clock */
    if(k==='rumour'||k==='online'||k==='boss'){e.from=you?S.day:start;e.until=(you?S.day:start)+Z.days-1}
    else if(k==='cls')e.day=night?S.day:S.day+1;
    else if(k==='snag'){e.key=you?sabNextKey():t.target.c+'_'+t.target.i;e.until=(you?S.day:start)+Z.days-1;if(you&&e.key)S.closed[e.key]=1}
    else if(k==='badmouth'){repAdd(t,M.badmouth.rep);e.done=1}
    else if(k==='prank'){if(night){if(you)S.energy=clamp(S.energy+M.prank.energy);else t.energy=Math.max(0,Math.min(100,t.energy+M.prank.energy));e.done=1}else e.pending=1}
    if(!t.sabOn)t.sabOn=[];t.sabOn.push(e);return e;
  }
  /* you sabotage a rival: sab 'k|i' */
  function sabotage(arg){
    var a=String(arg).split('|'),k=a[0],i=+a[1],r=S.rivals&&S.rivals[i],Z=SBX(),m=Z.moves[k],C=Z.caught;
    if(!m||!r||r.out)return refuse('That rival is out of the race.');
    if(!canSabotage())return refuse('Nobody sabotages anyone in a friendly town.');
    if(myHitsOn(i)>=Z.yourHitsPerRivalPerDay)return refuse('You have already gone after '+r.name+' '+Z.yourHitsPerRivalPerDay+' times today.');
    if((S.sabUsed||0)>=Z.maxPerGame)return refuse('You have used up your '+Z.maxPerGame+' schemes for this game.');
    if(sabMovesFor(r,S).indexOf(k)<0)return refuse(k==='boss'?'You need to work at the same place as '+r.name+'.':k==='cls'?r.name+' isn’t enrolled at School.':k==='snag'?r.name+' isn’t after a job right now.':k==='prank'?'You need a phone or tablet.':'You can’t do that to '+r.name+' right now.');
    if(k==='online'&&!(handheld()||pcHere()))return refuse('You need a phone, tablet or your computer at home to post online.');
    if(!spendMin(m.minutes,m.cost?G(m.cost):0))return;
    var v0=vitSnap(),ch=sabCatch(m.caught,S.sabUsed);S.sabUsed=(S.sabUsed||0)+1;
    var mine={id:0,i:i,k:k,day:S.day,caught:false,paid:false};S.sabMine.push(mine);
    if(rrand()<ch){mine.caught=true;repAdd(S,C.rep);var res=relAdd(r,C.rel);S.happy=clamp(S.happy+C.happiness);r.grudge=S.day+C.grudgeDays-1;
      log('🕵️ You were caught trying to '+sabTry(k,r.name,r.name+'’s')+vitPar(v0)+': it didn’t work, reputation '+sg(C.rep)+', '+relTxt(r,res)+'. They may strike back.','bad')}
    else{var e=sabLand(r,k,-1,false);mine.id=e.id;
      log('🗯️ You '+sabDid(k,r.name,r.name+'’s')+vitPar(v0)+'. Nobody saw you. '+({rumour:'Their interview chances drop until day '+e.until+'.',online:'Their interview chances drop until day '+e.until+'.',badmouth:'Their reputation '+sg(Z.moves.badmouth.rep)+'.',cls:'They miss their lesson tomorrow.',boss:'Their shifts pay less until day '+e.until+'.',snag:'That opening is closed to them until day '+e.until+'.',prank:'They’ll wake up '+(-Z.moves.prank.energy)+'% short on energy.'}[k]),'good')}
    done();
  }
  /* overnight: your pranks land, rivals sabotage you and each other, effects wear off, getting away with it */
  function sabTick(){
    var Z=SBX(),R=Z.rival,M=Z.moves,C=Z.caught,today=S.day;
    S.rivals.forEach(function(r){(r.sabOn||[]).forEach(function(e){if(e.k==='prank'&&e.pending&&!e.cancel){r.energy=Math.max(0,Math.min(100,r.energy+M.prank.energy));e.pending=0;e.done=1}})});
    (S.sabOn||[]).forEach(function(e){if(e.k==='snag'&&e.key&&!e.cancel&&today<=e.until)S.closed[e.key]=1});  /* rollOpenings clears S.closed each morning */
    /* getting away with it */
    (S.sabMine||[]).forEach(function(m){if(!m.caught&&!m.paid&&today>=m.day+Z.gotAwayDays){m.paid=true;S.happy=clamp(S.happy+Z.gotAwayHappiness);var r=S.rivals[m.i];
      S.notes.push({l:'good',t:'😏 '+numWord(Z.gotAwayDays).replace(/^./,function(c){return c.toUpperCase()})+' days on, nobody has found out that you '+sabDid(m.k,r?r.name:'a rival',(r?r.name:'a rival')+'’s')+': '+sg(Z.gotAwayHappiness)+' happiness.'})}});
    if(canSabotage()){
      var P=lifeScore(),pts={};P.forEach(function(p){pts[p.me?-1:S.rivals.indexOf(p.r)]=p.pts});
      var late=gameLen()-(today-1)<=R.expertLastDays,hitsOnYou=0;
      var wants=function(r,ti){var ahead=pts[ti]>pts[S.rivals.indexOf(r)];return r.diff==='easy'||(r.diff==='medium'&&ahead)||(r.diff==='expert'&&ahead&&late)};
      var base=function(r){return pick(R.chance,r.diff,0.03)*moodX().sabotage*(R.personality[r.personality]||1)};
      S.rivals.forEach(function(r,ri){
        if(r.out||(r.sabUsed||0)>=Z.maxPerGame)return;
        /* at you */
        if(hitsOnYou<Z.hitsOnYouPerDay&&wants(r,-1)&&ally()!==r&&(r.rel||0)<CONFIG.rivals.social.friendAt){
          var g=r.grudge&&today<=r.grudge+1?(r.personality==='vindictive'?C.vindictiveGrudge:C.grudgeMult):1;
          if(rrand()<base(r)*((r.rel||0)<0?R.enemyMult:1)*g){var ks=sabMovesFor(S,r),k=ks[Math.floor(rrand()*ks.length)],ch=sabCatch(pick(R.caught,r.diff,0.3),r.sabUsed);r.sabUsed=(r.sabUsed||0)+1;hitsOnYou++;
            if(rrand()<ch){repAdd(r,C.rep);relAdd(r,C.rel);S.notes.push({l:'warn',t:'🕵️ '+r.ic+' '+r.name+' was caught trying to '+sabTry(k,'you','your')+'. It didn’t work. Their reputation '+sg(C.rep)+', your relationship with them '+sg(C.rel)+'.'})}
            else{var e=sabLand(S,k,ri,true);var inc={id:e.id,kind:'sab',k:k,by:ri,day:today,eid:e.id,done:false};S.incidents.push(inc);
              S.notes.push({l:'bad',t:'📉 '+({rumour:'Someone has been spreading a rumour about you: interview chances '+Math.round(M.rumour.interview*100)+' points until the end of day '+e.until+'.',online:'Someone has been posting rumours about you online: interview chances '+Math.round(M.online.interview*100)+' points until the end of day '+e.until+'.',badmouth:'Someone has been bad-mouthing you around town: reputation '+sg(M.badmouth.rep)+'.',cls:'Someone booked the last seat in your class: no lesson for you today.',boss:'Someone has been talking you down to your boss: your shifts pay '+Math.round((1-M.boss.pay)*100)+'% less until the end of day '+e.until+'.',snag:'Someone had a word with the hiring manager: no openings for your next rank until the end of day '+e.until+'.',prank:'Prank calls kept you up half the night: energy '+sg(M.prank.energy)+'%.'}[k])+' You weren’t told who. Accuse someone at the Community Centre if you think you know.'})}
            return}
        }
        /* at another rival: the one just ahead (easy: anyone) */
        var others=S.rivals.map(function(o,oi){return oi}).filter(function(oi){var o=S.rivals[oi];return oi!==ri&&!o.out&&!(rivalPactOf(ri)&&(rivalPactOf(ri).a===oi||rivalPactOf(ri).b===oi))&&!(o.hitBy&&o.hitBy.d===today&&o.hitBy.n>=Z.rivalHitsPerDay)&&wants(r,oi)});
        if(!others.length||rrand()>=base(r))return;
        if(r.diff!=='easy')others.sort(function(x,y){return pts[x]-pts[y]});
        var ti=r.diff==='easy'?others[Math.floor(rrand()*others.length)]:others[0],t=S.rivals[ti],ks2=sabMovesFor(t,r),k2=ks2[Math.floor(rrand()*ks2.length)],ch2=sabCatch(pick(R.caught,r.diff,0.3),r.sabUsed);
        r.sabUsed=(r.sabUsed||0)+1;t.hitBy={d:today,n:(t.hitBy&&t.hitBy.d===today?t.hitBy.n:0)+1};
        if(rrand()<ch2){repAdd(r,C.rep);S.notes.push({l:'rem',t:'🕵️ '+r.ic+' '+r.name+' was caught trying to '+sabTry(k2,t.ic+' '+t.name,t.name+'’s')+' (reputation '+sg(C.rep)+').'})}
        else sabLand(t,k2,ri,true);
      });
    }
    /* wear off; unsolved incidents lapse after accuse.days */
    S.incidents=(S.incidents||[]).filter(function(x){return !x.done&&x.day>today-Z.accuse.days});
    var keep=function(e){return !e.done&&!e.cancel&&(e.until!=null?e.until>=today-1:e.day!=null?e.day>=today-1:!!e.pending)};
    S.sabOn=(S.sabOn||[]).filter(function(e){return !e.done&&!e.cancel&&(e.until!=null?e.until>=today:e.day!=null?e.day>=today:false)});
    S.rivals.forEach(function(r){r.sabOn=(r.sabOn||[]).filter(keep)});
  }
  /* cash going missing overnight: a flatmate on bad terms first, then a burglar */
  function theftTick(){
    var TH=PX().theft,F=TH.flatmate,B=TH.burglary,fm=flatmate(),fi=fm?S.flat.i:null,tip=' 🔒 Keep your money in the bank (thieves can’t reach it), or move to the Classy Bungalow for better security.';
    if(S.cash<=0)return;
    var share=function(o){return o.min+rrand()*(o.max-o.min)},pct=function(a,c){return Math.round(a/c*100)+'% of your cash'};
    if(fm&&moodX().sabotage>0&&(fm.rel||0)<F.below&&rrand()<F.chance*moodX().sabotage*(F.personality[fm.personality]||1)){
      var big=rrand()<F.bigChance,c0=S.cash,amt=Math.max(1,Math.floor(c0*share(big?TH.big:TH.small)));S.cash-=amt;fm.cash+=amt;
      if(big){S.flat=null;var d0=fm.rel||0;relAdd(fm,F.rel);repAdd(fm,F.rep);S.happy=clamp(S.happy+F.happiness);
        S.notes.push({l:'bad',t:'🏠💸 '+fm.ic+' '+fm.name+' moved out overnight and took '+money(amt)+' ('+pct(amt,c0)+'). Relationship '+sg((fm.rel||0)-d0)+' (now '+sg(fm.rel)+'), their reputation '+sg(F.rep)+', your happiness '+sg(F.happiness)+'.'+tip})}
      else{S.happy=clamp(S.happy+TH.small.happiness);S.incidents.push({id:(S.incN=(S.incN||0)+1),kind:'theft',by:fi,flatI:fi,day:S.day,amt:amt,done:false});
        S.notes.push({l:'bad',t:'💸 '+money(amt)+' ('+pct(amt,c0)+') went missing overnight. It was either taken by your flatmate or a burglar: there’s no way to tell which. Your happiness '+sg(TH.small.happiness)+'.'+tip})}
      return;
    }
    if(S.homeless||!burglaryRisk(S.home)||rrand()>=B.chance)return;
    var big2=rrand()<B.bigChance,c1=S.cash,amt2=Math.max(1,Math.floor(c1*share(big2?TH.big:TH.small)));S.cash-=amt2;
    if(big2){S.happy=clamp(S.happy+B.happiness);S.notes.push({l:'bad',t:'🚨 A burglar broke into your apartment overnight and took '+money(amt2)+' ('+pct(amt2,c1)+'). Your happiness '+sg(B.happiness)+'.'+tip})}
    else{S.happy=clamp(S.happy+TH.small.happiness);S.incidents.push({id:(S.incN=(S.incN||0)+1),kind:'theft',by:'burglar',flatI:fi,day:S.day,amt:amt2,done:false});
      S.notes.push({l:'bad',t:'💸 '+money(amt2)+' ('+pct(amt2,c1)+') went missing overnight. It was '+(fi!=null?'either taken by your flatmate or a burglar: there’s no way to tell which':'taken by a burglar, or someone with a key')+'. Your happiness '+sg(TH.small.happiness)+'.'+tip})}
  }
  /* accusing someone of an unsolved setback or theft: accuse 'id|suspect' (a rival's index, or 'burglar') */
  function accuse(arg){
    var a=String(arg).split('|'),id=+a[0],who=a[1],A=SBX().accuse,inc=(S.incidents||[]).filter(function(x){return x.id===id})[0];
    if(!inc||inc.done)return refuse('That has already been settled.');
    var sus=who==='burglar'?null:S.rivals[+who];if(who!=='burglar'&&(!sus||sus.out))return refuse('That rival is out of the race.');
    if(!spendMin(A.minutes,0))return;
    var v0=vitSnap(),right=String(inc.by)===String(who);inc.done=true;
    if(right&&sus){repAdd(sus,A.rightRep);var res=relAdd(sus,A.rightRel);S.happy=clamp(S.happy+A.rightHappiness);var back=0;
      if(inc.kind==='sab')(S.sabOn||[]).forEach(function(e){if(e.id===inc.eid)e.cancel=1});
      else{back=Math.max(0,Math.min(inc.amt,sus.cash));sus.cash-=back;S.cash+=back}
      log('🔎 You were right: it was '+sus.name+vitPar(v0)+'. '+(inc.kind==='sab'?'The setback ends now. ':back?'They gave back '+money(back)+'. ':'')+'Their reputation '+sg(A.rightRep)+', '+relTxt(sus,res)+'.','good')}
    else if(right){S.happy=clamp(S.happy+A.rightHappiness);log('🔎 You reported the break-in'+vitPar(v0)+'. It was a burglar, as you thought, but the money is gone.','good')}
    else if(sus){var res2=relAdd(sus,A.wrongRel);S.happy=clamp(S.happy+A.wrongHappiness);log('🔎 You accused '+sus.name+', but it wasn’t them'+vitPar(v0)+': '+relTxt(sus,res2)+'. The real culprit stays unknown.','bad')}
    else{S.happy=clamp(S.happy+A.wrongHappiness);log('🔎 You blamed a burglar, but that wasn’t it'+vitPar(v0)+'. The real culprit stays unknown.','bad')}
    done();
  }
  /* the Community Centre's "Who did it?" card */
  function whoRows(){
    if(S.mode!=='rivals')return '';var A=SBX().accuse,open=(S.incidents||[]).filter(function(x){return !x.done});if(!open.length)return '';
    var h=psec('who','🔎 Who did it?',chip('',open.length+' unsolved','warn'),'You weren’t told who was behind these. Accuse someone ('+hm(A.minutes)+', one guess each, within '+A.days+' days). Right: a rival loses '+(-A.rightRep)+' reputation and '+(-A.rightRel)+' relationship, you gain '+A.rightHappiness+' happiness, and a setback ends early (or a flatmate gives the cash back). Wrong: your relationship with the one you accused drops '+(-A.wrongRel)+' and you lose '+(-A.wrongHappiness)+' happiness.');
    open.forEach(function(x){
      var title=x.kind==='theft'?'💸 Day '+x.day+': '+money(x.amt)+' went missing':'📉 Day '+x.day+': someone '+sabDid(x.k,'you','your'),sus=[];
      if(x.kind==='theft'){if(x.flatI!=null&&S.rivals[x.flatI]&&!S.rivals[x.flatI].out)sus.push([String(x.flatI),S.rivals[x.flatI].name]);sus.push(['burglar','A burglar'])}
      else S.rivals.forEach(function(r,i){if(!r.out)sus.push([String(i),r.name])});
      h+=arow(title,chip('time',hm(A.minutes))+chip('','Right: 🎖️ '+sg(A.rightRep)+', relationship '+sg(A.rightRel)+', '+sg(A.rightHappiness)+' 😊')+chip('','Wrong: relationship '+sg(A.wrongRel)+', '+sg(A.wrongHappiness)+' 😊','warn'),
        '<div class="btnrow">'+sus.map(function(s){return btn('accuse',x.id+'|'+s[0],s[1],1)}).join('')+'</div>','','chance');
    });
    return h;
  }
  /* sabotage rows: 'comm' (in person, the Community Centre) or 'online' (social media, in the Messages app) */
  function sabRows(where){
    if(!canSabotage())return '';var Z=SBX(),C=Z.caught,M=Z.moves,used=S.sabUsed||0,left=Z.maxPerGame-used,h='';
    h+=where==='comm'?psec('sab','🗯️ Town talk',chip('','Schemes left '+Math.max(0,left)+'/'+Z.maxPerGame,left>0?'':'warn'),'Small, temporary setbacks for a rival. Every move takes time, and each one you have already done this game adds '+pctTxt(Z.perUse)+' to the chance of being caught (up to '+pctTxt(Z.maxCaught)+'). Caught: the move fails, reputation '+sg(C.rep)+', relationship '+sg(C.rel)+', '+sg(C.happiness)+' happiness, and they may strike back. Not caught after '+Z.gotAwayDays+' days: '+sg(Z.gotAwayHappiness)+' happiness. Each rival at most '+Z.yourHitsPerRivalPerDay+' times a day.')
      :psec('social','📱 Social media',chip('','Schemes left '+Math.max(0,left)+'/'+Z.maxPerGame,left>0?'':'warn'),'Post a rumour about a rival online: quicker than in person, but easier to trace. It counts towards the same limits as the Town talk moves at the Community Centre.');
    var ks=where==='comm'?['rumour','badmouth','cls','boss','snag','prank']:['online'];
    S.rivals.forEach(function(r,i){if(r.out)return;var hits=myHitsOn(i),full=hits>=Z.yourHitsPerRivalPerDay||left<=0,fits=sabMovesFor(r,S);
      ks.forEach(function(k){if(fits.indexOf(k)<0)return;var m=M[k],ch=sabCatch(m.caught,used);
        var eff={rumour:'Interview '+Math.round(m.interview*100)+' pts for '+Z.days+'d',online:'Interview '+Math.round(m.interview*100)+' pts for '+Z.days+'d',badmouth:'Their 🎖️ '+sg(m.rep),cls:'No lesson tomorrow',boss:'Their pay −'+Math.round((1-m.pay)*100)+'% for '+Z.days+'d',snag:'Their target job closed '+Z.days+'d',prank:'Their energy '+sg(m.energy)+'%'}[k];
        h+=arow(m.ic+' '+m.name+': '+r.ic+' '+r.name,chip('time',hm(m.minutes))+(m.cost?chip('cash','−'+money(G(m.cost))):'')+chip('',eff)+chip('','Caught '+pctTxt(ch)+(used?' (+'+Math.round(Z.perUse*used*100)+' from your last '+used+')':''),'warn')+chip('','If caught: 🎖️ '+sg(C.rep)+', relationship '+sg(C.rel)+', '+sg(C.happiness)+' 😊','warn')+chip('','Hits today '+hits+'/'+Z.yourHitsPerRivalPerDay,full?'warn':''),
          btn('sab',k+'|'+i,'Do it',1,full),'','chance')})});
    return h;
  }
  /* profile lines: active setbacks */
  function sabLis(t,day){var M=SBX().moves,you=t===S;return (t.sabOn||[]).filter(function(e){return !e.cancel&&!e.done&&(e.until!=null?e.until>=day-(you?0:1):e.day!=null)}).map(function(e){return '<li>📉 '+M[e.k].name.replace(/^Spread a /,'').replace(/^Talk them down to the boss$/,'talked down to the boss').replace(/^Grab their class$/,'class taken').replace(/^Snag their opening$/,'opening snagged')+(e.until!=null?' until day '+e.until:e.day!=null?' on day '+e.day:'')+(e.by===-1?' (you)':'')+'</li>'}).join('')}
  /* the Messages app's pact card */
  function pactRows(){
    var P=PX().pact,B=PX().betray,Rp=PX().rep,r=ally(),h=socialRows(),st=potStake();
    if(S.pact&&S.pact.kind)return h+contractRows();
    if(S.pact&&S.pact.problem)h+=promiseRows();
    h+=psec('pacts','🤝 Pacts',chip('',moodX().icon+' '+moodX().name)+chip('','🎖️ Reputation '+Math.round(repOf(S))),'With a 🤝 friend (relationship '+P.need+'+) you can make a '+P.days+'-day pact: plain, or with a shared pot ('+money(st)+' each, earning the savings rate +'+P.potBonusRate+' point a day). An ally may pass you job tips and never takes the last opening from you. Kept to the end: the pot is split, '+sg(P.keepRel)+' relationship and '+sg(Rp.keepPact)+' reputation each. '+(canBetray()?'In a '+moodX().name.toLowerCase()+' town an ally may betray you, and you can betray an ally (relationship to '+B.relTo+', reputation '+sg(Rp.betray)+').':'In a friendly town nobody betrays anyone.')+' Your reputation shifts whether rivals accept.');
    if(r){var left=S.pact.until-S.day+1;
      h+=arow('🤝 Allied with '+r.ic+' '+r.name,chip('',left+' day'+(left===1?'':'s')+' left','ok')+(S.pact.pot?chip('cash','Pot '+money(S.pact.pot)):'')+chip('','Ends day '+S.pact.until),'');
      if(S.day===S.pact.until)h+=arow('🔁 Renew the pact for '+P.days+' days',chip('time',hm(P.minutes))+(askedToday('r'+S.pact.i)?chip('','✓ Asked today','ok'):''),btn('prenew','','Renew',0,!!askedToday('r'+S.pact.i)));
      h+=arow('👋 End the pact early',chip('time',hm(P.minutes))+(S.pact.pot?chip('','Pot split'):'')+chip('','Relationship '+sg(P.endRel),'warn'),btn('pend','','End',1));
      if(canBetray()&&S.pact.pot)h+=arow('💔 Take the pot and walk out',chip('time',hm(P.minutes))+chip('cash','+'+money(S.pact.pot))+chip('','Relationship → '+B.relTo,'warn')+chip('','🎖️ '+sg(Rp.betray),'warn')+chip('','Others '+sg(B.othersRel),'warn'),btn('pbetray','','Betray',1));
      return h;
    }
    var any=false;
    S.rivals.forEach(function(q,i){if(q.out||(q.rel||0)<P.need)return;any=true;var st=potStake(i),busy=rivalPactOf(i),asked=askedToday('p'+i);
      h+=arow(q.ic+' Propose a pact to '+q.name,chip('time',hm(P.minutes))+chip('',relLabel(q.rel||0))+chip('','Chance '+pctTxt(pactChance(q)))+(busy?chip('','In a pact with '+S.rivals[busy.a===i?busy.b:busy.a].name,'warn'):asked?chip('','✓ Asked today','ok'):''),
        '<div class="btnrow">'+btn('pact',String(i),'Plain pact',1,!!busy||!!asked)+btn('pact',i+'|pot','With a '+money(st)+' pot',1,!!busy||!!asked||!canStake(S,st,P)||!canStake(q,st,P))+'</div>');
    });
    if(!any)h+='<p class="sub">Pacts need a 🤝 friend: a relationship of '+P.need+' or more.</p>';
    return h+contractOffers();
  }
  /* the Overview profile lines: reputation, pacts (you: i = −1) */
  function politicsLis(i){
    if(S.mode!=='rivals')return '';var h='';
    if(i<0){h+=wealthReminder();h+='<li>🎖️ Your reputation '+Math.round(repOf(S))+'</li>';if(ally())h+='<li>🤝 Allied with '+ally().name+' until the end of day '+S.pact.until+(S.pact.pot?' · pot '+money(S.pact.pot):'')+'</li>';if(S.leak&&S.day<=S.leak.until)h+='<li>📣 Your plans leaked: rivals race you harder until day '+S.leak.until+'</li>';return h+sabLis(S,S.day)}
    var r=S.rivals[i];if(!r)return '';h+='<li>🎖️ Reputation '+Math.round(repOf(r))+'</li>';
    if(S.pact&&S.pact.i===i)h+='<li>🤝 Your ally until the end of day '+S.pact.until+'</li>';
    var q=rivalPactOf(i);if(q)h+='<li>🤝 In a pact with '+S.rivals[q.a===i?q.b:q.a].name+' until day '+q.until+'</li>';
    return h+sabLis(r,S.day);
  }
  /* ---------- living, studying and getting through things together (CONFIG.rivals.together) ---------- */
  function TG(){return CONFIG.rivals.together}
  /* the flatmate: S.flat = {i, since, hd (day the home roll was made), here, did {d, cook, hangout, chores, clearAir}} */
  function flatmate(){var f=S.mode==='rivals'&&S.flat,r=f&&S.rivals&&S.rivals[f.i];return r&&!r.out?r:null}
  /* your rent on the coming rent day: half with a flatmate, all of it on a night they skipped their share */
  function myRent(day){if(day==null)day=nextRentWeek();var R=HOUSE[S.home].rent;return flatmate()&&!(S.flatSkip&&S.flatSkip===day)?Math.ceil(R/2):R}
  /* the flatmate's share on rent day (in rivalNight); a skipped share falls on you */
  function flatShare(r){
    var F=TG().flat,R=HOUSE[S.home].rent,half=R-Math.ceil(R/2),ch=pick(F.skip,r.diff,0.1)+((r.rel||0)<0?F.skipEnemyMod:0);
    if(S.homeless)return HOUSE.apt.rent;
    if(rrand()<ch){S.flatSkip=S.day-1;relAdd(r,F.skipRel);S.happy=clamp(S.happy+F.skipHappiness);
      S.notes.push({l:'bad',t:'🏠 '+r.ic+' '+r.name+' didn’t pay their half of the rent ('+money(half)+'), so you pay it all: relationship '+sg(F.skipRel)+', '+sg(F.skipHappiness)+' happiness.'});return 0}
    return half;
  }
  function relBand(v){var X=CONFIG.rivals.social,N=TG().flat.nightHappiness;return v>=X.friendAt?N.friend:v>=X.friendlyAt?N.friendly:v>=0?N.neutral:N.bad}
  /* each night: living together changes both your happiness; the relationship drifts up; moving out */
  function flatTick(){
    if(!S.flat)return;var r=S.rivals[S.flat.i],F=TG().flat;
    if(!r||r.out||S.homeless){S.flat=null;if(r)S.notes.push({l:'warn',t:'🏠 '+r.ic+' '+r.name+' moved out'+(r.out?' (out of the race)':'')+'.'});return}
    if((r.rel||0)<=F.leaveAt){S.flat=null;S.notes.push({l:'bad',t:'🏠 '+r.ic+' '+r.name+' has had enough and moved out (relationship '+sg(r.rel)+').'});return}
    var d=relBand(r.rel||0);S.happy=clamp(S.happy+d);r.happy=Math.max(0,Math.min(100,r.happy+d));
    if((r.rel||0)>=0)relAdd(r,F.nightRel);
  }
  /* is the flatmate home today? rolled once a day on the rival dice */
  function flatHere(){var r=flatmate();if(!r)return false;if(S.flat.hd!==S.day){S.flat.hd=S.day;S.flat.here=rrand()<TG().flat.homeChance}return S.flat.here}
  function flatDid(k){var d=S.flat&&S.flat.did;return d&&d.d===S.day&&d[k]}
  function cookCost(){return Math.round(G(GROC.basic.cost)/2)}
  function flatRows(){
    var h0w;
    if(S.homeless||S.home==='bung'||!atHome()||view!==S.home)return '';
    var F=TG().flat,X=CONFIG.rivals.social,r=flatmate(),h='';
    if(!r){
      h+=psec('flat','🏠 A flatmate',chip('','Rent split in half'),'Apartments allow two occupants; bungalows allow only one. Invite a rival to share your apartment: rent is split in half on rent day. They need to be at least 🙂 friendly ('+X.friendlyAt+') and willing (experts are the choosiest); a no costs '+Math.abs(F.inviteNoRel)+' relationship. Living together lifts or drags both your moods each night, depending on how you get on, and some rent days a flatmate skips their share.');
      S.rivals.forEach(function(q,i){if(q.out)return;h+=arow(q.ic+' Invite '+q.name+' to move in',chip('time',hm(F.inviteMinutes))+chip('',relLabel(q.rel||0))+chip('','Rent '+money(Math.ceil(HOUSE[S.home].rent/2))+' each'),btn('flat',String(i),'Invite',1))});
      return h;
    }
    var here=flatHere(),g=GROC.basic,tense=(r.rel||0)<0,am=function(k){return tense?argueChip():''},cls='chance';  /* a busy flatmate may decline */
    var TF=PX().theft.flatmate;if((r.rel||0)<0&&moodX().sabotage>0)h0w='<p class="bad arow-n">⚠️ On bad terms: a flatmate below '+TF.below+' may steal cash from you overnight. Keep your money in the bank.</p>';else h0w='';
    h+=psec('flat','🏠 '+r.ic+' '+r.name+(here?' is home':' is out today'),chip('',relLabel(r.rel||0)),'Your flatmate pays half the rent. Each night together: '+sg(F.nightHappiness.friend)+' happiness for both if you are friends, '+sg(F.nightHappiness.friendly)+' if friendly, '+sg(F.nightHappiness.bad)+' on bad terms; the relationship grows '+sg(F.nightRel)+' a night while it is 0 or more. At '+F.leaveAt+' they move out. They are home on about '+pctTxt(F.homeChance)+' of days. Even at home they may be busy and decline ('+pctTxt(F.noChance)+', relationship '+sg(F.noRel)+', no time or cash spent). Each shared action can be attempted once a day.');
    h+=h0w;
    if(here){
      var off=function(k){return !!flatDid(k)},done1=function(k){return flatDid(k)?chip('','✓ Done today','ok'):''};
      h+=arow('🍳 Cook dinner together',chip('time',hm(F.cook.minutes))+chip('cash','−'+money(cookCost()))+chip('energy','+'+g.en+'%')+chip('happy',sg(g.hap+F.cook.happiness))+chip('health',sg(g.hp))+chip('','Relationship '+sg(F.cook.rel))+am()+done1('cook'),btn('fdo','cook','Cook',0,off('cook')||homeFull()),homeFull()?'You have had enough meals at home today.':'Counts as a meal.',cls);
      h+=arow('📺 Hang out',chip('time',hm(F.hangout.minutes))+chip('happy',sg(F.hangout.happiness))+chip('','Relationship '+sg(F.hangout.rel))+am()+done1('hangout'),btn('fdo','hangout','Hang out',1,off('hangout')),'',cls);
      h+=arow('🧹 Do the chores together',chip('time',hm(F.chores.minutes))+chip('health',sg(F.chores.health))+chip('','Relationship '+sg(F.chores.rel))+am()+done1('chores'),btn('fdo','chores','Do chores',1,off('chores')),'',cls);
      if((r.rel||0)<F.clearAir.below)h+=arow('🗣️ Clear the air',chip('time',hm(F.clearAir.minutes))+chip('','Relationship '+sg(F.clearAir.rel))+am()+done1('clearAir'),btn('fdo','clearAir','Talk',1,off('clearAir')),'',cls);
    }
    h+=arow('🚪 Ask '+r.name+' to move out',chip('time',hm(F.kickMinutes))+chip('','Relationship '+sg(F.kickRel),'warn')+chip('','Full rent again','warn'),btn('unflat','','Ask',1));
    return h;
  }
  function inviteFlat(arg){
    var i=+arg,r=S.rivals&&S.rivals[i],F=TG().flat;
    if(!r||r.out)return refuse('That rival is out of the race.');
    if(flatmate())return refuse('You already share your home with '+flatmate().name+'.');
    if(S.home==='bung'||r.home==='bung')return refuse('Bungalows allow one occupant; sharing needs an apartment.');
    if(S.homeless||!atHome())return refuse('You can only invite someone into your own home, from home.');
    if(!spendMin(F.inviteMinutes,0))return;
    var v0=vitSnap(),why=(r.rel||0)<F.flatFrom?'you aren’t close enough yet':rrand()>=pick(F.willing,r.diff,0.5)?'they’d rather keep their own place':'';
    if(why){var res=relAdd(r,F.inviteNoRel);log('🏠 '+r.name+' said no to moving in ('+why+')'+vitPar(v0)+': '+relTxt(r,res)+'.','warn')}
    else{S.flat={i:i,since:S.day,hd:0,here:false,did:null};log('🏠 '+r.name+' is moving in'+vitPar(v0)+'. From the next rent day you each pay half ('+money(Math.ceil(HOUSE[S.home].rent/2))+').','good')}
    done();
  }
  function kickFlat(){
    if(!loyaltyAllows())return;
    var r=flatmate(),F=TG().flat;if(!r)return refuse('You don’t have a flatmate.');
    if(!spendMin(F.kickMinutes,0))return;
    var v0=vitSnap(),res=relAdd(r,F.kickRel);S.flat=null;
    log('🚪 You asked '+r.name+' to move out'+vitPar(v0)+': '+relTxt(r,res)+'. You pay the full rent again.','warn');
    done();
  }
  function flatDo(k){
    var r=flatmate(),F=TG().flat,c=F[k];if(!r||!c)return refuse('You don’t have a flatmate.');
    if(!flatHere())return refuse(r.name+' is out today.');
    if(flatDid(k))return refuse('You have already done that together today.');
    if(k==='clearAir'&&(r.rel||0)>=c.below)return refuse('There is nothing to clear up with '+r.name+'.');
    if(k==='cook'&&homeFull())return refuse('You are full: '+numWord(FD.homeMealsPerDay)+' home meal'+(FD.homeMealsPerDay===1?'':'s')+' a day is plenty.');
    if(S.ap<c.minutes||k==='cook'&&S.cash<cookCost())return refuse('You need '+hm(c.minutes)+(k==='cook'?' and '+money(cookCost()):'')+' to do this together.');
    if(rrand()<F.noChance){var no=relAdd(r,F.noRel);if(!S.flat.did||S.flat.did.d!==S.day)S.flat.did={d:S.day};S.flat.did[k]=1;
      log(r.name+' is busy and says no to '+({cook:'cooking',hangout:'hanging out',chores:'doing chores',clearAir:'talking'}[k]||'that')+' today: '+relTxt(r,no)+'. No time or money spent.','warn');render();return}
    if(!spendMin(c.minutes,k==='cook'?cookCost():0))return;
    var v0=vitSnap(),g=GROC.basic;
    if(!S.flat.did||S.flat.did.d!==S.day)S.flat.did={d:S.day};S.flat.did[k]=1;
    if(k==='cook'){S.energy=clamp(S.energy+g.en);S.happy=clamp(S.happy+g.hap);S.fed=true;S.flags.ate=1;S.homeMeals++;eatGood(g.hp)}
    S.happy=clamp(S.happy+(c.happiness||0));if(c.health)S.health=clamp(S.health+c.health);
    var res=relGain(r,c.rel);if(res.backfire)argue();
    var what={cook:'🍳 You cooked dinner with '+r.name,hangout:'📺 You hung out with '+r.name,chores:'🧹 You did the chores with '+r.name,clearAir:'🗣️ You had a talk with '+r.name}[k];
    log(what+(res.backfire?', but it turned into an argument':'')+vitPar(v0)+': '+relTxt(r,res)+'.',res.d<0?'warn':'good');
    done();
  }
  /* study groups: friendly rivals enrolled in the same pathway */
  function studyPartners(t){if(S.mode!=='rivals'||!t||!S.rivals)return [];var X=CONFIG.rivals.social;return S.rivals.filter(function(r){return !r.out&&r.study&&r.study.t===t&&(r.rel||0)>=X.friendlyAt})}
  function groupHap(t){return studyPartners(t).length?TG().study.groupHappiness:0}
  function groupChip(t){var p=studyPartners(t),Z=TG().study;return p.length?chip('','👥 Study group: '+p.map(function(r){return r.name}).join(', ')+' · +'+Z.groupKnowledge+' knowledge','ok'):''}
  function studyGroup(t){
    var p=studyPartners(t),Z=TG().study;if(!p.length)return;
    S.know=clamp(S.know+Z.groupKnowledge);S.happy=clamp(S.happy+Z.groupHappiness);
    var parts=p.map(function(r){var res=relGain(r,Z.groupRel);if(res.backfire)argue();r.know=Math.max(0,Math.min(100,r.know+Z.partnerKnowledge));return r.name+' '+sg(res.d)});
    log('👥 You studied with '+p.map(function(r){return r.name}).join(' and ')+': +'+Z.groupKnowledge+' knowledge and '+sg(Z.groupHappiness)+' happiness on top of the lesson. Relationships: '+parts.join(', ')+'.','good');
  }
  /* rival cards at night: decisions that involve a rival. y/n are decide()'s outcomes ([chance, text, fx, text if not, fx if not],
    or [1, text, fx]); ry = relationship if it goes well / badly, rn = relationship for no. when(r) says if the card fits. */
  var RIVAL_CARDS=[
    {id:'car',ic:'🚗',t:'A lift to an interview',when:function(r){return true},
      q:function(r){return r.name+'’s car broke down just before a job interview, and they ask you for a lift. Drive them?'},
      y:function(r){return [1,'You get '+r.name+' there with minutes to spare. They’re very grateful.','e-6']},ry:[8],n:function(r){return [1,'You say you’re busy. '+r.name+' takes a taxi and arrives late.','']},rn:-3},
    {id:'cake',ic:'🎂',t:'A birthday',when:function(r){return true},
      q:function(r){return 'It’s '+r.name+'’s birthday. A few people are chipping in '+money(G(15))+' each for a cake. Join in?'},
      y:function(r){return [1,'Everyone sings badly. '+r.name+' is touched.','c-'+G(15)+' h+2']},ry:[6],n:function(r){return [1,'You skip it. '+r.name+' notices.','']},rn:-2},
    {id:'rumour',ic:'🗯️',t:'A rumour at work',when:function(r){return (r.rel||0)<CONFIG.rivals.social.friendlyAt},argue:true,
      q:function(r){return 'A witness confirmed that '+r.name+' has been spreading a rumour about you around town. Confront them?'},
      y:function(r){return [0.6,r.name+' backs down and apologises.','h+2','It turns into a shouting match.','']},ry:[3,-8],n:function(r){return [1,'You let it go, but it stings.','h-3']},rn:0},
    {id:'cover',ic:'🧑‍🍳',t:'Cover a shift',when:function(r){var j=rivalJob(r);return !!j&&r.cash>=coverPay(r)},
      q:function(r){var j=rivalJob(r);return r.name+' can’t make their evening shift as '+j.rk.r+' and asks you to cover it for '+money(coverPay(r))+'. Do it?'},
      y:function(r){return [1,'A long evening, but the money’s yours.','c+'+coverPay(r)+' e-10']},ry:[6],pay:true,n:function(r){return [1,'You say no. '+r.name+' has to call in sick.','']},rn:-2},
    {id:'revise',ic:'📖',t:'Revision help',when:function(r){return Object.keys(TRACKS).some(inProgress)},
      q:function(r){return r.name+' offers to help you revise for your course tonight.'},
      y:function(r){return [1,'Two hours of quizzing pays off.','n+2 e-4']},ry:[4],n:function(r){return [1,'You’d rather rest.','']},rn:0},
    {id:'soup',ic:'🤒',t:'A rival is ill',when:function(r){return !!r.ill},heal:5,
      q:function(r){return r.name+' is ill at home. Bring them some soup?'},
      y:function(r){return [1,r.name+' is glad of the company.','c-'+G(8)]},ry:[8],n:function(r){return [1,'You send a text instead.','']},rn:-1},
    {id:'party',ic:'🎉',t:'A party',when:function(r){return true},
      q:function(r){return r.name+' is throwing a party tonight and invites you.'},
      y:function(r){return [1,'Great music, a late night.','h+5 e-8']},ry:[5],n:function(r){return [1,'You stay in.','']},rn:-1},
    {id:'move',ic:'📦',t:'Moving day',when:function(r){return flatmate()!==r},
      q:function(r){return r.name+' is moving to a new place and needs a hand carrying boxes tonight.'},
      y:function(r){return [1,'Sore arms, but it’s done.','e-10 h+1']},ry:[8],n:function(r){return [1,'You can’t make it.','']},rn:-2}
  ];
  function coverPay(r){var j=rivalJob(r);return j?Math.round(rolePay(j.c,j.i)*payIdx()/2):0}
  /* tonight's rival card, if any: each card once a game per rival, one every `gap` nights at most */
  function rivalCard(){
    var X=TG().cards;if(!S.rivals||S.day<2||S.day-(S.lastRCard||0)<X.gap||rrand()>=X.chance)return null;
    var opts=[];RIVAL_CARDS.forEach(function(c){S.rivals.forEach(function(r,i){if(!r.out&&!(S.rcards||{})[c.id+'_'+i]&&c.when(r))opts.push([c,i])})});
    if(!opts.length)return null;
    var o=opts[Math.floor(rrand()*opts.length)],c=o[0],i=o[1],r=S.rivals[i];
    if(!S.rcards)S.rcards={};S.rcards[c.id+'_'+i]=1;S.lastRCard=S.day;
    return {icon:c.ic,tag:r.ic+' '+r.name,title:c.t,text:c.q(r),choice:true,y:c.y(r),n:c.n(r),rv:{i:i,id:c.id,ry:c.ry,rn:c.rn,pay:c.pay?coverPay(r):0,heal:c.heal||0,argue:!!c.argue},done:false,fx:[],tone:''};
  }
  /* a rival card's relationship part, after decide() has applied the tokens */
  function rivalCardDone(ev,yes,good){
    var x=ev.rv,r=S.rivals[x.i];if(!r)return;
    var d=yes?(good?x.ry[0]:(x.ry[1]!=null?x.ry[1]:x.ry[0])):x.rn,res={d:0,backfire:false},a=CONFIG.rivals.social.argument.happiness||0;
    if(d)res=d>0?relGain(r,d):relAdd(r,d);
    var row=yes&&!good&&x.argue||res.backfire;if(row){argue();if(a)ev.fx.push(sg(a)+' happiness (an argument)')}
    if(yes&&x.pay)r.cash-=x.pay;  /* you earn their shift's pay instead of them */
    if(yes&&x.heal)r.health=Math.max(0,Math.min(100,r.health+x.heal));
    if(res.d)ev.fx.push('Relationship with '+r.name+' '+sg(res.d)+(res.backfire?' (it got tense)':''));
    if(yes&&Object.prototype.hasOwnProperty.call(RIVAL_MEMORIES,x.id)&&PX().rep.help){repAdd(S,PX().rep.help);ev.fx.push('Reputation '+sg(PX().rep.help))}  /* helping out is noticed around town */
    if(Object.prototype.hasOwnProperty.call(RIVAL_MEMORIES,x.id)){remember(r,(yes?'':'no_')+x.id,yes?CONFIG.rivals.memory.helpTrust:CONFIG.rivals.memory.refuseTrust,yes);ev.fx.push(yes?'They will remember your help':'They will remember your refusal')}
    if(res.d<0||row)ev.tone='bad';
  }
  function blankLife(){return {h:[],l:[],crisis:0,unwell:0,best:null}}  /* unwell: nights ill or under CONFIG.health.poorBelow */
  /* tonight's record for you (called in rollover once a rival game's day is done) */
  function lifeSample(wasFed){
    if(S.mode!=='rivals')return;var L=S.life||(S.life=blankLife());
    if(L.lastDay===S.day-1)return;L.lastDay=S.day-1;
    L.h.push(S.happy);L.l.push(S.health);if(S.ill||S.health<CONFIG.health.poorBelow)L.unwell=(L.unwell||0)+1;
    if(!wasFed||S.arrears||(S.loan&&S.day-1>S.loan.due)||(S.rloans||[]).some(function(l){return l.dir==='out'&&l.def})||S.ill||naked())L.crisis++;
    var j=myJob();if(j&&(!L.best||j.rk.pay>L.best.pay))L.best={pay:j.rk.pay,r:j.rk.r};
  }
  /* Sample everyone after overnight health, shame, transfers, flatmates and rent.
     finish() also calls this for an early exit; lastDay prevents a duplicate final night. */
  function sampleNight(wasFed){
    if(S.mode!=='rivals')return;
    lifeSample(wasFed);
    (S.rivals||[]).forEach(function(r){
      var day=S.day-1;if(r.out&&r.out.day!==day)return;
      var L=r.life||(r.life=blankLife());if(L.lastDay===day)return;L.lastDay=day;
      L.h.push(r.happy);L.l.push(r.health);if(r.ill||r.health<CONFIG.health.poorBelow)L.unwell=(L.unwell||0)+1;
      var jd=rivalJob(r),dr=jd&&jd.rk.dress,cl=r.clothes,undressed=dr&&!(dr==='suit'?cl.suit>0:dr==='smart'?(cl.smart>0||cl.suit>0):(cl.casual>0||cl.smart>0||cl.suit>0));
      if(r.hungry||r.cash<0||r.ill||undressed)L.crisis++;
    });
  }
  /* everyone in a rival game, as the Life Score sees them */
  function lifePlayers(){
    var lv=0;Object.keys(TRACKS).forEach(function(t){lv+=lvl(t)});
    var j=myJob(),L=S.life||blankLife(),best=L.best;if(j&&(!best||j.rk.pay>best.pay))best={pay:j.rk.pay,r:j.rk.r};
    var out=[{me:1,ic:'⭐',name:'You',worth:Math.round(worth()),best:best,levels:lv,know:S.know,life:L,rankDay:S.rankDay||{},rep:repOf(S)}];
    (S.rivals||[]).forEach(function(r){var l2=0;Object.keys(TRACKS).forEach(function(t){l2+=rivalLv(r,t)});var rj=rivalJob(r),rb=r.bestJob;if(rj&&(!rb||rj.rk.pay>rb.pay))rb={pay:rj.rk.pay,r:rj.rk.r};
      out.push({r:r,ic:r.ic,name:r.name,worth:rivalWorth(r),best:rb,levels:l2,know:r.know,life:r.life||blankLife(),rankDay:r.rankDay||{},out:r.out,rep:repOf(r)})});
    return out;
  }
  /* places and points: ties share the better place */
  function lifeScore(){
    var P=lifePlayers(),SC=CONFIG.rivals.scoring,pts=SC.placePoints;
    P.forEach(function(p){p.pts=0;p.cats={}});
    Object.keys(SC.categories).forEach(function(k){var c=SC.categories[k],C=LIFE_CATS[k];if(!c||!c.on||!C)return;
      P.forEach(function(p){var v=C.v(p),place=1+P.filter(function(q){return C.v(q)>v}).length,got=(pts[place-1]||0)*c.weight;p.cats[k]={place:place,pts:got,txt:C.t(p)};p.pts+=got})});
    P.sort(function(a,b){return b.pts-a.pts||b.worth-a.worth});
    P.forEach(function(p,i){p.place=1+P.filter(function(q){return q.pts>p.pts}).length});
    return P;
  }
  function ordinal(n){return n+(n===1?'st':n===2?'nd':n===3?'rd':'th')}
  /* the end screen's standings, category table and "best at" badges */
  function lifeTable(){
    var P=lifeScore(),SC=CONFIG.rivals.scoring,ks=Object.keys(SC.categories).filter(function(k){return SC.categories[k].on&&LIFE_CATS[k]}),me=P.filter(function(p){return p.me})[0];
    var badges=ks.map(function(k){var w=P.filter(function(p){return p.cats[k].place===1});return LIFE_CATS[k].ic+' '+LIFE_CATS[k].n+': '+w.map(function(p){return p.me?'<b>you</b>':p.name}).join(' & ')}).join(' · ');
    return '<div class="standings"><h3>🏁 Life Score: you finished '+ordinal(me.place)+' of '+P.length+'</h3>'+(me.place===1?'<div class="topscore">🏆 Top of the town!</div>':'')+
      '<ol>'+P.map(function(p){return '<li'+(p.me?' class="me"':'')+'>'+p.ic+' '+p.name+(p.r?' <small>('+p.r.diff+(p.out?', out on day '+p.out.day:'')+')</small>':'')+': <b>'+p.pts+' points</b> · '+money(p.worth)+'</li>'}).join('')+'</ol>'+
      '<div class="lifetab-w"><table class="lifetab"><tr><th></th>'+P.map(function(p){return '<th'+(p.me?' class="me"':'')+'>'+p.ic+' '+(p.me?'You':p.name)+'</th>'}).join('')+'</tr>'+
      ks.map(function(k){var c=SC.categories[k];return '<tr><td>'+LIFE_CATS[k].ic+' '+LIFE_CATS[k].n+' <small>×'+c.weight+'</small></td>'+P.map(function(p){var x=p.cats[k];return '<td class="'+(x.place===1?'win ':'')+(p.me?'me':'')+'"><b>'+ordinal(x.place)+'</b> <small>+'+x.pts+'</small><br><small>'+x.txt+'</small></td>'}).join('')+'</tr>'}).join('')+
      '</table></div><p class="sub">Best at: '+badges+'</p></div>';
  }
  /* ---------- relationships with rivals (CONFIG.rivals.social) ----------
    r.rel runs from −100 (enemy) to +100 (friend). Building it always costs time (chat, hello, calls, congratulating);
    below 0 an interaction may backfire (tension). Friends pass on job tips; enemies race you harder for openings. */
  function relLabel(v){var X=CONFIG.rivals.social;return v>=X.friendAt?'🤝 friend':v>=X.friendlyAt?'🙂 friendly':v<=X.enemyAt?'💢 enemy':v<=X.rivalAt?'😠 rival':'😐 neutral'}
  /* a relationship change from you to rival r: below 0, a gain may turn into the same-size loss (tension). Returns the real change. */
  function relGain(r,gain){
    var T=CONFIG.rivals.social.tension,rel=r.rel||0,backfire=false;
    if(gain>0&&rel<0&&rrand()<Math.min(T.max,-rel*T.per*personality(r).tensionMult)){gain=-Math.max(1,gain);backfire=true}
    r.rel=Math.max(-100,Math.min(100,rel+gain));
    return {d:gain,backfire:backfire};
  }
  /* an argument with a rival (a call's −1, or tension) costs you happiness (CONFIG.rivals.social.argument) */
  function argue(){S.happy=clamp(S.happy+(CONFIG.rivals.social.argument.happiness||0))}
  /* the warning chip on any row that can end in an argument */
  function argueChip(){var a=CONFIG.rivals.social.argument.happiness;return a?chip('','⚠️ Argument: '+sg(a)+' 😊','warn'):''}
  function relTxt(r,res){return 'relationship with '+r.name+' '+sg(res.d)+' (now '+sg(r.rel)+', '+relLabel(r.rel)+')'}
  /* today's encounter: when you walk into a place a rival frequents, a chance to meet them there (one a day, rival dice) */
  function maybeEncounter(l){
    if(S.mode!=='rivals'||!S.rivals||S.over)return;var X=CONFIG.rivals.social;
    if(S.enc&&S.enc.day===S.day)return;
    var here=[];S.rivals.forEach(function(r,i){if(!r.out&&(r.places||[]).indexOf(l)>=0)here.push(i)});
    if(!here.length||rrand()>=X.encounterChance)return;
    S.enc={day:S.day,i:here[Math.floor(rrand()*here.length)],loc:l,done:false};
  }
  function encounterCard(){
    var e=S.enc;if(S.mode!=='rivals'||!e||e.day!==S.day||e.done||e.loc!==view||!S.rivals[e.i])return '';
    var r=S.rivals[e.i],X=CONFIG.rivals.social,j=rivalJob(r),tense=(r.rel||0)<0;  /* below 0 a chat or hello may turn into an argument */
    return boxed(psec('enc',r.ic+' '+r.name+' is here',chip('',relLabel(r.rel||0)),r.name+' ('+r.diff+' · '+personality(r).name+(j?', '+j.rk.r:'')+') is here too. '+personality(r).about+' '+memoryLine(r)+' Talking builds your relationship, but takes time; with someone you are on bad terms with it may turn tense and make things worse.')+
      arow('🗣️ Chat',chip('time',hm(X.chat.minutes))+chip('happy',sg(X.chat.happiness))+chip('','Relationship '+sg(X.chat.rel))+(tense?argueChip():''),btn('meet','chat','Chat'),'',tense?'chance':'')+
      arow('👋 Say hello',chip('time',hm(X.hello.minutes))+chip('','Relationship '+sg(X.hello.rel))+(tense?argueChip():''),btn('meet','hello','Say hello',1),'',tense?'chance':'')+
      arow('🙈 Ignore',chip('','No time')+chip('','Relationship '+sg(X.ignore.rel),'warn'),btn('meet','ignore','Ignore',1)));
  }
  function rivalMeet(k){
    var e=S.enc;if(!e||e.day!==S.day||e.done)return refuse('Nobody to talk to here right now.');
    var r=S.rivals[e.i],X=CONFIG.rivals.social,c=X[k];if(!r||!c)return;
    if(c.minutes&&!spendMin(c.minutes,0))return;
    var v0=vitSnap(),res;
    if(k==='ignore'){r.rel=Math.max(-100,Math.min(100,(r.rel||0)+c.rel));res={d:c.rel,backfire:false}}
    else{res=relGain(r,c.rel);S.happy=clamp(S.happy+(c.happiness||0));if(res.backfire)argue()}  /* a tense chat or hello is an argument */
    e.done=true;
    log((k==='ignore'?'🙈 You ignored '+r.name:res.backfire?'🗯️ The '+(k==='chat'?'chat':'hello')+' with '+r.name+' turned into an argument':k==='chat'?'🗣️ You had a chat with '+r.name:'👋 You said hello to '+r.name)+vitPar(v0)+': '+relTxt(r,res)+'.',res.d<0?'warn':'good');
    done();
  }
  /* calls: from home (no phone needed, costs what a family call costs) or by phone anywhere (one rival or a group) */
  function calledToday(i){return S.rcalled&&S.rcalled.d===S.day&&S.rcalled[i]}
  function callRoll(){var R=CONFIG.rivals.social.call.roll,x=rrand();for(var i=0;i<R.length;i++){x-=R[i][1];if(x<0)return R[i][0]}return R[R.length-1][0]}
  function rivalCall(arg){
    if(S.mode!=='rivals'||!S.rivals)return;
    var X=CONFIG.rivals.social,LE=CONFIG.leisure.call,home=view===S.home&&atHome(),who=[];
    if(arg==='group'){[].forEach.call(document.querySelectorAll('#shop input[data-rsel]:checked'),function(b){who.push(+b.dataset.rsel)});if(!who.length)return refuse('Tick the rivals you want on the group call first.')}
    else who=[+arg];
    if(!home&&!handheld())return refuse('You need a working phone or tablet to call from here. At home you can call from your landline.');
    who=who.filter(function(i){return S.rivals[i]&&!S.rivals[i].out});
    var already=who.filter(calledToday);if(already.length)return refuse('You already called '+already.map(function(i){return S.rivals[i].name}).join(' and ')+' today.');
    if(!who.length)return refuse('Nobody to call.');
    var mins=home?LE.minutes:X.call.phoneMinutes;if(!spendMin(mins,0))return;
    var v0=vitSnap(),parts=[],bad=0;S.happy=clamp(S.happy+(home?LE.happiness:X.call.phoneHappiness));
    if(!S.rcalled||S.rcalled.d!==S.day)S.rcalled={d:S.day};
    who.forEach(function(i){var r=S.rivals[i],g=callRoll(),res;S.rcalled[i]=1;
      if(g>0)res=relGain(r,g);else{r.rel=Math.max(-100,Math.min(100,(r.rel||0)+g));res={d:g,backfire:false}}
      if(res.backfire||res.d<0){bad++;argue()}parts.push(r.name+' '+sg(res.d)+(res.backfire?' (it got tense: an argument)':res.d<0?' (an argument)':''))});
    log('📞 '+(who.length>1?'Group call':'You called '+S.rivals[who[0]].name)+(home?' from home':' on your phone')+vitPar(v0)+'. Relationships: '+parts.join(', ')+'.',bad?'warn':'good');
    done();
  }
  function callRows(home){
    var X=CONFIG.rivals.social,LE=CONFIG.leisure.call,mins=home?LE.minutes:X.call.phoneMinutes,hap=home?LE.happiness:X.call.phoneHappiness;
    return S.rivals.map(function(r,i){if(r.out)return '';var c=calledToday(i);
      return arow((home?'':'<input type="checkbox" data-rsel="'+i+'" aria-label="Add '+r.name+' to a group call"'+(c?' disabled':'')+'> ')+r.ic+' Call '+r.name,chip('time',hm(mins))+chip('happy',sg(hap))+argueChip()+chip('',relLabel(r.rel||0))+(c?chip('','✓ Called today','ok'):''),btn('rcall',String(i),'Call',home?1:0,!!c),'','chance')}).join('');  /* a call can always end in an argument */
  }
  /* congratulate a rival on this morning's news: 15 minutes, once a morning per rival */
  function congratulate(i){
    var r=S.rivals&&S.rivals[i],X=CONFIG.rivals.social.congratulate;if(!r||S.over)return;
    if(S.cong&&S.cong.d===S.day&&S.cong[i])return;
    toastAll=true;try{
      /* this runs from the morning pop-up, which hides ordinary toasts: say the result with a forced toast */
      if(S.ap<X.minutes){var nt='Not enough time to congratulate '+r.name+' ('+hm(X.minutes)+' needed, '+hm(S.ap)+' left).';forceToast.push({txt:nt,cls:'bad'});return refuse(nt)}
      if(!spendMin(X.minutes,0))return;
      if(!S.cong||S.cong.d!==S.day)S.cong={d:S.day};S.cong[i]=1;
      var v0=vitSnap(),res=relGain(r,X.rel);S.happy=clamp(S.happy+X.happiness);if(res.backfire)argue();
      var msg=(res.backfire?'🗯️ Your congratulations to '+r.name+' came across badly and turned into an argument':'🎉 You congratulated '+r.name)+vitPar(v0)+': '+relTxt(r,res)+'.';
      forceToast.push({txt:msg,cls:res.d<0?'bad':'good'});log(msg,res.d<0?'warn':'good');
      done();
    }finally{toastAll=false}
  }
  /* ---------- playing to win the Life Score (CONFIG.rivals.aims) ----------
    Once a night, before the rivals' day: each planning rival's place in each category (rivalStanding) and the one focus it chases
    tomorrow (r.focus: a LIFE_CATS key, or null), with a short phrase (r.aim). No dice. */
  var AIM_CATS=['happiness','health','education','rep'];
  function rivalStanding(r,P){
    P=P||lifeScore();var me=P.filter(function(p){return p.r===r})[0];if(!me)return null;var out={};
    Object.keys(me.cats).forEach(function(k){var C=LIFE_CATS[k],v=C.v(me),above=null,below=null;
      P.forEach(function(q){if(q===me||(q.out&&q.r))return;var w=C.v(q);if(w>v&&(above==null||w<above))above=w;if(w<v&&(below==null||w>below))below=w});
      out[k]={place:me.cats[k].place,v:v,ahead:above==null?null:above-v,behind:below==null?null:v-below}});
    return out;
  }
  function aimUnit(k,gap){return k==='education'?gap/1000:gap}  /* education counts levels x 1000 plus knowledge */
  function aimTick(){
    var A=CONFIG.rivals.aims;if(!A)return;var P=lifeScore(),pts=CONFIG.rivals.scoring.placePoints,cats=CONFIG.rivals.scoring.categories,late=(S.day-1)>=gameLen()*A.defendFrom;
    S.rivals.forEach(function(r){r.focus=null;r.aimWhy=null;if(r.out||A.levels.indexOf(r.diff)<0)return;
      var st=rivalStanding(r,P);r.standing=st;if(!st)return;var best=null;
      AIM_CATS.forEach(function(k){var x=st[k],c=cats[k],lim=A.close[k];if(!x||!c||!c.on||!lim)return;
        var pl=x.place,up=pl>1&&x.ahead!=null?aimUnit(k,x.ahead):null,down=late&&x.behind!=null?aimUnit(k,x.behind):null;
        if(up!=null&&up<=lim){var gain=c.weight*((pts[pl-2]||0)-(pts[pl-1]||0))/Math.max(0.25,up/lim);if(!best||gain>best.g)best={k:k,g:gain,how:'chase',pl:pl}}
        if(down!=null&&down<=lim){var keep=c.weight*((pts[pl-1]||0)-(pts[pl]||0))/Math.max(0.25,down/lim);if(!best||keep>best.g)best={k:k,g:keep,how:'defend',pl:pl}}});
      if(best&&best.k==='happiness'){var hx=st.happiness;r.aimHappy=Math.min(100,Math.round(hx.v+(best.how==='chase'?hx.ahead:0)+A.moraleLift))}  /* a day above the average it needs to pass (or keep) */
      if(best){r.focus=best.k;r.aimWhy=best.how;r.aim=(best.how==='chase'?'chasing '+ordinal(best.pl-1)+' place in ':'defending '+ordinal(best.pl)+' place in ')+LIFE_CATS[best.k].n.toLowerCase()}
      else{var tg=r.target&&CAREERS[r.target.c]&&CAREERS[r.target.c].ranks[r.target.i];r.aim=tg?'working towards '+tg.r:'working and saving'}
    });
  }
  function rivalTick(){
    if(S.mode!=='rivals'||!S.rivals)return;
    aimTick();  /* each planning rival picks the Life Score place it plays for today */
    S.rivals.forEach(function(r){if(r.out)return;r.y=rivalWorth(r);r.took=null;rivalNight(r,rivalDay(r))});
    /* the job race (CONFIG.rivals.jobRace): a role a rival just took may have no openings left for you today */
    var JR=CONFIG.rivals.jobRace;
    if(JR&&JR.chance>0)S.rivals.forEach(function(r){
      var X=CONFIG.rivals.social,ch=JR.chance+personality(r).race+((r.rel||0)<=X.enemyAt?X.enemyRaceBonus:0)+(S.leak&&S.day<=S.leak.until?PX().betray.leakRace:0);  /* enemies race you harder; so does everyone after a leak */
      if(ally()===r)return;  /* an ally never takes the last opening from you */
      if(!r.took||JR.levels.indexOf(r.diff)<0||(S.jobRaces||0)>=JR.maxPerGame||r.took===S.lastRace||rrand()>=ch)return;
      var m=r.took.split('_'),rk=CAREERS[m[0]]&&CAREERS[m[0]].ranks[+m[1]];if(!rk)return;
      S.closed[r.took]=1;S.raced[r.took]=r.name;S.lastRace=r.took;S.jobRaces=(S.jobRaces||0)+1;r.rel=Math.max(-100,(r.rel||0)+X.racedRel);
      S.notes.push({l:'warn',t:'🏁 '+r.ic+' '+r.name+' got there first: no openings for '+rk.r+' at the '+NAME[bOf(m[0])]+' today.'});
    });
    /* friends pass on job tips (the Community Centre tip: next interview easier, no "no openings") */
    var XS=CONFIG.rivals.social;
    S.rivals.forEach(function(r){if(r.out||(r.rel||0)<XS.friendAt||tipOn()||rrand()>=XS.friendTipChance*personality(r).tipMult)return;
      S.tip={until:S.day+CONFIG.community.tip.days-1};S.notes.push({l:'good',t:'🤝 '+r.ic+' '+r.name+' tipped you off about an opening: your next job interview is easier (until the end of day '+S.tip.until+').'})});
    driftTick();pactTick();rivalPactsTick();socialTick();  /* moods drift; pacts: pots, tips, betrayals and endings (yours, then rival pairs) */
    settleMoney(true);rivalMsgTick();  /* loans due this morning, then tonight's message; bets settle after both sides' overnight effects */
    sabTick();  /* sabotage: rivals at you and at each other, effects landing and wearing off */
    theftTick();  /* cash going missing: a flatmate on bad terms, or a burglar */
    flatTick();  /* a flatmate: the night together, and moving out */
    favourTick();  /* a remembered deed can become a later job introduction */
  }
  /* ---------- macro shocks: multi-day stories with daily effects ----------
    [title, what happens, economic term explained, minDays, maxDays, daily effects]
    daily effects: p prices %, w pay %, r interest pts, mkt market mood, ill illness x, lay chance of losing a job per day */
  var MACRO=[
    ['War erupts in a major oil-producing region','Energy prices spike and central banks scramble.','Supply shock: a sudden drop in supply that pushes prices up across the economy.',7,14,{p:2.2,r:0.08,mkt:-0.45,lay:0.04,cls:0.06}],
    ['Central bank starts a tightening cycle','Rates will rise step by step to fight inflation.','Monetary tightening: raising interest rates to cool spending and slow inflation.',6,12,{r:0.12,p:-0.3,mkt:-0.25}],
    ['Stagflation grips the economy','Prices keep rising while growth stalls and firms cut staff.','Stagflation: high inflation and weak growth at the same time.',8,14,{p:1.5,w:-0.4,r:0.06,mkt:-0.3,lay:0.05,cls:0.05}],
    ['Quantitative easing programme announced','The central bank buys bonds to pump money into the system.','Quantitative easing (QE): creating money to buy bonds, which lowers rates and lifts markets.',6,12,{r:-0.08,mkt:0.4,p:0.4}],
    ['Yield curve inverts','Short-term rates now exceed long-term ones; investors brace for recession.','Inverted yield curve: often seen as an early warning of recession.',5,10,{r:0.04,mkt:-0.3,lay:0.02}],
    ['Sovereign debt crisis spreads','A neighbouring country cannot pay its debts; lenders panic.','Sovereign default: when a government cannot repay its borrowing.',7,14,{r:0.1,mkt:-0.5,w:-0.2,lay:0.03}],
    ['Credit crunch','Banks stop lending, so businesses cut hours and hiring.','Credit crunch: a sudden shortage of loans from banks.',5,10,{r:0.06,mkt:-0.4,w:-0.3,lay:0.05,cls:0.06}],
    ['Government fiscal stimulus','Big public spending on roads and schools boosts jobs.','Fiscal stimulus: the government spends more or taxes less to boost demand.',6,12,{w:0.5,p:0.5,r:0.04,mkt:0.3}],
    ['Commodity supercycle','Metals and food stay expensive for weeks.','Commodity supercycle: a long period of high raw-material prices.',8,14,{p:1.4,r:0.03,mkt:0.1}],
    ['Housing bubble bursts','Property prices crash and construction jobs vanish.','Asset bubble: prices far above real value that eventually collapse.',7,13,{r:-0.06,mkt:-0.45,p:-0.5,lay:0.04}],
    ['Deflationary spiral','Shoppers wait for lower prices, so firms cut prices and wages.','Deflation: falling prices, which can cause people to delay spending.',6,12,{p:-1.2,w:-0.4,r:-0.05}],
    ['Tech boom','Start-ups flood the market with jobs and investment.','Bull market: a sustained period of rising share prices.',5,10,{r:0.03,mkt:0.5,w:0.4}],
    ['Pandemic wave','Hospitals fill up and some workplaces close.','Lockdown: restrictions on movement that pause parts of the economy.',7,14,{ill:1.7,r:-0.08,mkt:-0.3,lay:0.03,cls:0.12,p:0.4}],
    ['Currency devaluation','Your currency falls sharply; imports cost far more.','Devaluation: a fall in a currency’s value against others, making imports pricier.',5,10,{p:1.8,r:0.06,mkt:-0.2}],
    ['Ceasefire and peace deal','Trade routes reopen and confidence returns.','Recovery: the economy grows again after a downturn.',5,10,{p:-0.8,mkt:0.4,r:-0.05,w:0.2}]
  ];
  /* ---------- macro storylines ----------
    A storyline starts on some evening and then advances ONE chapter every in-game day (onset, escalation, peak, easing).
    Each day's end-of-day event is that day's chapter, picked at random from the chapters written for that phase.
    [title, text, fx]  or, for a decision,  [title, question, '', yes-outcome, no-outcome]. */
  var SAGAS=[
    {id:'oil',ic:'🛢️',n:'Oil crisis',term:'Supply shock: a sudden loss of supply (here, oil) that pushes costs up across the whole economy.',len:[5,8],eff:{p:0.8,w:-0.2,r:0.03,mkt:-0.25,lay:0.03,cls:0.05},ph:[
      [["OPEC+ announces a surprise oil output cut","Crude jumps 12% overnight. Petrol stations raise prices before lunch.","p+2"],
       ["Tanker attack closes a key shipping lane","Insurers refuse cover and freight rates spike. Imports start to cost more.","p+2 h-2"],
       ["Pipeline explosion cuts supply","A major pipeline is out of action for weeks.","p+1.5 h-2"],
       ["Oil traders panic","Crude futures post their biggest jump in years.","p+1"]],
      [["Fuel rationing starts at the pumps","Queues stretch around the block, and delivery firms add fuel surcharges to every order.","p+2 e-4"],
       ["Airlines ground flights to save fuel","Cargo space is scarce and supermarket shelves thin out.","p+1.5 h-3"],
       ["Stockpiling rumour","A neighbour says oil will hit record highs and sells you a stock of supplies for $40. Buy?","",[0.6,"Prices keep climbing, so the stock saves you money later.","c+30","The rumour fades and prices dip. You overpaid.","c-40"],[1,"You keep your cash and hope for the best.",""]],
       ["Taxi fares rise","Ride-hailing apps add a fuel surcharge.","p+1 h-2"],
       ["Plastic goods cost more","Oil is in everything, from bags to toothbrushes.","p+1"]],
      [["Petrol hits an all-time high","Transport costs feed through to everything: food, furniture, electronics.","p+3 h-3"],
       ["Truckers strike over diesel costs","Deliveries stall for days and shops ration popular goods.","p+2 e-3"],
       ["Overtime offer","A logistics firm pays cash for a long night loading trucks. Take it?","",[0.8,"Hard work, good pay.","c+60 e-12","The shift is cancelled after you arrive. A wasted evening.","e-5"],[1,"You head home and rest.","e+4"]],
       ["Power plants switch fuel","Electricity bills rise as plants burn costlier fuel.","p+1.5 h-2"],
       ["Car-free Sunday","The city closes roads to save fuel. Cyclists love it.","h+3"]],
      [["OPEC+ agrees to raise output","Crude falls sharply on the news. Pump prices ease slowly.","p-2 h+3"],
       ["Strategic reserves released","Governments release stockpiles and the panic fades.","p-1.5 h+2"],
       ["Pump prices fall for a week","Drivers breathe a sigh of relief.","p-1 h+2"],
       ["Airlines restore flights","Holiday plans are back on.","h+3"]]]},
    {id:'war',ic:'⚔️',n:'Regional war',term:'Sanctions: penalties that cut off trade with a country, which disrupts supply chains and raises prices.',len:[5,9],eff:{p:0.7,w:-0.15,r:0.03,mkt:-0.35,lay:0.025,cls:0.04},ph:[
      [["Border clash erupts into open conflict","Two regional powers are at war. Stocks drop as investors rush to “safe-haven” assets.","p+1 h-3"],
       ["Embassies evacuate and sanctions are announced","Trade between the warring countries stops overnight and supply chains scramble.","p+1.5 h-2"],
       ["Shipping insurers pull cover","Cargo heading to the region is stuck.","p+1"],
       ["Gold jumps on war fears","Investors run for safety.","h-1"]],
      [["Grain shipments blocked at the border","Wheat and cooking oil prices jump.","p+2"],
       ["Grim headlines every hour","A wave of bad news weighs on morale across town.","h-4"],
       ["Donation drive","A charity helping refugees asks you for $20. Give?","",[1,"You donate and feel better for helping.","c-20 h+6"],[1,"You keep walking. It nags at you a little.","h-2"]],
       ["Refugees arrive at the border","Aid groups ask for help.","h-3"],
       ["Fuel prices climb","War hits oil supplies.","p+1.5"]],
      [["Sanctions on exports bite","Factories short of parts cut shifts and some workers are sent home.","p+1.5 w-0.5"],
       ["Markets sink as defence stocks soar","Investors flee risk. Pension funds take a hit.","h-3"],
       ["War bond tip","A coworker says a $60 war bond is a safe, patriotic investment. Buy?","",[0.65,"Safe and steady, it pays a little interest.","c+15","Yields lag inflation. You lose a little in real terms.","c-10"],[1,"You pass.",""]],
       ["Peace protests in the city","Thousands march for an end to the fighting.","h-1"],
       ["Factories run short of metals","Some lines stop.","w-0.3"]],
      [["Ceasefire talks begin","Negotiators meet. Oil, grain and shares all steady.","p-1 h+3"],
       ["The ceasefire holds","Shipping lanes reopen and confidence returns.","p-1.5 h+4"],
       ["Aid convoys reach the cities","Help finally gets through.","h+3"],
       ["Trade routes reopen","Ships sail again.","p-1 h+2"]]]},
    {id:'fin',ic:'🏦',n:'Financial crisis',term:'Credit crunch: banks suddenly stop lending, so firms cannot borrow and cut jobs.',len:[6,9],eff:{p:-0.2,w:-0.3,r:-0.05,mkt:-0.5,lay:0.05,cls:0.04},ph:[
      [["A major investment bank wobbles","Rumours of huge bad loans on its books send its share price tumbling.","h-3"],
       ["Mortgage defaults surge","Households that borrowed too much stop paying, and banks start counting losses.","h-2"],
       ["Bank shares halted","Trading is stopped after a 30% fall.","h-3"],
       ["Rumours spread online","Depositors worry about their savings.","h-2"]],
      [["Bank run: depositors queue outside branches","People withdraw savings in a panic, fearing the bank will fail. This is called a “bank run”.","h-4"],
       ["Credit freezes up","Banks stop lending to each other and to firms. Hiring stops.","w-0.5 h-2"],
       ["Buy the dip?","A friend begs you to buy shares at the bottom for $80. Risky!","",[0.4,"The market bounces and you sell at a profit.","c+160","The market keeps falling.","c-80"],[1,"You sit it out.",""]],
       ["Businesses cannot get loans","Small firms struggle to pay staff.","w-0.3 h-2"],
       ["House prices wobble","Buyers pull out of deals.","h-2"]],
      [["Stock market crashes 15% in a day","Trading is halted twice. Retirement funds are shattered.","h-5 w-0.5"],
       ["Firms announce mass layoffs","Offices and shops across town cut staff and hours.","h-4"],
       ["Evening gig","A struggling café needs help tonight and offers $50 cash. Take it?","",[0.85,"Busy night, nice tips.","c+60 e-10","The café can only pay part of what it promised.","c+20 e-10"],[1,"You rest instead.","e+5"]],
       ["Pension funds take a hit","Retirement savings shrink.","h-3"],
       ["Banks merge to survive","Two big names become one.","h-1"]],
      [["Central bank slashes rates and bails out the banks","A rescue package restores confidence. Rates drop and markets rally.","r-0.2 h+4"],
       ["Markets stabilise","Credit starts flowing again and hiring slowly resumes.","w+0.3 h+3"],
       ["Deposit guarantee raised","Savings are protected by law.","h+3"],
       ["Banks start lending again","Credit flows, slowly.","h+2"]]]},
    {id:'pan',ic:'🦠',n:'Pandemic',term:'Lockdown: orders to stay home and close non-essential businesses, which pauses parts of the economy.',len:[6,9],eff:{p:0.4,r:-0.06,mkt:-0.3,ill:1.7,lay:0.025,cls:0.12},ph:[
      [["A new virus spreads rapidly","Hospitals report a surge of cases and face masks sell out.","h-3 p+0.5"],
       ["First cases reach town","Health officials urge hand-washing and distancing.","h-2"],
       ["Travel bans announced","Borders close one by one.","h-3"],
       ["Hand sanitiser sells out","Pharmacies ration bottles.","p+0.5 h-1"]],
      [["Lockdown announced","Non-essential businesses are ordered to close. Streets go quiet.","h-5"],
       ["Hospitals overwhelmed","Wards are full and waiting times double.","e-3 h-3 l-2"],
       ["Masks and sanitiser","A pharmacy sells a $20 pack of masks and sanitiser. Buy?","",[1,"You feel safer and stay well.","c-20 h+3 l+2"],[1,"You skip it and worry about it.","h-2 l-2"]],
       ["Schools move online","Parents juggle work and teaching.","h-3"],
       ["Delivery apps boom","Riders are busier than ever.","w+0.2"]],
      [["Panic buying empties the shelves","Staples cost more and queues form outside shops.","p+1.5 h-2"],
       ["Everything moves online","Learning and work go remote. Anyone with a device picks up new skills.","n+3"],
       ["Free online course","A free remote course runs all evening. Spend the evening on it?","",[1,"You learn a lot.","n+4 e-8"],[1,"You relax instead.","h+3"]],
       ["Hospitals call for volunteers","Retired nurses return to work.","h+1"],
       ["Supply of masks recovers","Factories run around the clock.","h+1"]],
      [["Vaccine approved","Jabs begin to roll out and cases fall.","h+5 l+3"],
       ["Restrictions lift","Shops reopen and life returns to something like normal.","h+4 p-0.5"],
       ["Schools reopen","Children back in classrooms.","h+4"],
       ["Cinemas and gyms reopen","Life feels more normal.","h+4"]]]},
    {id:'inf',ic:'📈',n:'Inflation and rate hikes',term:'Monetary tightening: the central bank raises interest rates to cool spending and slow inflation.',len:[5,8],eff:{p:0.9,r:0.06,mkt:-0.2,lay:0.015},ph:[
      [["Inflation hits a 40-year high","Everything from eggs to rent costs more each week.","p+2"],
       ["Central bank signals rate hikes","Analysts expect borrowing to get more expensive.","r+0.1 h-2"],
       ["Petrol and food lead price rises","Shoppers notice their bills climbing.","p+1 h-2"],
       ["Unions warn of strikes","Workers want pay to keep up.","h-1"]],
      [["Interest rates rise again","Savers smile; borrowers wince. Savings accounts pay more.","r+0.1"],
       ["Wage demands spread","Workers demand pay rises to keep up with prices, and employers push back.","p+1 w+0.3"],
       ["Clearance sale","A shop sells stockpiled goods for $50 cash. Buy to resell?","",[0.8,"You resell them at a profit.","c+30","The goods turn out to be poor quality.","c-50"],[1,"You pass.",""]],
       ["Mortgage rates jump","Homeowners pay more each month.","r+0.05 h-2"],
       ["Restaurants raise prices again","Dinner out costs more.","p+1"]],
      [["Rates hit a 15-year high","Housing and stock markets cool sharply.","r+0.1 h-3"],
       ["Firms freeze hiring","Higher borrowing costs force firms to cut back.","w-0.3 h-2"],
       ["Side hustle","A neighbour pays $45 to help repaint a flat. Take it?","",[1,"Easy money.","c+45 e-8"],[1,"You rest.","e+4"]],
       ["Shoppers switch to cheaper brands","Supermarket own-brands sell out.","p-0.5 h-1"],
       ["Savings rates are the best in years","Savers finally get a reward.","r+0.05 h+1"]],
      [["Inflation finally cools","Price rises slow for the first time in months.","p-1 h+3"],
       ["Central bank pauses its rate hikes","Markets cheer the pause.","r-0.1 h+3"],
       ["Price rises slow","Inflation falls for the second month.","p-0.5 h+3"],
       ["Wages catch up","Pay rises finally beat inflation.","w+0.3 h+2"]]]},
    {id:'trade',ic:'🚢',n:'Trade war',term:'Tariffs: taxes on imports that make foreign goods pricier and often provoke retaliation.',len:[5,8],eff:{p:0.6,w:-0.2,r:0.02,mkt:-0.2,lay:0.02,cls:0.03},ph:[
      [["Two giant economies exchange tariffs","Taxes on imports make foreign goods pricier overnight.","p+1.5"],
       ["Retaliation announced","Exporters brace for lost sales abroad.","h-2"],
       ["Markets fall on tariff news","Exporters lose billions in value.","h-2"],
       ["Customs queues grow","Paperwork piles up at the ports.","p+0.5"]],
      [["Factories hit by tariffs on parts","Local plants pay more for imported parts and slow production.","w-0.4 p+1"],
       ["Shipping backlogs build","Containers pile up at ports waiting for inspection.","p+1 h-2"],
       ["Pre-tariff phones","A trader offers a batch of pre-tariff phones for $60 to resell. Buy?","",[0.55,"Prices rise and you resell at a premium.","c+110","Customers balk at the price. You are stuck with the batch.","c-60"],[1,"You pass.",""]],
       ["Farmers lose export markets","Crops go unsold.","p-0.5 h-2"],
       ["Smuggling rises","Officials seize fake goods.","h-1"]],
      [["Export orders collapse","Overseas buyers go elsewhere and some workers are sent home early.","w-0.5 h-3"],
       ["Consumer prices climb","Everyday goods inch up.","p+1.5"],
       ["Buy local","A local maker sells handmade goods for $25. Buy?","",[1,"Nice quality, and it feels good to support them.","c-25 h+5"],[1,"You skip it.",""]],
       ["Factories move abroad","Firms shift to avoid tariffs.","w-0.3 h-2"],
       ["Imported cars cost more","Car showrooms are quiet.","p+1"]],
      [["Trade truce signed","Tariffs roll back in phases and shipping speeds up.","p-1.5 h+3"],
       ["Exporters rejoice","Orders come back and employers start hiring.","w+0.4 h+3"],
       ["Tariffs cut in stages","Trade starts to flow again.","p-1 h+2"],
       ["New trade deals signed","Exporters find new markets.","w+0.2 h+2"]]]},
    {id:'boom',ic:'🚀',n:'Tech boom',term:'Bull market: a sustained period of rising share prices and optimism.',len:[5,8],eff:{p:0.2,w:0.3,r:0.03,mkt:0.35},ph:[
      [["AI start-up raises record funding","Investors pour money into tech and headlines call it a new golden age.","h+3"],
       ["Chipmaker posts blowout profits","Share indices jump on the news.","w+0.3 h+2"],
       ["Tech giant opens a new office in town","Hundreds of jobs on offer.","w+0.3"],
       ["App downloads hit records","Everyone is building something.","h+1"]],
      [["Hiring frenzy in tech","Recruiters call everyone with a pulse and salaries rise.","w+0.5"],
       ["Everyone is talking about their portfolio","Lunch conversations are all about shares.","h+3"],
       ["Hot IPO","A new tech company is floating. Invest $80?","",[0.6,"The IPO pops on day one.","c+140","The IPO flops.","c-80"],[1,"You watch from the sidelines.","h-1"]],
       ["Office rents rise","Start-ups compete for space.","p+0.5"],
       ["Tech salaries soar","Engineers get bidding wars.","w+0.4"]],
      [["Valuations look stretched","Some economists warn of a bubble. Everyday prices drift up too.","p+1 h+2"],
       ["Markets hit a record high","The index closes at an all-time high.","h+3"],
       ["Weekend bootcamp","A coding bootcamp offers a $50 weekend course. Join?","",[1,"You come out sharper.","c-50 n+5 e-10"],[1,"You pass.",""]],
       ["Start-up parties every night","Free drinks and big talk.","h+2"],
       ["Regulators eye tech giants","Questions about competition.","h-1"]],
      [["The bubble cools","A few overpriced firms fall back to earth and markets settle.","h-2"],
       ["A soft landing","Growth slows gently without a crash. Pay settles higher than before.","w+0.2 h+2"],
       ["Some start-ups fold","Not every idea worked out.","h-1"],
       ["The survivors grow steadily","The best firms keep hiring.","w+0.2 h+2"]]]},
    {id:'house',ic:'🏘️',n:'Housing bubble',term:'Asset bubble: prices far above what things are really worth, pushed up by borrowing and hype, until they suddenly fall.',len:[5,8],eff:{p:-0.3,r:-0.04,mkt:-0.35,lay:0.03},ph:[
      [["Home prices hit another record","Bidding wars break out over tiny flats. Analysts warn prices are far above real value.","h-2"],
       ["Banks tighten mortgage rules overnight","Buyers rush to sign before the new limits. Agents’ phones never stop ringing.","r+0.05 h-2"],
       ["Developer misses a bond payment","A big property developer cannot pay its lenders. Construction sites go quiet.","h-3"]],
      [["Unsold flats pile up","New launches sit empty and prices start to slip.","p-1"],
       ["Landlords sell in a panic","Rental listings flood the market. Some tenants are told to move out.","h-3"],
       ["Construction workers laid off","Cranes stand still across town.","w-0.4 h-2"],
       ["Furniture shops slash prices","Nobody is moving house, so sofas and beds go on sale.","p-1.5 h+2"],
       ["Cheap furniture sale","A showroom is closing down and sells a $200 bed frame for $60. Buy it?","",[0.8,"Solid wood, great deal. You sleep better already.","c-60 h+6 e+4","It wobbles. You paid for firewood.","c-60 h-3"],[1,"You keep your old bed.",""]]],
      [["Prices crash 20%","Owners who bought last year now owe more than their homes are worth.","p-1 h-4"],
       ["Banks report bad loans","Mortgage defaults surge. Bank shares tumble.","h-3"],
       ["Estate agents close branches","Shopfronts empty out along the high street.","w-0.3 h-2"],
       ["Agent’s side gig","A struggling estate agent pays cash for help handing out flyers all evening. Help?","",[0.7,"Sore feet, $40 in your pocket.","c+40 e-10","Rain ruins the flyers. He pays you half.","c+20 e-10"],[1,"You head home.",""]]],
      [["Central bank cuts rates to steady the market","Mortgages get cheaper and buyers start to look again.","r-0.05 h+3"],
       ["Prices find a floor","Bargain hunters return and the panic fades.","h+3"],
       ["Government launches a first-home grant","Young buyers get help with deposits. The mood lifts.","h+4"]]]},
    {id:'cur',ic:'💱',n:'Currency crisis',term:'Exchange rate: how much of another currency your money buys. When it falls, everything imported costs more.',len:[5,8],eff:{p:1,r:0.06,mkt:-0.3},ph:[
      [["The dollar slides against major currencies","Imports suddenly cost more. Tourists notice the bargains.","p+1.5"],
       ["Investors pull money out of the country","Traders call it “capital flight”. The currency drops further.","p+1 h-2"],
       ["Central bank burns reserves to defend the currency","It slows the fall, but not for long.","r+0.05"]],
      [["Imported food prices jump","Rice, cooking oil and fruit all cost more at the supermarket.","p+2 h-2"],
       ["Overseas holidays get cancelled","Travel agents report a wave of refunds.","h-3"],
       ["Exporters celebrate","Local factories win new overseas orders thanks to the cheap currency.","w+0.3"],
       ["Electronics stores raise prices","Phones and laptops jump 15% overnight.","p+1.5 h-2"],
       ["Change money now?","A friend says to swap $100 into US dollars before it gets worse. Do it?","",[0.5,"The currency keeps falling. Your dollars are worth $125 a week later.","c+25 h+3","It bounces back. You lose $15 on the exchange.","c-15 h-2"],[1,"You keep your savings as they are.",""]]],
      [["Emergency rate hike","The central bank raises rates sharply to stop the slide.","r+0.1 h-3"],
       ["Shops limit imported goods","Some shelves are half empty.","p+1.5 h-3"],
       ["Workers demand pay that keeps up","Unions want wages linked to the falling currency.","w+0.5"],
       ["Tourist rush","Tourists flood in for cheap shopping. A souvenir shop needs evening help at $45. Take it?","",[0.8,"Busy and fun. $45 earned.","c+45 e-10","The shop is chaos. You earn it the hard way.","c+45 e-16 h-2"],[1,"You keep your evening free.","e+3"]]],
      [["The currency stabilises","An international loan calms the markets.","h+3 p-1"],
       ["Import prices ease a little","The worst is over, say economists.","p-1.5 h+2"],
       ["Rates start to come down","The central bank signals the danger has passed.","r-0.05 h+2"]]]},
    {id:'drought',ic:'🌾',n:'Food crisis',term:'Food inflation: food prices rising faster than everything else, often after bad harvests or export bans.',len:[5,8],eff:{p:0.9,mkt:-0.1},ph:[
      [["Drought hits the region’s rice bowl","Farmers report their worst harvest in decades.","p+1.5 h-2"],
       ["Neighbour country bans rice exports","Importers scramble for new suppliers.","p+2"],
       ["Heatwave scorches vegetable farms","Fresh greens are scarce at the wet market.","p+1 h-2"]],
      [["Rice prices up 30%","Hawkers raise the price of chicken rice.","p+2 h-3"],
       ["Panic buying at supermarkets","Shoppers clear the shelves of rice and noodles.","p+1 h-3"],
       ["Hawkers struggle to keep prices down","Some stalls close early when they run out of ingredients.","p+1 h-2"],
       ["Food banks see record queues","Volunteers work double shifts.","h-3"],
       ["Bulk buy?","The supermarket sells a 10kg sack of rice for $35, still at the old price. Buy it?","",[0.8,"Prices keep climbing. You saved money.","c-35 c+20 h+3","Prices fall next week. Oh well.","c-35 h-2"],[1,"You buy what you need.",""]]],
      [["Food prices hit a record","Even instant noodles cost more.","p+2.5 h-3"],
       ["Government caps the price of staples","Rice and eggs have a maximum price for now.","p-1 h+2"],
       ["Restaurants shrink portions","Same price, smaller plate.","h-3"],
       ["Volunteer at the food bank","The food bank needs packers this evening. Help out?","",[1,"Hard work, warm hearts. You go home tired and happy.","e-10 h+8"],[1,"You donate $10 instead.","c-10 h+3"]]],
      [["Rain returns to the farms","The next harvest looks good.","h+4 p-1"],
       ["New suppliers ship in rice","Prices start to ease.","p-1.5 h+2"],
       ["Export ban lifted","Trade flows again and shoppers relax.","p-1.5 h+3"]]]},
    {id:'strike',ic:'✊',n:'General strike',term:'Collective bargaining: workers negotiating together with employers over pay and conditions.',len:[5,8],eff:{w:0.3,p:0.3,mkt:-0.2,cls:0.08},ph:[
      [["Unions announce a nationwide strike","Transport, ports and factory workers will walk out on Monday.","h-2"],
       ["Talks with employers collapse","Both sides blame each other on the evening news.","h-2"],
       ["Workers vote 9 to 1 for action","The union says the cost of living has gone too far.","w+0.3"]],
      [["Buses and trains run a reduced service","Commutes take twice as long.","e-4 h-2"],
       ["Ports grind to a halt","Ships wait offshore with full containers.","p+1"],
       ["Factories stand idle","Managers try to keep the lines running alone.","h-2"],
       ["Picket lines outside offices","Some workers join, others cross.","h-2"],
       ["Join the rally?","Your coworkers are marching for better pay this afternoon. Join them?","",[0.6,"The march is peaceful and the mood is electric.","h+6 e-6","Your boss docks half a day’s pay.","c-30 h-3"],[1,"You keep working.",""]]],
      [["Shops run short of goods","Deliveries are days late.","p+1.5 h-3"],
       ["Government calls emergency talks","Both sides are summoned to the ministry.","h+1"],
       ["Strike spreads to hospitals","Only emergencies are treated.","h-4"],
       ["Strike fund appeal","Strikers ask for donations to feed their families. Give $15?","",[1,"They thank you warmly.","c-15 h+5"],[1,"You walk past.","h-2"]]],
      [["Deal reached: pay rises for all","Workers win a 4% rise. Services resume.","w+1 h+4"],
       ["Trains back to normal","The morning commute is boring again. Wonderful.","e+4 h+3"],
       ["Ports clear the backlog","Shelves refill over the week.","p-1 h+2"]]]},
    {id:'cyber',ic:'🛡️',n:'Cyber attack on the banks',term:'Systemic risk: when trouble in one part of the financial system spreads to the rest.',len:[5,8],eff:{mkt:-0.3,r:0.02,cls:0.04},ph:[
      [["Hackers hit the country’s biggest bank","Online banking goes dark for millions.","h-3"],
       ["Card payments fail across town","Shops put up “cash only” signs.","h-3 e-2"],
       ["Ransom demand published","The hackers want millions in crypto.","h-2"]],
      [["ATMs run out of cash","Long queues form outside every branch.","h-3 e-3"],
       ["Salaries delayed","Some firms cannot pay staff on time.","h-4"],
       ["Phishing texts flood phones","Scammers pretend to be the bank.","h-2"],
       ["Small shops struggle","Without card payments, sales drop.","w-0.3 h-2"],
       ["A suspicious text","A text says “Your account is locked. Click to verify.” Click it?","",[0.05,"Somehow it was real. You are logged back in.","h+2","It was a scam. $50 disappears before you call the bank.","c-50 h-8"],[1,"You delete it and call the bank directly.","h+2 n+1"]]],
      [["Bank shares plunge","Investors fear more attacks.","h-3"],
       ["Regulators order an emergency audit","Every bank must check its systems.","r+0.05"],
       ["Government sets up a cyber task force","Experts work around the clock.","h+1"],
       ["Change all your passwords","A security expert on TV urges everyone to update passwords tonight. Spend the evening on it?","",[1,"Tedious, but you feel safer.","e-5 n+2 h+2"],[1,"You will do it later.","h-1"]]],
      [["Systems back online","Payments work again and customers are compensated.","h+4"],
       ["Hackers arrested overseas","Police announce arrests in three countries.","h+3"],
       ["Banks promise better security","Two-step login is now standard.","h+2"]]]},
    {id:'green',ic:'🌿',n:'Green energy boom',term:'Energy transition: shifting from oil and coal to clean power such as solar and wind.',len:[5,8],eff:{w:0.25,mkt:0.3,p:-0.1},ph:[
      [["Government announces a huge solar plan","Rooftops across the island will get panels.","h+3"],
       ["Electric buses arrive","The first fleet rolls out quietly.","h+2"],
       ["Clean-energy firms raise record funding","Investors pour in.","w+0.2"]],
      [["Solar installers hiring fast","Electricians are in demand everywhere.","w+0.5"],
       ["Electricity bills fall","Cheaper solar power trickles into household bills.","p-1 h+3"],
       ["Green jobs fair packed","Thousands queue for training places.","h+2"],
       ["Recycling start-ups multiply","Bins for every kind of waste appear.","h+2"],
       ["Solar panel course","A weekend course on solar installation costs $40. Sign up?","",[0.8,"You learn a practical new skill.","c-40 n+5","The course is mostly slides.","c-40 n+2"],[1,"You skip it.",""]]],
      [["Clean-energy shares soar","Green funds are up 30% this year.","h+3"],
       ["Oil companies cut jobs","Old energy firms shrink.","w-0.2 h-2"],
       ["Battery factory opens","Hundreds of new jobs.","w+0.4"],
       ["Install a smart meter?","A free smart meter could cut your bills. Spend an evening setting it up?","",[0.7,"Your bills drop noticeably.","e-4 c+20","It does not work in your flat.","e-4 h-2"],[1,"You leave it.",""]]],
      [["The boom settles","Growth slows, but the new jobs stay.","h+2"],
       ["Air quality improves","The sky looks bluer than you remember.","h+4 l+2"],
       ["Electricity prices stay low","Households keep the savings.","p-0.5 h+2"]]]},
    {id:'tour',ic:'✈️',n:'Tourism boom',term:'Service exports: money foreign visitors spend locally, which counts like selling goods abroad.',len:[5,8],eff:{w:0.3,p:0.3,mkt:0.2},ph:[
      [["Record number of tourists arrive","Hotels are almost full.","h+2"],
       ["New cruise terminal opens","Huge ships dock every morning.","w+0.2"],
       ["Airline announces new routes","Visitors from three new countries.","h+2"]],
      [["Hotels hiring by the hundred","Front desk, cleaning and kitchen jobs everywhere.","w+0.5"],
       ["Restaurants raise prices","Tourist areas get pricier.","p+1 h-1"],
       ["Street markets buzzing","Night markets stay open late.","h+3"],
       ["Taxi queues everywhere","It is hard to get a ride.","e-3"],
       ["Tour guide for a day","A tour company needs a local guide this Saturday. $80. Do it?","",[0.8,"Fun day, generous tips.","c+100 e-14 h+5","Tough group, no tips.","c+80 e-18"],[1,"You keep your weekend.",""]]],
      [["Hotels charge record rates","Rooms cost triple on weekends.","p+1"],
       ["Locals complain about crowds","The hawker queue is an hour long.","h-3"],
       ["Shops extend opening hours","More shifts for everyone.","w+0.4"],
       ["Rent out your room?","A tourist offers $90 for two nights in your spare room. Accept?","",[0.7,"A polite guest who leaves a thank-you note.","c+90 h+3","A noisy guest. You sleep badly.","c+90 e-8 h-3"],[1,"You keep your privacy.",""]]],
      [["Peak season ends","Crowds thin out and prices ease.","p-0.5 h+2"],
       ["Tourism board reports a record year","Businesses celebrate.","h+3"],
       ["Hotels keep their new staff","Many temporary jobs become permanent.","w+0.3 h+2"]]]},
    {id:'haze',ic:'🌫️',n:'Haze season',term:'Externality: a cost one party causes that others pay for, like smoke from distant fires.',len:[5,8],eff:{p:0.1,mkt:-0.1,cls:0.03},ph:[
      [["Smoke drifts in from forest fires","The sky turns a dull orange.","h-3"],
       ["Air quality index climbs","Health warnings on every channel.","l-1 h-2"],
       ["Schools cancel outdoor activities","Children stay indoors.","h-2"]],
      [["Masks sell out","Pharmacies ration N95 masks.","p+1 h-2"],
       ["Air purifiers fly off the shelves","Prices double.","p+1"],
       ["Outdoor workers struggle","Construction sites cut hours.","w-0.2 l-1"],
       ["Hospitals see more breathing problems","Clinics are busy.","l-2 h-2"],
       ["Buy an air purifier?","A shop has one last purifier for $90. Buy it?","",[0.9,"You breathe easier and sleep better.","c-90 l+4 e+5","It is noisy and weak.","c-90 h-3"],[1,"You keep the windows shut.","l-1"]]],
      [["Haze hits hazardous levels","The air smells of smoke.","l-2 h-4"],
       ["Offices allow work from home","Streets are empty.","h+1"],
       ["Flights delayed by poor visibility","Travellers are stranded.","h-2"],
       ["Masks for the neighbours","Your elderly neighbour has no mask. Give her one of your spares?","",[1,"She thanks you with a pot of soup.","h+6 e+5"],[1,"You keep them for yourself.","h-2"]]],
      [["Rain clears the sky","The first blue sky in a week.","h+5 l+1"],
       ["Fires brought under control","The smoke finally fades.","h+3"],
       ["Life back outdoors","Parks fill up again.","h+4"]]]},
    {id:'flood',ic:'🌊',n:'Monsoon floods',term:'Supply disruption: when transport or production is cut off, goods become scarce and prices rise.',len:[5,8],eff:{p:0.5,mkt:-0.15,cls:0.06},ph:[
      [["Heaviest rain in 50 years","Drains overflow and roads turn into rivers.","h-3 e-2"],
       ["Flash floods close major roads","Buses are diverted and traffic crawls.","e-4"],
       ["Weather agency issues a red alert","More storms are coming.","h-2"]],
      [["Low-lying shops flooded","Shopkeepers sweep out muddy water.","p+1 h-2"],
       ["Supermarket deliveries delayed","Fresh food is scarce.","p+1.5"],
       ["Factories in the industrial park shut","Machines are under water.","w-0.3"],
       ["Insurance claims flood in","Insurers warn premiums will rise.","h-2"],
       ["Help a flooded shop","The minimart downstairs needs help moving stock to higher shelves. Help?","",[1,"The owner gives you a bag of groceries as thanks.","e-10 e+8 h+6"],[1,"You stay dry indoors.",""]]],
      [["River bursts its banks","Several blocks are evacuated.","h-4"],
       ["Power cuts in some estates","Families light candles.","h-3 e-2"],
       ["Volunteers fill sandbags","The community pulls together.","h+2"],
       ["Waterproof boots?","Boots are $35 at the corner shop. Your shoes are soaked every day. Buy them?","",[0.9,"Dry feet. Bliss.","c-35 h+4","They leak at the seam.","c-35 h-3"],[1,"You put up with wet shoes.","h-2"]]],
      [["The rain finally stops","Pumps clear the water.","h+4"],
       ["Clean-up crews at work","Streets are washed and roads reopen.","h+2"],
       ["Government pays flood relief","Affected households receive $100.","c+40 h+3"]]]},
    {id:'chip',ic:'💾',n:'Chip shortage',term:'Bottleneck: one part that everything else needs, so a shortage of it holds up whole industries.',len:[5,8],eff:{p:0.6,mkt:-0.15,lay:0.015},ph:[
      [["Fire at a major chip factory","The world’s supply of computer chips takes a hit.","h-2"],
       ["Car makers halt production","No chips, no cars.","p+1"],
       ["Phone launches delayed","New models are pushed back months.","h-2"]],
      [["Laptop prices jump 20%","Students rush to buy before prices rise again.","p+1.5 h-2"],
       ["Electronics shelves half empty","Stores put up “out of stock” signs.","p+1"],
       ["Second-hand gadgets in demand","Old phones sell for surprising prices.","h+1"],
       ["Factories cut shifts","Assembly lines wait for parts.","w-0.3 h-2"],
       ["Sell your old phone?","A trader offers $80 for the phone in your drawer. Sell it?","",[1,"Easy money for something you never use.","c+80 h+2"],[1,"You keep it as a spare.",""]]],
      [["Car dealers have no stock","Waiting lists stretch for a year.","h-2"],
       ["Chip stocks soar","Investors bet on chipmakers.","h+1"],
       ["Government funds a new chip plant","Jobs for engineers.","w+0.3"],
       ["Repair instead of replace","Your laptop is slow. A repair shop can upgrade it for $50 instead of buying new. Do it?","",[0.8,"It runs like new.","c-50 h+4 n+1","The upgrade does not help much.","c-50 h-3"],[1,"You live with it.",""]]],
      [["Chip factory back online","Supply starts to recover.","h+3"],
       ["Gadget prices ease","Shelves refill.","p-1 h+2"],
       ["Car makers restart production","The assembly lines hum again.","w+0.2 h+2"]]]},
    {id:'stim',ic:'🏗️',n:'Government stimulus',term:'Fiscal stimulus: the government spends more, or taxes less, to get the economy moving.',len:[5,8],eff:{w:0.3,p:0.3,r:0.02,mkt:0.25},ph:[
      [["Budget day: big spending plans announced","New roads, schools and a rail line.","h+3"],
       ["Tax rebates for workers","Every worker will get money back.","c+30 h+3"],
       ["Infrastructure projects fast-tracked","Construction starts next month.","w+0.2"]],
      [["Building sites hiring","Contractors offer good daily rates.","w+0.5"],
       ["Shops see more spending","Consumers feel confident.","h+2 p+0.5"],
       ["Cash vouchers in the mail","Households get $50 to spend locally.","c+50 h+3"],
       ["Training subsidies expanded","Courses get cheaper.","n+1 h+2"],
       ["Voucher deal","A hawker centre doubles vouchers today. Spend $10 for $20 of food?","",[1,"Two days of delicious meals.","c-10 e+10 h+4"],[1,"You save your money.",""]]],
      [["Economists warn of overheating","Prices start to rise faster.","p+1"],
       ["Interest rates tick up","The central bank leans against inflation.","r+0.05"],
       ["Unemployment at a record low","Everyone seems to have work.","w+0.4 h+3"],
       ["Weekend building job","A contractor needs a hand on Saturday for $90. Take it?","",[0.8,"Hard, honest work.","c+90 e-16","The heat makes it brutal.","c+90 e-22 l-1"],[1,"You rest.","e+4"]]],
      [["Stimulus winds down","The big projects are finished.","h+2"],
       ["Growth stays strong","The economy is in better shape.","h+3"],
       ["Government reports the results","Thousands of new jobs created.","w+0.2 h+2"]]]},
    {id:'recess',ic:'📉',n:'Recession',term:'Recession: when the economy shrinks for two quarters in a row, usually with rising unemployment.',len:[6,9],eff:{w:-0.3,p:-0.2,r:-0.05,mkt:-0.4,lay:0.05},ph:[
      [["Economy shrinks for a second quarter","It is official: a recession.","h-4"],
       ["Big retailer warns of losses","Shoppers are tightening their belts.","h-2"],
       ["Consumer confidence plunges","People stop spending.","p-0.5 h-3"]],
      [["Layoffs announced at three firms","Hundreds lose their jobs.","h-4"],
       ["Restaurants half empty","Owners offer deals to lure diners.","p-1"],
       ["Job ads dry up","Applications per job triple.","h-3"],
       ["Pay freezes everywhere","No raises this year.","w-0.5 h-2"],
       ["Cut back?","Your friend suggests cancelling all subscriptions to save $25 a month. Do it?","",[1,"You barely miss them.","c+25 h-1"],[1,"You keep your little comforts.","h+2"]]],
      [["Unemployment hits a 10-year high","Queues at the job centre.","h-4"],
       ["Central bank cuts rates to zero","Borrowing is nearly free.","r-0.1"],
       ["Government announces a rescue package","Support for workers and businesses.","h+2"],
       ["Help a laid-off friend","A friend lost her job and is struggling. Buy her groceries ($30)?","",[1,"She hugs you tight.","c-30 h+8"],[1,"You send a kind message.","h+2"]]],
      [["The economy starts to grow again","Recovery is slow but real.","h+4"],
       ["Hiring picks up","Job ads return.","w+0.3 h+3"],
       ["Shops report better sales","Confidence returns.","h+3"]]]},
    {id:'crymania',ic:'🪙',n:'Crypto mania',term:'Speculative bubble: buying something mainly because you expect someone else to pay more for it later.',len:[5,8],eff:{mkt:0.1},ph:[
      [["A new coin rockets 500%","Everyone is talking about it.","h+2"],
       ["Celebrities promote crypto","Adverts on every bus.","h+1"],
       ["Crypto ATMs appear in malls","Queues form to buy.","h+1"]],
      [["Your colleagues compare crypto gains","Lunch is all about coins.","h-1"],
       ["Coin prices double again","The hype is deafening.","h+2"],
       ["Banks warn customers","Regulators say crypto is very risky.","n+1"],
       ["Crypto influencer promises riches","He sells a course for $200.","h-1"],
       ["Buy a little?","A friend says put $60 into the hot coin today. Do it?","",[0.4,"It doubles before you sell. $60 profit.","c+60 h+6","It halves overnight.","c-30 h-5"],[1,"You stay out of it.",""]]],
      [["Crypto exchange collapses","Billions vanish overnight.","h-4"],
       ["Coin prices crash 70%","Fortunes are wiped out.","h-3"],
       ["Scam projects exposed","Founders disappear with investors’ money.","h-2 n+1"],
       ["Comfort a friend","Your friend lost his savings in the crash. Take him out for a meal ($20)?","",[1,"He feels a little better.","c-20 h+5"],[1,"You send a message.","h+1"]]],
      [["Regulators announce new rules","Crypto firms will be licensed.","h+2"],
       ["The hype fades","People talk about other things.","h+2"],
       ["Lessons learned","Finance blogs fill with “what we learned” posts.","n+2"]]]},
    {id:'ship',ic:'⚓',n:'Shipping crisis',term:'Supply chain: the network of factories, ships and trucks that brings goods to shops.',len:[5,8],eff:{p:0.6,mkt:-0.15},ph:[
      [["A giant container ship runs aground","A key canal is blocked.","p+1"],
       ["Freight rates triple","Shipping a container costs a fortune.","p+1.5"],
       ["Ports report long queues","Ships wait at anchor for days.","h-2"]],
      [["Shop shelves thin out","Imported goods run short.","p+1.5 h-2"],
       ["Toy and gadget shortages","Parents worry about birthdays.","h-2"],
       ["Truckers work around the clock","Overtime pay soars.","w+0.3"],
       ["Warehouses overflow","Goods pile up in the wrong places.","h-1"],
       ["Stock up?","The supermarket limits imported coffee to one bag each. Buy two at different branches?","",[0.7,"You have coffee for a month.","c-20 e+5 h+3","The second branch is out.","c-10 h-1"],[1,"You switch to tea.",""]]],
      [["Prices of imported goods soar","Everything from shoes to sauces costs more.","p+2 h-3"],
       ["Local makers win orders","Shops turn to local suppliers.","w+0.3 h+1"],
       ["Port workers hired","Ports run 24 hours.","w+0.3"],
       ["Port night shift","The port needs temporary night workers for $80. Take one shift?","",[0.8,"Hard but well paid.","c+80 e-18","Exhausting and cold.","c+80 e-24"],[1,"You sleep.",""]]],
      [["The canal reopens","Ships start moving again.","h+3"],
       ["Freight rates fall","Shipping costs head back to normal.","p-1"],
       ["Shelves refill","The shortages end.","p-1 h+3"]]]},
    {id:'auto',ic:'🤖',n:'Automation wave',term:'Automation: machines and software doing tasks that people used to do.',len:[5,8],eff:{w:-0.2,mkt:0.25,lay:0.03},ph:[
      [["Supermarket chain installs self-checkouts","Cashier jobs are cut.","h-2"],
       ["Banks replace tellers with apps","Branches shrink.","h-2"],
       ["AI assistant goes viral","It writes, codes and draws.","n+1"]],
      [["Warehouses run on robots","Night shifts disappear.","w-0.3 h-2"],
       ["Tech firms report record profits","Shareholders cheer.","h+1"],
       ["Unions demand retraining","Workers want new skills, not pink slips.","h+1"],
       ["Coding bootcamps fill up","Everyone wants to learn tech.","n+1"],
       ["Learn a new tool?","A free online course teaches you to use AI tools at work. Spend the evening on it?","",[0.8,"You are faster at work already.","n+4 e-6","It is confusing at first.","n+2 e-6"],[1,"You relax.","e+3"]]],
      [["Thousands of jobs automated","Factories and offices change fast.","h-4"],
       ["Government funds retraining","Free courses for affected workers.","n+2 h+2"],
       ["New tech jobs appear","Firms need people to run the machines.","w+0.3"],
       ["Help an older colleague","An older colleague struggles with the new software. Stay late to help?","",[1,"She is grateful and you learn too.","e-6 h+6 n+1"],[1,"You head home.",""]]],
      [["The dust settles","New roles replace many old ones.","h+2"],
       ["Productivity rises","Firms share some gains with staff.","w+0.3 h+2"],
       ["Shorter working weeks trialled","Some firms try four-day weeks.","h+4"]]]},
    {id:'debt',ic:'💳',n:'Credit card crunch',term:'Household debt: money families owe on loans and cards. High rates make it harder to repay.',len:[5,8],eff:{r:0.05,mkt:-0.2,lay:0.01},ph:[
      [["Household debt hits a record","Families owe more than ever.","h-2"],
       ["Banks raise card interest rates","Minimum payments go up.","r+0.05 h-2"],
       ["Buy-now-pay-later firm collapses","Shoppers are confused about what they owe.","h-2"]],
      [["Debt counselling queues grow","Charities are overwhelmed.","h-3"],
       ["Shops see fewer big purchases","Sofas and TVs wait.","p-0.5"],
       ["Banks cut credit limits","Cards are declined at checkouts.","h-3"],
       ["Payday lenders advertise everywhere","Their rates are eye-watering.","h-1"],
       ["Budget workshop","A free evening workshop teaches budgeting. Go?","",[0.9,"You leave with a clear plan.","n+3 e-4 h+3","The speaker is dull, but the handout is useful.","n+1 e-4"],[1,"You stay home.",""]]],
      [["Card defaults jump","Banks set aside billions for bad loans.","h-3"],
       ["Government caps late fees","Some relief for borrowers.","h+2"],
       ["Financial literacy campaign launched","Adverts urge people to save.","n+1"],
       ["Pay off a small debt","Your phone shop says pay $30 now and clear your old balance. Do it?","",[1,"One less thing to worry about.","c-30 h+5"],[1,"You leave it for later.","h-1"]]],
      [["Card rates ease","Banks lower rates a little.","r-0.05 h+2"],
       ["Families report less stress","Budgets are under control.","h+3"],
       ["Savings accounts grow","People save more than before.","h+2"]]]},
    {id:'heat',ic:'🔥',n:'Heatwave',term:'Climate shock: extreme weather that disrupts work, health and prices.',len:[5,8],eff:{p:0.3,w:-0.1,mkt:-0.1},ph:[
      [["Temperatures break records","The hottest day ever recorded.","e-4 h-2"],
       ["Heat warnings issued","Stay indoors at midday, officials say.","e-3"],
       ["Power demand spikes","Air-cons run all night.","p+0.5"]],
      [["Electricity bills soar","Households pay more to stay cool.","p+1 h-2"],
       ["Outdoor work stopped at noon","Builders and gardeners work early and late.","w-0.3"],
       ["Ice cream sells out","Shops cannot restock fast enough.","h+1"],
       ["Clinics see heatstroke cases","Doctors urge people to drink water.","l-1"],
       ["Buy a fan?","A shop has fans on sale for $25. Your room is an oven. Buy one?","",[0.9,"You sleep so much better.","c-25 e+6 h+3","It is noisy and barely helps.","c-25 h-2"],[1,"You suffer in silence.","e-3"]]],
      [["Power grid strained","Rolling blackouts hit some estates.","h-3 e-3"],
       ["Water usage at a record","Officials ask for shorter showers.","h-1"],
       ["Malls packed with people escaping the heat","Free air-con draws crowds.","h+1"],
       ["Check on a neighbour","Your elderly neighbour lives alone without air-con. Bring her a cold drink?","",[1,"She is grateful and a little teary.","h+6"],[1,"You hope someone else checks on her.","h-2"]]],
      [["A cool breeze arrives","Temperatures drop at last.","h+4 e+3"],
       ["Thunderstorms break the heat","Rain cools the streets.","h+3"],
       ["Electricity demand eases","Bills settle back down.","p-0.5 h+2"]]]},
    {id:'elect',ic:'🗳️',n:'Election season',term:'Political uncertainty: investors wait to see which policies will win before spending.',len:[5,8],eff:{mkt:-0.05,w:0.1},ph:[
      [["Election called","Voting day is in two weeks.","h+1"],
       ["Parties launch their campaigns","Posters go up on every lamppost.","h+1"],
       ["First TV debate","Candidates clash over the cost of living.","n+1"]],
      [["Promises of lower taxes","One party pledges tax cuts for workers.","h+2"],
       ["Promises of higher wages","Another pledges a minimum wage rise.","h+2"],
       ["Markets hesitate","Investors wait for the result.","h-1"],
       ["Rallies fill the stadium","Crowds cheer late into the night.","h+1 e-2"],
       ["Volunteer for a campaign?","A campaign needs volunteers to hand out leaflets this evening. Help?","",[0.8,"You meet interesting people.","e-8 h+5 n+1","It rains and nobody takes a leaflet.","e-8 h-2"],[1,"You stay out of politics.",""]]],
      [["Voting day","Queues outside every polling station.","h+2"],
       ["Results too close to call","The country waits through the night.","e-3 h-1"],
       ["Winner declared","The new government promises a fresh start.","h+3"],
       ["Election-night party","Friends are hosting a results-watching party. Go ($10 for snacks)?","",[0.9,"A fun, tense night.","c-10 h+6 e-6","Arguments break out over politics.","c-10 h-3 e-6"],[1,"You check the result in the morning.","e+3"]]],
      [["New ministers sworn in","The cabinet is named.","h+1"],
       ["First budget promises kept","Some taxes are cut.","w+0.3 h+2"],
       ["Markets rally","Uncertainty lifts.","h+2"]]]},
    {id:'gold',ic:'🥇',n:'Commodity boom',term:'Commodity cycle: long swings in the prices of raw materials like metals, oil and grain.',len:[5,8],eff:{p:0.4,mkt:0.15,w:0.1},ph:[
      [["Gold hits a record high","Investors rush to safe assets.","h+1"],
       ["Copper prices surge","Builders pay more for wiring.","p+0.5"],
       ["Mining shares jump","Resource firms post huge profits.","h+1"]],
      [["Jewellery prices soar","Wedding rings cost much more.","p+1 h-1"],
       ["Pawn shops busy","People sell old gold.","h+1"],
       ["Cash-for-gold shops open everywhere","Signs on every street.","h+1"],
       ["Metal prices push up costs","Appliances get pricier.","p+1"],
       ["Sell old jewellery?","A gold dealer offers $90 for a broken bracelet you never wear. Sell?","",[1,"It is worth more than you thought.","c+90 h+3"],[1,"You keep it for sentimental reasons.","h+1"]]],
      [["Commodity prices peak","Analysts say it cannot last.","h-1"],
       ["Mining towns boom","Wages soar in resource regions.","w+0.3"],
       ["Theft of copper cables rises","Some train lines are delayed.","e-2 h-2"],
       ["Gold savings plan","Your bank offers a gold savings plan with a $30 minimum. Start one?","",[0.5,"Gold keeps rising. Your $30 is worth $40.","c+10 h+2","Gold slips. Your $30 is worth $24.","c-6 h-1"],[1,"You keep your money in the bank.",""]]],
      [["Prices start to fall","The boom fades.","p-0.5 h+1"],
       ["Mining firms cut back","Production slows.","h-1"],
       ["Costs settle","Appliance prices ease.","p-0.5 h+2"]]]},
    {id:'bird',ic:'🐔',n:'Bird flu outbreak',term:'Outbreak: a sudden rise in cases of a disease in one area.',len:[5,8],eff:{p:0.4,mkt:-0.15,ill:1.3,cls:0.03},ph:[
      [["Bird flu found at poultry farms","Millions of chickens are culled.","h-3"],
       ["Egg prices jump","Shoppers buy fewer eggs.","p+1"],
       ["Health ministry urges caution","Wash hands, avoid live poultry markets.","n+1"]],
      [["Chicken rice prices rise","Hawkers pass on the cost.","p+1 h-2"],
       ["Some human cases reported","Hospitals are on alert.","h-3"],
       ["Schools stop field trips to farms","Precautions everywhere.","h-1"],
       ["Masks return to public transport","Many commuters cover up.","h-1"],
       ["Get a flu jab?","The clinic offers a flu vaccination for $20. Get one?","",[1,"A sore arm, and peace of mind.","c-20 l+3 h+2"],[1,"You skip it.",""]]],
      [["Poultry imports banned","Supermarkets limit chicken.","p+1.5 h-2"],
       ["Vegetarian dishes in demand","Restaurants change menus.","h+1"],
       ["Clinic queues grow","Doctors are busy.","h-2"],
       ["Try a vegetarian week","A friend challenges you to eat vegetarian for a week. Accept?","",[0.8,"You feel lighter and save money.","c+15 l+3 h+3","You miss chicken terribly.","h-3"],[1,"You stick to your usual meals.",""]]],
      [["Outbreak contained","No new cases for a week.","h+4"],
       ["Poultry imports resume","Chicken is back on the menu.","p-1 h+3"],
       ["Egg prices ease","Breakfast is affordable again.","p-0.5 h+2"]]]},
    {id:'sport',ic:'🏟️',n:'Big sports event',term:'Event economics: big events bring spending and jobs, but also higher prices and crowds.',len:[5,8],eff:{w:0.2,p:0.3,mkt:0.15},ph:[
      [["The city wins the right to host the games","Celebrations in the streets.","h+4"],
       ["New stadium opens","A shining arena by the bay.","h+2"],
       ["Ticket sales begin","Websites crash under demand.","h-1"]],
      [["Hotels fully booked","Visitors arrive from everywhere.","p+1"],
       ["Event staff hiring","Ushers, drivers and cooks needed.","w+0.4"],
       ["Shops sell team shirts","Everyone wears the national colours.","h+2"],
       ["Roads closed for events","Commutes get longer.","e-3"],
       ["Event volunteer","The games need volunteers for the opening ceremony. Sign up?","",[0.9,"You are part of history. Unforgettable.","e-10 h+10","Long, hot hours, but still special.","e-14 h+4"],[1,"You watch on TV.","h+2"]]],
      [["Opening ceremony dazzles","Fireworks light up the sky.","h+5"],
       ["Home team wins gold","The whole city cheers.","h+6"],
       ["Bars packed for every match","Late nights everywhere.","e-3 h+2"],
       ["Last-minute ticket","A friend has a spare ticket to the final for $60. Go?","",[0.8,"An electric atmosphere. Worth every cent.","c-60 h+12 e-6","Your seat has a pillar in front of it.","c-60 h+2 e-6"],[1,"You watch at a hawker centre with strangers.","h+4"]]],
      [["Closing ceremony","The games end on a high.","h+4"],
       ["Visitors fly home","Hotels and streets quieten down.","p-0.5 h+1"],
       ["The stadium becomes a public sports centre","Free sessions for residents.","h+2 l+1"]]]},
    {id:'retail',ic:'🛒',n:'Retail shake-up',term:'Creative destruction: old businesses close as new ways of doing things take over.',len:[5,8],eff:{p:-0.2,mkt:-0.15,lay:0.03,cls:0.04},ph:[
      [["Department store chain goes bust","Closing-down sales in every mall.","p-1 h-1"],
       ["Online shopping hits a record","Delivery vans clog the streets.","h+1"],
       ["Mall rents fall","Empty units everywhere.","h-1"]],
      [["Clearance sales everywhere","Huge discounts on clothes and furniture.","p-1.5 h+2"],
       ["Shop workers laid off","Hundreds of retail jobs lost.","h-3"],
       ["Delivery firms hiring","Riders and warehouse staff needed.","w+0.2"],
       ["Pop-up shops fill empty units","Local makers try their luck.","h+2"],
       ["Closing-down bargain","A store sells a $150 winter coat for $30. Buy it?","",[0.6,"Perfect for your next trip.","c-30 h+5","You will never wear it.","c-30 h-2"],[1,"You walk past.",""]]],
      [["Malls turn into offices","Some floors are converted.","h-1"],
       ["Small shops band together","A “shop local” campaign begins.","h+2"],
       ["Retail wages fall","Fewer jobs, more applicants.","w-0.3 h-2"],
       ["Shop local","A market sells local goods. Spend $20 to support local makers?","",[1,"You get lovely things and a warm feeling.","c-20 h+6"],[1,"You shop online.",""]]],
      [["The high street reinvents itself","Cafés and studios move in.","h+3"],
       ["Online and shops find a balance","Click-and-collect is popular.","h+2"],
       ["Jobs return in new forms","Logistics and services grow.","w+0.2 h+2"]]]},
    {id:'water',ic:'💧',n:'Water shortage',term:'Scarcity: when there is not enough of something to meet demand, its price goes up.',len:[5,8],eff:{p:0.4,mkt:-0.1},ph:[
      [["Reservoirs at record lows","Months of dry weather take their toll.","h-2"],
       ["Water rationing proposed","Officials ask everyone to cut use.","h-2"],
       ["Water prices to rise","Bills will go up next month.","p+1"]],
      [["Shorter showers, please","Campaigns on every channel.","h-1"],
       ["Car washes close","Businesses that use a lot of water shut.","w-0.2"],
       ["Bottled water sells out","Shoppers stock up.","p+1 h-2"],
       ["Farms struggle","Vegetable prices rise.","p+1"],
       ["Water-saving kit","The town council gives out free water-saving kits. Spend an hour fitting one?","",[1,"Your bill drops.","e-4 c+15 h+2"],[1,"You skip it.",""]]],
      [["Water cut in some estates","Taps run dry for hours.","h-4 e-3"],
       ["Desalination plants run full time","New water from the sea.","h+1"],
       ["Neighbours share water","The community helps each other.","h+3"],
       ["Help fill containers","Your block is filling water containers for the elderly. Help?","",[1,"Hard work, grateful neighbours.","e-10 h+6"],[1,"You stay in.",""]]],
      [["Heavy rain refills the reservoirs","Water levels rise.","h+4"],
       ["Rationing ends","Showers are back to normal.","h+3"],
       ["Water prices ease","Bills settle.","p-0.5 h+2"]]]}
  ];
  /* ---------- industry-specific storylines (CONFIG.industry) ----------
    One a game, on top of the global storyline (SAGAS), and it may run at the same time. Each hits particular workplaces and
    roles over four phases (it begins, it escalates, at its peak, easing off), one chapter a night like a global storyline.
    A phase's effects hold from its chapter's night until the next chapter (the last one holds for one more day).
    rum: the rumour shown in the Employment Office before it starts. hit: who is affected, shown on the first card.
    ph: four phases, each {on:[effects], c:[chapters]}. Chapters are [title, text, fx], as in SAGAS.
    An effect is {w:who, lab:its name in the outlook, pay:share of this game's swing S (−1 = pay down by S, 0.5 = up by half S),
      hire:'freeze' (few openings: CONFIG.industry.freezeShare) or 'open' (always openings), cut:1 (layoffs and suspensions) or 's' (suspensions only)}.
    who picks roles by workplace {b:[...]}, career line {c:[...]}, role name {r:[...]} and/or qualification field {t:'med'}; all given keys must match.
    Effects that match the same role add up their pay. */
  var IW={fac:{b:['factory']},line:{r:['Line Worker','Forklift Driver']},esales:{c:['elec']},repair:{r:['Repair Technician']},
    etech:{c:['elec2']},btech:{r:['Tech Developer']},bank:{r:['Teller','Internal Auditor','Market Risk Analyst']},
    deliv:{r:['Delivery Rider','Delivery Driver','Delivery & Install']},crew:{r:['Crew Member','Kitchen Hand']},
    tills:{r:['Cashier','Shelf Stacker']},sup:{r:['Store Supervisor','Supermarket Manager','IT Support Lead']},
    med:{b:['hosp'],t:'med'},hsup:{r:['Hospital Porter','Cleaner']},eat:{b:['resto','fast']},fnb:{b:['resto','fast'],t:'fnb'},
    mall:{b:['mall']},thrift:{c:['thrift','thrift2']},appr:{r:['Appraiser','Pawnbroker']},pawn:{c:['pawn','pawn2']},gym:{b:['gym']},eng:{r:['Technician','Design Engineer','Senior Engineer','Project Lead','Principal Engineer','Chief Engineer']}};
  function ie(w,lab,pay,hire,cut){var e={w:IW[w],lab:lab,pay:pay||0};if(hire)e.hire=hire;if(cut)e.cut=cut;return e}
  var INDUSTRY=[
    {id:'chips',ic:'💾',n:'AI chip shortage',term:'Supply bottleneck: when one part that a whole industry needs runs short, production stalls everywhere it is used.',
      rum:'Chip supplies are drying up. Factory and electronics sales jobs may be at risk; repair work may pick up.',
      hit:'Factory and electronics sales jobs are hit; repair technicians are in demand.',ph:[
      {on:[ie('fac','Factory jobs',-0.5),ie('esales','Electronics sales',-0.5,'freeze'),ie('repair','Repair technicians',0.5,'open')],c:[
        ['Chip supplies dry up','A fire at an overseas chip plant halts deliveries. The Factory slows its lines.','h-1'],
        ['Empty shelves at the electronics store','New laptops and phones are on back-order for weeks.','']]},
      {on:[ie('fac','Factory jobs',-1,'freeze'),ie('esales','Electronics sales',-1,'freeze'),ie('repair','Repair technicians',1,'open')],c:[
        ['The Factory cuts shifts','Half the assembly lines stand idle, waiting for chips.','h-2'],
        ['Fix it, don’t replace it','With no new gadgets to buy, repair benches are piled high with old ones.','h+1']]},
      {on:[ie('fac','Factory jobs',-1,'freeze'),ie('line','Line workers and forklift drivers',0,'freeze',1),ie('esales','Electronics sales',-1,'freeze',1),ie('repair','Repair technicians',1,'open')],c:[
        ['Layoffs on the factory floor','Management lets line staff go until supplies return.','h-3'],
        ['The electronics store trims staff','No stock, no sales, fewer people on the floor.','h-2']]},
      {on:[ie('fac','Factory jobs',-0.5),ie('esales','Electronics sales',-0.5),ie('repair','Repair technicians',0.5)],c:[
        ['First chip shipments arrive','The lines restart slowly. Pay is still below normal.','h+2'],
        ['Back-orders start to clear','The electronics store reopens its waiting list.','h+1']]}]},
    {id:'bankai',ic:'🤖',n:'Banks go all-in on AI',term:'Automation: machines or software taking over tasks people used to do. It creates some jobs and removes others.',
      rum:'Talk at the Bank of a big AI project. Tech roles may be in demand; routine bank jobs may be at risk later.',
      hit:'Tech roles are in demand; tellers, auditors and risk analysts are at risk later.',ph:[
      {on:[ie('btech','Bank tech developers',0.5,'open'),ie('etech','Electronics Store tech roles',0.5,'open')],c:[
        ['The Bank announces an AI programme','The board wants every process automated within a year. Recruiters call every developer in town.','h+1'],
        ['Developers wanted','Job ads for software and AI roles double overnight.','']]},
      {on:[ie('btech','Bank tech developers',1,'open'),ie('etech','Electronics Store tech roles',1,'open'),ie('bank','Tellers, auditors, risk analysts',0,'freeze')],c:[
        ['Bidding war for tech talent','The Bank poaches developers with big raises.','h+1'],
        ['Hiring freeze for counter staff','The Bank stops replacing tellers who leave.','h-1']]},
      {on:[ie('btech','Bank tech developers',1,'open'),ie('etech','Electronics Store tech roles',1,'open'),ie('bank','Tellers, auditors, risk analysts',-0.5,'freeze',1)],c:[
        ['The AI goes live','Chatbots now handle most accounts. Teller and audit roles are cut.','h-3'],
        ['Restructuring at the Bank','Whole teams of analysts are told to reapply for fewer roles.','h-2']]},
      {on:[ie('btech','Bank tech developers',0.5,'freeze'),ie('etech','Electronics Store tech roles',0.5,'freeze'),ie('bank','Tellers, auditors, risk analysts',-0.5,'freeze')],c:[
        ['The project is finished','With the system built, the Bank stops hiring developers.','h-1'],
        ['Fewer people behind the counter','Branches now run with a skeleton crew.','h-1']]}]},
    {id:'delivery',ic:'🛵',n:'Delivery app price war',term:'Price war: rivals keep cutting prices (or raising pay) to win customers, often at a loss, until one gives up or they merge.',
      rum:'Two delivery apps are about to launch in town. Riders and drivers may be in demand.',
      hit:'Delivery jobs are in demand; fast-food crew lose shifts, and delivery pay may crash later.',ph:[
      {on:[ie('deliv','Delivery riders and drivers',1,'open')],c:[
        ['Delivery apps go to war','Two apps offer riders sign-up bonuses to win the town.','h+1'],
        ['Free delivery everywhere','Orders flood in and every rider is busy.','']]},
      {on:[ie('deliv','Delivery riders and drivers',1,'open'),ie('crew','Crew members and kitchen hands',-0.5)],c:[
        ['Counter sales slump','Customers order from home, so in-store crew get fewer shifts.','h-1'],
        ['Rider bonuses keep climbing','The apps pay extra for every evening shift.','h+1']]},
      {on:[ie('deliv','Delivery riders and drivers',-1,'freeze',1),ie('crew','Crew members and kitchen hands',-0.5)],c:[
        ['The apps merge','One app buys the other. Rider pay is cut overnight.','h-3'],
        ['Riders let go','The merged app needs half the riders it had.','h-2']]},
      {on:[ie('deliv','Delivery riders and drivers',-0.5)],c:[
        ['Delivery settles down','Fees go up and orders fall back.','h+1'],
        ['Crew shifts return','People drift back to eating in.','h+1']]}]},
    {id:'checkout',ic:'🧾',n:'Self-checkout rollout',term:'Labour-saving technology: machines that let a business serve the same customers with fewer staff.',
      rum:'The Supermarket is trialling self-checkout machines. Till and shelf jobs may be at risk.',
      hit:'Cashiers and shelf stackers are at risk; supervisors and IT support are in demand.',ph:[
      {on:[ie('tills','Cashiers and shelf stackers',-0.5,'freeze')],c:[
        ['Self-checkouts arrive','Ten machines appear where three tills used to be.','h-1'],
        ['“Unexpected item in the bagging area”','Shoppers grumble at the new machines.','h+1']]},
      {on:[ie('tills','Cashiers and shelf stackers',-0.5,'freeze'),ie('sup','Supervisors, managers, IT support',0.5,'open')],c:[
        ['Machines need minders','The store hires supervisors to help confused shoppers.',''],
        ['IT support on call','Somebody has to fix the machines when they freeze.','']]},
      {on:[ie('tills','Cashiers and shelf stackers',-1,'freeze',1),ie('sup','Supervisors, managers, IT support',0.5,'open')],c:[
        ['Tills close for good','Half the cashiers are let go.','h-3'],
        ['Night shelf team cut','Stock now arrives pre-packed on pallets.','h-2']]},
      {on:[ie('tills','Cashiers and shelf stackers',-0.5),ie('sup','Supervisors, managers, IT support',0.5)],c:[
        ['Shoppers get used to it','Queues are shorter and the store is quieter.','h+1'],
        ['A few tills reopen','Older shoppers asked for them back.','h+1']]}]},
    {id:'nurse',ic:'🩺',n:'Nursing shortage',term:'Labour shortage: when there are fewer workers than jobs, employers raise pay to attract them.',
      rum:'The Hospital is short of nurses. Medical jobs may pay more; support staff may be outsourced.',
      hit:'Medical roles are in demand; porters and cleaners are at risk.',ph:[
      {on:[ie('med','Medical roles',0.5,'open')],c:[
        ['Nurses quit in droves','Burnt-out staff leave for jobs abroad. Wards are short-handed.','h-1'],
        ['Hiring bonuses at the Hospital','Every medical job now comes with a signing bonus.','h+1']]},
      {on:[ie('med','Medical roles',1,'open')],c:[
        ['Overtime on every ward','Medical staff are paid extra to cover the gaps.',''],
        ['The Hospital raises medical pay','The board approves a pay rise to keep its nurses.','h+1']]},
      {on:[ie('med','Medical roles',1,'open'),ie('hsup','Porters and cleaners',-1,'freeze',1)],c:[
        ['Support staff outsourced','To pay for the nurses, porters and cleaners move to a contractor on lower pay.','h-3'],
        ['Contract cleaners arrive','A new company takes over cleaning. Some old staff are let go.','h-2']]},
      {on:[ie('med','Medical roles',0.5),ie('hsup','Porters and cleaners',-0.5)],c:[
        ['Agency nurses arrive','Temporary staff ease the shortage, and the premium shrinks.',''],
        ['Wards back to normal','Waiting lists start to fall.','h+1']]}]},
    {id:'food',ic:'🤢',n:'Food poisoning scandal',term:'Consumer confidence: how willing people are to spend. One scare can empty a whole industry for weeks.',
      rum:'Inspectors are visiting restaurants after reports of food poisoning. Restaurant and fast-food jobs may be at risk.',
      hit:'Restaurant and fast-food jobs are hit; staff with food training are in demand afterwards.',ph:[
      {on:[ie('eat','Restaurant and fast-food jobs',-0.5,'freeze','s')],c:[
        ['Food poisoning outbreak','Dozens fall ill after eating out. Inspectors close kitchens for checks.','h-2'],
        ['Diners stay away','Restaurants sit half empty.','h-1']]},
      {on:[ie('eat','Restaurant and fast-food jobs',-1,'freeze','s')],c:[
        ['Kitchens shut for inspection','Outlets are closed one by one until they pass.','h-2'],
        ['Bookings cancelled','Shifts are cut as tables stay empty.','h-1']]},
      {on:[ie('eat','Restaurant and fast-food jobs',-1,'freeze','s')],c:[
        ['The source is found','A single supplier was to blame, but the town is still wary.','h-1'],
        ['Staff sent home','With no customers, managers send staff home unpaid.','h-2']]},
      {on:[ie('fnb','Trained food staff',0.5,'open')],c:[
        ['Hiring rush for trained staff','Every reopened kitchen wants staff with food training.','h+2'],
        ['Diners return','Restaurants fill up again, a new hygiene sticker in every window.','h+1']]}]},
    {id:'mall',ic:'🛍️',n:'Online shopping hits the mall',term:'Disruption: a new way of selling that takes customers from an established industry.',
      rum:'Online shops are undercutting the Clothes Mall. Mall jobs may be at risk; second-hand may boom.',
      hit:'Clothes Mall jobs are hit; Thrift Store jobs are in demand.',ph:[
      {on:[ie('mall','Clothes Mall jobs',-0.5,'freeze'),ie('thrift','Thrift Store jobs',0.5,'open')],c:[
        ['Online fashion sale','A big online store sells clothes at half the mall’s prices.','h+1'],
        ['Quiet mall corridors','Footfall drops for a second week.','h-1']]},
      {on:[ie('mall','Clothes Mall jobs',-1,'freeze'),ie('thrift','Thrift Store jobs',1,'open')],c:[
        ['Mall shops close floors','The top floor is roped off.','h-2'],
        ['Second-hand is in','Thrift shopping goes viral and the Thrift Store needs more hands.','h+1']]},
      {on:[ie('mall','Clothes Mall jobs',-1,'freeze',1),ie('thrift','Thrift Store jobs',1,'open')],c:[
        ['Layoffs at the mall','Boutiques cut staff to survive.','h-3'],
        ['Queues at the Thrift Store','The sorting room cannot keep up.','h+1']]},
      {on:[ie('mall','Clothes Mall jobs',-0.5),ie('thrift','Thrift Store jobs',0.5)],c:[
        ['The mall fights back','Free returns and weekend events bring some shoppers back.','h+1'],
        ['The thrift craze cools','Thrift Store pay settles back down.','']]}]},
    {id:'gold',ic:'🪙',n:'Gold rush',term:'Commodity cycle: raw-material prices boom and bust, and the jobs that depend on them follow.',
      rum:'Gold prices are climbing fast. Appraisers at the Thrift Store’s pawn counter may be in demand.',
      hit:'Appraisers and pawnbrokers are in demand, then every pawn counter job is at risk.',ph:[
      {on:[ie('appr','Appraisers and pawnbrokers',0.5,'open')],c:[
        ['Gold hits a record','Everyone digs out old jewellery to sell.','h+1'],
        ['Queues at the pawn counter','Sal needs more appraisers.','']]},
      {on:[ie('appr','Appraisers and pawnbrokers',1,'open')],c:[
        ['Gold fever','Sal pays appraisers extra to work late.','h+1'],
        ['Every ring in town gets weighed','The shop runs out of space in the safe.','']]},
      {on:[ie('pawn','Pawn counter jobs',-1,'freeze',1)],c:[
        ['Gold crashes','The price falls by a third in two days. Sal is stuck with a safe full of gold.','h-3'],
        ['The pawn counter cuts staff','Sal lets staff go to cover the losses.','h-2']]},
      {on:[ie('pawn','Pawn counter jobs',-0.5)],c:[
        ['Gold steadies','Prices stop falling and Sal opens the doors again.','h+1'],
        ['Back to normal business','Old customers come back with their watches.','']]}]},
    {id:'fit',ic:'🏋️',n:'Viral fitness craze',term:'Fad: a sudden, short-lived craze. Businesses that hire for the peak are left over-staffed when it ends.',
      rum:'A fitness challenge is going viral online. Gym jobs may be in demand.',
      hit:'Gym jobs are in demand, then at risk when the fad fades.',ph:[
      {on:[ie('gym','Gym jobs',0.5,'open')],c:[
        ['A fitness challenge goes viral','Everyone in town is filming their workouts.','h+2'],
        ['The gym is packed','There is a queue for every machine.','']]},
      {on:[ie('gym','Gym jobs',1,'open')],c:[
        ['Instructors in demand','The gym adds classes and pays instructors extra.','h+1'],
        ['Memberships sell out','The front desk is overwhelmed.','']]},
      {on:[ie('gym','Gym jobs',-0.5,'freeze',1)],c:[
        ['The fad dies','The challenge is old news. Half the new members cancel.','h-2'],
        ['The gym cuts its newest hires','Last in, first out.','h-2']]},
      {on:[ie('gym','Gym jobs',-0.5)],c:[
        ['A quiet gym','Only the regulars remain.',''],
        ['Membership offers','The gym tries discounts to win people back.','h+1']]}]},
    {id:'robots',ic:'🦾',n:'Robots on the factory floor',term:'Capital for labour: a firm buys machines (capital) to replace workers (labour), raising pay for the skilled staff who run them.',
      rum:'The Factory is buying robots. Engineers may be in demand; line jobs may be at risk.',
      hit:'Factory engineers are in demand; line workers and forklift drivers are at risk.',ph:[
      {on:[ie('eng','Factory engineers',0.5,'open')],c:[
        ['Robots ordered','The Factory signs a deal for a fleet of robot arms.',''],
        ['Engineers wanted','The robots need people to install and program them.','h+1']]},
      {on:[ie('eng','Factory engineers',1,'open'),ie('line','Line workers and forklift drivers',0,'freeze')],c:[
        ['Robots installed','The first line runs without people.','h-1'],
        ['Line hiring stops','No new line workers are taken on.','h-1']]},
      {on:[ie('eng','Factory engineers',1,'open'),ie('line','Line workers and forklift drivers',-1,'freeze',1)],c:[
        ['Line jobs cut','The robots run the night shift. Line staff are let go.','h-3'],
        ['Forklifts go driverless','Self-driving forklifts arrive at the loading dock.','h-2']]},
      {on:[ie('eng','Factory engineers',0.5),ie('line','Line workers and forklift drivers',-0.5)],c:[
        ['Teething problems','Robots break down, and some line staff are called back.','h+1'],
        ['The new normal','The Factory settles in with fewer, better-paid jobs.','']]}]}
  ];
  function indOf(id){var r=null;INDUSTRY.forEach(function(x){if(x.id===id)r=x});return r}
  /* the day the industry-specific storyline starts: a random day from fromDay to (game length − daysBeforeEnd) */
  function indDay(){var L=CONFIG.industry,a=L.fromDay,b=Math.max(a,(S&&S.indLeft>0?Math.floor(gameLen()/2):gameLen()-L.daysBeforeEnd));  /* with a second one to come, the first starts in the first half */return a+Math.floor(Math.random()*(b-a+1))}
  function indPhase(k,N){return k===0?0:k>=N-1?3:k<Math.ceil(N*0.55)?1:2}  /* same phase split as a global storyline */
  /* the effects of the running industry-specific storyline's current phase (none before its first chapter or after it ends) */
  function indOn(){var st=S.ind,g=st&&indOf(st.id);return g&&st.day>0?g.ph[st.ph].on:[]}
  function indMatch(w,c,rk){var b=bOf(c);return (!w.b||w.b.indexOf(b)>=0)&&(!w.c||w.c.indexOf(c)>=0)&&(!w.r||w.r.indexOf(rk.r)>=0)&&(!w.t||rk.t===w.t)}
  /* today's effect on one role: {m: pay multiplier, freeze, open, cut: 1|'s'}, or null when the role is not affected */
  function indRole(c,i){
    var on=indOn();if(!on.length)return null;
    var rk=CAREERS[c].ranks[i],x=null;
    on.forEach(function(e){if(!indMatch(e.w,c,rk))return;x=x||{p:0,freeze:0,open:0,cut:0};x.p+=e.pay||0;
      if(e.hire==='freeze')x.freeze=1;if(e.hire==='open')x.open=1;if(e.cut&&x.cut!==1)x.cut=e.cut});
    if(x)x.m=Math.max(0.2,1+x.p*S.ind.sw);
    return x;
  }
  /* base pay of a role today, with the industry-specific storyline's change */
  function rolePay(c,i){var rk=CAREERS[c].ranks[i],x=indRole(c,i);return x?Math.round(rk.pay*x.m):rk.pay}
  function indStart(){
    var g=indOf(S.indId)||INDUSTRY[Math.floor(Math.random()*INDUSTRY.length)],L=CONFIG.industry;
    S.ind={id:g.id,day:0,len:L.days[0]+Math.floor(Math.random()*(L.days[1]-L.days[0]+1)),sw:Math.round((L.paySwing[0]+Math.random()*(L.paySwing[1]-L.paySwing[0]))*100)/100,ph:0,last:'',used:[]};
    S.indNext=0;S.indId=g.id;
  }
  /* tonight's chapter of the industry-specific storyline */
  function indEvent(){
    var st=S.ind,g=indOf(st.id);if(!g){S.ind=null;return null}
    var k=st.day,N=st.len,phase=indPhase(k,N),used=st.used||[],list=g.ph[phase].c.filter(function(c){return used.indexOf(c[0])<0});
    if(!list.length)list=g.ph[phase].c;
    var c=list[Math.floor(Math.random()*list.length)];
    st.ph=phase;st.last=c[0];used.push(c[0]);st.used=used;st.day++;
    var tag='🏭 Industry-specific storyline · '+g.ic+' '+g.n+' · day '+(k+1)+' of '+N+' · '+['it begins','it escalates','at its peak','easing off'][phase];
    var ev={icon:g.ic,tag:tag,title:c[0],text:c[1]+(k===0?' <br><small>💼 <strong>Jobs:</strong> '+g.hit+' Check the Employment Office for today’s pay and openings.</small><br><small>📘 <strong>'+g.term.split(':')[0]+':</strong>'+g.term.slice(g.term.indexOf(':')+1)+'</small>':''),done:true,tone:'',fx:[],story:null};
    ev.fx=applyFx(c[2],true);ev.fx.push(indNowTxt());(S.nightFx||(S.nightFx=[])).push(c[2]);
    ev.tone=/h-/.test(c[2])?'bad':/h\+/.test(c[2])?'good':'';
    return ev;
  }
  /* one line for the card: what the current phase does to jobs */
  function indNowTxt(){
    return 'Jobs today: '+indOn().map(function(e){var a=[];if(e.pay)a.push('pay '+(e.pay>0?'▲':'▼')+Math.round(Math.abs(e.pay)*S.ind.sw*100)+'%');
      if(e.hire==='freeze')a.push('hiring freeze');if(e.hire==='open')a.push('hiring');if(e.cut)a.push(e.cut===1?'cuts':'closures');
      return e.lab+(a.length?' ('+a.join(', ')+')':'')}).join('; ');
  }
  /* overnight: a player whose own job is in a phase with cuts may be laid off (job gone) or suspended (workplace closed, job kept) */
  function indTick(){
    var jb=myJob();if(!jb||shutLeft(jb.b))return;
    var x=indRole(jb.c,S.career[jb.c]),L=CONFIG.industry,g=S.ind&&indOf(S.ind.id);if(!x||!x.cut||!g)return;
    if(x.cut===1&&Math.random()<L.layoffChance){delete S.career[jb.c];
      S.notes.push({l:'bad',t:'📉 '+g.n+': you were LAID OFF from your job as '+jb.rk.r+' at the '+NAME[jb.b]+'. The job is gone. Apply for a new one at the Employment Office.'});
      log('Laid off from '+jb.rk.r+' because of: '+g.n+' (industry-specific storyline).','bad');return}
    if(Math.random()<L.suspendChance){var D=L.suspendDays,nd=D[0]+Math.floor(Math.random()*(D[1]-D[0]+1));S.shut[jb.b]=nd;
      S.notes.push({l:'bad',t:'🔒 '+g.n+': the '+NAME[jb.b]+' has suspended work for '+nd+' day'+(nd>1?'s':'')+'. Your job as '+jb.rk.r+' stays on your record.'});
      log('The '+NAME[jb.b]+' is CLOSED for '+nd+' day'+(nd>1?'s':'')+' because of: '+g.n+'. Work is disabled, but your job stays on record.','bad')}
  }
  function sagaOf(id){var r=null;SAGAS.forEach(function(x){if(x.id===id)r=x});return r}
  /* the day the storyline starts: a random day from fromDay to (game length − daysBeforeEnd), see CONFIG.events.storyline */
  function sagaDay(){var L=CONFIG.events.storyline,a=L.fromDay,b=Math.max(a,gameLen()-L.daysBeforeEnd);return a+Math.floor(Math.random()*(b-a+1))}
  function sagaStart(){
    var sg=draw('deckG',SAGAS);if(sg.id===S.sagaLast)sg=draw('deckG',SAGAS);  /* a new deck can start with the one just played */
    var len=sg.len[0]+Math.floor(Math.random()*(sg.len[1]-sg.len[0]+1)),e=sg.eff;
    S.saga={id:sg.id,day:0,len:len,last:'',used:[]};S.sagaNext=0;
    S.trends.push(scaleTrend({n:sg.n,left:len,tot:len,p:e.p||0,w:e.w||0,r:e.r||0,mkt:e.mkt||0,ill:e.ill||1,lay:e.lay||0,cls:e.cls||0,term:sg.term,saga:sg.id,last:''}));
  }
  /* today's chapter of the running storyline (or null when none is running) */
  function sagaEvent(){
    var st=S.saga,sg=sagaOf(st.id);
    if(!sg){S.saga=null;S.sagaNext=0;return null}
    /* no chapter is shown twice in one storyline; if a phase runs out, only yesterday's is avoided */
    var k=st.day,N=st.len,phase=k===0?0:k>=N-1?3:k<Math.ceil(N*0.55)?1:2,used=st.used||[],list=sg.ph[phase].filter(function(c){return used.indexOf(c[0])<0});
    if(!list.length)list=sg.ph[phase].filter(function(c){return c[0]!==st.last});if(!list.length)list=sg.ph[phase];
    var c=list[Math.floor(Math.random()*list.length)],tr=null;
    S.trends.forEach(function(t){if(t.saga===sg.id)tr=t});
    var tag='🌐 Global storyline · '+sg.ic+' '+sg.n+' · day '+(k+1)+' of '+N+' · '+['the story begins','it escalates','at its peak','easing off'][phase];
    var ev={icon:sg.ic,tag:tag,title:c[0],text:c[1]+(k===0?' <br><small>📘 <strong>'+sg.term.split(':')[0]+':</strong>'+sg.term.slice(sg.term.indexOf(':')+1)+'</small>':''),done:true,tone:'',fx:[],story:null};
    if(c[3]){ev.choice=true;ev.done=false;ev.y=c[3];ev.n=c[4]}
    else{(S.nightFx||(S.nightFx=[])).push(c[2]);ev.fx=applyFx(c[2],true);ev.tone=/h\+|w\+|p-|r-/.test(c[2])&&!/h-|p\+|w-/.test(c[2])?'good':/h-|p\+|w-|e-/.test(c[2])?'bad':''}
    if(tr){tr.last=c[0];if(!ev.choice&&tr)ev.fx.push('Still going: '+trendNow(tr))}
    st.last=c[0];used.push(c[0]);st.used=used;st.day++;
    if(st.day>=N){S.saga=null;S.sagaLast=sg.id;S.sagaNext=0}  /* one storyline a game */
    return ev;
  }
  function macroEvent(){
    var m=draw('deckM',MACRO),days=CONFIG.events.macroDays[0]+Math.floor(Math.random()*(CONFIG.events.macroDays[1]-CONFIG.events.macroDays[0]+1)),e=m[5];
    var tr=scaleTrend({n:m[0],left:days,tot:days,p:e.p||0,w:e.w||0,r:e.r||0,mkt:(e.mkt||0)*CONFIG.macro.shockMarketScale,ill:e.ill||1,lay:e.lay||0,cls:e.cls||0,term:m[2],macro:1});
    S.trends.push(tr);
    var lost=/housing bubble/i.test(m[0])?bubbleHit():'';
    return {icon:'🌐',tag:'Major world event · '+days+' days',title:m[0],text:m[1]+' <br><small>📘 <strong>'+m[2].split(':')[0]+':</strong>'+m[2].slice(m[2].indexOf(':')+1)+'</small>',done:true,tone:(e.mkt||0)<0||(e.p||0)>1||e.lay||lost?'bad':'good',
      fx:['Lasts '+days+' days','Effects: '+trendNow(tr)].concat(lost?[lost]:[])};
  }
  /* a pandemic, outbreak or lockdown story makes illness CONFIG.illness.pandemicX as likely (once, however many are running) */
  function trendIll(){return S.trends.some(function(t){return t.left>0&&(t.ill||1)>1})?CONFIG.illness.pandemicX:1}
  /* ---------- multi-round stories ----------
    Each step has options; each option rolls one weighted outcome [weight, text, fx, nextStep?].
    The same choice can turn out differently. 'sk' boosts the first (best) outcome by a stat. */
  var TWISTS=[['Later, a friend thanks you for being sensible.','h+3'],['You spend the saved time reading something useful.','n+2'],['On the way home you find $10 on the ground.','c+10'],['Still, you can’t stop wondering what might have been.','h-3'],['The decision costs you a bit of sleep.','e-5'],['Someone buys you a coffee for no reason.','e+5 h+2'],
    ['Your mum calls just to say she is proud of you.','h+4'],['A stranger holds the lift door for you. Small things.','h+2'],['You catch the bus just as it pulls up.','e+3'],['A song you love comes on the radio.','h+3'],['You notice a hole in your sock. It bugs you all evening.','h-2'],
    ['You step in a puddle on the way home.','h-2 e-2'],['A street cat follows you halfway home.','h+3'],['You remember a useful tip from an old teacher.','n+1'],['Your neighbour shares a plate of curry puffs.','e+4 h+2'],['You forget your umbrella and get caught in a drizzle.','h-2'],
    ['A friend sends you a meme that makes you laugh out loud.','h+3'],['You overthink it on the MRT ride home.','h-2'],['The hawker gives you an extra-large portion.','e+5'],['You get a good night’s sleep for once.','e+5'],['You stub your toe on the doorframe.','h-2 l-1'],
    ['Your phone battery dies at the worst moment.','h-3'],['You find an old voucher in your wallet.','c+8'],['A coworker asks for your advice. You feel useful.','h+3'],['You spend the evening tidying your room. It feels great.','h+3 e-2'],['A mosquito keeps you up half the night.','e-4'],
    ['You learn a new word from a podcast.','n+1'],['A kid on the bus waves at you.','h+2'],['You treat yourself to a cold drink.','c-2 e+3 h+2'],['Your favourite show releases a new episode.','h+3']];
  var STORIES={
    stall:{ic:'🛒',t:'A friend’s street stall',s:{
      a:{x:'Your friend Ben wants to open a weekend food stall and asks you to chip in $100 for a share.',o:[
        {t:'Chip in $100',o:[[5,'Opening day is busy. Ben grins and asks if you want to expand.','c-100','b'],[3,'Sales are slow. Ben wonders whether to keep going.','c-100','c'],[2,'The stall is broken into on the first night. Your $100 is gone.','c-100 h-6']]},
        {t:'Politely decline',o:[[6,'Ben understands. No harm done.',''],[4,'Ben is a little hurt you did not trust him.','h-4']]}]},
      b:{x:'Ben wants another $150 to buy a second grill and hire help.',o:[
        {t:'Expand ($150)',o:[[5,'The second grill doubles the queue. Your share pays out handsomely.','c-150 c+500 h+10'],[3,'Costs eat the extra sales. You get a modest return.','c-150 c+200'],[2,'The health inspector shuts the stall for a week. You lose the extra money.','c-150 h-8']]},
        {t:'Cash out your share',o:[[6,'Ben buys you out at a nice profit.','c+180 h+5'],[4,'Ben can only pay you back what you put in.','c+100']]}]},
      c:{x:'The stall barely breaks even. Ben asks if you want to stay in or pull out.',o:[
        {t:'Stay in',o:[[4,'A food blogger finds the stall. Business takes off!','c+300 h+8'],[6,'Nothing changes and Ben closes it a month later. You get a little back.','c+40 h-3']]},
        {t:'Pull out',o:[[7,'Ben returns most of your money.','c+80'],[3,'Ben can only spare $30.','c+30 h-3']]}]}}},
    wallet:{ic:'👛',t:'A wallet on the pavement',s:{
      a:{x:'You find a wallet stuffed with $120 and an ID card.',o:[
        {t:'Hand it to the owner',o:[[5,'The owner is overjoyed and insists you take a reward.','c+40 h+8','b'],[5,'The owner thanks you warmly. You feel good about yourself.','h+10','b']]},
        {t:'Keep the cash',o:[[6,'You pocket the money. It doesn’t sit right with you.','c+120 h-8'],[4,'A security camera saw everything. You return it, embarrassed, and pay a fine.','c-50 h-12']]}]},
      b:{x:'The owner runs a small firm. “We need someone reliable. Want to come in for a chat?”',o:[
        {t:'Meet her for coffee',sk:'know',o:[[4,'She is impressed and pays you for a quick consulting job.','c+150 n+3 e-10'],[4,'Lovely chat, useful tips for your career.','n+4 e-10'],[2,'She ends up talking only about her cat.','e-10 h+2']]},
        {t:'Say you are busy',o:[[10,'She gives you her card in case you change your mind.','']]}]}}},
    crypto:{ic:'🪙',t:'A crypto tip',s:{
      a:{x:'A colleague swears a new coin is about to take off. Buy $80 worth?',o:[
        {t:'Buy $80',o:[[5,'Next morning it is up 60%.','c-80','b'],[5,'Next morning it has dropped 40%.','c-80','c']]},
        {t:'Stay away',o:[[7,'You keep your money.',''],[3,'You hear it went up. You try not to think about it.','h-3']]}]},
      b:{x:'Your coin is up 60% (worth about $128). Sell now or hold for more?',o:[
        {t:'Sell now',o:[[10,'You lock in the profit.','c+128 h+5']]},
        {t:'Hold',o:[[4,'It doubles again! You sell at the top.','c+250 h+10'],[6,'The coin crashes overnight. You salvage a little.','c+20 h-8']]}]},
      c:{x:'Your coin is down 40% (worth about $48). Sell and cut losses, or hold?',o:[
        {t:'Cut losses',o:[[10,'You sell for $48. Lesson learned.','c+48 h-3 n+2']]},
        {t:'Hold',o:[[3,'It recovers and then some.','c+140 h+6'],[7,'It slides to almost nothing.','c+5 h-6']]}]}}},
    hack:{ic:'💻',t:'Weekend hackathon',s:{
      a:{x:'A local hackathon is offering a $400 prize. Join a team?',o:[
        {t:'Join',sk:'know',o:[[6,'Your team clicks. It is time to pick roles.','e-15','b'],[4,'Your team argues all night and quits early.','e-15 h-5']]},
        {t:'Skip it',o:[[10,'You enjoy a quiet weekend.','e+5']]}]},
      b:{x:'Your team needs someone to pitch to the judges, and someone to fix a last-minute bug.',o:[
        {t:'Pitch on stage',sk:'happy',o:[[3,'The judges love it. First prize!','c+400 h+12 n+3'],[4,'Runner-up. A small prize and a lot of applause.','c+100 h+6 n+2'],[3,'You freeze on stage. Painful, but you learn.','h-6 n+3']]},
        {t:'Fix the bug',sk:'know',o:[[4,'You squash it with seconds to spare. The team wins!','c+400 n+5 h+8'],[6,'The fix works but the demo is shaky. No prize, lots learned.','n+5']]}]}}},
    poker:{ic:'🃏',t:'Poker night',s:{
      a:{x:'Friends invite you to a $40 poker night.',o:[
        {t:'Buy in for $40',o:[[5,'Late in the night you get a strong hand.','c-40','b'],[5,'Card after card goes against you. You get one last chance.','c-40','c']]},
        {t:'Just watch',o:[[10,'You enjoy the snacks and the banter.','h+4']]}]},
      b:{x:'You hold a strong hand. Raise $60 more, or play it safe?',o:[
        {t:'Raise $60',o:[[6,'They fold to your raise. Big pot!','c-60 c+220 h+8'],[4,'Someone had an even better hand.','c-60 h-6']]},
        {t:'Play it safe',o:[[7,'You win a small pot.','c+70 h+3'],[3,'You get out-played on the last card.','h-3']]}]},
      c:{x:'You are nearly out. Go all in with your last chips, or leave?',o:[
        {t:'All in',o:[[3,'A miracle card! You double up and leave ahead.','c+90 h+8'],[7,'Not tonight.','h-5']]},
        {t:'Walk away',o:[[10,'You keep some dignity.','h-1']]}]}}},
    overtime:{ic:'⏰',t:'Overtime request',s:{
      a:{x:'Your boss calls: they are short-staffed tonight. Work a late shift for extra pay?',o:[
        {t:'Accept',o:[[6,'You earn good money, but you are drained.','c+90 e-20','b'],[4,'The shift is chaotic. You earn a little and get yelled at.','c+50 e-25 h-6']]},
        {t:'Decline',o:[[7,'Your boss sighs but understands.',''],[3,'Your boss is annoyed with you.','h-5']]}]},
      b:{x:'Next morning your boss asks if you can do it again tonight.',o:[
        {t:'Do it again',o:[[5,'They notice your effort and give you a raise.','c+90 e-20 w+2'],[5,'You push through, exhausted.','c+90 e-30 h-5']]},
        {t:'Not tonight',o:[[10,'You rest. Your boss says thanks for last night.','e+5 h+3']]}]}}},
    course:{ic:'🎓',t:'An online course offer',s:{
      a:{x:'An ad offers a $60 “career accelerator” course. Sign up?',o:[
        {t:'Sign up ($60)',sk:'know',o:[[6,'The course is genuinely good. They offer an advanced module.','c-60 n+6','b'],[4,'It is a scam. The site disappears with your money.','c-60 h-8']]},
        {t:'Ignore it',o:[[10,'You scroll past.','']]}]},
      b:{x:'The advanced module costs $120 and includes a recognised certificate.',o:[
        {t:'Take it ($120)',o:[[7,'Hard work, but it pays off.','c-120 n+12 h+5'],[3,'Too advanced. You learn a bit and give up.','c-120 n+4 h-4']]},
        {t:'Stop here',o:[[10,'You are happy with what you learned.','h+2']]}]}}},
    talent:{ic:'🎤',t:'Talent show',s:{
      a:{x:'The community hall is holding a talent show with a $200 prize. Enter?',o:[
        {t:'Enter',sk:'happy',o:[[5,'The crowd cheers your first act. The host asks for an encore.','h+6','b'],[5,'Polite applause. Nobody remembers your name.','h-3']]},
        {t:'Watch from the audience',o:[[10,'A fun night out.','h+5']]}]},
      b:{x:'An encore could win it, or end in embarrassment.',o:[
        {t:'Do the encore',sk:'happy',o:[[5,'You win the $200 prize!','c+200 h+12'],[5,'You trip on stage. People laugh, though kindly.','h-6']]},
        {t:'Take a bow and leave',o:[[10,'Leave them wanting more. You win third place.','c+50 h+6']]}]}}},
    run:{ic:'🏃',t:'Charity fun run',s:{
      a:{x:'A charity 10K costs $20 to enter. Sign up?',o:[
        {t:'Sign up ($20)',o:[[10,'You line up at the start. How do you pace yourself?','c-20','b']]},
        {t:'Cheer from the side',o:[[10,'The atmosphere lifts your mood.','h+3']]}]},
      b:{x:'The gun goes off.',o:[
        {t:'Sprint from the start',sk:'energy',o:[[3,'You finish in the top ten and win a voucher.','c+60 h+10 e-20'],[7,'You burn out halfway and walk the rest.','e-25 h-2']]},
        {t:'Steady pace',o:[[8,'You finish strong and feel great.','h+10 e-12'],[2,'A cramp slows you down, but you finish.','h+4 e-15']]}]}}},
    garage:{ic:'🚗',t:'A garage sale',s:{
      a:{x:'Your neighbour is clearing out her late husband’s garage. “Take anything for $30 a box,” she says.',o:[
        {t:'Buy a box ($30)',o:[[4,'Under the old tools is a vintage camera in its case.','c-30','b'],[4,'Mostly rusty screws, but a decent toolkit too.','c-30 c+20 h+2'],[2,'A box of mouldy magazines. You recycle them.','c-30 h-2']]},
        {t:'Help her carry boxes instead',o:[[7,'She thanks you with a home-cooked lunch.','e-8 e+12 h+6'],[3,'Your back complains for the rest of the day.','e-14 h+3']]}]},
      b:{x:'A collector online offers $180 for the camera. Your gut says it might be worth more.',o:[
        {t:'Sell for $180',o:[[10,'Easy money. The collector is delighted.','c+180 h+5']]},
        {t:'Get it valued first',sk:'know',o:[[4,'The valuer says it is rare. You sell it for $420.','c+420 h+10 n+2'],[6,'It is worth $150. The collector has moved on, so you sell for that.','c+150 h-2']]}]}}},
    neighbourdog:{ic:'🐕',t:'The neighbour’s dog',s:{
      a:{x:'Your neighbour is in hospital for two days and asks if you can feed and walk her dog.',o:[
        {t:'Say yes',o:[[6,'The dog is a sweetheart and drags you on long walks.','e-8 h+6 l+2','b'],[4,'The dog eats your slipper on the first night.','e-8 h-2','b']]},
        {t:'Say you can’t',o:[[6,'She finds someone else. No hard feelings.',''],[4,'She looks hurt. The corridor feels awkward for a while.','h-4']]}]},
      b:{x:'Your neighbour is back and wants to pay you. She holds out $50.',o:[
        {t:'Take the money',o:[[10,'Fair pay for fair work.','c+50 h+2']]},
        {t:'Refuse politely',o:[[6,'She bakes you a cake instead and tells everyone how kind you are.','h+8 e+5'],[4,'She insists and leaves $30 under your door anyway.','c+30 h+6']]}]}}},
    phonescam:{ic:'📞',t:'A call from the “bank”',s:{
      a:{x:'A caller says he is from your bank. “There is suspicious activity. Please confirm your card number.”',o:[
        {t:'Hang up and call the bank',sk:'know',o:[[7,'The bank confirms it was a scam. They thank you for reporting it.','h+4 n+2'],[3,'You wait 40 minutes on hold just to hear it was a scam.','e-6 n+1']]},
        {t:'Ask him questions first',o:[[5,'He gets flustered and hangs up. You feel clever.','h+5','b'],[5,'He knows your name and address. Now you are worried.','h-4','b']]}]},
      b:{x:'He calls back, angrier. “Your account will be frozen in ten minutes unless you act now.”',o:[
        {t:'Block the number',o:[[10,'Silence. You change your banking password just in case.','h+3 n+1']]},
        {t:'Give him the last four digits',o:[[3,'You realise in time and cancel the card. A hassle, nothing lost.','e-8 h-5'],[7,'$60 disappears before the bank freezes the card.','c-60 h-10']]}]}}},
    rooftop:{ic:'🌇',t:'Rooftop garden club',s:{
      a:{x:'Residents are starting a rooftop vegetable garden. Join for $15 to cover seeds and soil?',o:[
        {t:'Join ($15)',o:[[6,'You get a plot next to a retired teacher who knows everything about chillies.','c-15 h+4','b'],[4,'Your seedlings get eaten by birds within a week.','c-15 h-3']]},
        {t:'Just visit sometimes',o:[[10,'You enjoy the view and the breeze.','h+3 e+3']]}]},
      b:{x:'Harvest day. Your plot has more kang kong and chilli than you can eat.',o:[
        {t:'Sell at the void-deck market',o:[[6,'Neighbours snap it up.','c+35 h+4'],[4,'You sell a little and give the rest away.','c+10 h+5']]},
        {t:'Cook a big dinner with it',o:[[10,'Fresh food, full belly, proud gardener.','e+12 h+8 l+3']]}]}}},
    moving:{ic:'📦',t:'Moving day for a friend',s:{
      a:{x:'Your friend Hui Min is moving flats this weekend and the movers cancelled. She begs you to help.',o:[
        {t:'Help all day',o:[[6,'It is hard work, but you laugh a lot.','e-18 h+6','b'],[4,'The lift breaks halfway through. Twelve floors of stairs.','e-25 h-2','b']]},
        {t:'Lend her $40 for a man-with-van',o:[[7,'She pays you back next week with a thank-you card.','h+3'],[3,'She forgets to pay you back.','c-40 h-3']]}]},
      b:{x:'At the new flat, Hui Min offers you her old TV and a pizza.',o:[
        {t:'Take the TV',o:[[6,'It works perfectly.','h+6 c+40'],[4,'It is ancient and you end up paying to dispose of it.','c-15 h-2']]},
        {t:'Just the pizza, thanks',o:[[10,'Best pizza you have ever had. You earned it.','e+10 h+5']]}]}}},
    flashmob:{ic:'💃',t:'Flash mob rehearsal',s:{
      a:{x:'A coworker is organising a flash mob for her sister’s proposal and needs dancers. Rehearsal is tonight.',o:[
        {t:'Join the rehearsal',sk:'happy',o:[[6,'You pick up the moves quickly. The group cheers you.','e-10 h+6','b'],[4,'You have two left feet, but everyone is kind about it.','e-10 h+2','b']]},
        {t:'Offer to film it instead',o:[[10,'You get the best angle. Everyone wants a copy.','h+5']]}]},
      b:{x:'The big moment arrives at the mall. You are in the front row.',o:[
        {t:'Dance your heart out',o:[[6,'She says yes! The video goes round the office.','h+12 e-6'],[4,'You trip but keep going. People think it was part of the routine.','h+6 e-6']]},
        {t:'Swap to the back row',o:[[10,'Safe and happy. She says yes.','h+6']]}]}}},
    secondhandbike:{ic:'🚲',t:'A bike in the classifieds',s:{
      a:{x:'Someone is selling a road bike for $90, “barely used”. It would save bus fares.',o:[
        {t:'Go and look',o:[[5,'It looks great and rides smoothly.','','b'],[5,'The seller seems nervous and the frame has scratches.','','c']]},
        {t:'Keep taking the bus',o:[[10,'Cheap and reliable.','']]}]},
      b:{x:'The seller will take $90 cash, or $80 if you collect it now.',o:[
        {t:'Pay $80 and ride it home',o:[[7,'It is a great bike. You start cycling everywhere.','c-80 c+30 h+6 l+2'],[3,'The gears slip on the way home. A $25 repair.','c-80 c-25 h-2']]},
        {t:'Think about it',o:[[10,'By evening it has sold. Oh well.','h-2']]}]},
      c:{x:'The scratches look like a lock was cut off. Is it stolen?',o:[
        {t:'Walk away',o:[[10,'Better safe than sorry.','h+2']]},
        {t:'Buy it cheap anyway ($50)',o:[[4,'Nothing happens. You have a bike.','c-50 h-2 c+30'],[6,'The owner spots it a week later. The police take it back.','c-50 h-10']]}]}}},
    hawkerauntie:{ic:'🍜',t:'The hawker auntie',s:{
      a:{x:'Your favourite hawker auntie looks exhausted. Her helper quit and the lunch queue is huge.',o:[
        {t:'Offer to help for an hour',o:[[6,'You take orders and clear trays. She is grateful.','e-10 h+6','b'],[4,'You mix up three orders. She laughs it off.','e-10 h+2','b']]},
        {t:'Just order and leave a tip',o:[[10,'She smiles and gives you an extra egg.','c-5 e+6 h+3']]}]},
      b:{x:'She offers you a weekend shift for $60 a day while she finds a new helper.',o:[
        {t:'Take the weekend work',o:[[7,'Long hours, great food, cash in hand.','c+60 e-16 h+4'],[3,'A heatwave makes it brutal. You earn every cent.','c+60 e-24']]},
        {t:'Decline kindly',o:[[10,'She understands and still saves you the extra egg.','h+2']]}]}}},
    lostcat:{ic:'🐈',t:'A lost cat poster',s:{
      a:{x:'A poster offers a $100 reward for a ginger cat. You think you saw it near the bin centre.',o:[
        {t:'Go and look tonight',o:[[5,'There it is, hiding under a car.','e-6','b'],[5,'Two hours of searching. No cat.','e-12 h-2']]},
        {t:'Text the owner the location',o:[[6,'The owner finds the cat and sends you $30 as thanks.','c+30 h+5'],[4,'The owner never replies.','']]}]},
      b:{x:'The cat hisses at you from under the car. It looks terrified.',o:[
        {t:'Coax it out with food ($5)',o:[[6,'It finally comes out. The owner cries with relief and pays the reward.','c-5 c+100 h+10'],[4,'It bolts. You call the owner, who catches it later and gives you $30.','c-5 c+30 h+3']]},
        {t:'Grab it',o:[[3,'Got it! Scratched arms, but $100 richer.','c+100 h+6 l-2'],[7,'It scratches you badly and runs off.','l-3 h-4']]}]}}},
    weddingspeech:{ic:'💍',t:'The wedding speech',s:{
      a:{x:'Your cousin asks you to give a speech at his wedding dinner next week.',o:[
        {t:'Say yes and prepare',sk:'know',o:[[6,'You write something funny and heartfelt.','e-6 n+1','b'],[4,'You stay up late rewriting it five times.','e-12','b']]},
        {t:'Politely say no',o:[[6,'He asks someone else. No drama.','h-1'],[4,'Your aunt tells everyone you refused. Awkward.','h-5']]}]},
      b:{x:'The banquet hall is packed. It is your turn to speak.',o:[
        {t:'Deliver it as written',sk:'happy',o:[[6,'People laugh and cry in the right places. Your cousin hugs you.','h+12'],[4,'You rush it, but it is sweet.','h+5']]},
        {t:'Improvise a joke',o:[[4,'The whole hall roars. A legend is born.','h+14'],[6,'The joke lands badly with the grandparents.','h-6']]}]}}},
    vendingmachine:{ic:'🥤',t:'The vending machine',s:{
      a:{x:'The vending machine at the MRT station swallowed your $5 note and gave nothing back.',o:[
        {t:'Call the number on the machine',o:[[5,'A cheerful operator promises a refund to your account.','e-3','b'],[5,'You are on hold for 20 minutes.','e-6','b']]},
        {t:'Give it a thump',o:[[3,'Two drinks fall out! Justice.','e+5 h+4'],[7,'Nothing. A station officer gives you a look.','h-4']]}]},
      b:{x:'The operator asks you to fill in an online form with a photo of the machine.',o:[
        {t:'Fill in the form',o:[[7,'The refund arrives a week later with a $5 voucher.','c+10 h+3'],[3,'The form crashes twice. You give up.','h-3']]},
        {t:'Forget it',o:[[10,'Life is too short for $5.','h-1']]}]}}},
    rainstorm:{ic:'⛈️',t:'Caught in the rain',s:{
      a:{x:'A sudden storm hits as you leave work. Taxis are surging and the bus queue is long.',o:[
        {t:'Wait it out in a café ($6)',o:[[6,'You read and sip coffee until it stops.','c-6 e+4 h+4 n+1'],[4,'It rains for three hours. You get home very late.','c-6 e-6']]},
        {t:'Run for the bus',o:[[5,'You make it, soaked but laughing.','h+2 e-4','b'],[5,'A passing car splashes you head to toe.','h-4 e-4 k-1','b']]}]},
      b:{x:'On the bus, a stranger offers you a spare umbrella for your walk home.',o:[
        {t:'Accept it',o:[[10,'You promise to pay it forward one day.','h+5']]},
        {t:'Say you are fine',o:[[10,'You walk home wet. A hot shower has never felt better.','e-3 h+1']]}]}}},
    marathonsponsor:{ic:'🎽',t:'Sponsor a colleague',s:{
      a:{x:'A colleague is running a marathon for a children’s hospital and asks for sponsors.',o:[
        {t:'Pledge $2 per km',o:[[7,'You feel good. Then you remember a marathon is 42 km.','h+4','b'],[3,'He drops out at km 10. You pay $20.','c-20 h+2']]},
        {t:'Give a flat $20',o:[[10,'He thanks you warmly.','c-20 h+5']]},
        {t:'Cheer him on instead',o:[[7,'You promise to be at the finish line.','h+2'],[3,'He looks a little disappointed.','h-2']]}]},
      b:{x:'He finished all 42 km! He shows you the medal and the bill: $84.',o:[
        {t:'Pay up proudly',o:[[10,'He tells the whole office you are generous.','c-84 h+8']]},
        {t:'Ask to pay half now, half later',o:[[6,'He agrees. You pay $84 over two weeks.','c-84 h+3'],[4,'He looks disappointed but agrees.','c-84 h-2']]},
        {t:'Admit you can’t afford it',o:[[6,'He laughs and says to buy him a kopi sometime.','h+2'],[4,'He says not to worry, but it stings.','h-5']]}]}}},
    phonerepair:{ic:'📱',t:'A cracked phone',s:{
      a:{x:'You drop your phone and the screen shatters. The official shop quotes $180.',o:[
        {t:'Pay the official shop ($180)',o:[[10,'Good as new, with a warranty.','c-180 h+3']]},
        {t:'Try the shop in the old mall',o:[[6,'The uncle says $60, done in an hour.','','b'],[4,'He says he needs to order the part.','','c']]}]},
      b:{x:'An hour later the uncle hands back your phone.',o:[
        {t:'Pay $60 and check it',o:[[7,'Works perfectly. Bargain.','c-60 h+5'],[3,'The touchscreen is a little off near the edges.','c-60 h-3']]},
        {t:'Leave it for now',o:[[10,'He keeps the phone until you can pay. A week of borrowed phones.','h-4']]}]},
      c:{x:'The uncle can get the part in two days for $50. Or a cheaper copy today for $35.',o:[
        {t:'Wait two days ($50)',o:[[8,'Original part, perfect fix.','c-50 h+3'],[2,'He gives you the wrong colour. You live with it.','c-50 h-2']]},
        {t:'Copy part today ($35)',o:[[5,'Fine for now.','c-35'],[5,'The colours look washed out. You regret it.','c-35 h-4']]},
        {t:'Live with the crack',o:[[10,'You squint at the screen for a while longer.','h-3']]}]}}},
    nightclass:{ic:'🌙',t:'Night class in accounting',s:{
      a:{x:'The community centre runs a four-week evening bookkeeping class for $45.',o:[
        {t:'Enrol ($45)',sk:'know',o:[[6,'The first lesson is clearer than you expected.','c-45 n+3 e-6','b'],[4,'The teacher drones on. You doze off.','c-45 n+1 e-6','b']]},
        {t:'Watch free videos instead',o:[[6,'You learn the basics.','n+2 e-4'],[4,'You end up watching cat videos.','h+3']]}]},
      b:{x:'The teacher offers you paid work: helping her sort receipts for a small shop.',o:[
        {t:'Take the job',o:[[7,'Tedious, but $70 and real experience.','c+70 n+3 e-10'],[3,'The receipts are a mess. You earn $70 the hard way.','c+70 n+2 e-16']]},
        {t:'Focus on the class',o:[[10,'You finish with a certificate of attendance.','n+3 h+3']]}]}}},
    concertticket:{ic:'🎫',t:'Concert tickets',s:{
      a:{x:'Tickets for your favourite band go on sale at 10am. They cost $120.',o:[
        {t:'Queue online at 10am',o:[[5,'You get two tickets!','c-120','b'],[5,'Sold out in four minutes.','h-5','c']]},
        {t:'Skip it',o:[[10,'You save your money and listen to the album instead.','h+2']]}]},
      b:{x:'Your best friend wants the second ticket but is broke until payday.',o:[
        {t:'Treat her',o:[[10,'An unforgettable night together.','h+15 e-10']]},
        {t:'Sell the spare online for $150',o:[[7,'Profit, and you still go to the concert.','c+150 h+8 e-8'],[3,'The buyer’s payment bounces. You go alone.','h+5 e-8']]}]},
      c:{x:'Resale sites have tickets for $260. Your friend says it is a once-in-a-lifetime show.',o:[
        {t:'Pay $260 for one',o:[[6,'Worth every cent.','c-260 h+14 e-8'],[4,'The ticket is fake. You are turned away at the gate.','c-260 h-12']]},
        {t:'Let it go',o:[[10,'You watch clips online the next day.','h-2']]}]}}},
    foodtruck:{ic:'🚚',t:'Food truck weekend',s:{
      a:{x:'A food truck at the festival is short of hands. The owner offers $80 for Saturday.',o:[
        {t:'Work Saturday',o:[[6,'The crowd loves the truck. You are busy all day.','e-14','b'],[4,'Rain keeps the crowds away. Quiet, easy day.','e-6 c+80']]},
        {t:'Visit as a customer',o:[[10,'Delicious tacos and live music.','c-12 e+8 h+6']]}]},
      b:{x:'At closing, the owner says the tips jar is full. “Split it, or take double pay to work Sunday too?”',o:[
        {t:'Split the tips',o:[[10,'$80 pay and $35 in tips.','c+115 h+4']]},
        {t:'Work Sunday too',o:[[6,'Another huge day. $240 in total.','c+240 e-18 h+3'],[4,'Sunday is dead. You take home $160 and sore feet.','c+160 e-14']]}]}}},
    kopiclub:{ic:'☕',t:'The kopitiam regulars',s:{
      a:{x:'The old uncles at the kopitiam invite you to join their morning chess game.',o:[
        {t:'Play a game',sk:'know',o:[[5,'You win! The uncles demand a rematch.','h+5 n+1','b'],[5,'You lose badly. They give you advice.','n+2 h+1','b']]},
        {t:'Just watch and chat',o:[[10,'You hear forty years of neighbourhood gossip.','h+4']]}]},
      b:{x:'One uncle says he used to run a hardware business and offers you some career advice over kopi.',o:[
        {t:'Listen and buy the kopi ($3)',o:[[7,'His advice is surprisingly sharp.','c-3 n+4 h+3'],[3,'He mostly complains about his son-in-law.','c-3 h+2']]},
        {t:'Say you need to go',o:[[10,'He waves you off with a grin.','']]}]}}},
    exam:{ic:'📝',t:'A friend’s exam notes',s:{
      a:{x:'A friend who just finished a finance diploma offers you her notes for $25.',o:[
        {t:'Buy the notes',sk:'know',o:[[6,'They are beautifully organised.','c-25 n+5'],[4,'Half of them are doodles.','c-25 n+2']]},
        {t:'Ask her to tutor you instead',o:[[6,'She agrees, for the price of dinner.','c-20 n+4 h+4','b'],[4,'She is too busy.','']]},
        {t:'Thank her and pass',o:[[10,'She says the offer stands.','']]}]},
      b:{x:'The tutoring goes well. She says her company is hiring interns and could refer you.',o:[
        {t:'Ask for the referral',o:[[4,'The firm pays you $120 for a week of weekend data entry.','c+120 n+3 e-14'],[6,'They have nothing right now, but you are on the list.','h+2']]},
        {t:'Just keep studying',o:[[10,'Your understanding grows.','n+3']]}]}}},
    giveaway:{ic:'🎁',t:'An online giveaway',s:{
      a:{x:'A message says you won a giveaway: a new tablet. You just need to pay $15 shipping.',o:[
        {t:'Pay the $15',o:[[2,'Somehow it is real! A tablet arrives.','c-15 h+10'],[8,'Nothing ever arrives.','c-15 h-6']]},
        {t:'Check if it is real',sk:'know',o:[[7,'The page is a known scam. You report it.','h+3 n+1'],[3,'You cannot tell, so you leave it.','']]}]}}},
    picnic:{ic:'🧺',t:'A park picnic',s:{
      a:{x:'Friends are planning a picnic at the reservoir on Sunday. Bring something to share?',o:[
        {t:'Bring homemade food ($15)',o:[[6,'Your dish is the first to disappear.','c-15 h+8 e-4','b'],[4,'It is a bit bland, but everyone is polite.','c-15 h+3 e-4','b']]},
        {t:'Buy snacks on the way ($10)',o:[[10,'Nobody minds. It is a lovely day.','c-10 h+5','b']]},
        {t:'Bring yourself and a smile',o:[[7,'Your friends have plenty to share.','e+5 h+4','b'],[3,'You feel a bit bad turning up empty-handed.','h+1','b']]}]},
      b:{x:'The sky darkens and thunder rolls. Everyone looks at the clouds.',o:[
        {t:'Pack up and run',o:[[7,'You make it to the shelter just in time.','h+3'],[3,'Everyone gets soaked, which somehow makes it more fun.','h+5 e-4']]},
        {t:'Stay and see',o:[[4,'The storm passes by. Sunset over the water.','h+10'],[6,'The downpour ruins the food.','h-5']]}]}}},
    carpool:{ic:'🚙',t:'The carpool group',s:{
      a:{x:'A coworker drives past your block and offers a carpool for $5 a day.',o:[
        {t:'Join the carpool',o:[[6,'Faster than the bus and good chats.','c-5 e+4 h+3','b'],[4,'He sings along to the radio. Loudly.','c-5 e+4 h-2','b']]},
        {t:'Keep commuting alone',o:[[10,'You stick with your podcast and the MRT.','n+1']]}]},
      b:{x:'He asks if you could drive his car one week while he is on leave, and pick up two others.',o:[
        {t:'Agree',o:[[7,'The others pay you $40 for the week.','c+40 e-6 h+3'],[3,'You scrape a pillar in the carpark. $60 repair.','c-60 h-6']]},
        {t:'Decline',o:[[10,'You go back to the MRT for a week.','']]}]}}},
    staircase:{ic:'🪜',t:'Stair challenge',s:{
      a:{x:'Your block is running a stair-climb challenge for charity: 25 floors, $10 entry.',o:[
        {t:'Enter ($10)',o:[[6,'You reach the top. Lungs burning, but proud.','c-10 e-12 h+6 l+2','b'],[4,'You stop at floor 14 and take the lift.','c-10 e-8 h-1']]},
        {t:'Cheer from the bottom',o:[[10,'You hand out water and clap everyone home.','h+4']]}]},
      b:{x:'Your time is the third fastest. The organiser invites you to the final round.',o:[
        {t:'Go for it',o:[[4,'You win a $100 sports voucher!','c+100 h+10 e-15 l+2'],[6,'You come fourth. Still a personal best.','h+5 e-15 l+2']]},
        {t:'Quit while ahead',o:[[10,'You keep your bronze-level pride.','h+3']]}]}}},
    tuition:{ic:'📚',t:'Tutoring a neighbour’s kid',s:{
      a:{x:'Your neighbour asks if you can tutor her son in maths twice a week for $25 a session.',o:[
        {t:'Give it a try',sk:'know',o:[[6,'He is bright and just needed someone patient.','c+25 e-6 n+1','b'],[4,'He spends the hour on his phone.','c+25 e-8 h-2','b']]},
        {t:'Decline',o:[[10,'You recommend a friend instead.','']]}]},
      b:{x:'His test results come back.',o:[
        {t:'Ask how he did',o:[[6,'Up two grades! His mum gives you a $40 bonus.','c+40 h+10'],[4,'Only a small improvement, but he is more confident.','h+4']]}]}}},
    secretsanta:{ic:'🎅',t:'Office gift exchange',s:{
      a:{x:'The office is doing a gift exchange with a $20 limit. You drew your boss.',o:[
        {t:'Buy something thoughtful ($20)',sk:'know',o:[[6,'She loves it and mentions it in the team meeting.','c-20 h+6','b'],[4,'She smiles politely. It is fine.','c-20 h+1']]},
        {t:'Grab a gift card ($20)',o:[[10,'Safe and forgettable.','c-20']]},
        {t:'Write her a thank-you card',o:[[6,'She pins it on her board.','h+4','b'],[4,'She thanks you, a little puzzled.','h+1']]}]},
      b:{x:'Your boss stops by your desk. “You clearly pay attention. Want to lead the next small project?”',o:[
        {t:'Accept',o:[[6,'Extra work, but a small pay bump comes with it.','w+1 e-6 h+4'],[4,'It is stressful, but you learn a lot.','n+4 e-10']]},
        {t:'Say you are at capacity',o:[[10,'She understands and remembers you for later.','h+1']]}]}}},
    cooking:{ic:'🍳',t:'A cooking class',s:{
      a:{x:'A community centre offers a Saturday cooking class: local dishes on a budget, $30.',o:[
        {t:'Sign up ($30)',o:[[6,'You learn to make a mean chicken rice.','c-30 n+2 h+5','b'],[4,'You burn the rice. The instructor is kind.','c-30 n+1 h+1','b']]},
        {t:'Watch a cooking video',o:[[10,'You try one recipe. Edible.','h+2']]}]},
      b:{x:'You invite friends over to show off your new skills.',o:[
        {t:'Cook for everyone ($25 ingredients)',o:[[7,'They ask for the recipe and bring dessert next time.','c-25 h+10 e+8'],[3,'Too much salt. Everyone drinks a lot of water.','c-25 h+2']]},
        {t:'Cook just for yourself',o:[[10,'Cheap, tasty meals for days.','e+10 l+2']]}]}}},
    mrtlost:{ic:'🚇',t:'A tourist asks for help',s:{
      a:{x:'A lost tourist family at the MRT station asks how to reach the Botanic Gardens.',o:[
        {t:'Walk them to the right platform',o:[[7,'They are so grateful they invite you for a coffee.','e-4 h+6','b'],[3,'You miss your own train.','e-6 h+3']]},
        {t:'Point at the map',o:[[10,'They thank you and head off.','h+1']]}]},
      b:{x:'Over coffee, the father says he runs a travel blog and needs a local guide for one day.',o:[
        {t:'Offer to guide them ($100)',o:[[6,'A long, fun day. He features you in his blog.','c+100 e-15 h+8'],[4,'Long and tiring, but they pay well.','c+100 e-20']]},
        {t:'Say goodbye',o:[[10,'They post a thank-you photo with you.','h+3']]}]}}},
    plantshop:{ic:'🪴',t:'The plant swap',s:{
      a:{x:'A neighbour is hosting a plant swap. Bring a cutting, take a cutting.',o:[
        {t:'Bring your money plant',o:[[6,'You trade it for a rare variegated monstera.','h+5','b'],[4,'You go home with a cactus that pricks you.','h+1 l-1']]},
        {t:'Just browse',o:[[10,'You learn a lot about watering.','n+1 h+2']]}]},
      b:{x:'A collector online offers $90 for your monstera cutting.',o:[
        {t:'Sell it',o:[[10,'Plant money!','c+90 h+4']]},
        {t:'Keep it and grow it',o:[[6,'It thrives. Your flat feels greener.','h+6'],[4,'It wilts after a week. Oh no.','h-4']]}]}}},
    blooddonation:{ic:'🩸',t:'Blood donation drive',s:{
      a:{x:'There is a blood donation drive at the community club today.',o:[
        {t:'Donate',o:[[8,'Quick and painless. You get juice and biscuits.','e-8 h+8'],[2,'You feel faint afterwards and need to lie down.','e-15 h+4']]},
        {t:'Help at the registration desk',o:[[10,'You meet lots of friendly people.','e-4 h+5']]}]}}},
    karaokecomp:{ic:'🎙️',t:'Karaoke contest',s:{
      a:{x:'The neighbourhood karaoke bar is holding a contest. $10 to enter, $150 prize.',o:[
        {t:'Enter ($10)',sk:'happy',o:[[5,'Your first song gets the crowd singing along.','c-10 h+4','b'],[5,'Your voice cracks on the high note.','c-10 h-4']]},
        {t:'Cheer for your friends',o:[[10,'A loud, happy night.','h+5 e-4']]}]},
      b:{x:'You are in the final against a retired opera singer.',o:[
        {t:'Sing a power ballad',o:[[3,'You win the $150! Standing ovation.','c+150 h+12'],[7,'She wins, but you get the loudest cheers.','h+7']]},
        {t:'Sing a funny song',o:[[5,'The judges give you a special comedy prize of $50.','c+50 h+9'],[5,'Not quite your night.','h+2']]}]}}},
    insurance:{ic:'📄',t:'An insurance agent',s:{
      a:{x:'An old schoolmate, now an insurance agent, wants to “catch up” over lunch.',o:[
        {t:'Meet for lunch',o:[[5,'It is a sales pitch, but she pays for lunch.','e+8','b'],[5,'Genuinely nice catch-up. No pitch.','e+8 h+5']]},
        {t:'Say you are busy',o:[[10,'She sends you a brochure anyway.','']]}]},
      b:{x:'She offers a $30-a-month accident plan with a free first month.',o:[
        {t:'Take the free month',o:[[6,'You cancel before it renews. Free lunch, no cost.','h+2'],[4,'You forget to cancel. $30 is charged.','c-30 h-3']]},
        {t:'Say no firmly',o:[[10,'She takes it well.','']]}]}}},
    sneakerdrop:{ic:'👟',t:'A sneaker release',s:{
      a:{x:'Limited sneakers drop online this morning for $140. Resellers sell them for double.',o:[
        {t:'Try to buy a pair',o:[[4,'You get them!','c-140','b'],[6,'Sold out in seconds.','h-3']]},
        {t:'Ignore the hype',o:[[10,'Your old shoes still work.','']]}]},
      b:{x:'You have the sneakers. Keep them or resell?',o:[
        {t:'Resell for $260',o:[[7,'Sold within an hour.','c+260 h+4'],[3,'The buyer claims they are fake and wants a refund.','c+140 h-6']]},
        {t:'Wear them',o:[[10,'You feel a foot taller.','h+10']]}]}}},
    stray:{ic:'🐾',t:'A stray kitten',s:{
      a:{x:'A tiny kitten is crying in the drain outside your block.',o:[
        {t:'Rescue it',o:[[7,'You lift it out. It purrs in your hands.','h+6 e-4','b'],[3,'It scratches you, but you get it out.','h+3 l-1','b']]},
        {t:'Call the animal welfare group',o:[[10,'A volunteer comes to collect it.','h+3']]}]},
      b:{x:'The vet says the kitten is healthy. A check-up costs $40.',o:[
        {t:'Pay and adopt it',o:[[8,'Your flat has a new boss.','c-40 h+12'],[2,'It turns out to be very hungry and very loud.','c-40 h+6 e-6']]},
        {t:'Find it a home',o:[[7,'A family from the next block adopts it.','h+6'],[3,'It takes a week of posting online.','h+3 e-6']]}]}}},
    phonelost:{ic:'📵',t:'Lost phone',s:{
      a:{x:'You leave your phone on the bus. Panic.',o:[
        {t:'Call the bus company',o:[[6,'Someone handed it in.','e-4','b'],[4,'Nobody has seen it.','h-4','c']]},
        {t:'Track it with a friend’s phone',sk:'know',o:[[5,'It is at a coffee shop two stops away.','e-4','b'],[5,'The battery is dead. No signal.','h-3','c']]}]},
      b:{x:'You collect your phone. The finder left a note: “Glad to help!”',o:[
        {t:'Leave a $10 thank-you',o:[[10,'Kindness returned.','c-10 h+6']]},
        {t:'Just smile',o:[[10,'Faith in humanity restored.','h+4']]}]},
      c:{x:'Still no phone. A new one costs a lot.',o:[
        {t:'Buy a cheap phone ($80)',o:[[10,'It works. Lesson learned.','c-80 h-2']]},
        {t:'Wait a few days',o:[[4,'Lost property calls: it was found!','h+6'],[6,'It never turns up.','h-6']]}]}}},
    volunteerclean:{ic:'🧹',t:'Beach clean-up',s:{
      a:{x:'A group is cleaning up the beach this Sunday morning. Join them?',o:[
        {t:'Join',o:[[7,'Hard work in the sun, but very satisfying.','e-10 h+8 l+1'],[3,'You get badly sunburnt.','e-10 h+3 l-2']]},
        {t:'Donate $10 for gloves and bags',o:[[10,'The organisers send you a photo of the clean beach.','c-10 h+4']]}]}}},
    homeoffice:{ic:'💻',t:'Working from a café',s:{
      a:{x:'Your internet at home is down for the day.',o:[
        {t:'Work from a café ($8)',o:[[6,'Great coffee and you get a lot done.','c-8 n+2 h+3'],[4,'The Wi-Fi is slow and the music loud.','c-8 h-2']]},
        {t:'Go to the library',o:[[7,'Quiet and free. Very productive.','n+3'],[3,'It is full. You end up in the stairwell.','h-3']]}]}}},
    weekendmarket:{ic:'🧶',t:'Selling crafts',s:{
      a:{x:'You have been making keychains as a hobby. A weekend market has stalls for $25.',o:[
        {t:'Rent a stall ($25)',o:[[6,'People love them. You sell out by noon.','c-25 c+90 h+8'],[4,'Slow day. You sell a few to friends.','c-25 c+20 h+2']]},
        {t:'Sell online',o:[[5,'A few orders trickle in.','c+30 h+3'],[5,'Nobody sees the listing.','h-2']]}]}}},
    seminar:{ic:'🎤',t:'Free money seminar',s:{
      a:{x:'A flyer advertises a free seminar on “getting rich in property”.',o:[
        {t:'Go and listen',o:[[5,'Some useful tips. Then the hard sell starts.','n+2','b'],[5,'Two hours of hype. You leave early.','e-6 h-2']]},
        {t:'Skip it',o:[[10,'You read a library book on investing instead.','n+2']]}]},
      b:{x:'They offer a “one-day-only” course for $300.',o:[
        {t:'Sign up',o:[[2,'Some of it is useful, sort of.','c-300 n+4 h-3'],[8,'It is mostly fluff. You feel cheated.','c-300 h-10']]},
        {t:'Walk out',o:[[10,'You feel very wise.','h+4']]}]}}},
    buskers:{ic:'🎸',t:'Busking for fun',s:{
      a:{x:'A friend who plays guitar wants you to busk with him at the MRT for an evening.',o:[
        {t:'Join him',sk:'happy',o:[[6,'People stop and sing along.','e-8 h+6','b'],[4,'Nobody stops. You laugh about it.','e-8 h+2']]},
        {t:'Watch and record a video',o:[[10,'His video gets a few hundred views.','h+3']]}]},
      b:{x:'At the end of the night you count the guitar case.',o:[
        {t:'Split the money',o:[[6,'$60 each!','c+60 h+6'],[4,'$15 each and a bag of sweets.','c+15 h+3']]},
        {t:'Give it all to him',o:[[10,'He promises to buy dinner next time.','h+5']]}]}}},
    birthday:{ic:'🎂',t:'A surprise party',s:{
      a:{x:'Your flatmate’s birthday is tomorrow. Everyone else forgot.',o:[
        {t:'Throw a small party ($40)',o:[[7,'She is speechless. Best birthday ever, she says.','c-40 h+10 e-6'],[3,'She wanted a quiet night. Awkward but sweet.','c-40 h+3']]},
        {t:'Buy a cake ($15)',o:[[10,'Simple and appreciated.','c-15 h+6']]},
        {t:'Make her breakfast',o:[[8,'She is touched you remembered.','e-3 h+6'],[2,'You burn the toast. She laughs anyway.','h+3']]}]}}},
    taxi:{ic:'🚕',t:'Late night ride',s:{
      a:{x:'It is past midnight and the last train has gone.',o:[
        {t:'Take a taxi ($25)',o:[[10,'Home safe, and asleep in no time.','c-25 e+3']]},
        {t:'Walk home (45 minutes)',o:[[6,'A quiet, oddly peaceful walk.','e-8 h+2'],[4,'Rain starts halfway.','e-10 h-3']]}]}}},
    neighbournoise:{ic:'🔊',t:'Noisy neighbours',s:{
      a:{x:'The flat upstairs has been renovating every morning at 8am for a week.',o:[
        {t:'Talk to them politely',o:[[6,'They apologise and give you a box of pineapple tarts.','h+5 e+3','b'],[4,'They shrug and say the contractor sets the hours.','h-3','b']]},
        {t:'Buy earplugs ($5)',o:[[10,'Bliss.','c-5 e+4']]}]},
      b:{x:'The noise continues. You could complain to the town council.',o:[
        {t:'File a complaint',o:[[6,'The council reminds them of the rules. Quieter now.','h+4'],[4,'Nothing changes for days.','h-3 e-4']]},
        {t:'Wait it out',o:[[10,'They finish two days later.','e-4']]}]}}},
    secondjob:{ic:'🛵',t:'A delivery side gig',s:{
      a:{x:'A delivery app is offering $40 sign-up bonuses for new riders this week.',o:[
        {t:'Sign up and do a few runs',o:[[6,'You earn the bonus and $30 in tips.','c+70 e-14 h+2'],[4,'Rain all evening. You earn the bonus and nothing else.','c+40 e-16 h-3']]},
        {t:'Not interested',o:[[10,'You keep your evenings free.','e+3']]}]}}},
    museum:{ic:'🏛️',t:'Free museum day',s:{
      a:{x:'The national museum is free this weekend.',o:[
        {t:'Spend the afternoon there',o:[[8,'Fascinating. You learn a lot of history.','n+3 h+5 e-4'],[2,'Packed with school groups.','n+1 e-6']]},
        {t:'Stay home and rest',o:[[10,'You catch up on sleep.','e+8']]}]}}},
    phoneplan:{ic:'📶',t:'A phone plan offer',s:{
      a:{x:'Your phone company calls with a “loyalty upgrade”: more data for $5 less a month.',o:[
        {t:'Accept',o:[[6,'It really is cheaper.','c+20 h+3'],[4,'The fine print adds a $30 admin fee.','c-30 h-4']]},
        {t:'Ask for it in writing',sk:'know',o:[[7,'The written offer is genuine. You save $20.','c+20 h+4 n+1'],[3,'They never send it.','']]}]}}},
    dinnerbill:{ic:'🧾',t:'Splitting the bill',s:{
      a:{x:'At a group dinner, someone suggests splitting the $240 bill evenly. You only had noodles.',o:[
        {t:'Pay your even share ($40)',o:[[7,'Keeps the peace. Friends notice and treat you next time.','c-40 h+3'],[3,'You stew about it all the way home.','c-40 h-4']]},
        {t:'Ask to pay for what you ate ($15)',o:[[6,'Everyone agrees. No problem.','c-15 h+2'],[4,'One friend rolls her eyes.','c-15 h-3']]},
        {t:'Admit you are short this week',o:[[6,'A friend covers you. You owe her one.','h-1'],[4,'It is embarrassing, but nobody minds much.','h-4']]}]}}},
    reunion:{ic:'🏫',t:'School reunion',s:{
      a:{x:'Your secondary school class is holding a ten-year reunion. Tickets are $45.',o:[
        {t:'Go ($45)',o:[[6,'Old friends, old jokes. A wonderful night.','c-45 h+10 e-6','b'],[4,'Everyone talks about their promotions.','c-45 h-4 e-6','b']]},
        {t:'Skip it',o:[[7,'You see the photos online. Looks fun.','h-1'],[3,'You feel a pang of regret.','h-4']]}]},
      b:{x:'An old classmate now runs a recruitment firm and asks what you do these days.',o:[
        {t:'Ask about job openings',o:[[4,'She sends you a lead for a well-paid temp job.','c+80 n+1 e-10'],[6,'Nothing right now, but you swap numbers.','h+2']]},
        {t:'Keep it social',o:[[10,'You reminisce about your old teachers.','h+4']]}]}}},
    gymtrial:{ic:'🏋️',t:'Free gym trial',s:{
      a:{x:'A new gym offers a free one-week trial.',o:[
        {t:'Try it',o:[[6,'You go four times and feel great.','e-10 l+4 h+4','b'],[4,'You go once and ache for three days.','e-12 l+1','b']]},
        {t:'Not now',o:[[10,'You go for a walk instead.','l+1 h+1']]}]},
      b:{x:'At the end of the week, the manager offers a membership at 40% off: $35 a month.',o:[
        {t:'Sign up',o:[[5,'You keep going. Strong and happy.','c-35 l+5 h+5'],[5,'You stop going after two weeks.','c-35 h-3']]},
        {t:'Decline',o:[[10,'You keep the habit with free park workouts.','l+2']]}]}}},
    usedsofa:{ic:'🛋️',t:'A free sofa',s:{
      a:{x:'Someone downstairs is giving away a big leather sofa. Free if you can move it.',o:[
        {t:'Move it with a friend',o:[[6,'It fits perfectly. Your flat feels luxurious.','e-14 h+8'],[4,'It does not fit through the door. You leave it at the lift.','e-14 h-5']]},
        {t:'Pay movers ($40)',o:[[8,'Effortless. The sofa is lovely.','c-40 h+8'],[2,'The movers scratch your door frame.','c-40 h+3']]}]}}},
    eldersit:{ic:'👵',t:'Your grandmother’s visit',s:{
      a:{x:'Your grandmother is visiting for the day and wants to go to the temple and the market.',o:[
        {t:'Spend the whole day with her',o:[[8,'She tells stories you have never heard before.','e-10 h+10'],[2,'She walks faster than you. Exhausting.','e-16 h+6']]},
        {t:'Just have lunch together',o:[[10,'She slips you $20 “for food”.','c+20 h+6']]}]}}},
    applause:{ic:'🎭',t:'Community theatre',s:{
      a:{x:'The community theatre needs one more actor for a small role. Rehearsals are in the evenings.',o:[
        {t:'Audition',sk:'happy',o:[[6,'You get the part!','e-6 h+5','b'],[4,'They give you the role of “Tree #2”.','e-6 h+2','b']]},
        {t:'Help backstage',o:[[10,'You learn how stage lights work.','n+1 h+3 e-4']]}]},
      b:{x:'Opening night. The hall is full.',o:[
        {t:'Go on stage',o:[[7,'A standing ovation. You are hooked.','h+12 e-8'],[3,'You forget a line, but cover it with a joke.','h+5 e-8']]}]}}},
    skillsfund:{ic:'🧾',t:'Training credits',s:{
      a:{x:'A letter reminds you that you have $100 of government training credits about to expire.',o:[
        {t:'Use them on a course',o:[[7,'You pick a short data course. Useful.','n+5 e-8'],[3,'The course is full of jargon.','n+2 e-8']]},
        {t:'Ignore it',o:[[10,'The credits expire.','h-2']]}]}}},
    returnbottle:{ic:'♻️',t:'Recycling drive',s:{
      a:{x:'The town council will pay 10 cents for every can returned this month.',o:[
        {t:'Collect cans from the block',o:[[6,'Neighbours help. You raise $25.','c+25 e-8 h+3'],[4,'Only $8 worth. But the void deck is cleaner.','c+8 e-8 h+2']]},
        {t:'Return only your own',o:[[10,'A few dollars, done.','c+3']]}]}}},
    techsupport:{ic:'🖥️',t:'Fixing a neighbour’s computer',s:{
      a:{x:'The old man next door says his computer is “broken” and asks if you know about these things.',o:[
        {t:'Take a look',sk:'know',o:[[6,'It was just unplugged. He thinks you are a genius.','h+6','b'],[4,'It is full of viruses. This will take a while.','e-10 n+2','b']]},
        {t:'Recommend a repair shop',o:[[10,'He thanks you and pays the shop.','']]}]},
      b:{x:'He insists on paying and offers $30.',o:[
        {t:'Accept',o:[[10,'Nice pocket money.','c+30 h+2']]},
        {t:'Ask for a cup of tea instead',o:[[10,'He tells you about his days as a sailor.','h+6 n+1']]}]}}},
    breakfastclub:{ic:'🥐',t:'Breakfast run',s:{
      a:{x:'Your team asks you to pick up breakfast for everyone. You pay first, they pay you back.',o:[
        {t:'Do the run ($45)',o:[[6,'Everyone pays you back by lunch.','e-4 h+3'],[4,'Two people “forget” to pay.','c-12 h-3']]},
        {t:'Say you are running late',o:[[10,'Someone else goes.','']]}]}}},
    photography:{ic:'📷',t:'Photography gig',s:{
      a:{x:'A friend getting married cannot afford a photographer. You are good with a camera.',o:[
        {t:'Offer to shoot it for free',o:[[6,'The photos are stunning. Her guests ask for your number.','e-14 h+8','b'],[4,'You miss the ring exchange. Mostly good shots.','e-14 h+2']]},
        {t:'Offer at a friend price ($150)',o:[[8,'She is happy to pay. A long, fun day.','c+150 e-16 h+4'],[2,'She thought it would be free. Things get awkward.','c+150 h-6']]}]},
      b:{x:'Two guests want you to photograph their family events.',o:[
        {t:'Take both bookings',o:[[7,'$240 for two weekends of work.','c+240 e-18 h+4'],[3,'One cancels. Still $120.','c+120 e-10']]},
        {t:'Turn them down',o:[[10,'You keep it a hobby.','h+2']]}]}}},
    shoplift:{ic:'🛒',t:'Unpaid item',s:{
      a:{x:'At home you notice the supermarket did not charge you for a $12 bottle of olive oil.',o:[
        {t:'Go back and pay',o:[[7,'The cashier is touched. She gives you a discount voucher.','c-12 c+5 h+5'],[3,'Nobody seems to care, but you feel honest.','c-12 h+3']]},
        {t:'Keep it',o:[[7,'Free olive oil.','h-2'],[3,'You feel guilty every time you cook.','h-5']]}]}}},
    rainydaygame:{ic:'🎲',t:'Board game café',s:{
      a:{x:'Friends invite you to a board game café. $12 for unlimited games.',o:[
        {t:'Go ($12)',o:[[7,'Hours of laughter and snacks.','c-12 h+8 e-3','b'],[3,'One friend is a sore loser.','c-12 h+2 e-3','b']]},
        {t:'Stay home',o:[[10,'A quiet night in.','e+5']]}]},
      b:{x:'The café owner says they are hiring a weekend games host for $70 a day.',o:[
        {t:'Ask for a trial',o:[[6,'You love it. Paid to play games!','c+70 e-10 h+6'],[4,'Explaining rules to tourists for eight hours is harder than it looks.','c+70 e-16']]},
        {t:'Just enjoy the games',o:[[10,'Your friends crown you champion.','h+4']]}]}}},
    newspaper:{ic:'📰',t:'Letter to the editor',s:{
      a:{x:'You are annoyed about the broken lights at the bus stop. Write to the newspaper?',o:[
        {t:'Write a letter',sk:'know',o:[[5,'It gets printed! The lights are fixed in a week.','h+8 n+1'],[5,'It is not printed, but the council fixes them anyway.','h+4']]},
        {t:'Complain online',o:[[6,'Lots of likes, no change.','h+1'],[4,'An argument breaks out in the comments.','h-4']]}]}}},
    ticketfine:{ic:'🚏',t:'A transport fine',s:{
      a:{x:'An inspector says your card did not tap in. The fine is $50.',o:[
        {t:'Pay the fine',o:[[10,'Annoying, but done.','c-50 h-4']]},
        {t:'Appeal politely',sk:'know',o:[[5,'You show your card history. Fine cancelled.','h+5 e-4'],[5,'The appeal is rejected. $50 plus an hour of forms.','c-50 e-6 h-6']]},
        {t:'Ask to pay it later',o:[[10,'The inspector gives you a slip. It will come out of next month’s budget.','h-3']]}]}}},
    langclass:{ic:'🗣️',t:'Learning a language',s:{
      a:{x:'A free app challenge: practise Mandarin 30 minutes a day for a week.',o:[
        {t:'Take the challenge',sk:'know',o:[[6,'You can order food in Mandarin now.','n+4 h+4','b'],[4,'You quit on day three.','n+1']]},
        {t:'Maybe later',o:[[10,'The app sends you a sad owl notification.','']]}]},
      b:{x:'A language exchange group meets on Thursday nights.',o:[
        {t:'Join the group',o:[[7,'New friends and real conversations.','n+3 h+6 e-4'],[3,'Everyone speaks too fast.','n+1 e-4']]},
        {t:'Keep using the app',o:[[10,'Slow, steady progress.','n+2']]}]}}},
    kidsparty:{ic:'🎈',t:'Party entertainer',s:{
      a:{x:'A parent at the playground asks if you can be the clown at her son’s party. $80.',o:[
        {t:'Say yes',sk:'happy',o:[[6,'The kids love you. Balloons everywhere.','c+80 e-12 h+8'],[4,'The costume is hot and the kids are wild.','c+80 e-18']]},
        {t:'Say no',o:[[10,'You recommend a friend who juggles.','']]}]}}},
    bankfee:{ic:'🏦',t:'A mystery bank fee',s:{
      a:{x:'Your bank statement shows an $18 “service fee” you do not understand.',o:[
        {t:'Call the bank',o:[[6,'They waive it as a goodwill gesture.','b+18 h+4 e-3'],[4,'They explain it is for low balances. It stays.','e-3 h-3']]},
        {t:'Let it go',o:[[10,'$18 gone.','b-18 h-2']]}]}}},
    flatmatebill:{ic:'💡',t:'The electricity bill',s:{
      a:{x:'The electricity bill is double the usual. Your flatmate runs the air-con all night.',o:[
        {t:'Talk to her about it',o:[[6,'She agrees to pay more this month.','h+3 c+30'],[4,'She gets defensive. Tense evening.','h-5']]},
        {t:'Split it evenly anyway',o:[[10,'Peace is worth $30.','c-30']]}]}}},
    rescuecat:{ic:'🐱',t:'A cat café shift',s:{
      a:{x:'A cat café needs a volunteer for Saturday morning.',o:[
        {t:'Volunteer',o:[[8,'Six cats sit on you. Pure joy.','e-5 h+10'],[2,'You find out you are allergic.','l-2 h-2']]},
        {t:'Visit as a guest ($15)',o:[[10,'Cats and cake.','c-15 h+7']]}]}}},
    carwash:{ic:'🧽',t:'Charity car wash',s:{
      a:{x:'Your community club is running a charity car wash. They need volunteers.',o:[
        {t:'Help wash cars',o:[[7,'Wet, soapy and fun. You raise $300 for charity.','e-12 h+8'],[3,'Hot sun all day.','e-16 h+4 l-1']]},
        {t:'Donate $10',o:[[10,'They wave thanks from the bucket line.','c-10 h+3']]}]}}},
    eveningwalk:{ic:'🌙',t:'An evening walk',s:{
      a:{x:'It is a cool evening. A walk along the park connector?',o:[
        {t:'Go for a long walk',o:[[8,'You clear your head and sleep well.','e-4 h+5 l+2'],[2,'Mosquitoes find you.','h-2 l-1']]},
        {t:'Stay in',o:[[10,'You watch a show instead.','h+2']]}]}}},
    parcelmix:{ic:'📦',t:'A parcel mix-up',s:{
      a:{x:'A parcel addressed to someone else is left at your door. It feels heavy.',o:[
        {t:'Find the real owner',o:[[7,'It is the family two floors up. They are grateful.','h+5 e-3'],[3,'Nobody answers. You leave a note.','e-3']]},
        {t:'Report it to the courier',o:[[10,'The courier collects it the next day.','h+2']]}]}}},
    bakesale:{ic:'🧁',t:'Bake sale',s:{
      a:{x:'Your office is holding a bake sale for charity. Bake something?',o:[
        {t:'Bake cupcakes ($15 ingredients)',o:[[6,'They sell out in ten minutes.','c-15 h+8 e-6'],[4,'They come out flat. They still sell, out of pity.','c-15 h+2 e-6']]},
        {t:'Buy a few treats ($8)',o:[[10,'Sugar rush for a good cause.','c-8 e+5 h+4']]},
        {t:'Help run the stall',o:[[10,'You sell other people’s cakes all lunchtime.','e-4 h+4']]}]}}},
    podcast:{ic:'🎧',t:'Starting a podcast',s:{
      a:{x:'A friend wants to start a podcast about budget living and asks you to co-host.',o:[
        {t:'Say yes',sk:'know',o:[[6,'The first episode is rough but fun.','e-8 h+5 n+1','b'],[4,'Your friend talks the whole time.','e-8 h+1','b']]},
        {t:'Offer to be a guest once',o:[[10,'You share your best money tips.','h+3 n+1']]}]},
      b:{x:'After a month you have 300 listeners. A local brand offers $100 to sponsor an episode.',o:[
        {t:'Take the sponsorship',o:[[7,'$50 each. You are officially media.','c+50 h+6'],[3,'Listeners complain about the ad.','c+50 h-2']]},
        {t:'Keep it ad-free',o:[[10,'Your listeners love you for it.','h+5']]}]}}},
    cousinloan:{ic:'🤝',t:'Your cousin needs money',s:{
      a:{x:'Your cousin calls: his scooter broke and he needs $120 to keep his delivery job.',o:[
        {t:'Lend him $120',o:[[6,'He pays you back within two weeks, with a thank-you meal.','h+6'],[4,'Months pass. He changes the subject whenever you see him.','c-120 h-6']]},
        {t:'Give him $40, no strings',o:[[10,'He is grateful. Family is family.','c-40 h+5']]},
        {t:'Say no',o:[[6,'He understands.','h-2'],[4,'Your aunt calls to say how disappointed she is.','h-6']]}]}}},
    hdbcorridor:{ic:'🏢',t:'Corridor clutter',s:{
      a:{x:'Your neighbour’s shoe rack and potted plants now block half the corridor.',o:[
        {t:'Ask nicely to move them',o:[[6,'She apologises and tidies up.','h+3'],[4,'She says the corridor is “common property”. Hmm.','h-4']]},
        {t:'Leave it',o:[[10,'You squeeze past every day.','h-1']]}]}}},
    newsalary:{ic:'💸',t:'Payday temptation',s:{
      a:{x:'It is payday and your favourite shop has a 30% off sale.',o:[
        {t:'Treat yourself ($60)',o:[[6,'You love what you bought.','c-60 h+8'],[4,'You regret it by evening.','c-60 h-2']]},
        {t:'Move $60 into savings',o:[[10,'Future you says thanks.','c-60 b+60 h+2']]},
        {t:'Just window-shop',o:[[7,'You look, you smile, you leave.','h+1'],[3,'Leaving empty-handed is hard.','h-2']]}]}}},
    stormdamage:{ic:'🌪️',t:'Storm damage',s:{
      a:{x:'A storm knocked a tree branch through your window.',o:[
        {t:'Call the landlord',o:[[6,'He sends someone the same day and pays for it.','h+3'],[4,'He says it is your problem. $60 for glass.','c-60 h-5']]},
        {t:'Tape it up yourself',o:[[7,'It holds. Not pretty.','h-2'],[3,'Rain gets in overnight.','h-5 e-5']]}]}}},
    charityshop:{ic:'🏷️',t:'Charity shop treasure',s:{
      a:{x:'At the charity shop, a jacket that looks designer is priced at $8.',o:[
        {t:'Buy it ($8)',o:[[5,'It is real! It would cost $250 new.','c-8 h+6','b'],[5,'It is a decent copy. Still a nice jacket.','c-8 h+3']]},
        {t:'Leave it',o:[[10,'Someone else grabs it.','']]}]},
      b:{x:'A friend who knows fashion offers $90 for the jacket.',o:[
        {t:'Sell it',o:[[10,'A tidy profit.','c+90 h+3']]},
        {t:'Keep it',o:[[10,'You look sharp at work all week.','h+6']]}]}}},
    sunrise:{ic:'🌅',t:'Sunrise hike',s:{
      a:{x:'A friend wants to catch the sunrise from the hill. Meet at 5am?',o:[
        {t:'Go',o:[[7,'The sky turns pink and gold. Worth it.','e-10 h+10 l+2'],[3,'Clouds. You see grey.','e-10 h-2 l+1']]},
        {t:'Sleep in',o:[[10,'You sleep until 9.','e+8']]}]}}},
    dentistdeal:{ic:'🦷',t:'A dental deal',s:{
      a:{x:'A new dental clinic offers a check-up and cleaning for $25.',o:[
        {t:'Book it ($25)',o:[[6,'Clean teeth and a clear check-up.','c-25 l+3 h+3'],[4,'They find a small cavity. Another $60.','c-85 l+4 h-3']]},
        {t:'Skip it',o:[[10,'You floss a bit more instead.','']]}]}}},
    youthmentor:{ic:'🧑‍🏫',t:'Mentoring a student',s:{
      a:{x:'A school is looking for volunteers to mentor students once a week.',o:[
        {t:'Sign up',o:[[7,'Your mentee is curious and funny.','e-5 h+6 n+1','b'],[3,'He barely talks. Progress will be slow.','e-5 h+2','b']]},
        {t:'Not right now',o:[[10,'Maybe next term.','']]}]},
      b:{x:'At the end of term your mentee gets into the course he wanted.',o:[
        {t:'Celebrate with him',o:[[10,'His parents thank you with tears in their eyes.','h+12']]}]}}},
    onlineshop:{ic:'🛍️',t:'A late parcel',s:{
      a:{x:'Your online order is three weeks late. The seller stops replying.',o:[
        {t:'File a dispute',sk:'know',o:[[7,'The platform refunds you in full.','c+35 h+5'],[3,'The dispute drags on.','h-3 e-3']]},
        {t:'Wait a bit longer',o:[[4,'It arrives the next day!','h+4'],[6,'It never comes.','h-5']]}]}}},
    chillicrab:{ic:'🦀',t:'Seafood dinner',s:{
      a:{x:'Your uncle is treating the family to chilli crab. He orders a lot.',o:[
        {t:'Eat with gusto',o:[[7,'Best meal of the month.','e+12 h+8'],[3,'Too much. Your stomach complains overnight.','e+6 l-2 h+3']]},
        {t:'Eat lightly',o:[[10,'Delicious and comfortable.','e+8 h+5']]}]}}},
    overtimeweekend:{ic:'📋',t:'Weekend audit',s:{
      a:{x:'Your manager asks for help with a weekend stock audit. Double pay, $90 a day.',o:[
        {t:'Work Saturday',o:[[7,'Long but simple. $90 in your pocket.','c+90 e-15','b'],[3,'The counts do not add up. You stay late.','c+90 e-22','b']]},
        {t:'Decline',o:[[10,'You keep your weekend.','e+5 h+2']]}]},
      b:{x:'She asks if you can come in on Sunday as well.',o:[
        {t:'Yes, again',o:[[10,'Another $90. You sleep like a log.','c+90 e-15']]},
        {t:'One day is enough',o:[[10,'She thanks you for Saturday.','h+2']]}]}}},
    mahjong:{ic:'🀄',t:'Mahjong with the aunties',s:{
      a:{x:'The aunties next door need a fourth player. Stakes are small: $10 a session.',o:[
        {t:'Play ($10)',sk:'know',o:[[4,'Beginner’s luck! You win $35.','c-10 c+35 h+6'],[6,'They are sharks. You lose $10 but learn a lot.','c-10 n+1 h+3']]},
        {t:'Watch and learn',o:[[10,'They feed you kueh and gossip.','e+5 h+4']]}]}}},
    vintagegame:{ic:'🕹️',t:'Old game console',s:{
      a:{x:'Cleaning out your cupboard, you find your childhood game console.',o:[
        {t:'Sell it online',o:[[6,'A collector pays $70.','c+70 h+2'],[4,'Lowball offers only. You sell it for $25.','c+25']]},
        {t:'Plug it in',o:[[10,'An evening of nostalgia.','h+8']]}]}}},
    parking:{ic:'🅿️',t:'A parking ticket',s:{
      a:{x:'You borrowed a friend’s car and got a $40 parking ticket.',o:[
        {t:'Pay it and tell her',o:[[10,'She appreciates the honesty.','c-40 h+2']]},
        {t:'Hope she does not notice',o:[[3,'She never finds out.','h-3'],[7,'The fine doubles and she is upset.','c-80 h-8']]},
        {t:'Tell her and offer to pay next week',o:[[7,'She says that is fine.','h-1'],[3,'She is annoyed but agrees.','h-4']]}]}}},
    onlinecourse2:{ic:'🧠',t:'A free university course',s:{
      a:{x:'A top university posts a free online course on personal finance.',o:[
        {t:'Do the whole course',sk:'know',o:[[6,'You finish it with a certificate.','n+6 e-10 h+4'],[4,'You manage half. Still useful.','n+3 e-6']]},
        {t:'Watch the first lecture',o:[[10,'Interesting. You take notes.','n+2']]}]}}},
    gardenplot:{ic:'🌱',t:'An allotment',s:{
      a:{x:'A community farm is renting small plots for $20 a month.',o:[
        {t:'Rent a plot ($20)',o:[[6,'Sun, soil and calm. Your stress melts.','c-20 h+6 l+2'],[4,'Snails eat everything.','c-20 h-3']]},
        {t:'Grow herbs on your windowsill',o:[[10,'Fresh basil for every meal.','h+3']]}]}}},
    rentaltool:{ic:'🔧',t:'Fix it yourself',s:{
      a:{x:'Your kitchen tap is dripping. A plumber wants $80.',o:[
        {t:'Call the plumber ($80)',o:[[10,'Fixed in ten minutes.','c-80']]},
        {t:'Watch a video and fix it',sk:'know',o:[[6,'You fix it for $6 in parts. Victory.','c-6 n+2 h+6'],[4,'Water everywhere. You call the plumber anyway.','c-86 h-6']]},
        {t:'Put a bowl under it',o:[[10,'Drip, drip, drip. You sleep with earplugs.','h-3 e-2']]}]}}},
    birthdaygift:{ic:'🎁',t:'A pricey gift',s:{
      a:{x:'Your best friend’s birthday is coming. She hinted at a $70 perfume.',o:[
        {t:'Buy the perfume ($70)',o:[[10,'She is thrilled.','c-70 h+8']]},
        {t:'Make a photo album ($15)',o:[[7,'She cries happy tears.','c-15 h+10'],[3,'She says “oh… thanks”.','c-15 h-2']]},
        {t:'Write her a long letter',o:[[7,'She keeps it in her bag for weeks.','h+8'],[3,'She hoped for the perfume.','h-2']]}]}}},
    commuteswap:{ic:'🚌',t:'A new bus route',s:{
      a:{x:'A new express bus could cut your commute by 20 minutes, but costs $1 more each way.',o:[
        {t:'Try the express bus',o:[[7,'Quicker and comfier. Worth it.','c-10 e+6 h+3'],[3,'It is stuck in traffic. No faster.','c-10 h-2']]},
        {t:'Keep the old route',o:[[10,'Slow but cheap.','']]}]}}},
    tuitioncentre:{ic:'🏫',t:'Teaching at a tuition centre',s:{
      a:{x:'A tuition centre needs a relief teacher for one evening. $60.',o:[
        {t:'Take the class',sk:'know',o:[[6,'The kids are attentive. The manager asks you back.','c+60 e-10 n+1','b'],[4,'Chaos. You survive.','c+60 e-14']]},
        {t:'Decline',o:[[10,'You recommend a friend.','']]}]},
      b:{x:'The manager offers a regular Thursday slot for $60 a week.',o:[
        {t:'Accept the slot',o:[[10,'Steady extra income starts next week.','c+60 h+4 e-8']]},
        {t:'One-off only',o:[[10,'She understands.','']]}]}}},
    fireworks:{ic:'🎆',t:'Fireworks night',s:{
      a:{x:'There is a fireworks show at the bay tonight. Crowds will be huge.',o:[
        {t:'Go early with snacks ($10)',o:[[7,'A perfect spot. The show is spectacular.','c-10 h+10 e-6'],[3,'You get stuck behind a tall man.','c-10 h+3 e-6']]},
        {t:'Watch from your block’s roof',o:[[10,'Smaller view, no crowds.','h+5']]}]}}}
  };
  function storyEvent(){
    var id=draw('deckS',Object.keys(STORIES)),st=STORIES[id];
    return {icon:st.ic,tag:'Story',title:st.t,story:id,step:'a',text:st.s.a.x,choice:true,done:false,fx:[],tone:'',hist:[]};
  }
  function storyCost(o){var m=0;o.o.forEach(function(x){var c=0;(x[2]||'').split(' ').forEach(function(t){var q=tokRe.exec(t);if(q&&q[1]==='c'&&q[2]==='-')c+=+(q[4]||q[3])});m=Math.max(m,c)});return m}
  function storyPick(i){
    var ev=S.pending&&S.pending.ev;if(!ev||!ev.story||ev.done)return;
    var st=STORIES[ev.story],step=st.s[ev.step];
    /* -1: no choice is affordable, so the player leaves it (renderEvent offers this only then) */
    if(i===-1){if(step.o.some(function(x){return storyCost(x)<=Math.max(0,S.cash)}))return;
      ev.hist.push('<b>Leave it:</b> You can’t afford any of these, so you let it go.');ev.done=true;ev.outcome='You let it go.';ev.tone='';
      log('Story ('+st.t+'): you could not afford any of the choices and let it go.','warn');render();return}
    var o=step.o[i];if(!o)return;
    if(storyCost(o)>Math.max(0,S.cash))return;
    var ws=o.o.map(function(x,j){var w=x[0];if(j===0&&o.sk){var v=o.sk==='know'?S.know:o.sk==='happy'?S.happy:S.energy;w*=0.6+v/80}return w});
    var tot=ws.reduce(function(a,b){return a+b},0),roll=Math.random()*tot,k=0;
    while(k<ws.length-1&&roll>=ws[k]){roll-=ws[k];k++}
    var res=o.o[k],fx=applyFx(res[2]);
    ev.fx=ev.fx.concat(fx);ev.hist.push('<b>'+o.t+':</b> '+res[1]);
    var tone=/c-|h-|e-/.test(res[2])&&!/c\+|h\+/.test(res[2])?'bad':/c\+|h\+|n\+/.test(res[2])?'good':'';
    log('Story ('+st.t+'): '+o.t+'. '+res[1]+(fx.length?' ('+fx.join(', ')+')':''),tone==='bad'?'bad':tone==='good'?'good':'');
    if(res[3]){ev.step=res[3];ev.text=st.s[res[3]].x}
    else{ev.done=true;ev.outcome=res[1];ev.tone=tone}
    render();
  }
  /* a decision card's icon and heading, from what the question is about (first match wins; titles rotate) */
  var DTOPICS=[
    {re:/boss|shift|colleague|cowork|employer|job|interview|promotion|overtime|training day|report|office|recruit/i,ic:'💼',t:['A work dilemma','Something at work','Your career calls']},
    {re:/invest|stock|coin|crypto|bank|loan|savings|tax|insurance|warranty|lottery|raffle|pool|prize|tip|scam|startup|business|back it/i,ic:'💰',t:['A money decision','Money on the line','Your wallet weighs in']},
    {re:/friend|mum|gran|aunt|cousin|uncle|neighbour|ex |roommate|flatmate|relative|classmate|group chat|kids|babysit|elderly/i,ic:'👥',t:['Someone asks a favour','Friends and family','People in your life']},
    {re:/gym|fitness|run\b|health|dentist|vitamin|doctor|climb|walk|squats|massage/i,ic:'🩺',t:['Body and mind','A healthy choice?','Look after yourself?']},
    {re:/sale|bargain|coupon|shop|market|stall|sneakers|bag|discount|buy|upgrade|second-hand|cheap/i,ic:'🛍️',t:['A bargain?','Spend or save?','Shopping temptation']},
    {re:/concert|party|bar\b|karaoke|trip|holiday|dinner|quiz|trivia|bubble tea|durian|pottery|book club|match|game|dating|haircut/i,ic:'🎉',t:['A night out?','Something fun','Treat yourself?']},
    {re:/landlord|flat|sofa|fridge|plant|pest|air-con|laundry|cat|dog|pigeon|lift|fence|phone|laptop|shoes/i,ic:'🏠',t:['Everyday life','Around the home','Little things']}
  ];
  function decisionLook(q){
    for(var i=0;i<DTOPICS.length;i++)if(DTOPICS[i].re.test(q)){var d=DTOPICS[i];return {ic:d.ic,t:d.t[Math.floor(Math.random()*d.t.length)]}}
    return {ic:'❓',t:'You face a choice'};
  }
  function decisionEvent(){
    var c=draw('deckC',CHOICES),lk=decisionLook(c[0]);
    return {icon:lk.ic,tag:'Decision',title:lk.t,text:c[0],choice:true,y:c[1],n:c[2],done:false,fx:[],tone:''};
  }
  function macroRunning(){return S.trends.some(function(t){return t.macro&&t.left>0})}
  function quietCard(){return {icon:'🌙',tag:'Quiet night',title:'Rest until morning',text:'No news or decisions tonight.',done:true,tone:'',fx:[]}}
  /* one daily event from the weighted list; null means no event today */
  function dailyPick(){
    /* the morning already decided whether tonight is news (planNews); a save from before that has no plan and rolls as before */
    var plan=S.newsPlan&&S.newsPlan.day===S.day?S.newsPlan:null;S.newsPlan=null;
    if(plan&&plan.n)return newsEvent(plan.n);
    var E=CONFIG.events,opts=[['story',E.story],['item',E.item],['news',plan?0:E.news],['basic',E.basic],['decision',E.decision],['none',E.none]];
    while(true){
      var tot=0;opts.forEach(function(o){tot+=Math.max(0,o[1])});
      if(tot<=0)return null;
      var r=Math.random()*tot,pick=opts[opts.length-1];
      for(var i=0;i<opts.length;i++){r-=Math.max(0,opts[i][1]);if(r<0){pick=opts[i];break}}
      var key=pick[0];
      if(key==='story')return storyEvent();
      if(key==='news')return newsEvent(draw('deckN',NEWS));
      if(key==='basic')return basicEvent(Math.floor(Math.random()*3));
      if(key==='decision')return decisionEvent();
      if(key==='none')return null;
      var ie=itemEvent();if(ie)return ie;
      opts=opts.filter(function(o){return o!==pick});
    }
  }
  /* cards for tonight, in order: the big event (if one starts or a saga chapter plays), then the daily event */
  function pickNight(){
    S.nightFx=[];  /* tonight's storyline chapters, which rivals feel too (rivalNight) */
    var E=CONFIG.events,cards=[],story=!!S.saga,wasActive=story||macroRunning(),big=null,ind=null,trends0=S.trends.length,saga0=S.saga&&S.saga.id;
    var shockNear=macroRunning()||(S.macroLast>0&&S.day-S.macroLast<=E.storylineGap);  /* a shock running, or ended under storylineGap days ago */
    if(S.ind&&S.ind.day>=S.ind.len){var lastInd=S.ind.id;S.ind=null;  /* the industry-specific storyline's last phase held for one day after its last chapter */
      if(S.indLeft>0){S.indLeft--;var IL=CONFIG.industry,lo=S.day+CONFIG.rivals.industryGapDays,hi=gameLen()-IL.daysBeforeEnd;  /* a rival game has another one (rival dice) */
        if(lo<=hi){S.indNext=lo+Math.floor(rrand()*(hi-lo+1));var ids=INDUSTRY.filter(function(g){return g.id!==lastInd});S.indId=ids[Math.floor(rrand()*ids.length)].id}}}
    if(!S.saga&&!S.ind&&!macroRunning()&&(S.bigCool||0)>0)S.bigCool--;
    if(S.saga)big=sagaEvent();
    else if(S.sagaNext>0&&S.day>=S.sagaNext&&!shockNear){  /* waits out a shock and the days after it */
      story=true;
      sagaStart();var sid=S.saga.id;big=sagaEvent();
      if(sid==='house'){var lost=bubbleHit();if(lost){big.fx.push(lost);big.tone='bad'}}  /* the housing-bubble storyline can take your home (CONFIG.housing) */
    }else if(!macroRunning()&&!S.ind){
      var room=[S.sagaNext,S.indNext].every(function(d){return !(d>0)||S.day+E.macroDays[1]+E.storylineGap<=d});  /* even the longest shock ends storylineGap clear days before each storyline */
      if(!(S.bigCool>0)&&room&&Math.random()<E.macroChance)big=macroEvent();
    }
    if(S.ind)ind=indEvent();
    else if(S.indNext>0&&S.day>=S.indNext&&!shockNear){indStart();ind=indEvent()}
    if(big)S.trends.forEach(function(t,ti){if(ti>=trends0||(t.saga&&(t.saga===saga0||(S.saga&&t.saga===S.saga.id))))t.card=S.day});  /* shown on tonight's card: not repeated in the morning */
    if(big)cards.push(big);
    if(ind)cards.push(ind);
    var daily=dailyPick();if(daily)cards.push(daily);
    if(wasActive||S.saga||macroRunning())S.bigCool=story?Math.max(E.bigGap,E.storylineGap+1):E.bigGap;  /* bigCool n = n−1 clear days */
    if(ind)S.bigCool=Math.max(S.bigCool||0,E.storylineGap+1);
    if(macroRunning())S.macroLast=S.day;
    if(S.mode==='rivals'){var rc=rivalCard();if(rc)cards.push(rc)}  /* a card involving a rival (rival dice) */
    return cards;
  }
  function endWeek(rested){
    if(S.over||S.pending)return;
    var home=rested||atHome();
    var SL=CONFIG.sleep,IL=CONFIG.illness;
    var share=home?1:SL.awayShare;
    if(S.energy<IL.lowEnergyBelow)S.lowE=(S.lowE||[]).concat(S.day);  /* low-energy nights feed the illness rule */
    S.lowE=(S.lowE||[]).filter(function(d){return S.day-d<IL.lowWindow});
    S.restBonus=Math.round(sleepGain(S.ap)*share);
    S.restHap=Math.round(sleepHap(S.ap)*share);S.slept=Math.round(sleepHealth(S.ap)*share);S.sickSleep=home&&S.ill?1:0;if(home)S.restHrs=(S.restHrs||0)+S.ap/60;
    log((home?'You slept at home':'You bunked outside')+' with '+hm(S.ap)+' left: +'+S.restBonus+'% energy, +'+S.restHap+' happiness and +'+S.slept+' health. Nightly change: '+nightTxt()+'.');
    if(!S.fed)log('No meal today: '+sg(CONFIG.health.nightly.skippedMeal)+' health overnight.','warn');
    snd('day');
    var cards=pickNight();if(!cards.length)cards=[quietCard()];
    S.pending={rested:home,ev:cards[0],q:cards.slice(1),n:cards.length};  /* any way of going to bed at home counts (the top-bar button too), so the Bungalow's bed bonus applies */
    cards.forEach(function(ev){if(ev.done)log('Event: '+ev.title+(ev.fx.length?' ('+ev.fx.join(', ')+')':''),ev.tone==='good'?'good':ev.tone==='bad'?'bad':'')});
    view=null;
    render();
  }
  function decide(yes){
    var ev=S.pending&&S.pending.ev;if(!ev||!ev.choice||ev.done)return;
    if(ev.rep){
      var it=ITEMS[ev.rep.k],res;
      if(yes){S.cash-=ev.rep.cost;outg(ev.rep.cost);res={text:'Your '+it.n.toLowerCase()+' works again.',fx:['−'+money(ev.rep.cost)+' cash'],tone:''}}
      else{S.broken[ev.rep.k]=1;res={text:'You leave it for now. The '+it.n.toLowerCase()+' stays broken until you get it repaired at the Electronics Store.',fx:[it.n+' out of action'],tone:'bad'}}
      ev.outcome=(yes?'You said yes. ':'You said no. ')+res.text;ev.fx=res.fx||[];ev.tone=res.tone||'';ev.done=true;
      log((yes?'Yes. ':'No. ')+res.text+(ev.fx.length?' ('+ev.fx.join(', ')+')':''),ev.tone==='bad'?'bad':'');
      render();return;
    }
    var o=yes?ev.y:ev.n,sure=o.length===3,good=sure||Math.random()<o[0];
    var text=good?o[1]:o[3],fx=good?o[2]:o[4];
    if(sure&&Math.random()<0.35){var tw=TWISTS[Math.floor(Math.random()*TWISTS.length)];text+=' '+tw[0];fx=((fx||'')+' '+tw[1]).trim()}
    ev.outcome=(yes?'You said yes. ':'You said no. ')+text;
    ev.fx=mergeFx(applyFx(fx));ev.tone=sure?'':(good?'good':'bad');ev.done=true;if(ev.rv)rivalCardDone(ev,yes,good);
    log('Decision: '+(yes?'yes. ':'no. ')+text+(ev.fx.length?' ('+ev.fx.join(', ')+')':''),ev.tone==='good'?'good':ev.tone==='bad'?'bad':'');
    render();
  }
  function renderEvent(){
    var ev=S.pending.ev,nCards=S.pending.n||0,h='<div class="evtag"><span class="evicon">'+ev.icon+'</span> '+ev.tag+(nCards>1?' <small class="evstep">'+(nCards-(S.pending.q||[]).length)+' of '+nCards+'</small>':'')+'</div><h2 class="evtitle">'+ev.title+'</h2>';
    h+='<div class="say"><b>'+(ev.choice?'Your call':'What happened')+'</b>'+ev.text+'</div>';
    if(ev.story&&ev.hist&&ev.hist.length)h=h.replace('<div class="say">','<div class="hist">'+ev.hist.map(function(x){return '<div>'+x+'</div>'}).join('')+'</div><div class="say">');
    if(ev.story&&!ev.done){
      var stp=STORIES[ev.story].s[ev.step];
      var none=!stp.o.some(function(o){return storyCost(o)<=Math.max(0,S.cash)});
      h+='<div class="evbtns">'+stp.o.map(function(o,i){var c=storyCost(o);return btn('evopt',String(i),o.t,i>0,c>Math.max(0,S.cash))}).join('')+(none?btn('evopt','-1','Leave it',1):'')+'</div>'+(stp.o.some(function(o){return storyCost(o)>Math.max(0,S.cash)})?'<p class="bad">Some choices need more cash than you have.</p>':'')+'<p><small>Round '+(ev.hist.length+1)+'. The same choice can turn out differently.</small></p>';
    }else if(!ev.done){
      var need=ev.rep?ev.rep.cost:needCash(ev.y);
      h+='<div class="evbtns">'+btn('evyes','','Yes',0,need>Math.max(0,S.cash))+btn('evno','','No',1)+'</div>'+(need>Math.max(0,S.cash)?'<p class="bad">You’d need '+money(need)+' in cash to say yes.</p>':'');
    }else{
      if(ev.outcome)h+='<div class="result '+(ev.tone||'')+'">'+ev.outcome+'</div>';
      h+='<div class="chips">'+ev.fx.map(function(f){return '<span>'+f+'</span>'}).join('')+'</div>'+btn('cont','',S.pending.q&&S.pending.q.length?'Next':'Start next day');
    }
    $('event').innerHTML=h;
  }

  function btn(act,arg,label,alt,off){
    return '<button class="btn'+(act==='work'?' work':alt?' alt':'')+'" data-act="'+act+'" data-arg="'+(arg||'')+'"'+(off?' disabled':'')+'>'+label+'</button>';
  }
  function opt(title,desc,b,cls){
    return '<div class="opt'+(cls?' '+cls:'')+'"><div>'+title+'<small>'+statIcons(desc)+'</small></div>'+b+'</div>';
  }
  function shopKeys(name){return Object.keys(ITEMS).filter(function(k){return ITEMS[k].shop===name}).sort(function(a,b){return ITEMS[a].p-ITEMS[b].p})}
  /* what an item does, as icon chips (the full sentence is in the section's ⓘ) */
  function itemChips(k){
    var GD=CONFIG.gadgets,d=GD.daily[k],r=GD.perRestHour[k],FDc=CONFIG.food,c='';
    if(k==='clothes')c+=chip('cash','+'+money(GLOVES_PAY)+' a shift');
    if(d){if(d.knowledge)c+=chip('know','+'+d.knowledge+' a day');if(d.happiness)c+=chip('happy','+'+d.happiness+' a day')}
    if(r){if(r.happiness)c+=chip('happy','+'+r.happiness+' an hour of rest');if(r.knowledge)c+=chip('know','+'+r.knowledge+' an hour of rest')}
    if(/^fridge/.test(k))c+=chip('','🍽 '+FDc.fridgeSpace+' meals · keeps '+FDc.keepDaysFridge+'d');
    if(k==='coffee')c+=chip('energy','+'+GD.coffeeEnergy+'% each morning');
    if(k==='microwave')c+=chip('time','Reheat '+hm(FDc.reheatMinutes));
    if(/^(phone|tablet|computer)/.test(k))c+=chip('','ETFs · study online');
    if(/^computer/.test(k))c+=chip('','Freelance · hedge fund');
    if(COMFORT[k]&&!/^(phone|tablet)/.test(k))c+=chip('','Comfort','ok');
    if(ITEMS[k].old)c+=chip('','Breaks often','warn');
    return c;
  }
  function shop(name){
    var h='';
    shopKeys(name).forEach(function(k){
      var it=ITEMS[k];
      h+=arow(it.ic+' '+it.n+' · '+money(G(it.p)),itemChips(k),S.items[k]?btn('x','', S.broken[k]?'Broken':'Owned',1,1):btn('buy',k,'Buy'));
    });
    return h;
  }
  /* the full description of every item in a shop, for its ⓘ */
  function shopInfo(name){return '<ul class="infol">'+shopKeys(name).map(function(k){return '<li><b>'+ITEMS[k].ic+' '+ITEMS[k].n+':</b> '+ITEMS[k].d+'.</li>'}).join('')+'</ul>'}
  /* work rows for every job based at this building (shown at the top of its panel) */
  function workSection(b){
    var cs=Object.keys(CAREERS).filter(function(c){return (CAREERS[c].b||c)===b});
    if(!cs.length)return '';
    var held=cs.filter(function(c){return cur(c)});
    if(!held.length)return '';
    var mx=CONFIG.time.maxWorkMinutes,BU=CONFIG.burnout,lm=loadMin();
    return boxed(psec('work','💼 Your shift',chip('time','Worked '+hm(S.workMin||0)+' / '+hm(mx),(S.workMin||0)>=mx?'warn':'')+chip('','Work + study '+hm(lm)+' / '+loadLimitTxt().replace(' hours','h'),lm>BU.loadMinutes?'warn':''),
      'You can work at most '+hm(mx)+' of shifts a day. More than '+loadLimitTxt()+' of work and study together a day for '+dayN(BU.daysInARow)+' running causes burnout'+(S.loadStreak?' (streak: '+S.loadStreak+' of '+BU.daysInARow+')':'')+'. Pay depends on your knowledge, and drops when you are tired, hungry, ill, unhappy, burnt out or in poor health.')+held.map(jobRow).join(''));
  }
  function jobRow(k){
    if(CAREERS[k]){
      var rk=cur(k);
      if(!rk)return '<p><small>You don’t work here yet. Apply at the Employment Office.</small></p>';
      var ef=effort(rk.pay), en=ef.en, mins=ef.min;
      var pm=prod().m,pr=prod(),sh=shutLeft(bOf(k));return arow(rk.r+' shift · '+money(shiftPay(rolePay(k,S.career[k]))),chip('time',hm(mins))+chip('energy','−'+en+'%')+chip('happy','−'+workHap(en))+hpChip(workHp(mins))+indChips(k,S.career[k])+(rk.dress?chip('',DSHORT[rk.dress]+(rk.dress==='suit'?'':' or better'),hasDress(rk.dress)?'':'warn'):'')+(pm<1?chip('','Pay ×'+Math.round(pm*100)+'%','warn'):'')+(sh?chip('','Closed '+sh+'d','warn'):'')+(naked()?chip('','No clothes','warn'):''),btn('work',k,sh?'Closed':'Work a shift',0,!!sh||naked()),
        sh?'Your job is safe and returns when the workplace reopens.':naked()?NAKED:pm<1?'Pay is lower because of '+pr.rs.join(', ')+'.':'');
    }
    var j=JOBS[k], need=(j.computer&&!owns('computer'))?'Needs a working computer':'';
    return arow(j.n+' shift · '+money(shiftPay(j.pay)),chip('time',hm(j.min))+chip('energy','−'+j.en+'%')+chip('happy','−'+workHap(j.en))+hpChip(workHp(j.min)),btn('work',k,'Work a shift',0,!!need),need);
  }
  var ovHidden=false;  /* true after clicking the map outside the overview window */
  /* bank amount boxes: chosen with −/+ in steps of BK_STEP; the choice is kept while the game is open */
  var BK_STEP=50,bankSel={};
  function bankAmt(id,min){var v=bankSel[id];return v==null||v<min?min:v}
  function stepAmt(arg){
    var a=String(arg).split('|'),id=a[0],dir=+a[1],min=+a[2],max=a[3]!=null&&a[3]!==''?+a[3]:Infinity,v=bankAmt(id,min);
    v=dir>0?(v<min?min:Math.floor(v/BK_STEP)*BK_STEP+BK_STEP):Math.max(min,Math.ceil(v/BK_STEP)*BK_STEP-BK_STEP);
    v=Math.min(v,Math.max(min,max));
    bankSel[id]=v;var box=$(id);if(box)box.value=v;
    var dn=$('shop').querySelector('[data-act="step"][data-arg^="'+id+'|-1|"]');if(dn)dn.disabled=v<=min;
    var up=$('shop').querySelector('[data-act="step"][data-arg^="'+id+'|1|"]');if(up)up.disabled=v>=max;
  }
  var allJobs=false;
  /* chips for one role on the job board and the shift row: today's change from the industry-specific storyline */
  function indChips(c,i){
    var x=indRole(c,i);if(!x)return '';var pc=Math.round(Math.abs(x.m-1)*100);
    return (pc?chip('',(x.m>1?'▲':'▼')+pc+'%',x.m>1?'ok':'warn'):'')+(x.freeze?chip('','Freeze','warn'):'')+(x.open?chip('','Hiring','ok'):'')+(x.cut?chip('',x.cut===1?'Cuts':'Closures','warn'):'');
  }
  /* back from an app to the home screen of the device it was opened on */
  function appBack(){return '<p class="appback">'+btn('device',appFrom,appFrom==='pc'?'← Computer':'← Phone',1)+'</p>'}
  /* a device's home screen: the Bank app and the Jobs app */
  function appHome(title){
    var o=offerToday(),ind=S.ind&&S.ind.day>0?indOf(S.ind.id):null,rum=!ind&&S.indNext>0&&S.indNext>=S.day&&S.indNext-S.day<=CONFIG.industry.rumourDays;
    return boxed(psec('apps',title,chip('',appFrom==='pc'?'At home':'Anywhere'),'Apps save you the walk. The Bank app does savings, investments and offers (loans need a visit to the Bank). The Jobs app shows the same job board as the Employment Office; an online application takes the same 1h as an interview there. The Gigs app offers delivery runs (phone or tablet only) and the Creator app lets you post videos for followers and sponsors.')+
      arow('🏦 Bank app',chip('','Savings '+S.rate.toFixed(1)+'%/day','ok')+(o&&!S.promo?chip('','🎁 Offer today','ok'):''),btn('app','bankapp','Open'))+
      (S.mode==='rivals'&&S.rivals&&S.rivals.length?arow('📞 Calls',chip('','Call a rival or a group'),btn('app','callsapp','Open'))+arow('💬 Messages',chip('',newMsgs()?newMsgs()+' new':'Loans and bets',newMsgs()?'warn':'')+(dueTomorrow().length?chip('','💬 Due tomorrow','warn'):''),btn('app','msgsapp','Open')):'')+
      arow('💼 Jobs app',(myJob()?chip('','Your job: '+myJob().rk.r):chip('','No job yet','warn'))+(ind?chip('',ind.ic+' '+ind.n,'warn'):rum?chip('','📣 Rumour','warn'):''),btn('app','jobsapp','Open'))+
      arow('📦 Gigs app',chip('','★ '+gigState().stars.toFixed(1))+chip('','Delivery run about '+money(sidePay(gigFare()))),btn('app','gigsapp','Open'))+
      arow('🎬 Creator app',chip('','👥 '+creatorState().f.toLocaleString()+' followers'),btn('app','creatorapp','Open')))
  }
  /* Employment Office: the industry-specific storyline's rumour (before it starts) or today's effects (while it runs) */
  function indOutlook(){
    var L=CONFIG.industry,st=S.ind,g=st&&st.day>0?indOf(st.id):null,
      info='Each game has one industry-specific storyline, on top of the global storyline. For a few days it moves pay for particular jobs by '+Math.round(L.paySwing[0]*100)+'% to '+Math.round(L.paySwing[1]*100)+'% up or down, freezes or opens up hiring, and can cut jobs. Each night your own job is hit by cuts, there is a '+pctTxt(L.layoffChance)+' chance you are laid off (the job is gone), and otherwise a '+pctTxt(L.suspendChance)+' chance your workplace suspends work for '+L.suspendDays[0]+' to '+L.suspendDays[1]+' days (the job is kept). Pay on the board and in your shift already includes the change.';
    if(g)return psec('ind','📊 Industry outlook',chip('',g.ic+' '+g.n+' · day '+Math.min(st.day,st.len)+' of '+st.len,'warn'),info)+
      indOn().map(function(e){var pc=Math.round(Math.abs(e.pay)*st.sw*100);
        return arow(e.lab,(pc?chip('',(e.pay>0?'▲':'▼')+pc+'% pay',e.pay>0?'ok':'warn'):'')+(e.hire==='freeze'?chip('','Hiring freeze','warn'):'')+(e.hire==='open'?chip('','Hiring now','ok'):'')+(e.cut?chip('',e.cut===1?'Cuts':'Closures','warn'):''),'')}).join('');
    var r=indOf(S.indId);
    if(r&&S.indNext>0&&S.indNext>=S.day&&S.indNext-S.day<=L.rumourDays)return psec('ind','📊 Industry outlook',chip('','📣 Rumour','warn'),info)+'<p class="arow-n">📣 '+r.rum+'</p>';
    return '';
  }
  function board(){
    var order=[],by={};
    BOARD.forEach(function(c){var b=bOf(c);if(!by[b]){by[b]=[];order.push(b)}by[b].push(c)});
    var h='<div class="jb">';
    order.forEach(function(b){
      var rows=[],sh=shutLeft(b);
      by[b].forEach(function(c){
        var C=CAREERS[c],locked=0;
        C.ranks.forEach(function(rk,i){
          var mine=S.career[c]===i, have=S.career[c]!=null&&S.career[c]>i;
          var ok=meets(rk)&&kreq(rk)<=Math.floor(S.know);
          if(!allJobs&&have)return;
          if(!allJobs&&!ok&&!mine){if(locked)return;locked=1}
          rows.push({c:c,i:i,rk:rk,mine:mine,have:have,ok:ok});
        });
      });
      if(!rows.length)return;
      rows.sort(function(x,y){return x.rk.pay-y.rk.pay});
      h+='<div class="bcard"><h4 class="jh"><span>'+ICON[b]+' '+NAME[b]+'</span>'+(sh?'<em>🔒 closed '+sh+'d</em>':'')+'</h4>'+rows.map(function(o){
        var rk=o.rk;
        var expBad=!o.mine&&!o.have&&expShort(o.c,rk);
        /* short chips: qualifications (green once you have them), knowledge, dress code, and work experience still needed */
        var need=(rk.q||[]).map(function(q){return '<span class="chip'+(o.mine||o.have||meetsQ(q)?' ok':'')+'" title="'+qTxt(q)+'">'+qShort(q)+'</span>'}).join('')+(kreq(rk)?chip('know',kreq(rk),Math.floor(S.know)>=kreq(rk)?'ok':''):'')+(rk.dress&&rk.dress!=='casual'?chip('',DSHORT[rk.dress]):'')+
          (expBad?'<span class="chip warn" title="'+expTxt(o.c)+'">Work exp needed</span>':'')+(S.raced&&S.raced[o.c+'_'+o.i]?chip('','🏁 Taken by '+S.raced[o.c+'_'+o.i],'warn'):'');
        return arow('<span class="rn">'+rk.r+'</span> <b class="jpay">'+money(Math.round(rolePay(o.c,o.i)*payIdx()))+'</b>',need+indChips(o.c,o.i),
          o.mine?'<span class="tag">Your job</span>':o.have?'<span class="tag">Past rank</span>':btn('apply',o.c+'_'+o.i,o.ok?'Apply':'🔒',!o.ok,!o.ok||sh>0),'','jrow'+(o.mine?' mine':expBad?' nextstep':''));
      }).join('')+'</div>';
    });
    return h+'</div><p style="margin:6px 0 0"><button class="linkbtn" data-act="alljobs" style="margin:0">'+(allJobs?'Show fewer':'Show all')+'</button></p>';
  }
  /* home food cards: icon, name, days left and where it is kept; with more food than fridge space, a button moves it in or out */
  function leftTxt(p){var n=foodLeft(p);return n<=1?'last day':n+' days left'}
  function foodCard(p,i,pickable){
    var nm=FOODN[p.t](),st=p.sp?'brk':p.f?'cold':'warm',note=p.sp?'🤢 Spoiled':(p.f?'❄️ ':'🌡️ ')+leftTxt(p);
    var sub=p.sp?'hurts health':p.t==='basic'?'cook first':p.t==='cook'&&p.cold?'🥶 cold · '+(owns('microwave')?'reheat':'eat cold'):'ready to eat';
    var b=pickable&&!p.sp?'<button class="mini" data-act="frig" data-arg="'+i+'">'+(p.f?'Take out':'❄️ Put in')+'</button>':'';
    return '<div class="thing groc '+st+(p.pk&&p.f?' pick':'')+'"><span>'+(p.sp?'🤢':FOODIC[p.t])+'</span><small><b>'+nm+'</b><br>'+sub+'</small><em>'+note+'</em>'+b+'</div>'}
  function shelf(title,note,body){return '<div class="shelf"><h5>'+title+(note?' <small>'+note+'</small>':'')+'</h5>'+body+'</div>'}
  function room(){
    var ks=Object.keys(S.items).filter(function(k){return S.items[k]}),F=S.food||[],cap=fridgeCap();
    var fresh=F.filter(function(p){return !p.sp}).length,pickable=cap>0&&fresh>cap;
    var cards=function(test){var h='';F.forEach(function(p,i){if(test(p))h+=foodCard(p,i,pickable)});return h};
    var inF=cards(function(p){return p.f}),out=cards(function(p){return !p.f&&!p.sp}),bad=cards(function(p){return p.sp});
    var t=shelf('🔌 Belongings',ks.length?'':'none yet',ks.length?'<div class="room">'+ks.map(function(k){return '<div class="thing'+(S.broken[k]?' brk':'')+'"><span>'+ITEMS[k].ic+'</span><small>'+ITEMS[k].n+(S.broken[k]?' · broken':'')+'</small></div>'}).join('')+'</div>':'<p class="room empty">Buy things at the Electronics Store or Thrift Store.</p>');
    t+=shelf('🧊 Fridge',cap?inFridge()+' / '+cap+' · '+FD.keepDaysFridge+' days':(S.items.fridge||S.items.fridgeold)?'broken':'none',
      inF?'<div class="room">'+inF+'</div>'+(pickable?'<p class="room empty">More food than space: the meals closest to going off go in first. Use the buttons to choose.</p>':''):cap?'<p class="room empty">Empty.</p>':'');
    if(out||!cap)t+=shelf('🌡️ Counter',FD.keepDaysRoom+' days',out?'<div class="room">'+out+'</div>':'<p class="room empty">Empty. Buy meals at the Supermarket.</p>');
    if(bad)t+=shelf('🤢 Spoiled',sg(FD.spoiledHealth)+' health each',' <div class="room">'+bad+'</div>');
    if(S.chips)t+=shelf('🥔 Snacks',S.chips+' / '+FD.chips.maxStored,'<div class="room"><div class="thing"><span>🥔</span><small><b>Bag of chips</b> × '+S.chips+'</small></div></div>');
    if((S.tickets||[]).length)t+=shelf('🎟️ Lottery tickets','','<div class="room">'+S.tickets.map(function(x){return '<div class="thing"><span>🎟️</span><small>Draw day '+x.draw+'</small></div>'}).join('')+'</div>');
    return t;
  }
