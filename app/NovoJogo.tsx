import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, SafeAreaView, ScrollView, Image } from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Cronometro from '../utils/Cronometro'; // Ajustado para a nova estrutura
import Scoreboard from './Scoreboard'; // Ajustado para a nova estrutura
import bt_voltar from '../assets/images/bt_voltar.png'; // Ajustado para a nova estrutura
import bg_bt_azul from '../assets/images/bg_bt_azul.png'; // Ajustado para a nova estrutura
import { RootStackParamList } from '../types/types'; // Ajustado para a nova estrutura
import { StackNavigationProp } from '@react-navigation/stack';

type NovoJogoScreenProp = StackNavigationProp<RootStackParamList, 'NovoJogo'>;

const NovoJogo = () => {
  const router = useRouter(); // Uso do router do expo-router
  const [tournamentName, setTournamentName] = useState('');
  const [player1Name1, setPlayer1Name1] = useState('');
  const [player1Name2, setPlayer1Name2] = useState('');
  const [player2Name1, setPlayer2Name1] = useState('');
  const [player2Name2, setPlayer2Name2] = useState('');
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [country3, setCountry3] = useState<Country | null>(null);
  const [country4, setCountry4] = useState<Country | null>(null);
  const [advantageGames, setAdvantageGames] = useState(false);
  const [gameTime, setGameTime] = useState(false);
  const [gameStats, setGameStats] = useState(true);
  const [singlesGame, setSinglesGame] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const loadTournamentName = async () => {
      try {
        const savedTournamentName = await AsyncStorage.getItem('tournamentName');
        if (savedTournamentName) {
          setTournamentName(savedTournamentName);
        }
      } catch (error) {
        console.error('Failed to load the tournament name.', error);
      }
    };
    loadTournamentName();
  }, []);

  const handleStartGame = async () => {
    if (!player1Name1 || !player2Name1) {
      Alert.alert('Erro', 'O nome do primeiro jogador de cada dupla é obrigatório.');
      return;
    }

    if (!country1 || !country3) {
      Alert.alert('Erro', 'A bandeira do primeiro jogador de cada dupla é obrigatória.');
      return;
    }

    try {
      await AsyncStorage.setItem('tournamentName', tournamentName);

      const gameData = {
        tournamentName,
        player1: {
          name1: player1Name1,
          name2: player1Name2,
          country1: country1?.flag,
          country2: country2?.flag,
        },
        player2: {
          name1: player2Name1,
          name2: player2Name2,
          country1: country3?.flag,
          country2: country4?.flag,
        },
        advantageGames,
        gameTime,
        gameStats,
        singlesGame,
      };

      console.log('Navigating to Scoreboard with gameData:', gameData);
      router.push({
        pathname: '/Scoreboard',
        params: { gameData },
      });
    } catch (error) {
      console.error('Failed to save the tournament name.', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Image source={bt_voltar} style={styles.buttonImageVoltar} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Jogo</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>NOME DO TORNEIO</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.tournamentInput]}
              value={tournamentName}
              onChangeText={setTournamentName}
              placeholder="Nome do Torneio"
            />
          </View>
          <Text style={styles.subTitle}>ATLETAS</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={player1Name1}
              onChangeText={setPlayer1Name1}
              placeholder='ATLETA 1 - DUPLA 1'
            />
            <CountryPicker
              withFilter
              withFlag
              countryCode={country1 ? country1.cca2 : undefined}
              onSelect={(country: Country) => setCountry1(country)}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={player1Name2}
              onChangeText={setPlayer1Name2}
              placeholder='ATLETA 2 - DUPLA 1'
            />
            <CountryPicker
              withFilter
              withFlag
              countryCode={country2 ? country2.cca2 : undefined}
              onSelect={(country: Country) => setCountry2(country)}
            />
          </View>
          <Text style={styles.vs}>----------------VS----------------</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={player2Name1}
              onChangeText={setPlayer2Name1}
              placeholder='ATLETA 1 - DUPLA 2'
            />
            <CountryPicker
              withFilter
              withFlag
              countryCode={country3 ? country3.cca2 : undefined}
              onSelect={(country: Country) => setCountry3(country)}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={player2Name2}
              onChangeText={setPlayer2Name2}
              placeholder='ATLETA 2 - DUPLA 2'
            />
            <CountryPicker
              withFilter
              withFlag
              countryCode={country4 ? country4.cca2 : undefined}
              onSelect={(country: Country) => setCountry4(country)}
            />
          </View>
          <Text style={styles.subTitle}>FORMATO DE DISPUTA</Text>
          <View style={styles.row}>
            <Text>Games com vantagem?</Text>
            <Switch value={advantageGames} onValueChange={setAdvantageGames} />
          </View>
          <View style={styles.row}>
            <Text>Games cronometrados?</Text>
            <Switch value={gameTime} onValueChange={setGameTime} />
          </View>
          <View style={styles.row}>
            <Text>Estatísticas do jogo?</Text>
            <Switch value={gameStats} onValueChange={setGameStats} />
          </View>
          <View style={styles.row}>
            <Text>Jogo de simples?</Text>
            <Switch value={singlesGame} onValueChange={setSinglesGame} />
          </View>
          {gameTime && <Cronometro start={startTimer} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 60, // Ajuste a altura do cabeçalho conforme necessário
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  button: {
    padding: 10,
  },
  startButton: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  buttonImageVoltar: {
    width: 50,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  tournamentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
  vs: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default NovoJogo;
