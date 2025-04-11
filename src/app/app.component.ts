import { Component } from '@angular/core';
import { LayoutComponent } from "./layout/components/layout/layout.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SGEU';
}
