import { Component, inject } from '@angular/core';
import { Gif } from '@interfaces/gifs.interface';
import { GifsService } from '@service/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private gifService=inject(GifsService);
  get gifs():Gif[]{
    return this.gifService.gifsList;
  }
}
