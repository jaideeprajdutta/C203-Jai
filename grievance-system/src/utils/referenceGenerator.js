/**
 * Utility functions for generating unique reference IDs for grievances
 */

/**
 * Generates a unique reference ID for a grievance
 * Format: GRV-YYYY-MMDD-XXXX
 * Where XXXX is a random 4-digit number
 */
export const generateReferenceId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  return `GRV-${year}-${month}${day}-${randomNum}`;
};

/**
 * Generates a tracking token for anonymous submissions
 * Format: TRK-XXXXXXXX (8 random alphanumeric characters)
 */
export const generateTrackingToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'TRK-';
  
  for (let i = 0; i < 8; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return token;
};

/**
 * Validates a reference ID format
 */
export const validateReferenceId = (referenceId) => {
  if (!referenceId || typeof referenceId !== 'string') {
    return false;
  }
  
  // Check for GRV format: GRV-YYYY-MMDD-XXXX
  const grvPattern = /^GRV-\d{4}-\d{4}-\d{4}$/;
  
  // Check for TRK format: TRK-XXXXXXXX
  const trkPattern = /^TRK-[A-Z0-9]{8}$/;
  
  return grvPattern.test(referenceId) || trkPattern.test(referenceId);
};

/**
 * Extracts date information from a reference ID
 */
export const extractDateFromReferenceId = (referenceId) => {
  if (!validateReferenceId(referenceId) || !referenceId.startsWith('GRV-')) {
    return null;
  }
  
  const parts = referenceId.split('-');
  if (parts.length !== 4) return null;
  
  const year = parseInt(parts[1]);
  const monthDay = parts[2];
  const month = parseInt(monthDay.substring(0, 2)) - 1; // Month is 0-indexed
  const day = parseInt(monthDay.substring(2, 4));
  
  return new Date(year, month, day);
};

/**
 * Generates a secure hash for internal tracking (not exposed to users)
 */
export const generateInternalHash = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
};

/**
 * Creates a complete grievance reference object
 */
export const createGrievanceReference = (isAnonymous = false) => {
  const referenceId = isAnonymous ? generateTrackingToken() : generateReferenceId();
  const internalHash = generateInternalHash();
  const createdAt = new Date().toISOString();
  
  return {
    referenceId,
    internalHash,
    createdAt,
    isAnonymous,
    type: isAnonymous ? 'anonymous' : 'registered'
  };
};