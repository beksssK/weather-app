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

const Slider = ({ settings: { slidesPerShow, slidesToScroll }, items }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(null);

  const [windowSize] = useWindowSize();
  const slider = useRef(null);

  const lastItemIndex = useMemo(() => items.length - 1, [items]);
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
  }, [currentItem, lastShowingItem, slidesToScroll]);

  const previousSlider = useCallback(() => {
    if (currentItem - slidesToScroll >= 0) {
      setCurrentItem(currentItem - slidesToScroll);
    } else if (!currentItem) {
      setCurrentItem(lastItemIndex - slidesPerShow + 1);
    } else {
      setCurrentItem(0);
    }
  }, [currentItem, lastItemIndex, slidesToScroll, slidesPerShow]);

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
                width: `${sliderWidth / slidesPerShow}px`,
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
