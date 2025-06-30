import { useQuery } from "@apollo/client";
import { CountriesQuery } from "../generated/graphql";
import { COUNTRIES } from "../requetes/queries/countries.queries";
import { Link } from "react-router-dom"

export function Countries() {
    
    const { data: countriesData, loading: countriesLoading } = useQuery<
    CountriesQuery>
    (COUNTRIES);

    if (countriesLoading) {
        return <h1>Veuillez patienter...</h1>
    }

    return (
        <div>
            { countriesData?.countries?.map((country) =>
            country ? (
                <div key={country.id}>
                    <Link
                        to="/country"
                        state={{ code: country.code }}
                    >
                        {country.name}
                    </Link>
                    <div>
                        {country.emoji}
                    </div>
                </div>
            ) : null

            )}
        </div>
    )
}




