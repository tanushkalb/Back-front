import {enableProdMode, OnInit} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {TokenStorageService} from './app/auth/token-storage.service';
import {UserService} from './app/services/user.service';
import {Router} from '@angular/router';
import {AuthService} from './app/auth/auth.service';
import {User} from './app/auth/user';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// export class Main implements OnInit {
//
//   user: User;
//
//   constructor(private tokenStorage: TokenStorageService, private userService: UserService,
//               private token: TokenStorageService, private router: Router, private sharedService: AuthService) {
//   }
//
//   ngOnInit() {
//     this.userService.getCarrentUser()
//       .subscribe(data => {
//         this.user = data;
//       });
//   }
// }
