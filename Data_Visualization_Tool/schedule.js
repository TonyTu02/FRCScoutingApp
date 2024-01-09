document.addEventListener('DOMContentLoaded', function () {
    // This event is fired when the DOM is fully loaded

    // Check if the page is currently visible
    if (document.visibilityState === 'visible') {
        onPageVisible();
    } else {
        // If not visible, listen for the visibilitychange event
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
                onPageVisible();
            }
        });
    }
});

function convertTime(unixTimestamp) {
    // Create a new Date object and convert the timestamp to milliseconds
    const date = new Date(unixTimestamp * 1000);
  
    // Extract various components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // Format the components into a human-readable string
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedTime;
}

function teamKeyToTeamNumber(inputString) {
    if (inputString.length >= 3) {
      return inputString.substring(3);
    } else {
      return inputString;
    }
}

function updatePageWithEventInfo(eventInfo) {
    var lblEventType = document.getElementById('lblEventType');
    var lblEventCode = document.getElementById('lblEventCode');
    var lblEventName = document.getElementById('lblEventName');
    var lblCity = document.getElementById('lblCity');
    var lblProvince = document.getElementById('lblProvince');
    var lblCountry = document.getElementById('lblCountry');
    var lblDistrict = document.getElementById('lblDistrict');

    // Update the page with eventInfo
    lblEventCode.textContent = eventInfo.eventCode;
    lblEventType.textContent = eventInfo.eventType;
    lblCity.textContent = eventInfo.city;
    lblProvince.textContent = eventInfo.province;
    lblCountry.textContent = eventInfo.country;
    lblDistrict.textContent = eventInfo.district;
    lblEventName.textContent = eventInfo.name;
}

function onPageVisible() {
    var matchesData = JSON.parse(sessionStorage.getItem('matchesData')) || [];
    var eventInfo = JSON.parse(sessionStorage.getItem('eventInfo')) || {};
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats')) || {};

    var blueFinals = [];
    var redFinals = [];
    var predBlueFinals = [];
    var predRedFinals = [];
    var predAccuracy = 0;

    if (Object.keys(eventInfo).length === 0) {
        document.getElementById("no_event_message").textContent = "No event selected yet, please return to Home to select an event";
        
    }else{
        updatePageWithEventInfo(eventInfo);
        document.getElementById("no_event_message").textContent = "The event you've selected does not currently have any match data, please return to Home to select another event";
    }
    

    if (matchesData.length === 0) {
        document.getElementById("loader_container").style.display = "none";
        document.getElementById("no_event_message").style.display = "flex";
        document.getElementById("no_event_message").style.alignItems = "center";
    }else{
        console.log("no event message gone");
        document.getElementById("no_event_message").style.display = "none";
        document.getElementById("loader_container").style.display = "flex";
        document.getElementById("loader_container").style.alignItems = "center";

        

        var matchesTable = document.getElementById('matches-table'); 
        const schema = document.createElement('tr');

        const cell_match_type = document.createElement('td');
        const cell_match_number = document.createElement('td');
        const cell_blue_1 = document.createElement('td');
        const cell_blue_2 = document.createElement('td');
        const cell_blue_3 = document.createElement('td');
        const cell_red_1 = document.createElement('td');
        const cell_red_2 = document.createElement('td');
        const cell_red_3 = document.createElement('td');
        const cell_blue_final = document.createElement('td');
        const cell_red_final = document.createElement('td');
        const cell_winning_alliance = document.createElement('td');
        const cell_blue_pred = document.createElement('td');
        const cell_red_pred = document.createElement('td');
        const cell_pred_winning_alliance = document.createElement('td');
        const cell_time = document.createElement('td');

        cell_match_type.textContent = "Match Type";
        cell_match_number.textContent = "Match #";
        cell_blue_1.textContent = "Blue 1";
        cell_blue_2.textContent = "Blue 2";
        cell_blue_3.textContent = "Blue 3";
        cell_red_1.textContent = "Red 1";
        cell_red_2.textContent = "Red 2";
        cell_red_3.textContent = "Red 3";
        cell_blue_final.textContent = "Blue Final";
        cell_red_final.textContent = "Red Final";
        cell_winning_alliance.textContent = "Winning";
        cell_blue_pred.textContent = "Blue Pred";
        cell_red_pred.textContent = "Red Pred";
        cell_pred_winning_alliance.textContent = "Pred Win";
        cell_time.textContent = "Uploaded Time";

        cell_match_type.classList.add('table_cell_neutral');
        cell_match_number.classList.add('table_cell_neutral');
        cell_blue_1.classList.add('table_cell_blue');
        cell_blue_2.classList.add('table_cell_blue');
        cell_blue_3.classList.add('table_cell_blue');
        cell_red_1.classList.add('table_cell_red');
        cell_red_2.classList.add('table_cell_red');
        cell_red_3.classList.add('table_cell_red');
        cell_blue_final.classList.add('table_cell_blue');
        cell_red_final.classList.add('table_cell_red');
        cell_winning_alliance.classList.add('table_cell_neutral');
        cell_blue_pred.classList.add('table_cell_blue');
        cell_red_pred.classList.add('table_cell_red');
        cell_pred_winning_alliance.classList.add('table_cell_neutral');
        cell_time.classList.add('table_cell_neutral');

        schema.appendChild(cell_match_type);
        schema.appendChild(cell_match_number);
        schema.appendChild(cell_blue_1);
        schema.appendChild(cell_blue_2);
        schema.appendChild(cell_blue_3);
        schema.appendChild(cell_red_1);
        schema.appendChild(cell_red_2);
        schema.appendChild(cell_red_3);
        schema.appendChild(cell_blue_final);
        schema.appendChild(cell_red_final);
        schema.appendChild(cell_winning_alliance);
        schema.appendChild(cell_blue_pred);
        schema.appendChild(cell_red_pred);
        schema.appendChild(cell_pred_winning_alliance);
        schema.appendChild(cell_time);

        // Append the row to the table
        matchesTable.appendChild(schema);

        // Display the sorted matches in the table
        matchesData.forEach(matchesData => {

            const row = document.createElement('tr');

            const cell_match_type = document.createElement('td');
            const cell_match_number = document.createElement('td');
            const cell_blue_1 = document.createElement('td');
            const cell_blue_2 = document.createElement('td');
            const cell_blue_3 = document.createElement('td');
            const cell_red_1 = document.createElement('td');
            const cell_red_2 = document.createElement('td');
            const cell_red_3 = document.createElement('td');
            const cell_blue_final = document.createElement('td');
            const cell_red_final = document.createElement('td');
            const cell_winning_alliance = document.createElement('td');
            const cell_blue_pred = document.createElement('td');
            const cell_red_pred = document.createElement('td');
            const cell_pred_winning_alliance = document.createElement('td');
            const cell_time = document.createElement('td');

            switch (matchesData.comp_level) {
                case 'f': 
                    cell_match_type.textContent = "final";
                    cell_match_number.textContent = matchesData.match_number;
                    break;
                case 'sf': 
                    cell_match_type.textContent = "semi-final";
                    cell_match_number.textContent = matchesData.set_number;
                    break;
                case 'qf': 
                    cell_match_type.textContent = "quarter-final";
                    cell_match_number.textContent = matchesData.set_number;
                    break;
                case 'ef': 
                    cell_match_type.textContent = "eighth-final";
                    cell_match_number.textContent = matchesData.set_number;
                    break;
                case 'qm':
                    cell_match_type.textContent = "qualification";
                    cell_match_number.textContent = matchesData.match_number;
                    break;
                default: 
                    cell_match_type.textContent = matchesData.comp_level;
                    cell_match_number.textContent = matchesData.set_number;

            }

            cell_blue_1.textContent = teamKeyToTeamNumber(matchesData.alliances.blue.team_keys[0]);
            cell_blue_2.textContent = teamKeyToTeamNumber(matchesData.alliances.blue.team_keys[1]);
            cell_blue_3.textContent = teamKeyToTeamNumber(matchesData.alliances.blue.team_keys[2]);
            cell_red_1.textContent = teamKeyToTeamNumber(matchesData.alliances.red.team_keys[0]);
            cell_red_2.textContent = teamKeyToTeamNumber(matchesData.alliances.red.team_keys[1]);
            cell_red_3.textContent = teamKeyToTeamNumber(matchesData.alliances.red.team_keys[2]);

            cell_blue_final.textContent = matchesData.alliances.blue.score;
            cell_red_final.textContent = matchesData.alliances.red.score;

            cell_winning_alliance.textContent = matchesData.winning_alliance;

            blue_combined_OPR = Math.round(teamStats[matchesData.alliances.blue.team_keys[0]].OPRs.totalOPR + teamStats[matchesData.alliances.blue.team_keys[1]].OPRs.totalOPR + teamStats[matchesData.alliances.blue.team_keys[2]].OPRs.totalOPR);
            red_combined_OPR = Math.round(teamStats[matchesData.alliances.red.team_keys[0]].OPRs.totalOPR + teamStats[matchesData.alliances.red.team_keys[1]].OPRs.totalOPR + teamStats[matchesData.alliances.red.team_keys[2]].OPRs.totalOPR);

            cell_blue_pred.textContent = blue_combined_OPR;
            cell_red_pred.textContent = red_combined_OPR;
            if (blue_combined_OPR > red_combined_OPR) {
                cell_pred_winning_alliance.textContent = "blue";
                cell_pred_winning_alliance.classList.add('table_cell_blue');
            }else if (blue_combined_OPR < red_combined_OPR) {
                cell_pred_winning_alliance.textContent = "red";
                cell_pred_winning_alliance.classList.add('table_cell_red');
            }else {
                cell_pred_winning_alliance.textContent = "tie";
                cell_pred_winning_alliance.classList.add('table_cell_neutral');
            }

            cell_time.textContent = convertTime(matchesData.actual_time)


            cell_match_type.classList.add('table_cell_neutral');
            cell_match_number.classList.add('table_cell_neutral');
            cell_blue_1.classList.add('table_cell_blue');
            cell_blue_2.classList.add('table_cell_blue');
            cell_blue_3.classList.add('table_cell_blue');
            cell_red_1.classList.add('table_cell_red');
            cell_red_2.classList.add('table_cell_red');
            cell_red_3.classList.add('table_cell_red');
            cell_blue_final.classList.add('table_cell_blue');
            cell_red_final.classList.add('table_cell_red');
            cell_blue_pred.classList.add('table_cell_blue');
            cell_red_pred.classList.add('table_cell_red');
            cell_time.classList.add('table_cell_neutral');

            if (matchesData.winning_alliance == "blue") {
                cell_winning_alliance.classList.add('table_cell_blue');
            }else if (matchesData.winning_alliance == "red") {
                cell_winning_alliance.classList.add('table_cell_red');
            }else {
                cell_winning_alliance.textContent = "tie";
                cell_winning_alliance.classList.add('table_cell_neutral');
            }

            blueFinals.push(matchesData.alliances.blue.score);
            redFinals.push(matchesData.alliances.red.score);
            predBlueFinals.push(blue_combined_OPR);
            predRedFinals.push(red_combined_OPR);
            if(cell_pred_winning_alliance.textContent == cell_winning_alliance.textContent) {
                predAccuracy++;
            }

            row.appendChild(cell_match_type);
            row.appendChild(cell_match_number);
            row.appendChild(cell_blue_1);
            row.appendChild(cell_blue_2);
            row.appendChild(cell_blue_3);
            row.appendChild(cell_red_1);
            row.appendChild(cell_red_2);
            row.appendChild(cell_red_3);
            row.appendChild(cell_blue_final);
            row.appendChild(cell_red_final);
            row.appendChild(cell_winning_alliance);
            row.appendChild(cell_blue_pred);
            row.appendChild(cell_red_pred);
            row.appendChild(cell_pred_winning_alliance);
            row.appendChild(cell_time);

            // Append the row to the table
            matchesTable.appendChild(row);
        });

        const accuracy = document.createElement('tr');
    
        const cell_match_type_accuracy = document.createElement('td');
        const cell_match_number_accuracy = document.createElement('td');
        const cell_blue_1_accuracy = document.createElement('td');
        const cell_blue_2_accuracy = document.createElement('td');
        const cell_blue_3_accuracy = document.createElement('td');
        const cell_red_1_accuracy = document.createElement('td');
        const cell_red_2_accuracy = document.createElement('td');
        const cell_red_3_accuracy = document.createElement('td');
        const cell_blue_final_accuracy = document.createElement('td');
        const cell_red_final_accuracy = document.createElement('td');
        const cell_winning_alliance_accuracy = document.createElement('td');
        const cell_blue_pred_accuracy = document.createElement('td');
        const cell_red_pred_accuracy = document.createElement('td');
        const cell_pred_winning_alliance_accuracy = document.createElement('td');
        const cell_time_accuracy = document.createElement('td');

        cell_match_type_accuracy.textContent = "Prediction";
        cell_match_number_accuracy.textContent = "Accuracy";
        cell_blue_1_accuracy.textContent = "";
        cell_blue_2_accuracy.textContent = "";
        cell_blue_3_accuracy.textContent = "";
        cell_red_1_accuracy.textContent = "";
        cell_red_2_accuracy.textContent = "";
        cell_red_3_accuracy.textContent = "";
        cell_blue_final_accuracy.textContent = (blueFinals.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / matchesData.length).toFixed(2);
        cell_red_final_accuracy.textContent = (redFinals.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / matchesData.length).toFixed(2);
        cell_winning_alliance_accuracy.textContent = "-";
        cell_blue_pred_accuracy.textContent = (predBlueFinals.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / matchesData.length).toFixed(2);
        cell_red_pred_accuracy.textContent = (predRedFinals.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / matchesData.length).toFixed(2);
        cell_pred_winning_alliance_accuracy.textContent = `${(predAccuracy / matchesData.length).toFixed(4) * 100}%`;
        cell_time_accuracy.textContent = "";

        cell_match_type_accuracy.classList.add('table_cell_neutral');
        cell_match_number_accuracy.classList.add('table_cell_neutral');
        cell_blue_1_accuracy.classList.add('table_cell_blue');
        cell_blue_2_accuracy.classList.add('table_cell_blue');
        cell_blue_3_accuracy.classList.add('table_cell_blue');
        cell_red_1_accuracy.classList.add('table_cell_red');
        cell_red_2_accuracy.classList.add('table_cell_red');
        cell_red_3_accuracy.classList.add('table_cell_red');
        cell_blue_final_accuracy.classList.add('table_cell_blue');
        cell_red_final_accuracy.classList.add('table_cell_red');
        cell_winning_alliance_accuracy.classList.add('table_cell_neutral');
        cell_blue_pred_accuracy.classList.add('table_cell_blue');
        cell_red_pred_accuracy.classList.add('table_cell_red');
        cell_pred_winning_alliance_accuracy.classList.add('table_cell_neutral');
        cell_time_accuracy.classList.add('table_cell_neutral');

        accuracy.appendChild(cell_match_type_accuracy);
        accuracy.appendChild(cell_match_number_accuracy);
        accuracy.appendChild(cell_blue_1_accuracy);
        accuracy.appendChild(cell_blue_2_accuracy);
        accuracy.appendChild(cell_blue_3_accuracy);
        accuracy.appendChild(cell_red_1_accuracy);
        accuracy.appendChild(cell_red_2_accuracy);
        accuracy.appendChild(cell_red_3_accuracy);
        accuracy.appendChild(cell_blue_final_accuracy);
        accuracy.appendChild(cell_red_final_accuracy);
        accuracy.appendChild(cell_winning_alliance_accuracy);
        accuracy.appendChild(cell_blue_pred_accuracy);
        accuracy.appendChild(cell_red_pred_accuracy);
        accuracy.appendChild(cell_pred_winning_alliance_accuracy);
        accuracy.appendChild(cell_time_accuracy);

        // Append the row to the table
        matchesTable.appendChild(accuracy);

        document.getElementById("loader_container").style.display = "none";
    }

    
    

}

/*
document.addEventListener('DOMContentLoaded', function () {

});*/