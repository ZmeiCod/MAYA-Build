import React from "react";
import axios from "axios"; 

export default function Carousel() {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
  const [sliders, setSliders] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}api/carousel`);
      const products = response.data;
      setSliders(products);
    } catch (error) {
      alert("Произошла ошибка при получении слайдов");
      console.log(error);
      setSliders([]);
    }
  };

  React.useEffect(() => {
    getProducts();
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

  return (
    <div className="carousel">
      {sliders.map((slide, index) => (
        
        <img
          key={slide.id}
          className={`slider-list ${index === currentSlide ? "active" : ""}`}
          src={REACT_APP_API_URL + slide.image}
          alt={slide.name}
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
