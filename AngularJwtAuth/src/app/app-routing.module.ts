import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {RecipesComponent} from './recipes/recipes.component';
import {AddrecipesComponent} from './addrecipes/addrecipes.component';
import {RecipeinfoComponent} from './recipeinfo/recipeinfo.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {AllrecipesComponent} from './allrecipes/allrecipes.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
