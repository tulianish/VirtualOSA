import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/button.css";
import axios from "axios";
class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startClicked = this.startClicked.bind(this);
    this.stopClicked = this.stopClicked.bind(this);
    this.singleClicked = this.singleClicked.bind(this);
    this.persistentClicked = this.persistentClicked.bind(this);
    this.state = {
      req: "",
      result: "",
      logElement: {}
    };
  }
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      req: value
    });
  }
  async startClicked() {
    this.props.start();
    let url = '/api/cmd/START';
    let fetchData = await axios.get(url);
    this.props.buttonStart(new Date() + " : " + fetchData.data + "\n");
  }
  async stopClicked() {
    this.props.stop();
    let url = '/api/cmd/STOP';
    let fetchData = await axios.get(url);
    this.props.buttonStart(new Date() + " : " + fetchData.data + "\n");
  }
  async singleClicked() {
    this.props.sendDisplay();
    let url = '/api/cmd/SINGLE';
    let fetchData = await axios.get(url);
    this.props.buttonStart(new Date() + " : " + fetchData.data + "\n");
  }
  async persistentClicked() {
    this.props.sendPersistent();
    this.props.buttonStart(new Date() + " : " + "Persistence Mode : Turned On" + "\n");
  }
  async handleSubmit(event) {
    let url = '/api/cmd/' + this.state.req;
    let fetchData = await axios.get(url).catch(function(error) {
      return error.response;
    });
    if (this.state.req == 'TRACE' && fetchData.data.version) {
      this.setState({
        result: JSON.stringify(fetchData) + "\n"
      });
      document.getElementById("logBox").value += this.state.result;
    } else if (fetchData.data.includes("+READY>")) {
      let eachLogElement = {
        timestamp: new Date().toLocaleString(),
        request: this.state.req,
        response: fetchData.data
      };
      this.setState({
        result: new Date() + " - " + this.state.req + "  : " + fetchData.data + "\n"
      });
      document.getElementById("logBox").value += this.state.result;
    } else {
      console.log("Garbage found" + fetchData.data)
    }
  }
  render() {
    return ( 
      < >
       <div className = "container"> < div className = "row" > < div className = " button-horizontal" > < Button variant = "success"
        size = "lg"
        onClick = {
          this.startClicked
        } > Start < /Button> < Button variant = "danger"
        size = "lg"
        onClick = {
          this.stopClicked
        } > Stop < /Button> < Button variant = "warning"
        size = "lg"
        onClick = {
          this.singleClicked
        } > Single < /Button> < Button variant = "primary"
        size = "lg"
        onClick = {
          this.persistentClicked
        } > Persistent < /Button> < /div> < /div> < div className = "row" > < div className = "input-group mb-3" > < div className = "input-group-append cmdholder" > < button className = "btn btn-outline-secondary"
        type = "submit"
        id = "button-addon2" > /cmd/ < /button> < /div><input
        type = "text"
        className = "form-control"
        placeholder = "Enter query here"
        aria-label = "Enter query here"
        aria-describedby = "button-addon2"
        onChange = {
          this.handleChange
        }
        /> < div className = "input-group-append" > < button className = "btn btn-outline-secondary"
        type = "submit"
        id = "button-addon2"
        onClick = {
          this.handleSubmit
        } > Submit < /button> < /div> < /div> < /div> < div className = "row " > < div className = "col align-self-end " > < div class = "input-group mb-3" > < input type = "text"
        style = {
          {
            width: "2"
          }
        }
        class = "form-control"
        placeholder = "Execution Result"
        aria-label = "Execution Result"
        aria-describedby = "button-addon2"
        value = {
          this.state.result
        }
        /> < /div> < /div> < /div> < /div> 
      < />);
  }
}
export default UserInterface;