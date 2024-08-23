```toml
name = 'submitScore'
method = 'POST'
url = 'http://localhost:3000/score?gameName=Valo'
sortWeight = 1000000
id = 'f147a88e-4847-419d-8cee-04df613daf78'

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
