import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css',
})
export class OrdersTableComponent {}
