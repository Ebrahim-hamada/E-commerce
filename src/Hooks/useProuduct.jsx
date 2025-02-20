import axios from "axios";
import { useQuery } from "@tanstack/react-query";


function useProuduct() {
    async function getProduct(){
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        return data.data; 
     }

    let response = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getProduct,
    });

    return response;
}

export default useProuduct
