require('json')
require('date')
require('uri')
json = JSON.parse(open('./_data/speakers.json').read)
sessions = JSON.parse(open('./_data/sessions.json').read)

json.each do |speaker|
	next if speaker['conference'] == 'japan'
	
	session = sessions.find {|session| speaker['id'] == session['first_speaker']}
	unless session
		session = sessions.find {|session| speaker['id'] == session['second_speaker']}
	end
	start_date = DateTime.parse(session['start_datetime']).strftime("%Y%m%dT%H%M%S")
	end_date = DateTime.parse(session['end_datetime']).strftime("%Y%m%dT%H%M%S")
	location = "〒220-0004 Kanagawa, Yokohama, Nishi Ward, Kitasaiwai, 2 Chome−5−15 プレミア横浜西口ビル 4F"
	gcal_en = "https://www.google.com/calendar/render?action=TEMPLATE&text=#{URI.encode_www_form_component(session["title_en"])}&dates=#{start_date}/#{end_date}&location=#{URI.encode_www_form_component(location)}&trp=true&details=#{URI.encode_www_form_component("https://yokohama-2023.devrelcon.dev/speakers/#{speaker["id"]}/")}&trp=undefined&trp=true&sprop="
	gcal_ja = "https://www.google.com/calendar/render?action=TEMPLATE&text=#{URI.encode_www_form_component(session["title_ja"])}&dates=#{start_date}/#{end_date}&location=#{URI.encode_www_form_component(location)}&trp=true&details=#{URI.encode_www_form_component("https://yokohama-2023.devrelcon.dev/speakers/#{speaker["id"]}/")}&trp=undefined&trp=true&sprop="

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
gcal:
    en: "#{gcal_en}"
    ja: "#{gcal_ja}"
---
  EOS
  f = open("./speakers/#{speaker['id']}.md", 'w')
  f.write(content)
  f.close
end
