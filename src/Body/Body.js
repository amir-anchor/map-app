import { ListPane } from "../ListPane/ListPane";
import "./Body.css";

export function Body({searchQuery}) {
    return <div className="Body">
        <div className="Body-map" />
        <ListPane searchQuery={searchQuery} />
    </div>
}
