import React from 'react';
import NewProject from './NewProject';
import AllProjects from './AllProjects';
export default class Body extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  addProject = (project) => {
    const newState = this.state.projects.concat(project);
    this.setState({ projects: newState });
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/api/v1/projects/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeProject(id);
      }
    });
  };

  removeProject(id) {
    const newProjects = this.state.projects.filter((project) => {
      return project.id !== id;
    });

    this.setState({ projects: newProjects });
  }

  handleUpdate = (project) => {
    $.ajax({
        url: `/api/v1/projects/${project.id}`,
        type: 'PUT',
        data: { project: project },
        success: () => {
          this.updateProjects(project);
        }
      }
    )};

  updateProjects(project) {
    const projects = this.state.projects.filter((i) => { return i.id != project.id });
    projects.push(project);

    this.setState({projects: projects });
  }

  componentDidMount() {
    console.log('AllProjects comp mounted')
    $.getJSON('/api/v1/projects.json', (projects) => {this.setState({projects})})
  }

  render() {
    return(
      <div>
        <NewProject addProject={this.addProject}/>
        <AllProjects projects={this.state.projects} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    )
  }
}