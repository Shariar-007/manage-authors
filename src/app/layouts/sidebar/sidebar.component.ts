import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  selectedSideBarMenu: string | null = 'AUTHOR';

  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('selectedSideBarMenu')) {
      this.selectedSideBarMenu = localStorage.getItem('selectedSideBarMenu');
    }
  }

  onClickSideBar(selectedTab: string) {
    this.selectedSideBarMenu = selectedTab;
    localStorage.setItem('selectedSideBarMenu', selectedTab);
    // this.authenticationService.selectedSideBar.next(selectedTab);
    // if (this.get_logged_agent_type() == 'PROJECT_COORDINATOR') {
    //   localStorage.setItem('inventory-tab', 'SUMMARY');
    // }
  }
}
