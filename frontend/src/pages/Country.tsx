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
        <div>
            {countryData?.country.name}
            {countryData?.country.code}
            {countryData?.country.emoji}
            {countryData?.country.continent?.name}
        </div>
    )


}