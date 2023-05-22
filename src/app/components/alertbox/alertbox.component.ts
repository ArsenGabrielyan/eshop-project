import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.scss']
})
export class AlertboxComponent {
  @Input() msg="";
}