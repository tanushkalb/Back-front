import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {AdminComponent} from './admin/admin.component';

import {httpInterceptorProviders} from './auth/auth-interceptor';
import {RecipesComponent} from './recipes/recipes.component';
import {AddrecipesComponent} from './addrecipes/addrecipes.component';
import {RecipeinfoComponent} from './recipeinfo/recipeinfo.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {RatingModule} from 'ngx-rating';
import {AllrecipesComponent} from './allrecipes/allrecipes.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule, MatCardModule, MatFormFieldModule} from '@angular/material';
import {EditorModule} from 'primeng/editor';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {CalendarModule, DropdownModule, InplaceModule, InputTextModule, MultiSelectModule} from 'primeng/primeng';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    AdminComponent,
    RecipesComponent,
    AddrecipesComponent,
    RecipeinfoComponent,
    EditRecipeComponent,
    AllrecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    RatingModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    EditorModule,
    MatCardModule,
    MatIconModule,
    ButtonModule,
    TableModule,
    SliderModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InplaceModule,
    // Put ionic2-rating module here
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

