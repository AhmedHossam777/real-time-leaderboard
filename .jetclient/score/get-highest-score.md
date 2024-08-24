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
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDQ4NjI5MywiZXhwIjoxNzI0NDg3MTkzfQ.GlR905A9BJKYOTPL7pkkULkVYrq1J3dMyVjet4CwHz0'

[body]
type = 'JSON'
raw = '''
{
  "score": 200
}'''
```
