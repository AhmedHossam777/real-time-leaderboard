```toml
name = 'signup'
method = 'POST'
url = 'http://localhost:3000/auth/signup'
sortWeight = 1000000
id = '257652ae-a0c7-4e4c-b331-bd7346b49298'

[body]
type = 'JSON'
raw = '''
{
  "username": "admin",
  "email": "admin@email.com",
  "password": "admin",
}'''
```
