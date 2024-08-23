```toml
name = 'get-one-user'
method = 'GET'
url = 'http://localhost:3000/user/1'
sortWeight = 4000000
id = '170028f1-405d-467e-9e64-6597bdd3b245'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
