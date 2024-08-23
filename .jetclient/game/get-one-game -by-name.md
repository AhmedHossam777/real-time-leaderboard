```toml
name = 'get-one-game -by-name'
method = 'GET'
url = 'http://localhost:3000/game?name=valorant'
sortWeight = 7000000
id = '1ad2c8d5-a196-4317-a583-e926cc497956'

[[queryParams]]
key = 'name'
value = 'valorant'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
