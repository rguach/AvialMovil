export const RutasBackend = {
    usuarios: {
        Authenticate: '/api/Usuarios/Autenticate',
    },
    vehiculos: {
        getMarcas: '/api/Marcas/GetMarcas',
        getModelos: '/api/Modelos/GetModelos',
        getClaseVehiculo: '/api/ClaseVehiculos/GetClaseVehiculos',
        getTipoVehiculo: '/api/TipoVehiculos/GetTipoVehiculos',
    },
    vehiculosPorPlaca:{
        get:"/api/Scrapping/GetVehiculoPorPlacas"
    },

    informeCopmpleto:{
        get:"/api/InformeCompleto/Get/Prerequisitos"
    },
    patiosRetencion:{
        get:"/api/Patioretencions/Get"
    },

    
}