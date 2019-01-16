import { Component, OnInit } from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Rating} from '../auth/rating';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.css']
})
export class AllrecipesComponent implements OnInit {

  starsCount: number;
  rating: Rating = new Rating();
  recipes: RecipesInfo[];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    this.return();
    //this.userService.getRecipes().subscribe(data => this.recipes = data);
  }

  goToCheck(recipe: RecipesInfo): void {
    window.localStorage.removeItem('RecipeById');
    window.localStorage.setItem('RecipeById', recipe.id.toString());
    this.router.navigate(['CheckRecipe']);
  }

  createRating(recipeId): void {
    this.userService.getRatingByUserRecipeId(recipeId).subscribe(data => this.save(data, recipeId));
  }

  save(data, recipeId) {
    if (data === undefined || data === null) {
      this.rating.rating = this.starsCount;
      this.rating.active = 1;
      this.userService.createRating(this.rating, recipeId).subscribe(() => this.return());

    }  else {
      this.rating.rating = this.starsCount;
      this.userService.updateRating(this.rating, recipeId).subscribe(() => this.return());
      console.log('s');
    }
  }

  getOrder(): void {
    this.userService.getRecipesOrderAverageRating()
      .subscribe(data1 => {
        this.recipes = data1;
        this.recipes.forEach((rec) => {
          this.userService.getAverageRatingByRecipeId(rec.id).subscribe(data2 => rec.recipe_rating = data2);
        });
      });
  }

  return(): void {
    this.userService.getRecipes()
      .subscribe(data1 => {
        this.recipes = data1;
        this.recipes.forEach((rec) => {
          this.userService.getAverageRatingByRecipeId(rec.id).subscribe(data2 => rec.recipe_rating = data2);
        });
      });
  }



}
