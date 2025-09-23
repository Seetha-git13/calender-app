// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { EventService } from '../../services/event-service';
// import { Calendar } from './calendar';

// describe('CalendarComponent', () => {
//   let component: Calendar;
//   let fixture: ComponentFixture<Calendar>;
//   let mockService: EventService;

//   beforeEach(async () => {
  

//     await TestBed.configureTestingModule({
//       imports: [CommonModule, ReactiveFormsModule, Calendar],
//       providers: [{ provide: EventService }]
//     }).compileComponents();

//     fixture = TestBed.createComponent(Calendar);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
// });
// it('should create the calendar component', () => {
//   expect(Calendar).toBeTruthy();
// });
// it('should generate correct number of days for November 2025', () => {
//   const testDate = new Date(2025, 10); // November is month 10 (0-indexed)
//   Calendar.generateCalendar(testDate);
//   expect(Calendar.daysInMonth.length).toBe(30);
// });
// it('should match events to correct calendar day', () => {
//   const eventDate = new Date(2025, 10, 15);
//   const cellDate = new Date(2025, 10, 15);
//   expect(Calendar.isSameDay(eventDate, cellDate)).toBeTrue();
// });
// export class MockEventService {
//   getEvents() {
//     return [
//       { title: 'Mock Event', date: new Date(), start: '09:00', end: '10:00' }
//     ];
//   }
// }

