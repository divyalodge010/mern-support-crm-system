import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/sidebar";

const API_BASE = "http://localhost:3000";

function Ticket() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Failed to create ticket");
        return;
      }

      alert("Ticket Created Successfully");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    <div className="flex flex-col md:grid md:grid-cols-[14rem_1fr] min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex items-center justify-center min-h-screen bg-slate-100 py-10 px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col items-center mb-7">
            <h3 className="text-slate-900 text-2xl font-bold text-center mb-5">
              Create New Ticket
            </h3>


            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Customer Name
                </label>
                <input
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="rounded-md border border-slate-300 w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Customer Email
                </label>
                <input
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleChange}
                  placeholder="JohnDoe@gmail.com"
                  className="rounded-md border border-slate-300 w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Issue Title"
                  className="rounded-md border border-slate-300 w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your issue"
                  rows="5"
                  className="rounded-md border border-slate-300 w-full px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-medium w-full p-2 transition-all"
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Ticket;
