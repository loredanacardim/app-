import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Configuracoes = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('usuario@exemplo.com'); // Exemplo de email definido para demonstração
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => console.log('Logout realizado') },
    ]);
  };

  const handleResetPassword = () => {
    Alert.alert('Resetar Senha', `Um email de reset de senha será enviado para ${email}`);
  };

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      Alert.alert('Deletar Conta', 'Conta deletada com sucesso');
      // Aqui você pode adicionar a lógica de deletar a conta
    } else {
      Alert.alert('Deletar Conta', 'Tem certeza que deseja deletar sua conta?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', onPress: () => setConfirmDelete(true) },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LogoMyScore.png')} style={styles.logo} />

      <Text style={styles.title}>Configurações</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login</Text>
        <Text>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opções</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.option}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.option}>Resetar Minha Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAccount}>
          <Text style={styles.option}>Deletar Minha Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
});

export default Configuracoes;
