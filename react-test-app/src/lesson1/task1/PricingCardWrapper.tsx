import { PricingCardGPT } from "./chatGPT/PricingCard";
import { PricingCardCursor } from "./cursor/PricingCard";

export default function PricingCardWrapper() {
    return (
        <div
            style={{ display: "flex", flexFlow: "column nowrap", gap: "50px" }}
        >
            <div
                style={{ display: "flex", flexFlow: "row nowrap", gap: "50px" }}
            >
                <PricingCardGPT
                    plan="Standard"
                    price="100"
                    features={[
                        "50,000 Requests",
                        "4 contributors",
                        "Up to 5 GB storage space",
                    ]}
                />

                <PricingCardGPT
                    plan="Pro"
                    price="200"
                    features={[
                        "100,000 Requests",
                        "7 contributors",
                        "Up to 8 GB storage space",
                    ]}
                    isFeatured={true}
                />

                <PricingCardGPT
                    plan="Expert"
                    price="300"
                    features={[
                        "200,000 Requests",
                        "11 contributors",
                        "Up to 10 GB storage space",
                    ]}
                />
            </div>

            <div
                style={{ display: "flex", flexFlow: "row nowrap", gap: "50px" }}
            >
                <PricingCardCursor
                    plan="Standard"
                    price="100"
                    features={[
                        "50,000 Requests",
                        "4 contributors",
                        "Up to 5 GB storage space",
                    ]}
                />

                <PricingCardCursor
                    plan="Pro"
                    price="200"
                    features={[
                        "100,000 Requests",
                        "7 contributors",
                        "Up to 8 GB storage space",
                    ]}
                    isFeatured={true}
                />

                <PricingCardCursor
                    plan="Expert"
                    price="300"
                    features={[
                        "200,000 Requests",
                        "11 contributors",
                        "Up to 10 GB storage space",
                    ]}
                />
            </div>
        </div>
    );
}
