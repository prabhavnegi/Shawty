'use client'

import { useRouter } from 'next/navigation'

export default function GetLinkButton() {
    const router = useRouter();
    const getLink = () => { 
        router.push("/generate")
    }
    return(
        <>
            <button className=" w-30 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold my-1 hover:text-white py-2 px-4 border-2 border-teal-500 hover:border-transparent rounded text text-xs" onClick={getLink}>
                Get your link
            </button>
        </>
    )
}