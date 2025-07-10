import boardImg from "../board.png"; // your photo
import HolesOverlay from "./HolesOverlay";

const BoardShell: React.FC = () => {
  const DevClickLogger = () => (
    <div
      onClick={(e) => {
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        console.log(`${x.toFixed(1)}, ${y.toFixed(1)}`);
      }}
      className="absolute inset-0 z-50 cursor-crosshair"
    />
  );
  return (
    <div className="relative w-full max-w-4xl aspect-[4/3]">
      {/* Background photo */}
      <DevClickLogger />
      <img
        src={boardImg}
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
        alt="King Oil board"
      />

      {/* Clickable holes */}
      <HolesOverlay />
    </div>
  );
};

export default BoardShell;
