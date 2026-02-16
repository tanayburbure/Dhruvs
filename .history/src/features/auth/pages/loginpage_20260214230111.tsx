import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex">
      <div className="w-[50%] flex items-center bg-[#FEE05E] ">
            <img className="h-[70vh]" src="src/assets\image.png" alt="" />
            <img src="" alt="" />
      </div>
      <div>
        <LoginForm/>
      </div>
    </div>
  )
}
