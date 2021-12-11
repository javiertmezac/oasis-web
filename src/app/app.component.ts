import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService,
    private router: Router){}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.removeSession();
    console.log("User is logout");
    this.router.navigateByUrl('/login');
  }
}
