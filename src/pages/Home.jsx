import Reveal from "../components/Animations/Reveal";
import CategoryList from "../components/categories/CategoryList";
import ServiceList from "../components/clientservice/ServiceList";
import Features from "../components/home/Features";
import HeroCarousel from "../components/home/HeroCarousel";
import PWASpotlight from "../components/home/PWASpotlight";
import ServiceSpotlight from "../components/home/ServiceSpotlight";
import ReviewList from "../components/reviews/ReviewList";

const Home = () => {
  return (
    <>
      <HeroCarousel />
      
      <div className="flex flex-col gap-20 py-10"> {/* Added spacing for better scroll effect */}
        <Reveal>
          <PWASpotlight />
        </Reveal>

        <Reveal>
          <ServiceSpotlight />
        </Reveal>

        <Reveal>
          <CategoryList />
        </Reveal>

        <Reveal>
          <ServiceList />
        </Reveal>

        <Reveal>
          <Features />
        </Reveal>

        <Reveal>
          <ReviewList />
        </Reveal>
      </div>
    </>
  );
};

export default Home;