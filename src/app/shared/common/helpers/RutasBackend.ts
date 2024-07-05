export const RutasBackend = {
    usuarios: {
        Authenticate: '/api/Usuarios/Autenticate',
    },
    vehiculos: {
        GetMarcas: '/api/Marcas/GetMarcas',
        GetModelos: '/api/Modelos/GetModelos',
        GetClaseVehiculo: '/api/ClaseVehiculos/GetClaseVehiculos',
        GetTipoVehiculo: '/api/TipoVehiculos/GetTipoVehiculos',
    },
    vehiculosPorPlaca:{
        Get:"/api/Scrapping/GetVehiculoPorPlacas"
    },

    InformeCompleto:{
        Get:"/api/InformeCompleto/Get/Prerequisitos"
    }
}