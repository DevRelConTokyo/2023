const Proposal = ncmb.DataStore('Proposal');
const objectId = $.url('?id');

$(async () => {
	if ($.url('path') !== '/accept/') {
		return;
	}
	if (!objectId) {
		alert('No id found.');
		return;
	}
	const proposal = await Proposal.fetchById(objectId);
	Object.keys(proposal).forEach(key => {
		$(`.proposal-${key}`).text(proposal[key]);
	});
	$('form#accept').on('submit', async (e) => {
		e.preventDefault();
		if (proposal.acceptDate) {
			alert('Already accepted.');
			return;
		}
		if (proposal.rejected) {
			alert("You're already rejected.");
			return;
		}
		const file = $('#picture')[0].files[0];
		const fileName = `${proposal.objectId}-${file.name}.jpg`;
		await ncmb.File.upload(fileName, file);
		proposal.set('picture', fileName);
		proposal.set('acceptDate', new Date());
		await proposal
			.set('uploaded', true)
			.update();
		$('.result').show();
		e.target.reset();
	});
});

$(async () => {
	if ($.url('path') !== '/reject/') {
		return;
	}
	if (!objectId) {
		alert('No id found.');
		return;
	}
	const proposal = await Proposal.fetchById(objectId);
	Object.keys(proposal).forEach(key => {
		$(`.proposal-${key}`).text(proposal[key]);
	});
	$('form#reject').on('submit', async (e) => {
		e.preventDefault();
		if (!confirm("Are you sure you want to reject this proposal?")) {
			return;
		}
		if (proposal.acceptDate) {
			alert("You're already accepted.");
			return;
		}
		await proposal
			.set('uploaded', true)
			.set('rejected', true)
			.update();
		$('.result').show();
	});
});
