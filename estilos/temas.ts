import { extendTheme } from 'native-base';

export const TEMAS = extendTheme({
  colors: {
    blue: {
      500: '#339CFF',
      800: '#0B3B60',
    },
    gray: '#D9D9D9',
    orange: '#E5820D',
    white: '#fff',
    black: '#000',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  fontWeights: {
    bold: 'bold', // Alterado 'padrao' para 'bold' para mais clareza e consistência
  },
  components: {
    Container: {
      baseStyle: {
        flex: 1,
        backgroundColor: 'white',
      },
    },
    TopBar: {
      baseStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'orange',
        paddingVertical: 8,
        paddingHorizontal: 20,
        height: 60,
      },
    },
    Title: {
      baseStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        flex: 1,
      },
    },
    StatSection: {
      baseStyle: {
        padding: 16,
        borderRadius: 8,
      },
    },
    OptionsContainer: {
      baseStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      },
    },
    OptionButton: {
      baseStyle: {
        backgroundColor: 'blue.500',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30%',
      },
    },
    OptionButtonSelected: {
      baseStyle: {
        backgroundColor: 'blue.800',
      },
    },
    OptionText: {
      baseStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    RadioButton: {
      baseStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      },
    },
    RadioLabel: {
      baseStyle: {
        marginLeft: 8,
        fontSize: 16,
      },
    },
    Athletes: {
      baseStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
    },
    Teams: {
      baseStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      },
    },
    Messages: {
      baseStyle: {
        flexDirection: 'column',
      },
    },
    MessageOption: {
      baseStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
    },
    MessageText: {
      baseStyle: {
        fontSize: 16,
      },
    },
    StatItem: {
      baseStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
    },
    StatText: {
      baseStyle: {
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  },
});
