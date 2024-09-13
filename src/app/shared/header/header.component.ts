import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  route: any = inject(Router);
  private timeSubject = new Subject<Date>();
  currentTime$!: Observable<Date>;
  isShow: boolean = false;
  constructor() {}

  ngOnInit(): void {
    // Emit the current time every second
    this.currentTime$ = this.timeSubject.asObservable();

    setInterval(() => {
      this.timeSubject.next(new Date());
      const isViewData = localStorage.getItem('isView');
      console.log(isViewData);
      if (isViewData) {
        console.log('User');
        this.isShow = true;
      } else {
        console.log(' No User');
        this.isShow = false;
      }
    }, 1000);
  }
  Logout() {
    localStorage.removeItem('isView');
    alert('You have sucessfully logout ....😊');
    this.route.navigate(['/login']);
  }
}
