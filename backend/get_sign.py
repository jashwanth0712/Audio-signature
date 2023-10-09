from pprint import pprint
import json
from dropbox_sign import \
    ApiClient, ApiException, Configuration, apis

def get_signature_request(api_key,sign_id):
    configuration = Configuration(
        # Configure HTTP basic authorization: api_key
        username=api_key,
    )

    with ApiClient(configuration) as api_client:
        signature_request_api = apis.SignatureRequestApi(api_client)

        signature_request_id = sign_id

        try:
            response = signature_request_api.signature_request_get(signature_request_id)
            # pprint(response)
            x = response_parser(response)
            print(x)
            return x
        except ApiException as e:
            print("Exception when calling Dropbox Sign API: %s\n" % e)
            return "Error getting signature"

def response_parser(response):

    # Your JSON data
    json_data = '''
    {
    "signature_request": {
        "signature_request_id": "39c0e06c6320cafaab86c8de6b7653e22e1c64b8",
        "test_mode": true,
        "title": "I am the Raja.",
        "original_title": "Lawyer RP",
        "subject": "Lawyer RP",
        "message": "Please sign this NDA and then we can discuss more. Let me know if you have any questions.",
        "metadata": {
        "custom_id": 1234,
        "custom_text": "NDA #9"
        },
        "created_at": 1696761044,
        "expires_at": null,
        "is_complete": false,
        "is_declined": false,
        "has_error": false,
        "custom_fields": [],
        "response_data": [],
        "signing_url": "https://app.hellosign.com/sign/39c0e06c6320cafaab86c8de6b7653e22e1c64b8",
        "signing_redirect_url": null,
        "final_copy_uri": "/v3/signature_request/final_copy/39c0e06c6320cafaab86c8de6b7653e22e1c64b8",
        "files_url": "https://api.hellosign.com/v3/signature_request/files/39c0e06c6320cafaab86c8de6b7653e22e1c64b8",
        "details_url": "https://app.hellosign.com/home/manage?guid=39c0e06c6320cafaab86c8de6b7653e22e1c64b8",
        "requester_email_address": "jashwanth0712@gmail.com",
        "signatures": [
        {
            "signature_id": "bc2c93bc97df01b0f2e1628476faee74",
            "has_pin": false,
            "has_sms_auth": false,
            "has_sms_delivery": false,
            "sms_phone_number": null,
            "signer_email_address": "sasankmadati@gmail.com",
            "signer_name": "Sasank",
            "signer_role": null,
            "order": 0,
            "status_code": "awaiting_signature",
            "signed_at": null,
            "last_viewed_at": 1696761081,
            "last_reminded_at": null,
            "error": null
        },
        {
            "signature_id": "099116205258294523f8395671e96e75",
            "has_pin": false,
            "has_sms_auth": false,
            "has_sms_delivery": false,
            "sms_phone_number": null,
            "signer_email_address": "alteek05@gmail.com",
            "signer_name": "Arthur",
            "signer_role": null,
            "order": 1,
            "status_code": "awaiting_signature",
            "signed_at": null,
            "last_viewed_at": null,
            "last_reminded_at": null,
            "error": null
        }
        ],
        "cc_email_addresses": [],
        "template_ids": null
    }
    }
    '''

    # Parse the JSON data
    data = json.loads(json_data)

    # Extract signer_name and status_code for each signature
    signatures = data['signature_request']['signatures']
    no_sign_count = 0
    signatures_list = []
    for signature in signatures:
        signer_name = signature['signer_name']
        status_code = signature['status_code']
        if status_code == 'awaiting_signature':
            no_sign_count += 1
        signatures_list.append((signer_name,status_code))
    return [no_sign_count,signatures_list]
