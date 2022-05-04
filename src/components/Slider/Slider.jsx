import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Slider = ({
  settings: { slidesPerShow, slidesToScroll, mobileBreakpoint },
  items,
}) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(null);

  const [windowSize] = useWindowSize();

  const slidesPerShowSlider = useMemo(() => {
    return windowSize < mobileBreakpoint ? 1 : slidesPerShow;
  }, [windowSize, slidesPerShow, mobileBreakpoint]);
  const slidesToScrollSlider = useMemo(() => {
    return windowSize < mobileBreakpoint ? 1 : slidesToScroll;
  }, [windowSize, slidesToScroll, mobileBreakpoint]);

  const slider = useRef(null);

  const lastItemIndex = useMemo(() => items.length - 1, [items]);
  const offset = useMemo(() => {
    return currentItem * (sliderWidth / slidesPerShowSlider);
  }, [currentItem, sliderWidth, slidesPerShowSlider]);

  const lastShowingItem = useMemo(
    () => lastItemIndex - slidesPerShowSlider + 1,
    [lastItemIndex, slidesPerShowSlider]
  );

  useEffect(() => {
    setSliderWidth(slider.current.offsetWidth);
  }, [slider, windowSize]);

  const nextSlider = useCallback(() => {
    if (lastShowingItem < currentItem + slidesToScrollSlider) {
      if (lastShowingItem === currentItem) {
        setCurrentItem(0);
      } else {
        setCurrentItem(lastShowingItem);
      }
    } else {
      setCurrentItem(currentItem + slidesToScrollSlider);
    }
  }, [currentItem, lastShowingItem, slidesToScrollSlider]);

  const previousSlider = useCallback(() => {
    if (currentItem - slidesToScrollSlider >= 0) {
      setCurrentItem(currentItem - slidesToScrollSlider);
    } else if (!currentItem) {
      setCurrentItem(lastItemIndex - slidesPerShowSlider + 1);
    } else {
      setCurrentItem(0);
    }
  }, [currentItem, lastItemIndex, slidesToScrollSlider, slidesPerShowSlider]);

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
    <div className="slider__wrapper">
      <div className="slider" ref={slider}>
        <div
          className="slider__track"
          style={{
            width: `${sliderWidth * items.length}px`,
            left: `-${offset}px`,
          }}
        >
          {items.map((item, idx) => (
            <Link
              exact="exact"
              to={`/detailed?lon=${item.coord.lon}&lat=${item.coord.lat}`}
              style={{
                width: `${sliderWidth / slidesPerShowSlider}px`,
              }}
              key={idx}
              className="slider__item"
            >
              <div
                className="slider__content"
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              >
                <div className="slider__info">{item?.info}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        className="slider__button slider__button--previous"
        onClick={previousSlider}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="slider__button-icon" />
      </button>
      <button
        className="slider__button slider__button--next"
        onClick={nextSlider}
      >
        <FontAwesomeIcon icon={faArrowRight} className="slider__button-icon" />
      </button>
      <ul className="slider__dots">
        {items.map((item, idx) => (
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
