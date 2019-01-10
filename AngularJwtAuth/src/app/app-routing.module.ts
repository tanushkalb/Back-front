import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {RecipesComponent} from './recipes/recipes.component';
import {AddrecipesComponent} from './addrecipes/addrecipes.component';
import {RecipeinfoComponent} from './recipeinfo/recipeinfo.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
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
    redirectTo: 'home',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
