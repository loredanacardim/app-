// app/index.tsx

import React from 'react';
import { NativeBaseProvider } from 'native-base'; // Importa o NativeBaseProvider
import Login from './Login'; // Importa o componente de login diretamente

export default function Index() {
  return (
    <NativeBaseProvider>
      <Login /> {/* Renderiza o componente de Login dentro do NativeBaseProvider */}
    </NativeBaseProvider>
  );
}
