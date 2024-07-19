// script.js
document.querySelectorAll('.button-group button').forEach(button => {
    button.addEventListener('click', function() {
        const questionDiv = this.closest('.question');
        const hiddenInput = questionDiv.querySelector('input[type="hidden"]');
        hiddenInput.value = this.getAttribute('data-value');
    });
});

document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Ottieni il nome e le risposte
    const name = document.getElementById('name').value;
    const costume = parseInt(document.getElementById('costume').value) || 0;
    const superpower = parseInt(document.getElementById('superpower').value) || 0;
    const strangeBehavior = parseInt(document.getElementById('strange-behavior').value) || 0;
    const bizarreActivity = parseInt(document.getElementById('bizarre-activity').value) || 0;

    // Calcola il punteggio totale
    const totalScore = costume + superpower + strangeBehavior + bizarreActivity;

    // Salva il risultato nel localStorage
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name, score: totalScore });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Mostra il risultato e la classifica
    const result = document.getElementById('result');
    result.innerHTML = `Il tuo livello di pazzia è: <strong>${totalScore}%</strong>!<br><br><em>Guarda la classifica qui sotto per vedere come ti sei piazzato.</em>`;

    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = '<h2>Classifica di Pazzia</h2>';
    leaderboard.forEach((entry, index) => {
        leaderboardDiv.innerHTML += `<p>${index + 1}. ${entry.name}: ${entry.score}%</p>`;
    });
});
