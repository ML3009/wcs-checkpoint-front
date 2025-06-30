import { AddCountry } from "../components/AddCountry";
import { Countries } from "../components/Countries";



export function HomePage() {

  return (
    <div>
      <AddCountry />
      <Countries />
    </div>
  );
}
