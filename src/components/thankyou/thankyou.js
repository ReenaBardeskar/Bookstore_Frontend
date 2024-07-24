import React from 'react';
import './thankyou.css';
import NavBar from '../navbar/NavBar.js';

const ThankYou = () => {
    return (
        <div>
            <NavBar />
            <div class="container">
                <h2>Thank You for Registering!</h2>
                <p>We have sent you a confirmation email, and we hope you enjoy our vast selection of good reads!</p>
            </div>
        </div>
    );
};

export default ThankYou;