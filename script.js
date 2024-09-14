// script.js
function calculateMacros() {
    const sex = document.getElementById('sex').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    const proteinPercentage = parseFloat(document.getElementById('protein-percentage').value) / 100;
    const fatPercentage = parseFloat(document.getElementById('fat-percentage').value) / 100;
    const carbPercentage = parseFloat(document.getElementById('carb-percentage').value) / 100;

    // Validación de porcentajes
    if (proteinPercentage + fatPercentage + carbPercentage !== 1) {
        alert("Los porcentajes deben sumar 100%");
        return;
    }

    // Cálculo de BMR
    let BMR;
    if (sex === 'male') {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        BMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calorías de mantenimiento
    const maintenanceCalories = BMR * activity;

    // Ajustar según el objetivo
    let calorieAdjustment;
    if (goal === 'lose') {
        calorieAdjustment = maintenanceCalories - 500;
    } else if (goal === 'gain') {
        calorieAdjustment = maintenanceCalories + 500;
    } else {
        calorieAdjustment = maintenanceCalories;
    }

    // Distribución de macronutrientes
    const proteinCalories = calorieAdjustment * proteinPercentage;
    const fatCalories = calorieAdjustment * fatPercentage;
    const carbCalories = calorieAdjustment * carbPercentage;

    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    const carbGrams = carbCalories / 4;

    // Mostrar resultados
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h2>Resultados</h2>
        <p><strong>Calorías diarias:</strong> ${Math.round(calorieAdjustment)} kcal</p>
        <p><strong>Proteínas:</strong> ${Math.round(proteinGrams)} g (${Math.round(proteinCalories)} kcal)</p>
        <p><strong>Grasas:</strong> ${Math.round(fatGrams)} g (${Math.round(fatCalories)} kcal)</p>
        <p><strong>Carbohidratos:</strong> ${Math.round(carbGrams)} g (${Math.round(carbCalories)} kcal)</p>
    `;
}
