import React from 'react';
import Layout from "./Layout";
import Task from "./Task";
import NewTask from "./NewTask";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      editable: false,
      project: {},
      name: '',
      description: '',
    }
  }

  componentDidMount() {
    console.log('Project comp mounted')
    $.getJSON(`/api/v1/projects/${this.props.match.params.id}.json`, (project) => {
      this.setState({
        project,
        name: project.name,
        description: project.description,
        tasks: project.tasks,
      });
    })
  }

  handleEdit = () => {
    if(this.state.editable) {
      const name = this.state.name;
      const description = this.state.description;
      if (name === '' || description === '') {
        alert('Please fill all fields.')
        return;
      }
      const id = this.state.project.id;
      const project = {id, name, description};
      $.ajax({
          url: `/api/v1/projects/${project.id}`,
          type: 'PUT',
          data: {project: project},
          success: () => {
            this.setState({project});
            alert('Project updated');
          }
        }
      )
    }
    this.setState({editable: !this.state.editable})
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
  };

  addTask = (task) => {
    const newTasks = this.state.tasks.concat(task);
    this.setState({tasks: newTasks});
  };

  render() {
    const {project, tasks} = this.state;
    const tasksList = !!tasks && tasks.map((task) => {
      return(
        <div key={task.id}>
          <Task task={task} deleteTask={this.handleDeleteTask}/>
        </div>
      )});
    const name = this.state.editable ?
      <input type='text' value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
      : <h3>{project.name}</h3>;
    const description = this.state.editable ?
      <input type='text' value={this.state.description} onChange={(e)=>{this.setState({description: e.target.value})}}/>
      : <p>{project.description}</p>;

    return (
      <Layout>
        <div className="container shadow-lg" id="project-show">
          <div className="row">
            <div className="col-4">{name}</div>
            <div className="col-4">{description}</div>
            <div className="col-4">
              <button className="btn btn-primary" onClick={this.handleEdit}>
                {this.state.editable ? "Submit" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        <div id="task-add" className="container shadow-lg">
          <NewTask project_id={project.id} addTask={this.addTask}/>
        </div>

        <div id="tasks-container" className="container shadow-lg">
          <h3>Project tasks</h3>
          <div className="row" id="tasks-header">
            <div className="col-3" ><h4>Name</h4></div>
            <div className="col-3"><h4>Status</h4></div>
            <div className="col-3"><h4>Deadline</h4></div>
            <div className="col-3"><h4>Actions</h4></div>
          </div>
              {tasksList}
        </div>
      </Layout>
    );
  }
}
