import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function useModal() {
    const [isShowing, setIsShowing] = useState(false)

    const navigate = useNavigate()

    function toggle() {
        setIsShowing(!isShowing)
    }

    function goBack() {
        navigate('http://localhost:3000/')
    }

    return {
        isShowing,
        toggle,
        goBack
    }
}
