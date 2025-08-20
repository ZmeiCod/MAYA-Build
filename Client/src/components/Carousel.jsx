import React from "react";
import axios from "axios"; 

export default function Carousel() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [sliders, setSliders] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const getCarousel = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/carousel`);
      const products = response.data;
      setSliders(products);
    } catch (error) {
      console.error("Ошибка при загрузке слайдера");
      setSliders([]);
    }
  };

  React.useEffect(() => {
    getCarousel();
  }, []);

  const slidersRef = React.useRef(sliders);
  React.useEffect(() => {
    slidersRef.current = sliders;
  }, [sliders]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidersRef.current.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Определяем состояние (мобильное или десктопное)
  const isMobile = window.innerWidth <= 800;

  return (
    <div className="carousel">
      {sliders.map((slide, index) => (
        <img
          key={slide.id}
          className={`slider-list ${index === currentSlide ? "active" : ""}`}
          src={isMobile ? 
            REACT_APP_API_URL + "/api/static/" + slide.smallImage : 
            REACT_APP_API_URL + "/api/static/" + slide.image}
          alt=""
          style={{
            display: index === currentSlide ? "block" : "none",
            objectFit: "cover",
          }}
        />
      ))}
      <div className="slider-dots">
        {sliders.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
