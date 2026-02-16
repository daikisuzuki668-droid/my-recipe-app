import http from 'http';
import mysql from 'mysql2/promise'; // さっき入れた mysql2 を使う

// RDSへの接続設定
const dbConfig = {
    host: 'aws-my-recipe-db.clu6akceo5s3.ap-northeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'あなたのパスワード',
    database: 'recipe_db'
};

const server = http.createServer(async (req, res) => {
    // 日本語が化けないように設定
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

    try {
        // 1. RDSに接続
        const connection = await mysql.createConnection(dbConfig);
        
        // 2. データを取得
        const [rows] = await connection.execute('SELECT * FROM recipes');
        
        // 3. 接続を閉じる
        await connection.end();

        // 4. 結果をブラウザに返す
        res.end(JSON.stringify(rows));
    } catch (error) {
        console.error(error);
        res.end(JSON.stringify({ error: 'DB接続に失敗しました' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000 with RDS!');
});