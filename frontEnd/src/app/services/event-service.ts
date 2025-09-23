import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event-model/calendar-event-model-module';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  
  //key used for localstorage
  private storageKey ='calendar_events';
    // Check if we are running in the browser (not SSR)
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
  
  
  private eventSubject = new BehaviorSubject<CalendarEvent[]>(this.load());
  public events$ = this.eventSubject.asObservable();

  //load the events
  private load(): CalendarEvent[] {
    try{
      // fetch the raw string to check which is parse or return empty array
      if (!this.isBrowser()) return [];
      const raw = localStorage.getItem(this.storageKey); 
      return raw ? (JSON.parse(raw) as CalendarEvent[]) : [];

    }catch(err){
      console.error('Failed to load events from localStorage',err);
      // return error as empty array
      return [];  
    }
  }


  private save(events:CalendarEvent[]){
    try{
      // if (!this.isBrowser()) return [];
      localStorage.setItem(this.storageKey, JSON.stringify(events));
      this.eventSubject.next(events);
    }catch(err){
      console.error("Failed to save events to localstorage", err);
      
    }
  }

  public getValue(): CalendarEvent[]{
    return this.eventSubject.getValue();
  }

  // add new event
  public add(event: CalendarEvent){
    // current value
    const current = this.getValue();
    // append and save
    this.save([...current,event]);
  }

  // update existing event by id
  public update(updated: CalendarEvent){
    const arr = this.getValue().map(ev=> ev.id === updated.id? updated :ev);
    this.save(arr);
  }

  // delete event by id
  public delete(id:string){
    const arr = this.getValue().filter(ev=>ev.id !==id);
    this.save(arr);
  }

  // get event for specific day
  public getEventsForDate(date: Date):CalendarEvent[]{
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);
    const dayEnd =new Date(date.getFullYear(), date.getMonth(), date.getDate(),23,59,59,999);
    return this.getValue().filter(ev =>{
      const evStart = new Date(ev.start);
      const evEnd = new Date(ev.end);
      return(evStart <= dayEnd && evEnd >= dayStart);
    });
  }
}
