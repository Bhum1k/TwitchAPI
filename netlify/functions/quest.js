const axios = require('axios');

const data = [['42 Signature Blend English Tea', 'Quests: 1x FIR for the quest Collector'], ['Aramid fiber fabric', 'Quests: 5x FIR for the quest Textile - Part 1'], ['Battered antique book', 'Quests: 1x FIR for the quest Collector'], ['BEAR Buddy plush toy', 'Quests: 1x FIR for the quest Collector'], ["Can of Dr. Lupo's coffee beans", 'Quests: 1x FIR for the quest Collector'], ['Can of Majaica coffee beans', 'Hideout: 3x for Nutrition Unit level 3'], ['Cordura polyamide fabric', 'Quests: 10x FIR for the quest Textile - Part 2'], ['Fleece fabric', 'Quests: 10x FIR for the quest Textile - Part 2, Hideout: 1x for the Defective Wall level 2, 5x for Hall of Fame level 1'], ['FP-100 filter absorber', 'Hideout: Used to run the Air Filtering Unit'], ['Gas mask air filter', 'Hideout: 5x for Air Filtering Unit'], ['Gunpowder "Kite"', 'Quests: 3 are used in the quest Health Care Privacy - Part 5'], ['Loot Lord plushie', 'Quests: 1x FIR for the quest Collector'], ['Malboro Cigarettes', 'Quests: 5x FIR for the quest Bad Habit'], ['OFZ 30x160mm shell', 'Quests: 5x FIR for the quest Regulated Materials'], ['Paracord', 'Quests: 3x FIR for the quest Textile - Part 1'], ['Press pass (issued for NoiceGuy)', 'Quests: 1x FIR for the quest Collector'], ['Ripstop fabric', 'Quests: 10x FIR for the quest Textile - Part 1'], ['Strike Cigarettes', 'Quests: 5x FIR for the quest Bad Habit'], ['Water filter', 'Hideout: Used to run the Water Collector'], ['Weapon parts', 'Hideout: 3x for Workbench level 2, 5x for Weapon Rack level 2'], ['Wilston cigarettes', 'Quests: 5x FIR for the quest Bad Habit'], ['Analog thermometer', 'Hideout: 2x for Booze Generator'], ['Bolts', 'Hideout: 2x for Gym, 1x for the Shooting Range level 1, 10x for Stash level 4, 5x for Water Collector level 1, 2x for Workbench level 1, 6x for Workbench level 2, 15x for Weapon Rack level 1'], ['Corrugated hose', 'Quests: 2x FIR for the quest Spa Tour - Part 3, 2x FIR for the quest Spa Tour - Part 7, Hideout: 5x for Booze Generator, 2x for Defective Wall level 6, 3x for Lavatory level 2, 6x for Lavatory level 3, 2x for Nutrition Unit level 2, 4x for Water Collector level 1, 6x for Water Collector level 2'], ['Duct tape', 'Hideout: 1x for the Defective Wall level 6, 1x for the Rest Space level 1, 3x for Water Collector level 1, 5x for Weapon Rack level 2, 3x for Hall of Fame level 2'], ['Insulating tape', 'Quests: 1x FIR for the quest Key to the Tower, Hideout: 1x for the Gym, 5x for Weapon Rack level 1, 2x for Hall of Fame level 1'], ['KEKTAPE duct tape', 'Quests: 5x FIR for the quest Textile - Part 2, Hideout: 1x for the Lavatory level 2, 2x for Water Collector level 2, 5x for Weapon Rack level 3, 3x for Hall of Fame level 3'], ['Metal spare parts', 'Hideout: 2x for Booze Generator, 5x for Defective Wall level 3, 7x for Generator level 3, 1x for the Shooting Range level 1, 5x for Shooting Range level 2, 5x for Shooting Range level 3, 2x for Vents level 2, 5x for Vents level 3, 5x for Weapon Rack level 2, 10x for Weapon Rack level 3, 15x for Hall of Fame level 3'], ['Military corrugated tube', 'Hideout: 3x for Air Filtering Unit, 2x for Heating level 3'], ['Pack of nails', 'Hideout: 5x for Stash level 2, 7x for Stash level 3, 5x for Weapon Rack level 1, 5x for Hall of Fame level 1'], ['Pack of screws', 'Hideout: 5x for Lavatory level 2, 3x for Shooting Range level 2, 10x for Stash level 2, 15x for Stash level 3, 10x for Weapon Rack level 2, 6x for Hall of Fame level 2'], ['Piece of plexiglass', 'Quests: 2x FIR for the quest Key to the Tower'], ['Pressure gauge', 'Hideout: 10x for Bitcoin Farm level 3, 2x for Booze Generator, 2x for Lavatory level 3'], ['Screw nuts', 'Hideout: 3x for Gym, 1x for the Shooting Range level 1, 10x for Stash level 4, 5x for Water Collector level 1, 2x for Workbench level 1'], ['Shustrilo sealing foam', 'Hideout: 5x for Stash level 4, 5x for Water Collector level 3, 3x for Weapon Rack level 3'], ['Silicone tube', 'Hideout: 15x for Bitcoin Farm level 3, 4x for Booze Generator'], ['Tube of Poxeram cold welding', 'Hideout: 1x for the Shooting Range level 2, 3x for Weapon Rack level 2'], ['Xenomorph sealing foam', 'Hideout: 1x for the Defective Wall level 6, 3x for Lavatory level 3, 3x for Weapon Rack level 1, 2x for Hall of Fame level 2'], ['Broken GPhone smartphone', 'Quests: 3 x FIR for the quest Signal - Part 2, 4 x FIR for the quest Network Provider - Part 1'], ['Bundle of wires', 'Quests: 5 x FIR for the quest Fertilizers, Hideout: 2x for Defective Wall level 6, 15x for Generator level 2, 8x for Heating level 3, 10x for Illumination level 2, 6x for Illumination level 3, 7x for Rest Space level 3, 4x for Security level 3, 3x for Shooting Range level 2, 5x for Shooting Range level 3, 14x for Vents level 3, 10x for Weapon Rack level 2, 15x for Weapon Rack level 3'], ['Capacitors', 'Quests: 5 x FIR for the quest Fertilizers, Hideout: 7x for Illumination level 3, 5x for Rest Space level 3, 5x for Shooting Range level 3'], ['CPU fan', 'Quests: 15x FIR for the quest Farming - Part 4, Hideout: 15x for Bitcoin Farm level 1, 15x for Bitcoin Farm level 2, 25x for Bitcoin Farm level 3, 3x for Vents level 2'], ['Damaged hard drive', 'Hideout: 4x for intelligence Center level 2'], ['DVD drive', 'Hideout: 1x for the Rest Space level 2'], ['Electric drill', 'Hideout: 1x for the Gym, 1x for the Lavatory level 2, 2x for Stash level 2, 1x for the Shooting Range level 2, 2x for Workbench level 2, 1x for the Weapon Rack level 2, 1x for the Weapon Rack level 3, 1x for the Hall of Fame level 3'], ['Electric motor', 'Hideout: 10x for Bitcoin Farm level 3, 1x for the Generator level 2, 3x for Generator level 3, 6x for Shooting Range level 2, 1x for the Vents level 2, 4x for Vents level 3, 2x for Water Collector level 2'], ['Electronic components', 'Quests: 4x FIR for the quest Network Provider - Part 1'], ['Energy-saving lamp', 'Hideout: 12x for Illumination level 3, 3x for Rest Space level 2, 6x for Shooting Range level 2, 5x for Weapon Rack level 2, 10x for Weapon Rack level 2, 15x for Weapon Rack level 3, 10x for Hall of Fame level 2, 15x for Hall of Fame level 3'], ['Advanced current converter', 'Hideout: 1x for the Solar Power'], ['Far-forward GPS Signal Amplifier Unit', 'Hideout: 1x for the Intelligence Center level 3'], ['Gas analyzer', 'Quests: 1 x FIR for the quest Sanitary Standards - Part 1, 2 x FIR for the quest Sanitary Standards - Part 2, 4 x FIR for the quest Network Provider - Part 1'], ['Golden 1GPhone smartphone', 'Quests: 1x FIR for the quest Collector'], ['Graphics card', 'Quests: 3 x FIR for the quest Farming - Part 4'], ['Light bulb', 'Hideout: 2x for Defective Wall level 6, 14x for Illumination level 2, 5x for Hall of Fame level 1'], ['Magnet', 'Hideout: 1x for the Rest Space level 2'], ['Military cable', 'Hideout: 5x for Intelligence Center level 3, 10x for Solar Power'], ['Military circuit board', 'Quests: 2x FIR for the quest Key to the Tower'], ['Military COFDM Wireless Signal Transmitter', 'Quests: 1 x FIR for the quest Lend-Lease - Part 2, 5 x FIR for the quest Special Equipment, 4 x FIR for the quest Network Provider - Part 1, 1 x FIR for the quest Key to the Tower, Hideout: 2x for Intelligence Center level 3'], ['Military power filter', 'Hideout: 5x for Air Filtering Unit, 2x for Bitcoin Farm level 2, 10x for Solar Power'], ['NIXXOR lens', 'Hideout: 8x for Security level 3'], ['PC CPU', 'Quests: 3x FIR for the quest Signal - Part 2'], ['Phase control relay', 'Hideout: 5x for Bitcoin Farm level 2, 5x for Generator level 2, 6x for Generator level 3, 4x for Heating level 3, 2x for Nutrition Unit level 1, 1x for the Nutrition Unit level 2, 3x for Shooting Range level 3'], ['Phased array element', 'Hideout: 4x for Solar Power'], ['Power cord', 'Quests: 2 x FIR for the quest Farming - Part 2, Hideout: 10x for Bitcoin Farm level 1, 7x for Intelligence Center level 2, 1x for the Nutrition Unit level 1, 4x for Rest Space level 3, 5x for Shooting Range level 3, 5x for Hall of Fame level 3'], ['Power supply unit', 'Hideout: 10x for Bitcoin Farm level 1, 10x for Bitcoin Farm level 2, 5x for Generator level 3'], ['Printed circuit board', 'Quests: 2 x FIR for the quest Farming - Part 2, 3 x FIR for the quest Signal - Part 2, Hideout: 15x for Bitcoin Farm level 2, 3x for Shooting Range level 3, 5x for Vents level 3'], ['Radiator helix', 'Hideout: 3x for Booze Generator, 8x for Heating level 3'], ['Spark plug', 'Quests: 8 x FIR for the quest Car Repair, Hideout: 1x for the Generator level 1, 10x for Generator level 3'], ['T-Shaped plug', 'Quests: 4 x FIR for the quest Farming - Part 2, Hideout: 5x for Bitcoin Farm level 1, 3x for Hall of Fame level 3'], ['UHF RFID Reader', 'Quests: 1 x FIR for the quest Import, 5x FIR for the quest Special Equipment'], ['Virtex programmable processor', 'Quests: 2x FIR for the quest Lend-Lease - Part 2, 5x FIR for the quest Special Equipment'], ['VPX Flash Storage Module', 'Quests: 1x FIR for the quest Import, 5x FIR for the quest Special Equipment, Hideout: 1x for the Bitcoin Farm level 1, 2x for Intelligence Center level 3'], ['Working LCD', 'Quests: 1x FIR for the quest Key to the Tower, Hideout: 2x for Security level 3, 3x for Solar Power'], ['6-STEN-140-M military battery', 'Quests: 1x FIR for the quest Regulated Materials, Hideout: 1x for the Bitcoin Farm level 3'], ['Car battery', 'Quests: 4x FIR for the quest Car Repair, Hideout: 1x for the Vents level 2, 4x for Vents level 3'], ['GreenBat lithium battery', 'Hideout: 5x for Rest Space level 3'], ['Rechargeable battery', 'Quests: 3x FIR for the quest Signal - Part 2'], ['Can of thermite', 'Hideout: 2x for Workbench level 3'], ['Classic matches', 'Hideout: 2x for Heating level 1, 1x for the Rest Space level 1'], ['Crickent lighter', 'Hideout: 3x for Heating level 2, 1x for the Illumination level 1'], ['Dry fuel', 'Hideout: 3x for Heating level 2'], ['Expeditionary fuel tank', 'Hideout: Can be used as fuel to run the Generator'], ['#FireKlean gun lube', 'Quests: 1x FIR for the quest Collector, Hideout: 1x for the Workbench level 3, 1x for the Weapon Rack level 3'], ['Fuel conditioner', 'Quests: 4x FIR for the quest The Blood of War - Part 2'], ['Hunting matches', 'Hideout: 2x for Heating level 2'], ['Metal fuel tank', 'Hideout: Can be used as fuel to run the Generator'], ['Propane tank (5L)', 'Quests: 2x FIR for the quest Spa Tour - Part 7'], ['TP-200 TNT brick', 'Hideout: 1x for the Security level 2'], ['WD-40 100ml', 'Quests: 1x FIR for the quest Spa Tour - Part 3, Hideout: 1x for the Gym, 1x for the Security level 2, 4x for Stash level 2'], ['Alkaline cleaner for heat exchangers', 'Quests: 2x FIR for the quest Spa Tour - Part 7, Hideout: 2x for Nutrition Unit level 2'], ['Can of white salt', 'Hideout: 1x for the Nutrition Unit level 1'], ['Clin window cleaner', 'Quests: 2x FIR for the quest Spa Tour - Part 3'], ["Deadlyslob's beard oil", 'Quests: 1x FIR for the quest Collector'], ["LVNDMARK's rat poison", 'Quests: 1x FIR for the quest Collector'], ['Ortodontox toothpaste', 'Hideout: 2x for Hall of Fame level 2'], ['Ox bleach', 'Quests: 3x FIR for the quest Spa Tour - Part 3'], ['Pack of sodium bicarbonate', 'Hideout: 3x for Nutrition Unit level 3'], ['Smoked Chimney drain cleaner', 'Hideout: 2x for Nutrition Unit level 3'], ['Soap', 'Hideout: 1x for the Lavatory level 1'], ['Toilet paper', 'Quests: 1 is used in the quest Provocation, Hideout: 1x for the Lavatory level 1'], ['Toothpaste', 'Hideout: 1x for the Lavatory level 1'], ['Bottle of OLOLO Multivitamins', 'Quests: 10x FIR for the quest Crisis, Hideout: 1x for the Medstation level 1'], ['Bottle of saline solution', 'Hideout: 3x for Medstation level 2, 4x for Medstation level 3'], ['Disposable syringe', 'Hideout: 1x for the Medstation level 1'], ['LEDX Skin Transilluminator', 'Quests: 1x FIR for the quest Private Clinic, 2x FIR for the quest Crisis, Hideout: 1x for the Medstation level 3'], ['Medical bloodset', 'Quests: 3x FIR for the quest Vitamins - Part 2, Hideout: 2x for Medstation level 2'], ['Medical tools', 'Hideout: 3x for Medstation level 2'], ['Ophthalmoscope', 'Quests: 1x FIR for the quest Private Clinic, 3x FIR for the quest Crisis, Hideout: 1x for the Medstation level 3'], ['Pile of meds', 'Quests: 20x FIR for the quest Crisis, Hideout: 1x for the Medstation level 1'], ['Portable defibrillator', 'Quests: 1x FIR for the quest Ambulance, 3x FIR for the quest Crisis'], ['Awl', 'Hideout: 1x for the Lavatory level 1'], ['Bulbex cable cutter', 'Hideout: 1x for the Generator level 2'], ['Construction measuring tape', 'Hideout: 1x for the Security level 1, 1x for the Shooting Range level 2'], ['Fierce Blow sledgehammer', 'Hideout: 1x for the Defective Wall level 4'], ['Hand drill', 'Hideout: 1x for the Stash level 2, 1x for the Weapon Rack level 1'], ['Metal cutting scissors', 'Hideout: 1x for the Defective Wall level 5, 1x for the Gym, 1x for the Weapon Rack level 1'], ['Old firesteel', 'Quests: 1x FIR for the quest Collector'], ['Pipe grip wrench', 'Hideout: 1x for the Booze Generator'], ['Pliers Elite', 'Hideout: 1x for the Defective Wall level 6, 1x for the Security level 2, 2x for Water Collector level 3, 2x for Workbench level 3, 1x for the Hall of Fame level 2'], ['Ratchet wrench', 'Hideout: 2x for Stash level 4, 1x for the Water Collector level 3'], ['Set of files "Master"', 'Hideout: 1x for the Workbench level 2, 1x for the Shooting Range level 3, 1x for the Weapon Rack level 2, 1x for the Hall of Fame level 3'], ['Sewing kit', 'Hideout: 2x for Lavatory level 2'], ['Toolset', 'Quests: 2 are used in the quest Farming - Part 1, Hideout: 1x for the Gym, 1x for the Defective Wall level 5, 1x for the Defective Wall level 6, 1x for the Lavatory level 3, 1x for the Shooting Range level 2, 2x for Water Collector level 2, 3x for Workbench level 2, 1x for the Hall of Fame level 2'], ['Wrench', 'Hideout: 4x for Nutrition Unit level 2'], ['Antique teapot', 'Quests: 3x FIR for the quest Living High is Not a Crime - Part 2'], ['Antique vase', 'Quests: 2x FIR for the quest Living High is Not a Crime - Part 2'], ['Axel parrot figurine', 'Quests: 1x FIR for the quest Collector, 1x FIR for the quest Living High is Not a Crime - Part 2'], ['Bronze lion figurine', 'Quests: 2x FIR for the quest Living High is Not a Crime - Part 1, Hideout: 3x for Scav Case, 1x for the Hall of Fame level 3'], ['Cat figurine', 'Quests: 1x FIR for the quest Living High is Not a Crime - Part 1, Hideout: 1x for the Hall of Fame level 1'], ['Chainlet', 'Hideout: 2x for Library'], ['Gold skull ring', 'Hideout: 6x for Scav Case'], ['Golden egg', 'Quests: 1x FIR for the quest Collector, 1x FIR for the quest Living High is Not a Crime - Part 1'], ['Golden neck chain', 'Quests: 9 are used in the quest Chumming, Hideout: 8x for Scav Case'], ['Golden rooster figurine', 'Quests: 1x FIR for the quest Collector, Hideout: 1x for the Scav case, 1x for the Hall of Fame level 2'], ['Horse figurine', 'Quests: 2x FIR for the quest Living High is Not a Crime - Part 1, Hideout: 1x for the Library'], ['Raven figurine', 'Quests: 1x FIR for the quest Collector, 2x FIR for the quest Living High is Not a Crime - Part 2'], ['Roler Submariner gold wrist watch', 'Quests: 1x FIR for the quest Living High is Not a Crime - Part 1, 1 used in the quest Bullshit, Hideout: 4x for Scav Case'], ['Silver Badge', 'Quests: 1x FIR for the quest Collector'], ['Veritas guitar pick', 'Quests: 1x FIR for the quest Collector'], ['BakeEzy cook book', 'Quests: 1x FIR for the quest Collector, Hideout: 1x for the Library'], ['Diary', 'Hideout: 2x for Library'], ['Intelligence folder', 'Hideout: 1x for the Intelligence Center level 1, 3x for Intelligence Center level 2'], ['Military flash drive', 'Quests: 4x FIR for the quest Special Equipment, Hideout: 5x for Intelligence Center level 3'], ['Secure Flash drive', 'Quests: 2x FIR for the quest Whats on the Flash Drive?, 3x FIR for the quest Shady Business, Hideout: 3x for Intelligence Center level 2'], ['Secure magnetic tape cassette', 'Hideout: 2x for Intelligence Center level 3'], ['Slim diary', 'Hideout: 2x for Library'], ['SSD drive', 'Hideout: 1x for the Security level 3'], ['Tech manual', 'Hideout: 5x for Library, 1x for the Shooting Range level 3, 1x for the Weapon Rack level 3, 1x for the Hall of Fame level 2'], ['TerraGroup "Blue Folders" materials', '2 are used in the quest Return the Favor'], ['Topographic survey maps', 'Hideout: 1x for the Intelligence Center level 1'], ['Video cassette with the Cyborg Killer movie', 'Quests: 1x FIR for the quest Collector'], ['Digital secure DSP radio transmitter', 'Quests: 1 is needed in the quest Getting Acquainted (received upon accepting the quest Knock-Knock).'], ['Leatherman Multitool', 'Quests: 1 is used in the quest Fishing Gear (received upon accepting the quest)., Hideout: 1x for the Workbench level 1, 1x for the Shooting Range level 3'], ['Radio repeater', 'Quests: 4 are used in the quest Network Provider - Part 2'], ['Signal Jammer', 'Quests: 1 is used in the quest Broadcast - Part 1, 3 are used in the quest Signal - Part 3'], ['WI-FI Camera', 'Quests: 1 is used in the quest Drug Trafficking, 3 are used in the quest Informed Means Armed, Hideout: 3x for Shooting range level 2'], ['AK-74 5.45x39 6L31 60-round magazine', 'Quests: 3x FIR for the quest Ice Cream Cones, 1x for the quest Gunsmith - Part 2, 1x for the quest Gunsmith - Part 10'], ['Lower half-mask', 'Quests: 7x FIR for the quest The Punisher - Part 2'], ['Bars A-2607 95Kh18 knife', 'Quests: 5x FIR for the quest The Punisher - Part 4'], ['Kalashnikov AK-74N 5.45x39 assault rifle', 'Quests: 1x FIR for the quest The Punisher - Part 5'], ['Colt M4A1 5.56x45 assault rifle', 'Quests: 1x FIR for the quest The Punisher - Part 5, 1x for the quest Gunsmith - Part 7, 1x for the quest Gunsmith - Part 22'], ['Makarov PM 9x18PM pistol', 'Quests: 2x FIR for the quest The Punisher - Part 5'], ['BNTI Module-3M body armor', 'Quests: 1x FIR for the quest Supplier'], ['TOZ-106 20ga bolt-action shotgun', '1x FIR for the quest Supplier'], ['Respirator', 'Quests: 4x FIR for the quest Vitamins - Part 2'], ['Cultist knife', 'Quests: 12x FIR for the quest Night Sweep, 1x needs to be stashed for the quest Broadcast - Part 5'], ['SV-98 7.62x54R bolt-action sniper rifle', 'Quests: 1x needs to be stashed for the quest Bullshit., 1x needs to be stashed for the quest Fishing Gear (received upon accepting the quest).'], ['Ushanka ear flap hat', 'Quests: 2x FIR for the quest Dressed to Kill'], ['Kinda cowboy hat', 'Quests: 2x FIR for the quest Dressed to Kill'], ['Ski hat with holes for eyes', 'Quests: 1x FIR for the quest Sew it Good - Part 1'], ['Pilgrim tourist backpack', 'Quests: 1x FIR for the quest Sew it Good - Part 1'], ['BlackRock chest rig (Gray)', 'Quests: 2x FIR for the quest Sew it Good - Part 4'], ['WARTECH TV-109 + TV-106 chest rig (A-TACS FG)', 'Quests: 2x FIR for the quest Sew it Good - Part 4'], ['Bottle of Tarkovskaya vodka', 'Quests: 10x FIR for the quest Booze'], ['Bottle of Dan Jackiel whiskey', 'Quests: 10x FIR for the quest Booze'], ['Bottle of Pevko Light beer', 'Quests: 20x FIR for the quest Booze'], ['Canister with purified water', 'Quests: 3x FIR for the quest Booze'], ['Iskra ration pack', 'Quests: 3x FIR for the quest Acquaintance, 2x need to be used for the quest The Survivalist Path - Thrifty'], ['Pack of instant noodles', 'Quests: 2x FIR for the quest Acquaintance'], ['Can of beef stew (Small)', 'Quests: 15x FIR for the quest General Wares'], ['TT-33 7.62x25 TT pistol (Golden)', 'Quests: 1x FIR for the quest The Huntsman Path - Trophy'], ['Maska-1SCh bulletproof helmet (Killa Edition)', 'Quests: 1x FIR for the quest The Huntsman Path - Sellout'], ["Shturman's stash key", 'Quests: 1x FIR for the quest The Huntsman Path - Woods Keeper'], ['CMS surgical kit', 'Quests: 2x FIR for the quest Ambulance'], ['BOSS cap', 'Quests: 1x FIR for the quest The Huntsman Path - Factory Chief'], ['Salty Dog beef sausage', 'Quests: 1x FIR for the quest The Delicious Sausage, 1x needs to be stashed for the quest Provocation'], ['Bottle of water (0.6L)', 'Quests: 2x need to be used for the quest The Survivalist Path - Thrifty'], ['Can of sprats', 'Quests: 1x FIR for the quest Collector'], ['Jar of DevilDog mayo', 'Quests: 1x FIR for the quest Collector'], ['DRD body armor', 'Quests: 1x FIR for the quest Collector'], ['Kotton beanie', 'Quests: 1x FIR for the quest Collector'], ['Shroud half-mask', 'Quests: 1x FIR for the quest Collector'], ['Armband (Evasion)', 'Quests: 1x FIR for the quest Collector'], ['Gingy keychain', 'Quests: 1x FIR for the quest Collector'], ['Glorious E lightweight armored mask', 'Quests: 1x FIR for the quest Collector'], ['JohnB Liquid DNB glasses', 'Quests: 1x FIR for the quest Collector'], ['Can of beef stew (Large)', 'Quests: 2x FIR for the quest Acquaintance'], ['M.U.L.E. stimulant injector', 'Quests: 1x FIR for the quest Samples'], ['Obdolbos cocktail injector', 'Quests: 1x FIR for the quest Samples'], ['Meldonin injector', 'Quests: 1x FIR for the quest Samples'], ['AHF1-M stimulant injector', 'Quests: 1x FIR for the quest Samples'], ['P22 (Product 22) stimulant injector', 'Quests: 1x FIR for the quest Samples'], ['L1 (Norepinephrine) injector', 'Quests: 1x FIR for the quest Samples'], ['3-(b-TG) stimulant injector', 'Quests: 1x FIR for the quest Samples, ']];
const searchterms = ['42 Signature Blend English Tea', 'Aramid fiber fabric', 'Battered antique book', 'BEAR Buddy plush toy', "Can of Dr. Lupo's coffee beans", 'Can of Majaica coffee beans', 'Cordura polyamide fabric', 'Fleece fabric', 'FP-100 filter absorber', 'Gas mask air filter', 'Gunpowder "Kite"', 'Loot Lord plushie', 'Malboro Cigarettes', 'OFZ 30x160mm shell', 'Paracord', 'Press pass (issued for NoiceGuy)', 'Ripstop fabric', 'Strike Cigarettes', 'Water filter', 'Weapon parts', 'Wilston cigarettes', 'Analog thermometer', 'Bolts', 'Corrugated hose', 'Duct tape', 'Insulating tape', 'KEKTAPE duct tape', 'Metal spare parts', 'Military corrugated tube', 'Pack of nails', 'Pack of screws', 'Piece of plexiglass', 'Pressure gauge', 'Screw nuts', 'Shustrilo sealing foam', 'Silicone tube', 'Tube of Poxeram cold welding', 'Xenomorph sealing foam', 'Broken GPhone smartphone', 'Bundle of wires', 'Capacitors', 'CPU fan', 'Damaged hard drive', 'DVD drive', 'Electric drill', 'Electric motor', 'Electronic components', 'Energy-saving lamp', 'Advanced current converter', 'Far-forward GPS Signal Amplifier Unit', 'Gas analyzer', 'Golden 1GPhone smartphone', 'Graphics card', 'Light bulb', 'Magnet', 'Military cable', 'Military circuit board', 'Military COFDM Wireless Signal Transmitter', 'Military power filter', 'NIXXOR lens', 'PC CPU', 'Phase control relay', 'Phased array element', 'Power cord', 'Power supply unit', 'Printed circuit board', 'Radiator helix', 'Spark plug', 'T-Shaped plug', 'UHF RFID Reader', 'Virtex programmable processor', 'VPX Flash Storage Module', 'Working LCD', '6-STEN-140-M military battery', 'Car battery', 'GreenBat lithium battery', 'Rechargeable battery', 'Can of thermite', 'Classic matches', 'Crickent lighter', 'Dry fuel', 'Expeditionary fuel tank', '#FireKlean gun lube', 'Fuel conditioner', 'Hunting matches', 'Metal fuel tank', 'Propane tank (5L)', 'TP-200 TNT brick', 'WD-40 100ml', 'Alkaline cleaner for heat exchangers', 'Can of white salt', 'Clin window cleaner', "Deadlyslob's beard oil", "LVNDMARK's rat poison", 'Ortodontox toothpaste', 'Ox bleach', 'Pack of sodium bicarbonate', 'Smoked Chimney drain cleaner', 'Soap', 'Toilet paper', 'Toothpaste', 'Bottle of OLOLO Multivitamins', 'Bottle of saline solution', 'Disposable syringe', 'LEDX Skin Transilluminator', 'Medical bloodset', 'Medical tools', 'Ophthalmoscope', 'Pile of meds', 'Portable defibrillator', 'Awl', 'Bulbex cable cutter', 'Construction measuring tape', 'Fierce Blow sledgehammer', 'Hand drill', 'Metal cutting scissors', 'Old firesteel', 'Pipe grip wrench', 'Pliers Elite', 'Ratchet wrench', 'Set of files "Master"', 'Sewing kit', 'Toolset', 'Wrench', 'Antique teapot', 'Antique vase', 'Axel parrot figurine', 'Bronze lion figurine', 'Cat figurine', 'Chainlet', 'Gold skull ring', 'Golden egg', 'Golden neck chain', 'Golden rooster figurine', 'Horse figurine', 'Raven figurine', 'Roler Submariner gold wrist watch', 'Silver Badge', 'Veritas guitar pick', 'BakeEzy cook book', 'Diary', 'Intelligence folder', 'Military flash drive', 'Secure Flash drive', 'Secure magnetic tape cassette', 'Slim diary', 'SSD drive', 'Tech manual', 'TerraGroup "Blue Folders" materials', 'Topographic survey maps', 'Video cassette with the Cyborg Killer movie', 'Digital secure DSP radio transmitter', 'Leatherman Multitool', 'Radio repeater', 'Signal Jammer', 'WI-FI Camera', 'AK-74 5.45x39 6L31 60-round magazine', 'Lower half-mask', 'Bars A-2607 95Kh18 knife', 'Kalashnikov AK-74N 5.45x39 assault rifle', 'Colt M4A1 5.56x45 assault rifle', 'Makarov PM 9x18PM pistol', 'BNTI Module-3M body armor', 'TOZ-106 20ga bolt-action shotgun', 'Respirator', 'Cultist knife', 'SV-98 7.62x54R bolt-action sniper rifle', 'Ushanka ear flap hat', 'Kinda cowboy hat', 'Ski hat with holes for eyes', 'Pilgrim tourist backpack', 'BlackRock chest rig (Gray)', 'WARTECH TV-109 + TV-106 chest rig (A-TACS FG)', 'Bottle of Tarkovskaya vodka', 'Bottle of Dan Jackiel whiskey', 'Bottle of Pevko Light beer', 'Canister with purified water', 'Iskra ration pack', 'Pack of instant noodles', 'Can of beef stew (Small)', 'TT-33 7.62x25 TT pistol (Golden)', 'Maska-1SCh bulletproof helmet (Killa Edition)', "Shturman's stash key", 'CMS surgical kit', 'BOSS cap', 'Salty Dog beef sausage', 'Bottle of water (0.6L)', 'Can of sprats', 'Jar of DevilDog mayo', 'DRD body armor', 'Kotton beanie', 'Shroud half-mask', 'Armband (Evasion)', 'Gingy keychain', 'Glorious E lightweight armored mask', 'JohnB Liquid DNB glasses', 'Can of beef stew (Large)', 'M.U.L.E. stimulant injector', 'Obdolbos cocktail injector', 'Meldonin injector', 'AHF1-M stimulant injector', 'P22 (Product 22) stimulant injector', 'L1 (Norepinephrine) injector', '3-(b-TG) stimulant injector'];
exports.handler = async function (event, context) {
    try {
        // Extract the query term from the request
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

        // If query term is provided, add it to the URL
        const baseUrl = "https://calm-figolla-de51de.netlify.app/.netlify/functions/quest";
        const url = queryTerm ? `${baseUrl}?query=${encodeURIComponent(queryTerm)}` : baseUrl;

        const yourProcessedData = queryTerm;

        let output = "FILL";
        let searchIndex = -1;
        let notes = "";
        if (queryTerm.length != 0) {
            marketUrl = `https://api.tarkov-market.app/api/v1/nightbot?x-api-key=6dJ67FuraCJjcxjd&q=${queryTerm}`;
            try {
                priceResponse = await axios.get(marketUrl);
                marketData = priceResponse.data;
                console.log(marketData);
                output = marketData;
                if (marketData.includes("₽")) {
                    let array = marketData.split(" ");
                    concatenated = array.slice(0, -1).join(" ");
                    searchIndex = searchData(concatenated);
                    notes = data[searchIndex][1];
                    notes = notes.replace(", Hideout:", " | Hideout:");
                    output = (data[searchIndex][0]).concat(" -> ", notes);
                }
            }
            catch (error) {
                output = concatenated.concat(" is not needed for quests or hideout");
            }

        } else {
            output = "";
        }

        return {
            statusCode: 200,
            body: output,
            headers: {
                'Content-Type': 'text/plain',
            }
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error", error: error.message }),
        };
    };
}

function searchData(query) {
    // Convert the query to lowercase for case-insensitive matching
    const lowercaseQuery = query.toLowerCase();

    // Split the query into individual terms
    const queryTerms = lowercaseQuery.split(/\s+/);

    // Initialize variables to store the best match and its index
    let bestMatch = '';
    let bestMatchIndex = -1;

    // Loop through the array to find the best match
    for (let i = 0; i < searchterms.length; i++) {
        const currentTerm = searchterms[i].toLowerCase();

        // Check if all query terms are present in the current term
        const allTermsPresent = queryTerms.every(term => currentTerm.includes(term));

        if (allTermsPresent) {
            // Update the best match if the current term is a better match
            if (currentTerm.length > bestMatch.length) {
                bestMatch = currentTerm;
                bestMatchIndex = i;
            }
        }
    }

    // Return the index of the best match
    return bestMatchIndex;
}

const searchQuery = 'Bundle of wires';
const resultIndex = searchData(searchQuery);

// Display the result
if (resultIndex === -1) {
    console.log(`No matches found for '${searchQuery}'.`);
} else {
    console.log(`The most suitable match for '${searchQuery}' is at index ${resultIndex}.`);
}