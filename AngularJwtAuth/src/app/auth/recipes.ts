
import {IngredientInfo} from './ingredientInfo';

export class RecipesInfo {
  id: string;
  title: string;
  description: string;
  recipe_rating: number;
  averageRating: number;
  date: Date;
  category: string;
  ingredients: IngredientInfo[] = [];
}
