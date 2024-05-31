import { Component} from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private router: Router,  private authGuard: AuthGuard) { }

  login(): void {

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData.email === this.email && userData.password === this.password) {
        alert("Succesfully Logged in!")
        // localStorage.removeItem('userData');
        // this.authService.setLoggedIn(true);
        this.authGuard.setLoggedIn(true);
        this.router.navigate([userData.selectedRoute]);
        return;
      }
    }
    console.log('Invalid credentials');
    alert("Please Register First!")
    this.router.navigate(['register']);
  }
}

