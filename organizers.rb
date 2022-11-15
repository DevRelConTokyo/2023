require('json')
json = JSON.parse(open('./_data/organizers.json').read)

json.each do |organizer|
	next if organizer['type'] == 'group'
	title = ''
	if organizer['comapny_ja'] != ''
		title = "#{organizer['name_ja']}@#{organizer['company_ja']}"
	else
		title = organizer['name_ja']
	end
	
  content = <<-EOS
---
layout: person
permalink: /organizers/#{organizer['id']}/
title: #{title}
ogp: /assets/image/ogp/#{organizer['id']}.jpg
type: organizer
id: #{organizer['id']}
---
#{organizer['profile_ja']}
  EOS
  f = open("./organizers/#{organizer['id']}.md", 'w')
  f.write(content)
  f.close
end
