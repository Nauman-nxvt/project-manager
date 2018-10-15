import React from 'react';
import moment from 'moment'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';
export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      name: props.task.name,
      status: props.task.status,
      deadline: new moment(props.task.deadline),
      deadline_focused: false,
      task: props.task,
    }
  }


  handleEdit = () => {
    if (this.state.editable) {
      const name = this.state.name;
      if (name === '') {
        alert('Please fill all fields.')
        return;
      }
      const status = this.state.status;
      const deadline = this.state.deadline.format('D-M-YYYY');
      const id = this.state.task.id;
      const task = {id, name, status, deadline};
      $.ajax({
          url: `/api/v1/tasks/${task.id}`,
          type: 'PUT',
          data: {task},
          success: (task) => {
            this.setState({task});
            alert('task updated');
          }
        }
      )
    }
    this.setState({editable: !this.state.editable})
  };

  handleDelete = () => {
    this.props.deleteTask(this.state.task.id);
  };

  getStatus = (status) => {
    switch(status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In progress';
      case 'done':
        return 'Done';
    }
  };

  render() {
    const task = this.state.task;
    const name = this.state.editable ?
      <input type='text' value={this.state.name} onChange={(e) => {
        this.setState({name: e.target.value})
      }}/>
      : <h5>{task.name}</h5>;
    const status = this.state.editable ?
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
      : <p>{this.getStatus(task.status)}</p>;
    const deadline = this.state.editable ?
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
      : <h5>{task.deadline}</h5>;

    return (
      <div className="row" id="task-div">
        <div className="col-3 align-middle">{name}</div>
        <div className="col-3">{status}</div>
        <div className="col-3">{deadline}</div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={this.handleEdit}>
            {this.state.editable ? "Submit" : "Edit"}
          </button>
          <button className="btn btn-danger" onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}