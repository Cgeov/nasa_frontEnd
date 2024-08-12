import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import { UserServiceService } from "src/app/services/user-service.service";
import { WishlistComponent } from "../wishlist/wishlist.component";
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    public userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async signInWithGoogle() {
    try {
      await this.afAuth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          this.userService.userDetails = result.additionalUserInfo?.profile;
          this.snackBar.open(
            "Bienvenido " + this.userService.userDetails["given_name"],
            "x",
            {
              duration: 3000,
            }
          );
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  openwishlist() {
    let dialogRef = this.dialog.open(WishlistComponent, {
      height: "400px",
      width: "600px",
      data: "hola",
      hasBackdrop: true,
      maxWidth: "500px",
      minWidth: "80%",
      minHeight: "80%",
      maxHeight: "100%",
    });
  }

  openProfile() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      height: "400px",
      width: "600px",
      data: "hola",
      hasBackdrop: true,
      maxWidth: "500px",
      minWidth: "80%",
      minHeight: "min-content",
      maxHeight: "min-content",
    });
  }

  navigation(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.userService.userDetails = {};
    });
  }
}
