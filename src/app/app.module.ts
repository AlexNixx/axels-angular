import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from './module/auth/auth.module';
import { ShopModule } from './module/shop/shop.module';

import { NgxsModule } from '@ngxs/store';
import { CartState } from './module/shop/state/cart.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        HttpClientModule,
        AuthModule,
        ShopModule,
        [NgxsModule.forRoot([CartState]), NgxsStoragePluginModule.forRoot()]
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
