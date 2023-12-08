import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);


    const totalPrice = (5);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    status: 'pending',
                    role: 'proUser'
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);

                if (res.data?.paymentResult?.insertedId) {
                    // Update user role in userCollection
                    try {
                        const roleUpdateResponse = await axiosSecure.patch(`/users/role/${user?.email}`, {
                            role: 'proUser',
                        });

                        if (roleUpdateResponse.status === 200) {
                            console.log('User role updated to proUser');
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Thank you for Payment',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        } else {
                            console.error('Error updating user role:', roleUpdateResponse.data);
                            setError('Error updating user role. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Exception during user role update:', error);
                        // Handle the exception appropriately
                        setError('Error updating user role. Please contact support.');
                    }
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;