import express from 'express';
import recipeRoutes from './routes/recipeRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// 静的ファイルの提供（あとでHTMLを作る時に使います）
app.use(express.static('public'));

// APIのルート設定
app.use('/recipes', recipeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} (Clean Architecture)`);
});
