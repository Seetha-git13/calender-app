// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { Event } from './event';

// import { EventService } from '../../services/event-service';
// import { CalendarEvent } from '../../models/calendar-event-model/calendar-event-model-module';

// describe('EventService', () => {
//   let service: EventService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(EventService);

//     // Clear localStorage before each test
//     localStorage.clear();
//   });

//   it('should add event', () => {
//     const event: CalendarEvent = {
//       id: '1',
//       title: 'Meeting',
//       start: new Date().toISOString(),
//       end: new Date().toISOString(),
//       category: 'work',
//       color: ''
//     };

//     service.add(event);
//     const events = service.getValue();

//     expect(events.length).toBe(1);
//     expect(events[0].title).toBe('Meeting');
//   });

//   it('should update event', () => {
//     const event: CalendarEvent = {
//       id: '1',
//       title: 'Meeting',
//       start: new Date().toISOString(),
//       end: new Date().toISOString(),
//       category: 'work',
//       color: ''
//     };

//     service.add(event);
//     const updated = { ...event, title: 'Updated Meeting' };

//     service.update(updated);
//     const events = service.getValue();

//     expect(events[0].title).toBe('Updated Meeting');
//   });

//   it('should delete event', () => {
//     const event: CalendarEvent = {
//       id: '1',
//       title: 'Meeting',
//       start: new Date().toISOString(),
//       end: new Date().toISOString(),
//       category: 'work',
//       color: ''
//     };

//     service.add(event);
//     service.delete('1');
//     const events = service.getValue();

//     expect(events.length).toBe(0);
//   });
// });

