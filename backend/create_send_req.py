from pprint import pprint
import os
import gdown
from dropbox_sign import \
    ApiClient, ApiException, Configuration, apis, models

configuration = Configuration(
    username=os.getenv("DROPBOX_KEY"),
)

def send_req_sign(doc_url="https://docs.google.com/document/d/1qiSdZ-BR3to6FT0hFuj2W5W4m7VJ0Ayt4o814xMmft0/edit?usp=sharing",email = "sasankmadati@gmai.com",name="Sasank"):
    with ApiClient(configuration) as api_client:
        signature_request_api = apis.SignatureRequestApi(api_client)

        signer_1 = models.SubSignatureRequestSigner(
            email_address=email,
            name=name,
            order=0,
        )

        signing_options = models.SubSigningOptions(
            draw=True,
            type=True,
            upload=True,
            phone=True,
            default_type="draw",
        )
        gdown.download(doc_url, 'document.pdf',fuzzy=True,format="pdf",quiet=True)
        data = models.SignatureRequestSendRequest(
            title="Hello World",
            subject="Lawyer RP",
            message="Please sign this NDA and then we can discuss more. Let me know if you have any questions.",
            signers=[signer_1],
            files=[open("document.pdf", "rb")],
            metadata={
                "custom_id": 1234,
                "custom_text": "NDA #9",
            },
            signing_options=signing_options,
            test_mode=True,
        )

        try:
            response = signature_request_api.signature_request_send(data)
            return f"Document created and sent for signature to {name}"
        except ApiException as e:
            return f"Exception when calling Dropbox Sign API: {e}\n" 