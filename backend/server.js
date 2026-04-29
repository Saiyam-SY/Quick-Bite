import "dotenv/config";
import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port: http://localhost:${port}`);
});
