import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PocketbaseService } from '../../services/pocketbase/pocketbase.service';

@Component({
  selector: 'app-blocks',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './blocks.component.html',
  styleUrl: './blocks.component.scss'
})
export class BlocksComponent implements OnInit {

  blocks: any[] | undefined;

  constructor(private service: PocketbaseService) {}


  async ngOnInit() {
    try {
      this.blocks = await this.service.getAllRecords('blocks');
      console.log('blocks:', this.blocks);
    } catch (error) {
      console.error('Error loading blocks:', error);
    }
  }

  getImageUrl(block: any) {
    const apiUrl = this.service.getApiUrl();
    return `${apiUrl}/api/files/blocks/${block.id}/${block.image}`;
  }
}
