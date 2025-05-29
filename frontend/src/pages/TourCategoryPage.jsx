import React, { useState, useEffect } from "react";

const TourCategoryPage = () => {
  const [tours, setTours] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredTours, setFilteredTours] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
        setFilteredTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
  
    fetchTours();
  
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
  
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);

    let filtered = tours;

    if (filter === "popular") filtered = tours.filter((t) => t.popular);
    else if (filter === "featured") filtered = tours.filter((t) => t.featured);
    else if (filter === "top-places")
      filtered = tours.filter((t) => t.topPlace);
    else if (filter === "wildlife")
      filtered = tours.filter((t) => t.type === "wildlife");
    else if (filter === "vacation")
      filtered = tours.filter((t) => t.type === "vacation");

    setFilteredTours(filtered);
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const searched = tours.filter((tour) =>
      tour.title.toLowerCase().includes(term)
    );
    setFilteredTours(searched);
  };

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

  return (
    <div className="p-20">
      <div className="flex flex-wrap items-center justify-between mb-10">
        <div className="flex flex-wrap gap-2 md:gap-4">
          {[
            "all",
            "popular",
            "top-places",
            "featured",
            "wildlife",
            "vacation",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === "all") {
                  setFilteredTours(tours);
                } else {
                  handleFilter(cat);
                }
                setActiveFilter(cat);
              }}
              className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
                activeFilter === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search tours..."
            className="px-6 py-1 w-96 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch();
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTours.map((tour) => (
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
      </div>

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
    </div>
  );
};

export default TourCategoryPage;
