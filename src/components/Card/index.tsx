import './styles.css'

export interface CardProps {
    id: string;
    flipped?: boolean;
    back: string;
    handleClick?: (id: string) => void;
}

export function Card({ flipped = false, back, handleClick, id }: CardProps) {
    const cardContenNames = ['card_content'];
    flipped && cardContenNames.push('card_content_flipped')

    const handClickFn = () => {
        if (handleClick) {
            handleClick(id)
        }
    }

    return <div className="card" onClick={handClickFn}>
        <div className={cardContenNames.join(' ')}>
            <div className="card_face card_front">?</div>
            <div className="card_face card_back">
                <img src={back} alt='icone' />
            </div>
        </div>
    </div>
}