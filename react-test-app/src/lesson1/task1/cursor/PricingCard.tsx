interface PricingCardProps {
    plan: string;
    price: string;
    features: string[];
    isFeatured?: boolean;
}

const PricingCard = ({
    plan,
    price,
    features,
    isFeatured = false,
}: PricingCardProps) => {
    return (
        <div
            className={`
        flex flex-col p-6 rounded-lg transition-all duration-200
        ${isFeatured ? "bg-slate-700 text-white" : "bg-white text-slate-900"}
        hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500
        sm:w-[300px] w-full
      `}
        >
            <h3 className="text-lg font-medium mb-2">{plan}</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${price}</span>
            </div>

            <ul className="flex-grow space-y-4 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                className={`
          w-full py-2 px-4 rounded-md font-medium transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
              isFeatured
                  ? "bg-white text-slate-900 hover:bg-gray-100 focus:ring-white"
                  : "bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-700"
          }
        `}
            >
                SUBSCRIBE
            </button>
        </div>
    );
};

export { PricingCard as PricingCardCursor };
