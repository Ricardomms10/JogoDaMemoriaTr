import { duplcateRegenerateSortyArray } from '../../utils/card-utils';
import { CardProps, Card } from '../Card';
import { useRef, useState } from 'react';
import './styles.css';
import tigrao from '../../assets/image/tigrao.jpg';

export interface GridProps {
    cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
    const [stateCards, setStateCards] = useState(() => {
        return duplcateRegenerateSortyArray(cards);
    });

    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);
    const unflip = useRef(false);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar a visibilidade do pop-up

    const handleReset = () => {
        setStateCards(duplcateRegenerateSortyArray(cards));
        first.current = null;
        second.current = null;
        unflip.current = false;
        setMatches(0);
        setMoves(0);
        setShowPopup(false);
    }

    const handleClick = (id: string) => {
        const newStateCards = stateCards.map((card) => {
            if (card.id !== id) return card;
            if (card.flipped) return card;
            if (unflip.current && first.current && second.current) {
                first.current.flipped = false;
                second.current.flipped = false;
                first.current = null;
                second.current = null;
                unflip.current = false;
            }
            if (first.current == null) {
                first.current = card;
            } else if (second.current == null) {
                second.current = card;
            }
            if (first.current && second.current) {
                if (first.current.back === second.current.back) {
                    first.current = null;
                    second.current = null;
                    setMatches((m) => m + 1)

                    if (matches + 1 === stateCards.length / 2) {
                        setShowPopup(true);
                    }
                } else {
                    unflip.current = true;
                }
                setMoves((m) => m + 1)
            }
            card.flipped = true;
            return card;
        });

        setStateCards(newStateCards);
    }

    return (
        <>
            {showPopup && (
                <div className="overlay">
                    <div className="popup">
                        <h2>Mega Ganho!</h2>
                        <h4>Zero reais mas exercitou sua mente!</h4>
                        <p>Moves: {moves}</p>
                        <button className='close-button ' onClick={handleReset}>Jogue de Novo</button>
                    </div>
                </div>
            )}
            <div className='contender'>
                <div className="text">
                    <h1>
                        Tigrinho da Memória
                    </h1>
                    <div className='boxImg'>
                        <img src={tigrao} alt='Tigre' className='tigre' />
                    </div>
                </div>
                <div className="boxMoves">
                    <p>
                        Moves:
                        <span className="moves-container">{moves}</span>
                        | Matches:
                        <span className="matches-container">{matches}</span>
                        <button className='BtnReset' onClick={handleReset}>Reset</button>
                    </p>
                </div>
            </div>
            <div className="grid">
                {stateCards.map((card) => {
                    return <Card {...card} key={card.id} handleClick={handleClick} />
                })}
            </div>
        </>
    );
}