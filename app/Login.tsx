import React from 'react';
import { VStack, Image, Text, Box, FormControl, Input, Link } from 'native-base';
import { TEMAS } from '../estilos/temas'; // Ajustado para a nova estrutura
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Titulo } from '@/components/Titulo'; // Ajustado para a nova estrutura
import LogoMyScore from '../assets/images/LogoMyScore.png'; // Ajustado para a nova estrutura
import bt_entrar from '../assets/images/bt_entrar.png'; // Ajustado para a nova estrutura
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const handleRegister = () => {
    // Implementar a lógica necessária para lidar com o registro do usuário
    console.log('Handle register function');
  };

  return (
    <VStack flex={1} bgColor={TEMAS.colors.orange} alignItems="center" justifyContent="center" p={5}>
      <Image source={LogoMyScore} alt="Logo da Empresa" size="lg" mt={5} />

      <Titulo>Faça login em sua conta</Titulo>
      <Box>
        <FormControl mt={3}>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            placeholder="Insira seu endereço de e-mail"
            size="lg"
            w="100%"
            borderRadius="lg"
            bgColor="orange.100"
            shadow={3}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input
            placeholder="Insira sua senha"
            size="lg"
            w="100%"
            borderRadius="lg"
            bgColor="orange.100"
            shadow={3}
          />
        </FormControl>
      </Box>

      {/* TouchableOpacity para o botão de login */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Image source={bt_entrar} style={styles.buttonImage} />
      </TouchableOpacity>

      <Link href="" mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => router.push('/Cadastro')}>
          <Text color="blue.700">Faça seu cadastro!</Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}

// Definindo os estilos utilizando StyleSheet.create
const styles = StyleSheet.create({
  registerButton: {
    width: '80%',
    height: 60,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
