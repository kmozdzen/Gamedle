
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CategoryButton = ({ title, description, page }) => {
    const navigate = useNavigate();

    const moveToClassicCategoryPage = () => {
        console.log('asdasd')
        navigate(page);
    }
    
    return (
        <Button onClick={moveToClassicCategoryPage} className="category-button" variant="warning">
            <div className="category-title">{title}</div>
            <div className="category-description">{description}</div>
        </Button>
    );
};

export default CategoryButton;
