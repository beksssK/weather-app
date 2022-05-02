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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-regular-svg-icons";

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
  const [currentItem, setCurrentItem] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(null);

  const [windowSize] = useWindowSize();
  const slider = useRef(null);

  const lastItemIndex = useMemo(() => temp.length - 1, [temp]);
  const offset = useMemo(() => {
    return currentItem * (sliderWidth / slidesPerShow);
  }, [currentItem, sliderWidth, slidesPerShow]);

  const lastShowingItem = useMemo(
    () => lastItemIndex - slidesPerShow + 1,
    [lastItemIndex, slidesPerShow]
  );

  useEffect(() => {
    setSliderWidth(slider.current.offsetWidth);
  }, [slider, windowSize]);

  const nextSlider = useCallback(() => {
    if (lastShowingItem < currentItem + slidesToScroll) {
      if (lastShowingItem === currentItem) {
        setCurrentItem(0);
      } else {
        setCurrentItem(lastShowingItem);
      }
    } else {
      setCurrentItem(currentItem + slidesToScroll);
    }
  }, [currentItem, lastShowingItem]);

  const previousSlider = useCallback(() => {
    if (currentItem - slidesToScroll >= 0) {
      setCurrentItem(currentItem - slidesToScroll);
    } else if (!currentItem) {
      setCurrentItem(lastItemIndex - slidesToScroll);
    } else {
      setCurrentItem(0);
    }
  }, [currentItem, lastItemIndex, slidesToScroll]);

  const handleDotClick = useCallback(
    (idx) => {
      if (lastShowingItem <= idx) {
        setCurrentItem(lastShowingItem);
      } else {
        setCurrentItem(idx);
      }
    },
    [lastShowingItem]
  );

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
            className="slider__item"
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
      <ul className="slider__dots">
        {temp.map((item, idx) => (
          <li className="slider__dot" key={idx}>
            <button
              className="slider__dot-button"
              onClick={() => handleDotClick(idx)}
            >
              {idx === currentItem ? (
                <FontAwesomeIcon icon={faDotCircle} />
              ) : (
                <FontAwesomeIcon icon={faCircle} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
