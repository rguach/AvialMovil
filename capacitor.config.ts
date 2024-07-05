import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AvialB',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 0,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'light',
    },
    Camera: {
      allowImageEditing: false,
      saveToGallery: true,
    },
    Geolocation: {},
    Filesystem: {},
    SQLite: {
      sync: true, // Ejemplo de configuración específica del plugin SQLite
    },
    // Otros plugins que estés utilizando
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    // Configuraciones específicas para iOS si las necesitas
  },
};

export default config;
