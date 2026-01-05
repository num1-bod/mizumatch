document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('fundingChart').getContext('2d');

    const goal = 120;
    const raised = 104;
    const remaining = goal - raised;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['支援済', '未達'],
            datasets: [{
                data: [raised, remaining],
                backgroundColor: ['#4fc3f7', '#e0e0e0'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            cutout: '70%',
        }
    });
});
