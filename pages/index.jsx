import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/stripe/create-checkout-session/",
        {
          method: "POST",
        }
      );
      // console.log(await response.text());
      if (!response.ok) {
        // If the HTTP status code is not in the 200-299 range
        // You might want to handle the error or throw an exception
        console.log("Response status code indicates an error", response.status);
        return;
      }
      const session = await response.json();
      console.log("hhhhh",session);
      window.location.href = session.url;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </section>
  );
};

export default HomePage;
