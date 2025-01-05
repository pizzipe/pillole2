import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../../components/contact/contact.component';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CommonModule, ContactComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  landingId: string = "";
  mainData: any | undefined;
  previews: any[] | undefined;

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

    try {
      this.previews = await this.service.getAllRecords('articlesPreviews');
      this.previews = this.previews.filter((x)=>x.landingId == this.landingId);
      console.log('articlesPreviews:', this.previews);
    } catch (error) {
      console.error('Error loading articlesPreviews:', error);
    }
  }

  getLandingImageUrl() {
    const apiUrl = this.service.getApiUrl();
    return `${apiUrl}/api/files/landings/${this.mainData.id}/${this.mainData.image}`;
  }

  getArticleImageUrl(preview: any) {
    const apiUrl = this.service.getApiUrl();
    return `${apiUrl}/api/files/articlesPreviews/${preview.id}/${preview.image}`;
  }
}
