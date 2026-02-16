import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-[50%] relative place-content-top bg-[#FEE05E] ">
            <img className="h-[70vh] absolute" src="src/assets\Blazer.png" alt="" />
            <img className="h-[70vh] absolute" src="src/assets\Dress.png" alt="" />
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}
