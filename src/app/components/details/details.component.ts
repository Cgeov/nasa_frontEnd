import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { Subscription } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  //VARIABLE TIPO SUSCRIPTION PARA FINALIZAR LA CONEXION VIVA UNA VEZ SE CIERRE LA PÄGINA EXISTENTE
  private subscription: Subscription | undefined;

  private nasaId: string = "";
  information: any = {};

  isOpen: boolean = false;
  exifEntries: Array<any> = [];
  imagesSource: string = "";
  locationInfo: string = "";
  typeMedia: string = "";
  docStatus: 'waiting' | 'error' | 'success' = 'waiting'

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getId();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  getId() {
    this.subscription = this.route.params.subscribe((params) => {
      this.nasaId = params.id;
      this.getInfoNasaID();
    });
  }

  async getInfoNasaID() {
    try {
      await axios
        .get(`https://images-api.nasa.gov/metadata/${this.nasaId}`)
        .then((result) => {
          if (result.status == 200) {
            this.docStatus = 'success';
            this.locationInfo = result.data.location;
          }
        });
    } catch (error: any) {
      console.log("ERROR-->", error.message);
      this.docStatus = 'error'
    }

    if (this.docStatus == 'success') {
      await axios.get(this.locationInfo).then((info) => {
        this.information = info.data;
        this.typeMedia = this.information["AVAIL:MediaType"];
        this.exifEntries = Object.entries(info.data)
          .filter(([key]) => key.startsWith("EXIF:")) //AQUI SE FILTRAN TODOS LOS DATOS QUE SU KEY EMPIECE CON "EXIF"
          .map(([key, value]) => ({
            //AQUI SE TRATA LA INFORMACIÓN Y SE GUARDA EN UN OBJETO
            key: key.replace("EXIF:", ""),
            value: value,
          }));
      });
      await axios
        .get(`https://images-api.nasa.gov/asset/${this.nasaId}`)
        .then((gallery) => {
          const encodedUrl = encodeURI(gallery.data.collection.items[0].href);
          this.imagesSource = encodedUrl;
        });
    }
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
