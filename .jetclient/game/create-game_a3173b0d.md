```toml
name = 'create-game'
method = 'POST'
url = 'http://localhost:3000/game'
sortWeight = 1000000
id = 'a3173b0d-07f1-4b21-b44c-885c94eb108c'

[auth.bearer]
token = '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNTA5Nzk0OSwiZXhwIjoxNzI1MDk4ODQ5fQ.xHBTl3qdpCfrCtc0gZpUPuJN6j3f7_UWHCRWPkZM5fQ'

[body]
type = 'JSON'
raw = '''
{
  "name": "COD3",
  "description": "a shooter game",
}'''
```
