export function cumprimentoDoDia() {
    const diasDaSemana = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
      "Quinta-feira", "Sexta-feira", "Sábado"
    ];
    const hoje = new Date();
    const diaDaSemana = hoje.getDay();
  
    // Verifica o dia da semana e retorna a saudação apropriada
    switch (diaDaSemana) {
      case 0:
        return `Tenha um ótimo ${diasDaSemana[0]}`;
      case 1:
        return `Tenha uma ótima ${diasDaSemana[1]}`;
      case 2:
        return `Tenha uma ótima ${diasDaSemana[2]}`;
      case 3:
        return `Tenha uma ótima ${diasDaSemana[3]}`;
      case 4:
        return `Tenha uma ótima ${diasDaSemana[4]}`;
      case 5:
        return `Tenha uma ótima ${diasDaSemana[5]}`;
      case 6:
        return `Tenha um ótimo ${diasDaSemana[6]}`;
      default:
        return "Tenha um ótimo dia!";
    }
  }