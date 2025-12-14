import { renderHook, act } from '@testing-library/react';
import { useRocre } from './useRocre';
import { INITIAL_DATA } from '../constants';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useRocre', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with default data', () => {
    const { result } = renderHook(() => useRocre());
    expect(result.current.rocreData).toEqual(INITIAL_DATA);
  });

  it('should update data when input changes', () => {
    const { result } = renderHook(() => useRocre());

    act(() => {
      result.current.handleInputChange('role', 'Developer');
    });

    expect(result.current.rocreData.role).toBe('Developer');
    expect(result.current.saveStatus).toBe('saving');
  });

  it('should validate required fields', () => {
    const { result } = renderHook(() => useRocre());

    act(() => {
      result.current.handleInputChange('role', '');
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.errors.role).toBeDefined();
  });

  it('should clear data', () => {
    const { result } = renderHook(() => useRocre());

    act(() => {
      result.current.handleInputChange('role', 'Dev');
      result.current.handleClear();
    });

    expect(result.current.rocreData).toEqual(INITIAL_DATA);
  });
});
