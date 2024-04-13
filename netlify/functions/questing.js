const fs = require('fs');

// Function to load data from JSON file
function loadTaskData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return null;
    }
}

// Custom search function
function customSearch(searchTerm, tasks) {
    const searchWords = searchTerm.toLowerCase().split(' ');
    return tasks.filter(task => {
        const taskName = task.name.toLowerCase();
        return searchWords.every(word => taskName.includes(word));
    });
}

// Function to calculate Levenshtein distance
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    // Initialize matrix with zeroes
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Fill in the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // Deletion
                matrix[i][j - 1] + 1,      // Insertion
                matrix[i - 1][j - 1] + cost  // Substitution
            );
        }
    }

    // Return the similarity score
    return 1 - (matrix[len1][len2] / Math.max(len1, len2));
}

// Function to calculate Jaccard similarity
function jaccardSimilarity(str1, str2) {
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const intersectionSize = new Set([...set1].filter(x => set2.has(x))).size;
    const unionSize = set1.size + set2.size - intersectionSize;
    return intersectionSize / unionSize;
}

// Function to calculate average similarity score for a set of strings
function calculateSimilarity(strings) {
    const n = strings.length;
    let totalLevenshteinScore = 0;
    let totalJaccardScore = 0;
    let pairCount = 0;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const string1 = strings[i];
            const string2 = strings[j];
            const levenshteinScore = levenshteinDistance(string1, string2);
            const jaccardScore = jaccardSimilarity(string1, string2);
            totalLevenshteinScore += levenshteinScore;
            totalJaccardScore += jaccardScore;
            pairCount++;
        }
    }

    const averageLevenshteinScore = totalLevenshteinScore / pairCount;
    const averageJaccardScore = totalJaccardScore / pairCount;

    // You can choose to return the average of the two scores or any other combination
    return (averageLevenshteinScore + averageJaccardScore) / 2;
}

// Function to filter out elements containing the term "hand over"
function filterObjectives(objective_list) {
    return objective_list.filter(objective => !objective.toLowerCase().includes("hand over"));
}

function printMatch(task) {
    let kappaNeeded = task.kappaRequired ? " Kappa" : "";
    let traderName = task.trader.name;
    let objectiveGroup = "";

    // Filter out objectives containing the term "Hand over"
    let filteredObjectives = task.objectives.filter(obj => !obj.description.includes("Hand over"));

    

    // Function to find common prefix
    function findCommonPrefix(descriptions) {
        // Split descriptions into words
        let words = descriptions.map(desc => desc.split(' '));

        // Find the common prefix among the words
        let commonPrefix = words[0];
        for (let i = 1; i < words.length; i++) {
            let currentWords = words[i];
            let j = 0;
            while (j < commonPrefix.length && j < currentWords.length && commonPrefix[j] === currentWords[j]) {
                j++;
            }
            commonPrefix = commonPrefix.slice(0, j);
        }

        return commonPrefix.join(' ');
    }

    // Function to find common suffix
    function findCommonSuffix(descriptions) {
        // Split descriptions into words
        let words = descriptions.map(desc => desc.split(' '));

        // Find the common suffix among the words
        let commonSuffix = words[0];
        for (let i = 1; i < words.length; i++) {
            let currentWords = words[i];
            let j = 0;
            while (j < commonSuffix.length && j < currentWords.length && commonSuffix[commonSuffix.length - 1 - j] === currentWords[currentWords.length - 1 - j]) {
                j++;
            }
            commonSuffix = commonSuffix.slice(-j);
        }

        return commonSuffix.join(' ');
    }

    // Group similar objective descriptions
    let descriptions = filteredObjectives.map(obj => obj.description);

    let commonPrefix = findCommonPrefix(descriptions);
    let commonSuffix = findCommonSuffix(descriptions);

    // Function to find unique terms
    function findUniqueTerms(descriptions, commonPrefix, commonSuffix) {
        let uniqueTerms = [];
        descriptions.forEach(desc => {
            let uniqueTerm = desc.slice(commonPrefix.length).replace(commonSuffix, '').trim();
            uniqueTerms.push(uniqueTerm);
        });
        uniqueTerms[uniqueTerms.length - 1] = uniqueTerms[uniqueTerms.length - 1] + " ";
        return uniqueTerms;
    }

    let uniqueTerms = findUniqueTerms(descriptions, commonPrefix, commonSuffix);

    if ((commonPrefix + " " + uniqueTerms[0]) == commonSuffix) {
        commonSuffix = ``;
    }
    // Print the grouped objectives
    objectiveGroup = commonPrefix + " " + uniqueTerms.join(', ') + (commonSuffix ? commonSuffix : '');
    
    let objective_list = [];

    for (objective in task.objectives) {
        objective_list.push(task.objectives[objective].description);
    }

    objective_list = filterObjectives(objective_list);

    console.log(objective_list)
    let similarity = calculateSimilarity(objective_list);
    console.log(similarity);
    if (similarity < 0.6) {
        objectiveGroup = objective_list.join(', ')
    }

    console.log(objectiveGroup.trim());
    console.log(uniqueTerms);
    console.log(commonPrefix);
    console.log(commonSuffix);

    // Print task name, kappa requirement, and trader name
    return(task.name + kappaNeeded + " | " + traderName + " | " + objectiveGroup);
}



// Example usage

function returnOutput(searchTerm) {
    const filePath = 'taskData.json';
    const taskData = loadTaskData(filePath);

    if (taskData) {
        const taskNames = taskData.data.tasks;
        const matches = customSearch(searchTerm, taskNames);

        if (matches.length === 1) {
            console.log("Single match found:");
            return(printMatch(matches[0]));
        } else if (matches.length === 2) {
            if (matches[0].name === matches[1].name) {
                return(printMatch(matches[0]));
            } else {
                console.log("Multiple matches found. Possible matches:");
                matches.forEach(match => {
                    console.log(match.name);
                })
                return "Two Matches Found"
            }
        } else if (matches.length > 1) {
            console.log("Multiple matches found. Possible matches:");
            matches.forEach(match => {
                console.log(match.name);
            });
            return "Search too Broad"
        } else {
            console.log("No matches found.");
            return "No Match Found";
        }
    } else {
        console.log('Failed to load task data.');
        return "task data issue";
    }
}

console.log(returnOutput("shooter born"));

exports.handler = async (event, context) => {
    try {
        const { queryStringParameters } = event;
        const queryTerm = queryStringParameters && queryStringParameters.query;

        const output = returnOutput(queryTerm);

        return {
            statusCode: 200,
            body: output,
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Failed to fetch data',
            headers: {
                'Content-Type': 'text/plain',
            },
        };
    }
};