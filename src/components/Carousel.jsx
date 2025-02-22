import React from 'react';

export default function Carousel({ sliders }) {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [sliders]);

    return (
        <div className="carousel">
            {sliders.map((slide, index) => (
                <img
                    key={slide.id}
                    className={`slider-list ${index === currentSlide ? 'active' : ''}`}
                    src={slide.image}
                    alt={slide.name}
                    style={{
                        display: index === currentSlide ? 'block' : 'none',
                        objectFit: 'cover', // добавлено для сохранения соотношения сторон
                    }}
                />
            ))}
            <div className="slider-dots">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}