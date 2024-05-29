import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  limit = '5';

  title1 = "Men's watches";
  category1 = 'mens-watches';

  title2 = 'Laptops';
  category2 = 'laptops';
}
