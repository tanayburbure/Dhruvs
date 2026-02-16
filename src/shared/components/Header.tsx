export default function Header() {
    return (
      <div className="h-16 bg-white shadow px-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-80"
        />
  
        <button className="bg-yellow-400 px-4 py-2 rounded-lg font-medium">
          + Create Order
        </button>
      </div>
    );
  }
  