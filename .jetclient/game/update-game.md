```toml
name = 'update-game'
method = 'PATCH'
url = 'http://localhost:3000/game/5'
sortWeight = 5000000
id = 'bf72e51e-992c-4db0-a12b-f0ca5789b669'

[body]
type = 'JSON'
raw = '''
{
  "description": "sick game"
}'''
```
