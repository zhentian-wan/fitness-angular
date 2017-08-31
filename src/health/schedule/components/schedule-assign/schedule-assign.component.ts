
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/img/{{section.type === 'workouts' ? 'workout' : 'food'}}.svg" alt="">
            Assign {{section.type}}
          </h1>
          <a class="btn__add" [routerLink]="getRoute(section.type)">
            <img src="/img/add-white.svg" alt="">
            New {{section.type}}
          </a>
        </div>
        <div class="schedule-assign__list">
        <span
          *ngIf="!list?.length"
          class="schedule-assign__empty">
          <img src="/img/face.svg" alt="">
          You don't have anything yet 
        </span>

          <div
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)"
            *ngFor="let item of list"
          >
            {{item.name}}
          </div>
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button (click)="updateAssign()" type="button" class="button">Update</button>
            <button (click)="cancelAssign()" type="button" class="button button--cancel">Cancel</button>
          </div>
        </div>
      </div>
      
      
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit{

  private selected: string[] = [];

  ngOnInit(): void {
    this.selected = [
      ...this.section.assigned
    ];
  }

  @Input()
  section: any;

  @Input()
  list: any;

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }

  exists(name: string) {
    return this.selected.indexOf(name) > -1;
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [
        ...this.selected, name
      ];
    }
  }

}
