import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData: any;

  constructor(private authService: AuthService) {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
  }

  updateRoute(selectedRoute: string): void {
    this.userData.selectedRoute = selectedRoute;
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
