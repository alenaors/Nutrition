import React, { useState, useEffect } from 'react';

function Nutrition() {
  const [ingredients, setIngredients] = useState("");
  const [calories, setCalories] = useState(null);
  const [nutrients, setNutrients] = useState(null);

  const fetchNutrition = async () => {
    const url = "https://api.edamam.com/api/nutrition-details?app_id=3d86b29a&app_key=46057ab1237b6e9778c74d5a800af5ef";
    
    const bodyData = {
      ingr: ingredients.split(',').map(item => item.trim()), // Разделяем ингредиенты и очищаем от пробелов
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("API запрос не удался");
      }

      const data = await response.json();
      setCalories(data.calories); // Получаем количество калорий
      setNutrients(data.totalNutrients); // Получаем данные о питательных веществах

    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        placeholder="Введите ингредиенты (например, 2 avocado, 1 tomato)"
      />
      <button onClick={fetchNutrition}>Получить информацию</button>

      {calories && (
        <div>
          <h3>Calories: {calories}</h3>
        </div>
      )}

      {nutrients && (
        <div>
          <h3>Total Nutrients:</h3>
          <ul>
            {Object.entries(nutrients).map(([key, value]) => (
              <li key={key}>
                {key}: {value.quantity} {value.unit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nutrition;