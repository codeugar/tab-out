(function (root) {
  function getSavedTabDomain(tab) {
    try {
      return new URL(tab.url).hostname.replace(/^www\./, '');
    } catch {
      return 'unknown';
    }
  }

  function groupSavedTabsByDomain(tabs) {
    const groupsByDomain = new Map();

    for (const tab of tabs) {
      const domain = getSavedTabDomain(tab);
      if (!groupsByDomain.has(domain)) {
        groupsByDomain.set(domain, { domain, tabs: [] });
      }
      groupsByDomain.get(domain).tabs.push(tab);
    }

    return [...groupsByDomain.values()]
      .map(group => ({
        ...group,
        tabs: [...group.tabs].sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0)),
      }))
      .sort((a, b) => {
        const aLatest = new Date(a.tabs[0]?.savedAt || 0);
        const bLatest = new Date(b.tabs[0]?.savedAt || 0);
        return bLatest - aLatest;
      });
  }

  const api = { getSavedTabDomain, groupSavedTabsByDomain };

  root.TabOutSavedTabs = api;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
