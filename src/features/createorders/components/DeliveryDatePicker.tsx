import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { useOrderStore } from "../store/orderStore";
import "react-datepicker/dist/react-datepicker.css";

const DeliveryDatePicker = () => {
  const { control } = useFormContext();
  const setOrder = useOrderStore((s) => s.setOrder);

  return (
    <Controller
      name="deliveryDate"
      control={control}
      render={({ field }) => (
        <DatePicker
          selected={field.value}
          onChange={(date) => {
            field.onChange(date);
            setOrder({ deliveryDate: date });
          }}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          placeholderText="Select Delivery Date"
          className="px-4 py-2 border border-gray-400 rounded-lg w-[250px]"
        />
      )}
    />
  );
};

export default DeliveryDatePicker;