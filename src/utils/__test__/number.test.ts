import { expect } from "chai";
import { formatNumber } from '../number';

describe('Number Formatting Tests', () => {
  describe('formatNumber', () => {
    it('should format integers correctly', () => {
      expect(formatNumber(1234567)).to.equal('1,234,567');
    });

    it('should maintain original decimal places when no decimals specified', () => {
      expect(formatNumber(1234567.89)).to.equal('1,234,567.89');
      expect(formatNumber(1234567.890)).to.equal('1,234,567.89');
    });

    it('should format with specified decimal places without rounding', () => {
      expect(formatNumber(1234567.89, 1)).to.equal('1,234,567.8');
      expect(formatNumber(1234567.89, 3)).to.equal('1,234,567.890');
    });

    it('should round when round is true', () => {
      expect(formatNumber(1234567.89, 1, true)).to.equal('1,234,567.9');
      expect(formatNumber(1234567.89, 0, true)).to.equal('1,234,568');
    });

    it('should handle bigint type correctly', () => {
      expect(formatNumber(BigInt(1234567))).to.equal('1,234,567');
    });

    it('should handle zero correctly', () => {
      expect(formatNumber(0)).to.equal('0');
      expect(formatNumber(0.00)).to.equal('0');
    });

    it('should handle negative numbers correctly', () => {
      expect(formatNumber(-1234567.89)).to.equal('-1,234,567.89');
      expect(formatNumber(-1234567.89, 1)).to.equal('-1,234,567.8');
      expect(formatNumber(-1234567.89, 1, true)).to.equal('-1,234,567.9');
    });
  });
});
