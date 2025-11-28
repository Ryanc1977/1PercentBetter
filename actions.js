/* actions.js — Default 1% Daily Actions for 1% Better */

/**
 * Load initial action list.
 * You will be able to add more later.
 */
function loadActions() {
  return [
    // Health
    { id: "h1", area: "Health", title: "2-min cold exposure", subtitle: "Morning reset" },
    { id: "h2", area: "Health", title: "3 rounds deep breath", subtitle: "Wim Hof style" },
    
    // Fitness
    { id: "f1", area: "Fitness", title: "5-min mobility", subtitle: "Loosen up" },
    { id: "f2", area: "Fitness", title: "20 push-ups or 5-min walk", subtitle: "Quick movement" },

    // Mindset / Spiritual
    { id: "s1", area: "Spiritual", title: "10-min meditation", subtitle: "Presence practice" },
    { id: "s2", area: "Spiritual", title: "Write 1 thing you're grateful for", subtitle: "Heart opener" },

    // Family
    { id: "fa1", area: "Family", title: "1 meaningful check-in", subtitle: "Quality connection" },

    // Career / Mission
    { id: "c1", area: "Career", title: "1 message for an opportunity", subtitle: "Momentum + networking" },
  ];
}
