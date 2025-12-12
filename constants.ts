import { User, Target, BookOpen, AlertTriangle, ListChecks } from 'lucide-react';
import { RocreSectionConfig } from './types';

export const ROCRE_SECTIONS: RocreSectionConfig[] = [
  {
    key: 'role',
    label: 'Role',
    shortLabel: 'R',
    description: 'Define the persona the AI should adopt (e.g., "Senior Software Engineer").',
    placeholder: 'You are an expert Senior Software Engineer specializing in...',
    color: 'text-blue-600',
    icon: User,
  },
  {
    key: 'objective',
    label: 'Objective',
    shortLabel: 'O',
    description: 'Clearly state what you want the AI to achieve.',
    placeholder: 'Your objective is to create a secure login system using...',
    color: 'text-green-600',
    icon: Target,
  },
  {
    key: 'context',
    label: 'Context',
    shortLabel: 'C',
    description: 'Provide background information, audience details, or relevant data.',
    placeholder: 'The system will be used by enterprise clients who value security over speed...',
    color: 'text-purple-600',
    icon: BookOpen,
  },
  {
    key: 'restrictions',
    label: 'Restrictions',
    shortLabel: 'R',
    description: 'List constraints, things to avoid, or strict formatting rules.',
    placeholder: 'Do not use external libraries. Ensure code is commented. Keep response under 500 words.',
    color: 'text-red-600',
    icon: AlertTriangle,
  },
  {
    key: 'examples',
    label: 'Examples / Evaluation',
    shortLabel: 'E',
    description: 'Provide examples of desired output or criteria for success.',
    placeholder: 'Output format: JSON. Example: { "status": "success", "code": 200 }',
    color: 'text-orange-600',
    icon: ListChecks,
  },
];

export const INITIAL_DATA = {
  role: '',
  objective: '',
  context: '',
  restrictions: '',
  examples: '',
};