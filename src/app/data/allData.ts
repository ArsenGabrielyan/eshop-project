import { IOption,IProduct } from "./data";

const prodOptions = {qty:1,total:0} 
const categories:string[] = ["Cars","Baby Products","Beauty","Books","Camera","Phone","Phone Accessories","Electronics","Grocery & Foods","Health and Personal Care","Home and Garden","Industrial and Scientific","Music","DVD","CD","Musical instruments","Office Products","Outdoors","Computers","Pet Supplies","Software","Sports","Tools & Improvement","Toys and Games","Video","Blu-ray","Video Games","Watches","Game Consoles","Entertainment Collectibles","Clothing","Shoes","Retro Collectibles","Souvenirs","Tech and Gadgets"];

export const products:IProduct[] = [
     {name:"Airpods",category:"tech",price:199.99,image:"assets/images/airpods.webp",...prodOptions,id:1},
     {name:"Home Assistant",category:"tech",price:39.99,image:"assets/images/assistant.webp",...prodOptions,id:2},
     {name:"Backpack",category:"bags",price:20,image:"assets/images/backpack.webp",...prodOptions,id:3},
     {name:"Bike",category:"sports",price:40,image:"assets/images/bike.webp",...prodOptions,id:4},
     {name:"Retro Camera",category:"tech",price:30,image:"assets/images/camera1.webp",...prodOptions,id:5},
     {name:"Modern Camera",category:"tech",price:149.99,image:"assets/images/camera2.webp",...prodOptions,id:6},
     {name:"Off Road Car",category:"automobile",price:500,image:"assets/images/car.webp",...prodOptions,id:7},
     {name:"Computer",category:"tech",price:499.99,image:"assets/images/computer.webp",...prodOptions,id:8},
     {name:"Sunglasses",category:"accessories",price:5,image:"assets/images/glasses.webp",...prodOptions,id:9},
     {name:"Gaming Headset",category:"tech",price:29.99,image:"assets/images/headset.webp",...prodOptions,id:10},
     {name:"Orange Juice",category:"drinks",price:2.99,image:"assets/images/juice.webp",...prodOptions,id:11},
     {name:"Perfume",category:"beauty",price:64,image:"assets/images/perfume.webp",...prodOptions,id:12},
     {name:"Phone",category:"tech",price:499.99,image:"assets/images/phone.webp",...prodOptions,id:13},
     {name:"Sneakers",category:"sports",price:80,image:"assets/images/shoe1.webp",...prodOptions,id:14},
     {name:"Shoes",category:"clothings",price:40,image:"assets/images/shoe2.webp",...prodOptions,id:15},
     {name:"Shower Gel and Shampoo",category:"toiletry",price:10,image:"assets/images/shower-gel.webp",...prodOptions,id:16},
     {name:"Ceramic Vase",category:"collectibles",price:99.99,image:"assets/images/vase.webp",...prodOptions,id:17},
     {name:"Modern Watch",category:"tech",price:399.99,image:"assets/images/watch1.webp",...prodOptions,id:18},
     {name:"Classic Watch",category:"classic",price:299.99,image:"assets/images/watch2.webp",...prodOptions,id:19},
     {name:"Salad Caesar",category:"food",price:5,image:"assets/images/salad.webp",...prodOptions,id:20},
     {name:"Water Bottle",category:"drinks",price:0.75,image:"assets/images/water.webp",...prodOptions,id:21},
];
export const options:IOption[] = [
    {value:"default",name:"Default"},
    {value:"defaultDes",name:"Default (Descending)"},
    {value:"name",name:"Name (from A to Z)"},
    {value:"nameDes",name:"Name (From Z to A)"},
    {value:"cat",name:"Category (from A to Z)"},
    {value:"catDes",name:"Category (From Z to A)"},
    {value:"price",name:"Price (From Cheapest)"},
    {value:"priceDes",name:"Price (From The Most Expensive)"},
]
export const searchHint = `Search (e.g. ${categories[Math.floor(Math.random()*categories.length)]})`;

export function compare(a:IProduct,b:IProduct,type:string="",mode:string=""):1|-1|0{
  switch(mode){
    case "des": switch(type){
      case "name": return (a.name>b.name) ? -1 : (a.name<b.name) ? 1 : 0
      case "price": return (a.price>b.price) ? -1 : (a.price<b.price) ? 1 : 0
      case "category": return (a.category>b.category) ? -1 : (a.category<b.category) ? 1 : 0
      default: return (a.id>b.id) ? -1 : (a.id<b.id) ? 1 : 0
    }
    default: switch(type){
      case "name": return (a.name>b.name) ? 1 : (a.name<b.name) ? -1 : 0
      case "price": return (a.price>b.price) ? 1 : (a.price<b.price) ? -1 : 0
      case "category": return (a.category>b.category) ? 1 : (a.category<b.category) ? -1 : 0
      default: return (a.id>b.id) ? 1 : (a.id<b.id) ? -1 : 0
    }
  }
}
export const getItemById = (arr:IProduct[],id:number):IProduct => arr.find(val=>val.id===id)!