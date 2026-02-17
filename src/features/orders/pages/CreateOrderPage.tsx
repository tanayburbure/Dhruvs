import CreateOrderForm from "@/features/orders/components/CreateOrderForm";

const CreateOrderPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Order</h1>
      <CreateOrderForm />
    </div>
  );
};

export default CreateOrderPage;
