import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContactComponent } from '../../components/contact/contact.component';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {

  articleId: string = "";
  article: any | undefined;

  constructor(private route: ActivatedRoute, private service: PocketbaseService, private sanitizer: DomSanitizer) {}


   async ngOnInit() {
    this.route.params.subscribe(params=>{
      this.articleId = params['url'];
    });

    try {
      this.article = await this.service.getRecordById('articles',this.articleId);
      console.log('article:', this.article);
    } catch (error) {
      console.error('Error loading article:', error);
    }
  }

  showHtml(htmlCode: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlCode);
  }

  getImageUrl(article: any) {
    const apiUrl = this.service.getApiUrl();
    return `${apiUrl}/api/files/articles/${article.id}/${article.image}`;
  }
}
