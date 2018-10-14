import React from 'react';
import Project from './Project';
import {Route} from 'react-router-dom'

export default class AllProjects extends React.Component {
  constructor(props) {
    super(props)
    console.log('AllProjects:', props)
  }

  handleDelete = (id) => {
    this.props.handleDelete(id);
  };

  onUpdate = (project) => {
    this.props.onUpdate(project);
  };

  render() {
    const projects = this.props.projects.map((project) => {
      return(
        <div key={project.id}>
          <Project project={project}
                handleDelete={this.handleDelete}
                handleUpdate={this.onUpdate}
          />
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