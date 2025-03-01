import { toast } from "react-toastify";

export function toastSuccess(msg: string, time: number) {
  toast.success(msg, {
    icon: false,
    position: "top-center",
    autoClose: time,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
    className:
      "text-[white] font-main text-xl !bg-orange border-4 border-solid border-green rounded-2xl w-[29rem]",
  });
}

export function toastFail(msg: string, time: number) {
  toast.error(msg, {
    closeButton: false,
    position: "bottom-left",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
    className:
      "text-[red] font-main text-xl bg-[white] border-4 border-solid border-green rounded-2xl w-[29rem]",
  });
}
