import {Injectable} from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import {IProduct} from "../data/interfaces/product";
import { ShopActions } from "./product.actions";
import { compare, products } from "../data/allData";

export interface ShopModel{
     all: IProduct[],
     onCart: IProduct[],
     totalPrice: number
}

@State<ShopModel>({
     name: "eshop",
     defaults:{
          all: products.sort((a,b)=>compare(a,b)),
          onCart: [],
          totalPrice:0
     }
})
@Injectable()
export class ShopState{
     @Selector()
     static getAllProducts(prod: ShopState): ShopState{
          return prod
     }
     @Action(ShopActions.AddToCart)
     addToCart(ctx: StateContext<ShopModel>,action: ShopActions.AddToCart){
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
          state.totalPrice+=!qty ? price : price*qty;
          ctx.setState({...state})
     }
     @Action(ShopActions.ChangeQty)
     changeQty(ctx: StateContext<ShopModel>,action: ShopActions.ChangeQty){
          const state = ctx.getState();
          const elem = action.event.target as HTMLInputElement;
          const {price} = state.onCart[action.index];
          if(action.type==="current") {
               state.all[action.index].qty = elem.valueAsNumber;
          } else {
               state.totalPrice=price*elem.valueAsNumber;
               state.onCart[action.index].qty = elem.valueAsNumber;
          }
          ctx.setState({...state})
     }
     @Action(ShopActions.IncreaseQty)
     increaseQty(ctx: StateContext<ShopModel>,action: ShopActions.IncreaseQty){
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty>=1 ? state.all[action.index].qty++ : 1;
          } else {
               state.onCart[action.index].qty>=1 ? state.onCart[action.index].qty++ : 1;
               state.totalPrice=state.onCart[action.index].price*state.onCart[action.index].qty;
          }
          ctx.setState({...state})
     }
     @Action(ShopActions.DecreaseQty)
     decreaseQty(ctx: StateContext<ShopModel>,action: ShopActions.DecreaseQty){
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty>1 ? state.all[action.index].qty-- : 1;
          } else {
               state.onCart[action.index].qty>1 ? state.onCart[action.index].qty-- : 1;
               state.totalPrice=state.onCart[action.index].price*state.onCart[action.index].qty;
          }
          ctx.setState({...state})
     }
     @Action(ShopActions.RemoveFromCart)
     removeFromCart(ctx: StateContext<ShopModel>,action: ShopActions.RemoveFromCart){
          const state = ctx.getState();
          const {price,qty} = state.onCart[action.index];
          state.totalPrice-=price*qty;
          state.onCart.splice(action.index,1);
          ctx.setState({...state})
     }
     @Action(ShopActions.ChangeOptions)
     changeOptions(ctx: StateContext<ShopModel>, actions: ShopActions.ChangeOptions){
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
          ctx.setState({...state})
     }
     @Action(ShopActions.SearchProduct)
     searchProduct(ctx: StateContext<ShopModel>, actions: ShopActions.SearchProduct){
          const state = ctx.getState();
          const filterFn = (val:IProduct)=>val.name.toLowerCase().includes(actions.query.toLowerCase())||val.category.toLowerCase().includes(actions.query.toLowerCase());
          const search = actions.query.toLowerCase()==="" ? products.sort((a,b)=>compare(a,b)) : state.all.filter(filterFn)
          ctx.patchState({all: search})
     }
     @Action(ShopActions.ClearSearch)
     clearSearch(ctx: StateContext<ShopModel>, actions: ShopActions.ClearSearch){
          actions.query = "";
          ctx.patchState({all: products.sort((a,b)=>compare(a,b))})
     }
}