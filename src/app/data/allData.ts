import { IOption } from "./interfaces/option";
import { IProduct } from "./interfaces/product";

export const products: IProduct[] = [
     {name: "Airpods",category:"tech", price: 199.99, image: "assets/images/airpods.webp",qty:1},
     {name: "Home Assistant",category:"tech", price: 39.99, image: "assets/images/assistant.webp",qty:1},
     {name: "Backpack",category:"bags", price: 20, image: "assets/images/backpack.webp",qty:1},
     {name: "Bike",category:"sports", price: 50, image: "assets/images/bike.webp",qty:1},
     {name: "Retro Camera",category:"tech", price: 30, image: "assets/images/camera1.webp",qty:1},
     {name: "Modern Camera",category:"tech", price: 149.99, image: "assets/images/camera2.webp",qty:1},
     {name: "Off Road Car",category:"automobile", price: 500, image: "assets/images/car.webp",qty:1},
     {name: "Computer",category:"tech", price: 499.99, image: "assets/images/computer.webp",qty:1},
     {name: "Sunglasses",category:"accessories", price: 5, image: "assets/images/glasses.webp",qty:1},
     {name: "Gaming Headset",category:"tech", price: 29.99, image: "assets/images/headset.webp",qty:1},
     {name: "Orange Juice",category:"drinks", price: 2.99, image: "assets/images/juice.webp",qty:1},
     {name: "Perfume",category:"beauty", price: 64, image: "assets/images/perfume.webp",qty:1},
     {name: "Phone",category:"tech", price: 499.99, image: "assets/images/phone.webp",qty:1},
     {name: "Sneakers",category:"sports", price: 80, image: "assets/images/shoe1.webp",qty:1},
     {name: "Shoes",category:"clothings", price: 40, image: "assets/images/shoe2.webp",qty:1},
     {name: "Shower Gel and Shampoo",category:"toiletry", price: 10, image: "assets/images/shower-gel.webp",qty:1},
     {name: "Ceramic Vase",category:"collectibles", price: 99.99, image: "assets/images/vase.webp",qty:1},
     {name: "Modern Watch",category:"tech", price: 399.99, image: "assets/images/watch1.webp",qty:1},
     {name: "Classic Watch",category:"tech", price: 299.99, image: "assets/images/watch2.webp",qty:1},
     {name: "Classic Watch",category:"tech", price: 299.99, image: "assets/images/watch3.webp",qty:1},
     {name: "BBQ Sandwich 'Ghars'", category:"food", price: 2, image: "assets/images/ghars.webp",qty:1},
     {name: "Supercar",category:"automobile",price:999.99,image:"assets/images/supercar.webp",qty:1},
     {name: "Salad Caesar",category:"food",price:5,image:"assets/images/salad.webp",qty:1},
     {name: "Water Bottle",category:"drinks",price:1.50,image:"assets/images/water.webp",qty:1}
];
export const options: IOption[] = [
     {value:"name",name:"Name (from A to Z)"},
     {value:"nameDes",name:"Name (From Z to A)"},{value:"cat",name:"Category (from A to Z)"},
     {value:"catDes",name:"Category (From Z to A)"},
     {value:"price",name:"Price (From Cheapest)"},
     {value:"priceDes",name:"Price (From The Most Expensive)"},
     {value:"default",name:"Default"},
]
const categories: string[] = ["Cars", "Baby Products", "Beauty", "Books", "Camera", "Phone", "Phone Accessories", "Electronics", "Grocery & Foods", "Health and Personal Care", "Home and Garden", "Industrial and Scientific", "Music", "DVD", "CD", "Musical instruments", "Office Products", "Outdoors", "Computers", "Pet Supplies", "Software", "Sports", "Tools & Improvement", "Toys and Games", "Video", "Blu-ray", "Video Games", "Watches", "Game Consoles", "Entertainment Collectibles", "Clothing", "Shoes", "Retro Collectibles", "Souvenirs", "Tech and Gadgets"];
export const searchHint = `Search (e.g. ${categories[Math.floor(Math.random()*categories.length)]})`;
export function compare(a:IProduct,b:IProduct,type:string="",mode:string=""){
  switch(mode){
    case "des":
    switch(type){
      case "name": return (a.name>b.name) ? -1 : (a.name<b.name) ? 1 : 0
      case "price": return (a.price>b.price) ? -1 : (a.price<b.price) ? 1 : 0
      case "category": return (a.category>b.category) ? -1 : (a.category<b.category) ? 1 : 0
      default: return (a.image>b.image) ? -1 : (a.image<b.image) ? 1 : 0
    }
    default:
    switch(type){
      case "name": return (a.name>b.name) ? 1 : (a.name<b.name) ? -1 : 0
      case "price": return (a.price>b.price) ? 1 : (a.price<b.price) ? -1 : 0
      case "category": return (a.category>b.category) ? 1 : (a.category<b.category) ? -1 : 0
      default: return (a.image>b.image) ? 1 : (a.image<b.image) ? -1 : 0
    }
  }
}