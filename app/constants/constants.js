export const BMI_THRESHOLDS = {
  UNDERWEIGHT: 18.5, //межа, за якою людина вважається худою
  NORMAL_WEIGHT_MIN: 18.5, //мінімальна межа нормальної ваги
  NORMAL_WEIGHT_MAX: 24.9, //максимальна межа нормальної ваги
};

export const WEIGHT_LOSS_PERCENTAGE_LIMITS = {
  UNDERWEIGHT: 0, //y %, якщо людина має недостатню вагу, вона не повинна втрачати більше
  NORMAL: 10, //максимальна безпечна втрата ваги для людей з нормальною вагою
  OVERWEIGHT: 15, //максимальна безпечна втрата ваги для людей з надмірною вагою
};

export const MAX_WEIGHT_LOSS_DELTA = 9;
