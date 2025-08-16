export type DiagnosisType = {
  id: number;
  diagnosed_at: string;
  image_url: string;
  weed_name: string;
  weed_description: string;
  soil_type: number;
  soil_drainage: string | null;
  soil_fertility: string;
  soil_description: string;
  recommended_vegetable: string;
  vegetable_difficulty: string;
  vegetable_season: string[];
  vegetable_description: string;
  vegetable_image_url: string | null;
  result: string;
};
