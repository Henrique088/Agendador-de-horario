document.addEventListener('DOMContentLoaded', function () {
    const appointmentsContainer = $('#expandedCalendar');
    const currentDayElement = $('#currentDay');
    let currentDate = new Date();
    // valorInput = document.getElementById('calendario').value;
  

    function renderCalendar(date) {
        appointmentsContainer.empty();
    
        // Configuração para obter nomes de dias da semana em português
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // Obtém a data formatada em português
        const formattedDate = date.toLocaleDateString('pt-BR', options);
    
        // Extraindo o nome do dia da semana
        
    
        // Atualiza a exibição da data para incluir o nome do dia da semana em português
        currentDayElement.text(`${formattedDate}`.toUpperCase());
        
        
        for (let i = 8; i < 21; i++) {
            const timeSlot = new Date(date);
            timeSlot.setHours(i, 0, 0, 0);
    
            const appointmentElement = $('<div class="appointment"></div>');
            appointmentElement.html(`<p>${timeSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>`);
            appointmentsContainer.append(appointmentElement);

            appointmentElement.addClass('fadeIn');

            if (i != 20){
                const timeSlot2 = new Date(date);
                timeSlot2.setHours(i, 30, 0, 0);
                
                const appointmentElements = $('<div class="appointment"></div>');
                appointmentElements.html(`<p>${timeSlot2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>`);
                appointmentsContainer.append(appointmentElements);

                setTimeout(() => {
                    appointmentElements.addClass('fadeIn');
                }, 0);
            }
                

            
        }
        
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