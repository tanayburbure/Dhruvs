import { useFormContext } from "react-hook-form";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  [x: string]: any;
}) => (
  <div className="flex flex-col gap-2 w-full">
    <label htmlFor={name} className="text-sm font-medium text-gray-800">
      {label}
    </label>

    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className={`
        h-12 px-4 rounded-xl 
        bg-gray-100 
        shadow-inner 
        outline-none 
        focus:ring-2 focus:ring-gray-300
        ${error ? "ring-2 ring-red-400" : ""}
        ${className}
      `}
      {...rest}
    />

    {error && (
      <span className="text-xs text-red-500">{error}</span>
    )}
  </div>
);

const CustomerDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <section className="h-[70vh] bg-gray-100 rounded-md flex items-start  py-12 px-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Add Customer Details
        </h2>

        <div className="space-y-5">
          {/* Full Name */}
          <InputField
            label="Full Name"
            name="fullName"
            placeholder=""
            error={errors.fullName?.message as string}
            {...register("fullName")}
          />

          {/* Mobile Number with +91 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Mobile Number
            </label>

            <div className="flex items-center gap-3">
              <div className="h-12 px-4 flex items-center rounded-xl bg-gray-100 shadow-inner text-gray-700">
                +91
              </div>

              <input
                type="tel"
                className={`
                  flex-1 h-12 px-4 rounded-xl 
                  bg-gray-100 
                  shadow-inner 
                  outline-none 
                  focus:ring-2 focus:ring-gray-300
                  ${errors.mobile ? "ring-2 ring-red-400" : ""}
                `}
                {...register("mobile")}
              />
            </div>

            {errors.mobile && (
              <span className="text-xs text-red-500">
                {errors.mobile.message as string}
              </span>
            )}
          </div>

          {/* Email */}
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder=""
            error={errors.email?.message as string}
            {...register("email")}
          />

          {/* City & State Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="City"
              name="city"
              placeholder=""
              error={errors.city?.message as string}
              {...register("city")}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-800">
                State
              </label>

              <select
                className={`
                  h-12 px-4 rounded-xl 
                  bg-gray-100 
                  shadow-inner 
                  outline-none 
                  focus:ring-2 focus:ring-gray-300
                  ${errors.state ? "ring-2 ring-red-400" : ""}
                `}
                {...register("state")}
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi">Delhi</option>
              </select>

              {errors.state && (
                <span className="text-xs text-red-500">
                  {errors.state.message as string}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerDetailsSection;