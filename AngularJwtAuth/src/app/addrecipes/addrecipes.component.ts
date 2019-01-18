import {Component, OnInit} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {IngredientInfo} from '../auth/ingredientInfo';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-addrecipes',
  templateUrl: './addrecipes.component.html',
  styleUrls: ['./addrecipes.component.css']
})


export class AddrecipesComponent implements OnInit {

  recipes: RecipesInfo[];
  recipe: RecipesInfo = new RecipesInfo();
  selectable = true;
  removable = true;
  addOnBlur = true;
  all: Array<string> = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private router: Router, private userService: UserService, public authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getDeepRecipes()
      .subscribe(data => {
        this.recipes = data;
        this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
          this.all = ingredients.map(ingredient => ingredient.name);
        });
      });
  }

  parsing(recipe) {
    this.all.push(recipe);

    // for (let i = 0; i < recipe.length; i++) {
    //   // for (let j in recipe[i]) {
    //   //   console.log(recipe[i][j]);
    //   // }
    //   console.log(recipe[i]);
  }


  createRecipe(): void {
    this.recipe.averageRating = 0;
    this.userService.createRecipe(this.recipe)
      .subscribe(() => this.router.navigate(['recipes']));
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
