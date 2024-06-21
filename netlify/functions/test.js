const fs = require('fs');
const axios = require('axios');

async function returnOutput(dateString) {
    // Define the zodiac signs and their date ranges
    const zodiacSigns = [
        { sign: "Capricorn", start: "12-22", end: "01-19" },
        { sign: "Aquarius", start: "01-20", end: "02-18" },
        { sign: "Pisces", start: "02-19", end: "03-20" },
        { sign: "Aries", start: "03-21", end: "04-19" },
        { sign: "Taurus", start: "04-20", end: "05-20" },
        { sign: "Gemini", start: "05-21", end: "06-20" },
        { sign: "Cancer", start: "06-21", end: "07-22" },
        { sign: "Leo", start: "07-23", end: "08-22" },
        { sign: "Virgo", start: "08-23", end: "09-22" },
        { sign: "Libra", start: "09-23", end: "10-22" },
        { sign: "Scorpio", start: "10-23", end: "11-21" },
        { sign: "Sagittarius", start: "11-22", end: "12-21" },
    ];

    // Check if the input is a string in the format "MM DD"
    if (typeof dateString !== 'string' || !/^\d{1,2} \d{1,2}$/.test(dateString)) {
        return "Date must be in the format 'MM DD'";
    }

    const [month, day] = dateString.split(' ').map(num => parseInt(num, 10));

    // Validate month and day ranges
    if (isNaN(month) || isNaN(day) || month < 1 || month > 12) {
        return "Date must be in the format 'MM DD'";
    }

    // Get the number of days in the given month
    const daysInMonth = new Date(2020, month, 0).getDate(); // Using 2020 as a leap year reference

    if (day < 1 || day > daysInMonth) {
        return "Date must be in the format 'MM DD'";
    }

    const formattedDate = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    const date = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    for (let i = 0; i < zodiacSigns.length; i++) {
        const { sign, start, end } = zodiacSigns[i];
        if (
            (start <= end && date >= start && date <= end) ||
            (start > end && (date >= start || date <= end))
        ) {
            return `The Zodiac sign for the date ${formattedDate} is: ${sign}`;
        }
    }

    return "Date must be in the format 'MM DD'";
}

// Test the function with invalid date input
returnOutput('11 31').then(result => {
    console.log(result);
});
