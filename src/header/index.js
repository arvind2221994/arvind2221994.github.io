import React, { useState, useContext } from 'react';
import MenuContext from '../context/MenuContext';
import { GiHamburgerMenu } from "react-icons/gi";
import '../header/index.css';

const Header = ({ name, tagline }) => {
    const { isExpanded, handleToggle } = useContext(MenuContext);

    return (<nav className="headerNav">
                {/* <div className="headerMenu">
                    <span>
                            <GiHamburgerMenu 
                            className="arrowButton" 
                            onClick={handleToggle}
                            style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
                            aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
                            />
                    </span>
                </div> */}
                <div className="middleHeader">
                    <h1>{name}</h1>
                    {tagline && <p>{tagline}</p>}
                </div>
          </nav>);
};
export default Header;