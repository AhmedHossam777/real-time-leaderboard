```toml
name = 'submitScore'
method = 'POST'
url = 'http://localhost:3000/score?gameId=2'
sortWeight = 1000000
id = 'd217a49d-25bc-4615-8dd5-15b92d0065e6'

[[queryParams]]
key = 'gameId'
value = '2'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcyNDM2Mzk1MSwiZXhwIjoxNzI0MzY0ODUxfQ.QBfOyl-n0ZHzq1G8FaHccp9uH8MsXTInvzPSFSSXgaI'

[body]
type = 'JSON'
raw = '''
{
  "score": 50
}'''
```
