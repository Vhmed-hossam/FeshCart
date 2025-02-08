import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addToCart(productId) {
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      productId,
    },
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  toast.success(data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
    theme: "light",
    transition: Bounce,
  });
}
