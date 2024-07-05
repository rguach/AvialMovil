import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  nameUsuario: string = 'Usuario'; 
  constructor(private router: Router) {}
  goToSettings() {
    this.router.navigate(['/settings']);
  }

}
