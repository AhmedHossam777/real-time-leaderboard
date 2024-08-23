```toml
name = 'get-one-user'
method = 'GET'
url = 'http://localhost:3000/user/4'
sortWeight = 4000000
id = '170028f1-405d-467e-9e64-6597bdd3b245'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNDM4NzI1NywiZXhwIjoxNzI0Mzg4MTU3fQ.2JWda90zHkiePvItOSHH9-Eh1-eF0_0IaB3hFZGeUMQ'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
