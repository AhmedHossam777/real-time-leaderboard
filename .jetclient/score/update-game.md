```toml
name = 'update-game'
method = 'PATCH'
url = 'http://localhost:3000/game/1'
sortWeight = 5000000
id = '4a14a0ac-3a79-4e20-aaeb-decbbd6d6bd0'

[body]
type = 'JSON'
raw = '''
{
  "name": "valorant",
  "description": "online shooter game"
}'''
```
