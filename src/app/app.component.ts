import { Component } from '@angular/core';
import {options, products, searchHint} from "./data/allData";
import { IProduct } from './data/interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchPlaceholder = searchHint;
  selectedSortOpt = "Sort By";
  searchPrompt="";
  selectedPage=localStorage.getItem("currPage") || "all";
  alertMsg=""
  showAlert=false;
  enableClearBtn = false;
  totalPrice = 0;
  alertTimer!:NodeJS.Timeout;
  prodList = products.sort((a,b)=>this.compare(a,b));
  prodOnCart:IProduct[] = [];
  optionList = options;
  private compare(a:IProduct,b:IProduct,type:string="",mode:string=""){
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
  changePage(page:string){
    this.selectedPage=page;
    localStorage.setItem("currPage",page)
  }
  handleChangeOptions(){
    switch(this.selectedSortOpt){
      case "name": this.prodList = products.sort((a,b)=>this.compare(a,b,"name")); break;
      case "nameDes": this.prodList = products.sort((a,b)=>this.compare(a,b,"name","des")); break;
      case "price": this.prodList = products.sort((a,b)=>this.compare(a,b,"price")); break;
      case "priceDes": this.prodList = products.sort((a,b)=>this.compare(a,b,"price","des")); break;
      case "cat": this.prodList = products.sort((a,b)=>this.compare(a,b,"category")); break;
      case "catDes": this.prodList = products.sort((a,b)=>this.compare(a,b,"category","des")); break;
      default: this.prodList = products.sort((a,b)=>this.compare(a,b));
    }
  }
  handleInput(){
    if(this.searchPrompt!=="") this.enableClearBtn = true;
    else this.enableClearBtn = false;
    this.prodList=this.prodList.filter(val=>val.name.toLowerCase().includes(this.searchPrompt.toLowerCase())||val.category.toLowerCase().includes(this.searchPrompt.toLowerCase()))
  }
  clearSearch(){
    this.searchPrompt = "";
  }
  addToCart(i:number){
    clearTimeout(this.alertTimer);
    const {name, image, category, price, qty} = this.prodList[i]
    this.showAlert=true;
    this.alertMsg = `Added ${name} to the Card`;
    const chosenProduct: IProduct = {
      name: name,
      category: category,
      price: price,
      image: image,
      qty: !qty ? 1 : qty
    };
    this.prodOnCart.push(chosenProduct);
    this.totalPrice+=!qty ? price : price*qty;
    this.alertTimer = setTimeout(()=>{
      this.showAlert=false;
      this.alertMsg = "";
    },1000);
    console.log(this.prodList[i])
  };
  changeQty(i:number,e:Event,type:string=""){
    const elem = e.target as HTMLInputElement;
    const {price} = this.prodOnCart[i];
    if(type==="current") {
      this.prodList[i].qty = elem.valueAsNumber;
    } else {
      this.totalPrice=price*elem.valueAsNumber;
      this.prodOnCart[i].qty = elem.valueAsNumber;
    }
  }
  increaseQty(i:number,type:string=""){
    if(type==="current"){
      this.prodList[i].qty>=1 ? this.prodList[i].qty++ : 1;
    } else {
      this.prodOnCart[i].qty>=1 ? this.prodOnCart[i].qty++ : 1;
      this.totalPrice=this.prodOnCart[i].price*this.prodOnCart[i].qty;
    }
  }
  decreaseQty(i:number,type:string=""){
    if(type==="current"){
      this.prodList[i].qty>1 ? this.prodList[i].qty-- : 1;
    } else {
      this.prodOnCart[i].qty>1 ? this.prodOnCart[i].qty-- : 1;
      this.totalPrice=this.prodOnCart[i].price*this.prodOnCart[i].qty;
    }
  }
  removeFromCart(i:number){
    const {price,qty} = this.prodOnCart[i]
    this.totalPrice-=price*qty;
    this.prodOnCart.splice(i,1);
  }
}