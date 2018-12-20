fetch('api/plot5')
    .then(res => res.json())
    .then(json => {
        let SRWatson= json;
        console.log(json);
        let totalRunsPerYear = {};
        for (year of Object.keys(SRWatson)) {
            totalRunsPerYear[year] = SRWatson[year].runs;
        }
        // console.log(totalRunsPerYear);

        let econ = {};
        for (year of Object.keys(SRWatson)) {
            if (SRWatson[year].bowling.deliveries != 0) {
                economy = SRWatson[year].bowling.runs / ((SRWatson[year].bowling.deliveries - SRWatson[year].bowling.extras) / 6);
                econ[year] = Number(economy).toFixed(2);
            } else {
                econ[year] = 0;
            }
        }
        // console.log(econ);

        let strikeRate = {};
        for (year of Object.keys(SRWatson)) {
            if (SRWatson[year].bowling.deliveries != 0) {
                strikeRatePerYear = Number(SRWatson[year].runs) * 100 / Number(SRWatson[year].ballsFaced);
                strikeRate[year] = Number(strikeRatePerYear).toFixed(2);
            } else {
                strikeRate[year] = 0;
            }
        }
        // console.log(strikeRate);
        Highcharts.chart('runs', {
            title: {
            text: 'Shane Watson\'s highest runs in IPL seasons' 
            },
            subtitle: {
            text: ""
            },
            xAxis: {
                    categories: Object.keys(totalRunsPerYear),
                    labels: {
                    style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                    }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
            },
            series: [{
                name: "Runs",
                data: Object.values(totalRunsPerYear)
            }],

            responsive: {
            rules: [{
                condition: {
                maxWidth: 500
                },
                chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
                }
            }]
            }
        });


            Highcharts.chart('strikeRate', {
            title: {
            text: 'Shane Watson\'s strike rate in IPL seasons' 
            },
            subtitle: {
            text: ""
            },
            xAxis: {
                    categories: Object.keys(strikeRate),
                    labels: {
                    style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                    }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
            },
            series: [{
                name: "Strike Rate",
                data:Object.values(strikeRate).map(a => Number(a))
            }],

            responsive: {
            rules: [{
                condition: {
                maxWidth: 500
                },
                chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
                }
            }]
            }

        });


        Highcharts.chart('econ', {
            title: {
            text: 'Shane Watson\'s bowling economy in IPL seasons' 
            },
            subtitle: {
            text: ""
            },
            xAxis: {
                    categories: Object.keys(econ),
                    labels: {
                    style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                    }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
            },
            series: [{
                name: "Bowling economy",
                data:Object.values(econ).map(a => Number(a))
            }],

            responsive: {
            rules: [{
                condition: {
                maxWidth: 500
                },
                chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
                }
            }]
            }

        });


        Highcharts.chart('targetRuns', {title: {text: 'Shane Watson\'s 50\'s and 100\'s in IPL seasons'
            },
            subtitle: {
            text: ""
            },
            xAxis: {
                    categories: Object.keys(SRWatson),
                    labels: {
                    style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                    }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
            },
            series: [{
                name: "50's",
                data:Object.values(SRWatson).map(a => a.halfCenturies)
            },
            {
                name: "100's",
                data:Object.values(SRWatson).map(a => a.centuries)
            }],

            responsive: {
            rules: [{
                condition: {
                maxWidth: 500
                },
                chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
                }
            }]
            }
        });
    });