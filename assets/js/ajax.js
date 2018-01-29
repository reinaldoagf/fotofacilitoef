$('#register').on('submit',function(event) {
    event.preventDefault();
    var formData={
    	'email':$('#register #email').val(),
    	'password':$('#register #password').val(),
    	'passwordConfimation':$('#register #passwordConfimation').val(),
    }
    
    $.ajax({
      	url: '/',
      	type: 'POST',
      	data: JSON.stringify(formData),
      	contentType: 'application/json',
      	success: function(data) {
        	console.log(JSON.stringify(data));
        	$( '#registerSuccess' ).fadeIn( 3000 ).delay( 3000 ).fadeOut( 3000 )
        	$('#register #email').val('')
			$('#register #password').val('')
			$('#register #passwordConfimation').val('')
    	}
    });
});