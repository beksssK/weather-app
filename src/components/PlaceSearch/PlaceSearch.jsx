import React, { useCallback, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const PlaceSearch = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const handleAddressChange = useCallback((address) => {
    setAddress(address);
  }, []);

  const handleSelect = useCallback(
    (address) => {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          navigate(`/detailed?lon=${latLng.lng}&lat=${latLng.lat}`);
        })
        .catch((error) => console.error("Error", error));
    },
    [navigate]
  );

  return (
    <div className="place-search">
      <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "place-search__field",
              })}
            />
            <div className="place-results autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, idx) => {
                const className = suggestion.active
                  ? "place-results__item suggestion-item--active"
                  : "place-results__item suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={idx}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlaceSearch;
