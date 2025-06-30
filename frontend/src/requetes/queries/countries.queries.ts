import { gql } from "@apollo/client";

export const COUNTRIES = gql`
    query Countries {
        countries {
            id
            emoji
            name
            code
        }
    }
`;