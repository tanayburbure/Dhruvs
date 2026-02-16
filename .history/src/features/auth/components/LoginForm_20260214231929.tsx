import logo from "../../../assets/lobo.svg";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img
        src={logo}
        alt="Company Logo"
        className="w-16 h-16 mb-4"
      />
      <h1 className="text-2xl font-semibold">Login</h1>
    </div>
  );
}
