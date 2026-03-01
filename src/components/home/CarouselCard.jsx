const CarouselCard = ({
  title,
  description,
  image,
  primaryBtnText,
  secondaryBtnText,
}) => {
  return (
    <div className="relative w-full h-full">
      
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        <p className="max-w-2xl mb-6 text-lg md:text-xl">
          {description}
        </p>

        <div className="flex gap-4">
          <button className="btn btn-primary">
            {primaryBtnText}
          </button>
          <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
            {secondaryBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
