import {Component, OnInit} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';
import {MatChipInputEvent} from '@angular/material';
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

  recipes: RecipesInfo[]
  recipe: RecipesInfo = new RecipesInfo();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  fruits: Fruit[] = []
  ;

  constructor(private router: Router, private userService: UserService, public authService: AuthService) {
  }
  ngOnInit() {
    this.userService.getRecipes()
      .subscribe(data => {
        this.recipes = data;
      });
  }

  createRecipe(): void {
    this.recipe.averageRating = 1;
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




}
