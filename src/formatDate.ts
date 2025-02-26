export function formatDate(date: string): string {
  return date
    .split("")
    .map((el) => {
      if (el.toUpperCase() == el.toLowerCase()) {
        return el;
      } else {
        return " ";
      }
    })
    .join("");
}

export function formatMinDate(): string {
  const date = new Date();
  const today = date.toISOString().split("");
  today.splice(16, 8);
  return today.join("");
}
