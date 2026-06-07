export function getPasswordStrength(password: string) {
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasNumber, hasUpper, hasLower, hasSpecial]
    .filter(Boolean).length;

  return {
    score,
    hasNumber,
    hasUpper,
    hasLower,
    hasSpecial,
  };
}