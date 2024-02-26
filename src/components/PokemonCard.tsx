import { useState } from "react"
import { checkEnvironment } from "@/lib/utility"

export default function PokemonCard(props: {data:{id:string,name:string,img:string}}) {

    const {name,img} = props.data
    const [loading, isLoading] = useState(true)

    return (
        <div className="flex flex-col justify-center items-center rounded-lg w-96 h-96 hover:shadow-lg hover:border-4 hover:border-black py-2 px-2 my-6 animate-border hover:cursor-pointer bg-gradient-to-r from-red-600 via-amber-500 to-lime-500 bg-[length:400%_400%]"
            onClick={() =>  navigator.clipboard.writeText(checkEnvironment()+"/"+name)}>
            <div className="max-h-5/6 h-5/6 relative">
            <img onLoad={()=>{isLoading(false)}} className="py-2 px-4 my-2 w-full h-full"src={img} ></img>
            </div>
            {
                loading ? <></> :  
                <div className="rounded my-4 w-1/2 h-10 flex flex-row justify-center items-center">
                    <p className="font-mono font-semibold py-1 px-2 text-xl">{"/"+name}</p>
                    <img className="py-1 w-5 h-full"src="/copy.svg"></img>
                </div>
            }
        </div>
    )
}