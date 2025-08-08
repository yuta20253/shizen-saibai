class RemoveConfidenceFromWeedSoilRelations < ActiveRecord::Migration[7.1]
  def change
    remove_column :weed_soil_relations, :confidence, :float
  end
end
