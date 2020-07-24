/**
 * Display Country Details
 */

import * as React from "react"
import NumberFormat from 'react-number-format';
import * as qry from "../gqlHooks/queries"
import { useMainContext, ContinentType } from "../context/MainContext";


export const CountryDetails : React.FC<{code:string, continent:ContinentType}> = ({code,continent})=>{
    const {error,getData,data,loading} = qry.useCountry(code,continent)
    const [,setState] = useMainContext()

    React.useEffect(()=>{
        getData(code)
    },[code])

    if(error){
        //Issue connecting to server
        return <p>{error.message}</p>
    }

    if(loading){
        //Waiting on data from server
        return <h2>Loading...</h2>
    }

    if(!data || !data.country){
        //bad ID, should not ever get here
        return <p>No country available</p>
    }

    const country = data.country
    const cities = data.cities
    return <>
    <div className="row">
        <div className="col sm-12">
            <h2>{country.name}</h2>
        </div>
    </div>
    <div className="row">
        <div className="col sm-6">
            <h3>Information</h3>
            <table>
                <tbody>
                    <tr>
                        <td><b>Government Type</b></td>
                        <td>{country.governmentform}</td>
                    </tr>
                    <tr>
                        <td><b>Continent</b></td>
                        <td>{country.continent}</td>
                    </tr>
                    <tr>
                        <td><b>Region</b></td>
                        <td>{country.region}</td>
                    </tr>
                    <tr>
                        <td><b>Capital</b></td>
                        <td>{country.capitalcity?.name || 'UNKNOWN'}</td>
                    </tr>
                    <tr>
                        <td><b>Surface Area</b></td>
                        <td><Num value={country.surfacearea} /></td>
                    </tr>
                    <tr>
                        <td><b>Independence</b></td>
                        <td>{country.indepyear || "N/A"}</td>
                    </tr>
                    <tr>
                        <td><b>Population</b></td>
                        <td><Num value={country.population} /></td>
                    </tr>
                    <tr>
                        <td><b>Life Expectancy</b></td>
                        <td>{country.lifeexpectancy}</td>
                    </tr>
                    {
                        !!country.localname && 
                        <tr>
                            <td><b>Local Name</b></td>
                            <td>{country.localname}</td>
                        </tr>
                    }
                    {
                        !!country.headofstate && 
                        <tr>
                            <td><b>Head of State</b></td>
                            <td>{country.headofstate}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
        <div className="col sm-6">
            {!!country.languages && !!country.languages.length && <>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(l=><li key={l.language}>{l.language}{l.isofficial?' (Official)':''}{l.percentage?`, ${l.percentage}%`:''}</li>)}
                </ul>
            </>}
            {!!cities && !!cities.length && <>
                <h3>Cities &nbsp; <button className="btn-secondary" onClick={()=>setState({level:'add-city', continent, countrycode:code})}>+ Add City</button></h3>
                {/* <div className="row">
                    <div className="col sm-12">
                        
                    </div>
                </div> */}
                <table>
                    <thead>
                        <tr>
                            <th>City Name</th>
                            <th>District</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(city=>(
                            <tr key={`${city.name}--${city.district}`}>
                                <td>{city.name}</td>
                                <td>{city.district}</td>
                                <td><Num value={city.population} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>}
        </div>
    </div>
    </>
}

const Num : React.FC<{value:number}> = ({value})=>{
    return <NumberFormat thousandSeparator={true} value={value} displayType={'text'} />
}