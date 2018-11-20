$( document ).ready(function() {
    console.log('log')
    $("#btn").click(
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'test1.php');
			return false; 
		}
	);
});
 
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
        	$('#result_form').html('Имя: '+result.name+'<br>Телефон: '+result.phonenumber);
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('<span style="color:red;font-weight:900;">Ошибка. Данные не отправлены.</span>');
    	}
 	});
}
