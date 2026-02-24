import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employee.service";
import { Employee } from "../types/employee.types";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  if (loading) {
    return <div className="p-4">Loading employees...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Employees</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Employee Id</th>
            <th className="p-2">Employee Name</th>
            <th className="p-2">Phone No.</th>
            <th className="p-2">Total Orders</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b text-left">
              <td className="p-2">{employee.id}</td>
              <td className="p-2">{employee.name}</td>
              <td className="p-2">{employee.phone}</td>
              <td className="p-2">
                {Math.floor(Math.random() * 20) + 5}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}