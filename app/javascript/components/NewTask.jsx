import React from 'react';
import moment from 'moment'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';

export default class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: 'pending',
      deadline: new moment(),
      deadline_focused: false,
    };
  }

  handleSubmit = () => {
    const name = this.state.name;
    const status = this.state.status;
    if (name === '') {
      alert('Please fill all fields.')
      return;
    }
    const deadline = this.state.deadline.format('D-M-YYYY');
    const project_id = this.props.project_id;
    $.ajax({
      url: "/api/v1/tasks",
      type: "POST",
      data: {task: {name, status, deadline, project_id}},
      success: task => {
        this.props.addTask(task);
        alert("task saved!");
      }
    });
  };

  render() {
    return (
      <div id="add-project-form" className="container shadow-lg">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h2 className="main-heading">Create a new task</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Name</label>
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type='text' value={this.state.name} name="name"
              onChange={(e) => {
                this.setState({
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label>Status</label>
          </div>
          <div className="col-6">
            <select value={this.state.status}
                    className="form-control"
                    onChange={(e) => {
                      this.setState({
                        status: e.target.value
                      })
                    }}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>Deadline</label>
          </div>
          <div className="col-6">
            <SingleDatePicker
              date={this.state.deadline}
              onDateChange={deadline => this.setState({deadline})}
              focused={this.state.deadline_focused}
              onFocusChange={(obj) => {
                this.setState({deadline_focused: obj.focused})
              }}
              id="deadline"
              regular={true}
            />
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-2">
            <button className="btn btn-primary" onClick={this.handleSubmit}>Save Task</button>
          </div>
        </div>
      </div>
    )
  }
}