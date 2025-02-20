import Slider from "react-slick";
import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import slider5 from "../../assets/slider-image-4.jpeg";
import slider4 from "../../assets/slider-image-5.jpeg";

function HomeSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="w-[90%] mx-auto flex">
      <div className="w-full md:w-3/4">
        <Slider {...settings}>
          <img src={slider1} alt="slider1" className="w-full h-[400px]" />
          <img src={slider2} alt="slider2" className="w-full h-[400px]" />
          <img src={slider3} alt="slider3" className="w-full h-[400px]" />
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slider4} alt="slider4" className="w-full h-[200px]" />
        <img src={slider5} alt="slider3" className="w-full h-[200px]" />
      </div>
    </div>
  );
}

export default HomeSlider;
