import React from 'react';
import './checkout.css';
import NavBar from '../navbar/NavBar.js';

const Checkout = () => {
    return (
    <div>
        <NavBar />
        <div class="outer">
            <div class="content">
                <p>Enter your payment information if it has not been registered yet.</p>
                <form action="confirmcart">
                    <div class="row">
                        <div>
                            <label for="streetnumber">Street and number:</label><br/>
                            <input type="text" id="streetnumber" name="streetnumber"/><br/>
                        </div>

                        <div>
                            <label for="city">City:</label><br/>
                            <input type="text" id="city" name="city"/><br/>
                        </div>
                    </div>

                    <div class="row">
                        <div>
                            <label for="state">State:</label><br/>
                            <input type="text" id="state" name="state"/><br/>
                        </div>          

                        <div>
                            <label for="zip">ZIP code:</label><br/>
                            <input type="text" id="zip" name="zip"/><br/>
                        </div>
                    </div>

                    <div class="row">
                        <div>
                            <label for="cardtype">Credit card type:</label><br/>
                            <input type="text" id="cardtype" name="cardtype"/><br/>
                        </div>

                        <div>
                            <label for="cardnumber">Credit card number:</label><br/>
                            <input type="text" id="cardnumber" name="cardnumber"/><br/>
                        </div>
                    </div>

                    <div class="row">
                        <div>
                            <label for="expiration">Expiration date:</label><br/>
                            <input type="text" id="expiration" name="expiration"/><br/>
                        </div>

                        <div>
                            <label for="cvv">CVV:</label><br/>
                            <input type="text" id="cvv" name="cvv"/>
                        </div>
                    </div>

                    <input type="submit" id="submit" name="submit" class="submit"/>
                </form>
            </div>
        </div>
    </div>
);
};

export default Checkout;