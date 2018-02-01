$('#register').on('submit',function(event) {
    event.preventDefault();
    var formData={
    	'name'                 :$('#register #name').val(),
		'username'             :$('#register #username').val(),
		'password'             :$('#register #password').val(),
		'passwordConfirmation' :$('#register #passwordConfirmation').val(),
		'age'                  :$('#register #age').val(),
		'email'                :$('#register #email').val(),
		'birthdate'            :$('#register #birthdate').val(),
		'sex'                  :$('#register #sex').val(),
    }
    $.ajax({
      	url: '/',
      	type: 'POST',
      	data: JSON.stringify(formData),
      	contentType: 'application/json',
      	success: function(result) {
      		if(result.status == 200){
      			// console.log(JSON.stringify(result.data));
        		$('#registerSuccess' ).fadeIn( 3000 ).delay( 3000 ).fadeOut( 3000 )
        		$('#register #name').val('')
				$('#register #username').val('')
				$('#register #password').val('')
				$('#register #passwordConfirmation').val('')
				$('#register #age').val('')
				$('#register #email').val('')
				$('#register #birthdate').val('')
				$('#register #sex').val('')
        	}        	
    	},
    	error: function(result) {
    		if(result.status == 500){
    			$('#registerError' ).fadeIn( 3000 ).delay( 3000 ).fadeOut( 3000 )
    			console.log('error')
        	}
        }
    });
});