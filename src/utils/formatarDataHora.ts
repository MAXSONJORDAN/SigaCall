export function formatarDataHora(data: Date) {
    const options: any = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return data.toLocaleString('pt-BR', options);
}


export function formatarHora12(data: Date) {
    const options: any = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    // Defina a hora desejada, neste caso, 10:00 AM
    const horaDesejada = data;
    // horaDesejada.setUTCHours(10, 0, 0, 0);

    // Ajuste a data para ter a mesma data que a entrada, mas com a hora desejada
    const dataAjustada = new Date(data);
    dataAjustada.setUTCHours(horaDesejada.getUTCHours(), horaDesejada.getUTCMinutes(), 0, 0);

    return dataAjustada.toLocaleString('pt-BR', options);
}
