import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface GameScoreCounterProps {
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const GameScoreCounter: React.FC<GameScoreCounterProps> = ({
  score,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.scoreContainer}>
      <TouchableOpacity onPress={onDecrement} accessible={true} accessibilityLabel="Decrementar pontuação">
        <Icon name="minus-circle" size={30} color="red" />
      </TouchableOpacity>

      <Text style={styles.score}>{score.toString().padStart(2, '0')}</Text>

      <TouchableOpacity onPress={onIncrement} accessible={true} accessibilityLabel="Incrementar pontuação">
        <Icon name="plus-circle" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  score: {
    fontSize: 20,
    marginHorizontal: 10,
  },
});

export default GameScoreCounter;
