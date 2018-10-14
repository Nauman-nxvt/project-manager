import React from 'react';
import NewProject from './NewProject';
import Project from './Project';
import {Link} from "react-router-dom";

export default class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }


  componentDidMount() {
    console.log('Body comp mounted')
    $.getJSON('/api/v1/projects.json', (projects) => {
      this.setState({projects})
    })
  }

  addProject = (project) => {
    const newState = this.state.projects.concat(project);
    this.setState({projects: newState});
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/api/v1/projects/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeProject(id);
      }
    });
  };

  removeProject(id) {
    const newProjects = this.state.projects.filter((project) => {
      return project.id !== id;
    });

    this.setState({projects: newProjects});
  }

  updateProjects(project) {
    const projects = this.state.projects.filter((i) => {
      return i.id != project.id
    });
    projects.push(project);

    this.setState({projects: projects});
  }

  render() {
    const projects = this.state.projects.map((project) => {
      return(
        <tr key={project.id}>
          <td>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </td>
          <td>
            <button className="btn btn-xs btn-danger" onClick={()=>this.handleDelete(project.id)}>Delete</button>
          </td>
        </tr>
      )
    });

    return(
    <div>
      <NewProject addProject={this.addProject}/>
      <div>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects}
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}