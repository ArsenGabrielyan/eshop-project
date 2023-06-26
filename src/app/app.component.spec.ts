import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { IProduct, checkAllVariables, compare, products } from './data/data';
import { ShopActions, ShopModel, ShopState } from './store/store';
import { FormsModule } from '@angular/forms';

describe('AppComponent',() => {
  let app:AppComponent,fixture:ComponentFixture<AppComponent>,store:Store,shop:ShopModel;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShopState]),FormsModule],
      declarations: [AppComponent]
    }).compileComponents()
  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    store = TestBed.inject(Store);
    shop = store.selectSnapshot<ShopModel>(state=>state.eshop);
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
    expect<number>(app.totalPrice).toEqual(0);
    expect<IProduct[]>(app.prodList).toEqual(products)
    expect<IProduct[]>(app.prodOnCart).toEqual([])
  })
});