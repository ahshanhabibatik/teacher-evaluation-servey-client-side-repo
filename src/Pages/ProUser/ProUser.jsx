import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";


import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import NavBar from "../Shared/NavBar";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const ProUser = () => {
    return (
        <div>
            <NavBar></NavBar>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            <h1 className="text-xl text-center mt-3 mb-10">Are you want to pro User? Please Pay For only 5 dollars</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default ProUser;