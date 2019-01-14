import {Component, OnInit} from '@angular/core';
import {RecipesInfo} from '../auth/recipes';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-addrecipes',
  templateUrl: './addrecipes.component.html',
  styleUrls: ['./addrecipes.component.css']
})
export class AddrecipesComponent implements OnInit {

  recipes: RecipesInfo[];

  recipe: RecipesInfo = new RecipesInfo();

  constructor(private router: Router, private userService: UserService, public authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getRecipes()
      .subscribe(data => {
        this.recipes = data;
      });
  }

  createRecipe(): void {
    this.recipe.averageRating = 1;
    this.userService.createRecipe(this.recipe)
      .subscribe(() => this.router.navigate(['recipes']));
  }
}
