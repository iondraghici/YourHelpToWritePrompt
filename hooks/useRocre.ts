import { useState, useEffect, useRef, useMemo } from 'react';
import { RocreData } from '../types';
import { ROCRE_SECTIONS, INITIAL_DATA } from '../constants';

const STORAGE_KEY = 'rocre_saved_data';

export const useRocre = () => {
  // Initialize state from localStorage if available, otherwise use INITIAL_DATA
  const [rocreData, setRocreData] = useState<RocreData>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : INITIAL_DATA;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return INITIAL_DATA;
    }
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isFirstRender = useRef(true);

  // Validate data
  const errors = useMemo(() => {
    const newErrors: Record<string, string> = {};
    ROCRE_SECTIONS.forEach((section) => {
      if (section.required && !rocreData[section.key].trim()) {
        newErrors[section.key] = `${section.label} is required`;
      }
    });
    return newErrors;
  }, [rocreData]);

  const isValid = Object.keys(errors).length === 0;

  // Save to localStorage whenever rocreData changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rocreData));
      // Use setTimeout to avoid synchronous setState in effect (cascading render)
      setTimeout(() => setSaveStatus('saved'), 0);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }

    const timer = setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);

    return () => clearTimeout(timer);
  }, [rocreData]);

  const handleInputChange = (key: keyof RocreData, value: string) => {
    setSaveStatus('saving');
    setRocreData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputBlur = (key: keyof RocreData) => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const handleClear = () => {
    setSaveStatus('saving');
    setRocreData(INITIAL_DATA);
    setTouched({}); // Reset touched state so errors don't show immediately
  };

  const handleImport = (data: RocreData) => {
    setSaveStatus('saving');
    setRocreData(data);
    setTouched({});
  };

  return {
    rocreData,
    touched,
    saveStatus,
    errors,
    isValid,
    handleInputChange,
    handleInputBlur,
    handleClear,
    handleImport,
  };
};
