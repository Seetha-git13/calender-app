import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generateId } from '../../utils/id.utils';
import { EventService } from '../../services/event-service';
import { CalendarEvent, Category } from '../../models/calendar-event-model/calendar-event-model-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  standalone: true,   
  imports: [
    CommonModule,         // for *ngIf, *ngFor, pipes, etc.
    ReactiveFormsModule   // for form controls, formGroup, Validators
   
  ],
  templateUrl: './event.html',
  styleUrl: './event.css'
})
export class Event implements OnInit,OnChanges {
  @Input() initialDate: Date| null = null;
  @Input () editingEvent : CalendarEvent| null = null;
  @Output() close = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder, private evService:EventService){}
  categories = [
    { value: 'meeting', label: 'Meeting', color: '#ef4444' },
    { value: 'work', label: 'Work', color: '#3b82f6' },
    { value: 'personal', label: 'Personal', color: '#059669' },
    { value: 'other', label: 'Other', color: '#6b7280' }
  ];
  
  
  ngOnInit(): void {
    // form
    this.form = this.fb.group({
    title : ['',Validators.required],
    start: ['', Validators.required],  // datetime-local value
    end: ['', Validators.required],
    category: ['meeting' as Category, Validators.required],
    color: ['#3b82f6', Validators.required],
    notes: [''],
    participants: ['']
  });

  
    if(this.initialDate && ! this.editingEvent){
      const s = new Date(this.initialDate);
      s.setHours(9,0,0,0);
      const e = new Date(s);
      e.setHours(s.getHours()+1);
      this.form.patchValue({start:this.toLocalDateTime(s),end:this.toLocalDateTime(e)});
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
   if(changes['editingEvent'] && this.editingEvent){
    this.form.patchValue({
      title : this.editingEvent.title,
      start : this.toLocalDateTime(new Date(this.editingEvent.start)),
      end: this.toLocalDateTime(new Date(this.editingEvent.end)),
        category: this.editingEvent.category,
        color: this.editingEvent.color,
        notes: this.editingEvent.notes || ''
    })
   }
  }
  

// convert JS Date to "yyyy-MM-ddTHH:mm" (datetime-local input value)
  private pad(n: number) { return n.toString().padStart(2,'0'); }
  private toLocalDateTime(d: Date) {
    return `${d.getFullYear()}-${this.pad(d.getMonth()+1)}-${this.pad(d.getDate())}T${this.pad(d.getHours())}:${this.pad(d.getMinutes())}`;
  }

  // cancel editing/creation
  cancel() {
    this.close.emit();
  }

   // save new or edited event
  save() {

    if (this.form.invalid) { 
      alert('Please fill required fields'); 
      return; 
    }

    const v = this.form.value;
    const startISO = new Date(v.start).toISOString();
    const endISO = new Date(v.end).toISOString();

    if (new Date(startISO) >= new Date(endISO)) {
      alert('End must be after start');
      return;
    }

    const event: CalendarEvent = {
      id: this.editingEvent?.id || generateId(),
      title: v.title,
      start: startISO,
      end: endISO,
      category: v.category,
      color: v.color,
      notes: v.notes,
    };

    if (this.editingEvent) {
      this.evService.update(event); // update existing
    } else {
      this.evService.add(event);    // add new
    }
    this.close.emit();              // close modal
  }

  // delete currently editing event
  delete() {
    if (!this.editingEvent) return;
    if (!confirm('Delete this event?')) return;
    this.evService.delete(this.editingEvent.id);
    this.close.emit();
  }

}
