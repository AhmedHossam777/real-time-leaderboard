```toml
name = 'refresh-token'
method = 'POST'
url = 'http://localhost:3000/auth/refreshToken'
sortWeight = 4000000
id = '0e0f5046-df25-416f-99c0-5fcd9d98d8d7'

[body]
type = 'JSON'
raw = '''
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNDM0NDU1MSwiZXhwIjoxNzI0OTQ5MzUxfQ.uOmQ2IcAXGnTL0RW4aOkYqRxR2APG4TioLamz4JJ4lE"
}'''
```
