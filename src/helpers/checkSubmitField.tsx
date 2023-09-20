export function checkSubmitField(
  fieldError: string,
  fieldValue: string,
  setFieldError: (mes: string) => void
): boolean {
  if (!fieldValue) {
    setFieldError('Please enter new value.');
    return true;
  }
  if (fieldError) return true;
  return false;
}
