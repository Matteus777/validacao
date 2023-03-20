import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  token = localStorage.getItem('token');
  constructor(private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.activateGuard(route);
  }

  private activateGuard(route: ActivatedRouteSnapshot): boolean {
    if (!this.token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
