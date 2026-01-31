// This connects your beautiful table to your Backend server
const problemBody = document.getElementById('problemBody');
const countSpan = document.querySelector('.stats-card span'); // Finds the '0' in your stats card

async function fetchProblems() {
    try {
        // Step 1: Request data from your local server (Port 5000)
        const response = await fetch('http://localhost:3000/all-problems');
        const data = await response.json();

        // Step 2: Update your "Total Solved" counter automatically
        countSpan.innerText = data.length;

        // Step 3: Clear the "Checking for problems..." message
        problemBody.innerHTML = '';

        // Step 4: Add each problem from your database into the table
        data.forEach(prob => {
            const row = `
                <tr>
                    <td>${prob.problemId}</td>
                    <td>${prob.title}</td>
                    <td>${prob.difficulty}</td>
                </tr>
            `;
            problemBody.innerHTML += row;
        });
    } catch (err) {
        console.error("Connection failed!", err);
        problemBody.innerHTML = `<tr><td colspan="3" style="color:red; text-align:center;">
            Server not reached. Make sure your Backend is running!
        </td></tr>`;
    }
}

// Start the fetch process immediately when the page loads
fetchProblems();