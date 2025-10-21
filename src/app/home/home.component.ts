import { ApiService } from './../services/api.service';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { SearchContentComponent } from '../components/search-content/search-content.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';

// interface Translation {
//   id: string;
//   name: string;
//   language: string;
// }

// interface Book {
//   id: string;
//   name: string;
//   numberOfChapters: number;
// }

// interface ChapterResponse {
//   chapter: {
//     content: any[];
//   };
// }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchContentComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  // // ✅ Signals with proper typing
  // translationsData = signal<Translation[]>([]);
  // booksData = signal<Book[]>([]);
  // numberOfChapters = signal<number[]>([]);
  // chapterData = signal<any[]>([]);
  // showSearchContent = signal<boolean>(false);

  // selectedTranslation = signal<string>('');
  // selectedBook = signal<string>('');
  // selectedChapter = signal<string>('');

  // // ✅ Strongly typed form
  // bibleForm = new FormGroup({
  //   translation: new FormControl<string>(''),
  //   book: new FormControl<string>({ value: '', disabled: true }),
  // });

  // get translationCtrl() {
  //   return this.bibleForm.get('translation') as FormControl<string>;
  // }
  // get bookCtrl() {
  //   return this.bibleForm.get('book') as FormControl<string>;
  // }

  // // ✅ Handle nulls explicitly from FormControl
  // translationSearch = toSignal(this.translationCtrl.valueChanges, {
  //   initialValue: this.translationCtrl.value ?? '',
  // });
  // bookSearch = toSignal(this.bookCtrl.valueChanges, {
  //   initialValue: this.bookCtrl.value ?? '',
  // });

  // // ✅ Generic filtering helper
  // private filterList<T extends { id: string; name?: string }>(
  //   list: T[],
  //   search: string | null
  // ): T[] {
  //   if (!Array.isArray(list) || !list.length) return [];
  //   const query = (search ?? '').trim().toLowerCase();
  //   if (!query) return list;
  //   return list.some((item) => item.id === query)
  //     ? list
  //     : list.filter((item) => item.name?.toLowerCase().includes(query));
  // }

  // filteredTranslationChoice = computed(() =>
  //   this.filterList(this.translationsData(), this.translationSearch())
  // );

  // filteredBookChoice = computed(() =>
  //   this.filterList(this.booksData(), this.bookSearch())
  // );

  // constructor() {
  //   // ✅ Unified cleanup effect
  //   effect(
  //     () => {
  //       if (!(this.translationSearch() ?? '').trim()) {
  //         this.resetTranslationRelatedFields();
  //       }
  //       if (!(this.bookSearch() ?? '').trim()) {
  //         this.resetBookRelatedFields();
  //       }
  //     },
  //     { allowSignalWrites: true }
  //   );
  // }

  // ngOnInit(): void {
  //   this.fetchTranslations();
  // }

  // // ✅ Centralized error handler
  // private handleError<T>(fallback: T) {
  //   return catchError(() => of(fallback));
  // }

  // fetchTranslations() {
  //   this.apiService
  //     .getTranslations()
  //     .pipe(
  //       this.handleError<{ translations: Translation[] }>({ translations: [] }),
  //       tap((trans) => {
  //         const data = trans as { translations: Translation[] };
  //         const englishTranslations =
  //           data.translations?.filter((t) => t.language === 'eng') ?? [];
  //         this.translationsData.set(englishTranslations);
  //       })
  //     )
  //     .subscribe();
  // }

  // onTranslationChange(id: string) {
  //   this.selectedTranslation.set(id);
  //   this.resetBookRelatedFields();
  //   this.bookCtrl.reset('');
  //   this.bookCtrl.disable();

  //   if (!id) return;

  //   this.apiService
  //     .getBooks(id)
  //     .pipe(
  //       this.handleError<{ books: Book[] }>({ books: [] }),
  //       tap((bk) => {
  //         const data = bk as { books: Book[] };
  //         this.booksData.set(data.books ?? []);
  //         if (data.books?.length) this.bookCtrl.enable();
  //       })
  //     )
  //     .subscribe();
  // }

  // onBookChange(id: string) {
  //   this.selectedBook.set(id);
  //   this.selectedChapter.set('');
  //   this.showSearchContent.set(false);

  //   const book = this.booksData().find((b) => b.id === id);
  //   this.numberOfChapters.set(
  //     book ? Array.from({ length: book.numberOfChapters }, (_, i) => i + 1) : []
  //   );
  // }

  // onChapterChange(event: Event) {
  //   this.selectedChapter.set((event.target as HTMLSelectElement).value);
  //   this.showSearchContent.set(false);
  // }

  // onClickSearch() {
  //   this.chapterData.set([]);

  //   this.apiService
  //     .getChapters(
  //       this.selectedTranslation(),
  //       this.selectedBook(),
  //       this.selectedChapter()
  //     )
  //     .pipe(
  //       this.handleError<ChapterResponse>({ chapter: { content: [] } }),
  //       tap((chData) => {
  //         const data = chData as ChapterResponse;
  //         this.chapterData.set(data.chapter?.content ?? []);
  //         this.showSearchContent.set(true);
  //       })
  //     )
  //     .subscribe();
  // }

  // // ✅ Display helpers
  // displayTranslation = (id: string): string =>
  //   this.translationsData().find((t) => t.id === id)?.name ?? id ?? '';

  // displayBook = (id: string): string =>
  //   this.booksData().find((b) => b.id === id)?.name ?? id ?? '';

  // // ✅ Reset helpers
  // private resetTranslationRelatedFields() {
  //   this.booksData.set([]);
  //   this.numberOfChapters.set([]);
  //   this.chapterData.set([]);
  //   this.selectedBook.set('');
  //   this.selectedChapter.set('');
  //   this.showSearchContent.set(false);
  //   this.bookCtrl.reset('');
  //   this.bookCtrl.disable();
  // }

  // private resetBookRelatedFields() {
  //   this.selectedBook.set('');
  //   this.numberOfChapters.set([]);
  //   this.chapterData.set([]);
  //   this.selectedChapter.set('');
  //   this.showSearchContent.set(false);
  // }

  isExpanded = signal<boolean>(false);
  translationsData = signal<any[]>([]);
  booksData = signal<any[]>([]);
  numberOfChapters = signal<number[]>([]);
  chapterData = signal<number[]>([]);

  selectedTranslation = signal<string>('');
  selectedBook = signal<string>('');
  selectedChapter = signal<string>('');

  showSearchContent = signal<boolean>(false);

  toggleExpand() {
    this.isExpanded.update((v) => !v);
  }

  bibleForm = new FormGroup({
    translation: new FormControl(''),
    book: new FormControl({ value: '', disabled: true }),
  });

  translationSearch = toSignal(
    this.bibleForm.get('translation')!.valueChanges,
    {
      initialValue: this.bibleForm.get('translation')!.value ?? '',
    }
  );

  filteredTranslationChoice = computed(() => {
    const raw = this.translationSearch();
    const list = this.translationsData();

    return this.filterChoice(raw, list);
  });

  bookSearch = toSignal(this.bibleForm.get('book')!.valueChanges, {
    initialValue: this.bibleForm.get('book')!.value ?? '',
  });

  filteredBookChoice = computed(() => {
    const raw = this.bookSearch();
    const list = this.booksData();

    return this.filterChoice(raw, list);
  });

  constructor() {
    effect(
      () => {
        const translationValue = this.translationSearch();
        if (
          typeof translationValue === 'string' &&
          translationValue.trim() === ''
        ) {
          this.resetTranslationRelatedFields();
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        const bookValue = this.bookSearch();
        if (typeof bookValue === 'string' && bookValue.trim() === '') {
          this.resetBookRelatedFields();
        }
      },
      { allowSignalWrites: true }
    );
  }

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

  onTranslationChange(id: string) {
    this.selectedTranslation.set(id);

    this.selectedBook.set('');
    // this.booksData.set([]);
    this.selectedChapter.set('');
    this.numberOfChapters.set([]);
    // this.showSearchContent.set(false);
    this.bibleForm.get('book')!.reset('');
    this.bibleForm.get('book')!.disable();

    if (id) {
      this.apiService
        .getBooks(id)
        .pipe(
          catchError((err) => {
            console.error(err);
            return of({ books: [] });
          })
        )
        .subscribe((bk) => {
          this.booksData.set(bk.books ?? []);
          if (bk.books?.length) {
            this.bibleForm.get('book')!.enable();
          }
        });
    }
  }

  onBookChange(id: string) {
    this.selectedBook.set(id);

    this.selectedChapter.set('');
    this.numberOfChapters.set([]);
    this.showSearchContent.set(false);

    const book = this.booksData().find((c) => c.id === id);

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

  onClickSearch(event: Event) {
    this.chapterData.set([]);
    this.selectedChapter.set((event.target as HTMLSelectElement).value);
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
        console.log(chapterContent);
        this.chapterData.set(chapterContent);
      });
    this.showSearchContent.set(true);
  }

  displayTranslation = (id: string): string => {
    if (!id && id !== '') return '';
    const found = this.translationsData().find((t) => t.id === id);
    return found ? found.name : id ?? '';
  };

  displayBook = (id: string): string => {
    if (!id && id !== '') return '';
    const found = this.booksData().find((t) => t.id === id);
    return found ? found.name : id ?? '';
  };

  private filterChoice(raw: string | null, list: any[]): any[] {
    if (!Array.isArray(list) || list.length === 0) return [];

    if (raw == null) return list;

    if (typeof raw !== 'string') return list;

    const trimmed = raw.trim();
    if (trimmed === '') return list;

    if (list.some((t) => t.id === trimmed)) return list;

    const search = trimmed.toLowerCase();
    return list.filter((t) => t.name?.toLowerCase().includes(search));
  }

  private resetTranslationRelatedFields() {
    this.booksData.set([]);
    this.numberOfChapters.set([]);
    this.chapterData.set([]);
    this.selectedBook.set('');
    this.selectedChapter.set('');
    this.showSearchContent.set(false);
    this.bibleForm.get('book')!.reset('');
    this.bibleForm.get('book')!.disable();
  }

  private resetBookRelatedFields() {
    this.selectedBook.set('');
    this.numberOfChapters.set([]);
    this.chapterData.set([]);
    this.selectedChapter.set('');
    this.showSearchContent.set(false);

    // Disable dependent controls (if you add chapter control later)
    // this.bibleForm.get('chapter')!.reset('');
    // this.bibleForm.get('chapter')!.disable();
  }
}
