/** 숫자만 남긴 뒤 한국 번호 형식으로 하이픈을 넣습니다. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("02")) {
    if (digits.length === 9) return digits.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    if (digits.length === 10) return digits.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  if (digits.length === 8) return digits.replace(/(\d{4})(\d{4})/, "$1-$2");
  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");

  return raw.trim();
}

export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
