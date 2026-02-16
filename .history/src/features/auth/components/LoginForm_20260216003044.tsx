import lobo from "@/assets/lobo.svg";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input"

export default function LoginForm() {
  // Placeholder click handler to resolve the "Cannot find name 'handleClick'" error
  const handleClick = () => {
    // You can add login logic here
    console.log("Login button clicked");
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
      <input type="text" />
      <Button onClick={handleClick}>
        Login
      </Button>
    </div>
  );
}
