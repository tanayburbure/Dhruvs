import { useState } from "react";
import lobo from "@/assets/lobo.svg";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Role from "@/shared/components/Role";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, role: selectedRole });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="w-full max-w-[420px]"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* Logo + heading */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={lobo}
            alt="Logo"
            className="w-[190px] object-contain"
          />
          <h2 className="text-[30px] font-extrabold tracking-tight text-stone-900 m-0">
            Welcome Back
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="flex-1 h-px bg-amber-200" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-600">
            Login
          </span>
          <div className="flex-1 h-px bg-amber-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email / Phone"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            required
            autoComplete="current-password"
          />

          {/* Role */}
          <div className="mb-2">
            <Role selectedRole={selectedRole} onSelect={setSelectedRole} />
          </div>

          {/* Forgot password */}
          <div className="text-right mb-6">
            <span className="text-[13px] font-semibold text-amber-600 cursor-pointer hover:text-amber-700 transition-colors">
              Forgot password?
            </span>
          </div>

          {/* Centered Button */}
          <div className="flex justify-center">
            <Button type="submit">Sign In →</Button>
          </div>
        </form>
      </div>
    </div>
  );
}