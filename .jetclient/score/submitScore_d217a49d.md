```toml
name = 'submitScore'
method = 'POST'
url = 'http://localhost:3000/score?gameName=Valo'
sortWeight = 1000000
id = 'd217a49d-25bc-4615-8dd5-15b92d0065e6'

[[queryParams]]
key = 'gameName'
value = 'Valo'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDM3NzU5MSwiZXhwIjoxNzI0Mzc4NDkxfQ.DVQJjCV1pqDlRzbDYuwnvGx7oD7zadFIp94yUihVTXY'

[body]
type = 'JSON'
raw = '''
{
  "score": 200
}'''
```
