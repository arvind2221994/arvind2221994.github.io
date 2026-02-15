import React, {useState, useEffect} from 'react';
import "./TitleCard.css";
import resumeData from '../data/resumeData.json';
import ContactSection from './ContactSection';

const TitleCard = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const { name,contact,description } = resumeData.about;
    const imageUrl = './profile.png';

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            setIsImageLoaded(true);
        };
    }, [imageUrl]);
    return (
        <div className="title-card">
            {isImageLoaded ? (
                <img
                    src={imageUrl}
                    alt={name}
                    className="title-card-image"
                />
            ) : (
                <div className="loading-spinner"></div>
            )}
            <div className="title-card-content">
                <h1 className="title-card-title">{name}</h1>
                <p className="title-card-subtitle">{description}</p>
            </div>
            <ContactSection contact={contact} />
        </div>
    );
};

export default TitleCard;