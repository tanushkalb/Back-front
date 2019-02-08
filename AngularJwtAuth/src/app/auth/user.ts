import {RecipesInfo} from './recipes';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string[];
  recipes: RecipesInfo[];
  theme: number;
  lang: string;
}
