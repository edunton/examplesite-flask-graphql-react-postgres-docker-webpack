import * as React from "react";
import {ContinentSelection} from "./ContinentSelection"
import {CountryGrid} from "./CountryGrid"
import {CountryDetails} from "./CountryDetails"
import {useMainContext} from "../context/MainContext"
import { NewCityForm } from "./NewCityForm";

export const App : React.FC = ()=>{
    const [search,setSearch] = React.useState('')
    const [mainState,setMainState] = useMainContext()

    const handleInputChange : (e:React.ChangeEvent<HTMLInputElement>)=>void = (e)=>{
        setSearch(e.target.value)
    }

    React.useEffect(()=>{
        setSearch('')
    },[mainState.level])

    return (<>
        {
            <div className="row border">
                {mainState.level === 'continents' && 
                <div className="col sm-12">
                    <h3>Eric's Awesome Country Explorer</h3>
                </div>}
                {mainState.level === 'countries' && 
                <>
                    <div className="col sm-4">
                        <button className="btn-block btn-secondary" onClick={()=>setMainState({level:'continents'})}>Go Back</button>
                    </div>
                    <div className="col sm-8 form-group">
                        <input className="input-block" type="text" id="name-search" placeholder="Search Country Name" value={search} onChange={handleInputChange}/>
                    </div>
                </>
                }
                {mainState.level == 'country' &&
                <>
                    <div className="col sm-4">
                        <button className="btn-block btn-secondary" onClick={()=>setMainState({level:'countries',continent:mainState.continent})}>Go Back</button>
                    </div>
                </>
                }
                {mainState.level == 'add-city' &&
                <>
                    <div className="col sm-4">
                        <button className="btn-block btn-secondary" onClick={()=>setMainState({level:'country',continent:mainState.continent,code:mainState.countrycode})}>Go Back</button>
                    </div>
                </>
                }
            </div>
        }
        <br/>
        {mainState.level === 'continents' && <ContinentSelection />}
        {mainState.level === 'countries' && <CountryGrid search={search} continent={mainState.continent} />}
        {mainState.level === 'country' && <CountryDetails code={mainState.code} continent={mainState.continent} />}
        {mainState.level === 'add-city' && <NewCityForm countrycode={mainState.countrycode} continent={mainState.continent} />}
    </>)
}