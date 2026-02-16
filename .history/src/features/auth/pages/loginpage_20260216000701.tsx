import LoginForm from "../components/LoginForm";

import Button from 'src\shared\components\Button.tsx';

export default function LoginPage() {
  // Dummy handler to resolve 'handleSave' error
  function handleSave() {
    // Add your logic here
    alert("Order Saved!");
  }

  return (
    <div className="h-screen w-full flex select-none">
      <div className="w-[50%] justify-center pr-12 relative flex items-center bg-[#FEE05E] ">
            <img className="h-[60vh] absolute top-24" src="src/assets/Blazer.png" alt="" />
            <img className="h-[60vh] absolute top-48" src="src/assets/Dress.png" alt="" />
      </div>
      <div className="w-[50%]">
        <LoginForm/>
        <Button onClick={handleSave}>
          Save Order
        </Button>
      </div>
    </div>
  )
}
