document.addEventListener('DOMContentLoaded', function () {
  // Inicializa Choices para todos os selects com a classe .choices
  const stateSelect = new Choices('#state', {
    searchEnabled: true,
    placeholder: false,
    placeholderValue: '', 
    itemSelectText: '',   
  });

  const citySelect = new Choices('#city', {
    searchEnabled: true,
    placeholder: false,
    placeholderValue: '',
    itemSelectText: '',
  });

  const countSelect = new Choices('#count__day', {
  placeholder: true,
  itemSelectText: '',
});

// Cria opções de 1 a 7
const countOptions = Array.from({ length: 7 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}`,
}));

countSelect.setChoices(countOptions, 'value', 'label', false);


  // Carregar estados e cidades
  fetch('../assets/js/states-cities.json')
    .then(res => res.json())
    .then(data => {
        const states = data.states.sort((a, b) => a.name.localeCompare(b.name));
        states.forEach(state => {
        stateSelect.setChoices(
            [{ value: state.code, label: state.name, selected: false, disabled: false }],
            'value',
            'label',
            false
    );
    });

    document.getElementById('state').addEventListener('change', function (e) {
        const selectedStateCode = e.target.value;
        const selectedState = data.states.find(s => s.code === selectedStateCode);

        if (selectedState) {
            citySelect.clearChoices();

            // Adiciona "Selecione a Cidade" como a primeira opção
            citySelect.setChoices([
            { value: '', label: 'Selecione a Cidade', selected: true, disabled: false },
            ...selectedState.topCities.map(city => ({ value: city, label: city }))
            ], 'value', 'label', false);
        }
    });
    })
    .catch(err => console.error('Erro ao carregar estados:', err));
});
