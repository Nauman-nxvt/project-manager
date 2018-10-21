import React, {Fragment} from 'react';
import Task from "./Task";

export default class TaskTable extends React.Component {
    render() {
        const tasks = this.props.tasks;
        const TasksList = !!tasks && tasks.map((task) => {
            return (
                <Fragment key={task.id}>
                    <Task task={task} deleteTask={this.props.handleDeleteTask}/>
                </Fragment>
            )
        });
        return (
            <Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-4">
                        <h2 className="main-heading">Project tasks</h2>
                    </div>
                </div>

                <div className="row" id="tasks-header">
                    <div className="col-3"><h4 className="main-heading">Name</h4></div>
                    <div className="col-3"><h4 className="main-heading">Status</h4></div>
                    <div className="col-3"><h4 className="main-heading">Deadline</h4></div>
                    <div className="col-3"><h4 className="main-heading">Actions</h4></div>
                </div>

                <table className="table">
                    <thead>
                    <tr>
                        <th className="main-heading">Name</th>
                        <th className="main-heading">Status</th>
                        <th className="main-heading">Deadline</th>
                        <th className="main-heading">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                {TasksList}
            </Fragment>
        );
    }

}