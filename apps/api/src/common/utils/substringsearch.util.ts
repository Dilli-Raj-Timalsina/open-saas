/**
 * It return boolean based on if the search matches case insensitive substring matches
 * @param label  where the value is searched .
 * @param code value to be searched .
 * @returns boolean if search matches else false .
 */
export function searchLabel(label: string, code: string): boolean {
  const lowerCasedLabel = label.toLowerCase();
  const lowerCasedCode = code.toLowerCase();
  return lowerCasedLabel.includes(lowerCasedCode);
}
