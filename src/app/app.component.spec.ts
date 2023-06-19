import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { checkAllVariables } from './data/data';
import { ShopActions, ShopState } from './store/store';
import { FormsModule } from '@angular/forms';
describe('AppComponent',() => {
  let app:AppComponent,fixture:ComponentFixture<AppComponent>,dispatchSpy: jasmine.Spy,store:Store;
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
    dispatchSpy = spyOn(store,"dispatch").and.callThrough();
    fixture.detectChanges();
  })
  it('should create the app',()=>{
    expect(app).toBeTruthy();
    checkAllVariables(app);
  })
  it("should call the changePage function",()=>{
    expect(app.selectedPage).toBe(localStorage.getItem("current") || "all");
  })
  it("should call the handleChangeOptions function",()=>{
    expect(dispatchSpy).toHaveBeenCalledWith([new ShopActions.ChangeOptions(app.selectedSortOpt)])
  })
  it("should call the handleInput function",()=>{
    expect(app.enableClearBtn).toBeFalse();
    expect(app.searchPrompt).toBe("");
  })
  it("should call the resetAlert function",()=>{
    expect(app.showAlert).toBeFalse();
    expect(app.alertMsg).toBe("");
  });
});