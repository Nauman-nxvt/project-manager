#tasks_controller.rb

class Api::V1::TasksController < Api::V1::BaseController
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

  private

  def task_params
    params.require(:task).permit(:id, :name, :status, :deadline, :project_id)
  end
end