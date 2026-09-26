function navbar(onLogout) {
  return (
    <>
      <nav className="bg-white text-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          All tickets
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          <h1>hi</h1>
        </span>
        <button
          onClick={onLogout}
          className="text-sm font-medium hover:bg-slate-100 px-3 py-1.5 rounded-md transition-all"
        >
          Logout
        </button>
      </nav>
    </>
  );
}
export default navbar;
