import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if(user) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
