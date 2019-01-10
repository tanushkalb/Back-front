import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: RecipesInfo[];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getRecipesByCarrentUser()
      .subscribe(data => {
        this.recipes = data;
        console.log(data);
      });
  }

  goToCheck(recipe: RecipesInfo): void {
    window.localStorage.removeItem('RecipeById');
    window.localStorage.setItem('RecipeById', recipe.id.toString());
    this.router.navigate(['CheckRecipe']);
  }

  editRecipe(recipe: RecipesInfo): void {
    window.localStorage.removeItem('editRecipeId');
    window.localStorage.setItem('editRecipeId', recipe.id.toString());
    this.router.navigate(['edit-recipe']);
  }

  deleteRecipe(recipe: RecipesInfo): void {
    this.userService.deleteRecipe(recipe)
      .subscribe(data => {
        this.recipes = this.recipes.filter(u => u !== recipe);
      });
  }
}
