export const generateDescriptions = (input: string): string[] => {
  if (!input || !input.trim()) {
    return [];
  }

  // Hardware classification data
  const hardwareTypes = {
    FASTENERS: {
      mainNouns: ['RIVET', 'SCREW', 'BOLT', 'NUT', 'WASHER', 'PIN'],
      materials: ['ALUMINUM', 'STEEL', 'BRASS', 'STAINLESS'],
      styles: ['BLIND', 'SOLID', 'DOMED', 'FLAT', 'PAN', 'HEX', 'SOCKET'],
      attributes: ['HEAD', 'MANDREL', 'THREAD', 'DRIVE'],
      measurements: ['DIAMETER', 'LENGTH', 'THICKNESS']
    }
  };

  // Clean and normalize input
  const cleanInput = input
    .toUpperCase()
    .replace(/,+/g, ',')
    .replace(/\s+/g, ' ')
    .replace(/,\s*/g, ', ')
    .replace(/^\s+|\s+$/g, '')
    .replace(/,\s*$/g, '');

  // Parse input into meaningful segments
  const segments = cleanInput.split(/,\s*|\s+/);
  
  // Initialize categorized components
  const components = {
    mainNoun: '',
    material: '',
    style: [],
    attributes: [],
    measurements: [],
    dimensions: []
  };

  // Find main noun (e.g., RIVET)
  const mainNounIndex = segments.findIndex(word => 
    hardwareTypes.FASTENERS.mainNouns.includes(word) ||
    hardwareTypes.FASTENERS.mainNouns.some(noun => word.endsWith(noun + 'S'))
  );

  if (mainNounIndex !== -1) {
    components.mainNoun = segments[mainNounIndex].replace(/S$/, ''); // Singularize
    segments.splice(mainNounIndex, 1);
  }

  // Process remaining segments
  segments.forEach(segment => {
    // Handle measurements with units
    if (/^[0-9/."-]+$/.test(segment)) {
      components.dimensions.push(segment);
      return;
    }

    // Check material
    if (hardwareTypes.FASTENERS.materials.includes(segment)) {
      components.material = segment;
      return;
    }

    // Check style
    if (hardwareTypes.FASTENERS.styles.includes(segment)) {
      components.style.push(segment);
      return;
    }

    // Check attributes
    if (hardwareTypes.FASTENERS.attributes.includes(segment)) {
      components.attributes.push(segment);
      return;
    }

    // Check measurements
    if (hardwareTypes.FASTENERS.measurements.includes(segment)) {
      components.measurements.push(segment);
      return;
    }

    // Add remaining terms to attributes
    if (segment !== 'WITH' && segment !== 'FOR') {
      components.attributes.push(segment);
    }
  });

  // Construct standardized description
  const descriptionParts = [
    components.mainNoun,
    components.material,
    ...components.style,
    ...components.attributes,
    ...components.measurements.map((m, i) => {
      if (components.dimensions[i]) {
        return `${components.dimensions[i]} ${m}`;
      }
      return m;
    }),
    ...components.dimensions.slice(components.measurements.length)
  ].filter(Boolean);

  // Join with single comma and space
  return [descriptionParts.join(', ')];
};