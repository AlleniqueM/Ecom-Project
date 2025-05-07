// admin-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from '../services/admin/admin-orders.service';
import { BackButtonComponent } from '../components/back-button/back-button.component';

@Component({
  selector: 'app-admin-orders',
  imports: [BackButtonComponent],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private ordersService: AdminOrdersService) {
    this.ordersService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  viewOrder(orderId: string): void {
    this.ordersService.getOrderById(orderId).subscribe(order => {
      this.selectedOrder = order;
    });
  }

  cancelOrder(orderId: string): void {
    if (confirm('Cancel this order?')) {
      this.ordersService.cancelOrder(orderId).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== orderId);
        if (this.selectedOrder?.id === orderId) {
          this.selectedOrder = null;
        }
      });
    }
  }
}
