import {Component, OnInit} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Like} from '../auth/like';

@Component({
  selector: 'app-recipeinfo',
  templateUrl: './recipeinfo.component.html',
  styleUrls: ['./recipeinfo.component.css']
})
export class RecipeinfoComponent implements OnInit {

  recipes: RecipesInfo[] = [];

  like: Like = new Like();

  likes: Like[];

  fff: boolean = true;

  comment: Comment = new Comment();

  comments: Comment[];

  recipeId = window.localStorage.getItem('RecipeById');

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getRecipesById(this.recipeId)
      .subscribe(data => {
        this.recipes = data;
      });
    this.userService.getCommentByReceptId(this.recipeId)
      .subscribe(data => {
        this.comments = data;
        console.log(data);
      });
   // this.userService.getLikesByIdComment(this.comment.)
  }
//Добавить таймер для обновления комментов из базы
  createComment(): void {
    this.userService.createComment(this.comment, this.recipeId)
      .subscribe(() =>
        this.userService.getCommentByReceptId(this.recipeId)
          .subscribe(data => {
            this.comments = data;
          })
      );
  }

  createLike(commentId): void {
    this.like.isActive = this.fff;
    console.log(this.like);
    this.userService.createLike(this.like, commentId).subscribe();

  }
}
