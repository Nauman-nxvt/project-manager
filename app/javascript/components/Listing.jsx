import React from 'react';
import NewProject from './NewProject';
import Layout from './Layout';
import {Link} from "react-router-dom";

export default class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }


  componentDidMount() {
    console.log('Listing comp mounted')
    $.getJSON('/api/v1/projects.json', (projects) => {
      this.setState({projects})
    })
  }

  addProject = (project) => {
    const newProjects = this.state.projects.concat(project);
    this.setState({projects: newProjects});
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

  removeProject = (id) => {
    const newProjects = this.state.projects.filter((project) => {
      return project.id !== id;
    });

    this.setState({projects: newProjects});
  };

  updateProjects = (project) => {
    const projects = this.state.projects.filter((i) => {
      return i.id != project.id
    });
    projects.push(project);

    this.setState({projects: projects});
  };

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
    <Layout>
      <div className="row justify-content-md-center">
        <div className="col-6">
          <NewProject addProject={this.addProject}/>
        </div>
      </div>

      <div className="row justify-content-md-center">
        <div className="col-6">
          <table className="table">
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
    </Layout>
    )
  }
}