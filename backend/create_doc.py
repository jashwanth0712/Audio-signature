from pprint import pprint

from dropbox_sign import \
    ApiClient, ApiException, Configuration, apis, models
import gdown

def create_draft(api_key,file_url):
    configuration = Configuration(
        # Configure HTTP basic authorization: api_key
        username=api_key,
    )

    with ApiClient(configuration) as api_client:
        unclaimed_draft_api = apis.UnclaimedDraftApi(api_client)

        signer_1 = models.SubUnclaimedDraftSigner(
            email_address="sasankmadati@gmail.com",
            name="Sasank",
            order=0,
        )

        signing_options = models.SubSigningOptions(
            draw=True,
            type=True,
            upload=True,
            phone=False,
            default_type="draw",
        )

        gdown.download(file_url, 'document.pdf',fuzzy=True,format="pdf",quiet=True)
        data = models.UnclaimedDraftCreateRequest(
            subject="Dropbox create draft",
            type="request_signature",
            message="Please sign this NDA and then we can discuss more. Let me know if you have any questions.",
            signers=[signer_1],
            files=[open("document.pdf", "rb")],
            metadata={
                "custom_id": 22222,
                "custom_text": "NDA #911",
            },
            signing_options=signing_options,
            test_mode=True,
        )

        try:
            response = unclaimed_draft_api.unclaimed_draft_create(data)
            pprint(response)
            return "Successfully created draft"
        except ApiException as e:
            print("Exception when calling Dropbox Sign API: %s\n" % e)
            return "Error creating draft"

create_draft("18642c608e525e4152a38bf6b817578540eee98e4c370639cb36b78cc051819b","https://docs.google.com/document/d/1qiSdZ-BR3to6FT0hFuj2W5W4m7VJ0Ayt4o814xMmft0/edit?usp=sharing")