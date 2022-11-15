#!bin/bash
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=organizers -O _data/organizers.json
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=sessions -O _data/sessions.json
wget https://script.google.com/macros/s/$DEVREL_GOOGLE_ID/exec?name=speakers -O _data/speakers.json

ruby organizers.rb
