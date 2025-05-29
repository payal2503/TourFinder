import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../assets/images/Home.webp";
import Footer from "./Footer";
import WhyChooseUs from "./WhychooseUs";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    visitDate: "",
    visitors: [{ name: "", age: "" }],
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5555/tours");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();

    // Check localStorage for token and username
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username }); // Set user state
    }
  }, []);

  const openBookingModal = (tour) => {
    if (!user) {
      alert("Please log in to book a tour!");
      return;
    }
    setSelectedTour(tour);
    setBookingModal(true);
  };

  const closeBookingModal = () => {
    setBookingModal(false);
    setFormData({
      visitDate: "",
      visitors: [{ name: "", age: "" }],
    });
  };

  const handleFormChange = (index, field, value) => {
    const updatedVisitors = [...formData.visitors];
    updatedVisitors[index][field] = value;
    setFormData({ ...formData, visitors: updatedVisitors });
  };

  const addVisitor = () => {
    setFormData({
      ...formData,
      visitors: [...formData.visitors, { name: "", age: "" }],
    });
  };

  const handleBookingSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please log in to book a tour!");
      return;
    }

    const bookingData = {
      tourId: selectedTour._id,
      tourTitle: selectedTour.title,
      userName: user.username,
      visitDate: formData.visitDate,
      visitors: formData.visitors,
    };

    try {
      const response = await fetch("http://localhost:5555/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert("Tour booked successfully!");
        closeBookingModal();
      } else {
        alert("Booking failed. Try again later.");
      }
    } catch (error) {
      console.error("Error booking tour:", error);
    }
  };

  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-gray-100 min-h-screen ">
        <section
          className="relative bg-cover bg-center min-h-screen flex items-center justify-center px-4"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="text-center text-white z-10 w-full">
            <h2 className="text-2xl md:text-[7vmin] font-bold mb-6 sm:mb-4">
              Search your Tours
            </h2>

            <div className="w-full flex justify-center">
              <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] bg-white bg-opacity-20 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Select Your Destination"
                  className="w-full sm:flex-1 border p-3 rounded-lg text-white bg-white bg-opacity-0 placeholder-white focus:outline-none focus:ring focus:ring-white"
                />
              </div>
            </div>

            {searchTerm.trim() !== "" && (
              <div className="mt-8 w-full max-h-[70vh] overflow-y-auto px-2 sm:px-6 z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
                  Search Results for "{searchTerm}"
                </h3>

                {filteredTours.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.slice(0, 3).map((tour) => (
                      <div
                        key={tour._id}
                        className="bg-gray-400 bg-opacity-90 border rounded-lg shadow-lg overflow-hidden flex flex-col"
                      >
                        <img
                          src={tour.photo}
                          alt={tour.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between">
                          <div>
                            <h4 className="text-lg font-bold mb-2">
                              {tour.title}
                            </h4>
                            <p className="text-white text-sm line-clamp-3">
                              {tour.desc}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-blue-500 font-bold">
                              ${tour.price}
                            </span>
                            <button
                              onClick={() => openBookingModal(tour)}
                              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white text-center">
                    No tours found for "{searchTerm}"
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <WhyChooseUs />
        <section className="bg-gray-100 px-10 pb-10">
          <h3 className="text-3xl font-bold text-center mb-8">
            Featured Tours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTours.slice(0, 3).map((tour) => (
              <div
                key={tour._id}
                className="relative h-80 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row text-white"
              >
                <img
                  src={tour.photo}
                  alt={tour.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-70"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex w-full h-full">
                  <div className="w-1/3 h-full">
                    <img
                      src={tour.photo}
                      alt={tour.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>

                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-2">{tour.title}</h4>
                      <p className="text-sm text-gray-100 mb-4 line-clamp-3">
                        {tour.desc}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${tour.price}</span>
                      <button
                        onClick={() => openBookingModal(tour)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* More Popular Tours Card */}
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg text-white flex items-center justify-center">
              {/* 4th tour image as background */}
              <img
                src={filteredTours[3]?.photo}
                alt="View More"
                className="absolute inset-0 w-full h-full object-cover brightness-75"
              />

              <div className="absolute inset-0 bg-black/40" />

              <Link
                to="/tours"
                className="relative z-10 flex flex-col items-center"
              >
                <div className="w-14 h-14 border border-white rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <span className="text-white text-lg">View More</span>
              </Link>
            </div>
          </div>
        </section>

        {bookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4">
                Book {selectedTour.title}
              </h3>

              <input
                type="date"
                className="w-full border p-2 mb-3"
                value={formData.visitDate}
                onChange={(e) =>
                  setFormData({ ...formData, visitDate: e.target.value })
                }
              />
              {formData.visitors.map((visitor, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Visitor Name"
                    className="border p-2 w-1/2"
                    value={visitor.name}
                    onChange={(e) =>
                      handleFormChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    className="border p-2 w-1/2"
                    value={visitor.age}
                    onChange={(e) =>
                      handleFormChange(index, "age", e.target.value)
                    }
                  />
                </div>
              ))}
              <button
                className="bg-gray-300 px-4 py-2 mb-3 rounded"
                onClick={addVisitor}
              >
                Add More Visitors
              </button>
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={closeBookingModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleBookingSubmit}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Home;
