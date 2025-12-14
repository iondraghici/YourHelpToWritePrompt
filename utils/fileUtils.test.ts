import { formatPrompt } from './fileUtils';
import { INITIAL_DATA } from '../constants';

describe('fileUtils', () => {
  describe('formatPrompt', () => {
    it('should return placeholder message for empty data', () => {
      const result = formatPrompt(INITIAL_DATA);
      expect(result).toContain('Start typing');
    });

    it('should format valid data correctly', () => {
      const data = {
        role: 'Coder',
        objective: 'Write code',
        context: 'Context info',
        restrictions: 'No bugs',
        examples: 'Example 1',
      };
      const result = formatPrompt(data);
      expect(result).toContain('## ROLE\nCoder');
      expect(result).toContain('## OBJECTIVE\nWrite code');
      expect(result).toContain('## CONTEXT\nContext info');
      expect(result).toContain('## RESTRICTIONS\nNo bugs');
      expect(result).toContain('## EXAMPLES / EVALUATION\nExample 1');
    });

    it('should only include present fields', () => {
      const data = {
        ...INITIAL_DATA,
        role: 'Writer',
      };
      const result = formatPrompt(data);
      expect(result).toContain('## ROLE\nWriter');
      expect(result).not.toContain('## OBJECTIVE');
    });
  });
});
