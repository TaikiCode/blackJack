import { VFC } from "react";
import { Card, DealerInfo, PlayerInfo } from "../../types/types";
import Alert from "../common/Alert";

interface Props {
    owner: string;
    cardInfo: PlayerInfo | DealerInfo;
}

const CardList: VFC<Props> = ({ owner, cardInfo }) => {
    const { total, totalAlt, cards } = cardInfo;

    const displayTotal = (cardTotal: number, cardTotalAlt: number) => {
        return cardTotal !== cardTotalAlt && cardTotalAlt <= 21
            ? cardTotal + "/" + cardTotalAlt
            : cardTotal.toString();
    };

    return (
        <div className="h-1/2 p-4">
            <div className="h-1/5 flex justify-center text-center">
                <Alert
                    displayText={`${owner} ${displayTotal(total, totalAlt)}`}
                />
            </div>
            <div className="h-4/5 text-center">
                {cards &&
                    cards.map((card) => (
                        <img src={card.image} className="h-full inline m-2" />
                    ))}
            </div>
        </div>
    );
};

export default CardList;
