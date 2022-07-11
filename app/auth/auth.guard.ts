import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private actrouter: ActivatedRoute
  ) {}

  canActivate() {
    if (this.auth.isLogged()) {
      return true;
    }
    this.router.navigate([''], { relativeTo: this.actrouter });
    return false;
  }
}
