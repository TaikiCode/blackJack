import { ReactNode, VFC } from "react";

interface Props {
    displayText: string
    children: ReactNode
}

const Tooltip: VFC<Props> = ({ displayText, children }) => {
    return (
        <div className="tooltip" data-tip={displayText}>
            {children}
        </div>
    );
};

export default Tooltip;
