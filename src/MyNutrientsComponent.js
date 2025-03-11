import "./MyNutrientComponent.css";

function MyNutrientsComponent({ label, quantity, unit }) {
    return (
      <div className="nutrient">
        <span className="nutrient-label">{label}</span>
        <span className="nutrient-value">
          {quantity.toFixed(1)} {unit}
        </span>
      </div>
    );
  }
  
  export default MyNutrientsComponent;
