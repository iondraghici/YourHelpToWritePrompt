import { ROCREPrompt } from '../models/ROCREPrompt';


export function buildPrompt(prompt: ROCREPrompt): string {
const sections = [
`Role: ${prompt.role}`,
`Objective: ${prompt.objective}`,
prompt.context && `Context: ${prompt.context}`,
prompt.rules?.length && `Rules:\n- ${prompt.rules.join('\n- ')}`,
prompt.evaluation && `Evaluation: ${prompt.evaluation}`
];


return sections.filter(Boolean).join('\n\n');
}