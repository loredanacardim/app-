import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import bt_registrar from '../assets/images/bt_registrar.png';
import bt_voltar from '../assets/images/bt_voltar.png';
import bt_sim from '../assets/images/bt_sim.png';
import bt_nao from '../assets/images/bt_nao.png';

const Cadastro = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState<'Sim' | 'Não' | null>(null); // Corrigido

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword || !phone || !selectedOption) {
      Alert.alert('Preenchimento obrigatório', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Senhas não coincidem', 'As senhas digitadas não coincidem.');
      return;
    }

    // Redirecionamento com base na opção selecionada
    if (selectedOption === 'Sim') {
      router.push('/PagamentoPayPal');
    } else {
      router.push('/NovoJogo');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.buttonVoltar}>
          <Image source={bt_voltar} style={styles.buttonVoltarImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insira alguns dados básicos</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="(00) 00000-0000"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Para finalizar, você deseja ter acesso a todas as estatísticas dos seus jogos?
        </Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setSelectedOption('Sim')}
            style={[
              styles.checkbox,
              selectedOption === 'Sim' && styles.selectedCheckbox,
            ]}
          >
            <Image source={bt_sim} style={styles.checkboxImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedOption('Não')}
            style={[
              styles.checkbox,
              selectedOption === 'Não' && styles.selectedCheckbox,
            ]}
          >
            <Image source={bt_nao} style={styles.checkboxImage} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Image source={bt_registrar} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  buttonVoltar: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonVoltarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    width: 60,
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  checkbox: {
    padding: 10,
  },
  checkboxImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  selectedCheckbox: {
    backgroundColor: '#f0f0f0',
  },
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

export default Cadastro;
