const problemBody = document.getElementById('problemBody');
const countSpan = document.getElementById('count');

async function fetchProblems() {
    try {
        // Fetch data from your Backend
        const response = await fetch('http://localhost:3000/all-problems');
        const data = await response.json();

        // Update the big counter
        countSpan.innerText = data.length;

        // Clear the placeholder
        problemBody.innerHTML = '';

        // Loop through each problem and build the row
        data.forEach(prob => {
            // Convert difficulty to lowercase to match our CSS classes (.easy, .medium, .hard)
            const diffClass = prob.difficulty.toLowerCase();

            const row = `
                <tr>
                    <td style="color: #94a3b8; font-weight: 600;">#${prob.problemId}</td>
                    <td style="font-weight: 500;">${prob.title}</td>
                    <td>
                        <span class="badge ${diffClass}">${prob.difficulty}</span>
                    </td>
                </tr>
            `;
            problemBody.innerHTML += row;
        });
    } catch (err) {
        console.error("Connection failed!", err);
        problemBody.innerHTML = `
            <tr>
                <td colspan="3" style="color: #ef4444; text-align: center; padding: 40px;">
                    ⚠️ Cloud Fridge is offline. Make sure to run 'npx nodemon script.js'
                </td>
            </tr>`;
    }
}

// Fire it up!
fetchProblems();