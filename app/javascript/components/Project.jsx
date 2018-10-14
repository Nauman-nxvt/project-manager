import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      editable: false,
      name: this.props.project.name,
      description: this.props.project.description,
    }
  }

  handleEdit = () => {
    if(this.state.editable) {
      const name = this.state.name;
      const description = this.state.description;
      const id = this.props.project.id;
      const project = {id, name, description};
      this.props.handleUpdate(project);
    }
    this.setState({editable: !this.state.editable})
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.project.id)
  };

  render() {
    const {project} = this.props;
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
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
