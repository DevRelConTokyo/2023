require('json')
require('date')
require('uri')
speakers_json = JSON.parse(open('./_data/speakers.json').read)
sessions = JSON.parse(open('./_data/sessions.json').read)

result = {}
sessions.each do |session|
	next unless session['conference'] == 'con'
	speakers = []
	if session['first_speaker'] != ''
		speakers << speakers_json.find {|speaker| session['first_speaker'] == speaker['id']}
	end
	if session['second_speaker'] != ''
		speakers << speakers_json.find {|speaker| session['second_speaker'] == speaker['id']}
	end
	session['speakers'] = speakers
	day = session['day']
	start_date = session['start_time']
	result[day] = {} unless result[day]
	result[day][start_date] = [] unless result[day][start_date]
	result[day][start_date] << session
end

f = open('./_data/sessions_by_day.json', 'w')
f.write(JSON.pretty_generate(result))
f.close
