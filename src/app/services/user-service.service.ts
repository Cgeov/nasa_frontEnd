import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userDetails: any = {}

  //UNO ALMACENA TODA LA INFORMACIÓN MIENTRAS QUE EL OTRO SOLO LAS KEYS POR RENDIMIENTO
  wishList: Array<any> = [];
  wishListKeys: Array<string> = [];

  constructor() { }

  setWishList(source: any) {
    const articleFounded = this.wishList.findIndex(
      (article:any) => article.data[0].nasa_id == source.data[0].nasa_id
    );
    if (articleFounded == -1) {
      this.wishList.push(source);
      this.wishListKeys.push(source.data[0].nasa_id);
    } else {
      this.wishList.splice(articleFounded, 1);
      this.wishListKeys.splice(articleFounded, 1);
    }
  }
}
