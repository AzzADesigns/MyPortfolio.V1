export function useWhatsApp(phone: string, defaultMessage: string) {
    const contact = (customMessage?: string) => {
        const message = customMessage || defaultMessage;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return { contact };
}