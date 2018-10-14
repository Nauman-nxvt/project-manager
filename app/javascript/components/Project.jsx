import React from 'react';

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
    console.log('Body comp mounted')
    $.getJSON(`/api/v1/projects/${this.props.match.params.id}.json`, (project) => {
      this.setState({
        project,
        name: project.name,
        description: project.description,
      })
    })
  }

  handleEdit = () => {
    if(this.state.editable) {
      const name = this.state.name;
      const description = this.state.description;
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
  }

  render() {
    const project = this.state.project;
    const name = this.state.editable ?
      <input type='text' value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
      : <h3>{project.name}</h3>;
    const description = this.state.editable ?
      <input type='text' value={this.state.description} onChange={(e)=>{this.setState({description: e.target.value})}}/>
      : <p>{project.description}</p>;

    return (
      <div>
        {name}
        {description}
        <button className="btn btn-primary" onClick={this.handleEdit}>
          {this.state.editable ? "Submit" : "Edit"}
        </button>
      </div>
    );
  }
}
