from '../models/ROCREPrompt';


export interface ValidationError {
field: keyof ROCREPrompt;
message: string;
code: string;
}


export interface ValidationResult {
valid: boolean;
errors: ValidationError[];
}


export function validatePrompt(prompt: ROCREPrompt): ValidationResult {
const errors: ValidationError[] = [];


if (!prompt.role) {
errors.push({ field: 'role', message: 'Role is required', code: 'ROLE_REQUIRED' });
}


if (!prompt.objective) {
errors.push({ field: 'objective', message: 'Objective is required', code: 'OBJECTIVE_REQUIRED' });
}


if (prompt.rules && !Array.isArray(prompt.rules)) {
errors.push({ field: 'rules', message: 'Rules must be an array', code: 'RULES_INVALID' });
}


return {
valid: errors.length === 0,