import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {RecipesInfo} from './auth/recipes';
import {User} from './auth/user';
import {UserService} from './services/user.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  Status: number;
  user = {} as User;
  theme: number = 0;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService,
              private token: TokenStorageService, private translate: TranslateService, private router: Router, private sharedService: AuthService) {
    translate.setDefaultLang('ru');
  }




  ngOnInit() {
    this.tokenStorage.userChange.subscribe(user => {
      if (this.tokenStorage.getToken()) {
        this.roles = this.tokenStorage.getAuthorities();
        this.roles.every(role => {
          if (role === 'ROLE_ADMIN') {
            this.authority = 'admin';
            return false;
          } else if (role === 'ROLE_PM') {
            this.authority = 'pm';
            return false;
          }
          this.authority = 'user';
          return true;
        });
      }
      this.user = this.tokenStorage.getUser();
      this.theme = this.user.theme;
      if (this.user.lang) {
        this.translate.use(this.user.lang);
      }
    });

    this.user = this.tokenStorage.getUser();
    if (this.user === null) {
      this.theme = 0;
    }
  }

  clickedFalse() {
    // document.body.style.background = 'url(../../assets/background-image/sweets.jpg);';
    console.log();
    this.theme = 0;
    if (this.user !== null) {
      this.user.theme = this.theme;
      this.userService.updateUser(this.user)
        .subscribe();
    }
  }

  clickedTrue() {
    // document.body.style.background = 'url(../../assets/background-image/vegetable.jpg);';
    this.theme = 1;
    if (this.user) {
      this.user.theme = this.theme;
      this.userService.updateUser(this.user)
        .subscribe();
    }
  }



  switchLanguage(language: string) {
    this.translate.use(language);
    if (this.user) {
      this.user.lang = language;
      this.userService.updateUser(this.user)
        .subscribe();
    }
    //console.log(this.user);
  }


  // chooseTheme(theme: User): void {
  //   this.userService.deleteUser(theme)
  //     .subscribe();
  // });
  logout() {
    this.token.signOut();
    this.router.navigate(['/auth/login']);
  }
}
