import React, { useState } from "react";
import about3 from "../assets/images/bg3.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    try {
      const response = await fetch("http://localhost:5555/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative bg-cover bg-center bg-no-repeat h-80"
        style={{ backgroundImage: `url(${about3})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We&apos;re here to help you plan your dream vacation. Have
              questions, feedback, or need assistance? Reach out to us, and our
              team will get back to you promptly.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <span className="text-indigo-600">
                  <i className="fas fa-phone-alt"></i>
                </span>
                <span className="text-gray-700">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="text-indigo-600">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="text-gray-700">support@tourfinder.com</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="text-indigo-600">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="text-gray-700">
                  123 Travel Road, Wanderlust City, USA
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="example@domain.com"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  rows="5"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
            {formStatus && (
              <div className="mt-4 text-center text-gray-700">{formStatus}</div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Find Us Here
        </h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://storage.googleapis.com/maps-solutions-e6bscoh55a/locator-plus/64wl/locator-plus.html"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
