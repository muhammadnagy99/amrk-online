import CategoryRow from "./category-row";
// Define the necessary types for the props

interface Category {
  nameEn: string;
  nameAr: string;
}

interface Addon {
  name: string;
  price: string;
}

interface AddonGroup {
  name: string;
  minSelection: string;
  maxSelection: string;
  addons: {
    name: string;
    price: string;
  }[];
}

interface ItemObject {
  nameEn: string;
  nameAr: string;
  price: number;
  descriptionEn: string;
  descriptionAr: string;
  file?: File | null;
  addon: AddonGroup[];
}

interface Items {
  category: Category;
  items: ItemObject[];
}

// Update ReviewMenu to accept an array of `Items`
interface ReviewMenuProps {
  menuItems: Items[];
  onDeleteCategory: (categoryName: string) => void;
  onDeleteItem: (itemName: string) => void
}

export default function ReviewMenu({ menuItems, onDeleteCategory, onDeleteItem }: ReviewMenuProps) {
  return (
    <div className="flex flex-col w-full h-[500px] gap-5 p-4 overflow-y-auto custom-scrollbar justify-between ">
      <h3 className="text-xl font-semibold text-primText top-0">
        Review your menu
        <span className="ml-1 text-xs font-light">(Can edit later)</span>
      </h3>

      <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg h-[450px] overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => (
          <CategoryRow 
            key={index} 
            category={item.category.nameEn}
            dropdownItems={item.items.map((itemObj) => ({
              name: itemObj.nameEn,
              price: `${itemObj.price} SAR`
            }))} 
            onDeleteCategory={onDeleteCategory}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}
