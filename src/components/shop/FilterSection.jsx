import { Search, Tags, ArrowDownUp, Coins } from 'lucide-react';

const FilterSection = ({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  ordering, setOrdering,
  priceRange, setPriceRange,
  categories
}) => {

  // Helper to update just one part of the price array (Unchanged Logic)
  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  return (
    <div className="bg-base-100 p-8 rounded-[2rem] shadow-2xl border border-base-200 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">

        {/* --- Search Input --- */}
        <div className="form-control w-full">
          <label className="label py-0 pb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60 flex items-center gap-2">
              <Search size={12} /> Search Directory
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Deep Clean..."
              className="input w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 px-5 font-bold text-base transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- Category Dropdown --- */}
        <div className="form-control w-full">
          <label className="label py-0 pb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60 flex items-center gap-2">
              <Tags size={12} /> Classification
            </span>
          </label>
          <select
            className="select w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 px-5 font-bold text-base transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* --- Ordering Dropdown --- */}
        <div className="form-control w-full">
          <label className="label py-0 pb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60 flex items-center gap-2">
              <ArrowDownUp size={12} /> Sort Order
            </span>
          </label>
          <select
            className="select w-full bg-base-200/50 border-transparent focus:bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl h-14 px-5 font-bold text-base transition-all"
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
          >
            <option value="">Recommended</option>
            <option value="price">Investment: Low to High</option>
            <option value="-price">Investment: High to Low</option>
            <option value="-avg_rating">Highest Rated</option>
          </select>
        </div>

        {/* --- Price Range (Min / Max) --- */}
        <div className="form-control w-full">
          <label className="label py-0 pb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/60 flex items-center gap-2">
              <Coins size={12} /> Investment Range
            </span>
          </label>

          <div className="bg-base-200/30 border border-base-200 p-4 rounded-2xl flex flex-col gap-3">
            {/* Number Inputs */}
            <div className="flex justify-between items-center gap-3">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 font-black italic text-xs">€</span>
                <input
                  type="number"
                  min={0}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="input input-sm w-full pl-7 bg-base-100 border-transparent focus:border-primary rounded-xl font-bold text-sm h-10 transition-colors"
                />
              </div>
              <span className="text-base-content/30 font-black">-</span>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 font-black italic text-xs">€</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  max={500}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="input input-sm w-full pl-7 bg-base-100 border-transparent focus:border-primary rounded-xl font-bold text-sm h-10 transition-colors"
                />
              </div>
            </div>

            {/* Range Sliders */}
            <div className="flex flex-col gap-1 mt-1">
              <input
                type="range"
                min={0}
                max={priceRange[1]}
                step={10}
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="range range-primary range-xs w-full opacity-70 hover:opacity-100 transition-opacity"
              />
              <input
                type="range"
                min={priceRange[0]}
                max={500}
                step={10}
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="range range-primary range-xs w-full opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSection;