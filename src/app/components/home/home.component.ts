import { Component,  OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ProductsService } from '../../services/user/products.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  data: any;

  constructor(private userService: UserService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.userService.home().subscribe(response => {
      this.data = response;
    });
  }

  
}
