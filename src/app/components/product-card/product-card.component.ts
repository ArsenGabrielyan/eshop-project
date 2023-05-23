import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() prodImg="";
  @Input() prodTitle="";
  @Input() price=0;
  @Input() noBtn=false;
  @Input() qty=0;
  @Input() category="";
}
