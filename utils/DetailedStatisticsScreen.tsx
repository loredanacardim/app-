import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectedStats } from '../types/types';

interface Props {
  selectedStats: SelectedStats;
}

const DetailedStatisticsScreen: React.FC<Props> = ({ selectedStats }) => {
  // Função para renderizar cada estatística
  const renderStat = (
    statName: string,
    statValue: number | { total: number; errors?: number; successes?: number; pointsWon?: number }
  ) => {
    if (typeof statValue === 'number') {
      return (
        <View key={statName} style={styles.statItem}>
          <Text style={styles.statText}>{statName}</Text>
          <Text>{statValue}</Text>
        </View>
      );
    }

    // Desestruturando os valores para facilitar a renderização
    const { total, errors, successes, pointsWon } = statValue;

    return (
      <View key={statName} style={styles.statItem}>
        <Text style={styles.statText}>{statName}</Text>
        {errors !== undefined && (
          <Text>{`${errors} / ${total}`}</Text>
        )}
        {successes !== undefined && (
          <Text>{`${successes} / ${total}`}</Text>
        )}
        {pointsWon !== undefined && (
          <Text>{`${((pointsWon / total) * 100).toFixed(2)}%`}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas Detalhadas</Text>
      {/* Renderize aqui as estatísticas detalhadas utilizando selectedStats */}
      {Object.entries(selectedStats).map(([statName, statValue]) =>
        renderStat(statName, statValue)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailedStatisticsScreen;
