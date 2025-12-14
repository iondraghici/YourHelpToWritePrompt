import { LucideIcon } from 'lucide-react';

export interface RocreData {
  role: string;
  objective: string;
  context: string;
  restrictions: string;
  examples: string;
}

export type RocreKey = keyof RocreData;

export interface RocreOption {
  label: string;
  value: string;
}

export interface RocreSectionConfig {
  key: RocreKey;
  label: string;
  shortLabel: string;
  description: string;
  placeholder: string;
  color: string;
  icon: LucideIcon;
  required?: boolean;
  options?: RocreOption[];
}
