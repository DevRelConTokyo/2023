const ncmb = new NCMB('fff52c69eb36fcb1ca582fcf4f4c22f5698ca6a75df82296fa45f09c82688403', 'b6dcec84182a84f88c18d882713395c171e1b3b82717411f0b6b004858db8ff2');
const Proposal = ncmb.DataStore('Proposal');
$(async () => {
	const objectId = $.url('?id');
	let proposal;
	if (objectId) {
		proposal = await Proposal.fetchById(objectId);
		const params = {};
		for (const key in proposal) {
			if (typeof proposal[key] === 'function') continue;
			if ([ 'objectId', 'createDate', 'updateDate', 'acl', 'className' ].includes(key)) continue;
			params[key] = proposal[key];
		}
		const form1 = {};
		const form2 = {};
		for (const key in params) {
			if ($(`[name="${key}"]`).data('save') === '1') {
				form1[key] = params[key];
			} else {
				form2[key] = params[key];
			}
		}
		localStorage.setItem('form_1', JSON.stringify(form1));
		localStorage.setItem('form_2', JSON.stringify(form2));
		restore();
	}
	$('#addSpeaker').on('click', () => {
		$('.co-speaker').show();
	});
	$('form#cfp').on('submit', async (e) => {
		e.preventDefault();
		const form = $(e.target);
		const params = form.serializeArray();
		if (!proposal) {
			proposal = new Proposal();
		}
		params.forEach((p) => {
			proposal.set(p.name, p.value);
		});
		proposal.set('uploaded', true);
		proposal.set('conference', 'con');
		if (proposal.objectId) {
			await proposal.update();
		} else {

			await proposal.save();
		}
		const message = proposal.objectId ? 'Update your proposal' : 'Sent proposal successful!';
		localStorage.removeItem('form_2');
		form[0].reset();
		restore();
		$('#result')
			.html(`Thank you so much. ${message}`)
			.addClass('alert-success')
			.show();
	});

	for (const key of [1, 2]) {
		const name = `form_${key}`;
		$(`[data-save="${key}"]`).on('keyup', e => { saveValue(name, e.target.name, $(e.target).val()); });
		$(`[data-save="${key}"]`).on('change', e => { 
			if (e.target.type === 'checkbox' || e.target.type === 'radio') {
				const value = $(`input[name="${e.target.name}"]:checked`).val();
				saveValue(name, e.target.name, value);
			}
		});		
		restore();
	}
});

const saveValue = (storageName, name, value) =>{
	let values = localStorage.getItem(storageName);
	if (!values) {
		values = {};
	} else {
		values = JSON.parse(values);
	}
	values[name] = value;
	localStorage.setItem(storageName, JSON.stringify(values));
};

const restore = () => {
	// 復元
	for (const key of [1, 2]) {
		const name = `form_${key}`;
		let values = localStorage.getItem(name);
		if (!values) continue;
		values = JSON.parse(values);
		for (const key in values) {
			const input = $(`[name="${key}"]`);
			if (key.indexOf('co_') !== -1 && values[key] !== '') {
				$('.co-speaker').show();
			}
			if (input.attr('type') === 'checkbox' || input.attr('type') === 'radio') {
				input.val([values[key]]);
			} else {
				input.val(values[key]);
			}
		}
	}
};
