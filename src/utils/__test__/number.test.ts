import { formatNumber, formatOriginal } from '../number';
import { expect } from "chai";



describe('Number Formatting Tests', () => {
  describe('formatNumber', () => {
    it('should format integers correctly', () => {
      expect(formatNumber(1234567)).to.equal('1,234,567.00');
    });

    it('should format decimals with default 2 decimal places', () => {
      expect(formatNumber(1234567.89)).to.equal('1,234,567.89');
    });

    it('should format with specified decimal places', () => {
      expect(formatNumber(1234567.89, 1)).to.equal('1,234,567.8');
      expect(formatNumber(1234567.89, 3)).to.equal('1,234,567.890');
    });

    it('should round when round is true', () => {
      expect(formatNumber(1234567.89, 1, true)).to.equal('1,234,567.9');
      expect(formatNumber(1234567.89, 0, true)).to.equal('1,234,568');
    });

    it('should truncate when round is false', () => {
      expect(formatNumber(1234567.89, 1, false)).to.equal('1,234,567.8');
      expect(formatNumber(1234567.89, 0, false)).to.equal('1,234,567');
    });

    it('should handle bigint type correctly', () => {
      expect(formatNumber(BigInt(1234567))).to.equal('1,234,567');
    });
  });

  describe('formatOriginal', () => {
    it('should format integers correctly', () => {
      expect(formatOriginal(1234567)).to.equal('1,234,567');
    });

    it('should maintain original decimal places', () => {
      expect(formatOriginal(1234567.89)).to.equal('1,234,567.89');
      expect(formatOriginal(1234567.890)).to.equal('1,234,567.89');
    });

    it('should handle numbers without decimal places', () => {
      expect(formatOriginal(1234567.00)).to.equal('1,234,567');
    });

    it('should handle bigint type correctly', () => {
      expect(formatOriginal(BigInt(1234567))).to.equal('1,234,567');
    });
  });
});
