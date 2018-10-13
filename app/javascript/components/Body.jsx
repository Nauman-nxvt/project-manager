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

  componentDidMount() {
    console.log('AllProjects comp mounted')
    $.getJSON('/api/v1/projects.json', (projects) => {this.setState({projects})})
  }

  render() {
    return(
      <div>
        <NewProject addProject={this.addProject}/>
        <AllProjects projects={this.state.projects}/>
      </div>
    )
  }
}