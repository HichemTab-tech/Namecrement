import { describe, it, expect } from 'vitest';
import { namecrement } from '../src';

describe('namecrement', () => {
    it('should return the proposed name if it is unique', () => {
        const result = namecrement('file', ['file (1)', 'file (2)']);
        expect(result).toBe('file');
    });

    it('should append " (1)" if the proposed name is already taken', () => {
        const result = namecrement('file', ['file']);
        expect(result).toBe('file (1)');
    });

    it('should find the smallest unused suffix', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (2)']);
        expect(result).toBe('file (3)');
    });

    it('should handle names that already have a suffix', () => {
        const result = namecrement('file (1)', ['file', 'file (1)', 'file (2)']);
        expect(result).toBe('file (3)');
    });

    it('should handle names with gaps in suffixes', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (3)']);
        expect(result).toBe('file (2)');
    });

    it('should escape special characters in the base name', () => {
        const result = namecrement('file.name', ['file.name', 'file.name (1)']);
        expect(result).toBe('file.name (2)');
    });
});