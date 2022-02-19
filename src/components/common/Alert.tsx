import { VFC } from "react";

interface Props {
    displayText: string;
    className?: string;
}

const Alert: VFC<Props> = ({
    displayText,
    className = "bg-black text-base px-4 rounded-xl opacity-60 flex items-center font-mono",
}) => {
    return <div className={className}>{displayText}</div>;
};

export default Alert;
