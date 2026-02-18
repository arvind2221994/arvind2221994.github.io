import React, { useContext } from 'react';
import { IoIosSend } from "react-icons/io";

const FormHandler = () => {
    return(
        <section className="contact-section" id="contact">
            <h1>Contact Me!</h1>
            <form className='contact-form'>
                <div className="input-group">
                    <input type="text" id="name" name="name" placeholder='Enter Name' required />
                    <input type="email" id="email" name="email" placeholder='Enter Email' required />
                </div>
                <div className="input-group">   
                    <input type="text" id="subject" name="subject" placeholder='Enter Subject' required />
                </div>
                <div className="input-group">
                    <textarea id="message" name="message" placeholder='Enter Message' rows={5} cols={10} required></textarea>
                </div>
                <button id="cta" type="submit"><IoIosSend className="send-icon" /> Send Message</button>
            </form>
        </section>
    );
};

export default FormHandler;