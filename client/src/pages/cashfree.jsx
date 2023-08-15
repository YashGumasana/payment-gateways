import React, { useEffect, useState } from 'react'
import { getDataAPI } from '../utils/FetchData';

function Cashfree() {
    // const [paymentSessionId, setPaymentSessionId] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        document.body.appendChild(script);

        // Call your server-side API to get paymentSessionId
        // getDataAPI('user/cashFreeIntegration')
        //     .then(response => {
        //         console.log('response.data.data :>> ', response.data.data.response.payment_session_id);
        //         setPaymentSessionId(response.data.data.response.payment_session_id);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching paymentSessionId:', error);
        //     });
    }, []);

    const handlePayment = () => {
        getDataAPI('user/cashFreeIntegration')
            .then(response => {
                console.log('response.data.data :>> ', response.data.data.response.payment_session_id);
                let paymentSessionId = response.data.data.response.payment_session_id
                // setPaymentSessionId(response.data.data.response.payment_session_id);
                const cashfree = new window.Cashfree({
                    mode: 'sandbox' // 'sandbox' or 'production'
                });

                const checkoutOptions = {
                    paymentSessionId: paymentSessionId,
                    returnUrl: 'https://test.cashfree.com/pgappsdemos/v3success.php?myorder={order_id}'
                };

                cashfree.checkout(checkoutOptions).then(function (result) {
                    if (result.error) {
                        alert(result.error.message);
                    }
                    if (result.redirect) {
                        console.log('Redirection');
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching paymentSessionId:', error);
            });
        // Initialize Cashfree SDK and redirect to checkout

    };

    return (
        <div>
            <h1>Payment Page</h1>
            <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
    );
}

export default Cashfree
