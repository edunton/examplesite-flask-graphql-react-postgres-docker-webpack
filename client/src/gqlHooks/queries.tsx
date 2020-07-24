import { useQuery, gql } from '@apollo/client';

const GET_COUNTRIES = gql`
query Countries($limit: Int!, $offset: Int!, $name:String, $continent: String!) 
{
  countries(filter:{
    offset: $offset,
    limit: $limit,
    name: $name,
    continent: $continent
  }) {
    name
    code
    governmentform
    capitalcity {
      name
    }
  }
  country_count(filter:{
    offset: $offset,
    limit: $limit,
    name: $name,
    continent: $continent
  })
}
`;

const GET_COUNTRY = gql`
query Country($code:String!,$continent:String!){
    countries(filter:{
        offset: 0,
        limit: 1,
        code: $code,
        continent: $continent
    }) {
        name
        code
        governmentform
        continent
        region
        surfacearea
        indepyear
        population
        lifeexpectancy
        localname
        headofstate
        capitalcity {
            name
        }
        languages {
            language
            percentage
            isofficial
        }
    }

    country_cities(code:$code) {
        name
        district
        population
    }
}

`;

export type UseCountriesDataType = {
    countries: {
        name:string
        code:string
        governmentform:string
        capitalcity:{
            name:string
        }
    }[]
    country_count: number
}

export const useCountries = (page:number,size:number, continent:string)=>{
    const { loading, error, data, refetch } = useQuery<UseCountriesDataType>(GET_COUNTRIES, {
        variables: { limit:size, offset:page*size, continent }
    });

    return {
        loading,
        error,
        data,
        newPage(page:number,size:number, name?:string){
            if(name) return refetch({ limit:size, offset:page*size, name })

            return refetch({ limit:size, offset:page*size })
        }
    }
}

export type CountryType = {
    name: string
    code: string
    governmentform: string
    continent: string
    region: string
    surfacearea: number
    indepyear: number
    population: number
    lifeexpectancy: number
    localname?: string
    headofstate?: string
    capitalcity: {
        name: string
    }
    languages: {
        language: string
        percentage: number
        isofficial: boolean
    }[]
}

export type CityType = {
    name: string
    district: string
    population: number
}

export const useCountry = (code:string, continent:string)=>{
    const { loading, error, data, refetch } = useQuery(GET_COUNTRY,{
        variables: { code, continent }
    })

    const transData = data ? {
        country: data.countries[0] as CountryType|undefined,
        cities: data.country_cities as CityType[]|undefined,
    } : undefined

    console.log(data)
    return {
        loading,
        error,
        data:transData,
        getData(code:string){
            return refetch({code, continent})
        },
    }
}