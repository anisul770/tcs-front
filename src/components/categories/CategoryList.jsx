import React from 'react';
import CategoryCard from './CategoryCard';
import useCategories from '../../hooks/useCategories';

const CategoryList = () => {
  // This array will eventually be: const [categories, setCategories] = useState([]);
  const { categories, loading ,errorMsg} = useCategories();

  // const categories = [
  //   { id: 1, name: "Residential", icon: "🏠", service_count: 12 },
  //   { id: 2, name: "Commercial", icon: "🏢", service_count: 5 },
  //   { id: 3, name: "Deep Clean", icon: "✨", service_count: 8 },
  //   { id: 4, name: "Specialized", icon: "💎", service_count: 3 },
  // ];
  if (errorMsg) return <div className="text-error text-center py-10">Failed to load categories.</div>;
  return (
    <section className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest">Browse Categories</h2>
        {loading ? (
          <div className='text-center py-10'>
            <span className="loading loading-xl loading-spinner text-error"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {categories.map((cat, i) => (
              (i < 4) &&
              <CategoryCard
                key={cat.id}
                name={cat.name}
                icon={cat.icon}
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