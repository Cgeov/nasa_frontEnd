import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import axios from "axios";
import { ImageServiceService } from "src/app/services/image-service.service";
import { typeSource } from "src/interfaces/types";
import { Options } from "@angular-slider/ngx-slider";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  //VARIABLES
  textsearch: string = "";
  flagSearch: boolean = false;
  searchItems: Array<any> = [];
  opcTypeSource: Array<typeSource> = ["recent", "popular"];
  typeSourceSelected: typeSource | null = "recent";
  chipsTipeMedia: Array<string> = ["Image", "video", "audio"];
  chipsMediaSelected: Array<string> = ["Image", "video", "audio"];

  sliderValue: any = {
    value: 1970,
    highValue: 2024,
  };

  options: Options = {
    floor: 1970,
    ceil: new Date().getFullYear(),
  };

  //CONSTRUCTOR OBTENIENDO DETALLES DE UN SERVICIO
  constructor(
    public informationService: ImageServiceService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.informationService.getInitialData();
  }

  //FUNCTION PARA EL CAMBIO DE TIPO DE POPULAR/NUEVO
  changeType(type: any) {
    this.typeSourceSelected = type;
    this.flagSearch = false;
    this.textsearch = "";
  }

  //FUNCTION CON EL FUNCIONAMIENTO DE DATA BINDING DE [(ngModel)]
  textChanged(event: any) {
    this.textsearch = event.target.value;
  }

  //FUNCTION CUANDO SE PRESIONA EL BOTON DE BUSCAR
  search() {
    if (this.textsearch.trim().length > 0) {
      this.typeSourceSelected = null;
      axios
        .get(
          `https://images-api.nasa.gov/search?q=${
            this.textsearch
          }&page=1&media_type=${this.chipsMediaSelected.toString()}&year_start=${
            this.sliderValue.value
          }&year_end=${this.sliderValue.highValue}`
        )
        .then((result: any) => {
          this.searchItems = result.data.collection.items;
          this.flagSearch = true;
        });
    }
  }

  valueSliderChange(value: number) {
    this.sliderValue.value = value;
  }

  highValueSliderChange(value: number) {
    this.sliderValue.highValue = value;
  }

  setMediaType(mediaType: string) {
    const mediaFounded = this.chipsMediaSelected.findIndex(
      (media) => media == mediaType
    );
    if (mediaFounded == -1) {
      this.chipsMediaSelected.push(mediaType);
    } else {
      this.chipsMediaSelected.splice(mediaFounded, 1);
    }
  }

}
