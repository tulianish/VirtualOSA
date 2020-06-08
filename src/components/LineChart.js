import React from 'react';
import Chart from 'chart.js';
import randomColor from 'randomcolor';
import 'chartjs-plugin-zoom/chartjs-plugin-zoom.min.js';
Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";
// LineChart
class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.addData = this.addData.bind(this);
      this.canvasRef = React.createRef();
      //this.setInitialState = this.setInitialState.bind(this);
      //this.getData = this.getData.bind(this);
      this.state = {
        data: this.props.data,
        displayGraph: false,
        displayPersistent: false,
        colorPallette: {
          key1: 'Red',
          key2: "Blue",
          key3: "Black"
        }
      }
    }
    addData(chart, label, data) {
      var color = randomColor();
      chart.data.labels = this.state.data[0].data.map(d => d.x);
      chart.data.datasets.push({
        label: "Trace-" + color,
        backgroundColor: color,
        fill: 'none',
        data: this.state.data[0].data.map(d => d.y),
        pointRadius: 1
      });
      chart.update(0);
    }
    componentWillReceiveProps(props) {
      this.setState({
        displayGraph: this.props.display
      });
      this.setState({
        displayPersistent: this.props.persistent
      });
      this.setState({
        data: this.props.data
      });
    }
    componentDidUpdate() {
      if (this.state.displayPersistent && this.state.displayGraph) {
        this.addData(this.myChart, this.state.data)
      } else if (this.state.displayGraph) {
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'line',
          options: {
            title: {
              display: true,
              fontColor: "Black",
              text: 'RBW: ' + (this.state.data[0].rbw.toPrecision(3)) + ' (nm) | X Offset: ' + (this.state.data[0].xoffset.toPrecision(3)) + ' | Y Offset: ' + (this.state.data[0].yoffset.toPrecision(3)),
              fontSize: 15,
              position: "Bottom"
            },
            maintainAspectRatio: true,
            responsive: true,
            showLine: true,
            scales: {
              yAxes: [{
                gridLines: {
                  color: 'Black'
                },
                ticks: {
                  fontColor: "Black"
                },
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: this.state.data[0].ylabel + " (" + this.state.data[0].yunit + ")",
                  fontColor: "Black"
                }
              }],
              xAxes: [{
                gridLines: {
                  color: "Black"
                },
                ticks: {
                  fontColor: "Black",
                  autoSkip: true,
                  maxTicksLimit: 8
                },
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: this.state.data[0].xlabel + " (" + this.state.data[0].xunit + ")",
                  fontColor: "Black"
                }
              }]
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'xy',
                  xScale0: {
                    max: 1e4
                  },
                  yScale0: {
                    max: 1e4
                  }
                },
                zoom: {
                  enabled: true,
                  mode: 'xy'
                }
              }
            },
          },
          data: {
            labels: this.state.data[0].data.map(d => d.x),
            pointStyle: 'line',
            markerSize: 0.01,
            datasets: [{
              label: this.state.data[0].title,
              data: this.state.data[0].data.map(d => d.y),
              fill: 'none',
              backgroundColor: "#00CC00",
              pointRadius: 1
            }]
          }
        });
      } else {
        this.myChart = new Chart(this.canvasRef.current, {
          type: 'line',
          options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "Black"
                },
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: "Signal (DBm)",
                  fontColor: "Black"
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: "Black"
                },
                scaleLabel: {
                  fontSize: 20,
                  display: true,
                  labelString: "Wavelength (M)",
                  fontColor: "Black"
                }
              }]
            }
          },
        });
      }
    }
    async componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'line',
        options: {
          maintainAspectRatio: true,
          responsive: true,
          scales: {
            yAxes: [{
              gridLines: {
                color: "White"
              },
              ticks: {
                fontColor: "White"
              },
              scaleLabel: {
                fontSize: 20,
                display: true,
                labelString: "Signal (DBm)",
                fontColor: "Black"
              }
            }],
            xAxes: [{
              gridLines: {
                color: "White"
              },
              ticks: {
                fontColor: "White",
                autoSkip: true,
                maxTicksLimit: 8
              },
              scaleLabel: {
                fontSize: 20,
                display: true,
                labelString: "Signal (M)",
                fontColor: "Black"
              }
            }]
          }
        },
      });
      this.setState({
        data: this.props.data,
      })
    }
    render() {
      return ( < > < canvas ref = {
          this.canvasRef
        }
        /> < />);
      }
    }
    export default LineChart;