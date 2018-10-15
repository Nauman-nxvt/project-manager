import React from 'react';
import {Link} from "react-router-dom";

export default class ProjectList extends React.Component {
  render() {
    const projects = this.props.projects.map((project) => {
      return (
        <tr key={project.id}>
          <td>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </td>
          <td>
            <button className="btn btn-xs btn-danger" onClick={() => this.props.handleDelete(project.id)}>Delete
            </button>
          </td>
        </tr>
      )
    });
    return (
      <div id="projects-list-container" className="container shadow-lg">
        <div className="row justify-content-md-center">
          <div className="col-4">
            <h2 className="main-heading">Projects list</h2>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-6">
            <table className="table">
              <thead>
              <tr>
                <th className="main-heading">Project Name</th>
                <th className="main-heading">Actions</th>
              </tr>
              </thead>
              <tbody>
              {projects}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}