import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule,Store } from '@ngxs/store';
import { ShopState } from './store/product.state';
import { options, searchHint } from './data/allData';
import { IProduct } from './data/data';

function checkAllVariables(app: AppComponent){
    const {searchPlaceholder,selectedSortOpt,searchPrompt,alertMsg,selectedPage,showAlert,enableClearBtn,optionList,year,totalPrice,alertTimer,prodList,prodOnCart} = app
    expect(searchPlaceholder).toEqual(searchHint)
    expect(selectedSortOpt).toBe("Sort By")
    expect(searchPrompt).toBe("");
    expect(alertMsg).toBe("");
    expect(selectedPage).toBe(localStorage.getItem("current") || "all")
    expect(showAlert).toBeFalse()
    expect(enableClearBtn).toBeFalse();
    expect(optionList).toEqual(options);
    expect(year).toBe(new Date().getFullYear())
    expect<number>(totalPrice).toEqual(0);
    expect(alertTimer).toBeUndefined();
    expect<IProduct[]>(prodList).toEqual([])
    expect<IProduct[]>(prodOnCart).toEqual([])
}

describe('AppComponent',() => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShopState])],
      declarations: [AppComponent]
    })
    store = TestBed.inject(Store);
  });
  it('should create the app',() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const shop = store.selectSnapshot(state=>state);
    expect(app).toBeTruthy();
    expect(shop).toBeTruthy();
  });
  it(`should render the app'`,() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    checkAllVariables(app);
  });
});