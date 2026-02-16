
export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-6">
        {/* SVG Logo */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="56" height="56" rx="12" fill="#FEE05E"/>
          <path d="M28 14C21.3726 14 16 19.3726 16 26C16 32.6274 21.3726 38 28 38C34.6274 38 40 32.6274 40 26C40 19.3726 34.6274 14 28 14ZM28 35C23.0294 35 19 30.9706 19 26C19 21.0294 23.0294 17 28 17C32.9706 17 37 21.0294 37 26C37 30.9706 32.9706 35 28 35Z" fill="#232323"/>
          <circle cx="28" cy="26" r="6" fill="#232323"/>
        </svg>
      </div>
      <h1 className="text-2xl font-semibold">Login</h1>
    </div>
  );
}

