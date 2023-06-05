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
  searchPrompt="";alertMsg="";
  selectedPage=localStorage.getItem("current") || "all";
  showAlert=false;enableClearBtn = false;
  optionList = options;totalPrice!:number;
  alertTimer!:NodeJS.Timeout;
  prodList!:IProduct[];prodOnCart!:IProduct[];
  @Select(ShopState.getAllProducts) product$!: Observable<IProduct[]>;

  constructor(private store: Store){}
  ngOnInit(): void {
    this.product$.pipe(map((v:any)=>this.updateState(v))).subscribe()
  }
  
  changePage(page:string):void{
    this.selectedPage=page;
    localStorage.setItem("current",page);
  }
  handleChangeOptions():void{
    this.store.dispatch(new ShopActions.ChangeOptions(this.selectedSortOpt));
  }
  handleInput():void{
    this.searchPrompt!=="" ?  this.enableClearBtn = true : this.enableClearBtn = false;
    this.searchProduct();
  }
  clearSearch():void{
    this.searchPrompt = "";
    this.store.dispatch(new ShopActions.ClearSearch(this.searchPrompt));
  }
  addToCart(i:number):void{
    clearTimeout(this.alertTimer);
    this.showAlert=true;
    this.alertMsg = `Added ${this.prodList[i].name} to the Card`;
    this.store.dispatch(new ShopActions.AddToCart(i));
    this.alertTimer = setTimeout(()=>this.resetAlert(),1500);
  };
  changeQty(i:number,e:Event,type:string=""):void{
    this.store.dispatch(new ShopActions.ChangeQty(i,e,type));
  }
  increaseQty(i:number,type:string=""):void{
    this.store.dispatch(new ShopActions.IncreaseQty(i,type));
  }
  decreaseQty(i:number,type:string=""):void{
    this.store.dispatch(new ShopActions.DecreaseQty(i,type));
  }
  removeFromCart(i:number):void{
    this.store.dispatch(new ShopActions.RemoveFromCart(i));
  }
  clearCart():void{
    this.store.dispatch(new ShopActions.ClearProduct())
  }
  private searchProduct():void{
    this.store.dispatch(new ShopActions.UpdateSearch(this.searchPrompt));
    this.store.dispatch(new ShopActions.ApplySearch());
  }
  private resetAlert():void{
    this.showAlert=false;
    this.alertMsg = "";
  }
  private updateState(v:any):void{
    this.prodList = v.all;
    this.prodOnCart = v.onCart;
    this.totalPrice = v.totalPrice;
  }
}