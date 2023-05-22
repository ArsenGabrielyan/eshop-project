import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  categories: string[] = ["Cars", "Baby Products", "Beauty", "Books", "Camera", "Phone", "Phone Accessories", "Electronics", "Grocery & Foods", "Health and Personal Care", "Home and Garden", "Industrial and Scientific", "Music", "DVD", "CD", "Musical instruments", "Office Products", "Outdoors", "Computers", "Pet Supplies", "Software", "Sports", "Tools & Improvement", "Toys and Games", "Video", "Blu-ray", "Video Games", "Watches", "Game Consoles", "Entertainment Collectibles"];
  searchHint = `Search (e.g. ${this.categories[Math.floor(Math.random()*this.categories.length)]})`;
}
