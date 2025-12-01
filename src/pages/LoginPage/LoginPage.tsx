import { useEffect } from "react";
import Logo from "../../assets/icons/logo.svg";
import { useWindow } from "../../hooks/useWindowSize";
import InputString from "../../components/Inputs/InputString"
import Button from "../../components/Buttons/Button"

function LoginPage() {
    const setSize = useWindow().setSize;

    useEffect(() =>{
        setSize(370, 500, true);
    }, [])

    return (
        <div className="login">
            <div className="login__logo">
                <img src={Logo} alt="Riff logo" className="login__logo-img" />
                <h1 className="login__logo-title">Riff</h1>
            </div>
            <div className="login__inputs">
                <InputString placeholder_text="Username"/>
                <InputString placeholder_text="Password" type="password"/>
            </div>
            <div className="login__buttons">
                <Button text="Log in" />
                <Button text="Sign up" styled="outline" />
            </div>
        </div>
    );
}

export default LoginPage;