var teamStats = {}
function getUniqueTeamKeys(matchesData) {
    const uniqueTeamKeysSet = new Set();

    // Iterate over each match in the array
    matchesData.forEach(matchData => {
        // Extract team keys from the specified locations
        const redTeamKeys = [
            matchData.alliances.red.team_keys[0],
            matchData.alliances.red.team_keys[1],
            matchData.alliances.red.team_keys[2],
        ];

        const blueTeamKeys = [
            matchData.alliances.blue.team_keys[0],
            matchData.alliances.blue.team_keys[1],
            matchData.alliances.blue.team_keys[2],
        ];

        // Add team keys to the Set to ensure uniqueness
        redTeamKeys.forEach(teamKey => uniqueTeamKeysSet.add(teamKey));
        blueTeamKeys.forEach(teamKey => uniqueTeamKeysSet.add(teamKey));
    });

    // Convert the Set to an array for the final result
    const uniqueTeamKeysArray = [...uniqueTeamKeysSet];

    return uniqueTeamKeysArray;
}

function oneHotEncodeTeams(teamList, teamCombinations) {
    const n = teamCombinations.length;
    const m = teamList.length;

    // Initialize an array for one-hot encoding
    const oneHotEncoded = [];

    // Iterate over each team combination
    for (let i = 0; i < n; i++) {
        const combination = teamCombinations[i];
        const row = Array(m).fill(0);

        // Set 1 for the teams in the combination
        combination.forEach(team => {
            const index = teamList.indexOf(team);
            if (index !== -1) {
                row[index] = 1;
            }
        });

        oneHotEncoded.push(row);
    }

    return oneHotEncoded;
}

function OPRCalculator(uniqueTeamList, alliances, variable) {
    if (variable.length != alliances.length) {
        alliances = alliances.slice(0, variable.length);
    }

    const oneHotEncoded = oneHotEncodeTeams(uniqueTeamList, alliances);

    //Prepare for OPR calculation to account for overdefined systems
    const oneHotTransposed = math.transpose(oneHotEncoded);

    const oneHotSquare = math.multiply(oneHotTransposed, oneHotEncoded);
    const oneHotTransposed_and_variable = math.multiply(oneHotTransposed, variable);

    const opr = math.lusolve(oneHotSquare, oneHotTransposed_and_variable);

    return opr;
}

function convertBoolean(boolean) {
    if (boolean){
        return 1
    }else{
        return 0
    }
}

function convertGamePiece(gamePiece) {
    if (gamePiece != "None"){
        return 1
    }else{
        return 0
    }
}

function classifyGamePieceLevel(gamePieceCount, gamePiecePoints, auto) {
    if (auto) {
        coefficients = [3, 4, 6]
    }else {
        coefficients = [2, 3, 5]
    }

    minimalSolution = [];
    minimalSolutionDelta = 10000;

    for (let i = 0; i <= gamePieceCount; i++) {
        for (let j = 0; j <= gamePieceCount - i; j++) {
            const k = gamePieceCount - i - j;
            if ((coefficients[0] * i) + (coefficients[1] * j) + (coefficients[2] * k) == gamePiecePoints) {
                
                return [i, j, k]; 
            }else{
                if ((coefficients[0] * i) + (coefficients[1] * j) + (coefficients[2] * k) < minimalSolutionDelta) {
                    minimalSolution = [i, j, k];
                    minimalSolutionDelta = Math.abs((coefficients[0] * i) + (coefficients[1] * j) + (coefficients[2] * k)  - gamePiecePoints);
                }
            }
        }
    }
    return minimalSolution;


}

function generateTeamJsonList(uniqueTeamList) {

    // Generate a list of JSON objects based on uniqueTeamList
    const jsonList = uniqueTeamList.map((teamName) => {
        return { team: teamName };
    });

    return jsonList;
}
  


// Your function for calculating variable OPR
function calculateAllVariableOPR(dataMatches) {
    var uniqueTeamList = getUniqueTeamKeys(dataMatches);
    var alliances = [];
    var activationBonus = [];
    var sustainabilityBonus = [];
    var autoCommunityB1 = [];
    var autoCommunityB2 = [];
    var autoCommunityB3 = [];
    var autoCommunityB4 = [];
    var autoCommunityB5 = [];
    var autoCommunityB6 = [];
    var autoCommunityB7 = [];
    var autoCommunityB8 = [];
    var autoCommunityB9 = [];
    var autoCommunityM1 = [];
    var autoCommunityM2 = [];
    var autoCommunityM3 = [];
    var autoCommunityM4 = [];
    var autoCommunityM5 = [];
    var autoCommunityM6 = [];
    var autoCommunityM7 = [];
    var autoCommunityM8 = [];
    var autoCommunityM9 = [];
    var autoCommunityT1 = [];
    var autoCommunityT2 = [];
    var autoCommunityT3 = [];
    var autoCommunityT4 = [];
    var autoCommunityT5 = [];
    var autoCommunityT6 = [];
    var autoCommunityT7 = [];
    var autoCommunityT8 = [];
    var autoCommunityT9 = [];
    var autoPieceCount = [];
    var autoPieceCountB = [];
    var autoPieceCountM = [];
    var autoPieceCountT = [];
    var coopPieceCount = [];
    var coopCriteriaMet = [];
    var linkCount = [];
    var teleopCommunityB1 = [];
    var teleopCommunityB2 = [];
    var teleopCommunityB3 = [];
    var teleopCommunityB4 = [];
    var teleopCommunityB5 = [];
    var teleopCommunityB6 = [];
    var teleopCommunityB7 = [];
    var teleopCommunityB8 = [];
    var teleopCommunityB9 = [];
    var teleopCommunityM1 = [];
    var teleopCommunityM2 = [];
    var teleopCommunityM3 = [];
    var teleopCommunityM4 = [];
    var teleopCommunityM5 = [];
    var teleopCommunityM6 = [];
    var teleopCommunityM7 = [];
    var teleopCommunityM8 = [];
    var teleopCommunityM9 = [];
    var teleopCommunityT1 = [];
    var teleopCommunityT2 = [];
    var teleopCommunityT3 = [];
    var teleopCommunityT4 = [];
    var teleopCommunityT5 = [];
    var teleopCommunityT6 = [];
    var teleopCommunityT7 = [];
    var teleopCommunityT8 = [];
    var teleopCommunityT9 = [];
    var teleopPieceCount = [];
    var teleopPieceCountB = [];
    var teleopPieceCountM = [];
    var teleopPieceCountT = [];
    var foulCount = [];
    var techFoulCount = [];
    var superChangedNodes = [];

    var opr_activationBonus = [];
    var opr_sustainabilityBonus = [];
    var opr_autoCommunityB1 = [];
    var opr_autoCommunityB2 = [];
    var opr_autoCommunityB3 = [];
    var opr_autoCommunityB4 = [];
    var opr_autoCommunityB5 = [];
    var opr_autoCommunityB6 = [];
    var opr_autoCommunityB7 = [];
    var opr_autoCommunityB8 = [];
    var opr_autoCommunityB9 = [];
    var opr_autoCommunityM1 = [];
    var opr_autoCommunityM2 = [];
    var opr_autoCommunityM3 = [];
    var opr_autoCommunityM4 = [];
    var opr_autoCommunityM5 = [];
    var opr_autoCommunityM6 = [];
    var opr_autoCommunityM7 = [];
    var opr_autoCommunityM8 = [];
    var opr_autoCommunityM9 = [];
    var opr_autoCommunityT1 = [];
    var opr_autoCommunityT2 = [];
    var opr_autoCommunityT3 = [];
    var opr_autoCommunityT4 = [];
    var opr_autoCommunityT5 = [];
    var opr_autoCommunityT6 = [];
    var opr_autoCommunityT7 = [];
    var opr_autoCommunityT8 = [];
    var opr_autoCommunityT9 = [];
    var opr_autoPieceCountB = [];
    var opr_autoPieceCountM = [];
    var opr_autoPieceCountT = [];
    var opr_coopPieceCount = [];
    var opr_coopCriteriaMet = [];
    var opr_linkCount = [];
    var opr_teleopCommunityB1 = [];
    var opr_teleopCommunityB2 = [];
    var opr_teleopCommunityB3 = [];
    var opr_teleopCommunityB4 = [];
    var opr_teleopCommunityB5 = [];
    var opr_teleopCommunityB6 = [];
    var opr_teleopCommunityB7 = [];
    var opr_teleopCommunityB8 = [];
    var opr_teleopCommunityB9 = [];
    var opr_teleopCommunityM1 = [];
    var opr_teleopCommunityM2 = [];
    var opr_teleopCommunityM3 = [];
    var opr_teleopCommunityM4 = [];
    var opr_teleopCommunityM5 = [];
    var opr_teleopCommunityM6 = [];
    var opr_teleopCommunityM7 = [];
    var opr_teleopCommunityM8 = [];
    var opr_teleopCommunityM9 = [];
    var opr_teleopCommunityT1 = [];
    var opr_teleopCommunityT2 = [];
    var opr_teleopCommunityT3 = [];
    var opr_teleopCommunityT4 = [];
    var opr_teleopCommunityT5 = [];
    var opr_teleopCommunityT6 = [];
    var opr_teleopCommunityT7 = [];
    var opr_teleopCommunityT8 = [];
    var opr_teleopCommunityT9 = [];
    var opr_teleopPieceCountB = [];
    var opr_teleopPieceCountM = [];
    var opr_teleopPieceCountT = [];
    var opr_foulCount = [];
    var opr_techFoulCount = [];
    var opr_superChangedNodes = [];

    dataMatches.forEach(match => {
        if (match.comp_level == "qm") {
            alliances.push(match.alliances.blue.team_keys);
            alliances.push(match.alliances.red.team_keys);
            activationBonus.push(convertBoolean(match.score_breakdown.blue.activationBonusAchieved));
            activationBonus.push(convertBoolean(match.score_breakdown.red.activationBonusAchieved));
            sustainabilityBonus.push(convertBoolean(match.score_breakdown.blue.sustainabilityBonusAchieved));
            sustainabilityBonus.push(convertBoolean(match.score_breakdown.red.sustainabilityBonusAchieved));    
            autoCommunityB1.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[0]));
            autoCommunityB1.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[0]));
            autoCommunityB2.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[1]));
            autoCommunityB2.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[1]));
            autoCommunityB3.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[2]));
            autoCommunityB3.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[2]));
            autoCommunityB4.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[3]));
            autoCommunityB4.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[3]));
            autoCommunityB5.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[4]));
            autoCommunityB5.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[4]));
            autoCommunityB6.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[5]));
            autoCommunityB6.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[5]));
            autoCommunityB7.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[6]));
            autoCommunityB7.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[6]));
            autoCommunityB8.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[7]));
            autoCommunityB8.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[7]));
            autoCommunityB9.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.B[8]));
            autoCommunityB9.push(convertGamePiece(match.score_breakdown.red.autoCommunity.B[8]));
            autoCommunityM1.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[0]));
            autoCommunityM1.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[0]));
            autoCommunityM2.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[1]));
            autoCommunityM2.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[1]));
            autoCommunityM3.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[2]));
            autoCommunityM3.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[2]));
            autoCommunityM4.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[3]));
            autoCommunityM4.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[3]));
            autoCommunityM5.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[4]));
            autoCommunityM5.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[4]));
            autoCommunityM6.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[5]));
            autoCommunityM6.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[5]));
            autoCommunityM7.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[6]));
            autoCommunityM7.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[6]));
            autoCommunityM8.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[7]));
            autoCommunityM8.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[7]));
            autoCommunityM9.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.M[8]));
            autoCommunityM9.push(convertGamePiece(match.score_breakdown.red.autoCommunity.M[8]));
            autoCommunityT1.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[0]));
            autoCommunityT1.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[0]));
            autoCommunityT2.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[1]));
            autoCommunityT2.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[1]));
            autoCommunityT3.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[2]));
            autoCommunityT3.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[2]));
            autoCommunityT4.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[3]));
            autoCommunityT4.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[3]));
            autoCommunityT5.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[4]));
            autoCommunityT5.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[4]));
            autoCommunityT6.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[5]));
            autoCommunityT6.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[5]));
            autoCommunityT7.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[6]));
            autoCommunityT7.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[6]));
            autoCommunityT8.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[7]));
            autoCommunityT8.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[7]));
            autoCommunityT9.push(convertGamePiece(match.score_breakdown.blue.autoCommunity.T[8]));
            autoCommunityT9.push(convertGamePiece(match.score_breakdown.red.autoCommunity.T[8]));
            coopCriteriaMet.push(convertBoolean(match.score_breakdown.blue.coopertitionCriteriaMet));
            coopCriteriaMet.push(convertBoolean(match.score_breakdown.red.coopertitionCriteriaMet));
            coopPieceCount.push(match.score_breakdown.blue.coopGamePieceCount);
            coopPieceCount.push(match.score_breakdown.red.coopGamePieceCount);
            linkCount.push(match.score_breakdown.blue.linkPoints/5);
            linkCount.push(match.score_breakdown.red.linkPoints/5);
            teleopCommunityB1.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[0]));
            teleopCommunityB1.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[0]));
            teleopCommunityB2.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[1]));
            teleopCommunityB2.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[1]));
            teleopCommunityB3.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[2]));
            teleopCommunityB3.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[2]));
            teleopCommunityB4.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[3]));
            teleopCommunityB4.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[3]));
            teleopCommunityB5.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[4]));
            teleopCommunityB5.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[4]));
            teleopCommunityB6.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[5]));
            teleopCommunityB6.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[5]));
            teleopCommunityB7.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[6]));
            teleopCommunityB7.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[6]));
            teleopCommunityB8.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[7]));
            teleopCommunityB8.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[7]));
            teleopCommunityB9.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.B[8]));
            teleopCommunityB9.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.B[8]));
            teleopCommunityM1.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[0]));
            teleopCommunityM1.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[0]));
            teleopCommunityM2.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[1]));
            teleopCommunityM2.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[1]));
            teleopCommunityM3.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[2]));
            teleopCommunityM3.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[2]));
            teleopCommunityM4.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[3]));
            teleopCommunityM4.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[3]));
            teleopCommunityM5.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[4]));
            teleopCommunityM5.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[4]));
            teleopCommunityM6.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[5]));
            teleopCommunityM6.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[5]));
            teleopCommunityM7.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[6]));
            teleopCommunityM7.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[6]));
            teleopCommunityM8.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[7]));
            teleopCommunityM8.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[7]));
            teleopCommunityM9.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.M[8]));
            teleopCommunityM9.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.M[8]));
            teleopCommunityT1.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[0]));
            teleopCommunityT1.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[0]));
            teleopCommunityT2.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[1]));
            teleopCommunityT2.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[1]));
            teleopCommunityT3.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[2]));
            teleopCommunityT3.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[2]));
            teleopCommunityT4.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[3]));
            teleopCommunityT4.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[3]));
            teleopCommunityT5.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[4]));
            teleopCommunityT5.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[4]));
            teleopCommunityT6.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[5]));
            teleopCommunityT6.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[5]));
            teleopCommunityT7.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[6]));
            teleopCommunityT7.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[6]));
            teleopCommunityT8.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[7]));
            teleopCommunityT8.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[7]));
            teleopCommunityT9.push(convertGamePiece(match.score_breakdown.blue.teleopCommunity.T[8]));
            teleopCommunityT9.push(convertGamePiece(match.score_breakdown.red.teleopCommunity.T[8]));
            foulCount.push(match.score_breakdown.blue.foulCount);
            foulCount.push(match.score_breakdown.red.foulCount);
            techFoulCount.push(match.score_breakdown.blue.techFoulCount);
            techFoulCount.push(match.score_breakdown.red.techFoulCount);
            autoPieceCount = classifyGamePieceLevel(match.score_breakdown.blue.autoGamePieceCount, match.score_breakdown.blue.autoGamePiecePoints, true);
            autoPieceCountB.push(autoPieceCount[0]);
            autoPieceCountM.push(autoPieceCount[1]);
            autoPieceCountT.push(autoPieceCount[2]);
            autoPieceCount = classifyGamePieceLevel(match.score_breakdown.red.autoGamePieceCount, match.score_breakdown.red.autoGamePiecePoints, true);
            autoPieceCountB.push(autoPieceCount[0]);
            autoPieceCountM.push(autoPieceCount[1]);
            autoPieceCountT.push(autoPieceCount[2]);
            teleopPieceCount = classifyGamePieceLevel(match.score_breakdown.blue.teleopGamePieceCount - match.score_breakdown.blue.autoGamePieceCount, match.score_breakdown.blue.teleopGamePiecePoints, false);
            teleopPieceCountB.push(teleopPieceCount[0]);
            teleopPieceCountM.push(teleopPieceCount[1]);
            teleopPieceCountT.push(teleopPieceCount[2]);
            teleopPieceCount = classifyGamePieceLevel(match.score_breakdown.red.teleopGamePieceCount - match.score_breakdown.red.autoGamePieceCount, match.score_breakdown.red.teleopGamePiecePoints, false);
            teleopPieceCountB.push(teleopPieceCount[0]);
            teleopPieceCountM.push(teleopPieceCount[1]);
            teleopPieceCountT.push(teleopPieceCount[2]);
            superChangedNodes.push((match.score_breakdown.blue.extraGamePieceCount !== undefined) ? match.score_breakdown.blue.extraGamePieceCount : 0);
            superChangedNodes.push((match.score_breakdown.red.extraGamePieceCount !== undefined) ? match.score_breakdown.red.extraGamePieceCount : 0);
    
        }
    });

    opr_activationBonus = OPRCalculator(uniqueTeamList, alliances, activationBonus);
    opr_sustainabilityBonus = OPRCalculator(uniqueTeamList, alliances, sustainabilityBonus);
    opr_autoCommunityB1 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB1);
    opr_autoCommunityB2 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB2);
    opr_autoCommunityB3 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB3);
    opr_autoCommunityB4 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB4);
    opr_autoCommunityB5 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB5);
    opr_autoCommunityB6 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB6);
    opr_autoCommunityB7 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB7);
    opr_autoCommunityB8 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB8);
    opr_autoCommunityB9 = OPRCalculator(uniqueTeamList, alliances, autoCommunityB9);
    opr_autoCommunityM1 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM1);
    opr_autoCommunityM2 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM2);
    opr_autoCommunityM3 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM3);
    opr_autoCommunityM4 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM4);
    opr_autoCommunityM5 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM5);
    opr_autoCommunityM6 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM6);
    opr_autoCommunityM7 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM7);
    opr_autoCommunityM8 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM8);
    opr_autoCommunityM9 = OPRCalculator(uniqueTeamList, alliances, autoCommunityM9);
    opr_autoCommunityT1 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT1);
    opr_autoCommunityT2 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT2);
    opr_autoCommunityT3 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT3);
    opr_autoCommunityT4 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT4);
    opr_autoCommunityT5 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT5);
    opr_autoCommunityT6 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT6);
    opr_autoCommunityT7 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT7);
    opr_autoCommunityT8 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT8);
    opr_autoCommunityT9 = OPRCalculator(uniqueTeamList, alliances, autoCommunityT9);
    opr_autoPieceCountB = OPRCalculator(uniqueTeamList, alliances, autoPieceCountB);
    opr_autoPieceCountM = OPRCalculator(uniqueTeamList, alliances, autoPieceCountM);
    opr_autoPieceCountT = OPRCalculator(uniqueTeamList, alliances, autoPieceCountT);
    opr_coopPieceCount = OPRCalculator(uniqueTeamList, alliances, coopPieceCount);
    opr_coopCriteriaMet = OPRCalculator(uniqueTeamList, alliances, coopCriteriaMet);
    opr_linkCount = OPRCalculator(uniqueTeamList, alliances, linkCount);
    opr_teleopCommunityB1 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB1);
    opr_teleopCommunityB2 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB2);
    opr_teleopCommunityB3 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB3);
    opr_teleopCommunityB4 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB4);
    opr_teleopCommunityB5 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB5);
    opr_teleopCommunityB6 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB6);
    opr_teleopCommunityB7 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB7);
    opr_teleopCommunityB8 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB8);
    opr_teleopCommunityB9 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityB9);
    opr_teleopCommunityM1 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM1);
    opr_teleopCommunityM2 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM2);
    opr_teleopCommunityM3 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM3);
    opr_teleopCommunityM4 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM4);
    opr_teleopCommunityM5 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM5);
    opr_teleopCommunityM6 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM6);
    opr_teleopCommunityM7 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM7);
    opr_teleopCommunityM8 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM8);
    opr_teleopCommunityM9 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityM9);
    opr_teleopCommunityT1 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT1);
    opr_teleopCommunityT2 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT2);
    opr_teleopCommunityT3 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT3);
    opr_teleopCommunityT4 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT4);
    opr_teleopCommunityT5 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT5);
    opr_teleopCommunityT6 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT6);
    opr_teleopCommunityT7 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT7);
    opr_teleopCommunityT8 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT8);
    opr_teleopCommunityT9 = OPRCalculator(uniqueTeamList, alliances, teleopCommunityT9);
    opr_teleopPieceCountB = OPRCalculator(uniqueTeamList, alliances, teleopPieceCountB);
    opr_teleopPieceCountM = OPRCalculator(uniqueTeamList, alliances, teleopPieceCountM);
    opr_teleopPieceCountT = OPRCalculator(uniqueTeamList, alliances, teleopPieceCountT);
    opr_foulCount = OPRCalculator(uniqueTeamList, alliances, foulCount);
    opr_techFoulCount = OPRCalculator(uniqueTeamList, alliances, techFoulCount);
    opr_superChangedNodes = OPRCalculator(uniqueTeamList, alliances, superChangedNodes);

    teamJsonList = generateTeamJsonList(uniqueTeamList);

    uniqueTeamList.forEach((team, index) => {
        teamJsonList[index].teamNumber = parseInt(team.substring(3), 10);

        //Team Name, need to query from TBA
        teamJsonList[index].name = "";

        //Ranking Points
        teamJsonList[index].rp = {};
        teamJsonList[index].rp.activationBonus = opr_activationBonus[index];
        teamJsonList[index].rp.sustainabilityBonus = opr_sustainabilityBonus[index];

        //Autonamous
        teamJsonList[index].auto = {};
        teamJsonList[index].auto.autoEndState = {};
        teamJsonList[index].auto.mobility = {};
        teamJsonList[index].auto.autoCommunity = {};
        teamJsonList[index].auto.autoCommunity.B = [opr_autoCommunityB1[index], opr_autoCommunityB2[index], opr_autoCommunityB3[index], opr_autoCommunityB4[index], opr_autoCommunityB5[index], opr_autoCommunityB6[index], opr_autoCommunityB7[index], opr_autoCommunityB8[index], opr_autoCommunityB9[index]];
        teamJsonList[index].auto.autoCommunity.M = [opr_autoCommunityM1[index], opr_autoCommunityM2[index], opr_autoCommunityM3[index], opr_autoCommunityM4[index], opr_autoCommunityM5[index], opr_autoCommunityM6[index], opr_autoCommunityM7[index], opr_autoCommunityM8[index], opr_autoCommunityM9[index]];
        teamJsonList[index].auto.autoCommunity.T = [opr_autoCommunityT1[index], opr_autoCommunityT2[index], opr_autoCommunityT3[index], opr_autoCommunityT4[index], opr_autoCommunityT5[index], opr_autoCommunityT6[index], opr_autoCommunityT7[index], opr_autoCommunityT8[index], opr_autoCommunityT9[index]];
        teamJsonList[index].auto.autoGamePieceCount = {};
        teamJsonList[index].auto.autoGamePieceCount.B = opr_autoPieceCountB[index];
        teamJsonList[index].auto.autoGamePieceCount.M = opr_autoPieceCountM[index];
        teamJsonList[index].auto.autoGamePieceCount.T = opr_autoPieceCountT[index];

        //Tele-Operated
        teamJsonList[index].teleop = {};
        teamJsonList[index].teleop.teleopCommunity = {};
        teamJsonList[index].teleop.teleopCommunity.B = [opr_teleopCommunityB1[index], opr_teleopCommunityB2[index], opr_teleopCommunityB3[index], opr_teleopCommunityB4[index], opr_teleopCommunityB5[index], opr_teleopCommunityB6[index], opr_teleopCommunityB7[index], opr_teleopCommunityB8[index], opr_teleopCommunityB9[index]];
        teamJsonList[index].teleop.teleopCommunity.M = [opr_teleopCommunityM1[index], opr_teleopCommunityM2[index], opr_teleopCommunityM3[index], opr_teleopCommunityM4[index], opr_teleopCommunityM5[index], opr_teleopCommunityM6[index], opr_teleopCommunityM7[index], opr_teleopCommunityM8[index], opr_teleopCommunityM9[index]];
        teamJsonList[index].teleop.teleopCommunity.T = [opr_teleopCommunityT1[index], opr_teleopCommunityT2[index], opr_teleopCommunityT3[index], opr_teleopCommunityT4[index], opr_teleopCommunityT5[index], opr_teleopCommunityT6[index], opr_teleopCommunityT7[index], opr_teleopCommunityT8[index], opr_teleopCommunityT9[index]];
        teamJsonList[index].teleop.teleopGamePieceCount = {};
        teamJsonList[index].teleop.teleopGamePieceCount.B = opr_teleopPieceCountB[index];
        teamJsonList[index].teleop.teleopGamePieceCount.M = opr_teleopPieceCountM[index];
        teamJsonList[index].teleop.teleopGamePieceCount.T = opr_teleopPieceCountT[index];
        teamJsonList[index].teleop.superChangedNodes = opr_superChangedNodes[index];


        //Cooperition Grid Area Scoring
        teamJsonList[index].coop = {};
        teamJsonList[index].coop.coopGamePieceCount = opr_coopPieceCount[index];
        teamJsonList[index].coop.coopCriteriaMet = opr_coopCriteriaMet[index];

        //LinkCount
        teamJsonList[index].linkCount = opr_linkCount[index];

        //Endgame, will be updated in another function because they are team based
        teamJsonList[index].endGameState = {};

        //Fouls
        teamJsonList[index].fouls = {};
        teamJsonList[index].fouls.foulCount = opr_foulCount[index];
        teamJsonList[index].fouls.techFoulCount = opr_techFoulCount[index];

        //DifferentOPRs
        teamJsonList[index].OPRs = {};
        teamJsonList[index].OPRs.totalOPR = 0;
        teamJsonList[index].OPRs.autoOPR = {};
        teamJsonList[index].OPRs.autoOPR.autoSubtotalOPR = 0;
        teamJsonList[index].OPRs.autoOPR.autoEndstateOPR = 0;
        teamJsonList[index].OPRs.autoOPR.autoCommunityOPR = 0;
        teamJsonList[index].OPRs.autoOPR.autoMobilityOPR = 0;


        teamJsonList[index].OPRs.teleopOPR = {};
        teamJsonList[index].OPRs.teleopOPR.teleopSubtotalOPR = 0;
        teamJsonList[index].OPRs.teleopOPR.teleopCommunityOPR = 0;
        teamJsonList[index].OPRs.teleopOPR.superChangedNodesOPR = 0;
        teamJsonList[index].OPRs.teleopOPR.linksOPR = 0;

        teamJsonList[index].OPRs.endGameOPR = 0;
    });

    return teamJsonList;

}

function calculateIndividualVariables(dataMatches, uniqueTeamList) {
    var robot = [];
    var autoChargeStation = [];
    var endGameChargeStation = [];
    var mobility = [];

    dataMatches.forEach(match => {
        if (match.comp_level == "qm") {
            robot.push(match.alliances.blue.team_keys[0]);
            robot.push(match.alliances.blue.team_keys[1]);
            robot.push(match.alliances.blue.team_keys[2]);
            robot.push(match.alliances.red.team_keys[0]);
            robot.push(match.alliances.red.team_keys[1]);
            robot.push(match.alliances.red.team_keys[2]);
            if (match.score_breakdown.blue.autoBridgeState == "Level") {
                autoChargeStation.push((match.score_breakdown.blue.autoChargeStationRobot1 == "Docked") ? "Engaged" : match.score_breakdown.blue.autoChargeStationRobot1);
                autoChargeStation.push((match.score_breakdown.blue.autoChargeStationRobot2 == "Docked") ? "Engaged" : match.score_breakdown.blue.autoChargeStationRobot2);
                autoChargeStation.push((match.score_breakdown.blue.autoChargeStationRobot3 == "Docked") ? "Engaged" : match.score_breakdown.blue.autoChargeStationRobot3);
            }else {
                autoChargeStation.push(match.score_breakdown.blue.autoChargeStationRobot1);
                autoChargeStation.push(match.score_breakdown.blue.autoChargeStationRobot2);
                autoChargeStation.push(match.score_breakdown.blue.autoChargeStationRobot3);
            }
            if (match.score_breakdown.red.autoBridgeState == "Level") {
                autoChargeStation.push((match.score_breakdown.red.autoChargeStationRobot1 == "Docked") ? "Engaged" : match.score_breakdown.red.autoChargeStationRobot1);
                autoChargeStation.push((match.score_breakdown.red.autoChargeStationRobot2 == "Docked") ? "Engaged" : match.score_breakdown.red.autoChargeStationRobot2);
                autoChargeStation.push((match.score_breakdown.red.autoChargeStationRobot3 == "Docked") ? "Engaged" : match.score_breakdown.red.autoChargeStationRobot3);
            }else{
                autoChargeStation.push(match.score_breakdown.red.autoChargeStationRobot1);
                autoChargeStation.push(match.score_breakdown.red.autoChargeStationRobot2);
                autoChargeStation.push(match.score_breakdown.red.autoChargeStationRobot3);
            }
            if (match.score_breakdown.blue.endGameBridgeState == "Level") {
                endGameChargeStation.push((match.score_breakdown.blue.endGameChargeStationRobot1 == "Docked") ? "Engaged" : match.score_breakdown.blue.endGameChargeStationRobot1);
                endGameChargeStation.push((match.score_breakdown.blue.endGameChargeStationRobot2 == "Docked") ? "Engaged" : match.score_breakdown.blue.endGameChargeStationRobot2);
                endGameChargeStation.push((match.score_breakdown.blue.endGameChargeStationRobot3 == "Docked") ? "Engaged" : match.score_breakdown.blue.endGameChargeStationRobot3);
            }else {
                endGameChargeStation.push(match.score_breakdown.blue.endGameChargeStationRobot1);
                endGameChargeStation.push(match.score_breakdown.blue.endGameChargeStationRobot2);
                endGameChargeStation.push(match.score_breakdown.blue.endGameChargeStationRobot3);
            }
            if (match.score_breakdown.red.endGameBridgeState == "Level") {
                endGameChargeStation.push((match.score_breakdown.red.endGameChargeStationRobot1 == "Docked") ? "Engaged" : match.score_breakdown.red.endGameChargeStationRobot1);
                endGameChargeStation.push((match.score_breakdown.red.endGameChargeStationRobot2 == "Docked") ? "Engaged" : match.score_breakdown.red.endGameChargeStationRobot2);
                endGameChargeStation.push((match.score_breakdown.red.endGameChargeStationRobot3 == "Docked") ? "Engaged" : match.score_breakdown.red.endGameChargeStationRobot3);
            }else{
                endGameChargeStation.push(match.score_breakdown.red.endGameChargeStationRobot1);
                endGameChargeStation.push(match.score_breakdown.red.endGameChargeStationRobot2);
                endGameChargeStation.push(match.score_breakdown.red.endGameChargeStationRobot3);
            }
            mobility.push(match.score_breakdown.blue.mobilityRobot1);
            mobility.push(match.score_breakdown.blue.mobilityRobot2);
            mobility.push(match.score_breakdown.blue.mobilityRobot3);
            mobility.push(match.score_breakdown.red.mobilityRobot1);
            mobility.push(match.score_breakdown.red.mobilityRobot2);
            mobility.push(match.score_breakdown.red.mobilityRobot3);
        }
    });

    results = reorganizeLists(robot, autoChargeStation, endGameChargeStation, mobility, uniqueTeamList);

    return results;
}

function reorganizeLists(robot, autoChargeStation, endGameChargeStation, mobility, uniqueTeamList) {
    const individual = {};

    for (let i = 0; i < uniqueTeamList.length; i++) {
        individual[uniqueTeamList[i]] = {
            autoChargeStation: {
                None: 0.0,
                Docked: 0.0,
                Engaged: 0.0
            },
            endGameChargeStation: {
                None: 0.0,
                Park: 0.0,
                Docked: 0.0,
                Engaged: 0.0
            },
            mobility: {
                Yes: 0.0,
                No: 0.0
            }
        }
    }

    for (let j=0; j < robot.length; j++) {
        if (autoChargeStation[j] == "Engaged") {
            individual[robot[j]].autoChargeStation.Engaged += 1.0;
        }else if (autoChargeStation[j] == "Docked") {
            individual[robot[j]].autoChargeStation.Docked += 1.0;
        }else {
            individual[robot[j]].autoChargeStation.None += 1.0;
        }

        if (endGameChargeStation[j] == "Engaged") {
            individual[robot[j]].endGameChargeStation.Engaged += 1.0;
        }else if (endGameChargeStation[j] == "Docked") {
            individual[robot[j]].endGameChargeStation.Docked += 1.0;
        }else if (endGameChargeStation[j] == "Park") {
            individual[robot[j]].endGameChargeStation.Park += 1.0;
        }else {
            individual[robot[j]].endGameChargeStation.None += 1.0;
        }

        if (mobility[j] == "Yes") {
            individual[robot[j]].mobility.Yes += 1.0;
        }else {
            individual[robot[j]].mobility.No += 1.0;
        }
    }

    for (let k = 0; k < uniqueTeamList.length; k++) {
        totalAuto = individual[uniqueTeamList[k]].autoChargeStation.None + individual[uniqueTeamList[k]].autoChargeStation.Docked + individual[uniqueTeamList[k]].autoChargeStation.Engaged;
        individual[uniqueTeamList[k]].autoChargeStation.None /= totalAuto;
        individual[uniqueTeamList[k]].autoChargeStation.Docked /= totalAuto;
        individual[uniqueTeamList[k]].autoChargeStation.Engaged /= totalAuto;

        totalEndgame = individual[uniqueTeamList[k]].endGameChargeStation.None + individual[uniqueTeamList[k]].endGameChargeStation.Park + individual[uniqueTeamList[k]].endGameChargeStation.Docked + individual[uniqueTeamList[k]].endGameChargeStation.Engaged;
        individual[uniqueTeamList[k]].endGameChargeStation.None /= totalEndgame;
        individual[uniqueTeamList[k]].endGameChargeStation.Park /= totalEndgame;
        individual[uniqueTeamList[k]].endGameChargeStation.Docked /= totalEndgame;
        individual[uniqueTeamList[k]].endGameChargeStation.Engaged /= totalEndgame;

        totalMobility = individual[uniqueTeamList[k]].mobility.Yes + individual[uniqueTeamList[k]].mobility.No;
        individual[uniqueTeamList[k]].mobility.Yes /= totalMobility;
        individual[uniqueTeamList[k]].mobility.No /= totalMobility;
    }

    return individual;
}

function calculateChargedStationStateOPR(auto, autoEndState){
    if (auto){
        return autoEndState.Docked * 8 + autoEndState.Engaged * 12;
    }else {
        return autoEndState.Park * 2 + autoEndState.Docked * 6 + autoEndState.Engaged * 10;
    }
}

function calculateCommunityOPR(auto, gamePieceCount){
    if (auto){
        return gamePieceCount.B * 3 + gamePieceCount.M * 4 + gamePieceCount.T * 6;
    }else {
        return gamePieceCount.B * 2 + gamePieceCount.M * 3 + gamePieceCount.T * 5;
    }
}

function calculateAllVariableProbability(dataMatches) {
    var apiKey = sessionStorage.getItem('apiKey');
    var uniqueTeamList = getUniqueTeamKeys(dataMatches);
    var teamJson = calculateAllVariableOPR(dataMatches);
    var teamDict = {}

    individual = calculateIndividualVariables(dataMatches, uniqueTeamList);

    for (let i = 0; i < uniqueTeamList.length; i++) {
        teamJson[i].auto.autoEndState = individual[uniqueTeamList[i]].autoChargeStation;
        teamJson[i].auto.mobility = individual[uniqueTeamList[i]].mobility;
        teamJson[i].endGameState = individual[uniqueTeamList[i]].endGameChargeStation;

        teamJson[i].OPRs.autoOPR.autoEndstateOPR = calculateChargedStationStateOPR(true, teamJson[i].auto.autoEndState);
        teamJson[i].OPRs.autoOPR.autoCommunityOPR = calculateCommunityOPR(true, teamJson[i].auto.autoGamePieceCount);
        teamJson[i].OPRs.autoOPR.autoMobilityOPR = teamJson[i].auto.mobility.Yes * 3;
        teamJson[i].OPRs.autoOPR.autoSubtotalOPR = teamJson[i].OPRs.autoOPR.autoEndstateOPR + teamJson[i].OPRs.autoOPR.autoCommunityOPR + teamJson[i].OPRs.autoOPR.autoMobilityOPR;

        teamJson[i].OPRs.teleopOPR.teleopCommunityOPR = calculateCommunityOPR(false, teamJson[i].teleop.teleopGamePieceCount);
        teamJson[i].OPRs.teleopOPR.superChangedNodesOPR = teamJson[i].teleop.superChangedNodes * 3;
        teamJson[i].OPRs.teleopOPR.linksOPR = teamJson[i].linkCount * 5;
        teamJson[i].OPRs.teleopOPR.teleopSubtotalOPR = teamJson[i].OPRs.teleopOPR.teleopCommunityOPR + teamJson[i].OPRs.teleopOPR.superChangedNodesOPR + teamJson[i].OPRs.teleopOPR.linksOPR;

        teamJson[i].OPRs.endGameOPR = calculateChargedStationStateOPR(false, teamJson[i].endGameState);

        teamJson[i].OPRs.totalOPR = teamJson[i].OPRs.autoOPR.autoSubtotalOPR + teamJson[i].OPRs.teleopOPR.teleopSubtotalOPR + teamJson[i].OPRs.endGameOPR;

    }

    teamJson.forEach(async jsonObj => {
        // Extract the value of the "team" attribute
        const teamValue = jsonObj.team;
    
        // Use the team value as the key in the object
        // and store the entire JSON object as the value
        if (teamValue) {
            teamDict[teamValue] = jsonObj;
        }
    });
    return teamDict;
}

function checkMatchesData(dataMatches) {
    var cleanMatches = [];
    for (let i = 0; i < dataMatches.length; i++) {
        var matchLegal = true;
        if (!dataMatches[i].comp_level || !dataMatches[i].event_key || !dataMatches[i].key || 
            !dataMatches[i].match_number || !dataMatches[i].actual_time || !dataMatches[i].set_number || 
            !dataMatches[i].winning_alliance) {
            matchLegal = false;
        } else if (!dataMatches[i].alliances.blue.team_keys || !dataMatches[i].alliances.blue.score || 
                   !dataMatches[i].alliances.red.team_keys || !dataMatches[i].alliances.red.score){
            matchLegal = false;
        } else if (!dataMatches[i].score_breakdown.blue.activationBonusAchieved || 
                   !dataMatches[i].score_breakdown.blue.autoBridgeState || 
                   !dataMatches[i].score_breakdown.blue.autoChargeStationRobot1 || 
                   !dataMatches[i].score_breakdown.blue.autoChargeStationRobot2 || 
                   !dataMatches[i].score_breakdown.blue.autoChargeStationRobot3 ||
                   !dataMatches[i].score_breakdown.blue.autoCommunity.B ||
                   !dataMatches[i].score_breakdown.blue.autoCommunity.M ||
                   !dataMatches[i].score_breakdown.blue.autoCommunity.T ||
                   !dataMatches[i].score_breakdown.blue.autoGamePieceCount ||
                   !dataMatches[i].score_breakdown.blue.autoGamePiecePoints ||
                   !dataMatches[i].score_breakdown.blue.autoPoints ||
                   !dataMatches[i].score_breakdown.blue.coopertitionCriteriaMet ||
                   !dataMatches[i].score_breakdown.blue.endGameBridgeState ||
                   !dataMatches[i].score_breakdown.blue.endGameChargeStationRobot1 ||
                   !dataMatches[i].score_breakdown.blue.endGameChargeStationRobot2 ||
                   !dataMatches[i].score_breakdown.blue.endGameChargeStationRobot3 ||
                   !dataMatches[i].score_breakdown.blue.foulCount ||
                   !dataMatches[i].score_breakdown.blue.foulPoints ||
                   !dataMatches[i].score_breakdown.blue.linkPoints ||
                   !dataMatches[i].score_breakdown.blue.links ||
                   !dataMatches[i].score_breakdown.blue.mobilityRobot1 ||
                   !dataMatches[i].score_breakdown.blue.mobilityRobot2 ||
                   !dataMatches[i].score_breakdown.blue.mobilityRobot3 ||
                   !dataMatches[i].score_breakdown.blue.rp ||
                   !dataMatches[i].score_breakdown.blue.sustainabilityBonusAchieved ||
                   !dataMatches[i].score_breakdown.blue.techFoulCount ||
                   !dataMatches[i].score_breakdown.blue.teleopCommunity.B ||
                   !dataMatches[i].score_breakdown.blue.teleopCommunity.M ||
                   !dataMatches[i].score_breakdown.blue.teleopCommunity.T ||
                   !dataMatches[i].score_breakdown.blue.teleopGamePieceCount ||
                   !dataMatches[i].score_breakdown.blue.teleopGamePiecePoints ||
                   !dataMatches[i].score_breakdown.blue.teleopPoints ||
                   !dataMatches[i].score_breakdown.blue.totalPoints){
            matchLegal = false;
        } 
        if (matchLegal) {
            cleanMatches.push(dataMatches[i]);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var apiKey = sessionStorage.getItem('apiKey');
    var year = sessionStorage.getItem('year');
    var eventInfo = JSON.parse(sessionStorage .getItem('eventInfo')) || {};
    var selectedItem = document.getElementById('select-event');
    var lblEventType = document.getElementById('lblEventType');
    var lblEventCode = document.getElementById('lblEventCode');
    var eventDropdown = document.getElementById('event-dropdown');
    var lblCity = document.getElementById('lblCity');
    var lblProvince = document.getElementById('lblProvince');
    var lblCountry = document.getElementById('lblCountry');
    var lblDistrict = document.getElementById('lblDistrict');

    // If not, fetch new eventInfo
    let events_info; // Declare the array to store event information

    function fetchAndDisplayMatches(eventKey) {
        return new Promise((resolve, reject) => {
            fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`, {
                headers: {
                    'X-TBA-Auth-Key': apiKey
                }
            })
            .then(response => response.json())
            .then(dataMatches => {

                const sortedMatches = dataMatches.sort((a, b) => {
                    const compLevelOrder = {
                        'qm': 1,
                        'ef': 2,
                        'qf': 3,
                        'sf': 4,
                        'f': 5
                    };
            
                    const compLevelComparison = compLevelOrder[a.comp_level] - compLevelOrder[b.comp_level];
            
                    if (compLevelComparison === 0) {
                        if (a.comp_level === 'qm' || a.comp_level === 'f' ) {
                            return a.match_number - b.match_number;
                        } else {
                            return a.set_number - b.set_number;
                        }
                    }
            
                    return compLevelComparison;
                });

                sessionStorage.setItem('uniqueTeamList', JSON.stringify(getUniqueTeamKeys(dataMatches)));
                sessionStorage.setItem('matchesData', JSON.stringify(sortedMatches));

                if (dataMatches.length === 0) {
                    sessionStorage.setItem('teamStats', JSON.stringify([]));
                    window.alert("The event you've selected does not currently have any match data, please return to Home to select another event");
                }else {
                    dataMatches = checkMatchesData(dataMatches);
                    sessionStorage.setItem('teamStats', JSON.stringify(calculateAllVariableProbability(sortedMatches)));
                }



                
                resolve();
            })
            .catch(error => {
                console.error('Fetch error for matches:', error); 
                console.log(error.message);
                window.alert("there's error in the API data for the event, cannot load, please load another event");
                console.log(error.input);
                reject(error);
            });
        });
    }

    fetch(`https://www.thebluealliance.com/api/v3/events/${year}/simple`, {
        headers: {
            'X-TBA-Auth-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        events_info = data;

        events_info.forEach(event => {
            const eventListItem = document.createElement('li');
            eventListItem.textContent = `${event.event_code} - ${event.name}`;

            eventListItem.addEventListener('click', function () {
                fetchAndDisplayMatches(event.key).then(() => {
                    selectedItem.textContent = eventListItem.textContent;

                    const eventReadyEvent = new Event('eventReady');
                    document.dispatchEvent(eventReadyEvent);

                    // Update eventInfo
                    eventInfo.eventType = getEventType(event.event_type);
                    eventInfo.eventCode = event.key;
                    eventInfo.city = event.city;
                    eventInfo.province = event.state_prov;
                    eventInfo.country = event.country;
                    eventInfo.district = (event.district == null) ? "N.A." : event.district.display_name;
                    eventInfo.name = event.name

                    // Update page with eventInfo
                    updatePageWithEventInfo(eventInfo);

                    // Store eventInfo in sessionStorage 
                    sessionStorage.setItem('eventInfo', JSON.stringify(eventInfo));
                });
            });

            eventDropdown.appendChild(eventListItem);
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

    if (Object.keys(eventInfo).length > 0) {
        // If eventInfo is already present in sessionStorage , use it
        updatePageWithEventInfo(eventInfo);
    }


    function updatePageWithEventInfo(eventInfo) {
        // Update the page with eventInfo
        lblEventCode.textContent = eventInfo.eventCode;
        lblEventType.textContent = eventInfo.eventType;
        lblCity.textContent = eventInfo.city;
        lblProvince.textContent = eventInfo.province;
        lblCountry.textContent = eventInfo.country;
        lblDistrict.textContent = eventInfo.district;
        selectedItem.textContent = `${eventInfo.eventCode.substring(4)} - ${eventInfo.name}`;
    }

    function getEventType(eventType) {
        // Function to map event types based on the event_type value
        switch (eventType) {
            case 0:
                return "Regional Event";
            case 1:
                return "District Qualification Event";
            case 2:
                return "District Championship";
            case 3:
                return "FIRST Championship Division";
            case 4:
                return "Einstein (FIRST Champ Finals)";
            case 5:
                return "District Championship Division";
            case 6:
                return "Festival of Champions";
            case 7:
                return "Remote Event";
            case 99:
                return "Offseason Event";
            case 100:
                return "Preseason Event";
            default:
                return "Unlabeled Event";
        }
    }
});