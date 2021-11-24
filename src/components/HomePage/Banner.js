import classes from "./Banner.module.css";
import banner11 from "../../resources/banner11.jpeg";
import banner6 from "../../resources/banner6.jpg";
import banner9 from "../../resources/banner9.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Roll from "react-reveal/Roll";
import WelcomeBanner from "../../resources/welcome_banner.jpg"
const images = [
  {
    image: WelcomeBanner,
  },
  {
    image: banner9,
  },
  {
    image: banner6,
  },
  {
    image: banner11,
  },
];

const Banner = (props) => {
  return (
    <Carousel showArrows stopOnHover infiniteLoop autoPlay showThumbs={false} >
      {images.map((item, index) => {
        return (
          <div key={index} className={classes.mainDiv}>
            <Roll >
              <img
                className={classes.bannerImage}
                src={item.image}
                alt={index}
              />
            </Roll>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
