// Fetch the JSON data and render the content
fetch('tokData.json')
    .then(response => response.json())
    .then(data => renderTOKContent(data))
    .catch(error => console.error('Error loading JSON data:', error));

// Function to render the TOK content
function renderTOKContent(data) {
    const container = document.getElementById('tok-content');

    // Combine Areas of Knowledge and Optional Themes
    const sections = [...data.aoks, ...data.optionalThemes];

    sections.forEach(section => {
        // Create collapsible button for the section
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'collapsible';
        button.textContent = `${section.name}${data.aoks.includes(section) ? '' : ' (Optional Theme)'}`;
        container.appendChild(button);

        // Create collapsible content div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';

        // Determine the number of tables needed (2 tables with 6 columns each for 12 concepts)
        const concepts = section.concepts;
        const tableCount = Math.ceil(concepts.length / 6);

        for (let t = 0; t < tableCount; t++) {
            // Create a table
            const table = document.createElement('table');

            // Create table header
            const headerRow = document.createElement('tr');
            const currentConcepts = concepts.slice(t * 6, (t + 1) * 6);
            currentConcepts.forEach((concept, index) => {
                const th = document.createElement('th');
                th.style.backgroundColor = getColumnColor(t * 6 + index + 1);
                th.textContent = concept.title;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            // Create table data row
            const dataRow = document.createElement('tr');
            currentConcepts.forEach((concept, index) => {
                const td = document.createElement('td');
                td.className = `column${t * 6 + index + 1}`;

                // Create 'Conceived' collapsible
                const conceivedButton = document.createElement('button');
                conceivedButton.type = 'button';
                conceivedButton.className = 'collapsible';
                conceivedButton.textContent = 'Conceived';
                td.appendChild(conceivedButton);

                const conceivedContent = document.createElement('div');
                conceivedContent.className = 'content';
                conceivedContent.innerHTML = `<p>${concept.description.Conceived}</p>`;
                td.appendChild(conceivedContent);

                // Create 'Perceived' collapsible
                const perceivedButton = document.createElement('button');
                perceivedButton.type = 'button';
                perceivedButton.className = 'collapsible';
                perceivedButton.textContent = 'Perceived';
                td.appendChild(perceivedButton);

                const perceivedContent = document.createElement('div');
                perceivedContent.className = 'content';
                perceivedContent.innerHTML = `<p>${concept.description.Perceived}</p>`;
                td.appendChild(perceivedContent);

                // Create 'Used' collapsible
                const usedButton = document.createElement('button');
                usedButton.type = 'button';
                usedButton.className = 'collapsible';
                usedButton.textContent = 'Used';
                td.appendChild(usedButton);

                const usedContent = document.createElement('div');
                usedContent.className = 'content';
                usedContent.innerHTML = `<p>${concept.description.Used}</p>`;
                td.appendChild(usedContent);

                dataRow.appendChild(td);
            });
            table.appendChild(dataRow);
            contentDiv.appendChild(table);
        }

        container.appendChild(contentDiv);
    });

    // Add event listeners for collapsible buttons
    addCollapsibleListeners();
}

// Function to get the column color based on column number
function getColumnColor(columnNumber) {
    const colors = {
        1: '#f2dede',
        2: '#d9edf7',
        3: '#dff0d8',
        4: '#fcf8e3',
        5: '#f5f5f5',
        6: '#d9edf7',
        7: '#ffe6cc',
        8: '#e6f7ff',
        9: '#e6ffe6',
        10: '#fff0e6',
        11: '#f9f9f9',
        12: '#ffe6cc',
        13: '#e6ccff',
        14: '#ccffe6',
        15: '#ffcc99',
        16: '#99ccff',
        17: '#ccffcc',
        18: '#ffccff'
        // Add more if needed
    };
    return colors[columnNumber] || '#ffffff';
}

// Function to add event listeners to all collapsible buttons
function addCollapsibleListeners() {
    const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}
