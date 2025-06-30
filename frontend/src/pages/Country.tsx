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
        return <h1>Please wait...</h1>
    }
    
    return (
        <div className="flex flex-col items-center justify-start mt-12">
            <div className="px-8 py-6 rounded-xl shadow-lg border-2 border-rose-200 text-center w-full max-w-md">
                <div className="text-9xl mb-4">{countryData?.country.emoji}</div>
                <h2 className="text-xl text-rose-400">Name: {countryData?.country.name} ({countryData?.country.code})</h2>
                <div className="text-xl text-rose-400">Continent: {countryData?.country.continent?.name}</div>
            </div>
        </div>
    )


}