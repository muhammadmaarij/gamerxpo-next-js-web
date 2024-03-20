// components/Checkout.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51Ovwb2HJ4pSO9vPNebQM1upMTvaeOZ1FNmnVws7iPXhfHyHJQFdJcjTItGDSkAikbmxTJpFJzECpFhzPXSwzfRBm00pt1FjtgW"
);

const Checkout = () => {
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const router = useRouter();
  const { prodId } = router.query;

  useEffect(() => {
    if (prodId) {
      fetch(`http://localhost:8000/api/create-checkout-session/${prodId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prod_id: prodId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Assuming data.url is the checkout URL you receive from your backend
          setCheckoutUrl(data.url);
        });
    }
  }, [prodId]);

  useEffect(() => {
    // If we have the checkout URL, redirect to it
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  return (
    <div className="container">
      <p>Loading checkout...</p>
    </div>
  );
};

export default Checkout;
