/**
 * New City Form
 */
import * as React from "react"
import * as mut from "../gqlHooks/mutations"
import NumberFormat from 'react-number-format'
import { useMainContext, ContinentType } from "../context/MainContext"

export const NewCityForm : React.FC<{countrycode:string, continent:ContinentType}> = ({countrycode,continent})=>{
    const [name,setName] = React.useState('')
    const [district,setDistrict] = React.useState('')
    const [population,setPopulation] = React.useState(0)
    const [addCity, {data,loading,error}] = mut.useAddCity()
    const [, setState] = useMainContext()

    React.useEffect(()=>{
        if(data){
            setState({
                level:'country',
                continent,
                code:countrycode
            })
        }
    },[data])

    if(error){
        return <p>{error.message}</p>
    }
    if(loading){
        return <h2>Loading...</h2>
    }

    const handlePopulation = (num:number)=>{
        setPopulation(Math.floor(num))
    }
    const handleSubmit = ()=>{
        addCity({
            variables:{
                name,
                district,
                population,
                countrycode,
            }
        })
    }
    const isDisabled = !name || !district || !population
    return <form method="POST" onSubmit={e=>{e.preventDefault();handleSubmit()}}>
        <div className="row">
            <div className="col sm-12">
                <table>
                    <tbody>
                        <tr>
                            <td><b>City Name</b></td>
                            <td><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><b>District Name</b></td>
                            <td><input type="text" value={district} onChange={(e)=>setDistrict(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><b>Population</b></td>
                            <td>
                                <NumberFormat value={population} onValueChange={e=>handlePopulation(e.floatValue || 0)} />
                                {/* <input type="text" value={population} onChange={(e)=>setPopulation(e.target.value)}/> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button className="btn-secondary" disabled={isDisabled} type="submit">Submit</button>
            </div>
        </div>
    </form>
}