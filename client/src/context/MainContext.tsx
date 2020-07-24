import * as React from 'react'

export type ContinentType = 'Asia'|'North America'|'Africa'|'Oceania'|'Antarctica'|'South America'|'Europe'

export type MainStateType = {
    level: 'continents'
} | {
    level: 'countries'
    continent: ContinentType
} | {
    level: 'country'
    continent: ContinentType
    code: string
} | {
    level: 'add-city'
    continent: ContinentType
    countrycode: string
}

type MainContextType = [MainStateType,(state:MainStateType)=>void]
const mainContext = React.createContext<MainContextType>(null as any)

export const useMainContext = ()=>React.useContext(mainContext)
export const MainContextConsumer = mainContext.Consumer

export const MainContextProvider: React.FC = ({children})=>{
    const value = React.useState<MainStateType>({level:'continents'})
    const MainContextProvider = mainContext.Provider

    return (
        <MainContextProvider value={value}>
            {children}
        </MainContextProvider>
    )
}