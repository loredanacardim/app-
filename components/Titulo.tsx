import { Text, ITextProps } from 'native-base';
import { ReactNode } from 'react';

interface TituloProps extends ITextProps {
  children: ReactNode;
}

export function Titulo({ children, ...rest }: TituloProps) {
  return (
    <Text
      fontSize="xl" // Ajustado para usar a definição do tema
      fontWeight="bold" // Usando o 'bold' conforme o tema
      color="black" // Pode ser alterado para usar a cor do tema, se necessário
      textAlign="center"
      mt={5}
      {...rest}
    >
      {children}
    </Text>
  );
}
