import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';
import {Rating} from '../auth/rating';
import {HttpClient} from '@angular/common/http';
import {IngredientInfo} from '../auth/ingredientInfo';
import {and} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  starsCount: number;
  rating: Rating = new Rating();
  recipes: RecipesInfo[];
  recipesByDate: RecipesInfo[];
  all: Array<string> = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
        this.all = ingredients.map(ingredient => ingredient.name);
      });
    }
    this.getOrder();
    this.getOrderByDate();
  }

  onSubmit() {

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveUser(data.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
          this.all = ingredients.map(ingredient => ingredient.name);
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;

        if (this.errorMessage === 'Fail -> Email doesn`t valid!' && this.isLoginFailed === true) {
          this.isLoginFailed = false;
        } else {
          this.isLoginFailed = true;
          this.errorMessage = null;
        }
      }
    );

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
      this.userService.createRating(this.rating, recipeId).subscribe(() => {
        this.getOrder();
        this.getOrderByDate();
      });
      console.log('a');
      //this.return();
    } else {
      this.rating.rating = this.starsCount;
      this.userService.updateRating(this.rating, recipeId).subscribe(() => {
        this.getOrder();
        this.getOrderByDate();
      });
      //this.return();
      console.log('s');
    }
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

  getOrder(): void {
    this.userService.getRecipesOrderAverageRating()
      .subscribe(data1 => {
        this.recipes = data1;
        this.recipes.forEach((rec) => {
          this.userService.getAverageRatingByRecipeId(rec.id).subscribe(data2 => rec.recipe_rating = data2);
        });
      });
  }

  getOrderByDate(): void {
    this.userService.getRecipesOrderByDate()
      .subscribe(data1 => {
        this.recipesByDate = data1;
        this.recipesByDate.forEach((rec) => {
          this.userService.getAverageRatingByRecipeId(rec.id).subscribe(data2 => rec.recipe_rating = data2);
        });
      });
  }
}
