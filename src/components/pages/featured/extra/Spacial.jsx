import React from "react";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Bkash 20% Off on All Pizzas",
      description: "Enjoy a cheesy treat! Use code PIZZA20 at checkout.",
      image: "https://www.bkash.com/uploaded_contents/campaigns/large_images/web-banner-1458x540-1_1733047935213.webp", 
      validTill: "Valid Till: Dec 31, 2025",
    },
    {
      id: 2,
      title: "Nagad Buy 1 Get 1 Free",
      description: "Order a burger and get one absolutely free! Limited time offer.",
      image: "https://nagad.com.bd/uploads/offer/sfSDVkAmRewopLXQc7YAgEiXsfUqo954N6oXpen2.jpg", 
      validTill: "Valid Till: Jan 15, 2025",
    },
    {
      id: 3,
      title: "Dadbid Card Free Dessert with Every Order",
      description: "Get a free dessert of your choice with orders above $25.",
      image: "https://www.wooribank.com.kh/wp-content/uploads/2024/06/Visa-Cash-back-websit-1-1.jpg",
      validTill: "Valid Till: Jan 31, 2025",
    },
  ];

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold  mb-6">
            Special Offers
          </h2>
          <p className="text-base-content">
            Don’t miss out on our exclusive deals and discounts. you can try your best for receive best food 
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="card bg-white shadow-lg hover:shadow-xl transition-all"
            >
              <figure>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold ">{offer.title}</h3>
                <p className="text-base-content">{offer.description}</p>
                <p className="text-sm text-gray-500 italic">{offer.validTill}</p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
