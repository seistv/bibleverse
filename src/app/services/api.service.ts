import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly translationsUrl =
    'https://bible.helloao.org/api/available_translations.json';
  private readonly baseUrl = 'https://bible.helloao.org/api';

  getTranslations(): Observable<any> {
    return this.http.get<any>(this.translationsUrl);
  }

  getBooks(translation: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${translation}/books.json`);
  }

  getChapters(translation: string, book: string, chapter: string) {
    return this.http.get<any>(
      `${this.baseUrl}/${translation}/${book}/${chapter}.json`
    );
  }
}
