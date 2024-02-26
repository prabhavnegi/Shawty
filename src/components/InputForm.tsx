import { useEffect, useState } from "react"

export default function InputForm(props:any) {

    const [inputValue, setInputValue] = useState("")

    const handleClick = async () => {
        if(inputValue === "") {
            return
        }
        try {
            let formData = new FormData();
            formData.append('target', inputValue);
            const pokemon = await (await fetch("/api/generateLink",{method: "post",body: formData})).json()
            await props.setPokemon(pokemon)
            await props.setResult(true)
            localStorage.setItem("shorty",JSON.stringify([...props.localData,pokemon]))
            await props.setLocalData([...props.localData,pokemon])
            await props.setLoading(false)
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
            <div className="flex flex-row w-full mb-6 justify-center items-center">
                <input className="w-1/3 h-full bg-transparent text-blue-gray-700 outline outline-0 focus:outline-0 border-2 border-transparent
                    transition-all focus:border-2 text-sm mx-2 my-1 px-4 py-2 rounded shadow-lg border-blue-gray-400 focus:border-teal-500" type="text" placeholder="Enter a URL"
                    value={inputValue} onChange={e => {setInputValue(e.currentTarget.value);}}/>
                <button className=" w-30 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold my-1 hover:text-white py-2 px-4 border-2 border-teal-500 hover:border-transparent rounded text text-xs"
                    onClick={handleClick}>
                    Create Link
                </button>
            </div>
    )
}