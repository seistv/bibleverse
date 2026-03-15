import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableTranslations } from '../entities/available-translations';
import { TranslationBooks } from '../entities/translation-books';
import { TranslationBookChapter } from '../entities/translation-book-chapter';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://bible.helloao.org/api';

  getTranslations(): Observable<AvailableTranslations> {
    return this.http.get<AvailableTranslations>(
      `${this.baseUrl}/available_translations.json`
    );
  }

  getBooks(translation: string): Observable<TranslationBooks> {
    return this.http.get<TranslationBooks>(
      `${this.baseUrl}/${translation}/books.json`
    );
  }

  getChapters(
    translation: string,
    book: string,
    chapter: string
  ): Observable<TranslationBookChapter> {
    return this.http.get<TranslationBookChapter>(
      `${this.baseUrl}/${translation}/${book}/${chapter}.json`
    );
  }
}
