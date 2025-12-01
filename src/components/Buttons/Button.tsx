import { useState } from "react";

interface ButtonProps{
    text: string;
    width?: string;
    height?: string;
    font_size?: string;
    border_radius?: string;
    border_width?: string;
    primary_color?: string;
    secondary_color?: string;
    styled?: 'primary' | 'outline';
    transition_duration?: string;
}

const Button = ({
    text,
    width = "316px",
    height = "56px",
    font_size = "18px",
    border_radius = "8px",
    border_width = "2px",
    primary_color = "#FF6B4A",
    secondary_color = "#FFFFFF",
    styled = "primary",
    transition_duration = ".3s",
} : ButtonProps) => {
    const [buttonStyled, setButtonStyled] = useState(styled);
    const [hover, setHover] = useState(false);

    const ButtonStyle = {
        width: width,
        height: height,
        fontSize: font_size,
        borderRadius: border_radius,
        border: `${border_width} ${primary_color} solid`,
        backgroundColor: buttonStyled == 'primary' ? primary_color : '#FFFFFF00',
        color: buttonStyled == 'primary' ? secondary_color : primary_color,
        transition: `all ${transition_duration} ease`,
        transform: `scale(${hover ? '1.05' : '1'})`,
    }

    return (
        <button
            className="button"
            onMouseEnter={() => {setButtonStyled(buttonStyled == 'primary' ? 'outline' : 'primary'); setHover(true)}}
            onMouseLeave={() => {setButtonStyled(buttonStyled == 'primary' ? 'outline' : 'primary'); setHover(false)}}
            style={ButtonStyle}
        >{text}</button>
    )
}

export default Button;