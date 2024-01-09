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

function generateSummaryOPRBarGraph(teamKey, blue, overallOPRChart) {
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    if (blue) {
        var chartColor = ["#1177dd", "#3399ff", "#55AAff"];
        var overallOPRCanvas = document.getElementById("summaryOPR-left").getContext('2d');
    }else {
        var chartColor = ["#dd3030", "#ff5050", "#ff7272"];
        var overallOPRCanvas = document.getElementById("summaryOPR-right").getContext('2d');
    }

    if (overallOPRChart){
        overallOPRChart.destroy();
    }
    
    overallOPRChart = new Chart(overallOPRCanvas, {
      type: 'bar',
      data: {
        labels: [teamKey],
        datasets: [
          {
            label: 'Auto',
            data: [teamStats[teamKey].OPRs.autoOPR.autoSubtotalOPR.toFixed(2)],
            backgroundColor: chartColor[0],
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'Teleop',
            data: [teamStats[teamKey].OPRs.teleopOPR.teleopSubtotalOPR.toFixed(2)],
            backgroundColor: chartColor[1],
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'Endgame',
            data: [teamStats[teamKey].OPRs.endGameOPR.toFixed(2)],
            backgroundColor: chartColor[2],
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
        events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
      }
    });

    return overallOPRChart;
}

function generateBreakdownPieChart(teamKey, blue, auto, breakdownPieChart) {
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    if (blue) {
        var chartColor = ["#1177dd", "#3399ff", "#55AAff"];
    }else {
        var chartColor = ["#dd3030", "#ff5050", "#ff7272"];
    }

    if (auto) {
        var community = teamStats[teamKey].OPRs.autoOPR.autoCommunityOPR.toFixed(2);
        var chargedStation = teamStats[teamKey].OPRs.autoOPR.autoEndstateOPR.toFixed(2);
        var mobility = teamStats[teamKey].OPRs.autoOPR.autoMobilityOPR.toFixed(2);
        var chartLabels = ['mobility', 'charged station', 'community'];
        var chartData = [mobility, chargedStation, community];

        if (blue) {
            var breakdownCanvas = document.getElementById("autoOPRPie-left").getContext('2d');
        }else {
            var breakdownCanvas = document.getElementById("autoOPRPie-right").getContext('2d');
        }
    } else {
        var community = teamStats[teamKey].OPRs.teleopOPR.teleopCommunityOPR.toFixed(2);
        var links = teamStats[teamKey].OPRs.teleopOPR.linksOPR.toFixed(2);
        var superCharged = teamStats[teamKey].OPRs.teleopOPR.superChangedNodesOPR.toFixed(2);
        var chartLabels = ['superCharged nodes', 'links', 'community'];
        var chartData = [superCharged, links, community];

        if (blue) {
            var breakdownCanvas = document.getElementById("teleOPRPie-left").getContext('2d');
        }else {
            var breakdownCanvas = document.getElementById("teleOPRPie-right").getContext('2d');
        }
    }

    if (breakdownPieChart){
        breakdownPieChart.destroy();
    }
    
    breakdownPieChart = new Chart(breakdownCanvas, { 
        type: 'doughnut', // Use 'doughnut' for ring chart
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColor,
                borderWidth: 5,
                borderColor: '#1e1e1e'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '20%', // Adjust the cutout percentage for the center hole
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false // Set display to false to hide the legend
                }
            },
            events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    return breakdownPieChart;
}

function generateEndgamePieChart(teamKey, blue, endGamePieChart) {
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));
    var chartData = [teamStats[teamKey].endGameState.Engaged, teamStats[teamKey].endGameState.Docked, teamStats[teamKey].endGameState.None, teamStats[teamKey].endGameState.Park];
    var chartLabels = ["Engaged", "Docked", "None", "Parked"];

    if (blue) {
        var chartColor = ["#1177dd", "#3399ff", "#55aaff", "#77ccff"];
        var endgameCanvas = document.getElementById("endgamePie - left");
    }else {
        var chartColor = ["#dd3030", "#ff5050", "#ff7272", "#ff9494"];
        var endgameCanvas = document.getElementById("endgamePie - right");
    }

    if (endGamePieChart){
        endGamePieChart.destroy();
    }
    
    endGamePieChart = new Chart(endgameCanvas, { 
        type: 'doughnut', // Use 'doughnut' for ring chart
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: chartColor,
                borderWidth: 5,
                borderColor: '#1e1e1e'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '20%', // Adjust the cutout percentage for the center hole
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false // Set display to false to hide the legend
                }
            },
            events: ['click', 'mousemove', 'mouseout', 'touchstart', 'touchmove'],
        }
    });

    return endGamePieChart;
}


function parseFloatCustom(num){
    if (num < 0) {
        return 0;
    }else {
        num = Math.trunc(Math.round(num * 100)) / 100;
        return num;
    }
}

function parsePercentage(num){
    num = parseFloatCustom(num);
    num *=100;
    return `${Math.trunc(Math.round(num))}%`;
}

function annotateCommunity(teamKey, blue, auto){
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));

    if (auto) {
        if (blue) {
            var totalGamePieceCount = document.getElementById("autoCommunityGamePieceTotal - left");
            var BGamePieceCount = document.getElementById("autoCommunityGamePieceB - left");
            var MGamePieceCount = document.getElementById("autoCommunityGamePieceM - left");
            var TGamePieceCount = document.getElementById("autoCommunityGamePieceT - left");

            var B1 = document.getElementById("autoCommunityB1 - left");
            var B2 = document.getElementById("autoCommunityB2 - left");
            var B3 = document.getElementById("autoCommunityB3 - left");
            var B4 = document.getElementById("autoCommunityB4 - left");
            var B5 = document.getElementById("autoCommunityB5 - left");
            var B6 = document.getElementById("autoCommunityB6 - left");
            var B7 = document.getElementById("autoCommunityB7 - left");
            var B8 = document.getElementById("autoCommunityB8 - left");
            var B9 = document.getElementById("autoCommunityB9 - left");

            var M1 = document.getElementById("autoCommunityM1 - left");
            var M2 = document.getElementById("autoCommunityM2 - left");
            var M3 = document.getElementById("autoCommunityM3 - left");
            var M4 = document.getElementById("autoCommunityM4 - left");
            var M5 = document.getElementById("autoCommunityM5 - left");
            var M6 = document.getElementById("autoCommunityM6 - left");
            var M7 = document.getElementById("autoCommunityM7 - left");
            var M8 = document.getElementById("autoCommunityM8 - left");
            var M9 = document.getElementById("autoCommunityM9 - left");

            var T1 = document.getElementById("autoCommunityT1 - left");
            var T2 = document.getElementById("autoCommunityT2 - left");
            var T3 = document.getElementById("autoCommunityT3 - left");
            var T4 = document.getElementById("autoCommunityT4 - left");
            var T5 = document.getElementById("autoCommunityT5 - left");
            var T6 = document.getElementById("autoCommunityT6 - left");
            var T7 = document.getElementById("autoCommunityT7 - left");
            var T8 = document.getElementById("autoCommunityT8 - left");
            var T9 = document.getElementById("autoCommunityT9 - left");
        }else {
            var totalGamePieceCount = document.getElementById("autoCommunityGamePieceTotal - right");
            var BGamePieceCount = document.getElementById("autoCommunityGamePieceB - right");
            var MGamePieceCount = document.getElementById("autoCommunityGamePieceM - right");
            var TGamePieceCount = document.getElementById("autoCommunityGamePieceT - right");

            var B1 = document.getElementById("autoCommunityB1 - right");
            var B2 = document.getElementById("autoCommunityB2 - right");
            var B3 = document.getElementById("autoCommunityB3 - right");
            var B4 = document.getElementById("autoCommunityB4 - right");
            var B5 = document.getElementById("autoCommunityB5 - right");
            var B6 = document.getElementById("autoCommunityB6 - right");
            var B7 = document.getElementById("autoCommunityB7 - right");
            var B8 = document.getElementById("autoCommunityB8 - right");
            var B9 = document.getElementById("autoCommunityB9 - right");

            var M1 = document.getElementById("autoCommunityM1 - right");
            var M2 = document.getElementById("autoCommunityM2 - right");
            var M3 = document.getElementById("autoCommunityM3 - right");
            var M4 = document.getElementById("autoCommunityM4 - right");
            var M5 = document.getElementById("autoCommunityM5 - right");
            var M6 = document.getElementById("autoCommunityM6 - right");
            var M7 = document.getElementById("autoCommunityM7 - right");
            var M8 = document.getElementById("autoCommunityM8 - right");
            var M9 = document.getElementById("autoCommunityM9 - right");

            var T1 = document.getElementById("autoCommunityT1 - right");
            var T2 = document.getElementById("autoCommunityT2 - right");
            var T3 = document.getElementById("autoCommunityT3 - right");
            var T4 = document.getElementById("autoCommunityT4 - right");
            var T5 = document.getElementById("autoCommunityT5 - right");
            var T6 = document.getElementById("autoCommunityT6 - right");
            var T7 = document.getElementById("autoCommunityT7 - right");
            var T8 = document.getElementById("autoCommunityT8 - right");
            var T9 = document.getElementById("autoCommunityT9 - right");
        }

        B1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[0]))}`;
        B2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[1]))}`;
        B3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[2]))}`;
        B4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[3]))}`;
        B5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[4]))}`;
        B6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[5]))}`;
        B7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[6]))}`;
        B8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[7]))}`;
        B9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.B[8]))}`;

        M1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[0]))}`;
        M2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[1]))}`;
        M3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[2]))}`;
        M4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[3]))}`;
        M5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[4]))}`;
        M6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[5]))}`;
        M7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[6]))}`;
        M8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[7]))}`;
        M9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.M[8]))}`;

        T1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[0]))}`;
        T2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[1]))}`;
        T3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[2]))}`;
        T4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[3]))}`;
        T5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[4]))}`;
        T6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[5]))}`;
        T7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[6]))}`;
        T8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[7]))}`;
        T9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].auto.autoCommunity.T[8]))}`;


        B1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[0]))}`;
        B2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[1]))}`;
        B3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[2]))}`;
        B4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[3]))}`;
        B5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[4]))}`;
        B6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[5]))}`;
        B7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[6]))}`;
        B8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[7]))}`;
        B9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.B[8]))}`;

        M1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[0]))}`;
        M2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[1]))}`;
        M3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[2]))}`;
        M4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[3]))}`;
        M5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[4]))}`;
        M6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[5]))}`;
        M7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[6]))}`;
        M8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[7]))}`;
        M9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.M[8]))}`;

        T1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[0]))}`;
        T2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[1]))}`;
        T3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[2]))}`;
        T4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[3]))}`;
        T5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[4]))}`;
        T6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[5]))}`;
        T7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[6]))}`;
        T8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[7]))}`;
        T9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].auto.autoCommunity.T[8]))}`;

        var Bcount = parseFloatCustom(parseFloat(teamStats[teamKey].auto.autoGamePieceCount.B));
        var Mcount = parseFloatCustom(parseFloat(teamStats[teamKey].auto.autoGamePieceCount.M));
        var Tcount = parseFloatCustom(parseFloat(teamStats[teamKey].auto.autoGamePieceCount.T));

        BGamePieceCount.textContent = `Bot: ${Bcount}`;
        MGamePieceCount.textContent = `Mid: ${Mcount}`;
        TGamePieceCount.textContent = `Top: ${Tcount}`;
        totalGamePieceCount.textContent = `Total: ${(Bcount + Mcount + Tcount)}`;

    } else {
        if (blue) {
            var totalGamePieceCount = document.getElementById("teleopCommunityGamePieceTotal - left");
            var BGamePieceCount = document.getElementById("teleopCommunityGamePieceB - left");
            var MGamePieceCount = document.getElementById("teleopCommunityGamePieceM - left");
            var TGamePieceCount = document.getElementById("teleopCommunityGamePieceT - left");

            var B1 = document.getElementById("teleopCommunityB1 - left");
            var B2 = document.getElementById("teleopCommunityB2 - left");
            var B3 = document.getElementById("teleopCommunityB3 - left");
            var B4 = document.getElementById("teleopCommunityB4 - left");
            var B5 = document.getElementById("teleopCommunityB5 - left");
            var B6 = document.getElementById("teleopCommunityB6 - left");
            var B7 = document.getElementById("teleopCommunityB7 - left");
            var B8 = document.getElementById("teleopCommunityB8 - left");
            var B9 = document.getElementById("teleopCommunityB9 - left");

            var M1 = document.getElementById("teleopCommunityM1 - left");
            var M2 = document.getElementById("teleopCommunityM2 - left");
            var M3 = document.getElementById("teleopCommunityM3 - left");
            var M4 = document.getElementById("teleopCommunityM4 - left");
            var M5 = document.getElementById("teleopCommunityM5 - left");
            var M6 = document.getElementById("teleopCommunityM6 - left");
            var M7 = document.getElementById("teleopCommunityM7 - left");
            var M8 = document.getElementById("teleopCommunityM8 - left");
            var M9 = document.getElementById("teleopCommunityM9 - left");

            var T1 = document.getElementById("teleopCommunityT1 - left");
            var T2 = document.getElementById("teleopCommunityT2 - left");
            var T3 = document.getElementById("teleopCommunityT3 - left");
            var T4 = document.getElementById("teleopCommunityT4 - left");
            var T5 = document.getElementById("teleopCommunityT5 - left");
            var T6 = document.getElementById("teleopCommunityT6 - left");
            var T7 = document.getElementById("teleopCommunityT7 - left");
            var T8 = document.getElementById("teleopCommunityT8 - left");
            var T9 = document.getElementById("teleopCommunityT9 - left");
        }else {
            var totalGamePieceCount = document.getElementById("teleopCommunityGamePieceTotal - right");
            var BGamePieceCount = document.getElementById("teleopCommunityGamePieceB - right");
            var MGamePieceCount = document.getElementById("teleopCommunityGamePieceM - right");
            var TGamePieceCount = document.getElementById("teleopCommunityGamePieceT - right");

            var B1 = document.getElementById("teleopCommunityB1 - right");
            var B2 = document.getElementById("teleopCommunityB2 - right");
            var B3 = document.getElementById("teleopCommunityB3 - right");
            var B4 = document.getElementById("teleopCommunityB4 - right");
            var B5 = document.getElementById("teleopCommunityB5 - right");
            var B6 = document.getElementById("teleopCommunityB6 - right");
            var B7 = document.getElementById("teleopCommunityB7 - right");
            var B8 = document.getElementById("teleopCommunityB8 - right");
            var B9 = document.getElementById("teleopCommunityB9 - right");

            var M1 = document.getElementById("teleopCommunityM1 - right");
            var M2 = document.getElementById("teleopCommunityM2 - right");
            var M3 = document.getElementById("teleopCommunityM3 - right");
            var M4 = document.getElementById("teleopCommunityM4 - right");
            var M5 = document.getElementById("teleopCommunityM5 - right");
            var M6 = document.getElementById("teleopCommunityM6 - right");
            var M7 = document.getElementById("teleopCommunityM7 - right");
            var M8 = document.getElementById("teleopCommunityM8 - right");
            var M9 = document.getElementById("teleopCommunityM9 - right");

            var T1 = document.getElementById("teleopCommunityT1 - right");
            var T2 = document.getElementById("teleopCommunityT2 - right");
            var T3 = document.getElementById("teleopCommunityT3 - right");
            var T4 = document.getElementById("teleopCommunityT4 - right");
            var T5 = document.getElementById("teleopCommunityT5 - right");
            var T6 = document.getElementById("teleopCommunityT6 - right");
            var T7 = document.getElementById("teleopCommunityT7 - right");
            var T8 = document.getElementById("teleopCommunityT8 - right");
            var T9 = document.getElementById("teleopCommunityT9 - right");
        }

        B1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[0]))}`;
        B2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[1]))}`;
        B3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[2]))}`;
        B4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[3]))}`;
        B5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[4]))}`;
        B6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[5]))}`;
        B7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[6]))}`;
        B8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[7]))}`;
        B9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[8]))}`;

        M1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[0]))}`;
        M2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[1]))}`;
        M3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[2]))}`;
        M4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[3]))}`;
        M5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[4]))}`;
        M6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[5]))}`;
        M7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[6]))}`;
        M8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[7]))}`;
        M9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[8]))}`;

        T1.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[0]))}`;
        T2.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[1]))}`;
        T3.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[2]))}`;
        T4.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[3]))}`;
        T5.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[4]))}`;
        T6.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[5]))}`;
        T7.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[6]))}`;
        T8.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[7]))}`;
        T9.style.height = `${parsePercentage(1 - parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[8]))}`;


        B1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[0]))}`;
        B2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[1]))}`;
        B3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[2]))}`;
        B4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[3]))}`;
        B5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[4]))}`;
        B6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[5]))}`;
        B7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[6]))}`;
        B8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[7]))}`;
        B9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.B[8]))}`;

        M1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[0]))}`;
        M2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[1]))}`;
        M3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[2]))}`;
        M4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[3]))}`;
        M5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[4]))}`;
        M6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[5]))}`;
        M7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[6]))}`;
        M8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[7]))}`;
        M9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.M[8]))}`;

        T1.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[0]))}`;
        T2.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[1]))}`;
        T3.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[2]))}`;
        T4.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[3]))}`;
        T5.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[4]))}`;
        T6.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[5]))}`;
        T7.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[6]))}`;
        T8.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[7]))}`;
        T9.textContent = `${parsePercentage(parseFloat(teamStats[teamKey].teleop.teleopCommunity.T[8]))}`;

        var Bcount = parseFloatCustom(parseFloat(teamStats[teamKey].teleop.teleopGamePieceCount.B));
        var Mcount = parseFloatCustom(parseFloat(teamStats[teamKey].teleop.teleopGamePieceCount.M));
        var Tcount = parseFloatCustom(parseFloat(teamStats[teamKey].teleop.teleopGamePieceCount.T));

        BGamePieceCount.textContent = `Bot: ${Bcount.toFixed(2)}`;
        MGamePieceCount.textContent = `Mid: ${Mcount.toFixed(2)}`;
        TGamePieceCount.textContent = `Top: ${Tcount.toFixed(2)}`;
        totalGamePieceCount.textContent = `Total: ${(Bcount + Mcount + Tcount).toFixed(2)}`;
    }



}

function determineRanks(teamKey, blue) {
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));
    var OPRList = [];
    var autoList = [];
    var teleopList = [];
    var endgameList = [];

    var OPRRank = 0;
    var autoRank = 0;
    var teleopRank = 0;
    var endgameRank = 0;

    var numOfTeams = 0;

    if (blue) {
        var lblOPRrank = document.getElementById("blueLblRank");
        var lblAutoRank = document.getElementById("blueLblAutoRank");
        var lblTeleopRank = document.getElementById("blueLblTeleopRank");
        var lblEndgameRank = document.getElementById("blueLblEndgameRank");
    }else {
        var lblOPRrank = document.getElementById("redLblRank");
        var lblAutoRank = document.getElementById("redLblAutoRank");
        var lblTeleopRank = document.getElementById("redLblTeleopRank");
        var lblEndgameRank = document.getElementById("redLblEndgameRank");
    }

    for (var key in teamStats) {
        OPRList.push(teamStats[key].OPRs.totalOPR);
        autoList.push(teamStats[key].OPRs.autoOPR.autoSubtotalOPR);
        teleopList.push(teamStats[key].OPRs.teleopOPR.teleopSubtotalOPR);
        endgameList.push(teamStats[key].OPRs.endGameOPR);
        numOfTeams++;
    }

    OPRList = OPRList.sort((a, b) => b - a);
    autoList = autoList.sort((a, b) => b - a);
    teleopList = teleopList.sort((a, b) => b - a);
    endgameList = endgameList.sort((a, b) => b - a);

    OPRRank = OPRList.indexOf(teamStats[teamKey].OPRs.totalOPR) + 1;
    autoRank = autoList.indexOf(teamStats[teamKey].OPRs.autoOPR.autoSubtotalOPR) + 1;
    teleopRank = teleopList.indexOf(teamStats[teamKey].OPRs.teleopOPR.teleopSubtotalOPR) + 1;
    endgameRank = endgameList.indexOf(teamStats[teamKey].OPRs.endGameOPR) + 1;

    lblOPRrank.textContent = `(Rank: ${OPRRank} / ${numOfTeams})`;
    lblAutoRank.textContent = `(Rank: ${autoRank} / ${numOfTeams})`;
    lblTeleopRank.textContent = `(Rank: ${teleopRank} / ${numOfTeams})`;
    lblEndgameRank.textContent = `(Rank: ${endgameRank} / ${numOfTeams})`;
}

function populateOtherStats(teamKey, blue){
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats'));
    if (blue) {
        document.getElementById("blueLblLinkCount").textContent = `Link Count: ${parseFloatCustom(teamStats[teamKey].linkCount).toFixed(2)}`;
        document.getElementById("blueLblFoul").textContent = `Foul Count: ${parseFloatCustom(teamStats[teamKey].fouls.foulCount).toFixed(2)}`;
        document.getElementById("blueLblTechFoul").textContent = `Tech Foul Count: ${parseFloatCustom(teamStats[teamKey].fouls.techFoulCount).toFixed(2)}`;
        document.getElementById("blueLblCoopBonus").textContent = `Coop Bonus: ${parsePercentage(teamStats[teamKey].coop.coopCriteriaMet)}`;
        document.getElementById("blueLblRPAct").textContent = `Activation Bonus: ${parsePercentage(teamStats[teamKey].rp.activationBonus)}`;
        document.getElementById("blueLblRPSus").textContent = `Sustain Bonus: ${parsePercentage(teamStats[teamKey].rp.sustainabilityBonus)}`;
    }else {
        document.getElementById("redLblLinkCount").textContent = `Link Count: ${parseFloatCustom(teamStats[teamKey].linkCount).toFixed(2)}`;
        document.getElementById("redLblFoul").textContent = `Foul Count: ${parseFloatCustom(teamStats[teamKey].fouls.foulCount).toFixed(2)}`;
        document.getElementById("redLblTechFoul").textContent = `Tech Foul Count: ${parseFloatCustom(teamStats[teamKey].fouls.techFoulCount).toFixed(2)}`;
        document.getElementById("redLblCoopBonus").textContent = `Coop Bonus: ${parsePercentage(teamStats[teamKey].coop.coopCriteriaMet)}`;
        document.getElementById("redLblRPAct").textContent = `Activation Bonus: ${parsePercentage(teamStats[teamKey].rp.activationBonus)}`;
        document.getElementById("redLblRPSus").textContent = `Sustain Bonus: ${parsePercentage(teamStats[teamKey].rp.sustainabilityBonus)}`; 
    }
}

function onPageVisible() {
    var matchesData = JSON.parse(sessionStorage.getItem('matchesData')) || [];
    var eventInfo = JSON.parse(sessionStorage.getItem('eventInfo')) || {};
    var teamStats = JSON.parse(sessionStorage.getItem('teamStats')) || {};
    var teamList = [];
    var teamListSorted = [];

    var leftTeamKey = document.getElementById("team-left-key");
    var rightTeamKey = document.getElementById("team-right-key");

    var blueLblAuto = document.getElementById("blueLblAuto");
    var blueLblTeleop = document.getElementById("blueLblTeleop");
    var blueLblEndgame = document.getElementById("blueLblEndgame");
    var redLblAuto = document.getElementById("redLblAuto");
    var redLblTeleop = document.getElementById("redLblTeleop");
    var redLblEndgame = document.getElementById("redLblEndgame");

    var blueOverallOPRChart = undefined;
    var redOverallOPRChart = undefined;

    var blueAutoPieChart = undefined;
    var blueTeleopPieChart = undefined;
    var redAutoPieChart = undefined;
    var redTeleopPieChart = undefined;

    var blueEndgamePieChart = undefined;
    var redEndgamePieChart = undefined;

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

        for (var key in teamStats) {
            teamList.push(parseInt(key.substring(3), 10));
        }

        function compareNumbers(a, b) {
            return a - b;
        }

        teamListSorted = teamList.sort(compareNumbers);

        teamListSorted.forEach(team => {
            const eventListItemLeft = document.createElement('li');
            const eventListItemRight = document.createElement('li');
            eventListItemLeft.textContent = team;
            eventListItemRight.textContent = team;
            document.getElementById("event-dropdown-left").appendChild(eventListItemLeft);
            document.getElementById("event-dropdown-right").appendChild(eventListItemRight);

            eventListItemLeft.addEventListener('click', function () {
                document.getElementById("select-team-left").textContent = team;
                leftTeamKey.textContent = `frc${team}`;
                blueOverallOPRChart = generateSummaryOPRBarGraph(`frc${team}`, true, blueOverallOPRChart);

                blueLblAuto.textContent = `Auto: ${teamStats[`frc${team}`].OPRs.autoOPR.autoSubtotalOPR.toFixed(2)}`;
                blueLblTeleop.textContent = `Teleop: ${teamStats[`frc${team}`].OPRs.teleopOPR.teleopSubtotalOPR.toFixed(2)}`;
                blueLblEndgame.textContent = `Endgame: ${teamStats[`frc${team}`].OPRs.endGameOPR.toFixed(2)}`;

                determineRanks(`frc${team}`, true);

                blueAutoPieChart = generateBreakdownPieChart(`frc${team}`, true, true, blueAutoPieChart);
                blueTeleopPieChart = generateBreakdownPieChart(`frc${team}`, true, false, blueTeleopPieChart);

                blueEndgamePieChart = generateEndgamePieChart(`frc${team}`, true, blueEndgamePieChart);

                annotateCommunity(`frc${team}`, true, true);
                annotateCommunity(`frc${team}`, true, false);

                populateOtherStats(`frc${team}`, true);
            });
            eventListItemRight.addEventListener('click', function () {
                document.getElementById("select-team-right").textContent = team;
                rightTeamKey.textContent = `frc${team}`;
                redOverallOPRChart = generateSummaryOPRBarGraph(`frc${team}`, false, redOverallOPRChart);

                redLblAuto.textContent = `Auto: ${teamStats[`frc${team}`].OPRs.autoOPR.autoSubtotalOPR.toFixed(2)}`;
                redLblTeleop.textContent = `Teleop: ${teamStats[`frc${team}`].OPRs.teleopOPR.teleopSubtotalOPR.toFixed(2)}`;
                redLblEndgame.textContent = `Endgame: ${teamStats[`frc${team}`].OPRs.endGameOPR.toFixed(2)}`;

                determineRanks(`frc${team}`, false);

                redAutoPieChart = generateBreakdownPieChart(`frc${team}`, false, true, redAutoPieChart);
                redTeleopPieChart = generateBreakdownPieChart(`frc${team}`, false, false, redTeleopPieChart);

                redEndgamePieChart = generateEndgamePieChart(`frc${team}`, false, redEndgamePieChart);

                annotateCommunity(`frc${team}`, false, true);
                annotateCommunity(`frc${team}`, false, false);

                populateOtherStats(`frc${team}`, false);
            });
        });


    }
}