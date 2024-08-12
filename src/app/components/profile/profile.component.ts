import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  informationUser: any = {}
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.informationUser = this.userService.userDetails;
  }

}
