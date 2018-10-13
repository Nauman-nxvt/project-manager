class AllProjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    console.log('AllProjects comp mounted')
    $.getJSON('/api/v1/projects.json', (projects) => {this.setState({projects})})
  }

  render() {
    const projects = this.state.projects.map((project) => {
      return(
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
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