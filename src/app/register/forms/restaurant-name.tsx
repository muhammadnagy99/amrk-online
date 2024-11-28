import { useEffect, useState } from "react";

interface props {
  onNext: () => void;
  restaurantName: string
  onChange: (restaurantName: string) => void;
}

export default function RestaurantName({ onNext, restaurantName, onChange }: props) {

  const [restaurantNameTemp, setRestaurantName] = useState(restaurantName);

  useEffect(() => {
    setRestaurantName(restaurantName);
  }, [restaurantName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setRestaurantName(newName);
    onChange(newName);  // Notify parent about the change
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10">
        <h1 className="text-primText text-xl lg:text-3xl font-semibold text-center">
          Welcome To Amrk Online
        </h1>

        <div className="w-full flex flex-col justify-start gap-2">
          <label
            htmlFor="restaurant-name"
            className="text-sm lg:text-xl font-medium text-primText"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurant-name"
            id="restaurant-name"
            className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
            placeholder="Enter Here.."
            value={restaurantNameTemp}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg" onClick={handleNext}>
        Continue
      </button>
    </form>
  );
}
