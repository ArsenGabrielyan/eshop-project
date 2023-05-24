import { IProduct } from "../data/interfaces/product";

export namespace ShopActions{
     export class AddToCart{
          static readonly type = "[e-Shop: Add to Cart]";
          constructor(public index:number){}
     }
     export class ChangeQty{
          static readonly type = "[e-Shop: Change Amount]";
          constructor(public index:number, public event:Event,public type:string){}
     }
     export class IncreaseQty{
          static readonly type = "[e-Shop: Increase Amount]";
          constructor(public index:number, public type:string){}
     }
     export class DecreaseQty{
          static readonly type = "[e-Shop: Decrease Amount]";
          constructor(public index:number, public type:string){}
     }
     export class RemoveFromCart{
          static readonly type = "[e-Shop: Remove from Cart]";
          constructor(public index:number){}
     }
     export class ChangeOptions{
          static readonly type = "[e-Shop: Change Sort Option]";
          constructor(public selectedOpt: string){}
     }
     export class SearchProduct{
          static readonly type = "[e-Shop: Search Product]";
          constructor(public query:string){}
     }
     export class ClearSearch{
          static readonly type = "[e-Shop: Clear Search]";
          constructor(public query:string){}
     }
}