import { useState } from "react";

interface InputProps {
    width?: string;
    height?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder_text: string;
    placeholder_size?: string;
    text_size?: string;
    background_color?: string;
    text_color?: string;
    text_indentation?: string;
    border_color?: string;
    border_width?: string;
    border_radius?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
    transition_duration?: string;

    border_color_focus?: string;
    text_color_focus?: string;
    placeholder_size_focus?: string;
}

const InputString = ({
    width = "312px",
    height = "56px",
    onChange,
    onFocus,
    onBlur,
    placeholder_text,
    placeholder_size = "16px",
    text_size = "16px",
    background_color = "#000000",
    text_color = "#9B9B9B",
    text_indentation = "16px",
    border_color = "#343434",
    border_width = "2.6px",
    border_radius = "8px",
    type = 'text',
    transition_duration = ".8s",

    border_color_focus = "#FF6B4A",
    text_color_focus = "#FF6B4A",
    placeholder_size_focus = "14px",
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
    };

    const inputStyles = {
        width: width,
        height: height,
        fontSize: text_size,
        backgroundColor: background_color,
        color: isFocused || value !== "" ? text_color_focus : text_color,
        borderColor: isFocused || value !== "" ? border_color_focus : border_color,
        borderWidth: border_width,
        paddingLeft: text_indentation,
        borderRadius: border_radius,
        transition: `all ${transition_duration} ease`,
    };

    const placeholderStyles = {
        fontSize: isFocused || value !== "" ? placeholder_size_focus : placeholder_size,
        color: isFocused || value !== "" ? text_color_focus : text_color,
        left: text_indentation,
        top: isFocused || value !== "" ? "0%" : "50%",
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 48%, ${background_color} 48%)`,
        transform: `translateY(-50%)`,
        transition: `all ${transition_duration} ease`,
    };

    return (
        <div className="input_string" style={{
            width: width,
            height: height
        }}>
            <input
                className="input_string__input"
                type={type}
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyles} />
            <span
                className="input_string__placeholder"
                style={placeholderStyles}
            >{placeholder_text}</span>
        </div>
    )
}

export default InputString;