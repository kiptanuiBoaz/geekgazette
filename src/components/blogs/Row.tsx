import { categoryList } from "../../assets/read/categories";
import "./row.scss";

interface ChildProps {
    handleCategoryChange: (category: string) => void;
}

export const Row: React.FC<ChildProps> = ({ handleCategoryChange }) => {

    return (
        <div className="row">
            <div className="row-items-container">
                <p onClick={() => handleCategoryChange("all")} className="row-item">
                    All
                </p>
            </div>

            <select className="dropdown" onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="all">Filter by category</option>
                {categoryList.map((item) => (
                    <option value={item} key={item} className="row-item">
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};
