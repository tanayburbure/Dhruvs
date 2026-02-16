import { useState } from "react";
import lobo from "@/assets/lobo.svg";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input"

export default function LoginForm() {
  // Placeholder click handler to resolve the "Cannot find name 'handleClick'" error
  const handleClick = () => {
    // You can add login logic here
    console.log("Login button clicked");
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name as string]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="">
        <img
          src={lobo}
          alt="Logo"
          className="w-[28vh]"
        />
      </div>
      <h2 className="text-[6vh]">WELCOME BACK</h2>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
        autoComplete="email"
      />
      <Button onClick={handleClick}>
        Login
      </Button>
    </div>
  );
}
