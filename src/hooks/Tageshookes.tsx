import { useQuery } from "@tanstack/react-query"
import { getAllTages } from "../Apis/Apis"

export const useGetAllTages=()=>{
return useQuery({
    queryKey:["tages"],
    queryFn:getAllTages
})
}
