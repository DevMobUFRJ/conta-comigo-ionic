import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PessoasPage } from '../pages/pessoas/pessoas';
import { ProdutosPage } from '../pages/produtos/produtos';
import { PessoaModalPage } from '../pages/pessoa-modal/pessoa-modal';
import { ProdutoModalPage } from '../pages/produto-modal/produto-modal';
import { ContaService } from '../services/conta/conta-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    PessoasPage,
    ProdutosPage,
    PessoaModalPage,
    ProdutoModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    PessoasPage,
    ProdutosPage,    
    PessoaModalPage,
    ProdutoModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContaService
  ]
})
export class AppModule {}
