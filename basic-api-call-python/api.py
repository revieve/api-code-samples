from requests_toolbelt.multipart.encoder import MultipartEncoder
import requests

with open("selfie.jpg", "rb") as selfie_img:
    m = MultipartEncoder(
        fields={
            "image": ("selfie.jpg", selfie_img, "image/jpeg"),
            "partner_id": "jmlv6b2qtS",
            "gender": "female",
            "skintone": "1"
        }
    )

    response = requests.post(
        "https://partner-test.revieve.com/api/3/analyzeImage/", data=m, headers={"Content-Type": m.content_type})

print(response.json())
