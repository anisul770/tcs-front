import React from 'react';

const CategoryCard = ({ name, icon, service_count }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-200 hover:border-primary transition-all cursor-pointer group">
      <div className="card-body items-center text-center p-6">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-400">
          {icon || "🧹"}
        </div>
        <h3 className="card-title text-lg">{name}</h3>
        <div className="badge badge-secondary badge-outline text-[10px] mt-2">
          {service_count || 0} SERVICES
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;