import { IProduct } from "@/interface"
import useSWR,{SWRConfiguration} from "swr"


//const fetcher = (...args:[key:string]) => fetch(...args).then(res => res.json())


export const useProducts=(Url:string,config:SWRConfiguration={}) =>{

    const { data, error } = useSWR<IProduct[]>(`/api${Url}`,config)

    return{
        products:data||[],
        isLoading:!error&&!data,
        isError:error
    }

}