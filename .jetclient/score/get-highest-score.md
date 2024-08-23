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
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDQyODYyNSwiZXhwIjoxNzI0NDI5NTI1fQ.LtpVxzc-eJcBy76GqycI8AjKqVYZBvtv4dR-9mN8-Us'

[body]
type = 'JSON'
raw = '''
{
  "score": 200
}'''
```
