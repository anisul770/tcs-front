import CategoryCard from './CategoryCard';
import useCategories from '../../hooks/useCategories';

const CategoryList = () => {
  const { categories, loading, errorMsg } = useCategories();

  if (errorMsg) return (
    <div className="flex flex-col items-center py-20">
      <div className="alert alert-error max-w-md shadow-lg">
        <span className="font-bold uppercase text-xs">Failed to load cleaning categories.</span>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-base-200/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-md">
            <h2 className="text-3xl font-black italic text-base-content uppercase tracking-tighter">
              Browse <span className="text-primary">Categories</span>
            </h2>
            <p className="text-sm text-base-content/60 font-medium">
              Select a specialized cleaning service tailored for your specific needs.
            </p>
          </div>
          <div className="h-1 w-24 bg-primary rounded-full hidden md:block mb-2"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-base-100 animate-pulse border border-base-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(0, 4).map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                name={cat.name}
                service_count={cat.service_count}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryList;