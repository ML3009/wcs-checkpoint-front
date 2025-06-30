import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client"
import { CountryQuery, CountryQueryVariables } from "../generated/graphql";
import { COUNTRY } from "../requetes/queries/country.queries";


export function Country() {

    const location = useLocation();
    const { code } = location.state;
    const {data: countryData, loading: loadingCountry} = useQuery<
        CountryQuery, 
        CountryQueryVariables
    >(COUNTRY, {
        variables: {code: code}
    })

    if (loadingCountry) {
        return <h1> Veuillez patienter...</h1>
    }
    
    return (
        <div className="flex flex-col items-center justify-start mt-12">
            <div className="px-8 py-6 rounded-xl bg-gradient-to-r from-rose-100 to-pink-50 shadow-lg border-2 border-rose-200 text-center w-full max-w-md">
                <div className="text-6xl mb-4">{countryData?.country.emoji}</div>
                <h2 className="text-2xl font-bold text-rose-700 mb-2">{countryData?.country.name}</h2>
                <div className="text-lg text-rose-500 mb-1">Code : <span className="font-mono">{countryData?.country.code}</span></div>
                <div className="text-md text-rose-400">Continent : {countryData?.country.continent?.name}</div>
            </div>
        </div>
    )


}