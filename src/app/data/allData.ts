import { IProduct } from "./product";

export const products: IProduct[] = [
     {name: "Airpods", price: 199.99, image: "assets/images/airpods.jpg"},
     {name: "Home Assistant", price: 39.99, image: "assets/images/assistant.jpg"},
     {name: "Backpack", price: 20, image: "assets/images/backpack.jpg"},
     {name: "Bike", price: 50, image: "assets/images/bike.jpg"},
     {name: "Retro Camera", price: 30, image: "assets/images/camera1.jpg"},
     {name: "Modern Camera", price: 149.99, image: "assets/images/camera2.jpg"},
     {name: "Off Road Car", price: 500, image: "assets/images/car.jpg"},
     {name: "Computer", price: 499.99, image: "assets/images/computer.jpg"},
     {name: "Sunglasses", price: 5, image: "assets/images/glasses.jpg"},
     {name: "Gaming Headset", price: 29.99, image: "assets/images/headset.jpg"},
     {name: "Orange Juice", price: 2.99, image: "assets/images/juice.jpg"},
     {name: "Perfume", price: 64, image: "assets/images/perfume.jpg"},
     {name: "Phone", price: 499.99, image: "assets/images/phone.jpg"},
     {name: "Sneakers", price: 80, image: "assets/images/shoe1.jpg"},
     {name: "Shoes", price: 40, image: "assets/images/shoe2.jpg"},
     {name: "Shower Gel and Shampoo", price: 10, image: "assets/images/shower-gel.jpg"},
     {name: "Ceramic Vase", price: 99.99, image: "assets/images/vase.jpg"},
     {name: "Modern Watch", price: 399.99, image: "assets/images/watch1.jpg"},
     {name: "Classic Watch", price: 299.99, image: "assets/images/watch2.jpg"},
     {name: "Classic Watch", price: 299.99, image: "assets/images/watch3.jpg"},
     {name: "BBQ Sandwich 'Ghars'", price: 2, image: "assets/images/ghars.jpg"},
];
const categories: string[] = ["Cars", "Baby Products", "Beauty", "Books", "Camera", "Phone", "Phone Accessories", "Electronics", "Grocery & Foods", "Health and Personal Care", "Home and Garden", "Industrial and Scientific", "Music", "DVD", "CD", "Musical instruments", "Office Products", "Outdoors", "Computers", "Pet Supplies", "Software", "Sports", "Tools & Improvement", "Toys and Games", "Video", "Blu-ray", "Video Games", "Watches", "Game Consoles", "Entertainment Collectibles", "Clothing", "Shoes", "Retro Collectibles", "Souvenirs"];
export const searchHint = `Search (e.g. ${categories[Math.floor(Math.random()*categories.length)]})`;