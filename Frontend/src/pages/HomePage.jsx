import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/sidebar";

const API_BASE = "http://localhost:3000";

function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [ticket, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/tickets`);
        const data = await res.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  const STATUS_STYLES = {
    Open: "bg-sky-50 text-sky-700 border-sky-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    Closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const filterTicket = ticket.filter((ticket) => {
    const matchSearch =
      (ticket.ticket_id.toLowerCase().includes(search.toLowerCase())) ||
      (ticket.customer_name.toLowerCase().includes(search.toLowerCase())) ||
      (ticket.subject.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      selectedFilter === "All" || ticket.status === selectedFilter;

    return matchSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-[14rem_1fr] min-h-screen bg-slate-100">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-slate-100">
          <nav className="bg-white text-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold tracking-tight text-slate-900 ml-4">
                HomePage
              </span>
            </div>
            <button
              onClick={() => navigate("/ticket")}
              className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              Create Ticket
            </button>
          </nav>

          <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Tickets
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {ticket.length}
                </h2>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Open Tickets
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {ticket.filter((t) => t.status === "Open").length}
                </h2>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Closed Tickets
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mt-1">
                  {ticket.filter((t) => t.status === "Closed").length}
                </h2>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
              <input
                type="text"
                placeholder="search by ID, Customer Name or Subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {["All", "Open", "In Progress", "Closed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedFilter(status)}
                  className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === status
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="p-4 pl-6">Ticket ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filterTicket.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-6 text-center text-slate-400"
                      >
                        No tickets found.
                      </td>
                    </tr>
                  ) : (
                    filterTicket.map((item) => (
                      <tr
                        key={item.ticket_id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 pl-6 font-semibold text-indigo-600">
                          {item.ticket_id}
                        </td>
                        <td className="p-4 text-slate-900 font-semibold">
                          {item.customer_name}
                        </td>
                        <td className="p-4 text-slate-600">{item.subject}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${STATUS_STYLES[item.status]}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">{new Date(item.createdAt).toLocaleString("en-IN")}</td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => navigate(`/ticket/${item.ticket_id}`)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
