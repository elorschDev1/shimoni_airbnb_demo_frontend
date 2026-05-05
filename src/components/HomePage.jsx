import NavigationMenu from "./NavigationMenu";
import HeroSection from "./HeroSection";
import Amenities from "./Amenities";
import Gallery from "./Gallery";
import Location from "./Location";
import Pricing from "./Pricing";
import Reviews from "./Reviews";
import AddReview from "./AddReview";
const HomePage=()=>{
    return (
        <section className="bg-white">
        <NavigationMenu/>
        <HeroSection/>
        <Amenities/>
        <Gallery/>
        <Location/>
        <Pricing/>
        <Reviews/>
        <AddReview/>
        </section>
    )
}

export default HomePage;