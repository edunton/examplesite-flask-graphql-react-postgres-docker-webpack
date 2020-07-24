/**
 * Grid of all countries in a continent, paged at 15 a time
 */

import * as React from "react";
import * as qry from "../gqlHooks/queries"
import {CountryGridPager} from "./CountryGridPager"
import {ContinentType,useMainContext} from "../context/MainContext"

const PAGE_SIZE = 15

export const CountryGrid : React.FC<{search:string, continent:ContinentType}> = ({search,continent})=>{
    const [page,setPage] = React.useState(0)
    const {error,loading,newPage,data} = qry.useCountries(page,PAGE_SIZE,continent)
    const [, setState] = useMainContext()

    React.useEffect(()=>{
        setPage(0)
        newPage(0,PAGE_SIZE,search)
    },[search])

    React.useEffect(()=>{
        newPage(page,PAGE_SIZE,search)
    },[page])

    if(error){
        return <p>{error.message}</p>
    }
    if(loading || !data || !data.countries){
        return <h2>Loading...</h2>
    }

    const handleCityDetails = (code:string)=>()=>{
        setState({level:'country',code,continent})
    }

    return <>
        <CountryGridPager page={page} pageSize={PAGE_SIZE} count={data.country_count} onNext={()=>setPage(page+1)}  onPrev={()=>setPage(page-1)} />
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {data.countries.map(c=><tr key={c.code}>
                    <td>{c.code}</td>
                    <td>{c.name}</td>
                    <td><input className="btn-secondary" type="button" value="Details" onClick={handleCityDetails(c.code)}/></td>
                </tr>)}
            </tbody>
        </table>
        <CountryGridPager page={page} pageSize={PAGE_SIZE} count={data.country_count} onNext={()=>setPage(page+1)} onPrev={()=>setPage(page-1)} />
    </>
}