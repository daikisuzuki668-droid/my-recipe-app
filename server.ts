import http from 'http';

 interface Recipe {
    id:number;
    name:string;
    ingredients:string[];
 }

 const recipes: Recipe[] = [
  { id: 1, name: "肉じゃが", ingredients: ["じゃがいも", "玉ねぎ", "肉"] },
  { id: 2, name: "カレー", ingredients: ["ルウ", "野菜", "肉"] }
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(recipes));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`TS Server running at http://localhost:${PORT}/`);
});