import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarEvent } from '../models/calendar-event-model/calendar-event-model-module';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  
  
  //key used for localstorage
  private storageKey ='calendar_events';
    // Check if we are running in the browser (not SSR)
  // private isBrowser(): boolean {
  //   return typeof window !== 'undefined' && !!window.localStorage;
  // }
  private http = inject(HttpClient)
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'http://localhost:4000';
  
  private eventSubject = new BehaviorSubject<CalendarEvent[]>(this.load());
  public events$ = this.eventSubject.asObservable();
  saveLocal: any;
  isPlatformBrowser: any;

  //load the events
  private load(): CalendarEvent[] {
     // fetch the raw string to check which is parse or return empty array
    if (!isPlatformBrowser(this.platformId)) {
    return []; // SSR mode: skip localStorage
  }
    try{
      const raw = localStorage.getItem(this.storageKey); 
      return raw ? JSON.parse(raw)  : [];

    }catch(err){
      console.error('Failed to load events from localStorage',err);
      // return error as empty array
      return [];  
    }
  }


  private save(events:CalendarEvent[]){
    
     if (!isPlatformBrowser(this.platformId)) return;
      localStorage.setItem(this.storageKey, JSON.stringify(events));
      this.eventSubject.next(events);
    // }catch(err){
    //   console.error("Failed to save events to localstorage", err);
      
    // }
  }

  public getValue(): CalendarEvent[]{
    return this.eventSubject.getValue();
  }

  // Fetch from backend (for initial sync)
  // public fetchFromBackend() {
  //   this.http.get<CalendarEvent[]>('/api/events').subscribe({
  //     next: (events) => {
  //       console.log("Fetched from backend:", events);
  //       this.saveLocal(events); // sync to localStorage too
  //     },
  //     error: (err) => console.error("Failed to fetch from backend", err)
  //   });
  // }

  // ========== BACKEND INTEGRATION ==========
  checkConflicts(event: CalendarEvent): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-conflicts`, event);
  }

  suggestTimes(event: CalendarEvent): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggest-times`, event);
  }

  // add new event
  public async add(event: CalendarEvent) {
    try {
      const conflicts: any = await this.checkConflicts(event).toPromise();

      if (conflicts.length > 0) {
        alert('Conflict detected! Suggesting alternatives.');
        const suggestions: any = await this.suggestTimes(event).toPromise();
        console.log('Suggested slots:', suggestions);
        return; // do not save if conflict
      }

      const current = this.load();
      this.save([...current, event]);

    } catch (err) {
      console.error('Failed to add event:', err);
    }
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
