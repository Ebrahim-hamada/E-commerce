import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function useGategory() {

    async function getCategory(){
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        return data.data; 
     }

    let response = useQuery({
        queryKey: ['recentCategories'],
        queryFn: getCategory,
    });
    
    return response;
}

export default useGategory;
