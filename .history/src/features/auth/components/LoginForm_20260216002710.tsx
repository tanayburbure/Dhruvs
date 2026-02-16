import lobo from "@/assets/lobo.svg";
import Button from "@/components/Button";

export default function LoginForm() {
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
      <Button onClick={handleClick}>
        Login
      </Button>
    </div>
  );
}
