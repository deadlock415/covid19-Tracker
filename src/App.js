
import './App.css';
import React, { useState, useEffect } from "react";
import {
MenuItem,
FormControl,
Select,
Card,
CardContent,
}from "@material-ui/core"
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css"

function App() {
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([])
  const [casesType,setCasesType] = useState("cases")
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all').then(response => response.json()).then(data =>{
      setCountryInfo(data)
    })
  },[])
  //STATE = how to write a variable in react 

  //https://desease.sh/v3/covid-19/countries
  //USEEFFECT  =  run a peace of code based on a given condition 
  useEffect(()=>{
    //async -> send a request a server ,wait for it 
    // do something with input
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=> response.json()).then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2//UK,USA,FR
            
          }));
          const sortedData = sortData(data)
          
          setTableData(sortedData);
          setMapCountries(data)
          setCountries(countries)
      })
    }
    getCountriesData();
  },[])//if its [] then code inside here will run once
  //when the component loads and not again 

  //When we change the drop down it will fetch the new data
  const onCountryChange =async  (event) =>{
    const countryCode = event.target.value;
    const url  = countryCode === 'worldwide' ?'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode)

      //All of the data
      //from the country response
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });

    //world wide comes from different url
    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

  }
  return (
    <div className="App">
      <div className ="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
      <Select variant="outlined" value={country}onChange = {onCountryChange}>
      {/* loop through all the country and show drop down */}
      <MenuItem value="worldwide">WorldWide</MenuItem>
     {countries.map((country)=>(
       <MenuItem value = {country.value}>{country.name}</MenuItem>
     ))}
     
        {/* <MenuItem value="wordwide">WordWide</MenuItem>
        <MenuItem value="wordwide">opition</MenuItem>
        <MenuItem value="wordwide">otpoin</MenuItem>
        <MenuItem value="wordwide">adfadf</MenuItem> */}
       
      </Select>

     </FormControl>

    {/* Done */}
     {/* Header */}
      {/* Title and input dropdown filed */}

      </div>
        <div className = "app__stats">
          <InfoBox 
          isRed
          active={casesType === "cases"}
          onClick={e =>setCasesType('cases')}
          title = "Coronavirus cases" cases ={prettyPrintStat(countryInfo.todayCases)} total = {prettyPrintStat(countryInfo.cases)}/>
          <InfoBox 
          active={casesType === "recovered"}
          onClick= {e =>setCasesType('recovered')}
          title = "Recovered" cases = {prettyPrintStat(countryInfo.todayRecovered)} total ={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox
          isRed
          active={casesType === "deaths"}
          onClick = {e => setCasesType('deaths')}
          title = "Deaths" cases = {prettyPrintStat(countryInfo.todayDeaths)} total = {prettyPrintStat(countryInfo.deaths)}/>
            {/*InfoBoxes*/}


        </div>


  
       
         {/*MAPS*/}
         <Map 
         casesType = {casesType}
         countries = {mapCountries}
         center = {mapCenter}
         zoom = {mapZoom}

         />


      </div>

      <Card className = "app__right">
        <CardContent>
          <h3>Lives Cases by Country</h3>
          <Table countries = {tableData} />
        {/*Table*/}
        <h3 className = "app__graphTitle">Worldwide new {casesType}</h3>
        {/*GRPAH  */}
        <LineGraph className ="app__graph" casesType = {casesType}/>

        </CardContent>
        
    </Card>
    </div>
    
  );
}

export default App;
