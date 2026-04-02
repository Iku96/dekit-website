/**
 * Official Stationery Categories from the Dekit Pricelist PDF
 */
export const OFFICIAL_CATEGORIES = [
  'ORGANIZERS',
  'STORAGE & FILLING',
  'EFD ROLLERS',
  'PAPERS STATIONERY',
  'GLUES & TAPES',
  'NOTEBOOKS',
  'MACHINE STATIONERY',
  'PIN STATIONERY',
  'WRITING STATIONERY',
  'WHITEBOARD ACCESSORIES',
  'OTHER STATIONERIES'
];

/**
 * Automatically assigns a category to a product based on its name.
 * Returns null if the product should be hidden (e.g. Slippers).
 */
export function getSmartCategory(name: string, currentCategory: string = ''): string | null {
  const upperName = name.toUpperCase();
  const upperCat = currentCategory.toUpperCase();

  // 1. Hide Slippers & Footwear
  if (upperName.includes('SLIPPER') || upperName.includes('FOOTWEAR') || upperCat.includes('SLIPPER')) {
    return null;
  }

  // 2. Exact match check
  if (OFFICIAL_CATEGORIES.includes(upperCat)) {
    return upperCat;
  }

  // 3. Keyword Match Logic (Priority Based)
  
  // ORGANIZERS
  if (matches(upperName, ['DUSTBIN', 'PAPER TRAY', 'OFFICE TRAY', 'DESK ORGANIZER', 'DRAWER'])) {
    return 'ORGANIZERS';
  }

  // STORAGE & FILLING
  if (matches(upperName, ['BOX FILE', 'BOXFILE', 'OFFICE FILE', 'ENVELOPE', 'FOLDER', 'POCKET', 'BINDER', 'CLIP BOARD', 'CLIPBOARD', 'CLEAR BAG', 'SPRING FILE', 'FLAT FILE', 'SUSPENSION FILE'])) {
    return 'STORAGE & FILLING';
  }

  // EFD ROLLERS
  if (matches(upperName, ['EFD', 'THERMAL ROLL', 'ROLLER'])) {
    return 'EFD ROLLERS';
  }

  // PAPERS STATIONERY
  if (matches(upperName, ['RIM PAPER', 'CARBON PAPER', 'PHOTO PAPER', 'STICKER PAPER', 'MANILA', 'LAMINATION POUCH', 'GLOSS PAPER', 'GLOSSY', 'A4 PAPER', 'A3 PAPER', 'A5 PAPER'])) {
    return 'PAPERS STATIONERY';
  }

  // GLUES & TAPES
  if (matches(upperName, ['RIBBON', 'RIBON', 'TAPE', 'GLUE STICK', 'GLUESTICK', 'CELOTALE', 'CELOTAPE'])) {
    return 'GLUES & TAPES';
  }

  // NOTEBOOKS
  if (matches(upperName, ['NOTEBOOK', 'NOTE BOOK', 'WRITING PAD', 'FLIP CHART', 'STICK NOTE', 'STICKNOTE', 'VISITORS BOOK', 'COUNTER BOOK', 'LOGBOOK', 'RULED PAPER'])) {
    return 'NOTEBOOKS';
  }

  // MACHINE STATIONERY
  if (matches(upperName, ['STAPLER MACHINE', 'PUNCH MACHINE', 'PUNCHING', 'PAPER CUTTER', 'LAMINATOR', 'BINDING MACHINE', 'DEI CUTTER', 'HEAVY DUTY'])) {
    return 'MACHINE STATIONERY';
  }

  // PIN STATIONERY
  if (matches(upperName, ['STAPLE PIN', 'PUSH PIN', 'THUMB PIN', 'PAPER CLIP', 'OFFICE PIN', 'BULL DOG', 'BULLDOG'])) {
    return 'PIN STATIONERY';
  }

  // WRITING STATIONERY
  if (matches(upperName, ['INK PAD', 'STAMP PAD', 'STAMPPAD', 'PEN', 'PENCIL', 'CORRECTION FLUID', 'HIGHLIGHTER', 'MARKER'])) {
    return 'WRITING STATIONERY';
  }

  // WHITEBOARD ACCESSORIES
  if (matches(upperName, ['WHITE BOARD', 'WHITEBOARD', 'DUSTER', 'CLEANER'])) {
    return 'WHITEBOARD ACCESSORIES';
  }

  // OTHER STATIONERIES (Default fallback for stationery)
  if (matches(upperName, ['CALCULATOR', 'ERASER', 'SCISSORS', 'ID RIBBON', 'ID CLIP', 'ID POUCH', 'ID HOLDER', 'RUBBER BAND', 'PRICE TAG', 'SHARPENER', 'SHAPNER', 'CHALK', 'CUTTER KNIFE', 'FILE DIVIDER', 'RULLER', 'RULER', 'SPIRAL', 'EPSON INK'])) {
    return 'OTHER STATIONERIES';
  }

  // Fallback to OTHER STATIONERIES if it's already marked as some kind of stationery
  if (upperCat.includes('STATIONER')) {
    return 'OTHER STATIONERIES';
  }

  // Default to OTHER STATIONERIES if nothing else matches but it's not hidden
  return 'OTHER STATIONERIES';
}

function matches(name: string, keywords: string[]): boolean {
  return keywords.some(keyword => name.includes(keyword));
}
