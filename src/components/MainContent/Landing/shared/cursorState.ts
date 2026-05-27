let posX = -2000;
let posY = -2000;

export const getCursorPosition = () => ({ x: posX, y: posY });
export const setCursorPosition = (x: number, y: number) => {
    posX = x;
    posY = y;
};
