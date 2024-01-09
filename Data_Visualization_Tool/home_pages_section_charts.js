
document.addEventListener('DOMContentLoaded', function () {
    sessionStorage.setItem('apiKey', "L9E5uZgFnSZUJxOClTjOiSYjnolj6ua0aESeOgD3ICutdaRxQSfwFxytXgPguwg9");
    sessionStorage.setItem('year', 2023);
    year = 2023;

    var prematchAnalysis = document.getElementById('prematchAnalysisChart').getContext('2d');
    new Chart(prematchAnalysis, { 
        type: 'doughnut', // Use 'doughnut' for ring chart
        data: {
            labels: ['Red', 'Blue', 'Green', 'Yellow'],
            datasets: [{
                data: [45, 55],
                backgroundColor: ['rgba(255, 80, 80, 1)', 'rgba(51, 153, 255, 1)'],
                borderWidth: 5,
                borderColor: '#1e1e1e'
            }]
        },
        options: {
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            cutout: '60%', // Adjust the cutout percentage for the center hole
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false // Set display to false to hide the legend
                }
            }
        }
    });

    var schedule = document.getElementById('matchScheduleChart').getContext('2d');
    new Chart(schedule, {
      type: 'bar',
      data: {
        labels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
        datasets: [
          {
            label: 'BlueAlliance',
            data: [30, 30, 30, 30, 30, 30],
            backgroundColor: 'rgba(255, 80, 80, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'RedAlliance',
            data: [30, 30, 30, 30, 30, 30],
            backgroundColor: 'rgba(51, 153, 255, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'BlueFinal',
            data: [10, 10, 10, 10, 10, 10],
            backgroundColor: 'rgba(255, 80, 80, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'RedFinal',
            data: [10, 10, 10, 10, 10, 10],
            backgroundColor: 'rgba(51, 153, 255, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          }
        ]
      },
      options: {
        events: [],
        responsive: true,
        indexAxis: 'y',
        aspectRatio: 1,
        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
            display: false
          },
          y: {
            stacked: true,
            display: false
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
      }
    });

    var compareTeams = document.getElementById('compareTeamsChart').getContext('2d');
    new Chart(compareTeams, {
        type: 'bar',
        data: {
            labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10"],
            datasets: [{
                data: [15, -20, 5, -15, 20, -10, 10, -25, 25, -5],
                backgroundColor: ['rgba(255, 80, 80, 1)', 'rgba(51, 153, 255, 1)'],
                borderWidth: 0
            }]
        },
        options: {
            events: [],
            responsive: true,
            indexAxis: 'y',
            aspectRatio: 1,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                          return Math.abs(value);
                        }
                    },
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: false // Set display to false to hide the legend
                }
            },
        }
    });
        

    var picklist = document.getElementById('picklistChart').getContext('2d');
    new Chart(picklist, {
      type: 'bar',
      data: {
        labels: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
        datasets: [
          {
            label: 'BlueAlliance',
            data: [50, 35, 20, 15, 20, 10],
            backgroundColor: 'rgba(255, 80, 80, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'RedAlliance',
            data: [100, 80, 65, 70, 45, 20],
            backgroundColor: 'rgba(51, 153, 255, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'BlueFinal',
            data: [30, 35, 20, 10, 5, 5],
            backgroundColor: 'rgba(255, 80, 80, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          },
          {
            label: 'RedFinal',
            data: [60, 45, 50, 30, 20, 10],
            backgroundColor: 'rgba(51, 153, 255, 1)',
            borderWidth: 5,
            borderColor: '#1e1e1e'
          }
        ]
      },
      options: {
        events: [],
        indexAxis: 'y',
        responsive: true,
        aspectRatio: 1,
        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
            display: false
          },
          y: {
            stacked: true,
            display: false
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
      }
    });
});