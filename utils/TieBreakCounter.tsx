import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TieBreakCounterProps {
  score: number;
  onIncrement: () => void;
}

const TieBreakCounter: React.FC<TieBreakCounterProps> = ({ score, onIncrement }) => {
  return (
    <TouchableOpacity onPress={onIncrement} style={styles.button}>
      <View style={styles.tieBreakContainer}>
        <Text style={styles.tieBreakScore}>{score}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Adicione qualquer estilo específico do botão se necessário
  },
  tieBreakContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  tieBreakScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TieBreakCounter;
