import { Me } from "../components/Me";
import List from "../components/List";
export default function Home() {
  return (
    <div className="bg-white">
      <div className="py-8 mx-auto max-w-7xl px-6 lg:px-8">
        <Me />
        <div className="py-16">
          <List />
        </div>
      </div>
    </div>
  );
}
