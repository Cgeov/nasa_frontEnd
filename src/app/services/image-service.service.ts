import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  recent: Array<any> = [];
  popular: Array<any> = []
  constructor() { }


  async getInitialData() {
    //REALIZO LA CARGA DE LOS DOS ENDPOINTS INICIALMENTE PARA NO CONSULTAR LA API CADA VEZ QUE CAMBIE DE 
    //TIPO DE GALERÍA
    
    await axios.get('https://images-assets.nasa.gov/recent.json').then((result)=>{
      this.recent = result.data.collection.items
    });
    await axios.get('https://images-assets.nasa.gov/popular.json').then((result)=>{
      this.popular = result.data.collection.items
    })
  }

  
}
