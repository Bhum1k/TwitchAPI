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
function calculateAverageSimilarityScore(strings) {
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

// Example usage
const strings = ["Survive and extract from Woods with the \"Survived\" exit status", "Survive and extract from Lighthouse with gsgsg the \"Survived\" exit status"];
const averageScore = calculateAverageSimilarityScore(strings);
console.log("Average similarity score:", averageScore);
