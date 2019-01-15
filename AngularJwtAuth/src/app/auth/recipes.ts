import {Rating} from './rating';
import {IngredientInfo} from './ingredientInfo';

export class RecipesInfo {
  id: string;
  title: string;
  description: string;
  recipe_rating: number;
  averageRating: number;
  ingredients: IngredientInfo[] = [];
}
