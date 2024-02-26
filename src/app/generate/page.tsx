"use client"

import {useEffect, useState } from "react"
import InputForm from "@/components/InputForm"
import PokemonCard from "@/components/PokemonCard"
import Pokeball from "@/components/Pokeball"
import CreatedLinks from "@/components/CreatedLink"

export default function Main() {

  type Data = {
    id:string,
    name:string,
    img:string,
    exp:string
  }

  const [pokemon, setPokemon] = useState<Data>({id:"",name:"",img:"",exp:""})
  const [result, setResult] = useState(false)
  const [loading, setLoading]  = useState(true)
  const [localData, setLocalData] = useState <Array<Data>>([])

  const manageLocalData = () => {
    let localData = localStorage.getItem("shorty")
    if(localData) {
      let data = JSON.parse(localData)
      data = data.filter((x:any)=>{
        return Number(x.exp) > (+ new Date())
      }).map((x:any)=>{
        return x
      })
      localStorage.setItem("shorty",JSON.stringify(data))
      setLocalData(data)
      setLoading(false)
    }
  }

  useEffect(()=> {
    manageLocalData()
  },[])

  return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
        {
          result ? <PokemonCard data={pokemon}/> : <Pokeball/>
        }
        <InputForm setResult={setResult} setPokemon={setPokemon} setLocalData={setLocalData} localData={localData}/>
        <> 
          {
            loading ? <></>: <div className="flex flex-wrap flex-row w-3/5 justify-center items-center"><CreatedLinks localData={localData}/></div>
          }
        </>
      </div>
    )
  }
  