import { VFC } from "react";

interface Props {
    displayText: string;
    className?: string;
    onClick: () => void;
}

const Button: VFC<Props> = ({
    displayText,
    className = "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
    onClick,
}) => {
    return (
        <button className={className} onClick={onClick}>
            {displayText}
        </button>
    );
};

export default Button;
