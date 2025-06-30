import { gql } from "@apollo/client";

export const ADDCOUNTRY = gql`
    mutation AddCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
            name
            code
            emoji
        }
    }
`