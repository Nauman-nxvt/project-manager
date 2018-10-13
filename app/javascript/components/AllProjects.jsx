import React from 'react';

export default class AllProjects extends React.Component {

  handleDelete = () => {
    console.log("delete item clicked");
  }
  render() {
    const projects = this.props.projects.map((project) => {
      return(
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      )
    });

    return(
      <div>
        {projects}
      </div>
    );
  }
}