#tasks_controller.rb

class Api::V1::TasksController < Api::V1::BaseController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    project = Project.find(params[:project_id])
    if project.tasks.present?
    tasks = project.tasks.offset(params[:offset]).limit(params[:limit]).order(:deadline)
    else
      tasks = []
    end
    respond_with tasks: tasks.as_json
  end

  def create
    respond_with :api, :v1, Task.create(task_params)
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

  def update
    task = Task.find(params["id"])
    task.update_attributes(task_params)
    respond_with task, json: task
  end

  def show
    respond_with Task.find(params["id"])
  end

  def record_not_found
    respond_with json: {error: 'Tasks not found'}
  end

  private

  def task_params
    params.require(:task).permit(:id, :name, :status, :deadline, :project_id)
  end
end