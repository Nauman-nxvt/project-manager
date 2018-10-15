import React from 'react';
import Layout from "./Layout";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      editable: false,
      project: {},
      name: '',
      description: '',
      tasks: []
    }
  }

  componentDidMount() {
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

    const name = this.state.editable ?
      <input type='text' value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
      : <h5>{project.name}</h5>;
    const description = this.state.editable ?
      <input type='text' value={this.state.description} onChange={(e)=>{this.setState({description: e.target.value})}}/>
      : <p>{project.description}</p>;

    return (
      <Layout>
        <div className="container shadow-lg" id="project-show">
          <div className="row justify-content-md-center">
            <div className="col-4">
              <h2 className="main-heading">Project details</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <label>Project Name</label>
            </div>
            <div className="col-5">
              {name}
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <label>Project Description</label>
            </div>
            <div className="col-5">
              {description}
            </div>
          </div>

          <div className="row justify-content-md-center">
            <div className="col-2">
              <button className="btn btn-primary" onClick={this.handleEdit}>
                {this.state.editable ? "Submit" : "Edit"}
              </button>
            </div>
          </div>
        </div>

        <NewTask project_id={project.id} addTask={this.addTask}/>

        {
          !!tasks.length && <TaskList tasks={tasks} handleDeleteTask={this.handleDeleteTask}/>
        }
      </Layout>
    );
  }
}
