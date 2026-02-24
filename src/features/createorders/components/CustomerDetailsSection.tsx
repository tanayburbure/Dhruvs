import { useFormContext } from "react-hook-form";

const CustomerDetailsSection = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Customer Details</h2>

      <input {...register("fullName")} placeholder="Full Name" />
      <p>{errors.fullName?.message as string}</p>

      <input {...register("mobile")} placeholder="Mobile Number" />
      <p>{errors.mobile?.message as string}</p>

      <input {...register("email")} placeholder="Email" />
      <p>{errors.email?.message as string}</p>

      <input {...register("city")} placeholder="City" />
      <p>{errors.city?.message as string}</p>

      <input {...register("state")} placeholder="State" />
      <p>{errors.state?.message as string}</p>
    </div>
  );
};

export default CustomerDetailsSection;
