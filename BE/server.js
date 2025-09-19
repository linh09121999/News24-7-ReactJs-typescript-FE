const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route mặc định cho "/"
app.get("/", (req, res) => {
    res.send("🚀 API server is running!");
});

// API endpoint backend
app.get("/api/headlines", async (req, res) => {
    try {
        const { country = "us", category = "" } = req.query;
        const keyApi = "43e1cbf53535470e9755d9d450375588"; // 🔑 thay bằng key thật của bạn

        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                country,
                category: category,
                apiKey: keyApi
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi gọi API:", error.message);
        res.status(500).json({ error: "Lỗi khi gọi API" });
    }
});

app.get("/api/everything", async (req, res) => {
    try {
        const { keywork = "news", from = "", to = "", sortBy = "publishedAt" } = req.query;
        const keyApi = "43e1cbf53535470e9755d9d450375588"; // 🔑 thay bằng key thật của bạn

        keywork = (keywork || "").trim();          // 👈 loại bỏ khoảng trắng thừa

        if (!keywork) {                            // 👈 kiểm tra rỗng
            return res.json({ status: "ok", totalResults: 0, articles: [] });
        }

        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: keywork,
                from: from,
                to: to,
                sortBy,
                apiKey: keyApi
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi gọi API:", error.message);
        res.status(500).json({ error: "Lỗi khi gọi API" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`);
});
