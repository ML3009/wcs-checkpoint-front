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
        continent: {id: 0}
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
      <div className="flex flex-col items-center justify-start mt-9">
         <form onSubmit={(e) => handleSubmit(e, data)} className="flex flex-row items-end gap-4 w-full max-w-3xl">
            <div className="flex flex-col flex-1">
               <label className="text-rose-700 font-semibold mb-1">Name</label>
               <input
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
            </div>
            <div className="flex flex-col flex-1">
               <label className="text-rose-700 font-semibold mb-1">Emoji</label>
               <input
                  name="emoji"
                  placeholder="Emoji"
                  value={data.emoji}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
            </div>
            <div className="flex flex-col flex-1">
               <label className="text-rose-700 font-semibold mb-1">Code</label>
               <input
                  name="code"
                  placeholder="Code"
                  value={data.code}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
            </div>
            <div className="flex flex-col flex-1">
               <label className="text-rose-700 font-semibold mb-1">Continent</label>
               <select
                  name="continent"
                  value={data.continent?.id ?? ""}
                  onChange={(e) =>
                     setData((prevData) => ({
                        ...prevData,
                        continent: { id: Number(e.target.value) }
                     }))
                  }
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               >
                  <option value="">Select a continent</option>
                  {continentsData?.continents.map((continent) => (
                     <option key={continent.id} value={continent.id}>
                        {continent.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className="flex flex-col justify-end">
               <button type="submit" className="h-12 px-6 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-200 text-rose-900 font-semibold shadow border-2 border-white transition-transform hover:scale-105 hover:shadow-lg">
                  Add
               </button>
            </div>
         </form>
      </div>
   )
}



