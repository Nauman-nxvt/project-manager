class NewProject extends React.Component {
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
    $.ajax({
      url: "/api/v1/projects",
      type: "POST",
      data: { project: { name, description } },
      success: response => {
        console.log("project saved!", response);
      }
    });
  }

  render() {
    return(
      <div>
        <h1>New Project</h1>

        <input
          type='text' value={this.state.name} name="name"
          onChange={(e)=>{
            this.setState({
              name: e.target.value,
            });
          }}
        />

        <input
          type='text' value={this.state.description} name="description"
          onChange={(e)=>{
            this.setState({
              description: e.target.value,
            });
          }}
        />

        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}