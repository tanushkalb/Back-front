import {Component, OnInit} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Like} from '../auth/like';
import {Comment} from '../auth/comment';

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
        this.comments.forEach((com) => {
          this.userService.getCountLikeByCommentId(com.id).subscribe(data1 => com.comment_like = data1);
        });
      });

    // this.comment.comment_like = data1
    // console.log(data1)
  }

// Добавить таймер для обновления комментов из базы
  createComment(): void {
    this.userService.createComment(this.comment, this.recipeId)
      .subscribe(() =>
        this.userService.getCommentByReceptId(this.recipeId)
          .subscribe(data => {
            this.comments = data;
            this.comments.forEach((com) => {
              this.userService.getCountLikeByCommentId(com.id).subscribe(data1 => com.comment_like = data1);
            });
          })
      );
  }

  createLike(commentId): void {

    this.userService.getLikesByUserIdAndComment(commentId).subscribe(data => this.save(data, commentId));


    // this.save(data, commentId)
    // this.like.click += 1;
    // console.log(data);
    // this.userService.createLike(this.like, commentId).subscribe(data => console.log(data));
  }

  save(data, commentId) {
    if (data === undefined || data === null) {
      this.like.click = this.comment.comment_click = 1;
      this.userService.createLike(this.like, commentId).subscribe(data3 => this.return(commentId));
      console.log('yes1');
    } else {
      if (data.click === 0) {
        this.like.click = this.comment.comment_click = 1;
        this.userService.updateLike(this.like, commentId).subscribe(data3 => this.return(commentId));
        console.log('no');
      } else {
        this.like.click = this.comment.comment_click = 0;
        this.userService.updateLike(this.like, commentId).subscribe(data3 => this.return(commentId));
        console.log('yes');
      }
    }
  }

  return(commentId): void {
    this.userService.getCommentByReceptId(this.recipeId)
      .subscribe(data => {
        this.comments = data;
        this.comments.forEach((com) => {
          this.userService.getCountLikeByCommentId(com.id).subscribe(data1 => com.comment_like = data1);
        });
      });
  }
}
