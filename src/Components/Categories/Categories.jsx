import { NavLink } from "react-router-dom";
import useGategory from "../../Hooks/useGategory";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";

function Categories() {
  const { data = [], isLoading } = useGategory();
  Scroll();

  if (isLoading) return <Loading />;

  return (
    <div className="py-8">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        <div className="flex flex-col justify-center items-center text-center p-4 rounded-xl h-full">
          <h3 className="text-emerald-600 pb-4 text-2xl font-bold">
            Our Categories :
          </h3>
          <p className="font-extralight text-lg text-gray-500 dark:text-gray-400">
            You can see our categories and each category includes the products
            in it.
          </p>
        </div>

        {data.map((category) => (
          <div
            className="shadow-lg rounded-3xl overflow-hidden"
            key={category._id}
          >
            <NavLink to={`/categoryProducts/${category.name}`}>
              <div className="rounded-2xl shadow">
                <img
                  className="h-[300px] w-full"
                  src={category.image}
                  alt={category.name}
                />
                <div>
                  <h6 className="font-bold text-center p-3 text-emerald-500 text-lg">
                    {category.name}
                  </h6>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
