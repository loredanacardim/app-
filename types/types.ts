export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    NovoJogo: undefined;
    Scoreboard: {
      gameData: GameData;
    };
    StatisticsScreen: undefined;
    Configuracoes: undefined;
    PlaySelection: undefined;
    GameScoreCounter: undefined;
    DetailedStatisticsScreen: { selectedStats: SelectedStats };
    ShareScoreboardScreen: { scoreboardLink: string };
  };
  
  
  
  export interface GameData {
    tournamentName: string;
    player1: {
      name1: string;
      name2: string;
      country1: string | undefined;
      country2: string | undefined;
    };
    player2: {
      name1: string;
      name2: string;
      country1: string | undefined;
      country2: string | undefined;
    };
  };
  
  export type SelectedStats = {
    ACCELERADA: { total: number; errors: number };
    BREAK_POINT: { total: number; successes: number };
    CURTA_ERRADA: { total: number; errors: number };
    CURTA_VENCEDORA: { total: number; successes: number };
    ERRO_SAQUE: { total: number; errors: number };
    ERRO_DEVOLUCAO: { total: number; errors: number };
    ERRO_NAO_FORCADO: number;
    IGUAIS_40X40: { total: number; pointsWon: number };
    LOB_ERRADO: { total: number; errors: number };
    LOB_VENCEDOR: { total: number; successes: number };
    PONTOS_MARCADOS: number;
    SAQUES_CONFIRMADOS: { total: number; successes: number };
    WINNER: { total: number; successes: number };
    WINNER_DEVOLUCAO: { total: number; successes: number };
    VISUALIZACAO_15?: number;
    VISUALIZACAO_30?: number;
    VISUALIZACAO_60?: number;
    VISUALIZACAO_90?: number;
  };
  