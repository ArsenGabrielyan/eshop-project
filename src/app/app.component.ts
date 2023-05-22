import { Component } from '@angular/core';
import {products, searchHint} from "./data/allData";
import { IProduct } from './data/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  prodList = products.sort((a,b)=>this.compare(a,b));
  searchPlaceholder = searchHint;
  selectedSortOpt = "Sort By";
  searchPrompt="";
  enableClearBtn = false;
  private compare(a:IProduct,b:IProduct,type:string="",mode:string=""){
    switch(mode){
      case "des":
      switch(type){
        case "name": return (a.name>b.name) ? -1 : (a.name<b.name) ? 1 : 0
        case "price": return (a.price>b.price) ? -1 : (a.price<b.price) ? 1 : 0
        default: return (a.image>b.image) ? -1 : (a.image<b.image) ? 1 : 0
      }
      default:
      switch(type){
        case "name": return (a.name>b.name) ? 1 : (a.name<b.name) ? -1 : 0
        case "price": return (a.price>b.price) ? 1 : (a.price<b.price) ? -1 : 0
        default: return (a.image>b.image) ? 1 : (a.image<b.image) ? -1 : 0
      }
    }
  }
  handleChangeOptions(){
    switch(this.selectedSortOpt){
      case "name": this.prodList = products.sort((a,b)=>this.compare(a,b,"name")); break;
      case "nameDes": this.prodList = products.sort((a,b)=>this.compare(a,b,"name","des")); break;
      case "price": this.prodList = products.sort((a,b)=>this.compare(a,b,"price")); break;
      case "priceDes": this.prodList = products.sort((a,b)=>this.compare(a,b,"price","des")); break;
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