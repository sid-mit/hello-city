import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeVoices } from "./utils/voicePreloader";

// Initialize voice system on app load
initializeVoices().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);
