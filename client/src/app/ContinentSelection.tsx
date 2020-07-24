/**
 * List out all continents
 */

import * as React from "react";
import {ContinentType,useMainContext} from "../context/MainContext"

const continents : ContinentType[] = ['Asia','North America','Africa','Europe','Oceania','Antarctica','South America']

export const ContinentSelection : React.FC = ()=>{
    const [,setContinent] = useMainContext()
    const handleClick = (continent:ContinentType)=>()=>{
        setContinent({level:'countries',continent})
    }
    return <div className="row">
        {continents.map(con=>{
            return <div className="col sm-4" key={con}>
                    <button className="btn-block btn-secondary" onClick={handleClick(con)}>{con}</button>
                </div>
        })}
    </div>
}