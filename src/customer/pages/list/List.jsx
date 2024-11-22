import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { filters } from "../../../data/filterData.js";
import api from "../../../api/AxiosConfig.js";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner.jsx";
import Navbar from "../../navbar/Navbar.jsx";
import Header from "../../header/Header.jsx";

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    renderHotels();
  }, [location.search]);

  async function renderHotels() {
    setLoading(true);
    try {
      const response = await api.get(location.pathname + location.search);
      setHotels(response.data.content);
      setCurrentPage(response.data.number + 1);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  }

  const handleFilter = (value, sectionId) => {
    searchParams.set("page", 0);
    let filterValue = searchParams.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }
    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  const startDateString = searchParams.get("start_date");
  const endDateString = searchParams.get("end_date");

  // Chuyển đổi chuỗi ngày thành đối tượng Date hoặc Moment (nếu sử dụng thư viện moment.js)
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Tính số ngày bằng cách lấy hiệu của ngày kết thúc và ngày bắt đầu
  const numberOfDays = Math.floor(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // price range
  // const [rangeValue, setRangeValue] = useState(2000000); // Giá trị mặc định của thanh trượt

  // const handleRangeChange = (event) => {
  //     setRangeValue(event.target.value);
  // };
  const isItemsEmpty = hotels.length === 0;

  return (
    <div>
      <Navbar />
      <Header showTitle={false} />
      {loading && <LoadingSpinner />}

      <div className="flex justify-center">
        <div className="flex max-w-[1100px] w-full mt-[60px]">
          <div className="max-w-[25%]">
            <div className="w-[221px] flex justify-end mt-[-0.8px] text-sm">
              <div className="flex-1 p-2.5 bg-white sticky border border-gray-300 w-full">
                <h2 className="text-[18px]">Chọn lọc theo:</h2>
              </div>
            </div>
            {filters.map((filter) => (
              <div
                key={filter.id}
                className="w-[221px] flex justify-end mt-[-0.8px] text-sm"
              >
                <div className="flex-1 p-2.5 bg-white sticky border border-solid border-[#d7d4d4] w-full">
                  <h3 className="text-[#555] text-base font-bold mb-2.5">
                    {filter.name}{" "}
                  </h3>
                  <div>
                    {filter.options.map((option) => (
                      <div key={option.value}>
                        <input
                          className="cursor-pointer p-[7.5px]"
                          type="checkbox"
                          checked={
                            !!searchParams
                              .get(filter.id)
                              ?.split(",")
                              .includes(option.value)
                          }
                          value={option.value}
                          id={option.value}
                          onChange={() => handleFilter(option.value, filter.id)}
                        />
                        <label
                          className="cursor-pointer"
                          htmlFor={option.value}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-[80%] justify-center ml-[15px]">
            {isItemsEmpty ? (
              <div className="flex justify-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-[200px]"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p className="font-bold text-[25px] ml-[100px]">
                    Không tìm thấy kết quả
                  </p>
                  <p className="ml-[30px]">
                    Không có kết quả phù hợp với tìm kiếm của bạn. Hãy thử lại.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-[110%]">
                {hotels.map((hotel) => (
                  <SearchItem
                    key={hotel.id}
                    hotel={hotel}
                    location={location}
                  />
                ))}

                <div className="flex justify-center items-center">
                  <div className="flex">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      searchParams={searchParams}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
