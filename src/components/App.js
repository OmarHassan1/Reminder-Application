import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/App.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { add_Reminder, remove_Reminder, clear_Reminder } from "../actions";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };
  render_Reminders = () => {
    const { reminders } = this.props;
    return (
      <ul>
        {reminders.map((reminder) => {
          return (
            <li key={reminder.id} className="group-item list">
              <div className="reminder-text">{reminder.text}</div>
              <div className="reminder-date">
                {moment(new Date(reminder.date)).fromNow()}
              </div>
              <div
                className="btn btn-danger closeIcon"
                onClick={() => this.props.remove_Reminder(reminder.id)}
              >
                X
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    console.log("The props", this.props);
    return (
      <div className="App">
        <div className="reminder-title">
          <h2>What Should You Do ?</h2>
        </div>
        <input
          className="form-control"
          type="text"
          value={this.state.text}
          placeholder="Enter What U Think"
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <DatePicker
          className="form-control"
          value={this.state.date}
          selected={this.state.date}
          onChange={(date) => {
            this.setState({ date: date });
          }}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />

        <button
          onClick={() => {
            this.props.add_Reminder(this.state.text, this.state.date);
            this.setState({ text: "", date: "" });
          }}
          className="btn btn-primary btn-block"
        >
          ADD Reminder
        </button>
        <div>{this.render_Reminders()}</div>
        <button
          className="btn btn-danger btn-block clearReminder"
          onClick={() => this.props.clear_Reminder()}
        >
          Clear Reminder
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    reminders: state,
  };
}

/*function mapDispatchToProps(dispatch) {
  return {
    Add_Reminder: () => dispatch(add_Reminder()),
  };
}*/
export default connect(mapStateToProps, {
  add_Reminder,
  remove_Reminder,
  clear_Reminder,
})(App);
