import './Game.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface CardType {
    backgroundColor: string;
    categoryName: string;
}

const GameCard: React.FC<CardType> = ({ backgroundColor, categoryName }) => {
    return (
        <div className='game-card-container'>
            <div className='game-card-label-container'>
                <span className='game-card-label'>{categoryName}</span>
            </div>
            <hr className='game-card-hr'></hr>
            <Card className='game-card' style={{ width: '4rem', height: '4rem', backgroundColor: backgroundColor }}>
                <Card.Title className='game-card-title'>Card Title</Card.Title>
            </Card>
        </div>
    );
}

export default GameCard;
