# rocre-core

Core library for ROCRE prompt engineering.

## Installation

npm install rocre-core

## Usage (TypeScript)

import { createPrompt, validatePrompt, buildPrompt } from 'rocre-core';

const promptData = createPrompt({
  role: "Senior Developer",
  objective: "Write a scalable microservice",
  context: "Team project",
  rules: ["Use clean architecture"]
});

const validation = validatePrompt(promptData);
if (!validation.valid) console.error(validation.errors);

const text = buildPrompt(promptData);
console.log(text);

## Example YAML (optional)

role: Senior Developer
objective: Write a scalable microservice
context: Team project
rules:
  - Use clean architecture
