import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'info-content';
  opened = false;
  searchQuery: string = '';

  onSearch() {
    // Handle search action here
    console.log('Search query:', this.searchQuery);
  }
}
