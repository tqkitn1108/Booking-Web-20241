import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function RatingComponent({ rating }) {
  let textToShow;
  if (rating !== undefined && rating !== null) {
    if (rating >= 9.0) {
      textToShow = "Tuyệt hảo";
    } else if (rating >= 8.0) {
      textToShow = "Rất tốt";
    } else if (rating >= 7.0) {
      textToShow = "Tốt";
    } else if (rating >= 6.0) {
      textToShow = "Dễ chịu";
    } else textToShow = "Bình thường";
  }
  return textToShow;
}

const SearchItem = ({ hotel, location }) => {
  const navigate = useNavigate();

  const renderStars = (value) => {
    const stars = [];
    if (value > 0) {
      for (let i = 0; i < value; i++) {
        stars.push(
          <span key={i} className="text-yellow-500">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  function mapSearchString(str) {
    return "https://www.google.com/maps/place/" + str.split(" ").join("+");
  }

  function handleClick(id) {
    navigate(`/hotels/${id}` + location.search);
  }

  return (
    <div className="border border-gray-300 p-2.5 rounded-md flex justify-between gap-5 mb-5 w-full bg-[#f2f9fa]">
      <img src={hotel.photos[0]} alt="" className="siImg" />
      <div className="flex flex-col gap-2.5 flex-2">
        <div className="inline-flex items-center">
          <h1 className="text-2xl text-[#0071c2]">{hotel.name}</h1>
          <div className="ml-2.5 flex">{renderStars(hotel.star)}</div>
        </div>
        <div className="text-xs mt-[-2.5px] mb-2.5 inline-block font-semibold">
          <a
            id="address"
            href={mapSearchString(hotel.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hotel.address}
          </a>
          <a
            href={mapSearchString(hotel.address)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem trên bản đồ
          </a>
        </div>
        <span className="text-sm line-clamp-3 overflow-hidden break-words">
          {hotel.description}
        </span>
        <span className="text-xs"></span>
        {hotel.facilities?.[0]?.label && (
          <span className="text-xs text-green-custom font-bold">
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
            {hotel.facilities?.[0]?.label}
          </span>
        )}
        {hotel.facilities?.[1]?.label && (
          <span className="text-xs text-green-custom font-bold">
            <FontAwesomeIcon icon={faCheck} className="mr-2 text-base" />
            {hotel.facilities?.[1]?.label}
          </span>
        )}
        <span className="text-xs text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-between max-w-[130px] relative">
        <div className="flex justify-end mr-[7px] max-w-[110px] ml-3.5 font-medium">
          <span className="float-right mr-2.5 text-sm whitespace-nowrap">
            <RatingComponent rating={hotel.rating}></RatingComponent>
          </span>
          <button className="bg-[#0a4fb0] text-white px-1.5 font-bold rounded-md rounded-br-none shadow-lg">
            {hotel.rating.toFixed(1)}
          </button>
        </div>
        <div className="text-right flex flex-col gap-1.5">
          <span className="text-lg">Giá 1 đêm</span>
          <span className="text-base font-semibold text-[#0071c2]">
            {hotel.minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            VND
          </span>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            Includes taxes and fees
          </span>
          <button
            className="bg-[#0071c2] text-white font-bold text-sm px-2.5 py-2 rounded-md max-w-[150px] cursor-pointer whitespace-nowrap"
            onClick={() => handleClick(hotel.id)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
