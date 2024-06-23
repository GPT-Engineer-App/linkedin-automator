(async function() {
  const $ = window.jQuery;

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function connectWithProfiles() {
    const profiles = $(".search-result__info a");
    for (let i = 0; i < profiles.length; i++) {
      const profile = profiles[i];
      $(profile).click();
      await delay(2000); // Wait for profile to load
      const connectButton = $("button:contains('Connect')");
      if (connectButton.length) {
        connectButton.click();
        await delay(1000);
        const sendButton = $("button:contains('Send')");
        if (sendButton.length) {
          sendButton.click();
        }
      }
      window.history.back();
      await delay(2000); // Wait for navigation
    }
  }

  await connectWithProfiles();
})();