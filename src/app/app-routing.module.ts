import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: 'products',
        loadChildren: () =>
            import('./module/shop/shop.module').then(
                module => module.ShopModule
            )
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./module/auth/auth.module').then(
                module => module.AuthModule
            )
    },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', component: NotFoundPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
