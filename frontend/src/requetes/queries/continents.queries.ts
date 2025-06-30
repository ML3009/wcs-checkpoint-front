import { gql } from "@apollo/client";

export const CONTINENTS = gql`
    query Continents {
        continents {
            id
            name
        }
}`