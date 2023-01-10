import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MoviesModule } from "./movies/movies.module";
import { MovieOverviewComponent } from "./movies/movie-overview/movie-overview.component";
import { PageNotFoundComponent } from "./static-pages/page-not-found/page-not-found.component";
import { StaticPagesModule } from "./static-pages/static-pages.module";
import { LoginModule } from "./login/login.module";
import { RegisterComponent } from "./login/register/register.component";
import { AboutComponent } from "./static-pages/about/about.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "about", component: AboutComponent },
  { path: "movies", component: MovieOverviewComponent },
  { path: "movies/:id", component: MovieOverviewComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MoviesModule,
    HttpClientModule,
    StaticPagesModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
