import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/services/data.service';
import { VehiculoPorPlacaService } from './shared/services/vehiculosPorPlaca.service';
import { ExploreSegmentComponentModule } from './pages/reports/explore-segments/explore-segments.module';
// import { PrismaModule } from 'src/prisma/prisma.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule, 
      ExploreSegmentComponentModule,    
      IonicStorageModule.forRoot({
        name: 'avialb',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
      HttpClientModule
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'CapacitorSQLite',
      useFactory: () => {
        if (Capacitor.isNativePlatform()) {
          return CapacitorSQLite;
        } else {
          // Aquí podrías proporcionar una implementación alternativa para web si es necesario
          return null;
        }
      }
    },
    DataService,
    VehiculoPorPlacaService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}