import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {RecipesInfo} from '../auth/recipes';
import {IngredientInfo} from '../auth/ingredientInfo';
import {SelectItem} from 'primeng/api';
import {Table,} from 'primeng/table';
import {User} from '../auth/user';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: RecipesInfo[];
  ingredients: IngredientInfo[];
  cols: any[];
  allIngredients: IngredientInfo[] = [];
  allIngredients1: Array<string> = [];
  yearFilter: number;
  ratingFilter: number = 6;
  hourTimeout: any;
  ratingTimeout: any;
  buttons: SelectItem[];
  selectedRecipes: RecipesInfo[] = [];
  dateFilters: any;
  isUserNameActive: boolean;
  savedUserName: string;
user: User;
  @ViewChild('dt') private _table: Table;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getCarrentUser().subscribe( data => this.user = data );
    this.cols = [
      {field: 'title', header: 'Title'},
      {field: 'category', header: 'Category'},
      {field: 'averageRating', header: 'Rating'},
      {field: 'date', header: 'Date'},
      {field: 'ingredients', header: 'Ingredient'},
      {field: 'button', header: 'Act'}
    ];
    const _self = this;
    this._table.filterConstraints['dateRangeFilter'] = (value, filter): boolean => {
      console.log(value);
      const year = value.substring(value.lastIndexOf('-') + 1);
      const day = value.substring(value.indexOf('-') - 2, value.indexOf('-'));
      const month = value.substring(9, 11) - 1;
      const hours = value.substring(0, 2);
      value = new Date(year, month, day, hours);
      const dayInMs = 1000 * 60 * 60 * 24;
      const s = _self.dateFilters[0].getTime();
      let e;
      if (_self.dateFilters[1]) {
        e = _self.dateFilters[1].getTime() + dayInMs;
      } else {
        e = s + 86400000;
      }
      return value.getTime() >= s && value.getTime() <= e;
    };


    this.userService.getRecipesByCarrentUser()
      .subscribe(data => {
        this.recipes = data;
        this.selectedRecipes = data;
        console.log(data);
      });
    this.userService.getIngredients().subscribe((ingredients: IngredientInfo[]) => {
      this.allIngredients = ingredients.map(ingredient => ingredient);
      // console.log(this.allIngredients);
    });

    this.buttons = [
      {label: 'Act', value: null},
      {label: 'check', value: 'check'},
      {label: 'change', value: 'change'},
      {label: 'delete', value: 'delete'},
    ];

    //this.buttons = [label: 'Check', 'change', 'delete'];
  }

act(data, event) {
  console.log(event);
    if (event.value === 'check') {
      console.log('aasf');
    this.goToCheck(data);
}
  if (event.value === 'change') {
    console.log('aasf');
    this.editRecipe(data);
  }
  if (event.value === 'delete') {
    console.log('aasf');
    this.deleteRecipe(data);
  }

  }



  onFilterIngredients(event, dt: Table) {
    if (event.value.length > 0) {
      this.selectedRecipes = this.recipes.filter((item) => {
        return event.value.filter(ingredient => {
          return item.ingredients.filter(ingredient1 =>
            ingredient.name === ingredient1.name
          ).length > 0;
        }).length > 0;
      });
    } else {
      this.selectedRecipes = this.recipes;
    }
  }


  onYearChange(event, dt) {
    if (this.hourTimeout) {
      clearTimeout(this.hourTimeout);
    }

    this.hourTimeout = setTimeout(() => {
      dt.filter(event.value, 'date', 'gt');
    }, 20);
  }

  onRatingChange(event, dt) {
    if (this.ratingTimeout) {
      clearTimeout(this.ratingTimeout);
    }
    this.ratingTimeout = setTimeout(() => {
      dt.filter(event.value, 'averageRating', 'lt');
    }, 200);
  }

  updateUser(save = false) {
    this.isUserNameActive = !this.isUserNameActive;
    if (this.isUserNameActive) {
      this.savedUserName = this.user.username;
    } else {
      if (save) {
        this.savedUserName = this.user.username;
      } else {
        this.user.username = this.savedUserName;
      }
      this.userService.updateUser(this.user).subscribe( data => console.log(data));
    }
  }


  goToCheck(recipe: RecipesInfo): void {
    window.localStorage.removeItem('RecipeById');
    window.localStorage.setItem('RecipeById', recipe.id.toString());
    this.router.navigate(['CheckRecipe']);
  }

  editRecipe(recipe: RecipesInfo): void {
    window.localStorage.removeItem('editRecipeId');
    window.localStorage.setItem('editRecipeId', recipe.id.toString());
    this.router.navigate(['edit-recipe']);
  }

  deleteRecipe(recipe: RecipesInfo): void {
    this.userService.deleteRecipe(recipe)
      .subscribe(data => {
        this.recipes = this.recipes.filter(u => u !== recipe);
      });
  }




}
