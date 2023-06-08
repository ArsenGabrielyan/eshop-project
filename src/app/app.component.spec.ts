import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { ShopState } from './store/product.state';

describe('AppComponent', () => {
  let store: Store
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ShopState])],
      declarations: [AppComponent]
    })
    store = TestBed.inject(Store);
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    store
    const shop = store.selectSnapshot(state=>state);
    expect(app).toBeTruthy();
    expect(shop).toBeTruthy();
  });
  it(`should have as title 'eshop-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});