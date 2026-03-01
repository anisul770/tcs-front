import CategoryList from "../components/categories/CategoryList";
import ServiceList from "../components/clientservice/ServiceList";
import Features from "../components/home/Features";
import HeroCarousel from "../components/home/HeroCarousel";
import ServiceSpotlight from "../components/home/ServiceSpotlight";
import ReviewList from "../components/reviews/ReviewList";

const Home = () => {
  return (
    <>
      <HeroCarousel/>
      <ServiceSpotlight/>
      <CategoryList/>
      <ServiceList/>
      <Features/>
      <ReviewList/>
    </>
  );
};

export default Home;