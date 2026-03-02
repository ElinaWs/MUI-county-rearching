import { useState, useEffect } from "react"
import { SideBar } from "./components/SideBar/SideBar" 
import { BASE_URL } from "./constants"
import type { ICountryShort, ICountryFull } from "./types/types"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function App() {
  const [countriesList, setcountriesList] = useState<ICountryShort[]>([])
  const [selectedCountry, setSelectedCountry] = useState<ICountryFull | null>(null)

  useEffect(()=>{
    const getCountries = async() => {
      try{
        const response = await fetch(`${BASE_URL}/all?fields=alpha3Code,name`)
        if (!response.ok) {
          throw new Error
        }
        const data:ICountryShort[] = await response.json()
        setcountriesList(data)
      }catch(e) {
        console.log(e)
      }
    }
    getCountries()
  },[])

  const getCountryByCode = async (code:string) => {
    try {
      const response = await fetch(`${BASE_URL}/alpha/${code}`)
      if (!response.ok) {
        throw new Error
      }
      const data: ICountryFull = await response.json()
      setSelectedCountry(data)
    } catch (e) {
      console.log(e)
    }
  } 

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar countries={countriesList} onSelect={getCountryByCode} />

      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3, ml: '400px' }}>
        {selectedCountry ? (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom>{selectedCountry.name}
              </Typography>
            <img 
              src={selectedCountry!.flag} 
              alt="flag" 
              style={{ width: '224px', height: '156px', borderRadius: '12px' }} />
            <Typography 
              variant="subtitle1" 
              sx={{ mt: 2 }}
            >
              Capital: {selectedCountry.capital}
            </Typography>
            <Typography 
              variant="subtitle1"
            >
                Population: {selectedCountry.population.toLocaleString()}
            </Typography>

            <Typography 
              variant="body2" 
              sx={{mt: 3}}>
                Borders with:
            </Typography>

            {selectedCountry.borders ? (
              <Box component="ul">
                {selectedCountry.borders.map(border => (
                  <Typography component="li" key={border}>
                    {border}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>None</Typography>
            )}
          </Box>
        ) : (
          <Typography variant="h2" component="h3">
            Hello! Welcome to the Country Searching!
          </Typography>
        )}
      </Box>
    </Box>
  )         
}

export default App;

