import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  footerDisplay: string = '2025 Jazz. All rights reserved.';

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
