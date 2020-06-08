import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/CLI.css";
import axios from "axios";
class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToLogBox = this.addToLogBox.bind(this);
    this.clearLogs = this.clearLogs.bind(this);
    this.state = {
      req: "",
      result: "",
      log: [],
      lastValue: ""
    };
  }
  handleChange = (event) => {
    let value = event.target.value;
    this.setState({
      req: value
    });
    console.log(this.state.req)
  }
  addToLogBox() {
    if (this.state.lastValue == this.props.buttonEntry) {} else {
      document.getElementById("logBox").value += this.props.buttonEntry;
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      lastValue: this.props.buttonEntry
    });
  }
  componentDidUpdate() {
    this.addToLogBox();
  }
  clearLogs() {
    document.getElementById("logBox").value = "";
  }
  async handleSubmit(event) {
    let url = 'http://localhost:5000/api/cmd/' + this.state.req;
    let fetchData = await axios.get(url).catch(function(error) {
      return error.response;
    });
    if (this.state.req == 'TRACE' && fetchData.data.version) {
      console.log("Trying to hit trace?");
      this.setState({
        result: JSON.stringify(fetchData) + "\n"
      });
      document.getElementById("logBox").value += this.state.result;
      document.getElementById("logBox").scrollTop = document.getElementById("logBox").scrollHeight;
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
      document.getElementById("logBox").scrollTop = document.getElementById("logBox").scrollHeight;
    } else {
      console.log("Garbage found" + fetchData.data)
    }
  }
  render() {
    return ( 
      < > 
        < div className = "container" > < div className = "row" > < div className = "input-group mb-3" > < div className = "input-group-append cmdholder" > < button className = "btn btn-outline-secondary"
        type = "submit"
        id = "button-addon2" > /cmd/ < /button> < /div> < input type = "text"
        class = "form-control"
        placeholder = "Enter query ..."
        aria-label = "Enter query ..."
        aria-describedby = "button-addon2"
        onChange = {
          this.handleChange
        }
        /> < div className = "input-group-append" > < button class = "btn btn-outline-secondary"
        type = "submit"
        id = "button-addon2"
        onClick = {
          this.handleSubmit
        } > Submit < /button> < /div> < /div> < /div> < div className = "row" > < textArea id = "logBox"
        type = "text"
        className = "textArea"
        name = "Logs"
        value = {
          this.state.log
        } > < /textArea> < /div> 
        <div className = "row">
          <div className = "col">
            <button className = "btn btn-lg btn-danger clear" type = "submit" id = "button-addon2" onClick = {this.clearLogs}> Clear < /button>
          </div>
        </div> 
      </div>
      < />);
  }
}
export default UserInterface;