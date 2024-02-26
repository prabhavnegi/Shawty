
export default function LinkHeader(props:any) {
    return(
            <div className="hover:border-2 hover:border-black rounded my-2 w-1/5 h-10 flex flex-row justify-center items-center">
                <p className="font-semibold py-1 px-2 text-lg">{"/"+props.name}</p>
                <button className=" flex flex-row justify-center items-center w-39 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold my-1 hover:text-white py-2 px-4 border-2 border-teal-500 hover:border-transparent rounded text text-xs">
                <img className="py-1 w-3 h-full"src="/copy.svg"></img>
                </button>
            </div>
    )
}