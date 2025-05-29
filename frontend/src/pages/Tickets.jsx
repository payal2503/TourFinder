import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Tickets = ({ username }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const ticketRefs = useRef([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5555/bookings/${username}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchTickets();
    }
  }, [username]);

  const handlePrint = (index) => {
    const content = ticketRefs.current[index];
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
                box-shadow: none;
                background: white;
              }
            }
          </style>
        </head>
        <body class="bg-gray-100 p-6">
          <div class="max-w-3xl mx-auto">
            ${content.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading tickets...</p>;
  if (tickets.length === 0) return <p className="text-center mt-20 text-gray-500">No tickets found.</p>;

  return (
    <div className="max-w-4xl mx-auto pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🎫 Your Bookings</h1>
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="bg-white border-dashed border-2 border-blue-800 shadow-lg rounded-xl px-6 py-5 mb-6 relative overflow-hidden"
          ref={(el) => (ticketRefs.current[index] = el)}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="md:w-1/2 space-y-2 text-blue-800">
              <h2 className="text-xl font-semibold">{ticket.tourTitle}</h2>
              <p><strong>Visit Date:</strong> {new Date(ticket.visitDate).toLocaleDateString()}</p>
              <p><strong>Booked By:</strong> {ticket.userName}</p>
            </div>

            <div className="md:w-1/2 space-y-2">
              <p className="font-semibold text-blue-700">👥 Visitors:</p>
              <ul className="list-disc list-inside text-gray-700">
                {ticket.visitors.map((visitor, i) => (
                  <li key={i}>{visitor.name} (Age: {visitor.age})</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => handlePrint(index)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              🖨️ Print Ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
