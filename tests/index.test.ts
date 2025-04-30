import { describe, it, expect } from 'vitest';
import { namecrement } from '../src';

describe('namecrement (default format)', () => {
    it('returns the proposed name if it is unique', () => {
        const result = namecrement('file', ['file (1)', 'file (2)']);
        expect(result).toBe('file');
    });

    it('appends " (1)" if the proposed name is already taken', () => {
        const result = namecrement('file', ['file']);
        expect(result).toBe('file (1)');
    });

    it('finds the smallest unused suffix', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (2)']);
        expect(result).toBe('file (3)');
    });

    it('handles names that already have a suffix', () => {
        const result = namecrement('file (1)', ['file', 'file (1)', 'file (2)']);
        expect(result).toBe('file (3)');
    });

    it('fills in gaps between suffixes', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (3)']);
        expect(result).toBe('file (2)');
    });

    it('escapes special characters in the base name', () => {
        const result = namecrement('file.name', ['file.name', 'file.name (1)']);
        expect(result).toBe('file.name (2)');
    });
});

describe('namecrement (custom suffix format)', () => {
    it('supports dash format', () => {
        const result = namecrement('file', ['file', 'file -1-', 'file -2-'], ' -%N%-');
        expect(result).toBe('file -3-');
    });

    it('supports simple numeric suffix', () => {
        const result = namecrement('log', ['log', 'log1'], '%N%');
        expect(result).toBe('log2');
    });

    it('uses custom suffix even if proposed name has a similar looking suffix', () => {
        const result = namecrement('item 1', ['item', 'item 1', 'item 2'], ' %N%');
        expect(result).toBe('item 3');
    });

    it('returns base name if not in existing list, even with custom format', () => {
        const result = namecrement('report', ['report -1-'], ' -%N%-');
        expect(result).toBe('report');
    });

    it('handles names with special characters and custom format', () => {
        const result = namecrement('file.name', ['file.name', 'file.name_1_'], '_%N%_');
        expect(result).toBe('file.name_2_');
    });
});

describe('Suffix format validation', () => {
    it('should allow valid suffix formats with %N%', () => {
        const result = namecrement('file', [], ' -%N%-');
        expect(result).toBe('file');
    });

    it('should throw if suffix format does not include %N%', () => {
        // @ts-ignore
        expect(() => namecrement('file', [], ' -X-')).toThrowError(
            /suffixFormat must include %N%/
        );
    });
});

describe('Edge cases & stress tests', () => {
    it('handles suffixes with multiple digits', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (10)']);
        expect(result).toBe('file (2)');
    });

    it('ignores names that don’t match the suffix pattern', () => {
        const result = namecrement('file', ['file [1]', 'file_1', 'file (x)']);
        expect(result).toBe('file');
    });

    it('treats numeric-looking names correctly when not matching suffix format', () => {
        const result = namecrement('file1', ['file1', 'file1 (1)']);
        expect(result).toBe('file1 (2)');
    });

    it('handles special characters like $, [, ], ^, etc.', () => {
        const result = namecrement('file[1].$^', ['file[1].$^', 'file[1].$^ (1)']);
        expect(result).toBe('file[1].$^ (2)');
    });

    it('does not falsely match suffix in middle of name', () => {
        const result = namecrement('file (1) backup', ['file (1) backup', 'file (1) backup (1)']);
        expect(result).toBe('file (1) backup (2)');
    });

    it('treats name with suffix-like part in middle as a distinct base', () => {
        const result = namecrement('archive (1) final', ['archive (1) final', 'archive (1) final (1)']);
        expect(result).toBe('archive (1) final (2)');
    });

    it('fills large gaps correctly', () => {
        const result = namecrement('file', ['file', 'file (1)', 'file (99)', 'file (100)']);
        expect(result).toBe('file (2)');
    });

    it('handles deeply nested suffix correctly', () => {
        const result = namecrement('file (99)', ['file', 'file (1)', 'file (99)']);
        expect(result).toBe('file (2)');
    });

    it('handles complex custom format like <v%N%>', () => {
        const result = namecrement('version', ['version', 'version<v1>', 'version<v2>'], '<v%N%>');
        expect(result).toBe('version<v3>');
    });

    it('handles numeric-only base names', () => {
        const result = namecrement('2023', ['2023', '2023 (1)', '2023 (2)']);
        expect(result).toBe('2023 (3)');
    });
});
