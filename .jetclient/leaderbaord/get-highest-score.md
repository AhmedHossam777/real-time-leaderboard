```toml
name = 'get-highest-score'
method = 'GET'
url = 'http://localhost:3000/score?gameName=Valo'
sortWeight = 2000000
id = 'b360f2d1-7d53-44af-8a8a-a6e5aab4c271'

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
