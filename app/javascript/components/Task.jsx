import React, {Fragment} from 'react';
import moment from 'moment'
import TaskForm from "./TaskForm";


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


    toggleEdit = () => {
        this.setState({editable: !this.state.editable})
    };

    EditTask = (data) => {
        $.ajax({
                url: `/api/v1/tasks/${data.task.id}`,
                type: 'PUT',
                data,
                success: (task) => {
                    this.setState({task});
                    alert('task updated');
                    this.toggleEdit();
                }
            }
        )
    };

    handleDelete = () => {
        this.props.deleteTask(this.state.task.id);
    };

    getStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'in_progress':
                return 'In progress';
            case 'done':
                return 'Done';
        }
    };

    render() {
        const {task} = this.state;

        const TaskView = () => {
            return (
                <table className={'table'}>
                    <tbody>
                    <tr>
                        <td>{task.name}</td>
                        <td>{this.getStatus(task.status)}</td>
                        <td>{new moment(task.deadline).format('DD-MM-YYYY')}</td>
                        <td>
                            <button className="btn btn-primary" onClick={this.toggleEdit}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={this.handleDelete}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )
        };

        return (
            <Fragment>
                {
                    this.state.editable ? <TaskForm task={task} handleSubmit={this.EditTask}/> : <TaskView/>
                }
            </Fragment>
        )
            ;
    }
}