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
