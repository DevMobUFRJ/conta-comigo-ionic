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
import { ContaService } from '../services/conta-service';

import { IonicStorageModule } from '@ionic/storage';
import { PessoaService } from '../services/pessoa-service';
import { ProdutoService } from '../services/produto-service';

import { BrMaskerModule } from 'brmasker-ionic-3';
import { ExpandableComponent } from '../components/expandable/expandable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    PessoasPage,
    ProdutosPage,
    PessoaModalPage,
    ProdutoModalPage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrMaskerModule
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
    ContaService,
    PessoaService,
    ProdutoService
  ]
})
export class AppModule {}
