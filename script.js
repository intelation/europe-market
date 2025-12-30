(function () {
  'use strict';

  /**
   * Switch active tab
   */
  function setTab(activePanelId) {
    const buttons = document.querySelectorAll(".tab-button[role='tab']");
    const panels = document.querySelectorAll(".tab-panel[role='tabpanel']");

    buttons.forEach((btn) => {
      const isActive = btn.getAttribute("aria-controls") === activePanelId;
      btn.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== activePanelId;
    });

    // Update URL with query string
    const tabName = activePanelId.replace('tab-', '');
    const url = new URL(window.location);
    url.searchParams.set('tab', tabName);
    window.history.pushState({}, '', url);
  }

  /**
   * Get active tab from URL or default
   */
  function getActiveTabFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    return tabParam ? `tab-${tabParam}` : 'tab-final';
  }

  /**
   * Main initialization
   */
  function main() {
    // Wire tab buttons
    document.querySelectorAll(".tab-button[role='tab']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetPanel = btn.getAttribute("aria-controls");
        setTab(targetPanel);
      });
    });

    // Set initial tab from URL or default
    const initialTab = getActiveTabFromUrl();
    setTab(initialTab);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
