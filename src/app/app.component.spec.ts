import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { IProduct, searchHint,options, compare, products } from './data/data';
import { ShopActions, ShopModel, ShopState } from './store/store';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

export function checkAllVariables(app: AppComponent){
  const {searchPlaceholder,year} = app;
  expect(searchPlaceholder).toEqual(searchHint);
  expect(year).toBe(new Date().getFullYear());
}
describe('AppComponent',() => {
  let app:AppComponent;
  let fixture:ComponentFixture<AppComponent>;
  let store:Store;
  let shop:ShopModel;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [NgxsModule.forRoot([ShopState]),FormsModule],
    declarations: [AppComponent]
  }).compileComponents());
  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(Store);
    shop = store.selectSnapshot(state=>state.eshop);
    fixture.detectChanges();
  })
  it('should create the app',()=>{
    expect(app).toBeTruthy();
    checkAllVariables(app);
  })
  it("should call the changePage function",()=>{
    expect(app.selectedPage).toBe(localStorage.getItem("current") || "all");
  });
  it("should call the handleInput function",()=>{
    expect(app.enableClearBtn).toBeFalse();
    expect(app.searchPrompt).toBe("");
  });
  it("should call the resetAlert function",()=>{
    expect(app.showAlert).toBeFalse();
    expect(app.alertMsg).toBe("");
  });
  it("should call the handleChangeOptions function",()=>{
    store.dispatch(new ShopActions.ChangeOptions(app.selectedSortOpt));
    expect(app.selectedSortOpt).toBe("Sort By");
    expect(app.optionList).toEqual(options);
    expect(shop.all).toEqual(products.sort((a,b)=>compare(a,b)));
  });
  it("should call the clearSearch function",()=>{
    store.dispatch(new ShopActions.ClearSearch(app.searchPrompt));
    expect(app.searchPrompt).toBe("");
    expect(shop.searchTerm).toBe("");
  })
  it("should call the clearCart function",()=>{
    store.dispatch(new ShopActions.ClearProduct());
    expect(shop.all).toBe(products.sort((a,b)=>compare(a,b)));
    expect(shop.totalPrice).toBe(0);
    expect(shop.onCart).toEqual([]);
  })
  it("should call the searchProduct function",()=>{
    store.dispatch(new ShopActions.UpdateSearch(app.searchPrompt));
    store.dispatch(new ShopActions.ApplySearch());
    expect(shop.all).toEqual(products.filter(val=>val.name.toLowerCase().includes(shop.searchTerm.toLowerCase())||val.category.toLowerCase().includes(shop.searchTerm.toLowerCase())))
    expect(shop.searchTerm).toBe(app.searchPrompt);
  });
  it("should call the updateState function",()=>{
    expect<number>(app.totalPrice).toEqual(shop.totalPrice);
    expect<IProduct[]>(app.prodList).toEqual(shop.all)
    expect<IProduct[]>(app.prodOnCart).toEqual(shop.onCart);
  });
  it("should call the addToCart function",()=>{
    expect(app.selectedIndex).toBe(0);
    store.dispatch(new ShopActions.AddToCart(app.selectedIndex));
    expect(shop.onCart[app.selectedIndex]).toEqual({...products[0], total: shop.all[0].price*shop.all[0].qty});
    expect(shop.totalPrice).toBe(shop.all[0].price*shop.all[0].qty);
  });
  it("should call the increaseQty function",()=>{
    expect(app.selectedIndex).toBe(0);
    store.dispatch(new ShopActions.IncreaseQty(app.selectedIndex,"current"));
    expect(shop.all[app.selectedIndex].qty).toBeDefined();
  })
  it("should call the decreaseQty function",()=>{
    expect(app.selectedIndex).toBe(0);
    store.dispatch(new ShopActions.DecreaseQty(app.selectedIndex,"current"));
    expect(shop.all[app.selectedIndex].qty).toBeDefined(); 
  })
  it("should call the removeFromCart function",()=>{
    expect(app.selectedIndex).toBe(0);
    store.dispatch(new ShopActions.RemoveFromCart(app.selectedIndex));
    expect(shop.onCart[app.selectedIndex]).toBeUndefined();
  })
  it("should call the changeQty function",()=>{
    const input = fixture.debugElement.query(By.css(".product-card .product-info input[type=number]"));
    const elem = input.nativeElement as HTMLInputElement;
    input.triggerEventHandler("change");
    expect(elem.value).toBe("");
  })
});