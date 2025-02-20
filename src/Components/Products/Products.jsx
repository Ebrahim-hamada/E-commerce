import RecentProducts from "../RecentProducts/RecentProducts";
import Scroll from "../Scroll/Scroll";
import useFetch from "../../Hooks/useFetsh";
import Loading from "./../Loading/Loading";
import Pagination from './../Paginate/Paginate';

function Products() {
  const { dataList, loading, getAllDetails, pageCount } = useFetch(`products`);

  Scroll();

  return (
    <div>
      <div className="text-center py-3 shadow-md shadow-emerald-500 w-3/4 md:w-1/3 mx-auto rounded-md my-10">
        <h1 className="text-2xl font-bold text-emerald-500 uppercase">
          Our Products
        </h1>
      </div>

      {loading ? (
        <Loading /> // عرض اللودينج أثناء تحميل البيانات
      ) : (
        <div className="flex flex-wrap justify-center gap-6 p-5">
          {dataList?.map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}

        </div>
      )}
      <Pagination getAllDetails={getAllDetails} pageCount={pageCount} />
    </div>
  );
}

export default Products;
