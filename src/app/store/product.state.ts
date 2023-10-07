import {Injectable} from "@angular/core";
import { Action,Selector,State,StateContext } from "@ngxs/store";
import { ShopActions } from "./product.actions";
import { compare,products,getItemById,IProduct} from "../data/data";

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
          totalPrice: parseFloat(localStorage.getItem("total")!) || 0
     }
})
@Injectable({providedIn: "root"})
export class ShopState{
     @Selector()
     static getAllProducts(prod:ShopState):ShopState{return prod}
     @Action(ShopActions.AddToCart)
     addToCart(ctx:StateContext<ShopModel>,action:ShopActions.AddToCart):void{
          const state = ctx.getState();
          const {name,image,category,price,qty,id} = state.all[action.index];
          const chosenProduct:IProduct = {
               name: name,
               category: category,
               price: price,
               image: image,
               qty: !qty ? 1 : qty,
               total: price*qty,
               id: id
          };
          const itemOnCart = getItemById(state.onCart,id);
          const indexOnCart = state.onCart.indexOf(itemOnCart);
          if(indexOnCart!==-1){
               itemOnCart.qty++;
               itemOnCart.total = itemOnCart.price*itemOnCart.qty;
               state.onCart[indexOnCart] = itemOnCart;
          } else state.onCart.push(chosenProduct);
          localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
          state.totalPrice=state.onCart.reduce((res,item)=> res+ item.total,0);
          localStorage.setItem("total",`${state.totalPrice}`);
          ctx.setState({...state,all:[...state.all],onCart:[...state.onCart],totalPrice:state.totalPrice})
     }
     @Action(ShopActions.ChangeQty)
     changeQty(ctx:StateContext<ShopModel>,action:ShopActions.ChangeQty):void{
          const state = ctx.getState();
          const elem = action.event.target as HTMLInputElement;
          if(action.type==="current") {
               state.all[action.index].qty = elem.valueAsNumber;
          } else {
               state.onCart[action.index].qty = elem.valueAsNumber;
               state.onCart[action.index].total = state.onCart[action.index].price*state.onCart[action.index].qty;
               localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
          }
          state.totalPrice=state.onCart.reduce((res,item)=> res+item.total,0);
          localStorage.setItem("total",`${state.totalPrice}`);
          ctx.setState({...state,all:[...state.all],onCart:[...state.onCart]});
          ctx.patchState({totalPrice:state.totalPrice});
     }
     @Action(ShopActions.IncreaseQty)
     increaseQty(ctx:StateContext<ShopModel>,action:ShopActions.IncreaseQty):void{
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty = state.all[action.index].qty>=1 ? state.all[action.index].qty+1 : 1;
          } else {
               state.onCart[action.index].qty = state.onCart[action.index].qty>=1 ? state.onCart[action.index].qty+1 : 1;
               state.onCart[action.index].total = state.onCart[action.index].price* state.onCart[action.index].qty;
               localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
               state.totalPrice=state.onCart.reduce((res,item)=> res+ item.total,0);
               localStorage.setItem("total",`${state.totalPrice}`);
          }
          ctx.setState({...state,all:[...state.all],onCart:[...state.onCart]})
          ctx.patchState({totalPrice:state.totalPrice})
     }
     @Action(ShopActions.DecreaseQty)
     decreaseQty(ctx:StateContext<ShopModel>,action:ShopActions.DecreaseQty):void{
          const state = ctx.getState();
          if(action.type==="current"){
               state.all[action.index].qty = state.all[action.index].qty>1 ? state.all[action.index].qty-1 : 1;
          } else if(state.onCart[action.index].qty>1){
               state.onCart[action.index].qty--;
               state.onCart[action.index].total = state.onCart[action.index].price* state.onCart[action.index].qty;
               localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
               state.totalPrice=state.onCart.reduce((res,item)=> res+ item.total,0);
               localStorage.setItem("total",`${state.totalPrice}`);
          } else state.onCart[action.index].qty = 1;
          ctx.setState({...state,all:[...state.all],onCart:[...state.onCart]})
          ctx.patchState({totalPrice:state.totalPrice})
     }
     @Action(ShopActions.RemoveFromCart)
     removeFromCart(ctx:StateContext<ShopModel>,action:ShopActions.RemoveFromCart):void{
          const state = ctx.getState();
          state.onCart.splice(action.index,1);
          localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
          state.totalPrice=state.onCart.reduce((res,item)=>res+item.total,0);
          localStorage.setItem("total",`${state.totalPrice}`);
          ctx.setState({...state,onCart:[...state.onCart]})
          ctx.patchState({totalPrice:state.totalPrice})
     }
     @Action(ShopActions.ChangeOptions)
     changeOptions(ctx:StateContext<ShopModel>,actions:ShopActions.ChangeOptions):void{
          const state = ctx.getState();
          switch(actions.selectedOpt){
               case "name": state.all = products.sort((a,b)=>compare(a,b,"name")); break;
               case "nameDes": state.all = products.sort((a,b)=>compare(a,b,"name","des")); break;
               case "price": state.all = products.sort((a,b)=>compare(a,b,"price")); break;
               case "priceDes": state.all = products.sort((a,b)=>compare(a,b,"price","des")); break;
               case "cat": state.all = products.sort((a,b)=>compare(a,b,"category")); break;
               case "catDes": state.all = products.sort((a,b)=>compare(a,b,"category","des")); break;
               case "defaultDes": state.all = products.sort((a,b)=>compare(a,b,"","des")); break;
               default: state.all = products.sort((a,b)=>compare(a,b));
          }
          ctx.setState({...state,all:[...state.all]})
     } 
     @Action(ShopActions.UpdateSearch)
     updateSearch(ctx:StateContext<ShopModel>,action:ShopActions.UpdateSearch):void{
          const state = ctx.getState();
          ctx.setState({...state,searchTerm:action.query})
     }
     @Action(ShopActions.ApplySearch)
     applySearch(ctx:StateContext<ShopModel>):void{
          const state = ctx.getState();
          const filteredProd = state.searchTerm.toLowerCase()==="" ? products.sort((a,b)=>compare(a,b)) : state.all.filter(val=>val.name.toLowerCase().includes(state.searchTerm.toLowerCase())||val.category.toLowerCase().includes(state.searchTerm.toLowerCase()));
          ctx.setState({...state,all:[...filteredProd],searchTerm:state.searchTerm})
     }
     @Action(ShopActions.ClearSearch)
     clearSearch(ctx:StateContext<ShopModel>,action:ShopActions.ClearSearch):void{
          const state = ctx.getState();
          ctx.setState({...state,all:products.sort((a,b)=>compare(a,b))}),ctx.patchState({searchTerm:action.query})
     }
     @Action(ShopActions.ClearProduct)
     clearAll(ctx:StateContext<ShopModel>):void{
          const state = ctx.getState();
          state.onCart.splice(0,state.onCart.length);
          localStorage.setItem("item-on-cart",JSON.stringify(state.onCart));
          state.totalPrice=state.onCart.reduce((res,item)=>res+item.total,0);
          localStorage.setItem("total",`${state.totalPrice}`);
          ctx.setState({...state,all:products.sort((a,b)=>compare(a,b))}),ctx.patchState({totalPrice:state.totalPrice})
     }
}