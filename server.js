import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/product.route.js';

const app = express();
app.use(express.json());


app.use("/api/products", router);
const PORT = process.env.PORT || 5000;



connectDB()
  .then(() => {
    console.log("MongoDB Connected:", process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
