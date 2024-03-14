import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Gif, SearchResponse } from '@interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistorys: string[] = [];
  private aPi_key = environment.api_key;
  private ServiceURL = environment.serviceUrl;
  private http = inject(HttpClient);
  public gifsList: Gif[] = [];
  constructor() {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistorys];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.aPi_key)
      .set('q', tag)
      .set('limit', 10);
    this.http
      .get<SearchResponse>(`${this.ServiceURL}/search`, { params })
      .subscribe((resp) => (this.gifsList = resp.data));
  }
  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistorys.includes(tag)) {
      this._tagsHistorys = this._tagsHistorys.filter(
        (oldTag) => oldTag !== tag
      );
    }
    this._tagsHistorys.unshift(tag);
    this._tagsHistorys = this._tagsHistorys.splice(0, 10);
    this.saveLocalStorage();
  }
  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }
  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return;
    this._tagsHistorys = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistorys.length === 0) return;
    this.searchTag(this._tagsHistorys[0]);
  }
}
