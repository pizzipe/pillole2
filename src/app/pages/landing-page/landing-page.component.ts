import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../../components/contact/contact.component';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  landingId: string = "";
  mainData: any | undefined;

  constructor(private route: ActivatedRoute, private service: PocketbaseService) {}


   async ngOnInit() {
    this.route.params.subscribe(params=>{
      this.landingId = params['url'];
    });

    try {
      this.mainData = await this.service.getRecordById('landings',this.landingId);
      console.log('mainData:', this.mainData);
    } catch (error) {
      console.error('Error loading mainData:', error);
    }
  }

  getImageUrl() {
    const apiUrl = this.service.getApiUrl();
    return `${apiUrl}/api/files/landings/${this.mainData.id}/${this.mainData.image}`;
  }
}
