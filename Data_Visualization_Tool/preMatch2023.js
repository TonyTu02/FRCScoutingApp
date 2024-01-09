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

function populateTeamNumbers(match) {
    document.getElementById('blueLbl1').textContent = match.alliances.blue.team_keys[0];
    document.getElementById('blueLbl2').textContent = match.alliances.blue.team_keys[1];
    document.getElementById('blueLbl3').textContent = match.alliances.blue.team_keys[2];
    document.getElementById('redLbl1').textContent = match.alliances.red.team_keys[0];
    document.getElementById('redLbl2').textContent = match.alliances.red.team_keys[1];
    document.getElementById('redLbl3').textContent = match.alliances.red.team_keys[2];

    return [match.alliances.blue.team_keys[0], match.alliances.blue.team_keys[1], match.alliances.blue.team_keys[2], match.alliances.red.team_keys[0], match.alliances.red.team_keys[1], match.alliances.red.team_keys[2]]
}

function generateCombinedOPRBarGraph(blueCombinedOPRChart, redCombinedOPRChart, blue1, blue2, blue3, red1, red2, red3){
    var blueChartColor = ["#1177dd", "#3399ff", "#55AAff"];
    var redChartColor = ["#dd3030", "#ff5050", "#ff7272"];
    var blueCombinedOPRCanvas = document.getElementById("combinedOPR-left").getContext('2d');
    var redCombinedOPRCanvas = document.getElementById("combinedOPR-right").getContext('2d');
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    var blueCombinedOPR = teamStats[blue1].OPRs.totalOPR + teamStats[blue2].OPRs.totalOPR + teamStats[blue3].OPRs.totalOPR;
    var redCombinedOPR = teamStats[red1].OPRs.totalOPR + teamStats[red2].OPRs.totalOPR + teamStats[red3].OPRs.totalOPR;

    document.getElementById("lblTotalOPR - left").textContent = `Summary: ${blueCombinedOPR.toFixed(2)}`;
    document.getElementById("lblTotalOPR - right").textContent = `Summary: ${redCombinedOPR.toFixed(2)}`;

    if (blueCombinedOPRChart){
        blueCombinedOPRChart.destroy();
    }
    if (redCombinedOPRChart){
        redCombinedOPRChart.destroy();
    }

    blueCombinedOPRChart = new Chart(blueCombinedOPRCanvas, {
        type: 'bar',
        data: {
          labels: "Blue Alliance",
          datasets: [
            {
              label: blue1,
              data: [teamStats[blue1].OPRs.totalOPR],
              backgroundColor: blueChartColor[0],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: blue2,
              data: [teamStats[blue2].OPRs.totalOPR],
              backgroundColor: blueChartColor[1],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: blue3,
              data: [teamStats[blue3].OPRs.totalOPR],
              backgroundColor: blueChartColor[2],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            }
          ]
        },
        options: {
          events: [],
          indexAxis: 'y',
          aspectRatio: 5,
          scales: {
            x: {
              beginAtZero: true,
              max: 250, 
              min: 0,
              stacked: true,
              display: true
            },
            y: {
              stacked: true,
              display: false,
            }
          },
          animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            }
          },
          datasets: {
            bar: {
                barThickness: 100 // Adjust the thickness as needed
            }
          },
          events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    redCombinedOPRChart = new Chart(redCombinedOPRCanvas, {
        type: 'bar',
        data: {
          labels: "Red Alliance",
          datasets: [
            {
              label: red1,
              data: [teamStats[red1].OPRs.totalOPR],
              backgroundColor: redChartColor[0],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: red2,
              data: [teamStats[red2].OPRs.totalOPR],
              backgroundColor: redChartColor[1],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: red3,
              data: [teamStats[red3].OPRs.totalOPR],
              backgroundColor: redChartColor[2],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            }
          ]
        },
        options: {
          events: [],
          indexAxis: 'y',
          aspectRatio: 5,
          scales: {
            x: {
              beginAtZero: true,
              max: 250, 
              min: 0,
              stacked: true,
              display: true
            },
            y: {
              stacked: true,
              display: false,
            }
          },
          animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            }
          },
          datasets: {
            bar: {
                barThickness: 100 // Adjust the thickness as needed
            }
          },
          events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    return [blueCombinedOPRChart, redCombinedOPRChart];
}

function generateTeamsOPRBarGraph(blueIndividualOPRChart, redIndividualOPRChart, blue1, blue2, blue3, red1, red2, red3){
    var blueChartColor = ["#1177dd", "#3399ff", "#55AAff"];
    var redChartColor = ["#dd3030", "#ff5050", "#ff7272"];
    var blueIndividualOPRCanvas = document.getElementById("individualOPR-left").getContext('2d');
    var redIndividualOPRCanvas = document.getElementById("individualOPR-right").getContext('2d');
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    if (blueIndividualOPRChart){
        blueIndividualOPRChart.destroy();
    }
    if (redIndividualOPRChart){
        redIndividualOPRChart.destroy();
    }

    blueIndividualOPRChart = new Chart(blueIndividualOPRCanvas, {
        type: 'bar',
        data: {
            labels: [blue1, blue2, blue3],
            datasets: [
              {
                label: "Atuo",
                data: [teamStats[blue1].OPRs.autoOPR.autoSubtotalOPR, teamStats[blue2].OPRs.autoOPR.autoSubtotalOPR, teamStats[blue3].OPRs.autoOPR.autoSubtotalOPR],
                backgroundColor: blueChartColor[0],
                borderWidth: 5,
                borderColor: '#1e1e1e'
              },
              {
                label: "Teleop",
                data: [teamStats[blue1].OPRs.teleopOPR.teleopSubtotalOPR, teamStats[blue2].OPRs.teleopOPR.teleopSubtotalOPR, teamStats[blue3].OPRs.teleopOPR.teleopSubtotalOPR],
                backgroundColor: blueChartColor[1],
                borderWidth: 5,
                borderColor: '#1e1e1e'
              },
              {
                label: "Endgame",
                data: [teamStats[blue1].OPRs.endGameOPR, teamStats[blue2].OPRs.endGameOPR, teamStats[blue3].OPRs.endGameOPR],
                backgroundColor: blueChartColor[2],
                borderWidth: 5,
                borderColor: '#1e1e1e'
              }
            ]
          },
        options: {
          events: [],
          indexAxis: 'y',
          aspectRatio: 5,
          scales: {
            x: {
              beginAtZero: true,
              max: 90, 
              min: 0,
              stacked: true,
              display: true
            },
            y: {
              stacked: true,
              display: true,
            }
          },
          animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            }
          },
          datasets: {
            bar: {
                barThickness: 50 // Adjust the thickness as needed
            }
          },
          events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    redIndividualOPRChart = new Chart(redIndividualOPRCanvas, {
        type: 'bar',
        data: {
          labels: [red1, red2, red3],
          datasets: [
            {
              label: "Atuo",
              data: [teamStats[red1].OPRs.autoOPR.autoSubtotalOPR, teamStats[red2].OPRs.autoOPR.autoSubtotalOPR, teamStats[red3].OPRs.autoOPR.autoSubtotalOPR],
              backgroundColor: redChartColor[0],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: "Teleop",
              data: [teamStats[red1].OPRs.teleopOPR.teleopSubtotalOPR, teamStats[red2].OPRs.teleopOPR.teleopSubtotalOPR, teamStats[red3].OPRs.teleopOPR.teleopSubtotalOPR],
              backgroundColor: redChartColor[1],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            },
            {
              label: "Endgame",
              data: [teamStats[red1].OPRs.endGameOPR, teamStats[red2].OPRs.endGameOPR, teamStats[red3].OPRs.endGameOPR],
              backgroundColor: redChartColor[2],
              borderWidth: 5,
              borderColor: '#1e1e1e'
            }
          ]
        },
        options: {
          events: [],
          indexAxis: 'y',
          aspectRatio: 5,
          scales: {
            x: {
              beginAtZero: true,
              max: 90, 
              min: 0,
              stacked: true,
              display: true
            },
            y: {
              stacked: true,
              display: true,
            }
          },
          animation: {
              duration: 1000,
              easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            }
          },
          datasets: {
            bar: {
                barThickness: 50 // Adjust the thickness as needed
            }
          },
          events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    return [blueIndividualOPRChart, redIndividualOPRChart];

}

function generateAutoPieGraph(blue1AutoPieChart, blue2AutoPieChart, blue3AutoPieChart, red1AutoPieChart, red2AutoPieChart, red3AutoPieChart, blue1, blue2, blue3, red1, red2, red3){
    var blueChartColor = ["#1177dd", "#3399ff", "#55AAff"];
    var redChartColor = ["#dd3030", "#ff5050", "#ff7272"];
    var blue1AutoPieCanvas = document.getElementById("combinedOPR-left").getContext('2d');
    var blue2AutoPieCanvas = document.getElementById("combinedOPR-right").getContext('2d');
    var blue3AutoPieCanvas = document.getElementById("combinedOPR-left").getContext('2d');
    var red1AutoPieCanvas = document.getElementById("combinedOPR-right").getContext('2d');
    var red2AutoPieCanvas = document.getElementById("combinedOPR-left").getContext('2d');
    var red3AutoPieCanvas = document.getElementById("combinedOPR-right").getContext('2d');
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    document.getElementById('blueAutoLbl1').textContent = match.alliances.blue.team_keys[0];
    document.getElementById('blueAutoLbl2').textContent = match.alliances.blue.team_keys[1];
    document.getElementById('blueAutoLbl3').textContent = match.alliances.blue.team_keys[2];
    document.getElementById('redAutoLbl1').textContent = match.alliances.red.team_keys[0];
    document.getElementById('redAutoLbl2').textContent = match.alliances.red.team_keys[1];
    document.getElementById('redAutoLbl3').textContent = match.alliances.red.team_keys[2];

    if (blue1AutoPieChart){
        blue1AutoPieChart.destroy();
    }
    if (blue2AutoPieChart){
        blue2AutoPieChart.destroy();
    }
    if (blue3AutoPieChart){
        blue3AutoPieChart.destroy();
    }
    if (red1AutoPieChart){
        red1AutoPieChart.destroy();
    }
    if (red2AutoPieChart){
        red2AutoPieChart.destroy();
    }
    if (red3AutoPieChart){
        red3AutoPieChart.destroy();
    }

    
}


function onPageVisible() {
    var matchesData = JSON.parse(sessionStorage.getItem('matchesData')) || [];
    var eventInfo = JSON.parse(sessionStorage.getItem('eventInfo')) || {};
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats')) || {};

    var blueCombinedOPRChart = undefined;
    var redCombinedOPRChart = undefined;
    var blueIndividualOPRCart = undefined;
    var redIndividualOPRCart = undefined;

    if (Object.keys(eventInfo).length === 0) {
        document.getElementById("no_event_message").textContent = "No event selected yet, please return to Home to select an event";
        
    }else{
        updatePageWithEventInfo(eventInfo);
        document.getElementById("no_event_message").textContent = "The event you've selected does not currently have any match data, please return to Home to select another event";
    }
    

    if (matchesData.length === 0) {
        document.getElementById("left_block").style.display = "none";
        document.getElementById("right_block").style.display = "none";
        document.getElementById("error_message_container").style.display = "flex";
        document.getElementById("error_message_container").style.alignItems = "center";
    }else{
        console.log("no event message gone");
        document.getElementById("left_block").style.display = "flex";
        document.getElementById("right_block").style.display = "flex";
        document.getElementById("error_message_container").style.display = "none";

        matchesData.forEach(match => {
            const matchItem = document.createElement('li');
            matchName = "";
            switch (match.comp_level) {
                case 'f': 
                    matchName += "final - ";
                    matchName += match.match_number;
                    break;
                case 'sf': 
                    matchName += "semi-final - ";
                    matchName += match.set_number;
                    break;
                case 'qf': 
                    matchName += "quarter-final - ";
                    matchName += match.set_number;
                    break;
                case 'ef': 
                    matchName += "eighth-final - ";
                    matchName += match.set_number;
                    break;
                case 'qm':
                    matchName += "qualification - ";
                    matchName += match.match_number;
                    break;
                default: 
                    matchName += "Unknown Match Type - ";
                    matchName += match.match_number;

            }

            matchItem.textContent = matchName;
            document.getElementById("match-dropdown").appendChild(matchItem);

            matchItem.addEventListener('click', function () {
                var blue1 = "";
                var blue2 = "";
                var blue3 = "";
                var red1 = "";
                var red2 = "";
                var red3 = "";

                [blue1, blue2, blue3, red1, red2, red3] = populateTeamNumbers(match);
                console.log(blue1, blue2, blue3, red1, red2, red3);

                [blueCombinedOPRChart, redCombinedOPRChart] = generateCombinedOPRBarGraph(blueCombinedOPRChart, redCombinedOPRChart, blue1, blue2, blue3, red1, red2, red3);
                [blueIndividualOPRCart, redIndividualOPRCart] = generateTeamsOPRBarGraph(blueIndividualOPRCart, redIndividualOPRCart, blue1, blue2, blue3, red1, red2, red3);

                
            });
        });


    }
}