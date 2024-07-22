import { Component } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact.component';
import { BlocksComponent } from '../../components/blocks/blocks.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ContactComponent, BlocksComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
