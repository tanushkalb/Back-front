import { Component, OnInit } from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {IngredientInfo} from '../auth/ingredientInfo';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  removable = true;
  recipe: RecipesInfo;
  selectable = true;
  addOnBlur = true;
  all: Array<string> = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  recipeId = window.localStorage.getItem('editRecipeId');

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.recipeId = window.localStorage.getItem('editRecipeId');
    this.userService.getRecipesById(this.recipeId)
      .subscribe(data => {
        this.recipe = data;
        this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
          this.all = ingredients.map(ingredient => ingredient.name);
        });
      });
  }

  editRecipe(): void {
    this.userService.updateRecipe(this.recipe)
      .subscribe( () => this.router.navigate(['recipes']));
    console.log(this.recipe);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.recipe.ingredients.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(recipesInfo: IngredientInfo): void {
    const index = this.recipe.ingredients.indexOf(recipesInfo);
    if (index >= 0) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.recipe.ingredients.push({name: event.option.viewValue});
  }

}
