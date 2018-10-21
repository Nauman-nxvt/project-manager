import React from 'react';
import NewProject from './NewProject';
import Layout from './Layout';
import ProjectList from './ProjectList';

export default class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        $.getJSON('/api/v1/projects.json', (projects) => {
            this.setState({projects});
        })
    }

    addProject = (project) => {
        const newProjects = this.state.projects.concat(project);
        this.setState({projects: newProjects});
    };

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

    render() {
        const {projects} = this.state;
        return (
            <Layout>
                <NewProject addProject={this.addProject}/>
                {
                    !!projects.length && <ProjectList projects={this.state.projects} handleDelete={this.handleDelete}/>
                }
            </Layout>
        )
    }
}