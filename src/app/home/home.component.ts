import { ApiService } from './../services/api.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { SearchContentComponent } from '../components/search-content/search-content.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchContentComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  translationsData = signal<any[]>([]);
  booksData = signal<any[]>([]);
  numberOfChapters = signal<number[]>([]);
  chapterData = signal<any[]>([]);

  selectedTranslation = signal<string>('');
  selectedBook = signal<string>('');
  selectedChapter = signal<string>('');

  showSearchContent = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchTranslations();
  }

  fetchTranslations() {
    this.apiService
      .getTranslations()
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe((trans) => {
        const englishTranslations = trans.translations.filter(
          (t: any) => t.language === 'eng'
        );
        this.translationsData.set(englishTranslations);
      });
  }

  onTranslationChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedTranslation.set(value);

    this.selectedBook.set('');
    this.booksData.set([]);
    this.selectedChapter.set('');
    this.numberOfChapters.set([]);
    this.showSearchContent.set(false);

    if (value) {
      this.apiService
        .getBooks(value)
        .pipe(
          catchError((err) => {
            console.error(err);
            return of({ books: [] });
          })
        )
        .subscribe((bk) => {
          this.booksData.set(bk.books ?? []);
        });
    }
  }

  onBookChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedBook.set(value);

    this.selectedChapter.set('');
    this.numberOfChapters.set([]);
    this.showSearchContent.set(false);

    const book = this.booksData().find((c) => c.id === value);

    if (book) {
      const chapters = Array.from(
        { length: book.numberOfChapters },
        (_, i) => i + 1
      );

      this.numberOfChapters.set(chapters);
    }
  }

  onChapterChange(event: Event) {
    this.selectedChapter.set((event.target as HTMLSelectElement).value);
    this.showSearchContent.set(false);
  }

  onClickSearch() {
    this.chapterData.set([]);
    this.apiService
      .getChapters(
        this.selectedTranslation(),
        this.selectedBook(),
        this.selectedChapter()
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        })
      )
      .subscribe((chData) => {
        const chapterContent = chData.chapter.content ?? [];
        this.chapterData.set(chapterContent);
        console.log(chapterContent);
      });
    this.showSearchContent.set(true);
  }
}
