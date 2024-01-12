import toast from "react-hot-toast";
export default function notify({type = 'error', text}) {
    toast[type](text, {
        position: "bottom-right"
    })
}