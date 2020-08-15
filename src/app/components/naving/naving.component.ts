import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-naving',
  templateUrl: './naving.component.html',
  styleUrls: ['./naving.component.css']
})
export class NavingComponent implements OnInit {

  /**
   * Konstruktor
   * @param router a routolásért felelős objektum 
   */
  constructor(private router: Router) { }

  /**
   * A router feliratkozok, a navigációs eseményekre
   */
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
  });
  }

}
