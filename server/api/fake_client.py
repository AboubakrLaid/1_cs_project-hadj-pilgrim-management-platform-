import requests


body = {
    "municipal":406
}
request = requests.post("http://localhost:8000/api/lottery/result", data=body)
print(request)