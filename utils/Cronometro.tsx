// Cronometro.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CronometroProps {
  start: boolean;
}

const Cronometro: React.FC<CronometroProps> = ({ start }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>; // Tipo para o timer

    if (start) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
      clearInterval(timer); // Limpa o timer quando start é false
    }

    // Limpa o timer ao desmontar o componente ou quando start muda
    return () => {
      clearInterval(timer);
    };
  }, [start]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7F4F3', // Adicionando uma cor de fundo para melhorar a visibilidade
    borderRadius: 10, // Adicionando bordas arredondadas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Adicionando uma cor para o texto
  },
});

export default Cronometro;
