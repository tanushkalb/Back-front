import {Component, OnInit, Pipe, PipeTransform, ViewEncapsulation} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Like} from '../auth/like';
import {Comment} from '../auth/comment';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable, timer} from 'rxjs';
import {TokenStorageService} from '../auth/token-storage.service';


@Component({
  selector: 'app-recipeinfo',
  templateUrl: './recipeinfo.component.html',
  styleUrls: ['./recipeinfo.component.css']
})
export class RecipeinfoComponent implements OnInit {



  recipes: RecipesInfo;

  searchValue: string = '';

  like: Like = new Like();

  likes: Like[];
   comment: Comment = new Comment();

  comments: Comment[];
  recipeId = window.localStorage.getItem('RecipeById');
  html: SafeHtml;

  constructor(private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer, private router: Router, private userService: UserService) {
  }




  ngOnInit() {
    this.userService.getRecipesById(this.recipeId)
      .subscribe(data => {
        this.recipes = data; this.html = this.sanitizer.bypassSecurityTrustHtml(this.recipes.description);
      });

    this.update();

    let timer1 = timer(10,3000 );

    timer1.subscribe( () =>
      this.update()
    );
  }

  createComment(save: boolean = false): void {
    if (save) {
      this.searchValue = null;
      console.log(this.comments);
      this.userService.createComment(this.comment, this.recipeId)
        .subscribe(() =>
          this.update()
        );
    }
  }

  createLike(commentId, comment): void {
    comment.isLike ? comment.isLike = 0 : comment.isLike = 1;
    if (this.tokenStorage.getToken()) {
      this.userService.getLikesByUserIdAndComment(commentId).subscribe(data => this.save(data, commentId, comment));
    }

    // this.save(data, commentId)
    // this.like.click += 1;
    // console.log(data);
    // this.userService.createLike(this.like, commentId).subscribe(data => console.log(data));
  }

  save(data, commentId, comment) {
    if (data === undefined || data === null) {
      this.like.click = 1;
      this.userService.createLike(this.like, commentId).subscribe(() => this.update());
      this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
      console.log('yes1');
    } else {
      if (data.click === 0) {
        this.like.click = 1;
        this.userService.updateLike(this.like, commentId).subscribe(() => this.update());
        this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
        console.log(comment);
      } else {
        this.like.click = 0;
        this.userService.updateLike(this.like, commentId).subscribe(() => this.update());
        this.userService.updateComment(comment, this.recipeId).subscribe(() => this.update());
        console.log(comment);
      }
    }
  }

  update(): void {
    if (this.tokenStorage.getToken()) {
    this.userService.getCommentByReceptIdAndUserid(this.recipeId, this.tokenStorage.getUser().id)
      .subscribe(data => {
        this.comments = data;
      });
    }  else {
  this.userService.getCommentByReceptId(this.recipeId)
    .subscribe(data => this.comments = data );
}
}}
