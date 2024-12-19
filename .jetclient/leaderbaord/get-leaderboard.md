```toml
name = 'get-leaderboard'
method = 'GET'
url = 'http://localhost:3000/leaderboard/game?gameName=FIFA'
sortWeight = 3000000
id = '21573d7c-d7d2-4a27-8a94-e9d657dea853'

[[queryParams]]
key = 'gameName'
value = 'FIFA'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDM3ODYwMiwiZXhwIjoxNzI0Mzc5NTAyfQ.AdqQoo9S6RhWjeY3qE39SpUXA0fJpCAdOiZ0vetov4g'

[body]
type = 'JSON'
raw = '''
{
  "score": 200
}'''
```
