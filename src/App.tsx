import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Home />
    </div>
  );
}

export default App;
