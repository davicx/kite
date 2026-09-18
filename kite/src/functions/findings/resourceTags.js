/**
 * Normalize resource tags from Navigator rows (array) or Atlas dicts.
 */

export function normalizeResourceTags(tags) {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => {
        const key = tag && (tag.key != null ? tag.key : tag.Key);
        const value = tag && (tag.value != null ? tag.value : tag.Value);
        if (key == null || String(key).trim() === '') {
          return null;
        }
        return {
          key: String(key),
          value: value == null ? '' : String(value),
        };
      })
      .filter(Boolean);
  }

  if (tags && typeof tags === 'object') {
    return Object.keys(tags).map((key) => ({
      key,
      value: tags[key] == null ? '' : String(tags[key]),
    }));
  }

  return [];
}
