import Header from "src/components/Header/Header";
import Home from "src/pages/Home/Home";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Home />
    </div>
  );
}

export default App;
