// JavaScript do Projeto EcoSync

const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

fetch('../assets/js/states-cities.json')
    .then(response => response.json())
    .then(data => {
        // Ordena os estados por nome (A-Z)
        const sortedStates = data.states.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        // Preenche o select de estados
        sortedStates.forEach(state => {
            const option = document.createElement("option");
            option.value = state.code;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });

    // Quando o estado muda, atualiza as cidades
    stateSelect.addEventListener("change", () => {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';

        const stateData = data.states.find(state => state.code === selectedState);
        if (stateData) {
            // Também ordena as cidades por nome
            const sortedCities = stateData.topCities.sort((a, b) => a.localeCompare(b));
            sortedCities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
})
.catch(error => {
    console.error("Erro ao carregar o JSON:", error);
});