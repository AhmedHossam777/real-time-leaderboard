```toml
name = 'get-top-player-report'
method = 'GET'
url = 'http://localhost:3000/score/top-players?gameId=2&startDate=2024-08-01&endDate=2024-08-30&limit=10'
sortWeight = 3000000
id = '82d0db7f-34eb-49b8-bfcf-e49c8324b21f'

[[queryParams]]
key = 'gameId'
value = '2'

[[queryParams]]
key = 'startDate'
value = '2024-08-01'

[[queryParams]]
key = 'endDate'
value = '2024-08-30'

[[queryParams]]
key = 'limit'
value = '10'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDQ3MTk1NywiZXhwIjoxNzI0NDcyODU3fQ.ro2gtH8mD-l0BvB-M3-qolvIzSgUstK8tHB92bkod0I'
```
