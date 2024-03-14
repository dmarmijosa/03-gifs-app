import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GifsService } from '@service/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      #txtTagInput
      class="form-control"
      (keyup.enter)="searchTag()"
      placeholder="Buscar Gifs"
      autocomplete="off"
    />
  `,
})
export class SearchBoxComponent {
  private gifsService = inject(GifsService);
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    console.log(this.gifsService.tagsHistory);
    this.tagInput.nativeElement.value = '';
  }
}
