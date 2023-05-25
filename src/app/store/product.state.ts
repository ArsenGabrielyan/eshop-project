import {Injectable} from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {IProduct} from "../data/interfaces/product";
import { ShopActions } from "./product.actions";
import { compare, products } from "../data/allData";

export interface ShopModel{
     searchTerm: string,
     all: IProduct[],
     onCart: IProduct[],
     totalPrice: number
}

@State<ShopModel>({
     name: "eshop",
     defaults:{
          searchTerm: "",
          all: products.sort((a,b)=>compare(a,b)),
          onCart: JSON.parse(localStorage.getItem("item-on-cart")!) as IProduct[] || [],
          totalPrice:parseFloat(localStorage.getItem("total")!) || 0
     }
})
@Injectable()
export class ShopState{
     @Selector()
     static getAllProducts(prod: ShopState): ShopState{
          return prod
     }
     @Action(ShopActions.AddToCart)
     addToCart(ctx: StateContext<ShopModel>,action: ShopActions.AddToCart):void{
          const state = ctx.getState();
          const {name, image, category, price, qty} = state.all[action.index];
          const chosenProduct: IProduct = {
               name: name,
               category: category,
               price: price,
               image: image,
               qty: !qty ? 1 : qty
          };
          state.onCart.push(chosenProduct);
          localStorage.setItem("item-on-cart", JSON.stringify(state.onCart))
          state.totalPrice+=!qty ? price : price*qty;
          localStorage.setItem("total", String(state.totalPrice))
          ctx.setState({...state, all: [...state.all], onCart: [...state.onCart]})
          ctx.patchState({totalPrice: state.totalPrice})
     }
     @Action(ShopActions.ChangeQty)
     changeQty(ctx: StateContext<ShopModel>,action: ShopActions.ChangeQty):void{
          const state = ctx.getState();
          const elem = action.event.target as HTMLInputElement;
          const {price} = state.onCart[action.index];
          if(action.type==="current") {
               state.all[action.index].qty = elem.valueAsNumber;
          } else {
               state.totalPrice = price*elem.valueAsNumber;
               localStorage.setItem("total", String(state.totalPrice))
               state.onCart[action.index].qty = elem.valueAsNumber;
               localStorage.setItem("item-on-cart", JSON.stringify(state.onCart))
          }
          ctx.setState({...state, all: [...state.all], onCart: [...state.onCart]});
          ctx.patchState({totalPrice: state.totalPrice})
     }
     @Action(ShopActions.IncreaseQty)
     increaseQty(ctx: StateContext<ShopModel>,action: ShopActions.IncreaseQty):void{
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty>=1 ? state.all[action.index].qty++ : 1;
          } else {
               state.onCart[action.index].qty>=1 ? state.onCart[action.index].qty++ : 1;
               localStorage.setItem("item-on-cart", JSON.stringify(state.onCart))
               state.totalPrice=state.onCart[action.index].price*state.onCart[action.index].qty;
               localStorage.setItem("total", String(state.totalPrice))
          }
          ctx.setState({...state, all: [...state.all], onCart: [...state.onCart]})
          ctx.patchState({totalPrice: state.totalPrice})
     }
     @Action(ShopActions.DecreaseQty)
     decreaseQty(ctx: StateContext<ShopModel>,action: ShopActions.DecreaseQty):void{
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty>1 ? state.all[action.index].qty-- : 1;
          } else {
               state.onCart[action.index].qty>1 ? state.onCart[action.index].qty-- : 1;
               localStorage.setItem("item-on-cart", JSON.stringify(state.onCart))
               state.totalPrice=state.onCart[action.index].price*state.onCart[action.index].qty;
               localStorage.setItem("total", String(state.totalPrice))
          }
          ctx.setState({...state, all: [...state.all], onCart: [...state.onCart]})
          ctx.patchState({totalPrice: state.totalPrice})
     }
     @Action(ShopActions.RemoveFromCart)
     removeFromCart(ctx: StateContext<ShopModel>,action: ShopActions.RemoveFromCart):void{
          const state = ctx.getState();
          const {price,qty} = state.onCart[action.index];
          state.totalPrice-=price*qty;
          localStorage.setItem("total", String(state.totalPrice))
          state.onCart.splice(action.index,1);
          localStorage.setItem("item-on-cart", JSON.stringify(state.onCart))
          ctx.setState({...state, onCart: [...state.onCart],})
          ctx.patchState({totalPrice: state.totalPrice})
     }
     @Action(ShopActions.ChangeOptions)
     changeOptions(ctx: StateContext<ShopModel>, actions: ShopActions.ChangeOptions):void{
          const state = ctx.getState();
          switch(actions.selectedOpt){
               case "name": state.all = products.sort((a,b)=>compare(a,b,"name")); break;
               case "nameDes": state.all = products.sort((a,b)=>compare(a,b,"name","des")); break;
               case "price": state.all = products.sort((a,b)=>compare(a,b,"price")); break;
               case "priceDes": state.all = products.sort((a,b)=>compare(a,b,"price","des")); break;
               case "cat": state.all = products.sort((a,b)=>compare(a,b,"category")); break;
               case "catDes": state.all = products.sort((a,b)=>compare(a,b,"category","des")); break;
               default: state.all = products.sort((a,b)=>compare(a,b));
          }
          ctx.setState({...state, all: [...state.all]})
     } 
     @Action(ShopActions.UpdateSearch)
     updateSearch(ctx: StateContext<ShopModel>, action: ShopActions.UpdateSearch):void{
          const state = ctx.getState();
          ctx.setState({...state,searchTerm: action.query})
     }
     @Action(ShopActions.ApplySearch)
     applySearch(ctx: StateContext<ShopModel>):void{
          const state = ctx.getState();
          const filteredProd = state.searchTerm.toLowerCase()==="" ? products.sort((a,b)=>compare(a,b)):state.all.filter(val=>val.name.toLowerCase().includes(state.searchTerm.toLowerCase())||val.category.toLowerCase().includes(state.searchTerm.toLowerCase()));
          ctx.setState({...state,all: [...filteredProd], searchTerm: state.searchTerm})
     }
     @Action(ShopActions.ClearSearch)
     clearSearch(ctx: StateContext<ShopModel>, action: ShopActions.ClearSearch):void{
          const state = ctx.getState();
          ctx.setState({...state,all: products.sort((a,b)=>compare(a,b))}),
          ctx.patchState({searchTerm: action.query})
     }
}