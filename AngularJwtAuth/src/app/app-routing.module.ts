import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {RecipesComponent} from './recipes/recipes.component';
import {AddrecipesComponent} from './addrecipes/addrecipes.component';
import {RecipeinfoComponent} from './recipeinfo/recipeinfo.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {AllrecipesComponent} from './allrecipes/allrecipes.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'addrecipes',
    component: AddrecipesComponent
  },
  {path: 'CheckRecipe', component: RecipeinfoComponent},
  {
    path: 'edit-recipe',
    component: EditRecipeComponent
  },
  {
    path: 'allrecipes',
    component: AllrecipesComponent
  },
  {
    path: 'adminUserList',
    component: AdminUserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
