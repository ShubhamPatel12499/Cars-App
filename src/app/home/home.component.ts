import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { SortPipe } from '../sort.pipe';
import { AuthGuard } from '../auth.guard';


interface Car {
  id: number;
  name: string;
  profile: string;
  brand: string;
  price: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CartService], 
})

export class HomeComponent implements OnInit{
  cars: any[] = [];
  showForm: boolean = false;
  carId: number = 0;
  carName: string = '';
  carProfile: string = '';
  carBrand: string = '';
  carPrice: string = '';
  editingCar: Car | null = null;

  constructor(private authService: AuthService, private http: HttpClient, private cartService: CartService, private authGuard: AuthGuard) { }

  isLoggedIn(): boolean {
    return this.authGuard.isLoggedIn();
  }

  ngOnInit(): void {
    this.fetchCars();
  }

  // fetchCars(): void {
  //   this.http.get<any[]>('https://cars-backend.onrender.com/cars')
  //     .subscribe(
  //       response => {
  //         this.cars = response;
  //         this.cars.forEach((car) => {
  //           car.isEditing = false;
  //         });
  //       },
  //       error => {
  //         console.log('Error:', error);
  //       }
  //     );
  // }

  fetchCars(): void {
    this.http.get<Car[]>('https://cars-backend.onrender.com/cars')
      .subscribe(
        response => {
          this.cars = response;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }

  addToCart(car: any): void {
    this.cartService.addToCart(car);
    alert('Item added to cart');
  }

  showAddCarForm(): void {
    this.showForm = true;
  }

  addCar(): void {
    const newCar = {
      id: this.carId,
      name: this.carName,
      profile: this.carProfile,
      brand: this.carBrand,
      price: this.carPrice
    };

    this.http.post('https://cars-backend.onrender.com/cars', newCar)
      .subscribe(
        () => {
          console.log('Car added successfully');
          this.showForm = false;
          this.fetchCars();
          this.resetForm();
        },
        (error) => {
          console.log('Error adding car:', error);
        }
      );
  }

  resetForm(): void {
    this.carId = 0;
    this.carName = '';
    this.carProfile = '';
    this.carBrand = '';
    this.carPrice = '';
  }

  editCar(car: any): void {
    this.editingCar = { ...car }; 
  }

  // editCar(car: any): void {
  //   this.cars.forEach(c => {
  //     if (c === car) {
  //       c.isEditing = true;
  //     } else {
  //       c.isEditing = false;
  //     }
  //   });
  // }

  cancelEditing(): void {
    this.editingCar = null;
  }

  cancelAdding(): void {
    this.showForm = false; 
    this.resetForm(); 
  }

  // cancelEditing(): void {
  //   this.cars.forEach(car => car.isEditing = false);
  // }

  updateCar(): void {
    if (this.editingCar) {
    this.http.patch<any>(`https://cars-backend.onrender.com/cars/${this.editingCar.id}`, this.editingCar)
      .subscribe(
        () => {
          alert('Car updated successfully');
          this.fetchCars();
          this.editingCar = null;
          // this.cancelEditing();
        },
        (error) => {
          console.log('Error updating car:', error);
        }
      );
  }

  // updateCar(): void {
  //   this.http.patch(`https://cars-backend.onrender.com/cars/${this.editingCar.id}`, this.editingCar)
  //     .subscribe(
  //       () => {
  //         alert('Car updated successfully');
  //         this.cancelEditing();
  //       },
  //       (error) => {
  //         console.log('Error updating car:', error);
  //       }
  //     );
  // }
}

getSortedCarsByBranches(): { branch: string; value: Car[] }[] {
  const groupedCars: { [key: string]: Car[] } = {};

  for (const car of this.cars) {
    if (!groupedCars[car.brand]) {
      groupedCars[car.brand] = [];
    }
    groupedCars[car.brand].push(car);
  }

  const sortedBranches = Object.keys(groupedCars).sort();

  return sortedBranches.map((branch) => ({
    branch,
    value: groupedCars[branch],
  }));
}

}

