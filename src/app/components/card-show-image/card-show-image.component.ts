import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-card-show-image",
  templateUrl: "./card-show-image.component.html",
  styleUrls: ["./card-show-image.component.css"],
})
export class CardShowImageComponent implements OnInit {
  @Input() information: any = {};
  constructor(private router: Router, public userService: UserServiceService) {}

  ngOnInit(): void {}

  //FUNCTION PARA REDIRIGIR A LA PÁGINA DE DETALLES
  redirect(nasaId: string) {
    this.router.navigateByUrl(`/details/${nasaId}`);
  }
}
