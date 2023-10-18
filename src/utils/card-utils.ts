import { CardProps } from "../components/Card";
import { Cards } from "../data/cards";

const keyGen = (): string => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export const duplicateArray = <T>(arry: T[]): T[] => {
    return arry.concat(arry);
};

export const sortArray = <T>(arry: T[]): T[] => {
    return arry.sort(() => Math.random() - 0.5);
};

export const regenerateCard = (cards: CardProps[]): CardProps[] => {
    return cards.map((card) => ({ ...card, id: keyGen() }));
}

export const duplcateRegenerateSortyArray = (cards: CardProps[]): CardProps[] => {
    return sortArray(regenerateCard(duplicateArray(cards)));
}

console.log(duplcateRegenerateSortyArray(Cards));