import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter, useSearchParams } from 'expo-router';
import { Box } from 'native-base';
import { TEMAS } from '../estilos/temas';
import { RootStackParamList, SelectedStats, GameData } from '../types/types';

const RadioButton = ({ selected, onPress, label }: { selected: boolean, onPress: () => void, label: string }) => (
  <TouchableOpacity onPress={onPress} style={TEMAS.components.radioButton}>
    <Icon name={selected ? "dot-circle-o" : "circle-o"} size={24} color="black" />
    <Text style={TEMAS.components.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const StatisticsScreen: React.FC = () => {
  const router = useRouter();
  const { gameData } = useSearchParams() as { gameData: GameData };
  const [selectedStats, setSelectedStats] = useState<SelectedStats>(initialStats);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const toggleStat = (stat: keyof SelectedStats) => {
    setSelectedStats((prevState) => {
      const selectedStat = prevState[stat];

      if (typeof selectedStat === 'number') {
        return {
          ...prevState,
          [stat]: selectedStat + 1,
        };
      } else if ('total' in selectedStat && 'errors' in selectedStat) {
        return {
          ...prevState,
          [stat]: {
            ...selectedStat,
            total: selectedStat.total + 1,
            errors: (selectedStat.errors || 0) + 1,
          },
        };
      } else if ('total' in selectedStat && 'successes' in selectedStat) {
        return {
          ...prevState,
          [stat]: {
            ...selectedStat,
            total: selectedStat.total + 1,
            successes: (selectedStat.successes || 0) + 1,
          },
        };
      } else if ('total' in selectedStat && 'pointsWon' in selectedStat) {
        return {
          ...prevState,
          [stat]: {
            ...selectedStat,
            total: selectedStat.total + 1,
            pointsWon: (selectedStat.pointsWon || 0) + 1,
          },
        };
      }

      return prevState;
    });
  };

  const renderStat = (stat: keyof SelectedStats, label: string) => {
    const statData = selectedStats[stat];

    if (!statData) return null;

    return (
      <Box style={TEMAS.components.statItem} key={String(stat)}>
        <Text style={TEMAS.components.statText}>{label}</Text>
        {typeof statData === 'number' && (
          <Text>{statData}</Text>
        )}
        {typeof statData !== 'number' && 'total' in statData && 'errors' in statData && (
          <Text>{`${statData.errors} / ${statData.total}`}</Text>
        )}
        {typeof statData !== 'number' && 'total' in statData && 'successes' in statData && (
          <Text>{`${statData.successes} / ${statData.total}`}</Text>
        )}
        {typeof statData !== 'number' && 'total' in statData && 'pointsWon' in statData && (
          <Text>{`${((statData.pointsWon / statData.total) * 100).toFixed(2)}%`}</Text>
        )}
        <Icon name="check-square" size={20} color="black" />
      </Box>
    );
  };

  const handleShowDetailedStats = () => {
    router.push({ pathname: 'DetailedStatisticsScreen', params: { selectedStats } });
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSelectMessage = (message: string) => {
    setSelectedMessage(message);
  };

  return (
    <ScrollView contentContainerStyle={TEMAS.components.container}>
      {/* Top Bar */}
      <Box style={TEMAS.components.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={TEMAS.components.title}>ESTATÍSTICA DO JOGO</Text>
        <TouchableOpacity onPress={handleShowDetailedStats}>
          <Icon name="bar-chart" size={20} color="black" />
        </TouchableOpacity>
      </Box>

      {/* Main Content */}
      <View style={TEMAS.components.statSection}>
        {selectedOption === null && (
          <View style={TEMAS.components.optionsContainer}>
            <TouchableOpacity
              onPress={() => handleOptionSelect('athlete')}
              style={[
                TEMAS.components.optionButton,
                selectedOption === 'athlete' && TEMAS.components.optionButtonSelected,
              ]}
            >
              <Text style={TEMAS.components.optionText}>Estatística do Atleta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect('team')}
              style={[
                TEMAS.components.optionButton,
                selectedOption === 'team' && TEMAS.components.optionButtonSelected,
              ]}
            >
              <Text style={TEMAS.components.optionText}>Estatística da Dupla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect('messages')}
              style={[
                TEMAS.components.optionButton,
                selectedOption === 'messages' && TEMAS.components.optionButtonSelected,
              ]}
            >
              <Text style={TEMAS.components.optionText}>Mensagens</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedOption === 'athlete' && (
          <Box style={TEMAS.components.athletes}>
            <TouchableOpacity onPress={() => {}} style={TEMAS.components.optionButton}>
              <Text style={TEMAS.components.optionText}>{gameData.player1.name1} {gameData.player1.name2}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={TEMAS.components.optionButton}>
              <Text style={TEMAS.components.optionText}>{gameData.player2.name1} {gameData.player2.name2}</Text>
            </TouchableOpacity>
          </Box>
        )}

        {selectedOption === 'team' && (
          <Box style={TEMAS.components.teams}>
            <TouchableOpacity onPress={() => {}} style={TEMAS.components.optionButton}>
              <Text style={TEMAS.components.optionText}>Dupla 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={TEMAS.components.optionButton}>
              <Text style={TEMAS.components.optionText}>Dupla 2</Text>
            </TouchableOpacity>
          </Box>
        )}

        {selectedOption === 'messages' && (
          <Box style={TEMAS.components.messages}>
            {['NOME DO TORNEIO', 'PONTO DO GAME', 'PONTO DO JOGO', 'SET ENCERRADO', 'SET POINT', 'SUPER TIE-BREAK', 'TIE-BREAK', 'TROCA DE LADO'].map(option => (
              <TouchableOpacity key={option} onPress={() => handleSelectMessage(option)} style={TEMAS.components.messageOption}>
                <Text style={TEMAS.components.messageText}>{option}</Text>
                {selectedMessage === option && <Icon name="check" size={20} color="black" />}
              </TouchableOpacity>
            ))}
          </Box>
        )}
      </View>
    </ScrollView>
  );
};

const initialStats: SelectedStats = {
  ACCELERADA: { total: 0, errors: 0 },
  BREAK_POINT: { total: 0, successes: 0 },
  CURTA_ERRADA: { total: 0, errors: 0 },
  CURTA_VENCEDORA: { total: 0, successes: 0 },
  ERRO_SAQUE: { total: 0, errors: 0 },
  ERRO_DEVOLUCAO: { total: 0, errors: 0 },
  ERRO_NAO_FORCADO: 0,
  IGUAIS_40X40: { total: 0, pointsWon: 0 },
  LOB_ERRADO: { total: 0, errors: 0 },
  LOB_VENCEDOR: { total: 0, successes: 0 },
  PONTOS_MARCADOS: 0,
  SAQUES_CONFIRMADOS: { total: 0, successes: 0 },
  WINNER: { total: 0, successes: 0 },
  WINNER_DEVOLUCAO: { total: 0, successes: 0 },
};

export default StatisticsScreen;
