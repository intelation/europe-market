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
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
