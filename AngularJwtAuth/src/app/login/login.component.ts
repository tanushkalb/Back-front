import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';
import {Rating} from '../auth/rating';
import {HttpClient} from '@angular/common/http';


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
  starsCount1: Rating[];
  rating: Rating = new Rating();
  ratings: Rating;
  recipes: RecipesInfo[];
  a: Rating;
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
    //this.userService.getDeepRatingByReceptId().subscribe()
    // this.get().subscribe(data => console.log(data) );
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
    this.userService.getRatingByUserRecipeId(recipeId).subscribe(data => this.save(data, recipeId));
  }
  // this.save(data, recipeId)
 // console.log(data);
  save(data, recipeId) {
    if (data === undefined || data === null) {
      this.rating.rating = this.starsCount;
      this.rating.active = 1;
      this.userService.createRating(this.rating, recipeId).subscribe();
    }  else {
      this.rating.rating = this.starsCount;
      this.userService.updateRating(this.rating, recipeId).subscribe();
      console.log('s');
    }
  }

  // this.userService.getRatingByReceptId(recipeId).subscribe(data => this.save(data, recipeId));
  // save(savefile, recipeId) {
  //   if (savefile === undefined) {
  //     this.rating.rating = this.starsCount;
  //     this.userService.createRating(this.rating.rating, recipeId).subscribe();
  //     console.log('sasa');
  //   } else {
  //     this.rating.rating = this.starsCount;
  //     console.log(this.rating.rating);
  //     this.userService.updateRating(this.rating.rating, recipeId).subscribe();
  //   }
  // }
  // get() {
  //   return this.http.get('http://localhost:8080/rating/ratingId/1')
  //     .pipe(map((data: any[]) => data.map((item: any) => new Rating(item.id, item.rating)  )));
  // }


  // get() {
  //   return this.http.get<any[]>('http://localhost:8080/rating/ratingId/1', {observe: 'response', responseType: 'json'})
  //     .pipe(map(responsive => responsive.body[0]));
  // }

  reloadPage() {
    window.location.reload();
  }
}
