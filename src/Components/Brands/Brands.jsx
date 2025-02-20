import { NavLink } from "react-router-dom";
import useBrands from "../../Hooks/useBrands";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";

function Brands() {
  const { data, isLoading, error } = useBrands();
  Scroll();

  if (isLoading) return <Loading />;
  if (error) console.log("error fetch brands", error);

  return (
    <div className="py-10">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center ">
        <div className="flex flex-col justify-center items-center text-center p-4 rounded-xl h-full">
          <h3 className="text-emerald-600 pb-4 text-2xl font-bold">
            Our Brands :
          </h3>
          <p className="font-extralight text-lg text-gray-500 dark:text-gray-400">
            You can see our brands, and each brand includes the products in it.
          </p>
        </div>

        {data.map((brand) => (
          <div
            key={brand._id}
            className="flex justify-center items-center shadow-lg rounded-3xl"
          >
            <NavLink to={`/brandsProducts/${brand.name}`}>
              <img
                src={brand.image}
                alt={brand.name}
                className="h-[200px] w-full rounded-3xl"
              />
              <div>
                <h6 className="font-extralight text-center p-3 text-emerald-700 text-2xl">
                  {brand.name}
                </h6>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
