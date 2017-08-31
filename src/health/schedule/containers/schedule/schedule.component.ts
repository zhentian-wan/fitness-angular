
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ScheduleService, ScheduleItem} from '../../../shared/services/schedule/schedule.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from 'store';
import {Meal, MealsService} from '../../../shared/services/meals/meals.service';
import {Workout, WorkoutsService} from '../../../shared/services/workouts/workouts.service';
@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [items]="schedule$ | async"
        (select)="changeSection($event)"
        (change)="changeDate($event)"
        [date]="date$ | async">
      </schedule-calendar>
      
      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
      ></schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy{

  open = false;


  date$: Observable<Date>;
  selected$: Observable<any>;
  schedule$: Observable<ScheduleItem[]>;
  list$: Observable<Meal[] | Workout[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

}
