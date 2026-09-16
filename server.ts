import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Local JSON Database path
  const databasePath = path.join(process.cwd(), "database.json");

  // API Route: Get student terms & courses data
  app.get("/api/terms", (req, res) => {
    try {
      if (fs.existsSync(databasePath)) {
        const data = fs.readFileSync(databasePath, "utf-8");
        res.json(JSON.parse(data));
      } else {
        res.status(404).json({ error: "Database file not found" });
      }
    } catch (err: any) {
      console.error("Error reading database:", err);
      res.status(500).json({ error: "Failed to read database: " + err.message });
    }
  });

  // API Route: Update student terms & courses data (Admin edit)
  app.post("/api/terms", (req, res) => {
    try {
      const updatedData = req.body;
      if (!Array.isArray(updatedData)) {
        return res.status(400).json({ error: "Invalid data format. Expected array of term blocks." });
      }

      fs.writeFileSync(databasePath, JSON.stringify(updatedData, null, 2), "utf-8");
      res.json({ success: true, message: "Database updated successfully" });
    } catch (err: any) {
      console.error("Error writing database:", err);
      res.status(500).json({ error: "Failed to save database: " + err.message });
    }
  });

  // Vite development middleware vs Static Production files
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
