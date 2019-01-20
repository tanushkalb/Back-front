import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';
import {IngredientInfo} from '../auth/ingredientInfo';
import {SelectItem} from 'primeng/api';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: RecipesInfo[];
  ingredients: IngredientInfo[];
  cols: any[];
  allIngredients: IngredientInfo[] = [];
  allIngredients1: Array<string> = [];
  yearFilter: number;
  ratingFilter: number;
  hourTimeout: any;
  ratingTimeout: any;
  brands: SelectItem[];
  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'category', header: 'Category' },
      { field: 'averageRating', header: 'Rating' },
      { field: 'date', header: 'Date' },
      {field: 'ingredients', header: 'Ingredient'},
      {field: 'button', header: 'Act'}
          ];

    this.userService.getRecipesByCarrentUser()
      .subscribe(data => {
        this.recipes = data;
        console.log(data);
      });
    this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
      this.allIngredients = ingredients.map(ingredient => ingredient);
      // console.log(this.allIngredients);
    });

    this.brands = [
      { label: 'All Brands', value: null },
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
    ];
  }





  onYearChange(event, dt) {
    if (this.hourTimeout) {
      clearTimeout(this.hourTimeout);
    }

    this.hourTimeout = setTimeout(() => {
      dt.filter(event.value, 'hour', 'gt');
    }, 20);
  }

  onRatingChange(event, dt) {
    if (this.ratingTimeout) {
      clearTimeout(this.ratingTimeout);
    }
    this.ratingTimeout = setTimeout(() => {
      dt.filter(event.value, 'rating', 'gt');
    }, 200);
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
