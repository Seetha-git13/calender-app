import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CalendarEventModelModule { }
  export type Category ='work' |'personal' |'meeting'|'other';
  export interface CalendarEvent{
    id: string; 
    title : string;
    start : string;
    end : string;
    color: string;
    notes?: string;
    category: Category;
    participants?: string[];  
  }

