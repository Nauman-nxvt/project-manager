import React from 'react';
import Task from "./Task";

export default class TaskList extends React.Component {
  render() {
    const tasks = this.props.tasks;
    const tasksList = !!tasks && tasks.map((task) => {
        return(
          <div key={task.id}>
            <Task task={task} deleteTask={this.props.handleDeleteTask}/>
          </div>
        )});

    return(
      <div id="tasks-container" className="container shadow-lg">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h2 className="main-heading">Project tasks</h2>
          </div>
        </div>

        <div className="row" id="tasks-header">
          <div className="col-3" ><h4 className="main-heading">Name</h4></div>
          <div className="col-3"><h4 className="main-heading">Status</h4></div>
          <div className="col-3"><h4 className="main-heading">Deadline</h4></div>
          <div className="col-3"><h4 className="main-heading">Actions</h4></div>
        </div>
        {tasksList}
      </div>
    )
  }
}