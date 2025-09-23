import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe } from '@angular/core';
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth,format} from 'date-fns';
import {Subject, takeUntil} from 'rxjs';
import { EventService } from '../../services/event-service';
import { CalendarEvent } from '../../models/calendar-event-model/calendar-event-model-module';
import { Event } from '../event/event';


@Component({
  selector: 'app-calendar',
  standalone : true,
  imports: [
    CommonModule,
    Event
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css'
})
export class Calendar {
  static daysInMonth: any;
  static isSameDay: any;
  static generateCalendar(testDate: Date) {
    throw new Error('Method not implemented.');
  }
  static ngOnInit() {
    throw new Error('Method not implemented.');
  }
currentMonth : Date = new Date();
calendarDays : Date[] = [];// array of Date objects forming the month grid
weekdays =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
// events from service
events : CalendarEvent[]=[]; 
// loading UI
loading = true;
// model close/open
showModel = false;
// date used for creating new event
modelDate : Date | null =null;
// editing event
editingEvent : CalendarEvent |null =null;

// clean subscriptions
private destroy$ = new Subject<void>();
  static events: any;

constructor(private eventService:EventService){}

ngOnInit():void{
  // initial calender build
  this.buildCalendar(this.currentMonth);
  
  // subscribe to the events and update local state
  this.eventService.events$.pipe(takeUntil(this.destroy$)).subscribe(ev =>{
    this.events = ev;
    this.loading = false;
  });
}

ngOnDestroy():void{
  this.destroy$.next();
  this.destroy$.complete();
}

// build a month grid including previous,next month days to complete weeks
buildCalendar(base: Date) {
   // first day of month
    const monthStart = startOfMonth(base);  
    // last day of month  
    const monthEnd = endOfMonth(base);   
    // start from Sunday (or change)      
    const gridStart = startOfWeek(monthStart); 
    // include last week's Saturday
    const gridEnd = endOfWeek(monthEnd);    
    // full grid   
    this.calendarDays = eachDayOfInterval({ start: gridStart, end: gridEnd }); 
  }

  // navigate to previous month
  prevMonth(){
    this.currentMonth = subMonths(this.currentMonth,1);
    this.buildCalendar(this.currentMonth);
  }

  // navigate to next month
  nextMonth(){
    this.currentMonth = addMonths(this.currentMonth,1);
    this.buildCalendar(this.currentMonth);
  }

  // header format
  monthLabel(){
    return format ( this.currentMonth,'MMM yyyy');
  }

  // return events
  eventsForDay(day:Date){
    return this.eventService.getEventsForDate(day);
  }

  // create event when user clicks a date
  createEvent(day:Date){
    this.modelDate = day;
    this.editingEvent = null;
    this.showModel = true;
  }

  // edit existing event 
  editEvent(ev:CalendarEvent, eventMouse :MouseEvent){
    // prevent parent date click
    eventMouse.stopPropagation();
    this.editingEvent= ev;
    this.modelDate= null;
    this.showModel = true;
  }

  // update event
  updateEvent(){
    this.showModel = false;
    this.modelDate =null;
    this.editingEvent = null;
  }

  //  delete
  deleteEvent(id:string){
    if(!confirm("Delete this event? this action can't be undone"))
      return;
    this.eventService.delete(id);
  }

  isOtherMonth(day:Date){
    return !isSameMonth(day, this.currentMonth);
  }

  formatTimeRange(ev: CalendarEvent): string {
  return `${new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
          ${new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}


}
