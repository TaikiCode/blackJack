import { VFC } from "react";
import { Card } from "../../types/types";
import Alert from "../common/Alert";

interface Props {
    owner: string;
    cardTotal: number;
    cardTotalAlt: number;
    cards: Card[];
}

const CardList: VFC<Props> = ({ owner, cardTotal, cardTotalAlt, cards }) => {
    const displayTotal = (total: number, totalAlt: number) => {
        return total !== totalAlt && totalAlt <= 21
            ? total + "/" + totalAlt
            : total.toString();
    };

    return (
        <div className="h-1/2 p-4">
            <div className="h-1/5 flex justify-center text-center">
                <Alert
                    displayText={`${owner} ${displayTotal(
                        cardTotal,
                        cardTotalAlt
                    )}`}
                />
            </div>
            <div className="h-4/5 text-center">
                {cards && cards.map((card) => (
                    <img src={card.image} className="h-full inline m-2" />
                ))}
            </div>
        </div>
    );
};

export default CardList;
