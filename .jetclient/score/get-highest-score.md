```toml
name = 'get-highest-score'
method = 'GET'
url = 'http://localhost:3000/score?gameName=Valo'
sortWeight = 2000000
id = 'e5a16e86-cdda-4326-90fb-3c05279e3228'

[[queryParams]]
key = 'gameName'
value = 'Valo'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDM3ODYwMiwiZXhwIjoxNzI0Mzc5NTAyfQ.AdqQoo9S6RhWjeY3qE39SpUXA0fJpCAdOiZ0vetov4g'

[body]
type = 'JSON'
raw = '''
{
  "score": 200
}'''
```
