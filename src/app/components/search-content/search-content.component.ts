import { Component, input } from '@angular/core';

@Component({
  selector: 'app-search-content',
  standalone: true,
  imports: [],
  templateUrl: './search-content.component.html',
  styleUrl: './search-content.component.scss',
})
export class SearchContentComponent {
  chapterData = input<any[]>([]);
  searchedBook = input<string>('');
  chosenChapter = input<string>('');
}
