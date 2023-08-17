export default function checkDateBirth(data: string): boolean {
  const ageAdult = 18;
  const userDate = new Date(data);
  const currentDate = new Date();
  const yearAdult = currentDate.getFullYear() - ageAdult;
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const hours = 3;
  const adultDate = new Date(yearAdult, month, day, hours);
  return userDate <= adultDate;
}
