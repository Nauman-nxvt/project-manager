import React, {Fragment} from 'react';
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            offset: 0
        }
    };

    componentDidMount() {
        this.getTasks();
    };

    getTasks = () => {
        $.ajax({
            url: '/api/v1/tasks.json',
            data: {project_id: this.props.projectId},
            type: 'GET',

            success: data => {
                this.setState({tasks: data.tasks});
            },

            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    };

    handleDeleteTask = (id) => {
        $.ajax({
            url: `/api/v1/tasks/${id}`,
            type: 'DELETE',
            success: () => {
                this.removeTask(id);
            }
        });
    };

    removeTask = (id) => {
        const newTasks = this.state.tasks.filter((task) => {
            return task.id !== id;
        });

        this.setState({tasks: newTasks});
        alert("task removed!");
    };

    addTask = (task) => {
        const newTasks = this.state.tasks.concat(task);
        this.setState({tasks: newTasks});
        alert("task saved!");
    };

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);

        this.setState({offset}, () => {
            this.getTasks();
        });
    };

    createNewTask = (data) => {
        $.ajax({
            url: "/api/v1/tasks",
            type: "POST",
            data,
            success: task => {
                this.addTask(task);
            }
        });
    }

    render() {
        const tasks = this.state.tasks;
        return (
            <div id="tasks-container" className="container shadow-lg">
                <div className="row justify-content-md-center">
                    <div className="col-4">
                        <h2 className="main-heading">Add task</h2>
                    </div>
                </div>
                <TaskForm project_id={this.props.projectId} handleSubmit={this.createNewTask}/>
                {!!tasks && !!tasks.length && <TaskTable tasks={tasks} handleDeleteTask={this.handleDeleteTask}/>}
            </div>
        )
    }
}