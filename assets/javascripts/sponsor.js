$(() => {
	const category = $.url('?category');
	if (category) {
		$('[name="category"]').val([category]);
	}
	$('form#sponsor').on('submit', async e => {
		e.preventDefault();
		const form = $(e.target);
		const params = {};
		form.serializeArray().forEach(values =>  params[values.name] = values.value);
		// SendGrindでメール送信
		const scriptName = params.category === 'download' ? 'sendDownloadMailCon.js' : 'sendMailSponsorCon.js';
		const res = await ncmb.Script
      .data(params)
      .exec("POST", scriptName);
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