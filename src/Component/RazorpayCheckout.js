import { Button } from "@mui/material";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

const RazorpayCheckout = () => {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    const order = 12;

    const RazorpayOptions = {
      key: "rzp_test_eJlbNbyzsoPfXF",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "8108359639",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(RazorpayOptions);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <Button
        variant="contained"
        sx={{ width: 220, marginBottom: 2 }}
        onClick={handlePayment}
      >
        Razor pay
      </Button>
    </div>
  );
};
export default RazorpayCheckout;
