// src/hooks/useAssignCardSizesAndHeights.js
import { useMemo } from 'react';

export const useAssignCardSizesAndHeights = (items) => {
  // Memoize the result to avoid recalculating on every render if items don't change
  return useMemo(() => {
    if (!items || items.length === 0) return [];

    const processedItems = [];
    let currentRow = []; // To track items in the current row (for potential future row balancing)
    let currentColumnWidth = 0; // To track total width used in the current row (for potential future row balancing)

    // Define the rules
    const RULES = {
      // R1: Insert an L tile every N cards (e.g., 6–8) - Implemented via counter
      L_INTERVAL: 7,
      // R2: Never allow >2 M in a row; never allow >3 S in a row
      MAX_M_PER_ROW: 2,
      MAX_S_PER_ROW: 3,
      // R4: Content-aware promotion weights
      WEIGHTS: {
        normal: { S: 0.55, M: 0.35, L: 0.1 },
        feature: { S: 0.4, M: 0.5, L: 0.1 },
        hero: { S: 0.2, M: 0.3, L: 0.5 },
      },
      // R6: Keep height choices to {12, 18, 24} units (with grid-auto-rows: 8px → heights become 96px, 144px, 192px)
      HEIGHTS: [96, 144, 192], // In pixels
      // R7: On mobile (1 column), all entries are full width; vary only heights (content-driven)
      // This is handled by the Grid component's responsive props in HomePage.jsx
    };

    // Function to get weighted random size class based on importance
    const getRandomSizeClass = (importance) => {
      const weights = RULES.WEIGHTS[importance] || RULES.WEIGHTS.normal;
      const rand = Math.random();
      let cumulative = 0;
      for (let [size, weight] of Object.entries(weights)) {
        cumulative += weight;
        if (rand <= cumulative) {
          return size;
        }
      }
      return 'S'; // Fallback
    };

    // Function to get a height based on size class (bias taller heights for M/L)
    const getHeight = (sizeClass) => {
      if (sizeClass === 'L') {
        // Higher probability for taller heights for L
        const rand = Math.random();
        if (rand < 0.6) return RULES.HEIGHTS[2]; // 192px
        else if (rand < 0.9) return RULES.HEIGHTS[1]; // 144px
        else return RULES.HEIGHTS[0]; // 96px
      } else if (sizeClass === 'M') {
        // Medium probability for taller heights for M
        const rand = Math.random();
        if (rand < 0.4) return RULES.HEIGHTS[2]; // 192px
        else if (rand < 0.8) return RULES.HEIGHTS[1]; // 144px
        else return RULES.HEIGHTS[0]; // 96px
      } else {
        // Lower probability for taller heights for S
        const rand = Math.random();
        if (rand < 0.2) return RULES.HEIGHTS[2]; // 192px
        else if (rand < 0.6) return RULES.HEIGHTS[1]; // 144px
        else return RULES.HEIGHTS[0]; // 96px
      }
    };

    // Process each item
    items.forEach((item, index) => {
      let sizeClass = getRandomSizeClass(item.importance);
      let height = getHeight(sizeClass);

      // Apply R2: Never allow >2 M in a row; never allow >3 S in a row
      // Note: This is a simplified check within the current loop iteration.
      // A more robust check would involve looking at the last few items added to processedItems.
      const lastMCount = processedItems
        .slice(-RULES.MAX_M_PER_ROW)
        .filter((i) => i.sizeClass === 'M').length;
      const lastSCount = processedItems
        .slice(-RULES.MAX_S_PER_ROW)
        .filter((i) => i.sizeClass === 'S').length;

      if (sizeClass === 'M' && lastMCount >= RULES.MAX_M_PER_ROW) {
        // If we already have 2 M's in a row, force it to S or L
        sizeClass = Math.random() < 0.5 ? 'S' : 'L';
      }

      if (sizeClass === 'S' && lastSCount >= RULES.MAX_S_PER_ROW) {
        // If we already have 3 S's in a row, force it to M or L
        sizeClass = Math.random() < 0.5 ? 'M' : 'L';
      }

      // Apply R1: Insert an L tile every N cards
      if ((index + 1) % RULES.L_INTERVAL === 0) {
        sizeClass = 'L';
      }

      // Add the item with its assigned sizeClass and height
      processedItems.push({ ...item, sizeClass, height });

      // Update currentRow and currentColumnWidth for potential future use (R3)
      currentRow.push({ sizeClass, height });
      currentColumnWidth += sizeClass === 'S' ? 1 : sizeClass === 'M' ? 2 : 3;

      // Optional: Reset row tracking if row is considered "full" based on width
      // This is a simplification; a real grid might need more complex logic
      if (currentColumnWidth >= 3) {
        currentRow = [];
        currentColumnWidth = 0;
      }
    });

    return processedItems;
  }, [items]); // Recalculate only if 'items' changes
};
