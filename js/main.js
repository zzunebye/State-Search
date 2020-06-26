const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');
/* -------------------------------------------------------------------------- */
/*                      Search states.json and filter it                      */
/* -------------------------------------------------------------------------- */

// we use fetch API which returns a promise, so we better label the fx with async
const searchStates = async searchText => {
  const res = await fetch('data/states.json');
  const states = await res.json();

  let matches = states.filter(state => { // Get matches to current text input
    const regex = new RegExp(`^${searchText}`, 'gi'); // ('starts with searchText', flag: gi = case-insensitive)
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
}

/* -------------------------------------------------------------------------- */
/*                               Display result                               */
/* -------------------------------------------------------------------------- */

// Show results in HTML
const outputHtml = matches => { // take in matches
  if (matches.length > 0) { // map: array => array
    const html = matches.map(match => `  
      <div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
      </div>
      `).join(''); // map이 반환하는 배열을 join으로 하나의 문자열로 바꿔준다.
    console.log(html);
    matchList.innerHTML = html;
  }
}

search.addEventListener('input', () => searchStates(search.value)); // passing actual value into the func