import { Component, signal } from '@angular/core';
import { Calendar } from './components/calendar/calendar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone :true,
  imports: [Calendar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CalenderApp');
}
