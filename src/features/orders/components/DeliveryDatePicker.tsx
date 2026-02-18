import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const DeliveryDatePicker = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="deliveryDate"
      control={control}
      render={({ field }) => (
        <DatePicker
          selected={field.value}
          onChange={(date) => field.onChange(date)}
          showTimeSelect
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          placeholderText="Select Delivery Date"
          className="px-4 py-2 border rounded-lg w-[250px]"
          popperPlacement="bottom-start"
        />
      )}
    />
  );
};

export default DeliveryDatePicker;
