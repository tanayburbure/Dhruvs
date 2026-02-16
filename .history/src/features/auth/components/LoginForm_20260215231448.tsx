import lobo from "../../../assets/lobo.svg";

export default function LoginForm() {
  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="mb-6">
        <img
          src={lobo}
          alt="Logo"
          className="w-52"
        />
      </div>
      <h2 className="text-4xl">WELCOME BACK</h2>
      <h1 className="text-2xl font-semibold">Login</h1>
    </div>
  );
}
