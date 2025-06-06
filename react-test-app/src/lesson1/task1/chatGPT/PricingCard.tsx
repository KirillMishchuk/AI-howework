import React from "react";

interface PricingCardProps {
    plan: string;
    price: string;
    features: string[];
    isFeatured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
    plan,
    price,
    features,
    isFeatured = false,
}) => {
    return (
        <div
            className={`
        w-full max-w-sm 
        border 
        ${isFeatured ? "bg-blue-700 text-white" : "bg-white border-gray-200"} 
        rounded-lg 
        shadow-sm 
        transition 
        transform 
        hover:shadow-lg 
        focus-within:ring-4 
        focus-within:ring-blue-500
        sm:flex-1
      `}
            tabIndex={0}
        >
            <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                <p className="text-4xl font-bold mb-4">{price}</p>
                <ul className="mb-6 space-y-2">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className={`text-sm ${
                                isFeatured ? "text-white" : "text-gray-600"
                            }`}
                        >
                            {feature}
                        </li>
                    ))}
                </ul>
                <button
                    className={`
            w-full 
            py-2 
            px-4 
            rounded 
            border 
            ${
                isFeatured
                    ? "bg-white text-blue-700 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          `}
                >
                    SUBSCRIBE
                </button>
            </div>
        </div>
    );
};

export { PricingCard as PricingCardGPT };
