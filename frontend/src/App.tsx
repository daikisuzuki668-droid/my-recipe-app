import { useEffect, useState } from 'react'
import axios from 'axios'

// 型定義（TypeScriptらしく！）
interface Recipe {
  id: number;
  name: string;
  ingredients: string;
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  // レシピ一覧を取得する関数
  const fetchRecipes = () => {
    axios.get('http://52.195.225.68:3000/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('エラーが発生しました:', err))
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#fffaf0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#d2691e', borderBottom: '2px solid #d2691e' }}>
        🍳 私のレシピ帳 (React版)
      </h1>
      
      <div style={{ marginTop: '20px' }}>
        {recipes.length === 0 ? (
          <p>レシピを読み込み中、またはデータがありません...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {recipes.map(recipe => (
              <li key={recipe.id} style={{
                background: 'white',
                margin: '10px 0',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <strong style={{ fontSize: '1.2em', color: '#333' }}>{recipe.name}</strong>
                <p style={{ color: '#666', margin: '5px 0 0' }}>材料: {recipe.ingredients}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
