export default function CustomersPage() {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Customers</h2>
  
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Sarthak Sharma</td>
              <td className="p-2">8811512548</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  