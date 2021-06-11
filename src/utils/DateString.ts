const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export function getCurrent() {
  const now = new Date();

  let day = `${now.getDate()}`;
  if (day.length < 2) {
    day = `0${day}`;
  }
  const month = MONTHS[now.getMonth()];
  const year = now.getFullYear();

  return `${day} de ${month} de ${year}`;
}
