import { Component, OnInit } from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipe: RecipesInfo[] = [];
  userId = window.localStorage.getItem('editRecipeId');

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getRecipesById(this.userId)
      .subscribe(data => {
        this.recipe = data;
        console.log(this.recipe);
      });
  }

  editRecipe(): void {
    this.userService.updateRecipe(this.recipe)
      .subscribe( () => this.router.navigate(['recipes']));
    console.log(this.recipe);
  }
}
