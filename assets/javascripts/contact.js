const ncmb = new NCMB('fff52c69eb36fcb1ca582fcf4f4c22f5698ca6a75df82296fa45f09c82688403', 'b6dcec84182a84f88c18d882713395c171e1b3b82717411f0b6b004858db8ff2');
$(() => {
	const category = $.url('?category');
	if (category) {
		$('[name="category"]').val([category]);
	}
	$('form#contact').on('submit', async e => {
		e.preventDefault();
		const form = $(e.target);
		const params = {};
		form.serializeArray().forEach(values =>  params[values.name] = values.value);
		// SendGrindでメール送信
		console.log(params);
		const res = await ncmb.Script
      .data(params)
      .exec("POST", "sendMailCon.js");
		if (res.body === '{}') {
			$('#result')
				.html(`Thank you for your inquiry. Please wait for our reply.`)
				.addClass('alert-success')
				.show();
		} else {
			$('#result')
				.html(`An error has occurred. Please wait a moment and contact us again.`)
				.addClass('alert-error')
				.show();
		}
		$(e.target)[0].reset();
	});
});