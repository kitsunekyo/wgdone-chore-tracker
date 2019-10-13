import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('.1s ease-out', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('.1s ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class ActivitiesComponent implements OnInit {
  public activities: Activity[];
  public loading = true;
  public chartData: { name: string; value: number }[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.list().subscribe(activities => {
      this.activities = activities;
      this.chartData = this.countActivitiesPerPerson();
      this.loading = false;
    });
  }

  private countActivitiesPerPerson(): { name: string; value: number }[] {
    const collection = [];
    for (const activity of this.activities) {
      const data = collection.find(d => d.name === activity.user.displayName);
      if (data) {
        data.value++;
      } else {
        collection.push({ name: activity.user.displayName, value: 1 });
      }
    }
    collection.sort((a, b) => (a.value > b.value ? -1 : b.value > a.value ? 1 : 0));
    return collection;
  }

  onDelete(activityId: string) {
    this.activityService.delete(activityId);
  }
}
