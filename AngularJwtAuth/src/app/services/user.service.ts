import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {RecipesInfo} from '../auth/recipes';
import {TokenStorageService} from '../auth/token-storage.service';
import {User} from '../auth/user';
import {Like} from '../auth/like';
import {Rating} from '../auth/rating';
import {map} from 'rxjs/operators';
import {Comment} from '../auth/comment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private recipesUrl = 'http://localhost:8080/recipes';
  private Url = 'http://localhost:8080/';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, {responseType: 'text'});
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  public getRecipes() {
    return this.http.get<RecipesInfo[]>(this.recipesUrl);
  }

  public getRecipesById(id) {
    return this.http.get<RecipesInfo[]>(this.recipesUrl + '/' + id);
  }

  public getRecipesByCarrentUser() {
    return this.http.get<RecipesInfo[]>(this.recipesUrl + '/user/' + this.tokenStorage.getUser().id);
  }

  public getCommentById(id) {
    return this.http.get<Comment[]>(this.Url + 'comment/comment' + id);
  }

  public getComment() {
    return this.http.get<Comment[]>(this.Url + 'comment/comment');
  }

  public getCommentByReceptId(receptId) {
    return this.http.get<Comment[]>(this.Url + 'comment/Comment/Commentbyrecept/' + receptId);
  }

  public getCarrentUser() {
    return this.http.get<User>(this.Url + 'user/carrentuser/' + this.tokenStorage.getUser().id);
  }

  public getLikeByCommentId(commentId) {
    return this.http.get<Like>(this.Url + 'like/commentId/' + commentId)
      .pipe(map(response => response[0]));
  }

  public getLikesByUserIdAndCommentId(commentId) {
    return this.http.get(this.Url + 'like/userId/commentId/' + this.tokenStorage.getUser().id + '/' + commentId)
      .pipe(map(response => response[0]), pipe(map(u => u.click)));
  }
  public getDeepRatingByReceptId(receptId) {
    return this.http.get<Rating>(this.Url + 'rating/ratingId/' + receptId)
      .pipe(map(response => response[0]), pipe(map(u => u.rating)));
  }

  public getAverageRatingByRecipeId(recipeId) {
    return this.http.get<Rating>(this.Url + 'recipes/average/' + recipeId)
      .pipe(map(response => response.averageRating));
  }

  public getRatingByReceptId(receptId) {
    return this.http.get<Rating>(this.Url + 'rating/ratingId/' + receptId)
      .pipe(map(response => response[0]));
  }

  public getRatingByUserRecipeId(recipeId) {
    return this.http.get<Rating>(this.Url + 'rating/rat/userId/' + this.tokenStorage.getUser().id + '/' + recipeId)
      .pipe(map(response => response[0]));
  }

  public createRecipe(recipe) {
    return this.http.post<RecipesInfo>(this.recipesUrl + '/' + this.tokenStorage.getUser().id, recipe);
  }

  public createComment(comment, recipeId) {
    return this.http.post<Comment>(this.Url + 'comment/Comment/' + this.tokenStorage.getUser().id + '/Recipe/' + recipeId, comment);
  }

  public createLike(like, commentId) {
    return this.http.post<Like>(this.Url + 'like/user/' + this.tokenStorage.getUser().id + '/comment/' + commentId, like);
  }

  public createRating(rating, recipeId) {
    return this.http.post<Rating>(this.Url + 'rating/user/' + this.tokenStorage.getUser().id + '/recipe/' + recipeId, rating);
  }

  public updateRecipe(recipe) {
    return this.http.put(this.recipesUrl + '/' + this.tokenStorage.getUser().id, recipe);
  }

  public updateUser(user) {
    return this.http.put(this.Url + 'user/carrentuser/' + this.tokenStorage.getUser().id, user);
  }

  public updateRating(rating, recipeId) {
    return this.http.put(this.Url + 'rating/ratingUserId/' + this.tokenStorage.getUser().id + '/ratingRecipeId/' + recipeId, rating);
  }

  public updateLike(like, commentId) {
    return this.http.put(this.Url + 'like/user/' + this.tokenStorage.getUser().id + '/comment/' + commentId, like);
  }



  public deleteRecipe(recipe) {
    return this.http.delete(this.recipesUrl + '/' + recipe.id);
  }

}
