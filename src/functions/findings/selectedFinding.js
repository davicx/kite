/**
 * Map a scan finding (Chat context) or Navigator findings-table row
 * into the slim selectedFinding shape the API Situation accepts.
 */
export function toSelectedFinding(source) {
  if (!source || typeof source !== 'object') {
    return null;
  }

  // Formatted finding from atlasResponse.findings
  if (source.findingID != null || source.resourceID != null || source.ruleID != null) {
    return cleanSelectedFinding({
      ruleId: source.ruleID || source.issueCode || null,
      instanceId: source.resourceID || null,
      name: source.resourceName || null,
      resourceName: source.resourceName || null,
      service: source.service || 'EC2',
      title: source.title || null,
      cpuAverage: source.avgCPU != null ? source.avgCPU : null,
      estimatedSavings: source.estimatedMonthlySavings != null ? source.estimatedMonthlySavings : null,
      currentType: source.resourceType || null,
      region: source.region || null,
    });
  }

  // Navigator EC2 findings table row
  return cleanSelectedFinding({
    ruleId: source.issue_code || source.ruleId || null,
    instanceId: source.resource_id || source.instanceId || null,
    name: source.resource_name || source.name || null,
    resourceName: source.resource_name || source.resourceName || null,
    service: source.service || 'EC2',
    title: source.title || null,
    cpuAverage:
      source.avg_cpu != null
        ? source.avg_cpu
        : source.cpuAverage != null
          ? source.cpuAverage
          : null,
    estimatedSavings:
      source.estimated_monthly_savings != null
        ? source.estimated_monthly_savings
        : source.estimatedSavings != null
          ? source.estimatedSavings
          : null,
    currentType: source.currentType || null,
    region: source.region || null,
  });
}

function cleanSelectedFinding(candidate) {
  const slim = {};

  Object.keys(candidate).forEach((key) => {
    const value = candidate[key];
    if (value === undefined || value === null || value === '') {
      return;
    }
    slim[key] = value;
  });

  if (!slim.ruleId && !slim.instanceId && !slim.title) {
    return null;
  }

  return slim;
}

export function formatSelectedFindingLabel(selectedFinding) {
  if (!selectedFinding) {
    return '';
  }

  const parts = [];

  if (selectedFinding.title) {
    parts.push(selectedFinding.title);
  } else if (selectedFinding.ruleId) {
    parts.push(selectedFinding.ruleId);
  }

  if (selectedFinding.name || selectedFinding.resourceName) {
    parts.push(selectedFinding.name || selectedFinding.resourceName);
  }

  if (selectedFinding.instanceId) {
    parts.push(selectedFinding.instanceId);
  }

  if (selectedFinding.cpuAverage != null) {
    parts.push(`~${selectedFinding.cpuAverage}% CPU`);
  }

  return parts.join(' · ');
}

/** Short confirmation line for banner + thread bubble */
export function formatYouSelectedMessage(selectedFinding) {
  if (!selectedFinding) {
    return '';
  }

  const label =
    selectedFinding.title ||
    selectedFinding.ruleId ||
    selectedFinding.name ||
    selectedFinding.resourceName ||
    'a finding';

  return 'You selected: ' + label;
}
