import {RecipesInfo} from './recipes';
import {Like} from './like';


export class Comment {
  id: number;
  recipe: string;
  description: string;
  recipe_comment: number;
  comment_like: number;
  commentClick: number;
  isLike?: number;
}
