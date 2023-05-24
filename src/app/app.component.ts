import { Component, OnInit } from '@angular/core';
import {options, searchHint} from "./data/allData";
import { IProduct } from './data/interfaces/product';
import { Store, Select } from '@ngxs/store';
import { ShopActions } from './store/product.actions';
import { ShopState } from './store/product.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchPlaceholder = searchHint;
  selectedSortOpt = "Sort By";
  searchPrompt="";
  selectedPage=localStorage.getItem("currPage") || "all";
  alertMsg=""
  showAlert=false;
  enableClearBtn = false;
  totalPrice!:number;
  alertTimer!:NodeJS.Timeout;
  prodList!:IProduct[];
  prodOnCart!:IProduct[];
  optionList = options;
  @Select(ShopState.getAllProducts) product$!: Observable<IProduct[]>;
  constructor(private store: Store){}
  ngOnInit(): void {
    this.product$.pipe(map((v:any)=>{
      this.prodList = v.all;
      this.prodOnCart = v.onCart;
      this.totalPrice = v.totalPrice;
    })).subscribe()
  }
  changePage(page:string){
    this.selectedPage=page;
    localStorage.setItem("currPage",page)
  }
  handleChangeOptions(){
    this.store.dispatch(new ShopActions.ChangeOptions(this.selectedSortOpt))
  }
  handleInput(){
    this.searchPrompt!=="" ?  this.enableClearBtn = true : this.enableClearBtn = false;
    this.store.dispatch(new ShopActions.SearchProduct(this.searchPrompt))
  }
  clearSearch(){
    this.store.dispatch(new ShopActions.ClearSearch(this.searchPrompt))
  }
  addToCart(i:number){
    clearTimeout(this.alertTimer);
    this.showAlert=true;
    this.alertMsg = `Added ${this.prodList[i].name} to the Card`;
    this.store.dispatch(new ShopActions.AddToCart(i));
    this.alertTimer = setTimeout(()=>{
      this.showAlert=false;
      this.alertMsg = "";
    },1500);
  };
  changeQty(i:number,e:Event,type:string=""){
    this.store.dispatch(new ShopActions.ChangeQty(i,e,type))
  }
  increaseQty(i:number,type:string=""){
    this.store.dispatch(new ShopActions.IncreaseQty(i,type))
  }
  decreaseQty(i:number,type:string=""){
    this.store.dispatch(new ShopActions.DecreaseQty(i,type))
  }
  removeFromCart(i:number){
    this.store.dispatch(new ShopActions.RemoveFromCart(i))
  }
}