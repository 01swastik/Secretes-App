import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls : ['./toolbar.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs : Subscription;
  constructor(private authService : AuthService){}

  ngOnInit(){
    this.userIsAuthenticated =this.authService.getIsAuth();
     this.authListenerSubs = this.authService
     .getAuthStatusListener()
     .subscribe(isAuthenticated =>{
         this.userIsAuthenticated = isAuthenticated;
     });
  }

onLogout(){
  this.authService.logout();
}

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }


}
