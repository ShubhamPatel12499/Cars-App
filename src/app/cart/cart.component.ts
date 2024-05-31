import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
  cartItems: any[] = [];
  archivedItems: any[] = [];
  isLoggedIn: boolean= true;
  // editItemData: any = null;

  constructor(private authService: AuthService, private cartService: CartService,private http: HttpClient) { }

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }

  ngOnInit(): void {
    this.fetchCartItems();
    this.loadArchivedItemsFromLocalStorage(); 
    this.saveCartItemsToLocalStorage()
  }

  private loadArchivedItemsFromLocalStorage(): void {
    const archivedItemsJson = localStorage.getItem('archivedItems');
    if (archivedItemsJson) {
      this.archivedItems = JSON.parse(archivedItemsJson);
    }
  }
  
  fetchCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  // deleteItem(item: any): void {
  //   const index = this.cartItems.indexOf(item);
  //   if (index !== -1) {
  //     this.cartItems[index].editMode = true;
  //   }
  // }

  deleteItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      const deletedItem = this.cartItems.splice(index, 1)[0]; 
      deletedItem.editMode = true; 
      this.archivedItems.unshift(deletedItem); 
    }
  }
  editItem(item: any): void {
    item.editMode = !item.editMode;
  }

  // permanentDeleteItem(item: any): void {
  //   const index = this.cartItems.indexOf(item);
  //   if (index !== -1) {
  //     this.cartItems.splice(index, 1);
  //     this.http.delete(`https://cars-backend.onrender.com/cars/${item.id}`)
  //         .subscribe(
  //           () => {
  //             console.log('Item permanently deleted from the database');
  //           },
  //           (error) => {
  //             console.log('Error deleting item:', error);
  //           }
  //         );
  //   }
  // }

  // permanentDeleteItem(item: any): void {
  //   const index = this.archivedItems.indexOf(item);
  //   if (index !== -1) {
  //     this.http.delete(`https://cars-backend.onrender.com/cars/${item.id}`)
  //       .subscribe(
  //         () => {
  //           alert('Item permanently deleted from the database');
  //           this.archivedItems.splice(index, 1);
  //           this.removeArchivedItem(item); 
  //         },
  //         (error) => {
  //           console.log('Error deleting item:', error);
  //         }
  //       );
  //   }
  // }

  permanentDeleteItem(item: any): void {
    const cartIndex = this.cartItems.indexOf(item);
    const archivedIndex = this.archivedItems.indexOf(item);
  
    if (cartIndex !== -1) {
      this.cartItems.splice(cartIndex, 1);
      this.saveCartItemsToLocalStorage(); 
    }
  
    if (archivedIndex !== -1) {
      this.http.delete(`https://cars-backend.onrender.com/cars/${item.id}`)
        .subscribe(
          () => {
            alert('Item permanently deleted from the database');
            this.archivedItems.splice(archivedIndex, 1);
            // this.cartItems.splice(cartIndex, 1);
            this.removeArchivedItem(item);
            this.saveArchivedItemsToLocalStorage();
          },
          (error) => {
            console.log('Error deleting item:', error);
          }
        );
    }
  }

  restoreItem(item: any): void {
    const index = this.archivedItems.indexOf(item);
    if (index !== -1) {
      const restoredItem = this.archivedItems.splice(index, 1)[0]; 
      restoredItem.editMode = false;
      this.cartItems.unshift(restoredItem); 
      this.saveCartItemsToLocalStorage();
    }
  }

  private removeArchivedItem(item: any): void {
    const archivedIndex = this.archivedItems.indexOf(item);
    if (archivedIndex !== -1) {
      this.archivedItems.splice(archivedIndex, 1);
      this.saveCartItemsToLocalStorage();
    }
  }

  private saveArchivedItemsToLocalStorage(): void {
    const archivedItemsJson = JSON.stringify(this.archivedItems);
    localStorage.setItem('archivedItems', archivedItemsJson);
  }

  private saveCartItemsToLocalStorage(): void {
    const cartItemsJson = JSON.stringify(this.cartItems);
    localStorage.setItem('cartItems', cartItemsJson);
  }
}



