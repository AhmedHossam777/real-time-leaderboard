```toml
name = 'create-game'
method = 'POST'
url = 'http://localhost:3000/game'
sortWeight = 1000000
id = 'a3173b0d-07f1-4b21-b44c-885c94eb108c'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTcyNTA5ODU3NCwiZXhwIjoxNzI1MDk5NDc0fQ.s1HFO1hYnvShxN2sIGfQy9-U357R6OxcwmiGONczvzM'

[body]
type = 'JSON'
raw = '''
{
  "name": "COD3",
  "description": "a shooter game",
}'''
```
