class RemoveSuitabilityFromSoilVegetableRelations < ActiveRecord::Migration[7.1]
  def change
    remove_column :soil_vegetable_relations, :suitability, :integer
  end
end
