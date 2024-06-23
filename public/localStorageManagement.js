document.addEventListener('DOMContentLoaded', () => {
  const profileList = document.getElementById('profileList');
  const profileInput = document.getElementById('profileInput');
  const addProfileButton = document.getElementById('addProfileButton');

  function getVisitedProfiles() {
    const visited = localStorage.getItem('visitedProfiles');
    return visited ? JSON.parse(visited) : [];
  }

  function setVisitedProfiles(profiles) {
    localStorage.setItem('visitedProfiles', JSON.stringify(profiles));
  }

  function renderProfiles() {
    profileList.innerHTML = '';
    const profiles = getVisitedProfiles();
    profiles.forEach((profile, index) => {
      const li = document.createElement('li');
      li.textContent = profile;
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        profiles.splice(index, 1);
        setVisitedProfiles(profiles);
        renderProfiles();
      });
      li.appendChild(removeButton);
      profileList.appendChild(li);
    });
  }

  addProfileButton.addEventListener('click', () => {
    const profileUrl = profileInput.value.trim();
    if (profileUrl) {
      const profiles = getVisitedProfiles();
      profiles.push(profileUrl);
      setVisitedProfiles(profiles);
      profileInput.value = '';
      renderProfiles();
    }
  });

  renderProfiles();
});