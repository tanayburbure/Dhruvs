
export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-6">
        {/* SVG Logo */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="12" fill="#FEE05E"/>
          <path d="src\assets\lobo" fill="#232323"/>
          <circle cx="28" cy="26" r="6" fill="#232323"/>
        </svg>
      </div>
      <h1 className="text-2xl font-semibold">Login</h1>
    </div>
  );
}

