import LoginForm from "../components/LoginForm";
import Button from '@/shared/components/Button'

export default function LoginPage() {
  // Define a dummy handleSave function to resolve the error
  const handleSave = () => {
    // You might want to implement something meaningful here
    console.log("Save Order clicked");
  };

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
  );
}
