const axios = require('axios');

const searchterms = ['.45 ACP FMJ', '.45 ACP AP', '.45 ACP Hydra-Shok', '.45 ACP Lasermatch FMJ', '.45 ACP RIP', '12.7x108 mm  B-32', '12.7x108 mm BZT-44M', '12.7x55 mm PS12', '12.7x55 mm PS12A', '12.7x55 mm PS12B', '12/70 7 mm Buckshot', '12/70 5.25 mm Buckshot', '12/70 6.5 mm "Express" Buckshot', '12/70 8.5 mm "Magnum" Buckshot', '12/70 Dual Sabot Slug', '12/70 Flechette', '12/70 Piranha', '12/70 RIP', '12/70 Lead slug', '12/70 Shell with .50 BMG bullet', '12/70 AP-20 Slug', '12/70 FTX Custom LIte Slug', '12/70 Grizzly 40 Slug', '12/70 HP Slug Copper Sabot Premier', '12/70 "Poleva-3" Slug', '12/70 "Poleva-6u" Slug', '12/70 HP Slug "SuperFormance"', '20/70 7.5 mm Buckshot', '20/70 5.6 mm Buckshot', '20/70 6.2 mm Buckshot', '20/70 7.3 mm Buckshot', '20/70 Devastator Slug', '20/70 Slug "Poleva-3"', '20/70 Slug Poleva-6u', '20/70 Star Slug', '23x75 mm "Barrikada" slug', '23x75 mm "Shrapnel-10" buckshot', '23x75 mm "Shrapnel-25" buckshot', '23x75 mm "Zvezda" flashbang round', '.366 ТКМ EKO', '.366 ТКМ FMJ', '.366 ТКМ Geksa', '.366 ТКМ AP-M', '40 mm VOG-25 grenade', '40x46 mm M381 (HE) grenade', '40x46 mm M386 (HE) grenade', '40x46 mm M406 (HE) grenade', '40x46 mm M433 (HEDP) grenade', '40x46 mm M441 (HE) grenade', '40x46 mm M576 (MP-APERS) grenade', '4.6x30 mm Action SX', '4.6x30 mm AP SX', '4.6x30 mm FMJ SX', '4.6x30 mm JSP SX', '4.6x30 mm Subsonic SX', '5.45x39 mm 7N39 "Igolnik"', '5.45x39 mm 7N40', '5.45x39 mm BP', '5.45x39 mm BS', '5.45x39 mm BT', '5.45x39 mm FMJ', '5.45x39 mm HP', '5.45x39 mm PP', '5.45x39 mm PRS', '5.45x39 mm PS', '5.45x39 mm SP', '5.45x39 mm T', '5.45x39 mm US', '5.56x45 mm FMJ', '5.56x45 mm HP', '5.56x45 mm M855', '5.56x45 mm M855A1', '5.56x45 mm M856', '5.56x45 mm M856A1', '5.56x45 mm M995', '5.56x45 mm MK 255 Mod 0 (RRLP)', '5.56x45 mm MK 318 Mod 0 (SOST)', '5.56x45 mm SSA AP', '5.56x45 mm Warmageddon', '5.7x28 mm L191', '5.7x28 mm R37.F', '5.7x28 mm R37.X', '5.7x28 mm SB193', '5.7x28 mm SS190', '5.7x28 mm SS197SR', '5.7x28 mm SS198LF', '7.62x25 mm TT FMJ43', '7.62x25 mm TT LRN', '7.62x25 mm TT LRNPC', '7.62x25 mm TT P gl', '7.62x25 mm TT Pst gzh', '7.62x25 mm TT PT gzh', '7.62x25 mm TT AKBS', '.300 Blackout BCP FMJ', '.300 Blackout AP', '.300 Blackout CBJ', '.300 Blackout M62 Tracer', '.300 Blackout V-Max', '.300 Blackout Whisper', '7.62x39 mm BP', '7.62x39 mm HP', '7.62x39 mm PS', '7.62x39 mm T45M', '7.62x39 mm US', '7.62x39 mm FMJ', '7.62x39 mm MAI AP', '7.62x39 mm PP', '7.62x39 mm SP', '7.62x51 mm M61', '7.62x51 mm M62', '7.62x51 mm M80', '7.62x51 mm BCP FMJ', '7.62x51 mm M993', '7.62x51 mm TCW SP', '7.62x51 mm Ultra Nosler', '7.62x54 mm R  BT Gzh', '7.62x54 mm R  BS Gzh', '7.62x54 mm R  HP BT', '7.62x54 mm R  FMJ', '7.62x54 mm R  SP BT', '7.62x54 mm R  T-46M Gzh', '7.62x54 mm R  PS Gzh', '7.62x54 mm R  LPS Gzh', '7.62x54 mm R  SNB Gzh', '.338 Lapua Magnum AP', '.338 Lapua Magnum FMJ', '.338 Lapua Magnum UCW', '.338 Lapua Magnum TAC-X', '9x18 mm BZhT gzh', '9x18 mm PM PBM gzh', '9x18 mm P mm PstM gzh', '9x18 mm PM PPe gzh', '9x18 mm PM PPT gzh', '9x18 mm PM PRS gs', '9x18 mm PM PSO gzh', '9x18 mm PM Pst gzh', '9x18 mm PM PSV', '9x18 mm PM PS gs PPO', '9x18 mm PM P gzh', '9x18 mm PM RG028 gzh', '9x18 mm PM SP7 gzh', '9x18 mm PM SP8 gzh', '9x19 mm  PBP gzh', '9x19 mm  Green Tracer', '9x19 mm  PSO gzh', '9x19 mm  Pst gzh', '9x19 mm  AP 6.3', '9x19 mm  Luger CCI', '9x19 mm  FMJ M822', '9x19 mm  QuakeMaker', '9x19 mm  RIP', '9x21 mm  PS gzh', '9x21 mm  P gzh', '9x21 mm  PE gzh', '9x21 mm  BT gzh', '.357 Magnum  FMJ', '.357 Magnum  HP', '.357 Magnum  JHP', '.357 Magnum  SP', '9x39 mm  BP gs', '9x39 mm  PAB-9 gs', '9x39 mm  SP-5 gs', '9x39 mm  SP-6 gs', '9x39 mm  SPP gs'];
const ammo = [['.45 ACP FMJ', '72', '25', '83 ₽'], ['.45 ACP AP', '66', '38', '725 ₽'], ['.45 ACP Hydra-Shok', '100', '13', '99 ₽'], ['.45 ACP Lasermatch FMJ', '76', '19', '87 ₽'], ['.45 ACP RIP', '130', '3', '401 ₽'], ['12.7x108 mm  B-32', '182', '88', '820 ₽'], ['12.7x108 mm BZT-44M', '199', '80', '980 ₽'], ['12.7x55 mm PS12', '115', '28', '340 ₽'], ['12.7x55 mm PS12A', '165', '10', '280 ₽'], ['12.7x55 mm PS12B', '102', '46', '2275 ₽'], ['12/70 7 mm Buckshot', '39', '3', '30 ₽'], ['12/70 5.25 mm Buckshot', '37', '1', '35 ₽'], ['12/70 6.5 mm "Express" Buckshot', '35', '3', '39 ₽'], ['12/70 8.5 mm "Magnum" Buckshot', '50', '2', '50 ₽'], ['12/70 Dual Sabot Slug', '85', '17', '68 ₽'], ['12/70 Flechette', '25', '31', '187 ₽'], ['12/70 Piranha', '25', '24', '150 ₽'], ['12/70 RIP', '265', '2', '302 ₽'], ['12/70 Lead slug', '167', '15', '56 ₽'], ['12/70 Shell with .50 BMG bullet', '197', '26', '124 ₽'], ['12/70 AP-20 Slug', '164', '37', '342 ₽'], ['12/70 FTX Custom LIte Slug', '183', '20', '71 ₽'], ['12/70 Grizzly 40 Slug', '190', '12', '66 ₽'], ['12/70 HP Slug Copper Sabot Premier', '206', '14', '82 ₽'], ['12/70 "Poleva-3" Slug', '140', '17', '51 ₽'], ['12/70 "Poleva-6u" Slug', '150', '20', '68 ₽'], ['12/70 HP Slug "SuperFormance"', '220', '5', '192 ₽'], ['20/70 7.5 mm Buckshot', '25', '3', '24 ₽'], ['20/70 5.6 mm Buckshot', '26', '1', '20 ₽'], ['20/70 6.2 mm Buckshot', '22', '2', '30 ₽'], ['20/70 7.3 mm Buckshot', '23', '3', '38 ₽'], ['20/70 Devastator Slug', '198', '5', '180 ₽'], ['20/70 Slug "Poleva-3"', '120', '14', '48 ₽'], ['20/70 Slug Poleva-6u', '135', '17', '65 ₽'], ['20/70 Star Slug', '154', '16', '81 ₽'], ['23x75 mm "Barrikada" slug', '192', '39', '256 ₽'], ['23x75 mm "Shrapnel-10" buckshot', '87', '11', '78 ₽'], ['23x75 mm "Shrapnel-25" buckshot', '78', '10', '96 ₽'], ['23x75 mm "Zvezda" flashbang round', '0', '0', '980 ₽'], ['.366 ТКМ EKO', '73', '30', '65 ₽'], ['.366 ТКМ FMJ', '98', '23', '42 ₽'], ['.366 ТКМ Geksa', '110', '14', '57 ₽'], ['.366 ТКМ AP-M', '90', '42', '463 ₽'], ['40 mm VOG-25 grenade', '199', '0', '6750 ₽'], ['40x46 mm M381 (HE) grenade', '199', '1', '17125 ₽'], ['40x46 mm M386 (HE) grenade', '199', '1', '5600 ₽'], ['40x46 mm M406 (HE) grenade', '199', '1', '7700 ₽'], ['40x46 mm M433 (HEDP) grenade', '199', '1', '10538 ₽'], ['40x46 mm M441 (HE) grenade', '199', '1', '21250 ₽'], ['40x46 mm M576 (MP-APERS) grenade', '160', '5', '256 ₽'], ['4.6x30 mm Action SX', '65', '18', '98 ₽'], ['4.6x30 mm AP SX', '35', '53', '1275 ₽'], ['4.6x30 mm FMJ SX', '43', '40', '124 ₽'], ['4.6x30 mm JSP SX', '46', '32', '402 ₽'], ['4.6x30 mm Subsonic SX', '52', '23', '162 ₽'], ['5.45x39 mm 7N39 "Igolnik"', '37', '62', '1810 ₽'], ['5.45x39 mm 7N40', '52', '44', '2122 ₽'], ['5.45x39 mm BP', '45', '37', '129 ₽'], ['5.45x39 mm BS', '40', '52', '950 ₽'], ['5.45x39 mm BT', '42', '42', '240 ₽'], ['5.45x39 mm FMJ', '56', '21', '36 ₽'], ['5.45x39 mm HP', '74', '12', '68 ₽'], ['5.45x39 mm PP', '44', '36', '108 ₽'], ['5.45x39 mm PRS', '60', '12', '46 ₽'], ['5.45x39 mm PS', '48', '31', '74 ₽'], ['5.45x39 mm SP', '68', '13', '60 ₽'], ['5.45x39 mm T', '57', '20', '40 ₽'], ['5.45x39 mm US', '65', '15', '79 ₽'], ['5.56x45 mm FMJ', '54', '23', '85 ₽'], ['5.56x45 mm HP', '79', '8', '58 ₽'], ['5.56x45 mm M855', '53', '30', '110 ₽'], ['5.56x45 mm M855A1', '49', '44', '784 ₽'], ['5.56x45 mm M856', '59', '23', '128 ₽'], ['5.56x45 mm M856A1', '54', '37', '382 ₽'], ['5.56x45 mm M995', '42', '53', '1505 ₽'], ['5.56x45 mm MK 255 Mod 0 (RRLP)', '63', '18', '135 ₽'], ['5.56x45 mm MK 318 Mod 0 (SOST)', '69', '20', '180 ₽'], ['5.56x45 mm SSA AP', '38', '57', '1723 ₽'], ['5.56x45 mm Warmageddon', '88', '3', '156 ₽'], ['5.7x28 mm L191', '53', '33', '112 ₽'], ['5.7x28 mm R37.F', '98', '8', '185 ₽'], ['5.7x28 mm R37.X', '81', '11', '156 ₽'], ['5.7x28 mm SB193', '59', '27', '143 ₽'], ['5.7x28 mm SS190', '49', '37', '525 ₽'], ['5.7x28 mm SS197SR', '62', '25', '110 ₽'], ['5.7x28 mm SS198LF', '70', '17', '134 ₽'], ['7.62x25 mm TT FMJ43', '60', '11', '50 ₽'], ['7.62x25 mm TT LRN', '64', '8', '48 ₽'], ['7.62x25 mm TT LRNPC', '66', '7', '68 ₽'], ['7.62x25 mm TT P gl', '58', '14', '52 ₽'], ['7.62x25 mm TT Pst gzh', '50', '25', '70 ₽'], ['7.62x25 mm TT PT gzh', '55', '18', '63 ₽'], ['7.62x25 mm TT AKBS', '58', '12', '49 ₽'], ['.300 Blackout BCP FMJ', '60', '30', '79 ₽'], ['.300 Blackout AP', '51', '48', '1215 ₽'], ['.300 Blackout CBJ', '58', '43', '360 ₽'], ['.300 Blackout M62 Tracer', '54', '36', '155 ₽'], ['.300 Blackout V-Max', '72', '20', '125 ₽'], ['.300 Blackout Whisper', '90', '14', '94 ₽'], ['7.62x39 mm BP', '58', '47', '1495 ₽'], ['7.62x39 mm HP', '87', '15', '60 ₽'], ['7.62x39 mm PS', '57', '35', '133 ₽'], ['7.62x39 mm T45M', '64', '30', '58 ₽'], ['7.62x39 mm US', '56', '29', '134 ₽'], ['7.62x39 mm FMJ', '63', '26', '83 ₽'], ['7.62x39 mm MAI AP', '47', '58', '2594 ₽'], ['7.62x39 mm PP', '55', '41', '300 ₽'], ['7.62x39 mm SP', '68', '20', '85 ₽'], ['7.62x51 mm M61', '70', '64', '1960 ₽'], ['7.62x51 mm M62', '79', '44', '1375 ₽'], ['7.62x51 mm M80', '80', '41', '356 ₽'], ['7.62x51 mm BCP FMJ', '83', '35', '150 ₽'], ['7.62x51 mm M993', '67', '70', '2250 ₽'], ['7.62x51 mm TCW SP', '87', '30', '110 ₽'], ['7.62x51 mm Ultra Nosler', '107', '15', '320 ₽'], ['7.62x54 mm R  BT Gzh', '78', '55', '1712 ₽'], ['7.62x54 mm R  BS Gzh', '72', '70', '2625 ₽'], ['7.62x54 mm R  HP BT', '102', '23', '250 ₽'], ['7.62x54 mm R  FMJ', '84', '33', '172 ₽'], ['7.62x54 mm R  SP BT', '92', '27', '243 ₽'], ['7.62x54 mm R  T-46M Gzh', '82', '41', '175 ₽'], ['7.62x54 mm R  PS Gzh', '84', '45', '738 ₽'], ['7.62x54 mm R  LPS Gzh', '81', '42', '478 ₽'], ['7.62x54 mm R  SNB Gzh', '75', '62', '2010 ₽'], ['.338 Lapua Magnum AP', '115', '79', '6625 ₽'], ['.338 Lapua Magnum FMJ', '122', '47', '2412 ₽'], ['.338 Lapua Magnum UCW', '142', '32', '750 ₽'], ['.338 Lapua Magnum TAC-X', '196', '18', '1100 ₽'], ['9x18 mm BZhT gzh', '53', '18', '65 ₽'], ['9x18 mm PM PBM gzh', '40', '28', '71 ₽'], ['9x18 mm P mm PstM gzh', '58', '24', '115 ₽'], ['9x18 mm PM PPe gzh', '61', '7', '51 ₽'], ['9x18 mm PM PPT gzh', '59', '8', '43 ₽'], ['9x18 mm PM PRS gs', '58', '6', '39 ₽'], ['9x18 mm PM PSO gzh', '54', '5', '22 ₽'], ['9x18 mm PM Pst gzh', '50', '12', '45 ₽'], ['9x18 mm PM PSV', '69', '3', '69 ₽'], ['9x18 mm PM PS gs PPO', '55', '6', '29 ₽'], ['9x18 mm PM P gzh', '50', '5', '12 ₽'], ['9x18 mm PM RG028 gzh', '65', '13', '78 ₽'], ['9x18 mm PM SP7 gzh', '77', '2', '97 ₽'], ['9x18 mm PM SP8 gzh', '67', '1', '45 ₽'], ['9x19 mm  PBP gzh', '52', '39', '725 ₽'], ['9x19 mm  Green Tracer', '58', '14', '72 ₽'], ['9x19 mm  PSO gzh', '59', '10', '49 ₽'], ['9x19 mm  Pst gzh', '54', '20', '62 ₽'], ['9x19 mm  AP 6.3', '52', '30', '272 ₽'], ['9x19 mm  Luger CCI', '70', '10', '185 ₽'], ['9x19 mm  FMJ M822', '56', '18', '76 ₽'], ['9x19 mm  QuakeMaker', '85', '8', '140 ₽'], ['9x19 mm  RIP', '102', '2', '385 ₽'], ['9x21 mm  PS gzh', '49', '35', '340 ₽'], ['9x21 mm  P gzh', '65', '18', '150 ₽'], ['9x21 mm  PE gzh', '80', '15', '197 ₽'], ['9x21 mm  BT gzh', '63', '39', '1205 ₽'], ['.357 Magnum  FMJ', '70', '35', '142 ₽'], ['.357 Magnum  HP', '99', '18', '122 ₽'], ['.357 Magnum  JHP', '88', '24', '186 ₽'], ['.357 Magnum  SP', '108', '12', '100 ₽'], ['9x39 mm  BP gs', '60', '55', '1510 ₽'], ['9x39 mm  PAB-9 gs', '62', '48', '1345 ₽'], ['9x39 mm  SP-5 gs', '71', '28', '160 ₽'], ['9x39 mm  SP-6 gs', '58', '46', '1151 ₽'], ['9x39 mm  SPP gs', '68', '40', '742 ₽']];

exports.handler = async function (event, context) {
    try {
        // Extract the query term from the request
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

        // If query term is provided, add it to the URL
        const baseUrl = "https://calm-figolla-de51de.netlify.app/.netlify/functions/ammo";
        const url = queryTerm ? `${baseUrl}?query=${encodeURIComponent(queryTerm)}` : baseUrl;
        
        const yourProcessedData = queryTerm;
        const index = searchAmmo(queryTerm);

        
        let output = "Ammo Type Not Found";
        if (index != -1) {
            ammoName = ammo[index][0];
            ammoPrice = ammo[index][3];
            ammoDamage = ammo[index][1];
            ammoPen = ammo[index][2];
            priceUrl = 'https://api.tarkov-market.app/api/v1/item?q=${ammoName}&x-api-key=6dJ67FuraCJjcxjd';
            priceResponse = await axios.get(priceUrl);
            priceData = priceResponse.data;
            ammoPrice = priceData["traderPrice"][0];
            currency = priceData["traderPriceCur"][0];
            trader = priceData["traderName"][0];
            output = ammoName.concat(" -> Damage: ", ammoDamage, " - Penetration: ", ammoPen, " - Price: ", ammoPrice);
        }
        

        return {
            statusCode: 200,
            //body: JSON.stringify({ message: "Success", data: yourProcessedData, returned: index}),
            body: output,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error", error: error.message }),
        };
    }
};

function searchAmmo(query) {
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

// Example usage
const searchQuery = '5.45 PP';
const resultIndex = searchAmmo(searchQuery);

// Display the result
if (resultIndex === -1) {
    console.log(`No matches found for '${searchQuery}'.`);
} else {
    console.log(`The most suitable match for '${searchQuery}' is at index ${resultIndex}.`);
}

