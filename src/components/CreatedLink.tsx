
import { checkEnvironment } from "@/lib/utility"

export default function CreatedLinks(props:{localData:Array<{id:string,name:string,img:string,exp:string}>}) {

    const localData = props.localData
    return(
        <>
            {
                localData.map( (data,index)=> {
                    return <div className="relative flex flex-col w-44 h-44 justify-start items-center rounded-lg relative hover:shadow-lg hover:border-4 
                    hover:border-black py-2 px-2 mx-2 my-4 animate-border hover:cursor-pointer bg-gradient-to-r from-red-600 via-amber-500 to-lime-500 bg-[length:400%_400%]" 
                        onClick={() =>  navigator.clipboard.writeText(checkEnvironment()+"/"+data.name)}key={index}>
                        <div className="w-3/4 h-3/4 my-2 py-2">
                            <img className="w-full h-full" src={data.img}/>
                        </div>
                        <div className="absolute w-full mx-2 px-2 bottom-0.5">
                            <p className="text-center font-mono font-semibold py-1 px-1 text-l">{"/"+data.name}</p>
                        </div>
                    </div>
                })
            }
        </>
    )
}