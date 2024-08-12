import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter, useSearchParams } from 'expo-router';

const ShareScoreboardScreen: React.FC = () => {
  const router = useRouter();
  const { gameData } = useSearchParams();

  // Aqui você pode gerar o link com base nos dados do placar
  const generateScoreboardLink = () => {
    // Lógica para gerar o link
    return 'https://example.com/scoreboard'; // Substitua pela lógica real de geração de link
  };

  const handleCopyLink = () => {
    const scoreboardLink = generateScoreboardLink();
    Clipboard.setStringAsync(scoreboardLink);
    // Implemente lógica para feedback ao usuário, se necessário
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Link do Placar</Text>
      <TouchableOpacity style={styles.button} onPress={handleCopyLink}>
        <Text style={styles.buttonText}>Copiar Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ShareScoreboardScreen;
