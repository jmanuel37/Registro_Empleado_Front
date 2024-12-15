import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import{ Router }from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

   showAdmin = false;
  isLoggedIn = false;
  user:any = null;
  admin:String;

  constructor(public login:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.showAdmin = this.login.isRoleAdmin();
   // this.admin=this.login.getUserRole();


    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();

        //this.admin=this.login.getUserRole();
       // if(this.admin=='ADMIN'){
       //   this.showAdmin = true;
      //  }
      //  console.log('admiii',this.admin);


       this.showAdmin = this.login.isRoleAdmin();
       console.log('admiii',this.showAdmin);
      }
    )

  }

  public logout(){
    this.login.logout();
    //window.location.reload();

   this.reloadpage();
  }
  public reloadpage(){
   // window.location.reload();
    //this.router.navigate(['/']);
    window.location.reload();

  }


}
