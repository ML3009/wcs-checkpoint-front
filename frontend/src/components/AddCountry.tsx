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

    const [showForm, setShowForm] = useState(false);

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
      <div className="flex flex-col items-center justify-start mt-10">
         <button
            onClick={() => setShowForm((prev) => !prev)}
            className="mb-6 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-200 text-rose-900 font-semibold shadow border-2 border-white transition-transform hover:scale-105 hover:shadow-lg"
         >
            {showForm ? "Hide form" : "Add a country"}
         </button>
         {showForm && (
            <form onSubmit={(e) => handleSubmit(e, data)} className="w-full max-w-md bg-gradient-to-r from-rose-100 to-pink-50 shadow-lg border-2 border-rose-200 rounded-xl px-8 py-8 flex flex-col gap-4">
               <label className="text-rose-700 font-semibold">NAME</label>
               <input
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
               <label className="text-rose-700 font-semibold">CODE</label>
               <input
                  name="code"
                  placeholder="Code"
                  value={data.code}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
               <label className="text-rose-700 font-semibold">EMOJI</label>
               <input
                  name="emoji"
                  placeholder="Emoji"
                  value={data.emoji}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="px-4 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
               />
               <label className="text-rose-700 font-semibold">Continent</label>
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
               <button type="submit" className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-200 text-rose-900 font-semibold shadow border-2 border-white transition-transform hover:scale-105 hover:shadow-lg">
                  Add country
               </button>
            </form>
         )}
      </div>
   )
}



