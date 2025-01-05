import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContactComponent } from '../../components/contact/contact.component';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  content: any | undefined;

  constructor(private service: PocketbaseService, private sanitizer: DomSanitizer) {}


   async ngOnInit() {
    try {
      this.content = await this.service.getRecordById('statics','59xs83o8xg62j6e');
      console.log('content:', this.content);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  showHtml(htmlCode: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlCode);
  }
}
