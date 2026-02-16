import lobo from "../../../assets/lobo.svg";

export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-6">
        {/* Logo */}
        <img
          src={lobo}
          alt="Logo"
          className="w-14 h-14"
        />
      </div>

      <h1 className="text-2xl font-semibold">Login</h1>
    </div>
  );
}
