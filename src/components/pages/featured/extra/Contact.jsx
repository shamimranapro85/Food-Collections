import React from "react";

const ContactSection = () => {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <div className="text-center py-2">
          <h2 className="text-3xl font-bold  mb-4">Contact Us</h2>
          <p className="text-base-content">
            Need help with your order? Contact us for support or feedback.
          </p>
        </div>
        <div className=" flex justify-center items-center  w-full">
          <div className="  max-w-[500px] w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>
            <button className="btn mt-3 btn-primary w-full">Send Message</button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
