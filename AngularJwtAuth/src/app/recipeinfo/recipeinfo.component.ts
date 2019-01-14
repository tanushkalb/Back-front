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
          this.userService.getLikeByCommentId(com.id).subscribe(data1 => console.log(data1));
        });
      });
  }

// Добавить таймер для обновления комментов из базы
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

    this.userService.getLikesByUserIdAndCommentId(commentId).subscribe(data => this.save(data, commentId));


    // this.save(data, commentId)
    // this.like.click += 1;
    // console.log(data);
    // this.userService.createLike(this.like, commentId).subscribe(data => console.log(data));
  }

  save(data, commentId) {
    if (data === undefined || data === null) {
      this.like.click = 1;
      this.userService.createLike(this.like, commentId).subscribe();
      console.log('yes1');
    } else {
      if (data === 0) {
        this.like.click = 1;
        this.userService.updateLike(this.like, commentId).subscribe();
        console.log('no');
      } else {
        this.like.click = 0;
        this.userService.updateLike(this.like, commentId).subscribe();
        console.log('yes');
      }
    }
  }
}
