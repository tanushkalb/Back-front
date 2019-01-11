import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs';

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
