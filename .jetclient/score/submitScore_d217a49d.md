```toml
name = 'submitScore'
method = 'POST'
url = 'http://localhost:3000/score?gameName=FIFA'
sortWeight = 1000000
id = 'd217a49d-25bc-4615-8dd5-15b92d0065e6'

[[queryParams]]
key = 'gameName'
value = 'FIFA'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNDM4NTg1MCwiZXhwIjoxNzI0Mzg2NzUwfQ.lVmCplIEsIBw5UU5D-9GebO114KOqQu9s769GISAcKs'

[body]
type = 'JSON'
raw = '''
{
  "score": 1200
}'''
```
