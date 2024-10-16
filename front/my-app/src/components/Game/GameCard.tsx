import './Game.css';
import Card from 'react-bootstrap/Card';

interface CardType {
    backgroundColor: string;
    categoryName: string;
    gameCategoryName: string | number;
}

const GameCard: React.FC<CardType> = ({ backgroundColor, categoryName, gameCategoryName }) => {
    return (
        <div className='game-card-container'>
            <Card className='game-card' style={{ width: '4rem', height: '4rem', backgroundColor: backgroundColor }}>
                <Card.Title className='game-card-title'>{gameCategoryName}</Card.Title>
            </Card>
        </div>
    );
}

export default GameCard;