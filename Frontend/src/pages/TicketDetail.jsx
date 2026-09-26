import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Fix 1: Added Router Imports
import Sidebar from "../Component/sidebar";

const API_BASE = "http://localhost:3000";

function TicketDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null); 
  const [status, setStatus] = useState("Open");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/tickets/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch ticket");
        }

        setTicket(data);
        setStatus(data.status || "Open");
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTickets();
    }
  }, [id]);

  const STATUS_STYLES = {
    Open: "bg-blue-100 text-blue-700",
    "In Progress": "bg-amber-100 text-amber-700",
    Closed: "bg-emerald-100 text-emerald-700",
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();

    try {
      // Backend PUT Request to save update
      const res = await fetch(`${API_BASE}/api/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes: note }),
      });

  //     if (res.ok) {
  //       setNote("");
  //     }
  //   } catch (err) {
  //     console.error("Save failed", err);
  //   }
  // };

  if (res.ok) {
     
      setTicket((prev) => ({
        ...prev,
        status: status,
        notes: note
          ? [
              ...prev.notes,
              { note_text: note, created_at: new Date().toISOString() },
            ]
          : prev.notes,
      }));
      setNote("");
    }
  } catch (err) {
    console.error("Save failed", err);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 text-xs text-slate-500">
        Loading ticket...
      </div>
    );
  }

  return (
    <div className=" flex flex-col md:grid md:grid-cols-[14rem_1fr] min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-slate-100">
        <nav className="bg-white text-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-sm hover:bg-slate-100 px-3 py-1.5 rounded-md transition-all cursor-pointer"
            >
              ← Back
            </button>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Ticket details
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium hover:bg-slate-100 px-3 py-1.5 rounded-md transition-all cursor-pointer"
          >
            Logout
          </button>
        </nav>

        <div className="max-w-5xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: ticket info, description, notes */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start justify-between pb-4 border-b border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs">
                  <div>
                    <span className="font-bold text-teal-600 uppercase block mb-1">
                      Customer
                    </span>
                    <p className="font-semibold text-slate-900">
                      {ticket?.customerName || ticket?.customer_name}
                    </p>
                    <p className="text-slate-500">
                      {ticket?.customerEmail || ticket?.customer_email}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-teal-600 uppercase block mb-1">
                      Ticket
                    </span>
                    <p className="font-semibold text-slate-900">
                      {ticket?.id || ticket?.ticket_id}
                    </p>
                    <p className="text-slate-500">{ticket?.subject}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 inline-block ${STATUS_STYLES[status]}`}
                >
                  {status}
                </span>
              </div>

              <div>
                <span className="font-bold text-teal-600 uppercase block text-xs mb-2">
                  Description
                </span>
                <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed whitespace-pre-wrap">
                  {ticket?.description}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              <span className="font-bold text-teal-600 uppercase block text-xs mb-3">
                Internal notes
              </span>
              {!ticket?.notes || ticket.notes.length === 0 ? (
                <p className="text-xs text-slate-400">No notes yet.</p>
              ) : (
                <div className="space-y-3">
                  {ticket.notes.map((n, i) => (
                    <div key={i} className="border-l-2 border-teal-200 pl-3">
                      <p className="text-xs text-slate-700">
                        {n.text || n.note_text}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {n.created_at ? new Date(n.created_at).toLocaleString("en-IN") : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: update panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-teal-600 uppercase block mb-2">
                  Update status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <form onSubmit={handleSaveUpdate} className="space-y-2">
                <label className="text-xs font-bold text-teal-600 uppercase block mb-2">
                  Add note / comment
                </label>
                <textarea
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write internal note..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs py-2 rounded-lg transition-all cursor-pointer"
                >
                  Save update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
