export function useDownloadCV(filename = 'curriculum-Azariel-Moreno-dev.pdf') {
    const download = () => {
        const link = document.createElement('a');
        link.href = `/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return { download };
}