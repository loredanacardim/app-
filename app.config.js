// app.config.js

export default {
    expo: {
      name: 'app-pudim-bt',
      slug: 'app-pudim-bt',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/images/icon.png',
      scheme: 'myapp',
      userInterfaceStyle: 'automatic',
      splash: {
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/images/adaptive-icon.png',
          backgroundColor: '#ffffff',
        },
      },
      web: {
        bundler: 'metro',
        output: 'static',
        favicon: './assets/images/favicon.png',
      },
      plugins: [
        'expo-router',
      ],
      experiments: {
        typedRoutes: true,
      },
      // Configuração de linking para React Navigation
      linking: {
        prefixes: ['myapp://', 'https://app-pudim-bt.com'],
        config: {
          screens: {
            Login: 'login',
            Cadastro: 'cadastro',
            
            // Adicione outras rotas conforme necessário
          },
        },
      },
    },
  };
  