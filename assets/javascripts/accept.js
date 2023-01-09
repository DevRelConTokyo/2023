$(async () => {
	const Proposal = ncmb.DataStore('Proposal');
	if ($.url('path') !== '/accept/') {
		return;
	}
	const objectId = $.url('?id');
	if (!objectId) {
		alert('No id found.');
		return;
	}
	try {
		const proposal = await Proposal.fetchById(objectId);
		if (proposal.acceptDate) {
			alert("You're already accepted");
			return;
		}
		Object.keys(proposal).forEach(key => {
			$(`.proposal-${key}`).text(proposal[key]);
		});
		await proposal
			.set('uploaded', true)
			.set('acceptDate', new Date())
			.update();
	} catch (e) {
		alert('Invalid access');
		return;
	}
});
