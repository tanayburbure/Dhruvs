import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-[50%] bg-[#FEE05E] ">
            <img src="src/assets\image.png" alt="" />
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}
