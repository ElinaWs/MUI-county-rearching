import { SideBar } from "./componnets/SideBar/SideBar"
import { useEffect, useState } from 'react'
import type { ICountyShort } from "./types/types"
import { BASE_URL } from "./constants"

function App() {
  const [countiesList, setCountriesList] = useState<ICountyShort[]>([])

  useEffect(()=> {
    const getCountries = async() => {
      try {
        const response = await fetch(`${BASE_URL}/all?fields=alpha3Code,name`)
        if (!response.ok) {
          throw new Error 
        }
        const data:ICountyShort[] = await response.json()
        console.log('data', data)
        setCountriesList(data)
      } catch(e) {
        console.log(e)
      }
    }
    getCountries()
  },[]);

  const getCountriesByName = (name: string) => {
    // todo add async
  }

  return (
   <div>
    <SideBar/>
   </div>
  )
}

export default App
