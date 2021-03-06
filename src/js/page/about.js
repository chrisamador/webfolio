define(['utls','sls'],function (u_,sls) {
	return function(){

		$form = $('#contact-form'),
		$message = $('.form__message');

		$form.on('submit', function(e) {
			e.preventDefault();

			var rawData = {
				name : (document.getElementById('name')),
			 	email : (document.getElementById('email')),
			 	thoughts :  (document.getElementById('thoughts'))
			},pass = [],submit = false;

			function validate(ele) {
				if(ele.value.length == 0){
					u_(ele).addClass('alert alert-danger');
					pass.push(false);
				}else{
					u_(ele).removeClass('alert alert-danger');
					pass.push(true);
				}
			}

			for (var key in rawData) {
				validate(rawData[key]);
			}

			if(pass.toString().indexOf('false') < 0){
				sls.add();

				var data = {
						name : rawData.name.value,
						email : rawData.email.value,
						thoughts: rawData.thoughts.value
				};

				// Username: key-1
				// Password: _BTyP7EQAQT3oeAI_z0K

				// $.ajax({
				// 	contentType: 'application/json;charset=UTF-8',
				// 	headers: {
				//     "Authorization": "Basic " + btoa("EMpxysyh2oBzyrKf11K3" + ":" + "ttdyJ6Tc4ZAfWqyzGncqxvgxfzFjSyFxALGkG3SU")
				//   },
				// 	url: 'https://sheetsu.com/apis/v1.0/923e7439fcc0',
				// 	data: cleanData,
				// 	dataType: 'json',
				// 	type: 'POST',

				// 	success: function(data) {
				// 		for (var key in rawData) {
				// 			rawData[key].value = "";
				// 		}
				// 		$message.text('Thank you, your message has been received');
				// 		sls.remove();
				// 	},

				// 	error: function(data) {
				// 		$message.text('An error happen, please email directly: hello@chrisamador.me or try again.');
				// 		sls.remove();
				// 	}
				// });


				$.ajax({
					method: 'POST',
					url: 'https://api.fieldbook.com/v1/585034af66b9c80300b46250/contact_form',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa('key-1' + ':' + '_BTyP7EQAQT3oeAI_z0K')
					},
					data: JSON.stringify(data),
					success: function (response) {
						console.log(response);
						$message.text('Thank you, your message has been received');
						sls.remove();
				  	},
					error: function (error) {
						$message.text('An error happen, please email directly: hello@chrisamador.me or try again.');
						sls.remove();
				  }
				});



			}else{
				console.log('sorry no');
			}



		});
	}
});
