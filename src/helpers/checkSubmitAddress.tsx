export function checkSubmitAddress(
  codeError: string,
  countryError: string,
  cityError: string,
  streetError: string,
  postalCode: string,
  country: string,
  city: string,
  street: string,
  setCodeError: (mes: string) => void,
  setCountryError: (mes: string) => void,
  setCityError: (mes: string) => void,
  setStreetError: (mes: string) => void
): boolean {
  if (!postalCode || !country || !city || !street) {
    if (!postalCode) {
      setCodeError('Please enter postal code.');
    }
    if (!country) {
      setCountryError('Please enter country.');
    }
    if (!city) {
      setCityError('Please enter city.');
    }
    if (!street) {
      setStreetError('Please enter street.');
    }
    return true;
  }
  if (!!codeError || !!countryError || !!cityError || !!streetError)
    return true;
  return false;
}
