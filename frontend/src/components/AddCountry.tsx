import { useMutation, useQuery } from "@apollo/client"
import { ContinentsQuery, MutationAddCountryArgs, NewCountryInput } from "../generated/graphql"
import { CONTINENTS } from "../requetes/queries/continents.queries"
import { useState } from "react"
import { ADDCOUNTRY } from "../requetes/mutations/country.mutations"

export function AddCountry() {

    const { data: continentsData } = useQuery<ContinentsQuery>(CONTINENTS)

    const [data, setData] = useState<NewCountryInput>({
        name: "",
        code: "",
        emoji: "",
        continent: {id: 1}
    })

    const [addCountry, { error }] =
      useMutation<MutationAddCountryArgs>(ADDCOUNTRY)

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
    const { name, value } = event.target
      setData((prevData) => ({
        ...prevData,
        [name]: value,
}))
   }

    const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>,
      values: NewCountryInput
   ) => {
      e.preventDefault()
      if (!values.name || !values.code || !values.emoji || !values.continent?.id) {
        alert("Merci de remplir tous les champs et de sélectionner un continent.")
        return
      }
      addCountry({
        variables: { data: values },
        refetchQueries: ["Countries"],
        onCompleted: async () => {
            console.log("Le pays a été ajouté")
         },
      })
      if (error) {
         console.log(error)
      }
   }

   return (
      <div>
         <form onSubmit={(e) => handleSubmit(e, data)} className="w-3/5">
            <label >NAME</label>
            <input
               name="name"
               placeholder="Name"
               value={data.name}
               type="text"
               onChange={(e) => handleChange(e)}
            />
            <label >CODE</label>
            <input
               name="code"
               placeholder="Code"
               value={data.code}
               type="text"
               onChange={(e) => handleChange(e)}

            />
            <label>EMOJI</label>
            <input
               name="emoji"
               placeholder="Emoji"
               value={data.emoji}
               type="text"
               onChange={(e) => handleChange(e)}
            />
            <label>Continent</label>
            <select
               name="continent"
               value={data.continent?.id ?? ""}
               onChange={(e) =>
                  setData((prevData) => ({
                     ...prevData,
                     continent: { id: Number(e.target.value) }
                  }))
               }
            >
               <option value="">Sélectionnez un continent</option>
               {continentsData?.continents.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                     {continent.name}
                  </option>
               ))}
            </select>
            <button type="submit">Ajouter un pays</button>
         </form>
      </div>
   )

}



