import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WishlistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  setWishList(source: any) {
    const articleFounded = this.userService.wishList.findIndex(
      (article: any) => article.data[0].nasa_id == source.data[0].nasa_id
    );
    if (articleFounded == -1) {
      this.userService.wishList.push(source);
      this.userService.wishListKeys.push(source.data[0].nasa_id);
    } else {
      this.userService.wishList.splice(articleFounded, 1);
      this.userService.wishListKeys.splice(articleFounded, 1);
    }
  }

  //FUNCTION PARA REDIRIGIR A LA PÁGINA DE DETALLES
  redirect(nasaId: string) {
    this.dialogRef.close()
    this.router.navigateByUrl(`/details/${nasaId}`);
  }
}
