import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const PlaySelection: React.FC = () => {
  const [selectedPlayerServe, setSelectedPlayerServe] = useState<string | null>(null);
  const [selectedPlayerPlay, setSelectedPlayerPlay] = useState<string | null>(null);
  const [selectedOptionServe, setSelectedOptionServe] = useState<string>('NONE');
  const [selectedOptionPlay, setSelectedOptionPlay] = useState<string>('NONE');

  const router = useRouter();

  const handlePlayerServeSelection = (player: string) => {
    setSelectedPlayerServe(player);
  };

  const handlePlayerPlaySelection = (player: string) => {
    setSelectedPlayerPlay(player);
  };

  const handleOptionServeSelection = (option: string) => {
    setSelectedOptionServe(option);
  };

  const handleOptionPlaySelection = (option: string) => {
    setSelectedOptionPlay(option);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nome do Torneio</Text>
      
      <Text style={styles.subtitle}>Atleta no saque:</Text>
      <View style={styles.row}>
        {['player1_team1', 'player2_team1', 'player1_team2', 'player2_team2'].map((player) => (
          <TouchableOpacity
            key={player}
            style={[styles.playerButton, selectedPlayerServe === player && styles.selectedButton]}
            onPress={() => handlePlayerServeSelection(player)}
          >
            <Text>{`Atleta ${player.split('_')[0]} - Dupla ${player.split('_')[1]}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.row}>
        {['ACE', 'ERRO SAQUE', 'WINNER', 'ACELERADA', 'SMASH IN', 'SMASH OUT', 'E.N.F.', 'LOB VENCEDOR', 'LOB FORA', 'CURTA VENCEDORA', 'CURTA ERRADA'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selectedOptionServe === option && styles.selectedOptionButton]}
            onPress={() => handleOptionServeSelection(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Atleta em execução:</Text>
      <View style={styles.row}>
        {['player1_team1', 'player2_team1', 'player1_team2', 'player2_team2'].map((player) => (
          <TouchableOpacity
            key={player}
            style={[styles.playerButton, selectedPlayerPlay === player && styles.selectedButton]}
            onPress={() => handlePlayerPlaySelection(player)}
          >
            <Text>{`Atleta ${player.split('_')[0]} - Dupla ${player.split('_')[1]}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.row}>
        {['E.N.F.', 'ERRO DEVOL.', 'WINNER DEVOL.', 'WINNER', 'SMASH IN', 'SMASH OUT', 'ACELERADA', 'LOB VENC.', 'LOB FORA', 'CURTA VENC.', 'CURTA ERRADA', 'NONE'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selectedOptionPlay === option && styles.selectedOptionButton]}
            onPress={() => handleOptionPlaySelection(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.back()}
      >
        <Text>CONFIRMAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  playerButton: {
    padding: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#87CEEB',
  },
  optionButton: {
    padding: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    marginBottom: 8,
    flexBasis: '48%',
  },
  selectedOptionButton: {
    backgroundColor: '#87CEEB',
  },
  confirmButton: {
    padding: 16,
    backgroundColor: '#32CD32',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default PlaySelection;
