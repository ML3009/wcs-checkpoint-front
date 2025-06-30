import { AddCountry } from "../components/AddCountry";
import { Countries } from "../components/Countries";



export function HomePage() {

  return (
    <div>
      <Countries />
      <AddCountry />
    </div>
  );
}
