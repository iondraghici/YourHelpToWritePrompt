export interface ROCREMetadata {
version?: string;
author?: string;
createdAt?: string;
tags?: string[];
}


export interface ROCREPrompt {
role: string;
objective: string;
context?: string;
rules?: string[];
evaluation?: string;
metadata?: ROCREMetadata;
}