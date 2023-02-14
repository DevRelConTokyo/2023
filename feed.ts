import { parse } from 'rss-to-json';
import fs from 'fs';
import path from 'path';

const current = process.cwd();
// async await
(async () => {
  const rss = await parse('https://zenn.dev/p/devrel/feed');
	rss.items.forEach(a => {
		const d = new Date(a.published);
		a.date = d.toDateString();
		a.day = d.getDate();
		a.month = d.getMonth() + 1;
	});
  const content = JSON.stringify(rss, null, 3);
	fs.writeFileSync(path.resolve(current, '_data/blog.json'), content);
})();