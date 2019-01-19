import {Component, OnInit, Pipe, PipeTransform, ViewEncapsulation} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Like} from '../auth/like';
import {Comment} from '../auth/comment';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable, timer} from 'rxjs';


@Component({
  selector: 'app-recipeinfo',
  templateUrl: './recipeinfo.component.html',
  styleUrls: ['./recipeinfo.component.css']
})
export class RecipeinfoComponent implements OnInit {



  recipes: RecipesInfo;

  like: Like = new Like();

  likes: Like[];
   comment: Comment = new Comment();

  comments: Comment[];
  recipeId = window.localStorage.getItem('RecipeById');
  html: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private router: Router, private userService: UserService) {
  }




  ngOnInit() {
    this.userService.getRecipesById(this.recipeId)
      .subscribe(data => {
        this.recipes = data; this.html = this.sanitizer.bypassSecurityTrustHtml(this.recipes.description);
      });
    this.update();
    // let timer1 = timer(10,3000);
    //
    // timer1.subscribe( () =>
    //   this.update()
    // );
    // this.comment.comment_like = data1
    // console.log(data1)
  }

// Добавить таймер для обновления комментов из базы
  createComment(): void {
    this.userService.createComment(this.comment, this.recipeId)
      .subscribe(() =>
        this.update()
      );
  }

  createLike(commentId, comment): void {

    this.userService.getLikesByUserIdAndComment(commentId).subscribe(data => this.save(data, commentId, comment));


    // this.save(data, commentId)
    // this.like.click += 1;
    // console.log(data);
    // this.userService.createLike(this.like, commentId).subscribe(data => console.log(data));
  }

  save(data, commentId, comment) {
    if (data === undefined || data === null) {
      this.like.click = comment.commentClick = 1;
      this.userService.createLike(this.like, commentId).subscribe(() => this.update());
      this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
      console.log('yes1');
    } else {
      if (data.click === 0) {
        this.like.click = comment.commentClick = 1;
        // this.comment.active = 1;
        //update comment this.userservice.updatecomment(this.comment, this.commentId//передается параметр методу
        // обнолвяем конкретный коммент)
        this.userService.updateLike(this.like, commentId).subscribe(() => this.update());
        this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
        console.log(comment);
      } else {
        this.like.click = comment.commentClick = 0;
        this.userService.updateLike(this.like, commentId).subscribe(() => this.update());
        this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
        console.log(comment);
      }

      // обавить в таблицу coment поле актив для лайка и записывать
      // туда значение 0 , 1 вызывать тут и проверять в разметке
    }
  }

  update(): void {
    this.userService.getCommentByReceptId(this.recipeId)
      .subscribe(data => {
        this.comments = data;
        this.comments.forEach((com) => {
          this.userService.getCountLikeByCommentId(com.id).subscribe(data1 => com.comment_like = data1);
        });
      });
  }
}
