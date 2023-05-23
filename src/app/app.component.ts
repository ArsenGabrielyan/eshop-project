import { Component } from '@angular/core';
import {options, products, searchHint} from "./data/allData";
import { IProduct } from './data/interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  prodList = products.sort((a,b)=>this.compare(a,b));
  optionList = options;
  searchPlaceholder = searchHint;
  selectedSortOpt = "Sort By";
  searchPrompt="";
  enableClearBtn = false;
  selectedPage=localStorage.getItem("currPage") || "all";
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
  }
  clearSearch(){
    this.searchPrompt = "";
  }
}