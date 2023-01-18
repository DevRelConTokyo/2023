require('json')
json = JSON.parse(open('./_data/speakers.json').read)

json.each do |speaker|
	next if speaker['conference'] == 'japan'
	title_ja = ''
	title_en = ''
	if speaker['company_ja'] != ''
		title_ja = "#{speaker['name_ja']}@#{speaker['company_ja']}"
		title_en = "#{speaker['name_en']}@#{speaker['company_en']}"
	else
		title_ja = speaker['name_ja']
		title_en = speaker['name_en']
	end
	title_ja = title_ja.gsub(/"/, '\"')
	title_en = title_en.gsub(/"/, '\"')
  content = <<-EOS
---
layout: person
permalink: "/speakers/#{speaker['id']}/"
title: "#{title_en}"
ogp: "/assets/images/ogp/#{speaker['id']}.jpg"
type: speaker
id: "#{speaker['id']}"
---
  EOS
  f = open("./speakers/#{speaker['id']}.md", 'w')
  f.write(content)
  f.close
end
