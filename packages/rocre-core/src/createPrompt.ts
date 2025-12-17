import { ROCREPrompt } from './models/ROCREPrompt';


export function createPrompt(input: Partial<ROCREPrompt>): ROCREPrompt {
return {
role: input.role?.trim() || '',
objective: input.objective?.trim() || '',
context: input.context?.trim(),
rules: input.rules?.filter(Boolean),
evaluation: input.evaluation?.trim(),
metadata: {
...input.metadata,
createdAt: new Date().toISOString()
}
};
}