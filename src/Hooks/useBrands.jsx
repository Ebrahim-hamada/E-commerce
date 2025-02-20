import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useBrands() {

    async function getBrand(){
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        return data.data; 
     }

    let response = useQuery({
        queryKey: ['brands'],
        queryFn: getBrand,
    });

    return response;
}

export default useBrands;
