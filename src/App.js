import React from "react";
import LineChart from "./components/LineChart";
import UserInterface from "./components/UserInterface";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import CommandLineInterface from "./components/CommandLineInterface";
// App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.singleFetch = this.singleFetch.bind(this);
    this.startFetch = this.startFetch.bind(this);
    this.stopFetch = this.stopFetch.bind(this);
    this.startPersistent = this.startPersistent.bind(this);
    this.sendLogElement = this.sendLogElement.bind(this);
    this.state = {
      display: false,
      persistent: false,
      data: [],
      timer: 0,
      logElement : "",
      clickLog : ""
    };
  }

  sendLogElement = (logReceived) =>{
    this.setState({logElement : logReceived });
  }

  async singleFetch() {
    let data = [];
    let readings = [];
    let xandy = [];
    let url = "http://localhost:5000/api/cmd/TRACE";
    data = await axios.get(url, );
    if (data.data.version) {
      for (let i = 0; i < data.data.xdata.length; i++) {
        xandy.push({
          x: (data.data.xdata[i] * 100000000).toPrecision(4),
          y: data.data.ydata[i],
        });
      }
      readings.push({
        title: "Trace-#00cc00",
        data: xandy,
        xlabel: data.data.xlabel,
        xunit: data.data.xunits,
        ylabel: data.data.ylabel,
        yunit: data.data.yunits,
        rbw: data.data.resolution_bandwidth_nm,
        xoffset: data.data.xoffset,
        yoffset: data.data.yoffset,
      });
      this.setState({
        data: readings,
        display: true
      });
    }
  }
  async componentDidMount() {
    let data = [];
    let readings = [];
    let xandy = [];
    let url = "http://localhost:5000/api/cmd/TRACE";
    data = await axios.get(url);
    if (data.data.version) {
      for (let i = 0; i < data.data.xdata.length; i++) {
        xandy.push({
          x: (data.data.xdata[i] * 100000000).toPrecision(4),
          y: data.data.ydata[i],
        });
      }
      readings.push({
        title: "Trace-00CC00",
        data: xandy,
        xlabel: data.data.xlabel,
        xunit: data.data.xunits,
        ylabel: data.data.ylabel,
        yunit: data.data.yunits,
        rbw: data.data.resolution_bandwidth_nm,
        xoffset: data.data.xoffset,
        yoffset: data.data.yoffset,
      });
      this.setState({
        data: readings,
        persistent: false,
        display: false
      });
    }
  }


  buttonLog = (value) => {
    this.setState({clickLog : value});

  }
  
  startFetch() {
    this.state.timer = setInterval(() => this.singleFetch(), 1000);
  }

  startPersistent() {
    this.state.timer = setInterval(() => {
      this.singleFetch();
      this.setState({ persistent: true });
    }, 1000);
  }

  stopFetch() {
    clearInterval(this.state.timer);
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Home">
            <div className="card text-center">
              <div className="card-header">Control Center</div>
              <div className="card-body">
                <UserInterface
                  start={this.startFetch}
                  buttonStart={this.buttonLog}
                  stop={this.stopFetch}
                  sendDisplay={this.singleFetch}
                  sendPersistent={this.startPersistent}
            
                />
              </div>
              <div className="card-footer text-muted">Graph</div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="flex-view">
                  <div className="chart-component">
                    <LineChart
                      display={this.state.display}
                      data={this.state.data}
                      persistent={this.state.persistent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Command Line Interface">
            <CommandLineInterface buttonEntry={this.state.clickLog}
            />
          </Tab>
        </Tabs>
        <nav className="navbar navbar-light bg-light footer">
          <a className="navbar-brand" href="https://linkedin.com/in/tulianish">
            Designed by Anish Tuli
          </a>
        </nav>
      </div>
    );
  }
}
export default App;
