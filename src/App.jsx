import { useState } from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);

  /*----- ❌ ⬇️ Aşağıdaki kodlar hakkında endişelenmenize gerek yok! ❌ ⬇️️ ️----------- */

  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const kindleClass = woodKindling && !woodOnFire && "kindle";

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  let torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60
  };
  
  const handleTorch = () => {
    setTorchEquipped(!torchEquipped);
  };

  const handleFire = () => {
    if (torchEquipped) {
      setWoodKindling(true);
      setWoodOnFire(true)
    }
  };


          return (
            <div
              className={`wrapper ${torchEquipped && "relative no-cursor"}`}
              onClick={handleTorch}
            >
              <div
                className={`game-area ${!torchEquipped && "relative"}`}
                onMouseEnter={handleFire}
              >
                <div
                  className={`torch-container ${torchEquipped && "torch-equipped"}`}
                  style={torchEquipped ? torchStyle : null}
                >
                  <Torch />
                </div>
        
                <div className={`wood-container ${kindleClass}`}>
                  🪵
                  <Fire woodOnFire={woodOnFire} />
                </div>
              </div>
            </div>
          );
        }