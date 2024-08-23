```toml
name = 'get-user-by-email'
method = 'GET'
url = 'http://localhost:3000/user?email=dod@email.com'
sortWeight = 3000000
id = '3ca169fe-637a-48f4-a2e4-7de7a64f63ec'

[[queryParams]]
key = 'email'
value = 'dod@email.com'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDQyODAxOSwiZXhwIjoxNzI0NDI4OTE5fQ.y-o7Z4z3-xkvMOAejEcD_QEtf98IwYktiFVWowDrQSw'

[body]
type = 'JSON'
```
