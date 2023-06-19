import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { ShopState } from './store/product.state';
import { compare, options, searchHint,products } from './data/allData';
import { IProduct } from './data/data';
import { ShopActions } from './store/product.actions';

function checkAllVariables(app: AppComponent){
    const {searchPlaceholder,selectedSortOpt,optionList,year,totalPrice,alertTimer,prodList,prodOnCart} = app
    expect(searchPlaceholder).toEqual(searchHint)
    expect(selectedSortOpt).toBe("Sort By")
    expect(optionList).toEqual(options);
    expect(year).toBe(new Date().getFullYear())
    expect<number>(totalPrice).toEqual(0);
    expect(alertTimer).toBeUndefined();
    expect<IProduct[]>(prodList).toEqual([])
    expect<IProduct[]>(prodOnCart).toEqual([])
}

describe('AppComponent',() => {
  let store:Store,app:AppComponent,fixture:ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShopState])],
      declarations: [AppComponent]
    })
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(Store);
  });
  it('should create the app',()=>{
    expect(app).toBeTruthy();
    checkAllVariables(app);
  });
  it("should call the handleInput function",()=>{
    expect(app.enableClearBtn).toBeFalse();
    expect(app.searchPrompt).toBe("");
  })
  it("should call the changePage function",()=>{
    expect(app.selectedPage).toBe(localStorage.getItem("current") || "all");
  })
  it("should call the resetAlert function",()=>{
    expect(app.showAlert).toBeFalse();
    expect(app.alertMsg).toBe("");
  });
  it("should call clearCart function",()=>{
    store.dispatch(new ShopActions.ClearProduct());
    const shop = store.selectSnapshot(ShopState);
    expect(shop).toEqual({
      searchTerm: "",
      all: products.sort((a:IProduct,b:IProduct)=>compare(a,b)),
      onCart: JSON.parse(localStorage.getItem("item-on-cart")!) as IProduct[] || [],
      totalPrice: parseFloat(localStorage.getItem("total")!) || 0
    })
  })
});