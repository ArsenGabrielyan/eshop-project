import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { AlertboxComponent } from './components/alertbox/alertbox.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProductCardComponent,
    SearchPipePipe,
    AlertboxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
