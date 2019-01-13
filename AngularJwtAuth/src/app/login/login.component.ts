import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';
import {Like} from '../auth/like';
import {Rating} from '../auth/rating';
import {HttpClient} from '@angular/common/http';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  data: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  starsCount: number;
  starsCount1: Rating[];
  rating: Rating = new Rating();
  ratings: Rating[];
  recipes: RecipesInfo[];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.userService.getRecipes()
      .subscribe(data => {
        this.recipes = data;
        this.recipes.forEach((rec) => {
          this.userService.getRatingByReceptId(rec.id).subscribe(data1 => rec.recipe_rating = data1);
        });
      });


    // this.get().subscribe(data => console.log(data));
  }

  onSubmit() {


    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveUser(data.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }


  goToCheck(recipe: RecipesInfo): void {
    window.localStorage.removeItem('RecipeById');
    window.localStorage.setItem('RecipeById', recipe.id.toString());
    this.router.navigate(['CheckRecipe']);
  }

  createRating(recipeId): void {
    let a: Rating;
    this.userService.getRatingByReceptId(recipeId).subscribe(data => console.log(data));
    if (a) {
console.log(a);
    } else {
      this.rating.rating = this.starsCount;
      this.userService.createRating(this.rating.rating, recipeId).subscribe();
    }
  }


  get() {
    return this.http.get('http://localhost:8080/rating/ratingId/4')
      .pipe(map(response => response[0]), pipe(map(u => u)))
      ;
  }

  reloadPage() {
    window.location.reload();
  }
}
