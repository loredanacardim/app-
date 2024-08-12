// CadastroEntradaTexto.tsx

interface EntradaTexto {
    id: number;
    label: string;
    placeholder: string;
    secureTextEntry?: boolean;
  }
  
  interface Checkbox {
    id: number;
    value: string;
  }
  
  interface Secao {
    id: number;
    titulo: string;
    entradaTexto: EntradaTexto[];
    checkbox: Checkbox[];
  }
  
  const secoes: Secao[] = [
    {
      id: 1,
      titulo: 'Insira alguns dados básicos',
      entradaTexto: [
        {
          id: 1,
          label: 'Nome',
          placeholder: 'Digite seu nome completo',
        },
        {
          id: 2,
          label: 'Email',
          placeholder: 'Digite seu email',
        },
        {
          id: 3,
          label: 'Crie uma senha',
          placeholder: 'Insira sua senha',
          secureTextEntry: true,
        },
        {
          id: 4,
          label: 'Confirme sua senha',
          placeholder: 'Insira sua senha',
          secureTextEntry: true,
        },
        {
          id: 5,
          label: 'Telefone',
          placeholder: '(00) 00000-0000',
        },
      ],
      checkbox: [],
    },
    {
      id: 2,
      titulo: 'Para finalizar, você deseja ter acesso a todas as estatísticas dos seus jogos?',
      entradaTexto: [],
      checkbox: [
        {
          id: 1,
          value: 'Sim',
        },
        {
          id: 2,
          value: 'Não',
        },
      ],
    },
  ];
  
  export { secoes };
  