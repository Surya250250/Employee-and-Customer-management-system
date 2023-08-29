import React, { useState } from 'react';
import './Dropdown.css'; // Make sure to create a CSS file for styling

const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                Click me
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <a href="#">Option 1</a>
                    <a href="#">Option 2</a>
                    <a href="#">Option 3</a>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
