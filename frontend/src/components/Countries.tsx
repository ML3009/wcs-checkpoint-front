import { useQuery } from "@apollo/client";
import { CountriesQuery } from "../generated/graphql";
import { COUNTRIES } from "../requetes/queries/countries.queries";
import { Link } from "react-router-dom"

export function Countries() {
    
    const { data: countriesData, loading: countriesLoading } = useQuery<
    CountriesQuery>
    (COUNTRIES);

    if (countriesLoading) {
        return <h1>Please wait...</h1>
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 mt-10">
            { countriesData?.countries?.map((country) =>
            country ? (
                <div
                    key={country.id}
                    className="flex flex-col items-center px-6 py-4 rounded-xl shadow-md border-2 border-rose-200 w-48 hover:scale-105 hover:shadow-lg transition-transform"
                >
                    <div className="text-4xl mb-2">{country.emoji}</div>
                    <Link
                        to="/country"
                        state={{ code: country.code }}
                        className="text-lg font-bold text-rose-700 mb-1 hover:underline"
                    >
                        {country.name}
                    </Link>
                    <div className="text-xs text-rose-400">Code : <span className="font-mono">{country.code}</span></div>
                </div>
            ) : null
            )}
        </div>
    )
}




