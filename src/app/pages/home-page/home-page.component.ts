import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactComponent } from '../../components/contact/contact.component';
import { BlocksComponent } from '../../components/blocks/blocks.component';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactComponent, BlocksComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  mainSiteData: any | undefined;

  constructor(private service: PocketbaseService) {}


  async ngOnInit() {
    try {
      this.mainSiteData = await this.service.getRecordById('mainData','g25w8es2k79a4vs');
      console.log('mainSiteData:', this.mainSiteData);
    } catch (error) {
      console.error('Error loading mainSiteData:', error);
    }
  }
}
