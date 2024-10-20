
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate("/");
    }
    
    return (
        <Row className="start-up-menu mb-3">
            <Col md={4} className="d-flex justify-content-center align-items-center" style={{ minHeight: '80px' }}>
                <FontAwesomeIcon className="gear-icon" icon={faGear} />
            </Col>
            <Col md={4} className="d-flex justify-content-center align-items-center" style={{ minHeight: '80px' }}>
                <Image className="logo-icon" onClick={goToHomePage} src="../../../images/Gamedle.png" fluid />
            </Col>
            <Col md={4} className="d-flex justify-content-center align-items-center" style={{ minHeight: '80px' }}>
                <Image className="poland-icon" src="../../../images/Poland.png" fluid />
            </Col>
        </Row>
    );
};

export default Header;
