const CentralDateTime = "May 25, 2024, 0:00:08 am";
const BDayTime = "May 26, 2024, 0:00:00 am";

// Parsing CentralDateTime and BDayTime into Date objects
const currentDateTime = new Date(CentralDateTime);
const bdayDateTime = new Date(BDayTime);

// Setting the year of the bdayDateTime to match the current year
bdayDateTime.setFullYear(currentDateTime.getFullYear());

// Getting the time until the next birthday in milliseconds
let timeUntilBday = bdayDateTime.getTime() - currentDateTime.getTime();

// If the birthday has already passed this year, set it to next year
if (timeUntilBday < 0) {
    bdayDateTime.setFullYear(bdayDateTime.getFullYear() + 1);
    timeUntilBday = bdayDateTime.getTime() - currentDateTime.getTime();
}

// Calculating days, hours, minutes, and seconds until the birthday
let daysUntilBday = Math.floor(timeUntilBday / (1000 * 60 * 60 * 24));
let remainingTime = timeUntilBday % (1000 * 60 * 60 * 24);
const hoursUntilBday = Math.floor(remainingTime / (1000 * 60 * 60));
remainingTime %= 1000 * 60 * 60;
const minutesUntilBday = Math.floor(remainingTime / (1000 * 60));
remainingTime %= 1000 * 60;
const secondsUntilBday = Math.floor(remainingTime / 1000);

// Adjusting days if necessary
if (hoursUntilBday > 0 || minutesUntilBday > 0 || secondsUntilBday > 0) {
    daysUntilBday++;
}

console.log("Days until birthday:", daysUntilBday);
console.log("Hours until birthday:", hoursUntilBday);
console.log("Minutes until birthday:", minutesUntilBday);
console.log("Seconds until birthday:", secondsUntilBday);

// Checking if it's the birthday
if (
    currentDateTime.getMonth() === bdayDateTime.getMonth() &&
    currentDateTime.getDate() === bdayDateTime.getDate()
) {
    console.log("Happy Birthday!");
} else {
    // Checking if it's less than or equal to 7 days until the birthday
    if (daysUntilBday <= 7) {
        if (daysUntilBday === 0 && hoursUntilBday === 0 && minutesUntilBday === 0 && secondsUntilBday === 0) {
            console.log("It's your birthday today!");
        } else {
            let message = '';
            if (daysUntilBday > 0) {
                const daysMessage = daysUntilBday === 1 ? 'day' : 'days';
                message += `${daysUntilBday} ${daysMessage}`;
            }
            if (hoursUntilBday > 0) {
                const hoursMessage = hoursUntilBday === 1 ? 'hour' : 'hours';
                message += `${message ? ' and ' : ''}${hoursUntilBday} ${hoursMessage}`;
            }
            if (minutesUntilBday > 0) {
                const minutesMessage = minutesUntilBday === 1 ? 'minute' : 'minutes';
                message += `${message ? ' and ' : ''}${minutesUntilBday} ${minutesMessage}`;
            }
            if (secondsUntilBday > 0) {
                const secondsMessage = secondsUntilBday === 1 ? 'second' : 'seconds';
                message += `${message ? ' and ' : ''}${secondsUntilBday} ${secondsMessage}`;
            }
            console.log(`${message} until birthday`);
        }
    } else {
        console.log(`${daysUntilBday} days until birthday`);
    }
}
