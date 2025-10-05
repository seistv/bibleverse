import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuValue = signal(false);
  menuIcon = signal('bi bi-list');
  isMobile = signal(false);

  constructor() {
    const mq = window.matchMedia('(max-width: 900px)');
    this.isMobile.set(mq.matches);

    mq.addEventListener('change', (e) => {
      this.isMobile.set(e.matches);
    });
  }

  openMenu() {
    this.menuValue.update((v) => !v);
    this.menuIcon.update((v) =>
      v === 'bi bi-list' ? 'bi bi-x' : 'bi bi-list'
    );
  }

  closeMenu() {
    this.menuValue.set(false);
    this.menuIcon.set('bi bi-list');
  }
}
