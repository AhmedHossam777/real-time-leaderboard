```toml
name = 'create-user'
method = 'POST'
url = 'http://localhost:3000/user'
sortWeight = 1000000
id = 'a3173b0d-07f1-4b21-b44c-885c94eb108c'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
