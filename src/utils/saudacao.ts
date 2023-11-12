export function saudacaoDoDia() {
    const agora = new Date();
    const hora = agora.getHours();
  
    let saudacao;
  
    if (hora >= 5 && hora < 12) {
      saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
      saudacao = "Boa tarde";
    } else {
      saudacao = "Boa noite";
    }
  
    return saudacao;
  }