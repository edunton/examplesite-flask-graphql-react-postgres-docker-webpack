import { useMutation, gql } from '@apollo/client';

const ADD_CITY = gql`
mutation City(
    $countrycode:String!,
    $name:String!,
    $district:String!,
    $population:Int!
){
    new_city(city:{
        countrycode:$countrycode
        name:$name
        district:$district
        population:$population
    })
}
`
type CityInputType = {
    countrycode:string,
    name:string,
    district:string,
    population:number,
}
export const useAddCity = ()=>{
    return useMutation<boolean,CityInputType>(ADD_CITY)
}