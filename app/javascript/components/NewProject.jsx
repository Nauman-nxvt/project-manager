import React from 'react';

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  handleSubmit = () => {
    const name = this.state.name;
    const description = this.state.description;

    if (name === '' || description === '') {
      alert('Please fill all fields.')
      return;
    }

    $.ajax({
      url: "/api/v1/projects",
      type: "POST",
      data: { project: { name, description } },
      success: project => {
        this.props.addProject(project);
        alert("project saved!");
      }
    });
  };

  render() {
    return(
      <div id="add-project-form" className="shadow-lg">
        <h3 className="text-center">Add a new Project</h3>

        <div className="row justify-content-md-center">
          <div className="col-3">
            <label>Name</label>
          </div>
          <div className="col-6">
          <input
            className="form-control"
            type='text' value={this.state.name} name="name"
            onChange={(e)=>{
              this.setState({
                name: e.target.value,
              });
            }}
          />
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-3">
            <label>Description</label>
          </div>
          <div className="col-6">
            <input
              className="form-control"
              type='text' value={this.state.description} name="description"
              onChange={(e)=>{
                this.setState({
                  description: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="mx-auto" style={{width: 200}}>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Save Project</button>
        </div>
      </div>
    )
  }
}