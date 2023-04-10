import { useEffect, useRef, useState } from "react";
import LeftArrowIcon from "./icons/LeftArrowIcon";
import RightArrowIcon from "./icons/RightArrowIcon";

const Carousel = () => {
  const carouselImages = useRef([
    {
      src: `https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80`,
    },
    {
      src: `https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80`,
    },
    {
      src: `https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80`,
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [styled, setStyled] = useState({ translate: `-${current}00%` });
  const imgSize = useRef(carouselImages.current.length);

  const onSlide = (i: number) => {
    let nextIdx = current + i;
    if (nextIdx < 0) nextIdx = imgSize.current - 1;
    else if (nextIdx >= imgSize.current) nextIdx = 0;
    setCurrent(nextIdx);
  };

  useEffect(() => {
    setStyled({ translate: `-${current}00%` });
  }, [current]);

  return (
    <>
      <div
        id="indicators-carousel"
        className="relative w-full mb-10"
        data-carousel="static"
      >
        {/* Slide */}
        <div className="flex items-center justify-center ">
          <div className="w-full overflow-hidden rounded-lg h-80 bg-slate-500">
            <div className="flex transition-all" style={styled}>
              {carouselImages.current.map((img, i) => (
                <img
                  key={i}
                  className="flex-none object-cover w-full h-80"
                  src={img.src}
                  alt="캐러셀이미지"
                ></img>
              ))}
            </div>
          </div>
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 ">
          {carouselImages.current.map((el, i) => (
            <button
              type="button"
              key={i}
              className={`w-3 h-3 rounded-full transition ease-in-out delay-100 ${
                i === current
                  ? " w-2.5 h-2.5 bg-gray-400"
                  : "bg-gray-200  w-2.5 h-2.5"
              }`}
              aria-current="true"
              aria-label="Slide indicators"
              data-carousel-slide-to="0"
            ></button>
          ))}
        </div>

        {/* Slider Btn */}
        <button
          type="button"
          className="absolute flex items-center justify-center w-3 p-3 px-4 transition ease-in-out rounded-lg cursor-pointer delay-50 left-3 top-8 h-4/5 group-focus:outline-none bg-white/50 hover:bg-white/30"
          onClick={() => onSlide(-1)}
          data-carousel-prev
        >
          <LeftArrowIcon />
        </button>

        <button
          type="button"
          className="absolute flex items-center justify-center w-3 p-3 px-4 transition ease-in-out rounded-lg cursor-pointer top-8 h-4/5 right-3 group-focus:outline-none bg-white/50 hover:bg-white/30 delay-50"
          onClick={() => onSlide(1)}
          data-carousel-next
        >
          <RightArrowIcon />
        </button>
      </div>
    </>
  );
};

export default Carousel;
