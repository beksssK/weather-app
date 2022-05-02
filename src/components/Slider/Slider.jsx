import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Slider.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import arrowButton from "./../../assets/icons/right-solid.svg";

const Slider = ({ items }) => {
  const slidesPerShow = 3;
  const slidesToScroll = 2;
  const temp = [
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
    { img: "https://picsum.photos/500/600" },
  ];
  const lastItemIndex = useMemo(() => temp.length - 1, [temp]);
  const [windowSize] = useWindowSize();
  const [currentItem, setCurrentItem] = useState(0);
  const slider = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(null);

  useEffect(() => {
    setSliderWidth(slider.current.offsetWidth);
  }, [slider, windowSize]);

  const nextSlider = useCallback(() => {
    if (lastItemIndex - slidesPerShow + 1 < currentItem + slidesToScroll) {
      if (lastItemIndex - slidesPerShow + 1 === currentItem) {
        setCurrentItem(0);
      } else {
        setCurrentItem(lastItemIndex - slidesPerShow + 1);
      }
    } else {
      setCurrentItem(currentItem + slidesToScroll);
    }
  }, [currentItem, lastItemIndex, slidesPerShow]);

  const previousSlider = useCallback(() => {
    if (currentItem - slidesToScroll >= 0) {
      setCurrentItem(currentItem - slidesToScroll);
    } else if (!currentItem) {
      setCurrentItem(lastItemIndex - slidesToScroll);
    } else {
      setCurrentItem(0);
    }
  }, [currentItem, lastItemIndex, slidesToScroll]);

  const offset = useMemo(() => {
    return currentItem * (sliderWidth / slidesPerShow);
  }, [currentItem, sliderWidth, slidesPerShow]);

  return (
      <div className="slider" ref={slider}>
        <div
          className="slider__track"
          style={{
            width: `${sliderWidth * temp.length}px`,
            left: `-${offset}px`,
          }}
        >
          {temp.map((item, idx) => (
            <div
              style={{
                width: `${sliderWidth / slidesPerShow}px`,
              }}
              key={idx}
              className={
                currentItem === idx
                  ? "slider__item slider__item--active"
                  : "slider__item"
              }
            >
              <div className="slider__content">
                <div className="slider__info">some info - {idx}</div>
                <img className="slider__img" src={item.img} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="slider__buttons">
          <button
            className="slider__button slider__button--previous"
            style={{ backgroundImage: `url(${arrowButton})` }}
            onClick={previousSlider}
          />
          <button
            style={{ backgroundImage: `url(${arrowButton})` }}
            className="slider__button"
            onClick={nextSlider}
          />
        </div>
      </div>

  );
};

export default Slider;
