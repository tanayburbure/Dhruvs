import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-[50%] justify-center pr-16 relative flex items-center bg-[#FEE05E] ">
            <img className="h-[65vh] absolute top-16" src="src/assets\Blazer.png" alt="" />
            <img className="h-[65vh] absolute top-40" src="src/assets\Dress.png" alt="" />
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}
