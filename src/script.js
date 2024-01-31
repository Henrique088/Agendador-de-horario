document.addEventListener('DOMContentLoaded', function () {
    const appointmentsContainer = $('#expandedCalendar');
    const currentDayElement = $('#currentDay');
    let currentDate = new Date();

    // valorInput = document.getElementById('calendario').value;
  

    function renderCalendar(date) {
        appointmentsContainer.empty();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDate = date.toLocaleDateString('pt-BR', options);

    currentDayElement.text(`${formattedDate}`.toUpperCase());

    for (let i = 8; i < 21; i++) {
        const timeSlot = new Date(date);
        timeSlot.setHours(i, 0, 0, 0);

        const appointmentElement = $('<div class="appointment"></div>');
        const buttonElement = $('<button class="timeSlotButton"></button>');
        buttonElement.text(timeSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Adiciona um identificador ou valor de dados ao botão, se necessário
        buttonElement.data('time', timeSlot);

        // Adiciona o botão ao elemento do compromisso
        appointmentElement.append(buttonElement);

        // Adiciona o elemento do compromisso ao contêiner
        appointmentsContainer.append(appointmentElement);

        appointmentElement.addClass('fadeIn');
        appointmentElement.addClass('vermelho');


        if (i != 20 ) {
            const timeSlot2 = new Date(date);
            timeSlot2.setHours(i, 30, 0, 0);

            const appointmentElements = $('<div class="appointment"></div>');
            const buttonElements = $('<button class="timeSlotButton"></button>');
            buttonElements.text(timeSlot2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

            // Adiciona um identificador ou valor de dados ao botão, se necessário
            buttonElements.data('time', timeSlot2);

            // Adiciona o botão ao elemento do compromisso
            appointmentElements.append(buttonElements);

            // Adiciona o elemento do compromisso ao contêiner
            appointmentsContainer.append(appointmentElements);
            ;
            addFadeInClass(appointmentElements);
            appointmentElements.addClass('preto');
            
        }

        
        
    }

    // Adiciona um manipulador de eventos aos botões
    $('.timeSlotButton').on('click', function() {
        // Exemplo de manipulação do clique no botão
        const timeValue = $(this).data('time');
        console.log('Botão clicado para o horário:', timeValue);
    });
        
    }
    
    $(function() {
        $( "#calendario" ).datepicker({
            showOn: "focus",
            showButtonPanel:true,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            minDate: new Date(2024, 1 - 1, 1),
            onSelect: function(dateText, inst) {
                currentDate = $(this).datepicker('getDate');
                renderCalendar(currentDate);
            }

        });
    });
    renderCalendar(currentDate);
    // Adicionar manipuladores de eventos para navegação entre os dias
    $('#prevDay').on('click', function () {
        currentDate.setDate(currentDate.getDate() - 1);
        renderCalendar(currentDate);
        

    });

    $('#nextDay').on('click', function () {
        console.log('Valor do Input2:',currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
        renderCalendar(currentDate);
    });

    $('#botao').on('click', function () {
        // Obter o valor do input
        const currentDayElement = $('#currentDay');
        var valorInput = document.getElementById('calendario').value;
        valorInput = inverterData(valorInput);
        valorInput = new Date(valorInput);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            
            // Obtém a data formatada em português
            const formattedDate = valorInput.toLocaleDateString('pt-BR', options);
        
            // Extraindo o nome do dia da semana
            console.log('Valor do Input2:',valorInput);
            console.log('Valor do Input:',formattedDate);
            console.log('Valor do Input:',currentDate);
        
            // Atualiza a exibição da data para incluir o nome do dia da semana em português
            if(formattedDate != "Invalid Date"){
                currentDayElement.text(`${formattedDate}`.toUpperCase());
                currentDate = valorInput;
                renderCalendar(valorInput);
                    
            }
            
   });
});

function inverterData(data) {
    // Dividir a string em partes usando '/'
    var partes = data.split('/');

    // Inverter o dia e o mês
    var dataInvertida = partes[1] + '/' + partes[0] + '/' + partes[2];

    return dataInvertida;
}

function addFadeInClass(element) {
    setTimeout(() => {
        element.addClass('fadeIn');
    }, 50);
}