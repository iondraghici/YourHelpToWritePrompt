/**
 * Saves a string content to a local file in the browser.
 * @param content The string content to save.
 * @param filename The default name of the file.
 * @param mimeType The MIME type of the file (default: text/plain).
 */
export const saveTextFile = (content: string, filename: string, mimeType: string = 'text/plain;charset=utf-8') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  
  // Append to body to ensure visibility to DOM (required for Firefox)
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Formats the ROCRE data into a single coherent prompt string.
 */
export const formatPrompt = (data: { [key: string]: string }): string => {
  const parts = [];

  if (data.role) parts.push(`## ROLE\n${data.role}`);
  if (data.objective) parts.push(`## OBJECTIVE\n${data.objective}`);
  if (data.context) parts.push(`## CONTEXT\n${data.context}`);
  if (data.restrictions) parts.push(`## RESTRICTIONS\n${data.restrictions}`);
  if (data.examples) parts.push(`## EXAMPLES / EVALUATION\n${data.examples}`);

  if (parts.length === 0) return 'Start typing in the input fields to generate your prompt...';

  return parts.join('\n\n');
};