import { useNavigate } from "react-router-dom";

function Sidebar() { 
  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-white text-slate-500 min-h-screen p-4 flex flex-col justify-between shrink-0 border-r border-slate-200">
      <div>
        {/* LOGO / BRAND */}
        <div className="flex items-center gap-2 px-3 py-2 mb-6">
          <span className="text-teal-900 font-bold text-base">CRM System</span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">
          {/* 1. All Tickets / Dashboard */}
          <button
            onClick={() => navigate("/")}
            className="w-full text-left px-3 py-2 mt-5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-teal-100 hover:text-teal-900 cursor-pointer"
          >
            All Tickets
          </button>

          {/* 2. Create Ticket */}
          <button
            onClick={() => navigate("/ticket")}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-teal-100 hover:text-teal-900 cursor-pointer"
          >
            Create Ticket
          </button>
        </nav>
      </div>

      {/* FOOTER */}
      <div className="text-[10px] text-slate-400 px-3">v1.0 Support CRM</div>
    </aside>
  );
}

export default Sidebar;