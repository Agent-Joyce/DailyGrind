/* Daily Grind game code. One closure, in this order (search for the numbered banners; CODE_MAP.md has more detail):
     1. CONFIG                   every tunable number
     2. WORLD TABLES             ranks, difficulty, icons, buildings, homes, items, jobs, School pathways, careers
     3. STATE AND SAVES          blank() state, new game, save, load (migrations), game over
     4. PLAYER ACTIONS           sound and feedback, time and money, work, study, shopping, food, bank, walking, gym, leisure, Factory
     5. HEALTH, STRESS, NIGHT    illness, health, burnout, game-over checks, the overnight rollover
     6. EVENTS AND ECONOMY       news, decisions, macro trends and shocks, storylines, mini stories, the end-of-day card
     7. PANELS                   panel building blocks and every building's panel
     8. MAP ART AND DIALOGUE     building illustrations and shopkeeper lines
     9. RENDER                   repainting the screen from S
    10. MAP LAYOUT AND INPUT     town map drawing, keyboard, buttons (the ACTIONS table), Rules text
    11. ADD-ONS                  clock, trend arrows, toasts, action preview, recap, starting traits
    12. START                    load the saved game or start a new one */
(function(){
