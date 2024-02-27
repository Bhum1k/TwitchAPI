const element = "TimestampMap Selection:2/26/2024 18:05:08Woods";

// Extract the timestamp and text using a more robust regular expression
const match = element.match(/TimestampMap Selection: (\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})(.+)/);

const [first, second] = split(element, 23);
console.log(second);
const dataArr = second.match(/(\d{1,2}\/\d{1,2}\/\d{4}\s\d{1,2}:\d{2}:\d{2})([A-Za-z]+)/);

if (dataArr) {
    // dataArr[1] will contain the word
    // dataArr[2] will contain the date/time
    console.log([dataArr[2], dataArr[1]], dataArr[0]);
} else {
    console.log('Pattern not matched.');
}

function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
    console.log(result);
    return result;
}