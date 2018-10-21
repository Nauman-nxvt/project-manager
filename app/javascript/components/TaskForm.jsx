import React from 'react';
import moment from 'moment'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {SingleDatePicker} from 'react-dates';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        const task = props.task;
        this.state = {
            name: !!task ? task.name : '',
            status: !!task ? task.status : 'pending',
            deadline: !!task ? new moment(task.deadline) : new moment(),
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
        const data = !!this.props.task ? {task: {id: this.props.task.id, name, status, deadline}} : {
            task: {
                name,
                status,
                deadline,
                project_id: this.props.project_id
            }
        };
        this.props.handleSubmit(data);
    };

    render() {
        return (
            <table id={'task-form-table'} className={'table'}>
                <tbody>
                <tr>
                    <td>
                        <input type='text' value={this.state.name} onChange={(e) => {
                            this.setState({name: e.target.value})
                        }}/>
                    </td>

                    <td>
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
                    </td>
                    <td>
                        <SingleDatePicker
                            date={this.state.deadline}
                            onDateChange={deadline => this.setState({deadline})}
                            focused={this.state.deadline_focused}
                            onFocusChange={(obj) => {
                                this.setState({deadline_focused: obj.focused})
                            }}
                            id="deadline"
                            regular={true}
                            displayFormat={"DD-MM-YYYY"}
                            readOnly={true}
                        />
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}