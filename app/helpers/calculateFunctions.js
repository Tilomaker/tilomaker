import {
  BMI_THRESHOLDS,
  WEIGHT_LOSS_PERCENTAGE_LIMITS,
  MAX_WEIGHT_LOSS_DELTA,
} from "../constants/constants";

export function calculateBMI(weight, height) {
  if (!weight || !height) return null;
  const heightInMeters = height / 100;
  return (weight / heightInMeters ** 2).toFixed(1);
}

export function getBMIStatus(currentWeight, height) {
  const bmi = calculateBMI(currentWeight, height);

  if (bmi < BMI_THRESHOLDS.UNDERWEIGHT) {
    return "UNDERWEIGHT"; // Вага занадто низька
  } else if (
    bmi >= BMI_THRESHOLDS.NORMAL_WEIGHT_MIN &&
    bmi <= BMI_THRESHOLDS.NORMAL_WEIGHT_MAX
  ) {
    return "NORMAL"; // Нормальна вага
  } else {
    return "OVERWEIGHT"; // Вага надмірна
  }
}

export function getSafeWeightLossLimit(currentWeight, height) {
  const bmi = calculateBMI(currentWeight, height);

  if (bmi < BMI_THRESHOLDS.NORMAL_WEIGHT_MIN) {
    return WEIGHT_LOSS_PERCENTAGE_LIMITS.UNDERWEIGHT;
  } else if (
    bmi >= BMI_THRESHOLDS.NORMAL_WEIGHT_MIN &&
    bmi <= BMI_THRESHOLDS.NORMAL_WEIGHT_MAX
  ) {
    return WEIGHT_LOSS_PERCENTAGE_LIMITS.NORMAL;
  } else {
    return WEIGHT_LOSS_PERCENTAGE_LIMITS.OVERWEIGHT;
  }
}

export function isSafeWeightLoss(currentWeight, desiredWeight, height) {
  if (isNaN(currentWeight) || isNaN(desiredWeight) || currentWeight <= 0) {
    return "";
  }

  if (desiredWeight > currentWeight) {
    return "";
  }

  const weightLossPercentage =
    ((currentWeight - desiredWeight) / currentWeight) * 100;

  // Обчислення максимально допустимої ваги для втрати
  const maxSafeWeightLoss = currentWeight - MAX_WEIGHT_LOSS_DELTA;

  // Перевірка, чи бажана вага перевищує максимальну допустиму
  if (desiredWeight < maxSafeWeightLoss) {
    return "tooMuch"; // Втрата ваги перевищує безпечний ліміт
  }

  const safeLimit = getSafeWeightLossLimit(currentWeight, height);

  if (safeLimit === WEIGHT_LOSS_PERCENTAGE_LIMITS.UNDERWEIGHT) {
    return "tooLittle"; // Втрата ваги занадто низька
  } else if (weightLossPercentage > safeLimit) {
    return "tooMuch"; // Втрата ваги перевищує безпечний ліміт
  } else {
    return "ok"; // Все в порядку
  }
}
