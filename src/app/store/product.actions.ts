export namespace ShopActions{
     export class AddToCart{
          static readonly type = "[e-Shop: Add to Cart]";
          constructor(public index:number){}
     }
     export class ChangeQty{
          static readonly type = "[e-Shop: Change Qty]";
          constructor(public index:number,public event:Event,public type:string){}
     }
     export class IncreaseQty{
          static readonly type = "[e-Shop: Increase Qty]";
          constructor(public index:number,public type:string){}
     }
     export class DecreaseQty{
          static readonly type = "[e-Shop: Decrease Qty]";
          constructor(public index:number,public type:string){}
     }
     export class RemoveFromCart{
          static readonly type = "[e-Shop: Remove from Cart]";
          constructor(public index:number){}
     }
     export class ChangeOptions{
          static readonly type = "[e-Shop: Change Sort Option]";
          constructor(public selectedOpt:string){}
     }
     export class UpdateSearch{
          static readonly type = "[e-Shop: Update Search]";
          constructor(public query:string){}
     }
     export class ApplySearch{
          static readonly type = "[e-Shop: Apply Search]";
     }
     export class ClearSearch{
          static readonly type = "[e-Shop: Clear Search]";
          constructor(public query:string){}
     }
     export class ClearProduct{
          static readonly type = "[e-Shop: Clear Product]";
     }
}