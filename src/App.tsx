import BoardShell from "./components/Board";
import Sidebar from "./components/Sidebar";
import { GameProvider } from "./state/GameProvider";
import "./index.css";

export function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-emerald-50">
        <BoardShell />
        <Sidebar />
      </div>
    </GameProvider>
  );
}
