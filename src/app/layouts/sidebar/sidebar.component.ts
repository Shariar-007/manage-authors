import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  selectedSideBarMenu: string | null = 'AUTHOR';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('selectedSideBarMenu')) {
      this.selectedSideBarMenu = localStorage.getItem('selectedSideBarMenu');
      if (this.selectedSideBarMenu == 'FAV-AUTHOR'){
        this.router.navigate(['./favourite-authors']);
      } else {
        this.router.navigate(['./authors']);
      }
    }
  }

  onClickSideBar(selectedTab: string) {
    this.selectedSideBarMenu = selectedTab;
    localStorage.setItem('selectedSideBarMenu', selectedTab);
  }
}
