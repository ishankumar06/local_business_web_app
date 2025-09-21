import React, { useState } from 'react';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Form submitted with email:", email);

    // Reset input after submission
    setEmail('');
  };

  return (
    <div className="text-center px-4">
      <p className="text-2xl font-medium text-gray-800">
        Book now and get 2 free gifts
      </p>

      <p className="text-gray-400 mt-3">
        Subscribe to our newsletter for the latest updates, exclusive offers, and early access to our newest books and newspapers.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 pr-1 py-1 rounded-md"
      >
        <input
          className="w-full sm:flex-1 outline-none text-sm"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-6 py-2 rounded"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
