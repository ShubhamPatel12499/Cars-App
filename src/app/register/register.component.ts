import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email!: string;
  name!: string;
  password!: string;
  selectedRoute!: string;

  constructor(private router: Router) { }

  register(): void {

    const userData = {
      email: this.email,
      name: this.name,
      password: this.password,
      selectedRoute: this.selectedRoute
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    this.router.navigate(['login']);
  }
}

