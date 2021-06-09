import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder

with open("selfie.jpg", "rb") as selfie_img:
    multipart_data = MultipartEncoder(
        fields={
            "image": ("selfie.jpg", selfie_img, "image/jpeg"),
            "partner_id": "jmlv6b2qtS"
        }
    )

    response = requests.post(
        "https://partner-test.revieve.com/api/3/analyzeImage/?skintone=4&gender=male", data=multipart_data, headers={"Content-Type": multipart_data.content_type})

print(response.json())
