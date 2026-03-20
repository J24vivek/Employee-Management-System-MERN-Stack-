import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Configure CORS to allow frontend deployment
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ems-8y1s.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Employee Management API is running",
    endpoints: {
      health: "GET /",
      records: "GET /record/",
      createRecord: "POST /record/",
      updateRecord: "PATCH /record/:id",
      deleteRecord: "DELETE /record/:id",
      getRecord: "GET /record/:id",
    },
  });
});

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});