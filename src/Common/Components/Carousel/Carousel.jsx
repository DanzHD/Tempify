import './carousel.css'
import {Children, useEffect, useState} from "react";
export default function Carousel({
    children
}) {


    const [activeIndex, setActiveIndex] = useState(0);
    let carouselSlides = Children.toArray(children);

    const handlePrevious = () => {
        let index = activeIndex - 1;
        setActiveIndex(index < 0 ? activeIndex : index);
    }

    const handleNext = () => {
        let index = activeIndex + 1;
        setActiveIndex(activeIndex => index >= carouselSlides.length ? activeIndex : index)
    }




    return (
        <div className='carousel_container'>

            <span onClick={handlePrevious} className="material-symbols-outlined carousel_navigate">
                arrow_back_ios
            </span>

                <div className='carousel_slide'>
                    {carouselSlides[activeIndex]}
                </div>
            <span onClick={handleNext} className='material-symbols-outlined carousel_navigate'>
                arrow_forward_ios
            </span>

        </div>
    )
}