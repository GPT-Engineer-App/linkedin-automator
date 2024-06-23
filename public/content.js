(async function() {
  // Inject jQuery if not already present
  if (!window.jQuery) {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.appendChild(script);
    await new Promise(resolve => script.onload = resolve);
  }
  const $ = window.jQuery;

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getVisitedProfiles() {
    const visited = localStorage.getItem('visitedProfiles');
    return visited ? JSON.parse(visited) : [];
  }

  function addVisitedProfile(profileUrl) {
    const visited = getVisitedProfiles();
    visited.push(profileUrl);
    localStorage.setItem('visitedProfiles', JSON.stringify(visited));
  }

  async function connectWithProfiles() {
    const profiles = $(".search-result__info a");
    const visitedProfiles = getVisitedProfiles();

    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      const profileUrl = $(profile).attr('href');

      if (visitedProfiles.includes(profileUrl)) {
        console.log(`Skipping already visited profile: ${profileUrl}`);
        continue;
      }

      $(profile).click();
      await delay(2000 + Math.random() * 2000); // Wait for profile to load with random delay
      const connectButton = $("button:contains('Connect')");
      if (connectButton.length) {
        connectButton.click();
        await delay(1000 + Math.random() * 1000); // Random delay
        const sendButton = $("button:contains('Send')");
        if (sendButton.length) {
          sendButton.click();
        }
      }
      addVisitedProfile(profileUrl);
      window.history.back();
      await delay(2000 + Math.random() * 2000); // Wait for navigation with random delay
    }
  }

  await connectWithProfiles();
})();