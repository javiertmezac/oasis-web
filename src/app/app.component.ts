import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'Planta Purificadora "Oasis"';
  isLoggedIn$: Observable<boolean> | undefined

  constructor(private authService: AuthService){}

  ngOnInit() {

    console.log('on init: pm-root')
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    console.log('on init: pm-root: ', this.isLoggedIn$)
  }
}
