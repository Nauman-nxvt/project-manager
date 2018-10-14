class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :status
      t.date :deadline
      t.references :project, foreign_key: true, index: true

      t.timestamps
    end
  end
end
