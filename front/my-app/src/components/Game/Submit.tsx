import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

const Submit = () => {
    const [timeLeft, setTimeLeft] = useState(getTimeUntil14());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeUntil14());
        }, 1000); // Aktualizuje co sekundę

        return () => clearInterval(timer); // Czyści interwał, gdy komponent jest odmontowywany
    }, []);

    // Funkcja obliczająca czas do 14:00
    function getTimeUntil14() {
        const now = new Date();
        const next14 = new Date();
        next14.setHours(19, 25, 0, 0); 

        // Jeżeli już jest po 14:00, ustaw na następny dzień
        if (now > next14) {
            next14.setDate(next14.getDate() + 1);
            //localStorage.clear();
        }

        // Odejmujemy czas w milisekundach
        const difference = next14.getTime() - now.getTime();

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <Row className="submit-menu mb-3">
            <Row className="submit-title">
                <h3>Zgadłeś!</h3>
            </Row>
            <Row className="submit-timer">
                <h4>Do następnej gry pozostało: <br></br><span>{timeLeft}</span></h4>
            </Row>
        </Row>
    );
};

export default Submit;
