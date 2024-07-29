import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastNotify({
  type = "default",
  message = "",
  position = "top-right",
}) {
  const body = {
    position,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    transition: "Slide",
  };

  // Check if the toast is already displayed
  const toastId = toast.isActive("error");

  if (type === "error" && !toastId) {
    toast.error(message, body);
  } else {
    switch (type) {
      case "success":
        toast.success(message, body);
        break;

      case "info":
        toast.info(message, body);
        break;

      case "warning":
        toast.warning(message, body);
        break;

      case "dark":
        toast.dark(message, body);
        break;

      default:
        toast.info(message, body);
        break;
    }
  }
}
