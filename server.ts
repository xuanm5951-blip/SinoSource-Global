import { createServer as createViteServer } from "vite";
import app from "./api/index";

const PORT = 3000;

async function startServer() {
  // Local development: attach Vite middleware so the React frontend gets HMR
  // and the Express API stays available on the same origin.
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SinoSource Server] running on http://localhost:${PORT}`);
  });
}

startServer();
