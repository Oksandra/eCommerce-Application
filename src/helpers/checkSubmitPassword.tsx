export function checkSubmitPassword(
  currentPasswordError: string,
  newPasswordError: string,
  confirmPasswordError: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
  setCurrentPasswordError: (mes: string) => void,
  setNewPasswordError: (mes: string) => void
): boolean {
  if (!currentPassword || !newPassword || !confirmPassword) {
    if (!currentPassword) {
      setCurrentPasswordError('Please enter current password.');
    }
    if (!newPassword) {
      setNewPasswordError('Please enter new password.');
    }
    return true;
  }
  if (!!currentPasswordError || !!newPasswordError || !!confirmPasswordError)
    return true;
  return false;
}
