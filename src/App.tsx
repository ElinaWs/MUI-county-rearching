import { useState, useEffect } from "react"
import { SideBar } from "./components/SideBar/SideBar" 
import { BASE_URL } from "./constants"
import type { ICountryShort, ICountryFull } from "./types/types"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
          <Container fixed>
              <Box 
              component="main" 
              sx={{ flexGrow: 3, p: 1, ml: '400px' }}>
              {selectedCountry ? (
                <Box>
                <Box sx={{ 
                  gap: 24,
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',       
                  mb: 4                         
                }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {selectedCountry.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      <strong>Capital:</strong> {selectedCountry.capital}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Population:</strong> {selectedCountry.population.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    <img 
                      src={selectedCountry.flag} 
                      alt="flag" 
                      style={{ 
                        width: '224px', 
                        height: '156px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                      }} 
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Borders with:
                  </Typography>

                  {selectedCountry.borders ? (
                    <Box 
                      component="ul" 
                      sx={{ 
                        display: 'flex',     
                        flexWrap: 'wrap',   
                        gap: 1,            
                        listStyle: 'none',  
                        p: 0              
                      }}
                    >
                      {selectedCountry.borders.map(border => (
                        <Box 
                          key={border} 
                          component="li"
                          sx={{ 
                            px: 1.5, 
                            py: 0.5, 
                            borderRadius: '4px',
                            fontSize: '0.875rem'
                          }}
                        >
                          {border}
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography>None</Typography>
                  )}
                </Box>
              </Box>
              ) : (
                <Typography variant="h2" component="h3">
                  Hello! Welcome to the Country Searching!
                </Typography>
              )}
            </Box>
          </Container>
    </Box>
  )         
}

export default App;

