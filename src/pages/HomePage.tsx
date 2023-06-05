import { Hero, Read } from "../components/index";
import { useSelector } from "react-redux";
import { selectReading } from "../api/navSlice";

const HomePage = () => {
  const reading = useSelector(selectReading);

  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
      }}>
      {!reading && <Hero />}

      <Read />
    </main>

  )
}

export default HomePage;
