import { Me } from "../components/Me";
import List from "../components/List";
export default function Home() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Me />
        <List />
      </div>
    </div>
  );
}
