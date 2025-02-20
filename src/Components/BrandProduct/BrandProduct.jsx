import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentProducts from "../RecentProducts/RecentProducts";
import Loading from "../Loading/Loading";
import Scroll from "../Scroll/Scroll";

function BrandProduct() {
  const [brand, setBrand] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { brandname } = useParams();
  Scroll();

  async function getBrandProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      let realted = data.data.filter((item) => item.brand.name === brandname);
      setBrand(realted);
    } catch (err) {
      setError(err.message);
      console.log(error);
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  useEffect(() => {
    getBrandProduct();
  }, [brandname]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="text-center py-3 shadow-md shadow-emerald-500 w-3/4 md:w-1/3 mx-auto rounded-md my-10">
        <h1 className="text-2xl font-bold text-emerald-500 uppercase">
          Shop {brandname} now !
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-5">
        {brand?.map((product, index) => (
          <RecentProducts key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BrandProduct;
