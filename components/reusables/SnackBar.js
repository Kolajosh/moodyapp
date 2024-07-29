import { useSnackbar } from "notistack";

const useSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const SnackBar = ({
    type = "default",
    message = "",
    position = "top-right",
  }) => {
    const positions = {
      "top-right": { vertical: "top", horizontal: "right" },
      "top-left": { vertical: "top", horizontal: "left" },
      "bottom-right": { vertical: "bottom", horizontal: "right" },
      "bottom-left": { vertical: "bottom", horizontal: "left" },
    };

    const variant = type === "default" ? "info" : type;

    enqueueSnackbar(message, {
      variant,
      anchorOrigin: positions[position],
      autoHideDuration: 5000,
    });
  };

  return { SnackBar };
};

export default useSnackBar;
