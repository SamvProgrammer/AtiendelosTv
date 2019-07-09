import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CurrencyPipe } from '@angular/common';
import { GooglePlus } from '@ionic-native/google-plus';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { IonicStorageModule } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


import { BarPage } from '../pages/bar/bar';
import { CocinaPage } from '../pages/cocina/cocina';
import { MenuPage } from '../pages/menu/menu';
import { MenuSubPage } from '../pages/menu-sub/menu-sub';
import { MenuSubOrdenPage } from '../pages/menu-sub-orden/menu-sub-orden';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { TransaccionesdiaPage } from '../pages/transaccionesdia/transaccionesdia';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { UsuariosAddPage } from '../pages/usuarios-add/usuarios-add';
import { MesasPage } from '../pages/mesas/mesas';
import { ProductosPage } from '../pages/productos/productos';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { SucursalesAddPage } from '../pages/sucursales-add/sucursales-add';
import { RolesPage } from '../pages/roles/roles';
import { RolesAddPage } from '../pages/roles-add/roles-add';
import { CuentasDetallePage } from '../pages/cuentas-detalle/cuentas-detalle';
import { CuentasTotalPage } from '../pages/cuentas-total/cuentas-total';
import { CuentasResumenPage } from '../pages/cuentas-resumen/cuentas-resumen';
import { TicketsPage } from '../pages/tickets/tickets';
import { ProductosCategoriaPage } from '../pages/productos-categoria/productos-categoria';
import { ProductosProductosPage } from '../pages/productos-productos/productos-productos';
import { ProductosCategoriaAddPage } from '../pages/productos-categoria-add/productos-categoria-add';  
import { ProductosProductosAddPage } from '../pages/productos-productos-add/productos-productos-add';
import { ProductosProductosListayoutubePage } from '../pages/productos-productos-listayoutube/productos-productos-listayoutube';
import { InventariosPage } from '../pages/inventarios/inventarios';
import { InventariosAddPage } from '../pages/inventarios-add/inventarios-add';
import { HistorialPage } from '../pages/historial/historial';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { ConfiguracionEnlaceProductoinventarioPage } from '../pages/configuracion-enlace-productoinventario/configuracion-enlace-productoinventario';
import { ConfiguracionEnlaceProductoinventarioAddPage } from '../pages/configuracion-enlace-productoinventario-add/configuracion-enlace-productoinventario-add';
import { ConfiguracionEnlaceDetalleinventarioPage } from '../pages/configuracion-enlace-detalleinventario/configuracion-enlace-detalleinventario';
import { CajaPage } from '../pages/caja/caja';
import { CajaCortePage } from '../pages/caja-corte/caja-corte';
import { CajaMesaPage } from '../pages/caja-mesa/caja-mesa';
import { CuentasMesasPage } from '../pages/cuentas-mesas/cuentas-mesas';
import { CuentaDetalleConfigPage } from '../pages/cuenta-detalle-config/cuenta-detalle-config';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { BluetoothDispositivosPage } from '../pages/bluetooth-dispositivos/bluetooth-dispositivos';
import { ReportesMenuPage } from '../pages/reportes-menu/reportes-menu';
import { ReportesVentaPage } from '../pages/reportes-venta/reportes-venta';
import { ReportesVentaFechaPage } from '../pages/reportes-venta-fecha/reportes-venta-fecha';
import { MesasAddPage } from '../pages/mesas-add/mesas-add';
import { CuentasDetalleAntesdeenviarPage } from '../pages/cuentas-detalle-antesdeenviar/cuentas-detalle-antesdeenviar';
import { GestionUsuariosPage } from '../pages/gestion-usuarios/gestion-usuarios';
import { AutorizadosPage } from '../pages/autorizados/autorizados';
import {AmbosPage} from '../pages/ambos/ambos';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { SucursalesProvider } from '../providers/sucursales/sucursales';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { GlobalesProvider } from '../providers/globales/globales';
import { MesasProvider } from '../providers/mesas/mesas';
import { ProductosProvider } from '../providers/productos/productos';
import { RolesProvider } from '../providers/roles/roles';
import { ApiyoutubeProvider } from '../providers/apiyoutube/apiyoutube';
import { TicketsProvider } from '../providers/tickets/tickets';
import { InventarioProvider } from '../providers/inventario/inventario';
import { ReportesProvider } from '../providers/reportes/reportes';
import { ImpresionesProvider } from '../providers/impresiones/impresiones';
import { CortecajaProvider } from '../providers/cortecaja/cortecaja';
import { ConfiguracionMeseroProvider } from '../providers/configuracion-mesero/configuracion-mesero';
import { SocketProvider } from '../providers/socket/socket';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';

@NgModule({
  declarations: [
    MyApp,
    BarPage,
    CocinaPage,
    MenuPage,
    TabsPage,
    LoginPage,
    TransaccionesdiaPage,
    CuentasPage,
    UsuariosPage,
    UsuariosAddPage,
    MesasPage,
    SucursalesPage,
    ProductosPage,
    SucursalesAddPage,
    RolesPage,
    RolesAddPage,
    MenuSubPage,
    MenuSubOrdenPage,
    CuentasDetallePage,
    CuentasTotalPage,
    CuentasResumenPage,
    TicketsPage,
    ProductosCategoriaPage,
    ProductosProductosPage,
    ProductosCategoriaAddPage,
    ProductosProductosAddPage,
    ProductosProductosListayoutubePage,
    InventariosPage,
    InventariosAddPage,
    HistorialPage,
    ConfiguracionPage,
    ConfiguracionEnlaceProductoinventarioPage,
    ConfiguracionEnlaceProductoinventarioAddPage,
    ConfiguracionEnlaceDetalleinventarioPage,
    CajaPage,
    CajaCortePage,
    CajaMesaPage,
    CuentasMesasPage,
    CuentaDetalleConfigPage,
    BluetoothPage,
    BluetoothDispositivosPage,
    ReportesMenuPage,
    ReportesVentaPage,
    ReportesVentaFechaPage,
    MesasAddPage,
    CuentasDetalleAntesdeenviarPage,
    GestionUsuariosPage,
    AutorizadosPage,
    AmbosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BarPage,
    CocinaPage,
    MenuPage,
    TabsPage,
    LoginPage,
    TransaccionesdiaPage,
    CuentasPage,
    UsuariosPage,
    UsuariosAddPage,
    MesasPage,
    SucursalesPage,
    ProductosPage,
    SucursalesAddPage,
    RolesPage,
    RolesAddPage,
    MenuSubPage,
    MenuSubOrdenPage,
    CuentasDetallePage,
    CuentasTotalPage,
    CuentasResumenPage,
    TicketsPage,
    ProductosCategoriaPage,
    ProductosProductosPage,
    ProductosCategoriaAddPage,
    ProductosProductosAddPage,
    ProductosProductosListayoutubePage,
    InventariosPage,
    InventariosAddPage,
    HistorialPage,
    ConfiguracionPage,
    ConfiguracionEnlaceProductoinventarioPage,
    ConfiguracionEnlaceProductoinventarioAddPage,
    ConfiguracionEnlaceDetalleinventarioPage,
    CajaPage,
    CajaCortePage,
    CajaMesaPage,
    CuentasMesasPage,
    CuentaDetalleConfigPage,
    BluetoothPage,
    BluetoothDispositivosPage,
    ReportesMenuPage,
    ReportesVentaPage,
    ReportesVentaFechaPage,
    MesasAddPage,
    CuentasDetalleAntesdeenviarPage,
    GestionUsuariosPage,
    AutorizadosPage,
    AmbosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AndroidPermissions,
    UsuariosProvider,
    SucursalesProvider,
    CategoriasProvider,
    GlobalesProvider,
    MesasProvider,
    UsuariosProvider,
    ProductosProvider,
    RolesProvider,
    RolesProvider,
    ProductosProvider,
    ApiyoutubeProvider,
    YoutubeVideoPlayer,
    TicketsProvider,
    Vibration,
    SMS,
    CurrencyPipe,
    GooglePlus,
    InventarioProvider,
    ReportesProvider,
    DocumentViewer,
    File,
    FileTransfer,
    ImagePicker,
    Camera,
    BluetoothSerial,
    ImpresionesProvider,
    CortecajaProvider,
    ConfiguracionMeseroProvider,
    SocketProvider,
    LocalNotifications,NativeRingtones
  ]
})
export class AppModule {}
