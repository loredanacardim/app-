import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import GameScoreCounter from '../utils/GameScoreCounter'; // Ajustado para a nova estrutura
import { ScrollView } from 'native-base';
import icone_relogio from '../assets/icone_relogio.png'; // Ajustado para a nova estrutura
import bt_estatistica from '../assets/images/bt_estatistica.png'; // Ajustado para a nova estrutura
import bt_voltar from '../assets/images/bt_voltar.png'; // Ajustado para a nova estrutura
import bt_ENVIAR_link from '../assets/images/bt_ENVIAR_LINK.png'; // Ajustado para a nova estrutura
import { RootStackParamList } from '../types/types'; // Ajustado para a nova estrutura
import { RouteProp } from '@react-navigation/native';

type ScoreboardRouteProp = RouteProp<RootStackParamList, 'Scoreboard'>;

interface ScoreboardProps {
  route: ScoreboardRouteProp;
}

interface PlayerData {
  name1: string;
  name2: string;
}

interface GameData {
  tournamentName: string;
  player1: PlayerData;
  player2: PlayerData;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ route }) => {
  const router = useRouter();
  const { gameData } = route.params;

  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [gamesPlayer1, setGamesPlayer1] = useState(0);
  const [gamesPlayer2, setGamesPlayer2] = useState(0);
  const [setsPlayer1, setSetsPlayer1] = useState(0);
  const [setsPlayer2, setSetsPlayer2] = useState(0);
  const [isTieBreak, setIsTieBreak] = useState(false);
  const [isPlaySelectionVisible, setIsPlaySelectionVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // UseClipboard hook
  const [, setClipboardString] = useClipboard();

  const generateScoreboardLink = () => {
    const scoreboardData = {
      tournamentName: gameData.tournamentName,
      player1: gameData.player1,
      player2: gameData.player2,
      scorePlayer1,
      scorePlayer2,
      gamesPlayer1,
      gamesPlayer2,
      setsPlayer1,
      setsPlayer2,
      isTieBreak,
    };

    // Converte os dados do placar em uma string JSON
    const scoreboardDataString = JSON.stringify(scoreboardData);

    // Gera o link com os dados do placar
    const scoreboardLink = `https://sua-url-de-placar.com/?data=${encodeURIComponent(scoreboardDataString)}`;

    // Copia o link para a área de transferência
    setClipboardString(scoreboardLink);
  };

  useEffect(() => {
    if (isPlaySelectionVisible) {
      router.push('/PlaySelection');
      setIsPlaySelectionVisible(false);
    }
  }, [isPlaySelectionVisible, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else if (!isTimerRunning && elapsedTime !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isTimerRunning, startTime, elapsedTime]);

  const handleRestart = () => {
    setScorePlayer1(0);
    setScorePlayer2(0);
    setGamesPlayer1(0);
    setGamesPlayer2(0);
    setSetsPlayer1(0);
    setSetsPlayer2(0);
    setIsTieBreak(false);
    setElapsedTime(0);
    setStartTime(0);
    setIsTimerRunning(false);
  };

  const handleBack = () => {
    router.back();
  };

  const handleIncrementPlayer1 = () => {
    setIsPlaySelectionVisible(true);
    if (!isTieBreak) {
      if (scorePlayer1 === 0) {
        setScorePlayer1(15);
        if (!isTimerRunning) {
          startTimer();
        }
      } else if (scorePlayer1 === 15) {
        setScorePlayer1(30);
      } else if (scorePlayer1 === 30) {
        setScorePlayer1(40);
      } else if (scorePlayer1 === 40 && scorePlayer2 < 40) {
        setGamesPlayer1(gamesPlayer1 + 1);
        setScorePlayer1(0);
        setScorePlayer2(0);
        setIsTimerRunning(false);
      }
    } else {
      // Implementar a lógica para o tie-break
    }
  };

  const handleDecrementPlayer1 = () => {
    if (!isTieBreak) {
      if (scorePlayer1 === 40 && scorePlayer2 < 40) {
        setScorePlayer1(30);
      } else if (scorePlayer1 === 30) {
        setScorePlayer1(15);
      } else if (scorePlayer1 === 15) {
        setScorePlayer1(0);
        if (isTimerRunning) {
          setIsTimerRunning(false);
        }
      }
    } else {
      // Implementar a lógica para o tie-break
    }
  };

  const handleIncrementPlayer2 = () => {
    setIsPlaySelectionVisible(true);
    if (!isTieBreak) {
      if (scorePlayer2 === 0) {
        setScorePlayer2(15);
        if (!isTimerRunning) {
          startTimer();
        }
      } else if (scorePlayer2 === 15) {
        setScorePlayer2(30);
      } else if (scorePlayer2 === 30) {
        setScorePlayer2(40);
      } else if (scorePlayer2 === 40 && scorePlayer1 < 40) {
        setGamesPlayer2(gamesPlayer2 + 1);
        setScorePlayer1(0);
        setScorePlayer2(0);
        setIsTimerRunning(false);
      }
    } else {
      // Implementar a lógica para o tie-break
    }
  };

  const handleDecrementPlayer2 = () => {
    if (!isTieBreak) {
      if (scorePlayer2 === 40 && scorePlayer1 < 40) {
        setScorePlayer2(30);
      } else if (scorePlayer2 === 30) {
        setScorePlayer2(15);
      } else if (scorePlayer2 === 15) {
        setScorePlayer2(0);
        if (isTimerRunning) {
          setIsTimerRunning(false);
        }
      }
    } else {
      // Implementar a lógica para o tie-break
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTieBreak = () => {
    setIsTieBreak(!isTieBreak);
  };

  useEffect(() => {
    if (!isTieBreak && gamesPlayer1 === 6 && gamesPlayer2 <= 4) {
      setSetsPlayer1(setsPlayer1 + 1);
      setGamesPlayer1(0);
      setGamesPlayer2(0);
    } else if (!isTieBreak && gamesPlayer2 === 6 && gamesPlayer1 <= 4) {
      setSetsPlayer2(setsPlayer2 + 1);
      setGamesPlayer1(0);
      setGamesPlayer2(0);
    }

    if (!isTieBreak && gamesPlayer1 === 6 && gamesPlayer2 === 6) {
      setIsTieBreak(true);
    }
  }, [gamesPlayer1, gamesPlayer2, isTieBreak]);

  const handleStatistics = () => {
    router.push('/StatisticsScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Image source={bt_voltar} style={styles.buttonImageVoltar} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{gameData.tournamentName}</Text>
        <TouchableOpacity onPress={handleRestart} style={styles.restartButton}>
          <Icon name="refresh" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.gameContainer}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>{gameData.player1.name1}</Text>
            <Text style={styles.playerScore}>{scorePlayer1}</Text>
            <TouchableOpacity onPress={handleIncrementPlayer1} style={styles.button}>
              <Text style={styles.buttonText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDecrementPlayer1} style={styles.button}>
              <Text style={styles.buttonText}>-1</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>{gameData.player2.name2}</Text>
            <Text style={styles.playerScore}>{scorePlayer2}</Text>
            <TouchableOpacity onPress={handleIncrementPlayer2} style={styles.button}>
              <Text style={styles.buttonText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDecrementPlayer2} style={styles.button}>
              <Text style={styles.buttonText}>-1</Text>
            </TouchableOpacity>
          </View>

          <GameScoreCounter
            scorePlayer1={scorePlayer1}
            scorePlayer2={scorePlayer2}
            gamesPlayer1={gamesPlayer1}
            gamesPlayer2={gamesPlayer2}
            setsPlayer1={setsPlayer1}
            setsPlayer2={setsPlayer2}
            isTieBreak={isTieBreak}
            toggleTieBreak={toggleTieBreak}
            elapsedTime={formatTime(elapsedTime)}
            isTimerRunning={isTimerRunning}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleStatistics} style={styles.statsButton}>
            <Image source={bt_estatistica} style={styles.statsImage} />
          </TouchableOpacity>

          <TouchableOpacity onPress={generateScoreboardLink} style={styles.shareButton}>
            <Image source={bt_ENVIAR_link} style={styles.shareImage} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 8,
  },
  buttonImageVoltar: {
    width: 24,
    height: 24,
  },
  restartButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  gameContainer: {
    padding: 16,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerScore: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statsButton: {
    padding: 8,
  },
  statsImage: {
    width: 24,
    height: 24,
  },
  shareButton: {
    padding: 8,
  },
  shareImage: {
    width: 24,
    height: 24,
  },
});

export default Scoreboard;
