import React, { useContext } from 'react';
import './Bar.css';

const Bar = () => {
    return (
        <div className="navbar">
            <ul className='elements'>
                <li>
                    <button className='item'>Home</button>
                </li>
                <li>
                    <button className='item'>About</button>
                </li>
                <li>
                    <button className='item'>Skills</button>
                </li>
                <li>
                    <button className='item'>Projects</button>
                </li>
                <li>
                    <button className='item'>Contact</button>
                </li>
            </ul>
        </div>
    );
};

export default Bar;