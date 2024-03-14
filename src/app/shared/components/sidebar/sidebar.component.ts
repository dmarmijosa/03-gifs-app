import { Component, inject } from '@angular/core';
import { GifsService } from '@service/gifs.service';


@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private gifService =  inject(GifsService);
  get tags(){
    return this.gifService.tagsHistory;
  }
  getGifs(name:string){
    this.gifService.searchTag(name);
  }

}
